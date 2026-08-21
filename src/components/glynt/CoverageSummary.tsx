import { ChevronRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import { NUTRIENT_BY_ID } from "@/config/nutrients";
import type { DayNutrition } from "@/lib/engine/day";
import { fmt, formatNumber, t } from "@/lib/i18n";

/**
 * The differentiator on Heute: how many micronutrients are on track and
 * which ones are lowest — one tap from here into the full panel.
 */
export function CoverageSummary({
  day,
  onPress,
  onNutrientPress,
  className,
}: {
  day: DayNutrition;
  onPress: () => void;
  onNutrientPress: (id: string) => void;
  className?: string;
}) {
  const total = day.microsTracked;
  const gaps = day.worstGaps.slice(0, 3);

  return (
    <section className={cn("rounded-card bg-surface p-5", className)}>
      <button
        type="button"
        onClick={onPress}
        className="pressable flex w-full items-center gap-3 text-left"
      >
        <span className="flex size-11 shrink-0 items-center justify-center rounded-row bg-accent-soft text-accent">
          <Sparkles className="size-5" />
        </span>
        <span className="min-w-0 flex-1">
          <span className="block text-title3">
            {fmt(t.today.coverageTitle, {
              done: formatNumber(day.microsOnTrack, 0),
              total: formatNumber(total, 0),
            })}
          </span>
          <span className="mt-0.5 block text-footnote text-muted">
            {t.today.coverageSubtitle}
          </span>
        </span>
        <ChevronRight className="size-5 shrink-0 text-faint" />
      </button>

      {gaps.length > 0 && (
        <div className="mt-4">
          <p className="text-caption uppercase tracking-wide text-faint">
            {t.today.lowToday}
          </p>
          <div className="scrollbar-none mt-2 flex gap-2 overflow-x-auto">
            {gaps.map((gap) => (
              <button
                key={gap.id}
                type="button"
                onClick={() => onNutrientPress(gap.id)}
                className="pressable flex shrink-0 items-center gap-2 rounded-full bg-background px-3.5 py-2 text-footnote font-semibold shadow-soft"
              >
                {NUTRIENT_BY_ID[gap.id]?.shortName ?? NUTRIENT_BY_ID[gap.id]?.name}
                <span className="tabular-nums text-muted">
                  {formatNumber(Math.round((gap.coverage ?? 0) * 100), 0)} %
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
