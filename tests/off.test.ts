import { describe, expect, it } from "vitest";
import { __testing } from "@/lib/connectors/openFoodFacts";

const { mapNutriments, toFood, servingPortions } = __testing;

describe("Open Food Facts mapping", () => {
  it("maps nutriments and converts g → mg/µg", () => {
    const v = mapNutriments({
      "energy-kcal_100g": 250,
      proteins_100g: 8,
      sodium_100g: 0.5, // g → 500 mg
      calcium_100g: 0.12, // g → 120 mg
      "vitamin-d_100g": 0.0000075, // g → 7.5 µg
      "vitamin-c_100g": 0.06, // g → 60 mg
    });
    expect(v.energy).toBe(250);
    expect(v.protein).toBe(8);
    expect(v.sodium).toBeCloseTo(500, 4);
    expect(v.calcium).toBeCloseTo(120, 4);
    expect(v.vitD).toBeCloseTo(7.5, 4);
    expect(v.vitC).toBeCloseTo(60, 4);
  });

  it("falls back from kJ when kcal is missing", () => {
    expect(mapNutriments({ energy_100g: 418.4 }).energy).toBeCloseTo(100, 3);
  });

  it("ignores missing and invalid values instead of writing zeros", () => {
    const v = mapNutriments({ "energy-kcal_100g": 100, iron_100g: "n/a", zinc_100g: -1 });
    expect("iron" in v).toBe(false);
    expect("zinc" in v).toBe(false);
  });

  it("builds a Food with honest label-quality marking", () => {
    const food = toFood({
      code: "4000417025005",
      product_name_de: "Haferdrink",
      brands: "Marke, Zweitmarke",
      serving_size: "1 Glas (200 ml)",
      serving_quantity: 200,
      nutriments: { "energy-kcal_100g": 46, proteins_100g: 0.8 },
      categories_tags: ["en:beverages"],
    });
    expect(food).not.toBeNull();
    expect(food!.id).toBe("off-4000417025005");
    expect(food!.source).toBe("off");
    expect(food!.dataQuality).toBe("label");
    expect(food!.brand).toBe("Marke");
    expect(food!.isLiquid).toBe(true);
    expect(food!.portions[0]).toEqual({ label: "1 Glas (200 ml)", grams: 200 });
    expect(food!.nameNormalized).toContain("haferdrink");
  });

  it("rejects products without a name or without energy", () => {
    expect(toFood({ code: "1", nutriments: { "energy-kcal_100g": 100 } })).toBeNull();
    expect(toFood({ code: "1", product_name: "X", nutriments: {} })).toBeNull();
  });

  it("skips implausible serving sizes", () => {
    expect(servingPortions({ serving_quantity: 5000 })).toEqual([]);
    expect(servingPortions({})).toEqual([]);
  });
});
