import * as React from "react";
import { useNavigate } from "react-router";
import {
  CalendarDays,
  ChevronRight,
  EllipsisVertical,
  Flame,
  Pill,
} from "lucide-react";
import { ActionSheet } from "@/components/ui/action-sheet";
import { BottomNavSpacer } from "@/components/ui/bottom-nav";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { IconButton } from "@/components/ui/icon-button";
import { Screen } from "@/components/ui/screen";
import { Skeleton } from "@/components/ui/skeleton";
import { TopBar } from "@/components/ui/top-bar";
import { useToast } from "@/components/ui/toast";
import { CoverageSummary } from "@/components/glynt/CoverageSummary";
import { DayNavigator } from "@/components/glynt/DayNavigator";
import { EnergyRing } from "@/components/glynt/EnergyRing";
import { MealSection } from "@/components/glynt/MealSection";
import { NutrientBar } from "@/components/glynt/NutrientBar";
import { WaterCard } from "@/components/glynt/WaterCard";
import { FEATURES } from "@/config/app";
import { addDaysISO, formatDayTitle, todayISO } from "@/lib/dates";
import { useSettings } from "@/lib/db/repo/appRepo";
import { copyEntries } from "@/lib/db/repo/diaryRepo";
import { addWater, logRegimen, removeLastWater, useRegimen } from "@/lib/db/repo/trackingRepo";
import type { NutrientStatus } from "@/lib/engine/day";
import { fmt, t } from "@/lib/i18n";
import { useUiStore } from "@/stores/uiStore";
import { useDayData } from "./useDayData";

/** Macro bars shown under the ring, in this order. */
const MACRO_IDS = ["protein", "carbs", "fat", "fiber"] as const;
const LIMIT_IDS = ["sugar", "satFat", "sodium"] as const;

export function TodayScreen() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const settings = useSettings();
  const regimen = useRegimen();
  const activeDate = useUiStore((s) => s.activeDate);
  const setActiveDate = useUiStore((s) => s.setActiveDate);
  const openLog = useUiStore((s) => s.openLog);
  const openEntryEdit = useUiStore((s) => s.openEntryEdit);

  const { loading, entries, day, streak } = useDayData(activeDate);

  const [menuMealId, setMenuMealId] = React.useState<string | null>(null);
  const [dayMenuOpen, setDayMenuOpen] = React.useState(false);

  const slots = settings?.mealSlots ?? [];
  const isEmpty = !loading && entries.length === 0;

  const statusById = React.useMemo(() => {
    const map = new Map<string, NutrientStatus>();
    for (const s of day?.statuses ?? []) map.set(s.id, s);
    return map;
  }, [day]);

  const copyFromYesterday = async (mealId?: string) => {
    const count = await copyEntries({
      fromDate: addDaysISO(activeDate, -1),
      toDate: activeDate,
      mealId,
    });
    toast({
      title: count > 0 ? fmt(t.today.copied, { count }) : t.today.copiedNone,
      tone: count > 0 ? "success" : "default",
    });
  };

  const dayActions = [
    {
      label: t.today.copyDayFromYesterday,
      onSelect: () => void copyFromYesterday(),
    },
    ...(FEATURES.supplements && (regimen ?? []).length > 0
      ? [
          {
            label: t.today.logStack,
            icon: <Pill />,
            onSelect: async () => {
              const count = await logRegimen(activeDate);
              toast({ title: fmt(t.stack.logged, { count }), tone: "success" });
            },
          },
        ]
      : []),
  ];

  return (
    <>
      <TopBar
        title={formatDayTitle(activeDate)}
        leading={
          streak > 0 ? (
            <span className="flex items-center gap-1 rounded-full bg-surface px-3 py-1.5 text-footnote font-bold text-muted">
              <Flame className="size-4 text-accent" />
              {streak}
            </span>
          ) : undefined
        }
        trailing={
          <>
            {activeDate !== todayISO() && (
              <IconButton
                label={t.today.backToToday}
                variant="ghost"
                onClick={() => setActiveDate(todayISO())}
              >
                <CalendarDays />
              </IconButton>
            )}
            <IconButton
              label={t.today.dayMenu}
              variant="ghost"
              onClick={() => setDayMenuOpen(true)}
            >
              <EllipsisVertical />
            </IconButton>
          </>
        }
      />

      <Screen className="pt-1">
        <DayNavigator activeDate={activeDate} onSelect={setActiveDate} />

        {loading || !day ? (
          <div className="mt-6 space-y-4">
            <Skeleton className="mx-auto size-52 rounded-full" />
            <Skeleton className="h-32 rounded-card" />
            <Skeleton className="h-40 rounded-card" />
          </div>
        ) : (
          <>
            {/* Energy + macros */}
            <section className="mt-5 rounded-card bg-surface p-5">
              <EnergyRing
                consumed={day.energy.consumed}
                target={day.energy.target}
                label={t.today.remaining}
                overLabel={t.today.over}
              />
              <div className="mt-6 grid grid-cols-2 gap-x-5 gap-y-4">
                {MACRO_IDS.map((id) => {
                  const status = statusById.get(id);
                  return status ? (
                    <NutrientBar
                      key={id}
                      status={status}
                      compact
                      onPress={() => navigate(`/naehrstoff/${id}`)}
                    />
                  ) : null;
                })}
              </div>
              <div className="mt-5 border-t border-hairline pt-4">
                <div className="grid grid-cols-1 gap-3">
                  {LIMIT_IDS.map((id) => {
                    const status = statusById.get(id);
                    return status ? (
                      <NutrientBar
                        key={id}
                        status={status}
                        compact
                        onPress={() => navigate(`/naehrstoff/${id}`)}
                      />
                    ) : null;
                  })}
                </div>
              </div>
              <Button
                variant="ghost"
                size="md"
                full
                className="mt-3 text-accent"
                onClick={() => navigate(`/heute/naehrstoffe?date=${activeDate}`)}
              >
                {t.today.allNutrients} <ChevronRight />
              </Button>
            </section>

            {/* Micronutrient coverage — the differentiator */}
            <CoverageSummary
              className="mt-4"
              day={day}
              onPress={() => navigate(`/heute/naehrstoffe?date=${activeDate}`)}
              onNutrientPress={(id) => navigate(`/naehrstoff/${id}`)}
            />

            {/* Water */}
            <WaterCard
              className="mt-4"
              consumedMl={day.water.consumed}
              targetMl={day.water.target}
              glassMl={settings?.glassSizeMl ?? 250}
              onAdd={() => void addWater(activeDate, settings?.glassSizeMl ?? 250)}
              onRemove={() => void removeLastWater(activeDate)}
            />

            {/* Meals */}
            {isEmpty ? (
              <EmptyState
                icon={<CalendarDays />}
                title={t.today.emptyTitle}
                description={t.today.emptyBody}
                action={
                  <Button size="md" onClick={() => openLog()}>
                    {t.today.logFood}
                  </Button>
                }
                className="mt-2"
              />
            ) : (
              slots.map((slot) => (
                <MealSection
                  key={slot.id}
                  name={slot.name}
                  entries={entries.filter((e) => e.mealId === slot.id)}
                  onAdd={() => openLog(slot.id)}
                  onEntryPress={openEntryEdit}
                  onMenu={() => setMenuMealId(slot.id)}
                />
              ))
            )}
          </>
        )}
        <BottomNavSpacer />
      </Screen>

      <ActionSheet
        open={menuMealId != null}
        onOpenChange={(o) => (o ? undefined : setMenuMealId(null))}
        title={slots.find((s) => s.id === menuMealId)?.name}
        cancelLabel={t.common.cancel}
        actions={[
          {
            label: t.today.copyMealFromYesterday,
            onSelect: () => {
              const mealId = menuMealId ?? undefined;
              void copyFromYesterday(mealId);
            },
          },
        ]}
      />

      <ActionSheet
        open={dayMenuOpen}
        onOpenChange={setDayMenuOpen}
        title={formatDayTitle(activeDate)}
        cancelLabel={t.common.cancel}
        actions={dayActions}
      />
    </>
  );
}
