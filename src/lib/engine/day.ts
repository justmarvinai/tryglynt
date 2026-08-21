/**
 * Day-level nutrition state: totals, coverage per nutrient, limits and
 * honest data gaps (docs/SCIENCE.md §4). Pure — the UI just renders it.
 */

import { NUTRIENTS, NUTRIENT_BY_ID } from "@/config/nutrients";
import type { DiaryEntry, WaterEntry } from "@/lib/db/models";
import { sumVectors } from "./aggregate";
import type { PersonalTargets } from "./targets";
import type { NutrientId, NutrientVector } from "./types";

export interface NutrientStatus {
  id: NutrientId;
  /** Amount logged today (0 when nothing provided data). */
  amount: number;
  /** Personal target, or undefined when the panel defines none. */
  target?: number;
  /** amount / target, uncapped. Undefined without a target. */
  coverage?: number;
  targetType: "goal" | "limit" | "info";
  /** Upper limit from the reference source, when established. */
  ul?: number;
  overUl: boolean;
  /** Entries that had no data for this nutrient. */
  gaps: number;
  /**
   * True when NOTHING logged today carried data for this nutrient — we
   * genuinely don't know the intake, so it must not be presented as a
   * gap (docs/SCIENCE.md §4, honest data).
   */
  noData: boolean;
}

export interface DayNutrition {
  totals: NutrientVector;
  entryCount: number;
  energy: {
    consumed: number;
    target: number;
    remaining: number;
    coverage: number;
  };
  water: { consumed: number; target: number };
  /** Every panel nutrient with a target, in panel order. */
  statuses: NutrientStatus[];
  /** Micronutrients only (vitamins, minerals, extended) with targets. */
  micros: NutrientStatus[];
  microsOnTrack: number;
  /** Micros where at least one entry provided data. */
  microsTracked: number;
  /** Worst micro gaps first (coverage < 1), excludes limits. */
  worstGaps: NutrientStatus[];
}

/** Coverage at or above this counts as „im Plan". */
export const ON_TRACK_THRESHOLD = 0.9;

export function computeDay(
  entries: DiaryEntry[],
  water: WaterEntry[],
  targets: PersonalTargets
): DayNutrition {
  const { totals, gaps, count } = sumVectors(entries.map((e) => e.snapshot));
  const waterMl =
    (totals.water ?? 0) + water.reduce((sum, entry) => sum + entry.ml, 0);

  const targetFor = new Map<NutrientId, number>([
    ["energy", targets.energyKcal],
    ["protein", targets.macros.proteinG],
    ["carbs", targets.macros.carbsG],
    ["fat", targets.macros.fatG],
    ["fiber", targets.macros.fiberG],
    ["sugar", targets.limits.sugarG],
    ["satFat", targets.limits.satFatG],
    ["sodium", targets.limits.sodiumMg],
    ["water", targets.waterMl],
  ]);
  const ulFor = new Map<NutrientId, number>();
  for (const micro of targets.micros) {
    targetFor.set(micro.id, micro.target);
    if (micro.ul != null) ulFor.set(micro.id, micro.ul);
  }

  const statuses: NutrientStatus[] = [];
  for (const [id, target] of targetFor) {
    const def = NUTRIENT_BY_ID[id];
    if (!def) continue;
    const hasData = id === "water" ? waterMl > 0 : totals[id] != null;
    const amount = id === "water" ? waterMl : (totals[id] ?? 0);
    const ul = ulFor.get(id);
    const missing = gaps[id] ?? 0;
    statuses.push({
      id,
      amount,
      target,
      coverage: target > 0 ? amount / target : undefined,
      targetType: def.targetType,
      ul,
      overUl: ul != null && amount > ul,
      gaps: missing,
      noData: count > 0 && !hasData,
    });
  }
  statuses.sort((a, b) => panelIndex(a.id) - panelIndex(b.id));

  const micros = statuses.filter((s) => {
    const group = NUTRIENT_BY_ID[s.id]?.group;
    return group === "vitamins" || group === "minerals" || group === "extended";
  });
  const microGoals = micros.filter((s) => s.targetType === "goal");
  /**
   * Headline gaps only cover nutrients we actually have data on, and skip
   * the "extended" group (chromium, molybdenum, fluoride) whose coverage
   * in any food database is sparse — surfacing them as top gaps would be
   * noise, not insight.
   */
  const gapCandidates = microGoals.filter(
    (s) => !s.noData && NUTRIENT_BY_ID[s.id]?.group !== "extended"
  );

  return {
    totals,
    entryCount: count,
    energy: {
      consumed: totals.energy ?? 0,
      target: targets.energyKcal,
      remaining: targets.energyKcal - (totals.energy ?? 0),
      coverage: targets.energyKcal > 0 ? (totals.energy ?? 0) / targets.energyKcal : 0,
    },
    water: { consumed: waterMl, target: targets.waterMl },
    statuses,
    micros,
    microsOnTrack: microGoals.filter((s) => (s.coverage ?? 0) >= ON_TRACK_THRESHOLD).length,
    microsTracked: microGoals.filter((s) => !s.noData).length,
    worstGaps: gapCandidates
      .filter((s) => (s.coverage ?? 0) < ON_TRACK_THRESHOLD)
      .sort((a, b) => (a.coverage ?? 0) - (b.coverage ?? 0)),
  };
}

const PANEL_ORDER = new Map(NUTRIENTS.map((n, i) => [n.id, i]));
function panelIndex(id: NutrientId): number {
  return PANEL_ORDER.get(id) ?? 999;
}
