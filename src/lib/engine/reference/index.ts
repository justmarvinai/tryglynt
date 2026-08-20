/**
 * Reference-value lookup across sources (docs/SCIENCE.md §3).
 */

import type { NutrientId, ReferenceSourceId, SexBasis } from "@/lib/engine/types";
import { EFSA } from "./efsa";
import { NIH } from "./nih";
import { lookupRef, type ReferenceLookup } from "./types";

export type { RefKind, ReferenceLookup } from "./types";

const TABLES = { efsa: EFSA, nih: NIH } as const;

export const REFERENCE_SOURCE_NAMES: Record<ReferenceSourceId, string> = {
  efsa: "EFSA (EU)",
  nih: "NIH (USA)",
};

export function getReference(
  source: ReferenceSourceId,
  nutrient: NutrientId,
  basis: SexBasis,
  age: number
): ReferenceLookup | undefined {
  return lookupRef(TABLES[source], nutrient, basis, age);
}

/** Nutrients that have a table entry in the given source. */
export function tabledNutrients(source: ReferenceSourceId): NutrientId[] {
  return Object.keys(TABLES[source]) as NutrientId[];
}
