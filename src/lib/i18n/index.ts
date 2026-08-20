/**
 * Minimal typed i18n. v1 ships German only (D-018); the indirection keeps
 * every string in one place and makes future locales a file swap.
 *
 * Usage:  t.today.title           — plain strings
 *         fmt(t.x.y, { n: 3 })    — templated strings with {placeholders}
 */

import { de } from "./de";

export const t = de;

export type Strings = typeof de;

/** Replace {placeholders} in a template string. */
export function fmt(
  template: string,
  values: Record<string, string | number>
): string {
  return template.replace(/\{(\w+)\}/g, (m, key: string) =>
    key in values ? String(values[key]) : m
  );
}

const NARROW_NBSP = "\u202f";

/** de-DE number formatting with sensible defaults. */
export function formatNumber(value: number, maxFractionDigits = 1): string {
  return new Intl.NumberFormat("de-DE", {
    maximumFractionDigits: maxFractionDigits,
  }).format(value);
}

/** "12 g", "340 kcal" — value + unit with a narrow no-break space. */
export function formatAmount(
  value: number,
  unit: string,
  maxFractionDigits = 1
): string {
  return `${formatNumber(value, maxFractionDigits)}${NARROW_NBSP}${unit}`;
}
