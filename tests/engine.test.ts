import { describe, expect, it } from "vitest";
import { ageInYears } from "@/lib/engine/age";
import { bmr, katchMcArdle, mifflinStJeor } from "@/lib/engine/bmr";
import { getReference } from "@/lib/engine/reference";
import {
  addVectors,
  coverage,
  scaleVector,
  sumVectors,
} from "@/lib/engine/aggregate";
import { computeTargets } from "@/lib/engine/targets";
import type { Profile, Settings } from "@/lib/db/models";
import { DEFAULT_GLASS_SIZE_ML, DEFAULT_MEAL_SLOTS, suggestMealSlot } from "@/config/meals";
import { cmToFtIn, ftInToCm, kgToLb, sodiumMgToSaltG } from "@/config/units";

const REF_DATE = new Date(2026, 5, 15); // 2026-06-15

function profileFixture(overrides: Partial<Profile> = {}): Profile {
  return {
    id: "me",
    name: "Test",
    sexAtBirth: "female",
    gender: { kind: "female" },
    birthDate: "1996-03-10", // age 30 at REF_DATE
    heightCm: 165,
    weightKg: 65,
    activityLevel: "moderate",
    approach: "nourish",
    approachModifier: 1,
    referenceSource: "efsa",
    createdAt: 0,
    updatedAt: 0,
    ...overrides,
  };
}

function settingsFixture(overrides: Partial<Settings> = {}): Settings {
  return {
    id: "app",
    units: "metric",
    mealSlots: [...DEFAULT_MEAL_SLOTS],
    glassSizeMl: DEFAULT_GLASS_SIZE_ML,
    updatedAt: 0,
    ...overrides,
  };
}

describe("ageInYears", () => {
  it("counts completed years", () => {
    expect(ageInYears("1996-03-10", REF_DATE)).toBe(30);
  });
  it("handles a birthday later in the year", () => {
    expect(ageInYears("1996-08-20", REF_DATE)).toBe(29);
  });
  it("handles the birthday itself", () => {
    expect(ageInYears("1996-06-15", REF_DATE)).toBe(30);
  });
});

describe("BMR", () => {
  it("Mifflin-St Jeor female: 65 kg / 165 cm / 30 y", () => {
    // 10·65 + 6.25·165 − 5·30 − 161 = 1370.25
    expect(mifflinStJeor("female", 65, 165, 30)).toBeCloseTo(1370.25, 2);
  });
  it("Mifflin-St Jeor male: same body +166 kcal", () => {
    expect(mifflinStJeor("male", 65, 165, 30)).toBeCloseTo(1536.25, 2);
  });
  it("Katch-McArdle: 80 kg at 20 % body fat", () => {
    // 370 + 21.6 · 64 = 1752.4
    expect(katchMcArdle(80, 20)).toBeCloseTo(1752.4, 1);
  });
  it("bmr() prefers Katch-McArdle when body fat is known", () => {
    expect(
      bmr({ basis: "male", weightKg: 80, heightCm: 180, ageYears: 30, bodyFatPct: 20 })
    ).toBeCloseTo(1752.4, 1);
    expect(
      bmr({ basis: "male", weightKg: 80, heightCm: 180, ageYears: 30 })
    ).toBeCloseTo(10 * 80 + 6.25 * 180 - 150 + 5, 2);
  });
});

describe("reference lookups", () => {
  it("EFSA iron: age & sex bands", () => {
    expect(getReference("efsa", "iron", "female", 30)?.value).toBe(16);
    expect(getReference("efsa", "iron", "female", 16)?.value).toBe(13);
    expect(getReference("efsa", "iron", "female", 55)?.value).toBe(11);
    expect(getReference("efsa", "iron", "male", 30)?.value).toBe(11);
  });
  it("EFSA calcium: 15–17 / 18–24 / 25+", () => {
    expect(getReference("efsa", "calcium", "male", 16)?.value).toBe(1150);
    expect(getReference("efsa", "calcium", "male", 20)?.value).toBe(1000);
    expect(getReference("efsa", "calcium", "male", 40)?.value).toBe(950);
  });
  it("carries ULs where established", () => {
    expect(getReference("efsa", "vitA", "female", 30)?.ul).toBe(3000);
    expect(getReference("nih", "vitC", "female", 30)?.ul).toBe(2000);
    expect(getReference("nih", "vitC", "female", 16)?.value).toBe(65);
  });
  it("NIH calcium male: 51–70 = 1000, 71+ = 1200 (UL 2000)", () => {
    expect(getReference("nih", "calcium", "male", 60)).toMatchObject({
      value: 1000,
      ul: 2000,
    });
    expect(getReference("nih", "calcium", "male", 75)?.value).toBe(1200);
  });
  it("chromium exists only in NIH (EFSA sets no DRV)", () => {
    expect(getReference("efsa", "chromium", "male", 30)).toBeUndefined();
    expect(getReference("nih", "chromium", "male", 30)?.value).toBe(35);
    expect(getReference("nih", "chromium", "female", 55)?.value).toBe(20);
  });
});

describe("computeTargets — EFSA female fixture", () => {
  const targets = computeTargets(profileFixture(), settingsFixture(), REF_DATE);

  it("energy chain: BMR → TDEE → goal", () => {
    expect(targets.bmrKcal).toBe(1370);
    expect(targets.tdeeKcal).toBe(2124);
    expect(targets.energyKcal).toBe(2124);
  });
  it("macros from defaults", () => {
    expect(targets.macros.proteinG).toBeCloseTo(78, 1); // 1.2 g/kg moderate
    expect(targets.macros.fatG).toBeCloseTo(70.8, 1); // 30 %E / 9
    expect(targets.macros.carbsG).toBeCloseTo(293.7, 1); // remainder / 4
    expect(targets.macros.fiberG).toBe(25); // EFSA AI
  });
  it("limits", () => {
    expect(targets.limits.sugarG).toBeCloseTo(53.1, 1);
    expect(targets.limits.satFatG).toBeCloseTo(23.6, 1);
    expect(targets.limits.saltG).toBe(5);
    expect(targets.limits.sodiumMg).toBe(2000);
  });
  it("water: EFSA total × drink share, rounded", () => {
    expect(targets.waterMl).toBe(1600);
  });
  it("micros include table values and energy-derived EFSA values", () => {
    const byId = Object.fromEntries(targets.micros.map((m) => [m.id, m]));
    expect(byId.iron).toMatchObject({ target: 16, kind: "PRI", source: "efsa" });
    expect(byId.vitB1).toMatchObject({ energyDerived: true });
    expect(byId.vitB1.target).toBeCloseTo(0.89, 2); // 8.887 MJ × 0.1
    expect(byId.vitB3.target).toBeCloseTo(14.2, 1); // 8.887 MJ × 1.6
    expect(byId.omega3.target).toBeCloseTo(1.43, 2); // 0.5 %E ALA + 0.25 g
    expect(byId.chromium).toBeUndefined();
  });
  it("micros are unique per nutrient", () => {
    const ids = targets.micros.map((m) => m.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("computeTargets — variants", () => {
  it("NIH mode: fiber & water rules, fixed B1, table omega-3, chromium", () => {
    const targets = computeTargets(
      profileFixture({ referenceSource: "nih" }),
      settingsFixture(),
      REF_DATE
    );
    expect(targets.macros.fiberG).toBeCloseTo((2124 / 1000) * 14, 1);
    expect(targets.waterMl).toBe(2150); // 2700 × 0.8 = 2160, rounded to 50 ml step
    const byId = Object.fromEntries(targets.micros.map((m) => [m.id, m]));
    expect(byId.vitB1).toMatchObject({ target: 1.1, kind: "RDA" });
    expect(byId.vitB1.energyDerived).toBeUndefined();
    expect(byId.omega3).toMatchObject({ target: 1.1, kind: "AI" });
    expect(byId.chromium?.target).toBe(25);
  });

  it("approach modifier applies and clamps", () => {
    const reduce = computeTargets(
      profileFixture({ approach: "reduce", approachModifier: 0.85 }),
      settingsFixture(),
      REF_DATE
    );
    expect(reduce.energyKcal).toBe(Math.round(2123.8875 * 0.85));

    const clamped = computeTargets(
      profileFixture({ approach: "reduce", approachModifier: 0.5 }),
      settingsFixture(),
      REF_DATE
    );
    expect(clamped.energyKcal).toBe(Math.round(2123.8875 * 0.85));
  });

  it("explicit overrides win", () => {
    const targets = computeTargets(
      profileFixture(),
      settingsFixture({
        energyTargetOverride: 1800,
        proteinTargetOverride: 110,
        waterGoalMlOverride: 2500,
      }),
      REF_DATE
    );
    expect(targets.energyKcal).toBe(1800);
    expect(targets.macros.proteinG).toBe(110);
    expect(targets.macros.fatG).toBeCloseTo((1800 * 0.3) / 9, 1);
    expect(targets.waterMl).toBe(2500);
  });

  it("calculation basis override switches sex-keyed values (D-012)", () => {
    const targets = computeTargets(
      profileFixture({ calculationBasisOverride: "male" }),
      settingsFixture(),
      REF_DATE
    );
    expect(targets.basis).toBe("male");
    const iron = targets.micros.find((m) => m.id === "iron");
    expect(iron?.target).toBe(11);
    expect(targets.bmrKcal).toBe(1536);
  });

  it("body fat switches to Katch-McArdle", () => {
    const targets = computeTargets(
      profileFixture({ weightKg: 80, bodyFatPct: 20 }),
      settingsFixture(),
      REF_DATE
    );
    expect(targets.bmrKcal).toBe(1752);
  });
});

describe("aggregation", () => {
  const apple = { energy: 52, carbs: 13.8, vitC: 4.6 } as const;

  it("scaleVector keeps absent keys absent", () => {
    const scaled = scaleVector(apple, 182);
    expect(scaled.energy).toBeCloseTo(94.6, 1);
    expect(scaled.vitC).toBeCloseTo(8.4, 1);
    expect("protein" in scaled).toBe(false);
  });

  it("addVectors merges sparsely", () => {
    const sum = addVectors({ energy: 100, protein: 5 }, { energy: 50, vitC: 10 });
    expect(sum).toEqual({ energy: 150, protein: 5, vitC: 10 });
  });

  it("sumVectors counts honest gaps", () => {
    const { totals, gaps, count } = sumVectors([
      { energy: 100, vitC: 10 },
      { energy: 200 }, // no vitC data
      { energy: 50, vitC: 0 }, // verified zero
    ]);
    expect(count).toBe(3);
    expect(totals.energy).toBe(350);
    expect(totals.vitC).toBe(10);
    expect(gaps.vitC).toBe(1);
    expect(gaps.energy).toBeUndefined();
  });

  it("coverage is uncapped and null-safe", () => {
    expect(coverage(50, 100)).toBe(0.5);
    expect(coverage(150, 100)).toBe(1.5);
    expect(coverage(undefined, 100)).toBe(0);
  });
});

describe("meals & units helpers", () => {
  it("suggests the slot for the hour, snacks otherwise", () => {
    expect(suggestMealSlot(DEFAULT_MEAL_SLOTS, 8).id).toBe("breakfast");
    expect(suggestMealSlot(DEFAULT_MEAL_SLOTS, 12).id).toBe("lunch");
    expect(suggestMealSlot(DEFAULT_MEAL_SLOTS, 19).id).toBe("dinner");
    expect(suggestMealSlot(DEFAULT_MEAL_SLOTS, 16).id).toBe("snacks");
    expect(suggestMealSlot(DEFAULT_MEAL_SLOTS, 2).id).toBe("snacks");
  });
  it("unit conversions round-trip", () => {
    expect(kgToLb(65)).toBeCloseTo(143.3, 1);
    expect(cmToFtIn(180)).toEqual({ ft: 5, inch: 11 });
    expect(ftInToCm(5, 11)).toBeCloseTo(180.3, 1);
    expect(sodiumMgToSaltG(2000)).toBe(5);
  });
});
