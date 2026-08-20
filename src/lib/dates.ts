/**
 * Local-date helpers. Diary days are local "YYYY-MM-DD" strings, day
 * boundary midnight, weeks start Monday (D-026.1).
 */

import { addDays as dfAddDays, format, parseISO, startOfWeek } from "date-fns";
import { de as deLocale } from "date-fns/locale";

export function toISODate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function todayISO(): string {
  return toISODate(new Date());
}

export function addDaysISO(iso: string, days: number): string {
  return toISODate(dfAddDays(parseISO(iso), days));
}

export function mondayOfWeekISO(iso: string): string {
  return toISODate(startOfWeek(parseISO(iso), { weekStartsOn: 1 }));
}

/** „Heute" · „Gestern" · „Mo., 18. Aug." */
export function formatDayTitle(iso: string): string {
  const today = todayISO();
  if (iso === today) return "Heute";
  if (iso === addDaysISO(today, -1)) return "Gestern";
  if (iso === addDaysISO(today, 1)) return "Morgen";
  return format(parseISO(iso), "EEE, d. MMM", { locale: deLocale });
}

export function formatLongDate(iso: string): string {
  return format(parseISO(iso), "EEEE, d. MMMM yyyy", { locale: deLocale });
}

export function weekdayShort(iso: string): string {
  return format(parseISO(iso), "EEEEEE", { locale: deLocale });
}

export function dayOfMonth(iso: string): number {
  return parseISO(iso).getDate();
}
