import * as React from "react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db/db";
import { useProfile, useSettings } from "@/lib/db/repo/appRepo";
import { useDiaryDay } from "@/lib/db/repo/diaryRepo";
import { useWaterDay } from "@/lib/db/repo/trackingRepo";
import { computeDay, type DayNutrition } from "@/lib/engine/day";
import { computeStreak } from "@/lib/engine/streak";
import { computeTargets, type PersonalTargets } from "@/lib/engine/targets";
import { todayISO } from "@/lib/dates";
import type { DiaryEntry } from "@/lib/db/models";

export interface DayData {
  loading: boolean;
  entries: DiaryEntry[];
  targets?: PersonalTargets;
  day?: DayNutrition;
  streak: number;
}

/** Everything the Heute screen needs for one date, live from Dexie. */
export function useDayData(date: string): DayData {
  const profile = useProfile();
  const settings = useSettings();
  const entries = useDiaryDay(date);
  const water = useWaterDay(date);

  const loggedDates = useLiveQuery(
    async () => new Set((await db.diaryEntries.orderBy("date").keys()) as string[]),
    []
  );

  const targets = React.useMemo(
    () => (profile && settings ? computeTargets(profile, settings) : undefined),
    [profile, settings]
  );

  const day = React.useMemo(
    () => (targets && entries && water ? computeDay(entries, water, targets) : undefined),
    [targets, entries, water]
  );

  return {
    loading: !profile || !settings || !entries || !water,
    entries: entries ?? [],
    targets,
    day,
    streak: loggedDates ? computeStreak(loggedDates, todayISO()) : 0,
  };
}
