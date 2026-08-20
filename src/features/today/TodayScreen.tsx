import * as React from "react";
import { CalendarDays, ChevronLeft, ChevronRight, EllipsisVertical } from "lucide-react";
import { ActionSheet } from "@/components/ui/action-sheet";
import { BottomNavSpacer } from "@/components/ui/bottom-nav";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { IconButton } from "@/components/ui/icon-button";
import { Screen } from "@/components/ui/screen";
import { Skeleton } from "@/components/ui/skeleton";
import { TopBar } from "@/components/ui/top-bar";
import { useToast } from "@/components/ui/toast";
import { MealSection } from "@/components/glynt/MealSection";
import { addDaysISO, formatDayTitle, todayISO } from "@/lib/dates";
import { useSettings } from "@/lib/db/repo/appRepo";
import { copyEntries, useDiaryDay } from "@/lib/db/repo/diaryRepo";
import { fmt, t } from "@/lib/i18n";
import { useUiStore } from "@/stores/uiStore";

export function TodayScreen() {
  const { toast } = useToast();
  const settings = useSettings();
  const activeDate = useUiStore((s) => s.activeDate);
  const setActiveDate = useUiStore((s) => s.setActiveDate);
  const openLog = useUiStore((s) => s.openLog);
  const openEntryEdit = useUiStore((s) => s.openEntryEdit);
  const entries = useDiaryDay(activeDate);

  const [menuMealId, setMenuMealId] = React.useState<string | null>(null);
  const [dayMenuOpen, setDayMenuOpen] = React.useState(false);

  const slots = settings?.mealSlots ?? [];
  const loading = entries === undefined || settings === undefined;
  const isEmpty = !loading && entries.length === 0;

  const copyFromYesterday = async (mealId?: string) => {
    const count = await copyEntries({
      fromDate: addDaysISO(activeDate, -1),
      toDate: activeDate,
      mealId,
    });
    toast({
      title:
        count > 0 ? fmt(t.today.copied, { count }) : t.today.copiedNone,
      tone: count > 0 ? "success" : "default",
    });
  };

  return (
    <>
      <TopBar
        title={formatDayTitle(activeDate)}
        leading={
          <IconButton
            label={t.today.prevDay}
            variant="ghost"
            onClick={() => setActiveDate(addDaysISO(activeDate, -1))}
          >
            <ChevronLeft />
          </IconButton>
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
            <IconButton
              label={t.today.nextDay}
              variant="ghost"
              onClick={() => setActiveDate(addDaysISO(activeDate, 1))}
            >
              <ChevronRight />
            </IconButton>
          </>
        }
      />

      <Screen className="pt-2">
        {loading ? (
          <div className="space-y-4">
            <Skeleton className="h-28 rounded-card" />
            <Skeleton className="h-40 rounded-card" />
            <Skeleton className="h-40 rounded-card" />
          </div>
        ) : isEmpty ? (
          <EmptyState
            icon={<CalendarDays />}
            title={t.today.emptyTitle}
            description={t.today.emptyBody}
            action={
              <Button size="md" onClick={() => openLog()}>
                {t.today.logFood}
              </Button>
            }
            className="flex-1"
          />
        ) : (
          slots.map((slot) => (
            <MealSection
              key={slot.id}
              name={slot.name}
              entries={(entries ?? []).filter((e) => e.mealId === slot.id)}
              onAdd={() => openLog(slot.id)}
              onEntryPress={openEntryEdit}
              onMenu={() => setMenuMealId(slot.id)}
            />
          ))
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
        actions={[
          {
            label: t.today.copyDayFromYesterday,
            onSelect: () => void copyFromYesterday(),
          },
        ]}
      />
    </>
  );
}
