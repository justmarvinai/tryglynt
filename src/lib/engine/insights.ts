/**
 * Multi-day aggregations for the Insights tab (docs/PRODUCT.md).
 * Pure: (entries, water, targets, range) → averages, coverage, streaks.
 */

import { NUTRIENT_BY_ID } from "@/config/nutrients";
import type { DiaryEntry, WaterEntry } from "@/lib/db/models";
import { addDaysISO } from "@/lib/dates";
import { computeDay, ON_TRACK_THRESHOLD, type DayNutrition } from "./day";
import type { PersonalTargets } from "./targets";
import type { NutrientId } from "./types";

export interface RangeInsights {
  dates: string[];
  days: DayNutrition[];
  /** Days with at least one entry. */
  loggedDays: number;
  energyPerDay: Array<{ date: string; value: number }>;
  averageEnergy: number;
  averageMacros: { proteinG: number; carbsG: number; fatG: number; fiberG: number };
  /** Average coverage per micro over days that had data, worst first. */
  microCoverage: Array<{ id: NutrientId; coverage: number; daysWithData: number }>;
  best?: NutrientId;
  worst?: NutrientId;
}

export function computeRangeInsights(
  entries: DiaryEntry[],
  water: WaterEntry[],
  targets: PersonalTargets,
  fromDate: string,
  days: number
): RangeInsights {
  const dates = Array.from({ length: days }, (_, i) => addDaysISO(fromDate, i));
  const entriesByDate = new Map<string, DiaryEntry[]>();
  for (const entry of entries) {
    const list = entriesByDate.get(entry.date) ?? [];
    list.push(entry);
    entriesByDate.set(entry.date, list);
  }
  const waterByDate = new Map<string, WaterEntry[]>();
  for (const w of water) {
    const list = waterByDate.get(w.date) ?? [];
    list.push(w);
    waterByDate.set(w.date, list);
  }

  const dayResults = dates.map((date) =>
    computeDay(entriesByDate.get(date) ?? [], waterByDate.get(date) ?? [], targets)
  );

  const loggedIndexes = dayResults
    .map((day, i) => (day.entryCount > 0 ? i : -1))
    .filter((i) => i >= 0);
  const loggedDays = loggedIndexes.length;

  const sumOver = (pick: (day: DayNutrition) => number) =>
    loggedIndexes.reduce((sum, i) => sum + pick(dayResults[i]), 0);
  const avg = (pick: (day: DayNutrition) => number) =>
    loggedDays > 0 ? sumOver(pick) / loggedDays : 0;

  // Micro coverage averaged over days that actually had data.
  const coverageSums = new Map<NutrientId, { sum: number; days: number }>();
  for (const day of dayResults) {
    if (day.entryCount === 0) continue;
    for (const status of day.micros) {
      if (status.targetType !== "goal" || status.noData) continue;
      const acc = coverageSums.get(status.id) ?? { sum: 0, days: 0 };
      acc.sum += Math.min(2, status.coverage ?? 0);
      acc.days += 1;
      coverageSums.set(status.id, acc);
    }
  }
  const microCoverage = Array.from(coverageSums.entries())
    .filter(([id]) => NUTRIENT_BY_ID[id]?.group !== "extended")
    .map(([id, acc]) => ({ id, coverage: acc.sum / acc.days, daysWithData: acc.days }))
    .sort((a, b) => a.coverage - b.coverage);

  return {
    dates,
    days: dayResults,
    loggedDays,
    energyPerDay: dates.map((date, i) => ({
      date,
      value: dayResults[i].energy.consumed,
    })),
    averageEnergy: avg((d) => d.energy.consumed),
    averageMacros: {
      proteinG: avg((d) => d.totals.protein ?? 0),
      carbsG: avg((d) => d.totals.carbs ?? 0),
      fatG: avg((d) => d.totals.fat ?? 0),
      fiberG: avg((d) => d.totals.fiber ?? 0),
    },
    microCoverage,
    worst: microCoverage[0]?.id,
    best: microCoverage.filter((m) => m.coverage >= ON_TRACK_THRESHOLD).at(-1)?.id,
  };
}
