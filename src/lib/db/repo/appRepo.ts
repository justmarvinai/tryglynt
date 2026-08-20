/**
 * Profile & settings repository + live hooks. Components never touch
 * Dexie directly (docs/ARCHITECTURE.md §4).
 */

import { useLiveQuery } from "dexie-react-hooks";
import { DEFAULT_GLASS_SIZE_ML, DEFAULT_MEAL_SLOTS } from "@/config/meals";
import { db } from "@/lib/db/db";
import type { Profile, Settings } from "@/lib/db/models";

export function defaultSettings(): Settings {
  return {
    id: "app",
    units: "metric",
    mealSlots: DEFAULT_MEAL_SLOTS.map((s) => ({ ...s })),
    glassSizeMl: DEFAULT_GLASS_SIZE_ML,
    updatedAt: Date.now(),
  };
}

/** undefined = loading · null = not present (drives the onboarding gate). */
export function useProfile(): Profile | null | undefined {
  return useLiveQuery(async () => (await db.profile.get("me")) ?? null, []);
}

export function useSettings(): Settings | null | undefined {
  return useLiveQuery(async () => (await db.settings.get("app")) ?? null, []);
}

export async function getSettingsOrDefault(): Promise<Settings> {
  return (await db.settings.get("app")) ?? defaultSettings();
}

/** Completes onboarding: persists profile + settings, stamps install meta. */
export async function completeOnboarding(
  profile: Omit<Profile, "id" | "createdAt" | "updatedAt">,
  unitPref: Settings["units"]
): Promise<void> {
  const now = Date.now();
  await db.transaction("rw", [db.profile, db.settings, db.meta], async () => {
    await db.profile.put({ ...profile, id: "me", createdAt: now, updatedAt: now });
    const settings = (await db.settings.get("app")) ?? defaultSettings();
    await db.settings.put({ ...settings, units: unitPref, updatedAt: now });
    if (!(await db.meta.get("installedAt"))) {
      await db.meta.put({ key: "installedAt", value: now });
    }
  });
}

export async function updateProfile(patch: Partial<Omit<Profile, "id">>): Promise<void> {
  await db.profile.update("me", { ...patch, updatedAt: Date.now() });
}

export async function updateSettings(
  patch: Partial<Omit<Settings, "id">>
): Promise<void> {
  const current = await getSettingsOrDefault();
  await db.settings.put({ ...current, ...patch, updatedAt: Date.now() });
}
