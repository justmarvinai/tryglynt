/**
 * Seed-data validator (docs/DATA.md §3) — the quality gate that keeps the
 * bundled food database trustworthy. Every category file must pass; run
 * via `npm run seed:validate` or as part of `npm run check`.
 */

import { describe, expect, it } from "vitest";
import { CATEGORY_BY_ID } from "@/config/categories";
import type { NutrientId } from "@/lib/engine/types";
import type { SeedCategoryFile, SeedFood } from "@/data/foods/types";

const modules = import.meta.glob<Record<string, unknown>>(
  "@/data/foods/categories/*.ts",
  { eager: true }
);

interface Located {
  file: string;
  data: SeedCategoryFile;
}

const files: Located[] = Object.entries(modules).map(([file, mod]) => {
  const data = Object.values(mod).find(
    (v): v is SeedCategoryFile =>
      typeof v === "object" && v !== null && "category" in v && "foods" in v
  );
  if (!data) throw new Error(`${file}: no SeedCategoryFile export found`);
  return { file, data };
});

const allFoods: Array<{ file: string; category: string; food: SeedFood }> =
  files.flatMap(({ file, data }) =>
    data.foods.map((food) => ({ file, category: data.category, food }))
  );

/** Upper plausibility bounds per 100 g for NON-supplement foods. */
const MAX_PER_100G: Partial<Record<NutrientId, number>> = {
  energy: 950,
  protein: 90,
  carbs: 100,
  sugar: 100,
  fiber: 50,
  fat: 100,
  satFat: 95,
  cholesterol: 3500,
  sodium: 40000,
  potassium: 2200,
  calcium: 1400,
  iron: 40,
  magnesium: 700,
  zinc: 20,
  phosphorus: 1600,
  selenium: 2000, // Paranüsse
  copper: 5,
  manganese: 10,
  iodine: 3000, // Jodsalz
  chloride: 62000, // Salz
  vitA: 20000, // Leber
  vitB1: 3,
  vitB2: 4,
  vitB3: 40,
  vitB6: 3,
  vitB12: 100,
  vitB9: 600,
  vitC: 300,
  vitD: 30,
  vitE: 65, // Weizenkeimöl/Sonnenblumenöl
  vitK: 900, // Grünkohl
  choline: 600,
  caffeine: 250,
  alcohol: 60,
  water: 100,
};

const isKebab = (s: string) => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(s);

describe("seed data — structure", () => {
  it("has at least one category file", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  it("every file uses a known category id", () => {
    for (const { file, data } of files) {
      expect(CATEGORY_BY_ID[data.category], `${file}: category ${data.category}`).toBeDefined();
    }
  });

  it("ids are kebab-case and globally unique", () => {
    const seen = new Map<string, string>();
    for (const { file, food } of allFoods) {
      expect(isKebab(food.id), `${file}: id "${food.id}" not kebab-case`).toBe(true);
      expect(seen.has(food.id), `duplicate id "${food.id}" in ${file} and ${seen.get(food.id)}`).toBe(false);
      seen.set(food.id, file);
    }
  });

  it("names are unique and non-empty", () => {
    const seen = new Set<string>();
    for (const { file, food } of allFoods) {
      const key = `${food.name}|${food.brand ?? ""}`.toLowerCase();
      expect(food.name.trim().length, `${file}: ${food.id} empty name`).toBeGreaterThan(1);
      expect(seen.has(key), `${file}: duplicate name "${food.name}"`).toBe(false);
      seen.add(key);
    }
  });

  it("portions exist with sane gram amounts", () => {
    for (const { file, food } of allFoods) {
      expect(food.portions.length, `${file}: ${food.id} has no portions`).toBeGreaterThan(0);
      for (const [label, grams] of food.portions) {
        expect(label.trim().length, `${file}: ${food.id} empty portion label`).toBeGreaterThan(0);
        expect(grams, `${file}: ${food.id} portion "${label}" grams`).toBeGreaterThan(0);
        expect(grams, `${file}: ${food.id} portion "${label}" grams`).toBeLessThanOrEqual(
          food.kind === "supplement" ? 100 : 1000
        );
      }
    }
  });
});

describe("seed data — nutrition consistency", () => {
  it("energy is present and reconciles with macros (EU 4/4/9/7/2)", () => {
    for (const { file, food } of allFoods) {
      const n = food.n;
      expect(n.energy, `${file}: ${food.id} missing energy`).toBeDefined();
      const computed =
        4 * (n.carbs ?? 0) +
        4 * (n.protein ?? 0) +
        9 * (n.fat ?? 0) +
        7 * (n.alcohol ?? 0) +
        2 * (n.fiber ?? 0);
      const tolerance = Math.max(15, (n.energy ?? 0) * 0.12);
      expect(
        Math.abs(computed - (n.energy ?? 0)),
        `${file}: ${food.id} energy ${n.energy} vs computed ${computed.toFixed(1)}`
      ).toBeLessThanOrEqual(tolerance);
    }
  });

  it("macro masses stay within 100 g and sub-parts within parents", () => {
    for (const { file, food } of allFoods) {
      const n = food.n;
      const mass =
        (n.protein ?? 0) + (n.carbs ?? 0) + (n.fiber ?? 0) + (n.fat ?? 0) + (n.alcohol ?? 0);
      expect(mass, `${file}: ${food.id} macro mass ${mass.toFixed(1)}`).toBeLessThanOrEqual(105);
      if (n.water != null) {
        expect(mass + n.water, `${file}: ${food.id} mass incl. water`).toBeLessThanOrEqual(112);
      }
      if (n.sugar != null && n.carbs != null) {
        expect(n.sugar, `${file}: ${food.id} sugar > carbs`).toBeLessThanOrEqual(n.carbs + 0.1);
      }
      const fattyAcids =
        (n.satFat ?? 0) + (n.monoFat ?? 0) + (n.polyFat ?? 0) + (n.transFat ?? 0);
      if (n.fat != null && fattyAcids > 0) {
        expect(fattyAcids, `${file}: ${food.id} fatty acids > fat`).toBeLessThanOrEqual(
          n.fat + 0.5
        );
      }
      if (n.omega3 != null && n.polyFat != null) {
        expect(n.omega3, `${file}: ${food.id} omega3 > polyFat`).toBeLessThanOrEqual(
          n.polyFat + 0.1
        );
      }
    }
  });

  it("values are non-negative and within plausibility bounds", () => {
    for (const { file, food } of allFoods) {
      for (const [key, value] of Object.entries(food.n)) {
        expect(value, `${file}: ${food.id} ${key} negative`).toBeGreaterThanOrEqual(0);
        if (food.kind === "supplement") continue; // concentrations intended
        const max = MAX_PER_100G[key as NutrientId];
        if (max != null) {
          expect(value, `${file}: ${food.id} ${key}=${value} implausible`).toBeLessThanOrEqual(max);
        }
      }
    }
  });

  it("non-supplement foods carry a useful core panel", () => {
    const core: NutrientId[] = ["energy", "protein", "carbs", "fat"];
    for (const { file, food } of allFoods) {
      if (food.kind === "supplement") continue;
      for (const id of core) {
        expect(food.n[id], `${file}: ${food.id} missing core ${id}`).toBeDefined();
      }
    }
  });
});
