import { describe, expect, it } from "vitest";
import { matchScore, queryTerms, searchItems } from "@/lib/food/search";
import {
  defaultUnitFor,
  formatPortion,
  resolveGrams,
  unitOptionsFor,
} from "@/lib/food/portions";
import type { Food } from "@/lib/db/models";
import { searchKey } from "@/lib/db/db";

function food(name: string, over: Partial<Food> = {}): Food {
  return {
    id: name,
    source: "seed",
    kind: "food",
    name,
    nameNormalized: searchKey(name),
    category: "obst",
    per100: { energy: 100 },
    portions: [{ label: "1 Stück", grams: 120 }],
    dataQuality: "full",
    createdAt: 0,
    updatedAt: 0,
    ...over,
  };
}

describe("search", () => {
  const items = [
    food("Banane"),
    food("Bananenchips"),
    food("Vollkornbrot"),
    food("Brot, geröstet"),
    food("Grünkohl"),
  ];

  it("splits and normalizes query terms", () => {
    expect(queryTerms("  Grüner  Tee ")).toEqual(["gruner", "tee"]);
  });

  it("ranks prefix over word-start over contains", () => {
    const names = searchItems(items, "brot").map((f) => f.name);
    expect(names[0]).toBe("Brot, geröstet"); // prefix match wins
    expect(names).toContain("Vollkornbrot");
  });

  it("requires every term to match", () => {
    expect(matchScore(items[0], ["banane", "chips"])).toBeNull();
    expect(matchScore(items[1], ["banane", "chips"])).not.toBeNull();
  });

  it("matches German umlaut spellings both ways", () => {
    const list = [food("Hühnerei (gekocht)"), food("Grünkohl"), food("Müsli")];
    expect(searchItems(list, "huehnerei").map((f) => f.name)).toEqual(["Hühnerei (gekocht)"]);
    expect(searchItems(list, "hühnerei").map((f) => f.name)).toEqual(["Hühnerei (gekocht)"]);
    expect(searchItems(list, "huhnerei").map((f) => f.name)).toEqual(["Hühnerei (gekocht)"]);
    expect(searchItems(list, "gruenkohl").map((f) => f.name)).toEqual(["Grünkohl"]);
    expect(searchItems(list, "muesli").map((f) => f.name)).toEqual(["Müsli"]);
  });

  it("is diacritics- and case-insensitive", () => {
    expect(searchItems(items, "grunkohl").map((f) => f.name)).toEqual(["Grünkohl"]);
    expect(searchItems(items, "GRÜN").map((f) => f.name)).toEqual(["Grünkohl"]);
  });

  it("returns the unfiltered head for an empty query", () => {
    expect(searchItems(items, "  ", 2)).toHaveLength(2);
  });
});

describe("portions", () => {
  const apple = food("Apfel", {
    portions: [
      { label: "1 mittlerer Apfel", grams: 180 },
      { label: "1 kleiner Apfel", grams: 130 },
    ],
  });
  const milk = food("Milch", { isLiquid: true, portions: [{ label: "1 Glas", grams: 200 }] });

  it("lists household portions first, then the base unit", () => {
    const units = unitOptionsFor(apple);
    expect(units[0].unit).toBe("portion:1 mittlerer Apfel");
    expect(units.at(-1)?.unit).toBe("g");
    expect(unitOptionsFor(milk).at(-1)?.unit).toBe("ml");
  });

  it("defaults to the first household portion", () => {
    expect(defaultUnitFor(apple).gramsPerUnit).toBe(180);
  });

  it("resolves grams for portions and base units", () => {
    expect(resolveGrams(apple, 2, "portion:1 kleiner Apfel")).toBe(260);
    expect(resolveGrams(apple, 150, "g")).toBe(150);
    expect(resolveGrams(milk, 250, "ml")).toBe(250);
  });

  it("falls back to the raw amount for unknown portions", () => {
    expect(resolveGrams(apple, 90, "portion:gibt es nicht")).toBe(90);
  });

  it("formats German portion subtitles", () => {
    expect(formatPortion(1, "portion:1 mittlerer Apfel", 180)).toBe(
      "1 mittlerer Apfel (180 g)"
    );
    expect(formatPortion(2, "portion:1 Scheibe", 90)).toBe("2 × 1 Scheibe (90 g)");
    expect(formatPortion(150, "g", 150)).toBe("150 g");
  });
});
