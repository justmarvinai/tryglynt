import * as React from "react";
import { useNavigate } from "react-router";
import { ChartColumn, Plus, Scale, Sparkles } from "lucide-react";
import { BottomNavSpacer } from "@/components/ui/bottom-nav";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { Row, RowGroup } from "@/components/ui/list-row";
import { Screen } from "@/components/ui/screen";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { Skeleton } from "@/components/ui/skeleton";
import { TopBar } from "@/components/ui/top-bar";
import { NutrientBar } from "@/components/glynt/NutrientBar";
import { TrendChart, type TrendPoint } from "@/components/glynt/TrendChart";
import { WeightSparkline } from "@/components/glynt/WeightSparkline";
import { NUTRIENT_BY_ID } from "@/config/nutrients";
import { addDaysISO, dayOfMonth, todayISO, weekdayShort } from "@/lib/dates";
import { useProfile, useSettings } from "@/lib/db/repo/appRepo";
import { getDiaryRange } from "@/lib/db/repo/diaryRepo";
import { useWeightLog } from "@/lib/db/repo/trackingRepo";
import { db } from "@/lib/db/db";
import type { DiaryEntry, WaterEntry } from "@/lib/db/models";
import { computeRangeInsights, type RangeInsights } from "@/lib/engine/insights";
import { computeTargets } from "@/lib/engine/targets";
import { kgToLb } from "@/config/units";
import { fmt, formatAmount, formatNumber, t } from "@/lib/i18n";
import { WeightSheet } from "./WeightSheet";

type Range = "7" | "30" | "90";

export function InsightsScreen() {
  const navigate = useNavigate();
  const profile = useProfile();
  const settings = useSettings();
  const weightLog = useWeightLog();

  const [range, setRange] = React.useState<Range>("7");
  const [data, setData] = React.useState<{
    entries: DiaryEntry[];
    water: WaterEntry[];
  } | null>(null);
  const [weightOpen, setWeightOpen] = React.useState(false);

  const days = Number(range);
  const today = todayISO();
  const fromDate = addDaysISO(today, -(days - 1));

  React.useEffect(() => {
    let cancelled = false;
    void (async () => {
      const [entries, water] = await Promise.all([
        getDiaryRange(fromDate, today),
        db.waterLog.where("date").between(fromDate, today, true, true).toArray(),
      ]);
      if (!cancelled) setData({ entries, water });
    })();
    return () => {
      cancelled = true;
    };
  }, [fromDate, today]);

  const targets = React.useMemo(
    () => (profile && settings ? computeTargets(profile, settings) : undefined),
    [profile, settings]
  );

  const insights: RangeInsights | undefined = React.useMemo(() => {
    if (!targets || !data) return undefined;
    return computeRangeInsights(data.entries, data.water, targets, fromDate, days);
  }, [targets, data, fromDate, days]);

  const loading = !insights || !targets;
  const imperial = settings?.units === "imperial";

  const energyPoints: TrendPoint[] = (insights?.energyPerDay ?? []).map((p) => ({
    date: p.date,
    value: p.value,
    label: days <= 7 ? weekdayShort(p.date) : String(dayOfMonth(p.date)),
  }));

  const weightEntries = weightLog ?? [];
  const weightDelta =
    weightEntries.length >= 2
      ? weightEntries[weightEntries.length - 1].weightKg - weightEntries[0].weightKg
      : undefined;

  return (
    <>
      <TopBar title={t.insights.title} large />
      <Screen className="pt-1">
        <SegmentedControl
          full
          options={[
            { value: "7", label: t.insights.range7 },
            { value: "30", label: t.insights.range30 },
            { value: "90", label: t.insights.range90 },
          ]}
          value={range}
          onChange={(v) => setRange(v as Range)}
        />

        {loading ? (
          <div className="mt-5 space-y-4">
            <Skeleton className="h-44 rounded-card" />
            <Skeleton className="h-32 rounded-card" />
          </div>
        ) : insights.loggedDays === 0 ? (
          <EmptyState
            icon={<ChartColumn />}
            title={t.insights.emptyTitle}
            description={t.insights.emptyBody}
            className="flex-1"
          />
        ) : (
          <>
            {/* Energy */}
            <section className="mt-5 rounded-card bg-surface p-5">
              <h2 className="text-title3">{t.insights.energyTitle}</h2>
              <p className="mt-0.5 text-footnote text-muted">
                {fmt(t.insights.energyAvg, {
                  value: formatNumber(insights.averageEnergy, 0),
                  target: formatNumber(targets.energyKcal, 0),
                })}
              </p>
              <TrendChart
                className="mt-4"
                points={energyPoints}
                target={targets.energyKcal}
                unit="kcal"
              />
            </section>

            {/* Macro averages */}
            <section className="mt-4 rounded-card bg-surface p-5">
              <h2 className="text-title3">{t.insights.macroTitle}</h2>
              <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-4">
                {(
                  [
                    ["protein", insights.averageMacros.proteinG, targets.macros.proteinG],
                    ["carbs", insights.averageMacros.carbsG, targets.macros.carbsG],
                    ["fat", insights.averageMacros.fatG, targets.macros.fatG],
                    ["fiber", insights.averageMacros.fiberG, targets.macros.fiberG],
                  ] as const
                ).map(([id, amount, target]) => (
                  <NutrientBar
                    key={id}
                    compact
                    status={{
                      id,
                      amount,
                      target,
                      coverage: target > 0 ? amount / target : 0,
                      targetType: "goal",
                      overUl: false,
                      gaps: 0,
                      noData: false,
                    }}
                  />
                ))}
              </div>
            </section>

            {/* Micro coverage, worst first */}
            <section className="mt-4 rounded-card bg-surface p-5">
              <h2 className="text-title3">{t.insights.coverageTitle}</h2>
              <p className="mt-0.5 text-footnote text-muted">
                {t.insights.coverageHint}
              </p>
              <div className="mt-4 flex flex-col gap-4">
                {insights.microCoverage.slice(0, 10).map((micro) => (
                  <NutrientBar
                    key={micro.id}
                    display="percent"
                    onPress={() => navigate(`/naehrstoff/${micro.id}`)}
                    status={{
                      id: micro.id,
                      amount: micro.coverage * 100,
                      target: 100,
                      coverage: micro.coverage,
                      targetType: "goal",
                      overUl: false,
                      gaps: 0,
                      noData: false,
                    }}
                  />
                ))}
              </div>
            </section>

            {/* Recap */}
            <section className="mt-4 rounded-card bg-accent-soft p-5 text-accent">
              <div className="flex items-center gap-2.5">
                <Sparkles className="size-5" />
                <h2 className="text-title3">{t.insights.recapTitle}</h2>
              </div>
              <div className="mt-2 space-y-1 text-subhead font-semibold">
                <p>
                  {fmt(t.insights.consistencyBody, {
                    days: insights.loggedDays,
                    total: days,
                  })}
                </p>
                {insights.best && (
                  <p>
                    {fmt(t.insights.recapBest, {
                      nutrient: NUTRIENT_BY_ID[insights.best]?.name ?? insights.best,
                    })}
                  </p>
                )}
                {insights.worst && (
                  <p>
                    {fmt(t.insights.recapWorst, {
                      nutrient: NUTRIENT_BY_ID[insights.worst]?.name ?? insights.worst,
                    })}
                  </p>
                )}
              </div>
            </section>
          </>
        )}

        {/* Weight journal */}
        <section className="mt-4 rounded-card bg-surface p-5">
          <div className="flex items-center gap-3">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-row bg-accent-soft text-accent">
              <Scale className="size-5" />
            </span>
            <div className="min-w-0 flex-1">
              <h2 className="truncate text-title3">{t.insights.weightTitle}</h2>
              {weightEntries.length > 0 && (
                <p className="mt-0.5 text-footnote text-muted tabular-nums">
                  {formatAmount(
                    imperial
                      ? kgToLb(weightEntries[weightEntries.length - 1].weightKg)
                      : weightEntries[weightEntries.length - 1].weightKg,
                    imperial ? "lb" : "kg",
                    1
                  )}
                  {weightDelta != null &&
                    ` · ${fmt(t.insights.weightChange, {
                      value: `${weightDelta > 0 ? "+" : "−"}${formatNumber(
                        Math.abs(imperial ? kgToLb(weightDelta) : weightDelta),
                        1
                      )} ${imperial ? "lb" : "kg"}`,
                    })}`}
                </p>
              )}
            </div>
            <Button size="sm" variant="soft" onClick={() => setWeightOpen(true)}>
              <Plus /> {t.insights.weightAdd}
            </Button>
          </div>

          {weightEntries.length === 0 ? (
            <p className="mt-4 text-subhead text-muted">{t.insights.weightEmpty}</p>
          ) : (
            <>
              <WeightSparkline className="mt-4" entries={weightEntries} />
              <RowGroup joined className="mt-3 bg-background">
                {weightEntries
                  .slice(-5)
                  .reverse()
                  .map((entry) => (
                    <Row
                      key={entry.id}
                      title={entry.date}
                      trailing="none"
                      value={formatAmount(
                        imperial ? kgToLb(entry.weightKg) : entry.weightKg,
                        imperial ? "lb" : "kg",
                        1
                      )}
                    />
                  ))}
              </RowGroup>
            </>
          )}
        </section>

        <BottomNavSpacer />
      </Screen>

      <WeightSheet open={weightOpen} onOpenChange={setWeightOpen} />
    </>
  );
}
