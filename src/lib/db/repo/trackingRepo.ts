/**
 * Water, weight, favorites, recents & supplement regimen repositories.
 */

import { useLiveQuery } from "dexie-react-hooks";
import { db, newId } from "@/lib/db/db";
import type {
  FavoriteRow,
  Food,
  RecentRow,
  RegimenItem,
  WaterEntry,
  WeightEntry,
} from "@/lib/db/models";
import { addFoodEntry } from "./diaryRepo";

/* ---------------------------------------------------------------- water */

export function useWaterDay(date: string): WaterEntry[] | undefined {
  return useLiveQuery(() => db.waterLog.where("date").equals(date).toArray(), [date]);
}

export async function addWater(date: string, ml: number): Promise<void> {
  await db.waterLog.add({ id: newId(), date, ml, loggedAt: Date.now() });
}

/** Removes the most recent glass of the day (ml < 0 is not stored). */
export async function removeLastWater(date: string): Promise<void> {
  const entries = await db.waterLog.where("date").equals(date).sortBy("loggedAt");
  const last = entries.at(-1);
  if (last) await db.waterLog.delete(last.id);
}

/* --------------------------------------------------------------- weight */

export function useWeightLog(): WeightEntry[] | undefined {
  return useLiveQuery(() => db.weightLog.orderBy("date").toArray(), []);
}

export async function logWeight(input: {
  date: string;
  weightKg: number;
  bodyFatPct?: number;
}): Promise<void> {
  const existing = await db.weightLog.where("date").equals(input.date).first();
  if (existing) {
    await db.weightLog.update(existing.id, {
      weightKg: input.weightKg,
      bodyFatPct: input.bodyFatPct,
      loggedAt: Date.now(),
    });
  } else {
    await db.weightLog.add({ id: newId(), ...input, loggedAt: Date.now() });
  }
  // Current weight drives targets — keep the profile in sync.
  await db.profile.update("me", {
    weightKg: input.weightKg,
    ...(input.bodyFatPct != null ? { bodyFatPct: input.bodyFatPct } : {}),
    updatedAt: Date.now(),
  });
}

export async function deleteWeightEntry(id: string): Promise<void> {
  await db.weightLog.delete(id);
}

/* ------------------------------------------------------------ favorites */

export function useFavorites(): FavoriteRow[] | undefined {
  return useLiveQuery(() => db.favorites.toArray(), []);
}

export function useRecents(limit = 30): RecentRow[] | undefined {
  return useLiveQuery(
    () => db.recents.orderBy("lastUsedAt").reverse().limit(limit).toArray(),
    [limit]
  );
}

export async function toggleFavorite(foodRef: string): Promise<boolean> {
  const existing = await db.favorites.get(foodRef);
  if (existing) {
    await db.favorites.delete(foodRef);
    return false;
  }
  await db.favorites.put({ foodRef, addedAt: Date.now() });
  return true;
}

/* -------------------------------------------------------------- regimen */

export function useRegimen(): RegimenItem[] | undefined {
  return useLiveQuery(() => db.regimen.orderBy("sortOrder").toArray(), []);
}

export async function addRegimenItem(input: {
  food: Food;
  amount: number;
  unit: string;
  grams: number;
  mealId: string;
}): Promise<void> {
  const count = await db.regimen.count();
  await db.regimen.add({
    id: newId(),
    foodId: input.food.id,
    amount: input.amount,
    unit: input.unit,
    grams: input.grams,
    mealId: input.mealId,
    sortOrder: count,
  });
}

export async function removeRegimenItem(id: string): Promise<void> {
  await db.regimen.delete(id);
}

/** One-tap „Mein Stack" log — returns the number of logged items. */
export async function logRegimen(date: string): Promise<number> {
  const items = await db.regimen.orderBy("sortOrder").toArray();
  let logged = 0;
  for (const item of items) {
    const food = await db.foods.get(item.foodId);
    if (!food) continue;
    await addFoodEntry({
      food,
      date,
      mealId: item.mealId,
      amount: item.amount,
      unit: item.unit,
      grams: item.grams,
    });
    logged += 1;
  }
  return logged;
}
