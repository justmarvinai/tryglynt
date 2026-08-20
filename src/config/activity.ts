/**
 * Activity levels: TDEE factors + default protein (D-013).
 * Sources: standard Harris/Mifflin activity multipliers; protein defaults
 * per docs/SCIENCE.md §2 (EFSA/DGE baseline 0.8 g/kg → sports upper 1.6).
 */

import type { ActivityLevelId } from "@/lib/engine/types";

export interface ActivityLevel {
  id: ActivityLevelId;
  name: string;
  description: string;
  factor: number;
  /** Default protein target in g per kg body weight. */
  proteinGPerKg: number;
}

export const ACTIVITY_LEVELS: readonly ActivityLevel[] = [
  {
    id: "sedentary",
    name: "Sitzend",
    description: "Bürojob, wenig Bewegung im Alltag",
    factor: 1.2,
    proteinGPerKg: 0.8,
  },
  {
    id: "light",
    name: "Leicht aktiv",
    description: "1–3× Sport pro Woche oder viel zu Fuß unterwegs",
    factor: 1.375,
    proteinGPerKg: 1.0,
  },
  {
    id: "moderate",
    name: "Moderat aktiv",
    description: "3–5× Sport pro Woche",
    factor: 1.55,
    proteinGPerKg: 1.2,
  },
  {
    id: "very",
    name: "Sehr aktiv",
    description: "6–7× Sport pro Woche",
    factor: 1.725,
    proteinGPerKg: 1.4,
  },
  {
    id: "extra",
    name: "Extrem aktiv",
    description: "Körperliche Arbeit plus tägliches Training",
    factor: 1.9,
    proteinGPerKg: 1.6,
  },
] as const;

export const ACTIVITY_BY_ID: Record<ActivityLevelId, ActivityLevel> =
  Object.fromEntries(ACTIVITY_LEVELS.map((a) => [a.id, a])) as Record<
    ActivityLevelId,
    ActivityLevel
  >;
