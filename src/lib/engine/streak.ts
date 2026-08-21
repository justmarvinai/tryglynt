/**
 * Logging consistency (D-005): consecutive days with at least one entry,
 * counted backwards from today. Today not yet logged does NOT break the
 * streak — yesterday's counts until the day is over.
 */

import { addDaysISO } from "@/lib/dates";

export function computeStreak(loggedDates: Set<string>, today: string): number {
  let streak = 0;
  let cursor = loggedDates.has(today) ? today : addDaysISO(today, -1);
  while (loggedDates.has(cursor)) {
    streak += 1;
    cursor = addDaysISO(cursor, -1);
  }
  return streak;
}
