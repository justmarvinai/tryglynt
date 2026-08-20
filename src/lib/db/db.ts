/**
 * Dexie database — schema per docs/DATA.md §2.
 * Components never touch this directly; repositories in lib/db/repo/ do.
 */

import Dexie, { type EntityTable } from "dexie";
import type {
  DiaryEntry,
  FavoriteRow,
  Food,
  MetaRow,
  Profile,
  RecentRow,
  Recipe,
  RegimenItem,
  Settings,
  WaterEntry,
  WeightEntry,
} from "./models";

export class GlyntDB extends Dexie {
  profile!: EntityTable<Profile, "id">;
  settings!: EntityTable<Settings, "id">;
  foods!: EntityTable<Food, "id">;
  recipes!: EntityTable<Recipe, "id">;
  diaryEntries!: EntityTable<DiaryEntry, "id">;
  waterLog!: EntityTable<WaterEntry, "id">;
  weightLog!: EntityTable<WeightEntry, "id">;
  regimen!: EntityTable<RegimenItem, "id">;
  favorites!: EntityTable<FavoriteRow, "foodRef">;
  recents!: EntityTable<RecentRow, "foodRef">;
  meta!: EntityTable<MetaRow, "key">;

  constructor() {
    super("glynt");
    this.version(1).stores({
      profile: "id",
      settings: "id",
      foods: "id, nameNormalized, category, source, kind, barcode",
      recipes: "id, nameNormalized",
      diaryEntries: "id, date, [date+mealId], refId",
      waterLog: "id, date",
      weightLog: "id, date",
      regimen: "id, sortOrder",
      favorites: "foodRef, addedAt",
      recents: "foodRef, lastUsedAt",
      meta: "key",
    });
  }
}

export const db = new GlyntDB();

/** Fold to a search-friendly key: lowercase, no diacritics, ß→ss. */
export function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .replaceAll("ß", "ss")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

export function newId(): string {
  return crypto.randomUUID();
}
