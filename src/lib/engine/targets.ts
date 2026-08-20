/**
 * Personal daily targets — assembles everything the app measures against
 * (docs/SCIENCE.md). Pure: (profile, settings) → PersonalTargets.
 */

import { ACTIVITY_BY_ID } from "@/config/activity";
import { NUTRIENT_BY_ID, NUTRIENTS } from "@/config/nutrients";
import {
  APPROACH_BY_ID,
  ENERGY_DERIVED_RULES,
  FIBER_RULES,
  MACRO_RULES,
  WATER_RULES,
} from "@/config/targets";
import type { Profile, Settings } from "@/lib/db/models";
import { ageInYears } from "./age";
import { bmr } from "./bmr";
import { getReference, tabledNutrients, type RefKind } from "./reference";
import type { NutrientId, ReferenceSourceId, SexBasis } from "./types";

export interface MicroTarget {
  id: NutrientId;
  target: number;
  kind: RefKind;
  ul?: number;
  source: ReferenceSourceId;
  /** True when derived from the personal energy target, not a table. */
  energyDerived?: boolean;
}

export interface PersonalTargets {
  basis: SexBasis;
  ageYears: number;
  bmrKcal: number;
  tdeeKcal: number;
  /** The daily energy goal (approach + override applied). */
  energyKcal: number;
  macros: {
    proteinG: number;
    fatG: number;
    carbsG: number;
    fiberG: number;
  };
  limits: {
    sugarG: number;
    satFatG: number;
    saltG: number;
    sodiumMg: number;
  };
  waterMl: number;
  /** Vitamin/mineral/omega-3 targets keyed for the panel. */
  micros: MicroTarget[];
}

export function calculationBasis(profile: Profile): SexBasis {
  return profile.calculationBasisOverride ?? profile.sexAtBirth;
}

const round1 = (n: number) => Math.round(n * 10) / 10;

export function computeTargets(
  profile: Profile,
  settings: Settings,
  today: Date = new Date()
): PersonalTargets {
  const basis = calculationBasis(profile);
  const age = ageInYears(profile.birthDate, today);
  const activity = ACTIVITY_BY_ID[profile.activityLevel];

  const bmrKcal = bmr({
    basis,
    weightKg: profile.weightKg,
    heightCm: profile.heightCm,
    ageYears: age,
    bodyFatPct: profile.bodyFatPct,
  });
  const tdeeKcal = bmrKcal * activity.factor;

  const approach = APPROACH_BY_ID[profile.approach];
  const modifier = clamp(
    profile.approachModifier,
    approach.minModifier,
    approach.maxModifier
  );
  const energyKcal = Math.round(settings.energyTargetOverride ?? tdeeKcal * modifier);

  // ------------------------------------------------------------- macros
  const proteinG = round1(
    settings.proteinTargetOverride ?? activity.proteinGPerKg * profile.weightKg
  );
  const fatG = round1(
    settings.fatTargetOverride ??
      (energyKcal * MACRO_RULES.fatEnergyShare) / MACRO_RULES.kcalPerGram.fat
  );
  const carbsG = round1(
    settings.carbsTargetOverride ??
      Math.max(
        0,
        (energyKcal -
          proteinG * MACRO_RULES.kcalPerGram.protein -
          fatG * MACRO_RULES.kcalPerGram.fat) /
          MACRO_RULES.kcalPerGram.carbs
      )
  );
  const fiberG =
    profile.referenceSource === "nih"
      ? round1((energyKcal / 1000) * FIBER_RULES.nihPer1000Kcal)
      : FIBER_RULES.efsaFixedG;

  // ------------------------------------------------------------- limits
  const sugarG = round1(
    (energyKcal * MACRO_RULES.sugarEnergyShareLimit) / MACRO_RULES.kcalPerGram.carbs
  );
  const satFatG = round1(
    (energyKcal * MACRO_RULES.satFatEnergyShareLimit) / MACRO_RULES.kcalPerGram.fat
  );
  const saltG = MACRO_RULES.saltLimitG;
  const sodiumMg = Math.round((saltG / 2.5) * 1000);

  // -------------------------------------------------------------- water
  const totals =
    profile.referenceSource === "nih" ? WATER_RULES.nihTotalMl : WATER_RULES.efsaTotalMl;
  const waterRaw = totals[basis] * WATER_RULES.drinkShare;
  const waterMl =
    settings.waterGoalMlOverride ??
    Math.round(waterRaw / WATER_RULES.roundToMl) * WATER_RULES.roundToMl;

  // -------------------------------------------------------------- micros
  const source = profile.referenceSource;
  const micros: MicroTarget[] = [];
  for (const id of tabledNutrients(source)) {
    // Panel decides what is shown/targeted; skip anything not defined there.
    if (!NUTRIENT_BY_ID[id]) continue;
    const ref = getReference(source, id, basis, age);
    if (!ref) continue;
    micros.push({ id, target: ref.value, kind: ref.kind, ul: ref.ul, source });
  }

  // Energy-derived EFSA values (docs/SCIENCE.md §2–3).
  if (source === "efsa") {
    const mj = energyKcal / ENERGY_DERIVED_RULES.kcalPerMJ;
    micros.push(
      {
        id: "vitB1",
        target: round2(mj * ENERGY_DERIVED_RULES.efsaThiaminMgPerMJ),
        kind: "PRI",
        source,
        energyDerived: true,
      },
      {
        id: "vitB3",
        target: round1(mj * ENERGY_DERIVED_RULES.efsaNiacinMgNEPerMJ),
        kind: "PRI",
        source,
        energyDerived: true,
      },
      {
        id: "omega3",
        target: round2(
          (energyKcal * ENERGY_DERIVED_RULES.efsaAlaEnergyShare) /
            MACRO_RULES.kcalPerGram.fat +
            ENERGY_DERIVED_RULES.efsaEpaDhaG
        ),
        kind: "AI",
        source,
        energyDerived: true,
      }
    );
  }

  micros.sort((a, b) => panelOrder(a.id) - panelOrder(b.id));

  return {
    basis,
    ageYears: age,
    bmrKcal: Math.round(bmrKcal),
    tdeeKcal: Math.round(tdeeKcal),
    energyKcal,
    macros: { proteinG, fatG, carbsG, fiberG },
    limits: { sugarG, satFatG, saltG, sodiumMg },
    waterMl,
    micros,
  };
}

const ORDER: Record<string, number> = Object.fromEntries(
  NUTRIENTS.map((n, i) => [n.id, i])
);
function panelOrder(id: NutrientId): number {
  return ORDER[id] ?? 999;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}
const round2 = (n: number) => Math.round(n * 100) / 100;
