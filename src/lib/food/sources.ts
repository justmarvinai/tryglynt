/**
 * "Top sources" for a nutrient — what contributed today, and what the
 * database offers per sensible portion (docs/PRODUCT.md gap-closing loop).
 */

import type { DiaryEntry, Food } from "@/lib/db/models";
import { defaultUnitFor } from "@/lib/food/portions";
import type { NutrientId } from "@/lib/engine/types";

export interface SourceRow {
  key: string;
  name: string;
  /** Amount of the nutrient this row contributes. */
  amount: number;
  /** Portion description for database suggestions. */
  portionLabel?: string;
  foodId?: string;
}

/** Foods logged today that actually contributed the nutrient. */
export function todaySources(
  entries: DiaryEntry[],
  nutrient: NutrientId,
  limit = 5
): SourceRow[] {
  const rows = entries
    .map((entry) => ({
      key: entry.id,
      name: entry.name,
      amount: entry.snapshot[nutrient] ?? 0,
      foodId: entry.ref.type === "food" ? entry.ref.id : undefined,
    }))
    .filter((row) => row.amount > 0)
    .sort((a, b) => b.amount - a.amount);
  return rows.slice(0, limit);
}

/** Database foods richest in the nutrient, measured per default portion. */
export function databaseSources(
  foods: Food[],
  nutrient: NutrientId,
  limit = 6
): SourceRow[] {
  const rows: SourceRow[] = [];
  for (const food of foods) {
    const per100 = food.per100[nutrient];
    if (per100 == null || per100 <= 0) continue;
    const unit = defaultUnitFor(food);
    const grams = unit.defaultAmount * unit.gramsPerUnit;
    rows.push({
      key: food.id,
      foodId: food.id,
      name: food.name,
      amount: (per100 * grams) / 100,
      portionLabel: unit.label,
    });
  }
  rows.sort((a, b) => b.amount - a.amount);
  return rows.slice(0, limit);
}
