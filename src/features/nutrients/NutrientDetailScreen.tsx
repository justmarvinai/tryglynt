import * as React from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Info, Plus } from "lucide-react";
import { BottomNavSpacer } from "@/components/ui/bottom-nav";
import { Callout } from "@/components/ui/callout";
import { IconButton } from "@/components/ui/icon-button";
import { Row, RowGroup } from "@/components/ui/list-row";
import { Screen } from "@/components/ui/screen";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Skeleton } from "@/components/ui/skeleton";
import { TopBar } from "@/components/ui/top-bar";
import { NutrientBar } from "@/components/glynt/NutrientBar";
import { TrendChart, type TrendPoint } from "@/components/glynt/TrendChart";
import { NUTRIENT_BY_ID } from "@/config/nutrients";
import { REFERENCE_SOURCE_NAMES } from "@/lib/engine/reference";
import { addDaysISO, dayOfMonth, todayISO, weekdayShort } from "@/lib/dates";
import { useProfile } from "@/lib/db/repo/appRepo";
import { getDiaryRange } from "@/lib/db/repo/diaryRepo";
import { useAllFoods } from "@/lib/db/repo/foodRepo";
import type { DiaryEntry } from "@/lib/db/models";
import type { NutrientId } from "@/lib/engine/types";
import { databaseSources, todaySources } from "@/lib/food/sources";
import { fmt, formatAmount, formatNumber, t } from "@/lib/i18n";
import { useUiStore } from "@/stores/uiStore";
import { useDayData } from "@/features/today/useDayData";

const KIND_LABELS: Record<string, string> = {
  RDA: t.nutrients.kindRDA,
  PRI: t.nutrients.kindPRI,
  AI: t.nutrients.kindAI,
  safe: t.nutrients.kindsafe,
};

export function NutrientDetailScreen() {
  const navigate = useNavigate();
  const { id } = useParams();
  const nutrientId = id as NutrientId;
  const def = NUTRIENT_BY_ID[nutrientId];

  const activeDate = useUiStore((s) => s.activeDate);
  const openPortion = useUiStore((s) => s.openPortion);
  const profile = useProfile();
  const foods = useAllFoods();
  const { loading, entries, day, targets } = useDayData(activeDate);

  const [range, setRange] = React.useState<"7" | "30">("7");
  const [history, setHistory] = React.useState<DiaryEntry[] | null>(null);

  const days = Number(range);
  const fromDate = addDaysISO(activeDate, -(days - 1));

  React.useEffect(() => {
    let cancelled = false;
    void getDiaryRange(fromDate, activeDate).then((rows) => {
      if (!cancelled) setHistory(rows);
    });
    return () => {
      cancelled = true;
    };
  }, [fromDate, activeDate, entries.length]);

  const status = day?.statuses.find((s) => s.id === nutrientId);
  const microTarget = targets?.micros.find((m) => m.id === nutrientId);

  const points: TrendPoint[] = React.useMemo(() => {
    const byDate = new Map<string, number>();
    for (const entry of history ?? []) {
      byDate.set(
        entry.date,
        (byDate.get(entry.date) ?? 0) + (entry.snapshot[nutrientId] ?? 0)
      );
    }
    return Array.from({ length: days }, (_, i) => {
      const date = addDaysISO(fromDate, i);
      return {
        date,
        value: byDate.get(date) ?? 0,
        label: days <= 7 ? weekdayShort(date) : String(dayOfMonth(date)),
      };
    });
  }, [history, days, fromDate, nutrientId]);

  const average =
    points.length > 0 ? points.reduce((s, p) => s + p.value, 0) / points.length : 0;

  const todayRows = todaySources(entries, nutrientId);
  const dbRows = React.useMemo(
    () => databaseSources(foods ?? [], nutrientId),
    [foods, nutrientId]
  );

  if (!def) {
    return (
      <>
        <TopBar
          title={t.nutrients.title}
          leading={
            <IconButton label={t.common.back} variant="ghost" onClick={() => navigate(-1)}>
              <ChevronLeft />
            </IconButton>
          }
        />
        <Screen>
          <Callout tone="warning">{t.nutrients.empty}</Callout>
        </Screen>
      </>
    );
  }

  return (
    <>
      <TopBar
        title={def.name}
        leading={
          <IconButton label={t.common.back} variant="ghost" onClick={() => navigate(-1)}>
            <ChevronLeft />
          </IconButton>
        }
      />
      <Screen className="pt-1">
        {loading || !day ? (
          <div className="space-y-4">
            <Skeleton className="h-24 rounded-card" />
            <Skeleton className="h-40 rounded-card" />
          </div>
        ) : (
          <>
            {/* Today's status */}
            <section className="rounded-card bg-surface p-5">
              {status ? (
                <NutrientBar status={status} />
              ) : (
                <p className="text-subhead text-muted">{t.nutrients.noTarget}</p>
              )}
              <div className="mt-3 space-y-1 text-footnote text-muted">
                {microTarget && (
                  <p>
                    {fmt(t.nutrients.sourceLabel, {
                      kind: KIND_LABELS[microTarget.kind] ?? microTarget.kind,
                      source: REFERENCE_SOURCE_NAMES[microTarget.source],
                    })}
                    {microTarget.energyDerived && ` · ${t.nutrients.energyDerived}`}
                  </p>
                )}
                {status?.ul != null ? (
                  <p>
                    {fmt(t.nutrients.ulLabel, {
                      value: formatAmount(status.ul, def.unit, def.decimals),
                    })}
                  </p>
                ) : (
                  microTarget && <p>{t.nutrients.noUl}</p>
                )}
                {status && status.gaps > 0 && (
                  <p>{fmt(t.nutrients.gapsHint, { count: status.gaps })}</p>
                )}
                {def.targetType === "limit" && <p>{t.nutrients.limitHint}</p>}
                {def.targetType === "info" && <p>{t.nutrients.infoHint}</p>}
              </div>
            </section>

            {/* Trend */}
            <section className="mt-4 rounded-card bg-surface p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-title3">{t.nutrients.trendTitle}</h2>
                <SegmentedControl
                  size="sm"
                  options={[
                    { value: "7", label: t.nutrients.trend7 },
                    { value: "30", label: t.nutrients.trend30 },
                  ]}
                  value={range}
                  onChange={(v) => setRange(v as "7" | "30")}
                />
              </div>
              <p className="mt-1 text-footnote text-muted">
                {fmt(t.nutrients.average, {
                  value: formatAmount(average, def.unit, def.decimals),
                })}
                {status?.target
                  ? ` · ${fmt(t.nutrients.ofTarget, {
                      pct: formatNumber(Math.round((average / status.target) * 100), 0),
                    })}`
                  : ""}
              </p>
              <TrendChart
                className="mt-4"
                points={points}
                target={status?.target}
                unit={def.unit}
                decimals={def.decimals}
              />
            </section>

            {/* Today's sources */}
            <section className="mt-4">
              <h2 className="mb-2.5 px-1 text-title3">{t.nutrients.topSourcesToday}</h2>
              {todayRows.length === 0 ? (
                <Callout tone="info">{t.nutrients.noEntriesToday}</Callout>
              ) : (
                <RowGroup joined>
                  {todayRows.map((row) => (
                    <Row
                      key={row.key}
                      title={row.name}
                      trailing="none"
                      value={formatAmount(row.amount, def.unit, def.decimals)}
                    />
                  ))}
                </RowGroup>
              )}
            </section>

            {/* Database sources — one tap to log */}
            {dbRows.length > 0 && (
              <section className="mt-6">
                <h2 className="mb-2.5 px-1 text-title3">{t.nutrients.topSourcesAll}</h2>
                <RowGroup joined>
                  {dbRows.map((row) => (
                    <Row
                      key={row.key}
                      title={row.name}
                      subtitle={row.portionLabel}
                      value={formatAmount(row.amount, def.unit, def.decimals)}
                      trailing={<Plus className="size-5 text-accent-text" />}
                      onPress={() =>
                        row.foodId && openPortion({ kind: "food", foodId: row.foodId })
                      }
                    />
                  ))}
                </RowGroup>
              </section>
            )}

            {/* Info */}
            <section className="mt-6 rounded-card bg-surface p-5">
              <div className="flex items-center gap-2.5">
                <Info className="size-5 text-accent-text" />
                <h2 className="text-title3">{t.nutrients.whatFor}</h2>
              </div>
              <p className="mt-2 text-body leading-relaxed text-muted">{def.info}</p>
            </section>

            {profile && activeDate !== todayISO() && (
              <p className="mt-4 px-1 text-footnote text-faint">{activeDate}</p>
            )}
          </>
        )}
        <BottomNavSpacer />
      </Screen>
    </>
  );
}
