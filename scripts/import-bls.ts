/**
 * Bundeslebensmittelschlüssel (BLS 4.0) importer (docs/DATA.md §4).
 *
 * ⚠️  BLS data is LICENSED (MRI / blsdb.de). This script ships; the data
 * never gets committed. Put a licensed export in data-sources/ (gitignored)
 * and run the importer locally.
 *
 * Usage: npx tsx scripts/import-bls.ts data-sources/bls.csv > out.json
 *
 * Output is the SeedFood shape (docs/DATA.md §3) so it can be pasted into
 * a category file after review. Values are per 100 g edible portion.
 */

import { readFileSync } from "node:fs";
import type { NutrientId } from "../src/lib/engine/types";

/** BLS column code → our nutrient id + factor into our unit. */
const BLS_COLUMNS: Record<string, { id: NutrientId; factor: number }> = {
  GCAL: { id: "energy", factor: 1 }, // kcal
  ZW: { id: "water", factor: 0.001 }, // mg → g
  ZE: { id: "protein", factor: 0.001 },
  ZF: { id: "fat", factor: 0.001 },
  ZK: { id: "carbs", factor: 0.001 },
  ZB: { id: "fiber", factor: 0.001 },
  ZM: { id: "sugar", factor: 0.001 },
  ZA: { id: "alcohol", factor: 0.001 },
  MNA: { id: "sodium", factor: 1 }, // mg
  MK: { id: "potassium", factor: 1 },
  MCA: { id: "calcium", factor: 1 },
  MMG: { id: "magnesium", factor: 1 },
  MP: { id: "phosphorus", factor: 1 },
  MFE: { id: "iron", factor: 1 },
  MZN: { id: "zinc", factor: 1 },
  MCU: { id: "copper", factor: 1 },
  MMN: { id: "manganese", factor: 1 },
  MJ: { id: "iodine", factor: 1 }, // µg
  MSE: { id: "selenium", factor: 1 },
  MCL: { id: "chloride", factor: 1 },
  VA: { id: "vitA", factor: 1 }, // µg
  VD: { id: "vitD", factor: 1 },
  VE: { id: "vitE", factor: 1 }, // mg
  VK: { id: "vitK", factor: 1 },
  VB1: { id: "vitB1", factor: 1 },
  VB2: { id: "vitB2", factor: 1 },
  VB3: { id: "vitB3", factor: 1 },
  VB5: { id: "vitB5", factor: 1 },
  VB6: { id: "vitB6", factor: 1 },
  VB7: { id: "vitB7", factor: 1 },
  VB9: { id: "vitB9", factor: 1 },
  VB12: { id: "vitB12", factor: 1 },
  VC: { id: "vitC", factor: 1 },
  ZCH: { id: "cholesterol", factor: 1 },
  ZFS: { id: "satFat", factor: 0.001 },
  ZFU: { id: "monoFat", factor: 0.001 },
  ZFP: { id: "polyFat", factor: 0.001 },
};

const slug = (name: string) =>
  name
    .toLowerCase()
    .replaceAll("ä", "ae")
    .replaceAll("ö", "oe")
    .replaceAll("ü", "ue")
    .replaceAll("ß", "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

function parseCsv(text: string): Array<Record<string, string>> {
  const [header, ...lines] = text.trim().split(/\r?\n/);
  const separator = header.includes(";") ? ";" : ",";
  const columns = header.split(separator).map((c) => c.trim());
  return lines.map((line) => {
    const cells = line.split(separator);
    return Object.fromEntries(columns.map((c, i) => [c, (cells[i] ?? "").trim()]));
  });
}

function main() {
  const file = process.argv[2];
  if (!file) {
    console.error("Usage: npx tsx scripts/import-bls.ts <bls-export.csv>");
    process.exit(1);
  }
  const rows = parseCsv(readFileSync(file, "utf8"));
  const foods = rows.map((row) => {
    const name = row["ST"] || row["Name"] || row["name"] || "";
    const n: Partial<Record<NutrientId, number>> = {};
    for (const [column, mapping] of Object.entries(BLS_COLUMNS)) {
      const raw = row[column];
      if (!raw) continue;
      const value = Number(raw.replace(",", "."));
      if (!Number.isFinite(value) || value < 0) continue;
      n[mapping.id] = Number((value * mapping.factor).toFixed(3));
    }
    // EU convention: BLS carbs already exclude fiber — no adjustment.
    return { id: slug(name), name, portions: [["1 Portion", 100]], n };
  });

  console.log(JSON.stringify({ category: "REVIEW_ME", foods }, null, 2));
  console.error(
    `\n${foods.length} Einträge konvertiert. Kategorie setzen, Portionen ergänzen,\n` +
      "dann `npm run seed:validate` laufen lassen. BLS-Daten NICHT committen."
  );
}

main();
