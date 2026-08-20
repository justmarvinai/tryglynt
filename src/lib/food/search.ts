/**
 * In-memory food search with German-aware normalization and simple,
 * predictable ranking: prefix > word-start > contains; every query term
 * must match. The whole DB (a few thousand rows) is searched in memory —
 * fast, and results stay stable offline.
 */

import { normalizeName } from "@/lib/db/db";
import type { Food, Recipe } from "@/lib/db/models";

export interface Searchable {
  /** Precomputed normalized haystack. */
  nameNormalized: string;
  name: string;
}

function scoreOne(haystack: string, term: string): number | null {
  if (haystack.startsWith(term)) return 0;
  if (haystack.includes(` ${term}`) || haystack.includes(`-${term}`)) return 1;
  if (haystack.includes(term)) return 2;
  return null;
}

/** Lower = better; null = no match. */
export function matchScore(item: Searchable, terms: string[]): number | null {
  let total = 0;
  for (const term of terms) {
    const s = scoreOne(item.nameNormalized, term);
    if (s === null) return null;
    total += s;
  }
  return total;
}

export function queryTerms(query: string): string[] {
  return normalizeName(query).split(/\s+/).filter(Boolean);
}

export function searchItems<T extends Searchable>(
  items: T[],
  query: string,
  limit = 50
): T[] {
  const terms = queryTerms(query);
  if (terms.length === 0) return items.slice(0, limit);
  const scored: Array<{ item: T; score: number }> = [];
  for (const item of items) {
    const score = matchScore(item, terms);
    if (score !== null) scored.push({ item, score });
  }
  scored.sort(
    (a, b) =>
      a.score - b.score ||
      a.item.name.length - b.item.name.length ||
      a.item.name.localeCompare(b.item.name, "de")
  );
  return scored.slice(0, limit).map((s) => s.item);
}

export const searchFoods = (foods: Food[], query: string, limit = 50) =>
  searchItems(foods, query, limit);

export const searchRecipes = (recipes: Recipe[], query: string, limit = 50) =>
  searchItems(recipes, query, limit);
