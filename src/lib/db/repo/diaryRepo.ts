/**
 * Diary repository — every write goes through here so snapshots, recents
 * and undo behave consistently (docs/ARCHITECTURE.md §4, DATA.md §2).
 */

import { useLiveQuery } from "dexie-react-hooks";
import { db, newId } from "@/lib/db/db";
import type { DiaryEntry, Food, Recipe } from "@/lib/db/models";
import { scaleVector } from "@/lib/engine/aggregate";
import type { NutrientVector } from "@/lib/engine/types";
import { computeRecipeNutrition } from "./foodRepo";

async function touchRecent(foodRef: string): Promise<void> {
  const existing = await db.recents.get(foodRef);
  await db.recents.put({
    foodRef,
    lastUsedAt: Date.now(),
    useCount: (existing?.useCount ?? 0) + 1,
  });
}

export async function addFoodEntry(input: {
  food: Food;
  date: string;
  mealId: string;
  amount: number;
  unit: string;
  grams: number;
}): Promise<DiaryEntry> {
  const entry: DiaryEntry = {
    id: newId(),
    date: input.date,
    mealId: input.mealId,
    ref: { type: "food", id: input.food.id },
    refId: input.food.id,
    amount: input.amount,
    unit: input.unit,
    grams: input.grams,
    snapshot: scaleVector(input.food.per100, input.grams),
    name: input.food.name,
    loggedAt: Date.now(),
  };
  await db.transaction("rw", [db.diaryEntries, db.recents], async () => {
    await db.diaryEntries.add(entry);
    await touchRecent(`food:${input.food.id}`);
  });
  return entry;
}

export async function addRecipeEntry(input: {
  recipe: Recipe;
  date: string;
  mealId: string;
  servings: number;
}): Promise<DiaryEntry> {
  const nutrition = await computeRecipeNutrition(
    input.recipe.ingredients,
    input.recipe.servings
  );
  const snapshot: NutrientVector = {};
  for (const [key, value] of Object.entries(nutrition.perServing)) {
    if (value != null)
      snapshot[key as keyof NutrientVector] = value * input.servings;
  }
  const entry: DiaryEntry = {
    id: newId(),
    date: input.date,
    mealId: input.mealId,
    ref: { type: "recipe", id: input.recipe.id },
    refId: input.recipe.id,
    amount: input.servings,
    unit: "portion:Portion",
    grams: nutrition.gramsPerServing * input.servings,
    snapshot,
    name: input.recipe.name,
    loggedAt: Date.now(),
  };
  await db.transaction("rw", [db.diaryEntries, db.recents], async () => {
    await db.diaryEntries.add(entry);
    await touchRecent(`recipe:${input.recipe.id}`);
  });
  return entry;
}

export async function addQuickEntry(input: {
  date: string;
  mealId: string;
  name?: string;
  snapshot: NutrientVector;
}): Promise<DiaryEntry> {
  const entry: DiaryEntry = {
    id: newId(),
    date: input.date,
    mealId: input.mealId,
    ref: { type: "quick" },
    refId: "",
    amount: 1,
    unit: "quick",
    grams: 0,
    snapshot: input.snapshot,
    name: input.name?.trim() || "Schnell-Eintrag",
    loggedAt: Date.now(),
  };
  await db.diaryEntries.add(entry);
  return entry;
}

export async function updateFoodEntry(
  entry: DiaryEntry,
  input: { food: Food; amount: number; unit: string; grams: number; mealId: string }
): Promise<void> {
  await db.diaryEntries.update(entry.id, {
    mealId: input.mealId,
    amount: input.amount,
    unit: input.unit,
    grams: input.grams,
    snapshot: scaleVector(input.food.per100, input.grams),
    name: input.food.name,
  });
}

/** Deletes and returns the entry so the caller can offer Undo. */
export async function deleteEntry(id: string): Promise<DiaryEntry | undefined> {
  const entry = await db.diaryEntries.get(id);
  if (entry) await db.diaryEntries.delete(id);
  return entry;
}

export async function restoreEntry(entry: DiaryEntry): Promise<void> {
  await db.diaryEntries.put(entry);
}

export function useDiaryDay(date: string): DiaryEntry[] | undefined {
  return useLiveQuery(
    () => db.diaryEntries.where("date").equals(date).sortBy("loggedAt"),
    [date]
  );
}

export async function getDiaryRange(
  fromDate: string,
  toDate: string
): Promise<DiaryEntry[]> {
  return db.diaryEntries.where("date").between(fromDate, toDate, true, true).toArray();
}

/** Copies all entries of a meal (or whole day) onto another date. */
export async function copyEntries(input: {
  fromDate: string;
  toDate: string;
  mealId?: string;
}): Promise<number> {
  const source = input.mealId
    ? await db.diaryEntries
        .where("[date+mealId]")
        .equals([input.fromDate, input.mealId])
        .toArray()
    : await db.diaryEntries.where("date").equals(input.fromDate).toArray();
  const now = Date.now();
  const copies = source.map((entry, i) => ({
    ...entry,
    id: newId(),
    date: input.toDate,
    loggedAt: now + i,
  }));
  await db.diaryEntries.bulkAdd(copies);
  return copies.length;
}
