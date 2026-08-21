/**
 * USDA FoodData Central gap-filler (docs/DATA.md §4).
 *
 * FDC data is public domain (CC0). This script does NOT create new foods —
 * it fills nutrients that are missing on existing seed foods, so the
 * German names, portions and curation stay intact.
 *
 * Usage:
 *   1. Download a FoodData Central CSV/JSON export into data-sources/
 *      (gitignored — the export is large and not ours to redistribute).
 *   2. Map FDC ids to our seed ids in MATCHES below.
 *   3. npx tsx scripts/import-usda.ts data-sources/foundation.json
 *
 * The script prints a patch per food; it never writes silently. Review,
 * paste into the category file, then run `npm run seed:validate`.
 */

import { readFileSync } from "node:fs";
import type { NutrientId } from "../src/lib/engine/types";

/** seedFoodId → FDC fdcId. Extend as foods get verified. */
const MATCHES: Record<string, number> = {
  // "haferflocken": 169705,
};

/** FDC nutrient number → our id (units already match after scaling). */
const FDC_NUTRIENTS: Record<string, { id: NutrientId; scale: number }> = {
  "1008": { id: "energy", scale: 1 }, // kcal
  "1003": { id: "protein", scale: 1 },
  "1004": { id: "fat", scale: 1 },
  "1005": { id: "carbs", scale: 1 }, // carbohydrate by difference — fiber is subtracted below
  "1079": { id: "fiber", scale: 1 },
  "2000": { id: "sugar", scale: 1 },
  "1087": { id: "calcium", scale: 1 },
  "1089": { id: "iron", scale: 1 },
  "1090": { id: "magnesium", scale: 1 },
  "1091": { id: "phosphorus", scale: 1 },
  "1092": { id: "potassium", scale: 1 },
  "1093": { id: "sodium", scale: 1 },
  "1095": { id: "zinc", scale: 1 },
  "1098": { id: "copper", scale: 1 },
  "1101": { id: "manganese", scale: 1 },
  "1103": { id: "selenium", scale: 1 },
  "1106": { id: "vitA", scale: 1 },
  "1162": { id: "vitC", scale: 1 },
  "1114": { id: "vitD", scale: 1 },
  "1109": { id: "vitE", scale: 1 },
  "1185": { id: "vitK", scale: 1 },
  "1165": { id: "vitB1", scale: 1 },
  "1166": { id: "vitB2", scale: 1 },
  "1167": { id: "vitB3", scale: 1 },
  "1170": { id: "vitB5", scale: 1 },
  "1175": { id: "vitB6", scale: 1 },
  "1176": { id: "vitB7", scale: 1 },
  "1177": { id: "vitB9", scale: 1 },
  "1178": { id: "vitB12", scale: 1 },
  "1180": { id: "choline", scale: 1 },
  "1253": { id: "cholesterol", scale: 1 },
  "1258": { id: "satFat", scale: 1 },
  "1292": { id: "monoFat", scale: 1 },
  "1293": { id: "polyFat", scale: 1 },
  "1257": { id: "transFat", scale: 1 },
};

interface FdcFood {
  fdcId: number;
  description: string;
  foodNutrients?: Array<{
    nutrient?: { number?: string };
    amount?: number;
  }>;
}

function extract(food: FdcFood): Partial<Record<NutrientId, number>> {
  const out: Partial<Record<NutrientId, number>> = {};
  for (const entry of food.foodNutrients ?? []) {
    const key = entry.nutrient?.number;
    const mapping = key ? FDC_NUTRIENTS[key] : undefined;
    if (!mapping || entry.amount == null) continue;
    out[mapping.id] = entry.amount * mapping.scale;
  }
  // EU convention: carbs exclude fiber (docs/DATA.md §3).
  if (out.carbs != null && out.fiber != null) {
    out.carbs = Math.max(0, Number((out.carbs - out.fiber).toFixed(1)));
  }
  return out;
}

function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: npx tsx scripts/import-usda.ts <fdc-export.json>");
    process.exit(1);
  }
  if (Object.keys(MATCHES).length === 0) {
    console.error("No MATCHES configured — add seedId → fdcId pairs first.");
    process.exit(1);
  }

  const raw = JSON.parse(readFileSync(file, "utf8")) as
    | FdcFood[]
    | { FoundationFoods?: FdcFood[]; SRLegacyFoods?: FdcFood[] };
  const foods: FdcFood[] = Array.isArray(raw)
    ? raw
    : [...(raw.FoundationFoods ?? []), ...(raw.SRLegacyFoods ?? [])];

  const byId = new Map(foods.map((f) => [f.fdcId, f]));
  for (const [seedId, fdcId] of Object.entries(MATCHES)) {
    const food = byId.get(fdcId);
    if (!food) {
      console.warn(`· ${seedId}: fdcId ${fdcId} not in export`);
      continue;
    }
    console.log(`\n# ${seedId} ← ${food.description} (${fdcId})`);
    console.log(JSON.stringify(extract(food), null, 2));
  }
  console.log("\nReview the values, merge them into the category file, then run:");
  console.log("  npm run seed:validate");
}

main();
