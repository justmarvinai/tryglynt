/**
 * First-run / upgrade seeding of the bundled food database
 * (docs/DATA.md §3). Additive: user foods are never touched; seed foods
 * are re-put on version bumps (stable ids → updates in place).
 */

import { db, searchKey } from "./db";
import type { Food } from "./models";

const SEED_STAMP = 0; // deterministic timestamps for seed rows

export async function seedIfNeeded(
  onProgress?: (done: number, total: number) => void
): Promise<void> {
  const { SEED_VERSION, loadSeedCategories } = await import("@/data/foods");
  const current = (await db.meta.get("seedVersion"))?.value as number | undefined;
  if (current === SEED_VERSION) return;

  const categories = await loadSeedCategories();
  const foods: Food[] = categories.flatMap((file) =>
    file.foods.map((seed) => ({
      id: seed.id,
      source: "seed" as const,
      kind: seed.kind ?? "food",
      name: seed.name,
      nameNormalized: searchKey(`${seed.name} ${seed.brand ?? ""}`),
      brand: seed.brand,
      category: file.category,
      per100: seed.n,
      isLiquid: seed.isLiquid,
      portions: seed.portions.map(([label, grams]) => ({ label, grams })),
      dataQuality: "full" as const,
      createdAt: SEED_STAMP,
      updatedAt: SEED_STAMP,
    }))
  );

  const chunkSize = 200;
  for (let i = 0; i < foods.length; i += chunkSize) {
    await db.foods.bulkPut(foods.slice(i, i + chunkSize));
    onProgress?.(Math.min(i + chunkSize, foods.length), foods.length);
  }
  await db.meta.put({ key: "seedVersion", value: SEED_VERSION });
}
