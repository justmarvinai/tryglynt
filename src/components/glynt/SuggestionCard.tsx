import { Plus, Sparkles } from "lucide-react";
import { cn } from "@/lib/cn";
import { reasonLabel, type Suggestion } from "@/lib/engine/suggestions";
import { fmt, formatAmount, formatNumber, t } from "@/lib/i18n";

/**
 * One explainable suggestion: what to eat, which gap it closes, what it
 * costs in energy — and one tap to log it (D-007).
 */
export function SuggestionCard({
  suggestion,
  onLog,
  onOpen,
  className,
}: {
  suggestion: Suggestion;
  onLog: () => void;
  onOpen: () => void;
  className?: string;
}) {
  const [primary, ...rest] = suggestion.reasons;
  const label = primary ? reasonLabel(primary) : undefined;

  return (
    <div
      className={cn(
        "flex w-64 shrink-0 flex-col rounded-card bg-background p-4 shadow-soft",
        className
      )}
    >
      <button type="button" onClick={onOpen} className="pressable flex-1 text-left">
        <p className="line-clamp-2 text-headline">{suggestion.food.name}</p>
        <p className="mt-0.5 text-footnote text-muted">
          {suggestion.portionLabel} · {formatAmount(suggestion.energyKcal, "kcal", 0)}
        </p>
        {label && (
          <p className="mt-2.5 text-footnote font-semibold text-accent-text">
            {fmt(t.suggestions.covers, {
              pct: formatNumber(label.percent, 0),
              nutrient: label.nutrient,
            })}
          </p>
        )}
        {rest.length > 0 && (
          <p className="mt-1 line-clamp-1 text-caption text-faint">
            +{" "}
            {fmt(t.suggestions.alsoCovers, {
              list: rest.map((r) => reasonLabel(r).nutrient).join(", "),
            })}
          </p>
        )}
      </button>
      <button
        type="button"
        onClick={onLog}
        className="pressable mt-3 flex items-center justify-center gap-1.5 rounded-full bg-accent px-4 py-2 text-footnote font-bold text-accent-foreground"
      >
        <Plus className="size-4" />
        {t.suggestions.logIt}
      </button>
    </div>
  );
}

/** Horizontal rail of suggestion cards with the section header. */
export function SuggestionRail({
  suggestions,
  onLog,
  onOpen,
  className,
}: {
  suggestions: Suggestion[];
  onLog: (s: Suggestion) => void;
  onOpen: (s: Suggestion) => void;
  className?: string;
}) {
  if (suggestions.length === 0) return null;
  return (
    <section className={cn("rounded-card bg-surface p-5", className)}>
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-row bg-accent-soft text-accent-text">
          <Sparkles className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="text-title3">{t.suggestions.title}</h2>
          <p className="mt-0.5 text-footnote text-muted">{t.suggestions.subtitle}</p>
        </div>
      </div>
      <div className="scrollbar-none -mx-5 mt-4 flex gap-3 overflow-x-auto px-5">
        {suggestions.map((s) => (
          <SuggestionCard
            key={s.food.id}
            suggestion={s}
            onLog={() => onLog(s)}
            onOpen={() => onOpen(s)}
          />
        ))}
      </div>
    </section>
  );
}
