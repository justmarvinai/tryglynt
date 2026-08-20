/**
 * Nutrient-vector math with honest-gap semantics (docs/SCIENCE.md §4):
 * an absent key means "no data" — sums treat it as 0 but count the gap so
 * the UI can say „Datenlücke bei N Einträgen" instead of faking zeros.
 */

import type { NutrientId, NutrientVector } from "./types";

/** per100 × grams/100, keeping absent keys absent. */
export function scaleVector(per100: NutrientVector, grams: number): NutrientVector {
  const out: NutrientVector = {};
  const factor = grams / 100;
  for (const [key, value] of Object.entries(per100)) {
    if (value != null) out[key as NutrientId] = value * factor;
  }
  return out;
}

export function addVectors(a: NutrientVector, b: NutrientVector): NutrientVector {
  const out: NutrientVector = { ...a };
  for (const [key, value] of Object.entries(b)) {
    if (value == null) continue;
    const id = key as NutrientId;
    out[id] = (out[id] ?? 0) + value;
  }
  return out;
}

export interface DayTotals {
  totals: NutrientVector;
  /** Per nutrient: how many summed vectors had no data for it. */
  gaps: Partial<Record<NutrientId, number>>;
  count: number;
}

export function sumVectors(vectors: NutrientVector[]): DayTotals {
  let totals: NutrientVector = {};
  const present: Partial<Record<NutrientId, number>> = {};
  for (const v of vectors) {
    totals = addVectors(totals, v);
    for (const key of Object.keys(v)) {
      const id = key as NutrientId;
      present[id] = (present[id] ?? 0) + 1;
    }
  }
  const gaps: Partial<Record<NutrientId, number>> = {};
  for (const key of Object.keys(present)) {
    const id = key as NutrientId;
    const missing = vectors.length - (present[id] ?? 0);
    if (missing > 0) gaps[id] = missing;
  }
  return { totals, gaps, count: vectors.length };
}

/** Coverage toward a goal target, uncapped (UI caps display at 100 %). */
export function coverage(total: number | undefined, target: number): number {
  if (!target || target <= 0) return 0;
  return (total ?? 0) / target;
}
