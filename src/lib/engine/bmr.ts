/**
 * Basal metabolic rate (docs/SCIENCE.md §1).
 * Mifflin-St Jeor (Mifflin et al. 1990) by default; Katch-McArdle when a
 * body-fat percentage is available.
 */

import type { SexBasis } from "./types";

export function mifflinStJeor(
  basis: SexBasis,
  weightKg: number,
  heightCm: number,
  ageYears: number
): number {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  return basis === "male" ? base + 5 : base - 161;
}

export function katchMcArdle(weightKg: number, bodyFatPct: number): number {
  const leanMassKg = weightKg * (1 - bodyFatPct / 100);
  return 370 + 21.6 * leanMassKg;
}

export interface BmrInput {
  basis: SexBasis;
  weightKg: number;
  heightCm: number;
  ageYears: number;
  bodyFatPct?: number;
}

/** Chooses Katch-McArdle when body fat is known, else Mifflin-St Jeor. */
export function bmr(input: BmrInput): number {
  if (input.bodyFatPct != null && input.bodyFatPct > 0) {
    return katchMcArdle(input.weightKg, input.bodyFatPct);
  }
  return mifflinStJeor(input.basis, input.weightKg, input.heightCm, input.ageYears);
}
