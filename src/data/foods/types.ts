/**
 * Seed authoring format (docs/DATA.md §3). TypeScript instead of JSON so
 * nutrient keys are checked at authoring time. Values per 100 g
 * (per 100 ml when `isLiquid`). Absent nutrient = no data — NEVER invent
 * values; omitting is the honest choice (docs/SCIENCE.md §4).
 *
 * CONVENTIONS (validator-enforced, tests/seed.test.ts):
 *  - Carbs follow the EU label convention: `carbs` EXCLUDES fiber
 *    („Kohlenhydrate, davon Zucker" — Ballaststoffe separat).
 *  - Energy must reconcile: kcal ≈ 4·carbs + 4·protein + 9·fat
 *    + 7·alcohol + 2·fiber (±max(15 kcal, 12 %)).
 *  - Plant foods: vitB12/vitD/cholesterol are VERIFIED zeros — write 0.
 *  - Category files live in ./categories/ — one file per category id.
 */

import type { NutrientVector } from "@/lib/engine/types";

export interface SeedFood {
  /** Stable slug, unique across ALL seed files (validator-enforced). */
  id: string;
  name: string;
  brand?: string;
  kind?: "supplement";
  isLiquid?: boolean;
  /** Household portions: [label, grams]. First entry = default portion. */
  portions: Array<[string, number]>;
  n: NutrientVector;
}

export interface SeedCategoryFile {
  /** Category id from src/config/categories.ts. */
  category: string;
  foods: SeedFood[];
}
