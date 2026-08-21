/**
 * Seed database barrel. Category files are discovered via glob so adding
 * a category never touches shared files. Bump SEED_VERSION whenever seed
 * content changes — the app re-seeds additively on next start
 * (docs/DATA.md §3).
 */

import type { SeedCategoryFile } from "./types";

export const SEED_VERSION = 2;

const modules = import.meta.glob<{ [key: string]: SeedCategoryFile | unknown }>(
  "./categories/*.ts"
);

/** Loads all category files (lazy chunks — called once at seed time). */
export async function loadSeedCategories(): Promise<SeedCategoryFile[]> {
  const files = await Promise.all(Object.values(modules).map((load) => load()));
  return files.map((mod) => {
    const file = Object.values(mod).find(
      (v): v is SeedCategoryFile =>
        typeof v === "object" && v !== null && "category" in v && "foods" in v
    );
    if (!file) throw new Error("Seed category file without SeedCategoryFile export");
    return file;
  });
}
