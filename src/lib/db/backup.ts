/**
 * Export / import / erase (docs/DATA.md §5). The backup file is the
 * user's safety net — there is no cloud (D-022), so this must be
 * bulletproof and human-inspectable.
 */

import { db } from "./db";
import type {
  DiaryEntry,
  FavoriteRow,
  Food,
  Profile,
  RecentRow,
  Recipe,
  RegimenItem,
  Settings,
  WaterEntry,
  WeightEntry,
} from "./models";

export const BACKUP_VERSION = 1;

export interface BackupFile {
  app: "glynt";
  version: number;
  exportedAt: string;
  appVersion: string;
  data: {
    profile: Profile[];
    settings: Settings[];
    /** Only user-owned foods; seed foods ship with the app. */
    foods: Food[];
    recipes: Recipe[];
    diaryEntries: DiaryEntry[];
    waterLog: WaterEntry[];
    weightLog: WeightEntry[];
    regimen: RegimenItem[];
    favorites: FavoriteRow[];
    recents: RecentRow[];
  };
}

export async function createBackup(): Promise<BackupFile> {
  const [
    profile,
    settings,
    foods,
    recipes,
    diaryEntries,
    waterLog,
    weightLog,
    regimen,
    favorites,
    recents,
  ] = await Promise.all([
    db.profile.toArray(),
    db.settings.toArray(),
    db.foods.filter((f) => f.source !== "seed").toArray(),
    db.recipes.toArray(),
    db.diaryEntries.toArray(),
    db.waterLog.toArray(),
    db.weightLog.toArray(),
    db.regimen.toArray(),
    db.favorites.toArray(),
    db.recents.toArray(),
  ]);
  return {
    app: "glynt",
    version: BACKUP_VERSION,
    exportedAt: new Date().toISOString(),
    appVersion: __APP_VERSION__,
    data: {
      profile,
      settings,
      foods,
      recipes,
      diaryEntries,
      waterLog,
      weightLog,
      regimen,
      favorites,
      recents,
    },
  };
}

export function backupFileName(date = new Date()): string {
  const iso = date.toISOString().slice(0, 10);
  return `glynt-backup-${iso}.json`;
}

/** Triggers a download in the browser. */
export function downloadBackup(backup: BackupFile): void {
  const blob = new Blob([JSON.stringify(backup, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = backupFileName();
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

export interface BackupSummary {
  exportedAt?: string;
  appVersion?: string;
  entries: number;
  foods: number;
  recipes: number;
  weights: number;
  hasProfile: boolean;
}

export class BackupError extends Error {
  constructor(public reason: "format" | "version") {
    super(reason);
  }
}

/** Validates a parsed file and reports what it contains (dry run). */
export function inspectBackup(raw: unknown): { backup: BackupFile; summary: BackupSummary } {
  if (typeof raw !== "object" || raw === null) throw new BackupError("format");
  const candidate = raw as Partial<BackupFile>;
  if (candidate.app !== "glynt" || typeof candidate.version !== "number") {
    throw new BackupError("format");
  }
  if (candidate.version > BACKUP_VERSION) throw new BackupError("version");
  const data = candidate.data;
  if (typeof data !== "object" || data === null) throw new BackupError("format");

  const arr = <T,>(value: T[] | undefined): T[] => (Array.isArray(value) ? value : []);
  const backup: BackupFile = {
    app: "glynt",
    version: candidate.version,
    exportedAt: candidate.exportedAt ?? "",
    appVersion: candidate.appVersion ?? "",
    data: {
      profile: arr(data.profile),
      settings: arr(data.settings),
      foods: arr(data.foods),
      recipes: arr(data.recipes),
      diaryEntries: arr(data.diaryEntries),
      waterLog: arr(data.waterLog),
      weightLog: arr(data.weightLog),
      regimen: arr(data.regimen),
      favorites: arr(data.favorites),
      recents: arr(data.recents),
    },
  };
  return {
    backup,
    summary: {
      exportedAt: backup.exportedAt || undefined,
      appVersion: backup.appVersion || undefined,
      entries: backup.data.diaryEntries.length,
      foods: backup.data.foods.length,
      recipes: backup.data.recipes.length,
      weights: backup.data.weightLog.length,
      hasProfile: backup.data.profile.length > 0,
    },
  };
}

export type ImportMode = "merge" | "replace";

/** Applies a validated backup. Seed foods are never touched. */
export async function applyBackup(backup: BackupFile, mode: ImportMode): Promise<void> {
  const { data } = backup;
  await db.transaction(
    "rw",
    [
      db.profile,
      db.settings,
      db.foods,
      db.recipes,
      db.diaryEntries,
      db.waterLog,
      db.weightLog,
      db.regimen,
      db.favorites,
      db.recents,
    ],
    async () => {
      if (mode === "replace") {
        await Promise.all([
          db.profile.clear(),
          db.settings.clear(),
          db.foods.filter((f) => f.source !== "seed").delete(),
          db.recipes.clear(),
          db.diaryEntries.clear(),
          db.waterLog.clear(),
          db.weightLog.clear(),
          db.regimen.clear(),
          db.favorites.clear(),
          db.recents.clear(),
        ]);
      }
      await Promise.all([
        db.profile.bulkPut(data.profile),
        db.settings.bulkPut(data.settings),
        db.foods.bulkPut(data.foods),
        db.recipes.bulkPut(data.recipes),
        db.diaryEntries.bulkPut(data.diaryEntries),
        db.waterLog.bulkPut(data.waterLog),
        db.weightLog.bulkPut(data.weightLog),
        db.regimen.bulkPut(data.regimen),
        db.favorites.bulkPut(data.favorites),
        db.recents.bulkPut(data.recents),
      ]);
    }
  );
}

/** „Alle Daten löschen" — back to a fresh install. */
export async function eraseAllData(): Promise<void> {
  await db.delete();
  await db.open();
}

/** Ask the browser to keep our storage (iOS eviction protection). */
export async function requestPersistentStorage(): Promise<boolean> {
  if (!navigator.storage?.persist) return false;
  try {
    if (await navigator.storage.persisted()) return true;
    return await navigator.storage.persist();
  } catch {
    return false;
  }
}
