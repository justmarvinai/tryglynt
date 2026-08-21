/**
 * Deterministic, explainable food suggestions (D-007, docs/SCIENCE.md §6).
 *
 * Scores each candidate food at ONE sensible portion by how much of the
 * day's remaining nutrient gaps it closes, penalised by energy budget and
 * limit/UL pressure, nudged by familiarity and meal fit. No ML, no cloud —
 * same inputs always produce the same cards, and each card can explain
 * itself.
 */

import { CATEGORY_BY_ID } from "@/config/categories";
import { NUTRIENT_BY_ID } from "@/config/nutrients";
import { SUGGESTIONS } from "@/config/suggestions";
import type { Food } from "@/lib/db/models";
import { defaultUnitFor } from "@/lib/food/portions";
import type { DayNutrition, NutrientStatus } from "./day";
import type { NutrientId } from "./types";

export interface SuggestionReason {
  nutrient: NutrientId;
  /** Fraction of the remaining gap this portion closes (0–1). */
  closes: number;
  amount: number;
}

export interface Suggestion {
  food: Food;
  score: number;
  grams: number;
  amount: number;
  unit: string;
  portionLabel: string;
  energyKcal: number;
  /** Top nutrients this portion helps with, best first. */
  reasons: SuggestionReason[];
}

export interface SuggestionContext {
  day: DayNutrition;
  foods: Food[];
  /** "food:<id>" refs the user marked as favorite. */
  favorites: Set<string>;
  /** foodId → times logged (recents). */
  useCounts: Map<string, number>;
  /** Meal slot the suggestions are for (meal-fit bonus). */
  mealId?: string;
}

/** Remaining gap per nutrient, worst first, ignoring unknown-data ones. */
function openGaps(day: DayNutrition): Array<{ status: NutrientStatus; missing: number }> {
  return day.worstGaps
    .filter((s) => s.target != null && (s.coverage ?? 0) < SUGGESTIONS.gapThreshold)
    .slice(0, SUGGESTIONS.maxGapsConsidered)
    .map((status) => ({
      status,
      missing: Math.max(0, (status.target ?? 0) - status.amount),
    }))
    .filter((g) => g.missing > 0);
}

export function suggestFoods(ctx: SuggestionContext): Suggestion[] {
  const { day, foods } = ctx;
  const gaps = openGaps(day);
  if (gaps.length === 0) return [];

  const energyBudget = Math.max(0, day.energy.remaining);
  if (energyBudget < SUGGESTIONS.minEnergyBudget) return [];

  // Limit headroom: how much sugar/satFat/sodium may still be added.
  const limitHeadroom = new Map<NutrientId, number>();
  for (const status of day.statuses) {
    if (status.targetType === "limit" && status.target != null) {
      limitHeadroom.set(status.id, status.target - status.amount);
    }
  }
  const ulHeadroom = new Map<NutrientId, number>();
  for (const status of day.statuses) {
    if (status.ul != null) ulHeadroom.set(status.id, status.ul - status.amount);
  }

  // Gap weights: worst gap gets the full bonus, decaying with rank.
  const gapWeights = gaps.map((gap, i) => ({
    ...gap,
    weight:
      SUGGESTIONS.weights.gapClose +
      SUGGESTIONS.weights.worstGapBonus * (1 - i / Math.max(1, gaps.length - 1)),
  }));

  const relevant = new Set(gaps.map((g) => g.status.id));
  const candidates = foods
    .filter((food) => {
      if (food.per100.energy == null) return false;
      // Must contribute to at least one open gap.
      for (const id of relevant) if ((food.per100[id] ?? 0) > 0) return true;
      return false;
    })
    .slice(0, SUGGESTIONS.candidateCap);

  const scored: Suggestion[] = [];

  for (const food of candidates) {
    const unit = defaultUnitFor(food);
    const amount = unit.defaultAmount;
    const grams = amount * unit.gramsPerUnit;
    const factor = grams / 100;
    const energyKcal = (food.per100.energy ?? 0) * factor;

    let score = 0;
    const reasons: SuggestionReason[] = [];

    for (const gap of gapWeights) {
      const per100 = food.per100[gap.status.id];
      if (per100 == null || per100 <= 0) continue;
      const contributes = per100 * factor;
      const closes = Math.min(1, contributes / gap.missing);
      if (closes < 0.02) continue;
      score += gap.weight * closes;
      reasons.push({ nutrient: gap.status.id, closes, amount: contributes });
    }
    if (reasons.length === 0) continue;

    // Energy: soft cost, steep penalty once the budget is exceeded.
    const budgetShare = energyKcal / Math.max(1, energyBudget);
    score -= SUGGESTIONS.weights.energyCost * budgetShare;
    if (energyKcal > energyBudget) {
      score -=
        SUGGESTIONS.weights.energyOverBudget *
        ((energyKcal - energyBudget) / Math.max(1, energyBudget));
    }

    // Limits & upper limits.
    for (const [id, headroom] of limitHeadroom) {
      const adds = (food.per100[id] ?? 0) * factor;
      if (adds > 0 && adds > headroom) {
        score -= SUGGESTIONS.weights.limitPush * Math.min(2, adds / Math.max(1, headroom));
      }
    }
    for (const [id, headroom] of ulHeadroom) {
      const adds = (food.per100[id] ?? 0) * factor;
      if (adds > 0 && adds > headroom) score -= SUGGESTIONS.weights.ulPush;
    }

    // Familiarity & meal fit.
    if (ctx.favorites.has(`food:${food.id}`)) score += SUGGESTIONS.weights.favorite;
    const uses = ctx.useCounts.get(food.id) ?? 0;
    if (uses > 0) {
      score += SUGGESTIONS.weights.familiarity * Math.min(1, uses / 5);
    }
    if (
      ctx.mealId &&
      CATEGORY_BY_ID[food.category]?.mealFit.includes(ctx.mealId)
    ) {
      score += SUGGESTIONS.weights.mealFit;
    }

    if (score < SUGGESTIONS.minScore) continue;

    reasons.sort((a, b) => b.closes - a.closes);
    scored.push({
      food,
      score,
      grams,
      amount,
      unit: unit.unit,
      portionLabel: unit.label,
      energyKcal,
      reasons: reasons.slice(0, 3),
    });
  }

  scored.sort((a, b) => b.score - a.score);

  // Diversify by category so the list isn't five kinds of fish.
  const perCategory = new Map<string, number>();
  const result: Suggestion[] = [];
  for (const suggestion of scored) {
    const used = perCategory.get(suggestion.food.category) ?? 0;
    if (used >= SUGGESTIONS.maxPerCategory) continue;
    perCategory.set(suggestion.food.category, used + 1);
    result.push(suggestion);
    if (result.length >= SUGGESTIONS.resultCount) break;
  }
  return result;
}

/** „Deckt 45 % deines Magnesium-Bedarfs" — the card's explanation. */
export function reasonLabel(reason: SuggestionReason): {
  nutrient: string;
  percent: number;
} {
  return {
    nutrient: NUTRIENT_BY_ID[reason.nutrient]?.shortName ??
      NUTRIENT_BY_ID[reason.nutrient]?.name ??
      reason.nutrient,
    percent: Math.round(reason.closes * 100),
  };
}
