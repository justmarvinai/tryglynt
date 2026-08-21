/**
 * Food & recipe repository (docs/ARCHITECTURE.md §4).
 */

import { useLiveQuery } from "dexie-react-hooks";
import { db, newId, searchKey } from "@/lib/db/db";
import type { Food, Recipe, RecipeIngredient } from "@/lib/db/models";
import { scaleVector, sumVectors } from "@/lib/engine/aggregate";
import type { NutrientVector } from "@/lib/engine/types";

/** All foods, alphabetically — the in-memory search corpus. */
export function useAllFoods(): Food[] | undefined {
  return useLiveQuery(() => db.foods.orderBy("nameNormalized").toArray(), []);
}

export function useFood(id: string | undefined): Food | undefined {
  return useLiveQuery(async () => (id ? db.foods.get(id) : undefined), [id]);
}

export async function getFood(id: string): Promise<Food | undefined> {
  return db.foods.get(id);
}

export type FoodInput = Omit<
  Food,
  "id" | "nameNormalized" | "createdAt" | "updatedAt" | "source"
>;

export async function createUserFood(input: FoodInput): Promise<Food> {
  const now = Date.now();
  const food: Food = {
    ...input,
    id: newId(),
    source: "user",
    nameNormalized: searchKey(`${input.name} ${input.brand ?? ""}`),
    createdAt: now,
    updatedAt: now,
  };
  await db.foods.add(food);
  return food;
}

export async function updateUserFood(id: string, input: FoodInput): Promise<void> {
  await db.foods.update(id, {
    ...input,
    nameNormalized: searchKey(`${input.name} ${input.brand ?? ""}`),
    updatedAt: Date.now(),
  });
}

export async function deleteUserFood(id: string): Promise<void> {
  await db.transaction("rw", [db.foods, db.favorites, db.recents, db.regimen], async () => {
    await db.foods.delete(id);
    await db.favorites.delete(`food:${id}`);
    await db.recents.delete(`food:${id}`);
    await db.regimen.where("foodId").equals(id).delete();
  });
}

/* ------------------------------------------------------------------ */
/*  Recipes                                                            */
/* ------------------------------------------------------------------ */

export function useAllRecipes(): Recipe[] | undefined {
  return useLiveQuery(() => db.recipes.orderBy("nameNormalized").toArray(), []);
}

export function useRecipe(id: string | undefined): Recipe | undefined {
  return useLiveQuery(async () => (id ? db.recipes.get(id) : undefined), [id]);
}

export async function saveRecipe(
  input: { name: string; servings: number; ingredients: RecipeIngredient[] },
  id?: string
): Promise<Recipe> {
  const now = Date.now();
  const recipe: Recipe = {
    id: id ?? newId(),
    name: input.name,
    nameNormalized: searchKey(input.name),
    servings: Math.max(1, input.servings),
    ingredients: input.ingredients,
    createdAt: id ? ((await db.recipes.get(id))?.createdAt ?? now) : now,
    updatedAt: now,
  };
  await db.recipes.put(recipe);
  return recipe;
}

export async function deleteRecipe(id: string): Promise<void> {
  await db.transaction("rw", [db.recipes, db.favorites, db.recents], async () => {
    await db.recipes.delete(id);
    await db.favorites.delete(`recipe:${id}`);
    await db.recents.delete(`recipe:${id}`);
  });
}

export interface RecipeNutrition {
  perServing: NutrientVector;
  totalGrams: number;
  gramsPerServing: number;
  /** Ingredients whose food is missing (deleted) — shown as a warning. */
  missingIngredients: number;
}

/** Per-serving nutrition from current ingredient foods. */
export async function computeRecipeNutrition(
  ingredients: RecipeIngredient[],
  servings: number
): Promise<RecipeNutrition> {
  const foods = await db.foods.bulkGet(ingredients.map((i) => i.foodId));
  const vectors: NutrientVector[] = [];
  let totalGrams = 0;
  let missing = 0;
  ingredients.forEach((ing, i) => {
    const food = foods[i];
    if (!food) {
      missing += 1;
      return;
    }
    vectors.push(scaleVector(food.per100, ing.grams));
    totalGrams += ing.grams;
  });
  const { totals } = sumVectors(vectors);
  const perServing: NutrientVector = {};
  const n = Math.max(1, servings);
  for (const [key, value] of Object.entries(totals)) {
    if (value != null) perServing[key as keyof NutrientVector] = value / n;
  }
  return {
    perServing,
    totalGrams,
    gramsPerServing: totalGrams / n,
    missingIngredients: missing,
  };
}
