/**
 * Smart-suggestion tuning (D-007, docs/SCIENCE.md §6). Everything the
 * algorithm weighs lives here — no magic numbers in the engine.
 */

export const SUGGESTIONS = {
  /** Don't suggest anything below this remaining energy budget (kcal). */
  minEnergyBudget: 200,
  /** Only nutrients below this coverage count as a gap worth closing. */
  gapThreshold: 0.9,
  /** How many gaps drive the scoring (worst first). */
  maxGapsConsidered: 8,
  /** How many cards to show. */
  resultCount: 5,
  /** At most this many suggestions per food category (diversity). */
  maxPerCategory: 2,
  /** Candidate pool cap after pre-filtering (perf guard). */
  candidateCap: 400,

  weights: {
    /** Base weight of a closed gap fraction. */
    gapClose: 1,
    /** Extra weight for the worst gap (scaled linearly by rank). */
    worstGapBonus: 0.6,
    /** Penalty per unit of energy-budget overshoot. */
    energyOverBudget: 2.5,
    /** Soft penalty for using up budget without closing gaps. */
    energyCost: 0.35,
    /** Penalty when a portion pushes a limit (sugar/satFat/sodium) over. */
    limitPush: 1.2,
    /** Penalty when a portion would exceed an upper limit. */
    ulPush: 4,
    /** Bonus for favorites. */
    favorite: 0.25,
    /** Bonus scaled by how often the food was logged before. */
    familiarity: 0.2,
    /** Bonus when the category fits the current meal slot. */
    mealFit: 0.15,
  },

  /** Minimum score for a suggestion to be shown at all. */
  minScore: 0.12,
} as const;
