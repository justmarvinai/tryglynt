import * as React from "react";
import { FEATURES } from "@/config/app";
import { useAllFoods } from "@/lib/db/repo/foodRepo";
import { useFavorites, useRecents } from "@/lib/db/repo/trackingRepo";
import type { DayNutrition } from "@/lib/engine/day";
import { suggestFoods, type Suggestion } from "@/lib/engine/suggestions";

/** Live gap-closing suggestions for a day (D-007). */
export function useSuggestions(
  day: DayNutrition | undefined,
  mealId?: string
): Suggestion[] {
  const foods = useAllFoods();
  const favorites = useFavorites();
  const recents = useRecents(100);

  return React.useMemo(() => {
    if (!FEATURES.suggestions || !day || !foods) return [];
    const favoriteRefs = new Set((favorites ?? []).map((f) => f.foodRef));
    const useCounts = new Map<string, number>();
    for (const recent of recents ?? []) {
      const [kind, id] = recent.foodRef.split(":");
      if (kind === "food") useCounts.set(id, recent.useCount);
    }
    return suggestFoods({
      day,
      foods: foods.filter((f) => f.kind === "food" && f.source !== "off"),
      favorites: favoriteRefs,
      useCounts,
      mealId,
    });
  }, [day, foods, favorites, recents, mealId]);
}
