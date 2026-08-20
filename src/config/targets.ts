/**
 * Default target rules (docs/SCIENCE.md §2). All user-overridable via
 * settings; these are the engine defaults. Sources cited inline.
 */

import type { ApproachId } from "@/lib/engine/types";

export interface ApproachDef {
  id: ApproachId;
  name: string;
  description: string;
  /** Energy modifier range applied to TDEE (D-001). */
  minModifier: number;
  maxModifier: number;
  defaultModifier: number;
}

export const APPROACHES: readonly ApproachDef[] = [
  {
    id: "nourish",
    name: "Nähren",
    description: "Halten & optimal versorgen — dein Bedarf, ohne Anpassung",
    minModifier: 1.0,
    maxModifier: 1.0,
    defaultModifier: 1.0,
  },
  {
    id: "reduce",
    name: "Sanft reduzieren",
    description: "Moderates Energie-Minus von 10–15 % — ohne Crash",
    minModifier: 0.85,
    maxModifier: 0.9,
    defaultModifier: 0.875,
  },
  {
    id: "build",
    name: "Aufbauen",
    description: "Moderates Energie-Plus von 10–15 % für den Aufbau",
    minModifier: 1.1,
    maxModifier: 1.15,
    defaultModifier: 1.125,
  },
] as const;

export const APPROACH_BY_ID = Object.fromEntries(
  APPROACHES.map((a) => [a.id, a])
) as Record<ApproachId, ApproachDef>;

export const MACRO_RULES = {
  /** Fat: share of energy target (AMDR 20–35 %; EFSA/DGE default 30 %). */
  fatEnergyShare: 0.3,
  /** Free sugar limit: < 10 % of energy (WHO 2015). */
  sugarEnergyShareLimit: 0.1,
  /** Saturated fat limit: < 10 % of energy (DGE/WHO). */
  satFatEnergyShareLimit: 0.1,
  /** Salt limit in g/day (WHO); sodium = /2.5. */
  saltLimitG: 5,
  /** kcal per gram — EU convention (docs/SCIENCE.md §2). */
  kcalPerGram: { carbs: 4, protein: 4, fat: 9, alcohol: 7, fiber: 2 },
} as const;

export const FIBER_RULES = {
  /** EFSA AI, adults (EFSA 2010). */
  efsaFixedG: 25,
  /** NIH/IOM: 14 g per 1000 kcal. */
  nihPer1000Kcal: 14,
} as const;

export const WATER_RULES = {
  /**
   * EFSA total-water AI (2010), adults: f 2.0 L, m 2.5 L — includes water
   * from food. Drink goal = AI × foodShareCorrection (D-002).
   */
  efsaTotalMl: { female: 2000, male: 2500 },
  /** NIH/IOM total water AI: f 2.7 L, m 3.7 L. */
  nihTotalMl: { female: 2700, male: 3700 },
  /** Share of total water expected from beverages. */
  drinkShare: 0.8,
  /** Round the goal to this step for a clean number. */
  roundToMl: 50,
} as const;

export const ENERGY_DERIVED_RULES = {
  /** EFSA thiamin PRI: 0.1 mg/MJ of energy intake. */
  efsaThiaminMgPerMJ: 0.1,
  /** EFSA niacin PRI: 1.6 mg NE/MJ of energy intake. */
  efsaNiacinMgNEPerMJ: 1.6,
  /**
   * Omega-3 (docs/SCIENCE.md §3): EFSA ALA AI = 0.5 %E (ALA has 9 kcal/g)
   * + 250 mg EPA/DHA. NIH mode uses the fixed ALA AI from the table.
   */
  efsaAlaEnergyShare: 0.005,
  efsaEpaDhaG: 0.25,
  kcalPerMJ: 239.0057,
} as const;
