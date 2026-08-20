/**
 * Reference-value table format (docs/SCIENCE.md §3).
 * Values are daily amounts in the nutrient's panel unit
 * (src/config/nutrients.ts). Bands are sorted ascending by `from` (age in
 * years); lookup takes the last band with `from <= age`. `ul` is the
 * tolerable upper intake level where the source establishes one.
 */

import type { NutrientId, SexBasis } from "@/lib/engine/types";

/** RDA/PRI = requirement-based; AI = adequate intake; safe = safe & adequate. */
export type RefKind = "RDA" | "PRI" | "AI" | "safe";

export interface RefBand {
  from: number;
  value: number;
  ul?: number;
}

export interface NutrientRef {
  kind: RefKind;
  f: RefBand[];
  m: RefBand[];
}

export type RefTable = Partial<Record<NutrientId, NutrientRef>>;

export interface ReferenceLookup {
  value: number;
  kind: RefKind;
  ul?: number;
}

export function lookupBands(bands: RefBand[], age: number): RefBand | undefined {
  let match: RefBand | undefined;
  for (const band of bands) {
    if (age >= band.from) match = band;
  }
  return match;
}

export function lookupRef(
  table: RefTable,
  nutrient: NutrientId,
  basis: SexBasis,
  age: number
): ReferenceLookup | undefined {
  const ref = table[nutrient];
  if (!ref) return undefined;
  const band = lookupBands(basis === "female" ? ref.f : ref.m, age);
  if (!band) return undefined;
  return { value: band.value, kind: ref.kind, ul: band.ul };
}
