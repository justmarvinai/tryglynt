import { describe, expect, it } from "vitest";
import {
  BackupError,
  BACKUP_VERSION,
  backupFileName,
  inspectBackup,
} from "@/lib/db/backup";

const valid = {
  app: "glynt",
  version: BACKUP_VERSION,
  exportedAt: "2026-08-21T10:00:00.000Z",
  appVersion: "0.1.0",
  data: {
    profile: [{ id: "me" }],
    diaryEntries: [{ id: "1" }, { id: "2" }],
    foods: [{ id: "f" }],
    recipes: [],
    weightLog: [{ id: "w" }],
  },
};

describe("backup", () => {
  it("names files by date", () => {
    expect(backupFileName(new Date("2026-08-21T12:00:00Z"))).toBe(
      "glynt-backup-2026-08-21.json"
    );
  });

  it("summarizes a valid backup without applying it", () => {
    const { summary, backup } = inspectBackup(valid);
    expect(summary.entries).toBe(2);
    expect(summary.foods).toBe(1);
    expect(summary.weights).toBe(1);
    expect(summary.hasProfile).toBe(true);
    // missing collections default to empty arrays
    expect(backup.data.waterLog).toEqual([]);
    expect(backup.data.favorites).toEqual([]);
  });

  it("rejects foreign or malformed files", () => {
    expect(() => inspectBackup(null)).toThrow(BackupError);
    expect(() => inspectBackup({ app: "other", version: 1, data: {} })).toThrow(BackupError);
    expect(() => inspectBackup({ app: "glynt", version: 1 })).toThrow(BackupError);
  });

  it("refuses backups from a newer app version", () => {
    try {
      inspectBackup({ ...valid, version: BACKUP_VERSION + 1 });
      expect.unreachable();
    } catch (error) {
      expect((error as BackupError).reason).toBe("version");
    }
  });
});
