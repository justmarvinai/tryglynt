import { describe, expect, it } from "vitest";
import { suggestFoods } from "@/lib/engine/suggestions";
import { computeDay } from "@/lib/engine/day";
import { computeTargets } from "@/lib/engine/targets";
import { DEFAULT_GLASS_SIZE_ML, DEFAULT_MEAL_SLOTS } from "@/config/meals";
import type { DiaryEntry, Food, Profile, Settings } from "@/lib/db/models";
import type { NutrientVector } from "@/lib/engine/types";
import { normalizeName } from "@/lib/db/db";

const REF = new Date(2026, 5, 15);

const profile: Profile = {
  id: "me",
  name: "T",
  sexAtBirth: "female",
  gender: { kind: "female" },
  birthDate: "1996-03-10",
  heightCm: 165,
  weightKg: 65,
  activityLevel: "moderate",
  approach: "nourish",
  approachModifier: 1,
  referenceSource: "efsa",
  createdAt: 0,
  updatedAt: 0,
};
const settings: Settings = {
  id: "app",
  units: "metric",
  mealSlots: [...DEFAULT_MEAL_SLOTS],
  glassSizeMl: DEFAULT_GLASS_SIZE_ML,
  updatedAt: 0,
};
const targets = computeTargets(profile, settings, REF);

function food(id: string, per100: NutrientVector, over: Partial<Food> = {}): Food {
  return {
    id,
    source: "seed",
    kind: "food",
    name: id,
    nameNormalized: normalizeName(id),
    category: "gemuese",
    per100,
    portions: [{ label: "1 Portion", grams: 100 }],
    dataQuality: "full",
    createdAt: 0,
    updatedAt: 0,
    ...over,
  };
}

function entry(snapshot: NutrientVector): DiaryEntry {
  return {
    id: Math.random().toString(36).slice(2),
    date: "2026-06-15",
    mealId: "lunch",
    ref: { type: "quick" },
    refId: "",
    amount: 1,
    unit: "quick",
    grams: 0,
    snapshot,
    name: "x",
    loggedAt: 0,
  };
}

/** A day with a big iron gap and plenty of energy budget left. */
function ironGapDay() {
  return computeDay(
    [
      entry({
        energy: 400,
        protein: 20,
        carbs: 40,
        fat: 10,
        iron: 1,
        vitC: 10,
        calcium: 100,
        magnesium: 50,
        zinc: 1,
        vitA: 100,
        vitB12: 1,
        vitD: 1,
      }),
    ],
    [],
    targets
  );
}

const base = { favorites: new Set<string>(), useCounts: new Map<string, number>() };

describe("suggestFoods", () => {
  it("ranks the food that closes the biggest gap first", () => {
    const day = ironGapDay();
    const result = suggestFoods({
      day,
      foods: [
        food("eisenreich", { energy: 120, iron: 12, protein: 10 }),
        food("kaum-eisen", { energy: 120, iron: 0.3, protein: 10 }),
      ],
      ...base,
    });
    expect(result[0]?.food.id).toBe("eisenreich");
    expect(result[0]?.reasons.some((r) => r.nutrient === "iron")).toBe(true);
  });

  it("explains itself with the fraction of the gap it closes", () => {
    const day = ironGapDay();
    const [top] = suggestFoods({
      day,
      foods: [food("eisen", { energy: 100, iron: 7.5 })],
      ...base,
    });
    const ironReason = top.reasons.find((r) => r.nutrient === "iron");
    // gap = 16 − 1 = 15 mg; portion delivers 7.5 mg → 50 %
    expect(ironReason?.closes).toBeCloseTo(0.5, 2);
    expect(top.energyKcal).toBe(100);
  });

  it("penalises portions that blow the remaining energy budget", () => {
    const day = ironGapDay();
    const result = suggestFoods({
      day,
      foods: [
        food("schlank", { energy: 100, iron: 6 }),
        food("energiebombe", { energy: 3000, iron: 6 }),
      ],
      ...base,
    });
    expect(result[0]?.food.id).toBe("schlank");
    const bomb = result.find((r) => r.food.id === "energiebombe");
    expect(bomb === undefined || bomb.score < result[0].score).toBe(true);
  });

  it("penalises foods that would exceed an upper limit", () => {
    const day = ironGapDay();
    const result = suggestFoods({
      day,
      foods: [
        food("normal", { energy: 100, iron: 5 }),
        // vitA UL is 3000 µg (EFSA) — this portion blows past it
        food("leber", { energy: 100, iron: 5, vitA: 9000 }),
      ],
      ...base,
    });
    expect(result[0]?.food.id).toBe("normal");
  });

  it("diversifies categories", () => {
    const day = ironGapDay();
    const foods = ["a", "b", "c", "d"].map((id) =>
      food(id, { energy: 100, iron: 8 }, { category: "fleisch" })
    );
    const result = suggestFoods({ day, foods, ...base });
    expect(result.length).toBeLessThanOrEqual(2); // maxPerCategory
  });

  it("prefers familiar foods when everything else is equal", () => {
    const day = ironGapDay();
    const foods = [
      food("fremd", { energy: 100, iron: 6 }),
      food("bekannt", { energy: 100, iron: 6 }, { category: "obst" }),
    ];
    const result = suggestFoods({
      day,
      foods,
      favorites: new Set(["food:bekannt"]),
      useCounts: new Map([["bekannt", 5]]),
    });
    expect(result[0]?.food.id).toBe("bekannt");
  });

  it("returns nothing when the energy budget is spent", () => {
    const day = computeDay([entry({ energy: 2100, iron: 1 })], [], targets);
    expect(suggestFoods({ day, foods: [food("x", { energy: 50, iron: 9 })], ...base })).toEqual([]);
  });

  it("returns nothing when there are no open gaps", () => {
    const day = computeDay([], [], targets); // no entries → all micros unknown
    expect(suggestFoods({ day, foods: [food("x", { energy: 50, iron: 9 })], ...base })).toEqual([]);
  });

  it("never suggests a food that contributes nothing to a gap", () => {
    const day = ironGapDay();
    const result = suggestFoods({
      day,
      foods: [food("leer", { energy: 200 })],
      ...base,
    });
    expect(result).toEqual([]);
  });
});
