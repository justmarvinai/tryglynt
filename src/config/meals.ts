/**
 * Default meal slots (D-020) — copied into settings on first run, where
 * the user can rename/add/remove/reorder them. Time windows drive the
 * meal auto-suggestion when logging.
 */

import type { MealSlot } from "@/lib/db/models";

export const DEFAULT_MEAL_SLOTS: readonly MealSlot[] = [
  { id: "breakfast", name: "Frühstück", fromHour: 5, toHour: 11 },
  { id: "lunch", name: "Mittagessen", fromHour: 11, toHour: 15 },
  { id: "dinner", name: "Abendessen", fromHour: 17, toHour: 22 },
  { id: "snacks", name: "Snacks", fromHour: 0, toHour: 24 },
] as const;

/** Slot whose window contains `hour`, else the catch-all last match. */
export function suggestMealSlot(slots: readonly MealSlot[], hour: number): MealSlot {
  const specific = slots.find(
    (s) => !(s.fromHour === 0 && s.toHour === 24) && hour >= s.fromHour && hour < s.toHour
  );
  return specific ?? slots.find((s) => hour >= s.fromHour && hour < s.toHour) ?? slots[0];
}

export const DEFAULT_GLASS_SIZE_ML = 250;
