import { useLiveQuery } from "dexie-react-hooks";
import { NUDGES } from "@/config/app";
import { db } from "@/lib/db/db";

/**
 * Gentle backup nudge (D-026.7): no cloud means the user's only safety
 * net is an export, so remind them if the last one is old enough.
 */
export function useBackupReminder(): boolean {
  return (
    useLiveQuery(async () => {
      const entries = await db.diaryEntries.count();
      if (entries === 0) return false;
      const last = (await db.meta.get("lastBackupAt"))?.value as number | undefined;
      const installed = (await db.meta.get("installedAt"))?.value as number | undefined;
      const since = last ?? installed ?? Date.now();
      return Date.now() - since > NUDGES.backupReminderDays * 86_400_000;
    }, []) ?? false
  );
}

export async function markBackupDone(): Promise<void> {
  await db.meta.put({ key: "lastBackupAt", value: Date.now() });
}
