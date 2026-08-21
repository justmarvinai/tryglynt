import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/hooks";

/** Local-timezone "YYYY-MM-DD" (toISOString would shift the day in UTC). */
function fmt(date: Date) {
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${m}-${d}`;
}

export interface CalendarProps {
  /** Selected date as "YYYY-MM-DD". */
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Dates ("YYYY-MM-DD") that get a small activity dot. */
  marked?: string[];
  /** Selected-day color. */
  tone?: "ink" | "pink" | "accent";
  /** 0 = Sunday, 1 = Monday. */
  weekStartsOn?: 0 | 1;
  /** Weekday header labels, starting from `weekStartsOn`. */
  weekdayLabels?: string[];
  /** Formats the "August 2026" header. */
  formatMonth?: (month: Date) => string;
  className?: string;
}

const tones = {
  ink: "bg-inverse text-inverse-foreground",
  pink: "bg-pink text-white",
  accent: "bg-accent text-accent-foreground",
};

const defaultFormat = (month: Date) =>
  month.toLocaleDateString("en", { month: "long", year: "numeric" });

/** Month-grid date picker with streak/activity dots. */
export function Calendar({
  value,
  defaultValue,
  onChange,
  marked = [],
  tone = "ink",
  weekStartsOn = 1,
  weekdayLabels,
  formatMonth = defaultFormat,
  className,
}: CalendarProps) {
  const [selected, setSelected] = useControllableState<string | undefined>({
    value,
    defaultValue,
    onChange: onChange as (v: string | undefined) => void,
  });

  const initial = selected ? new Date(`${selected}T00:00:00`) : new Date();
  const [month, setMonth] = React.useState(
    () => new Date(initial.getFullYear(), initial.getMonth(), 1)
  );

  const labels =
    weekdayLabels ??
    (weekStartsOn === 1
      ? ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"]
      : ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]);

  const daysInMonth = new Date(
    month.getFullYear(),
    month.getMonth() + 1,
    0
  ).getDate();
  const leadingBlanks = (month.getDay() - weekStartsOn + 7) % 7;
  const today = fmt(new Date());
  const markedSet = React.useMemo(() => new Set(marked), [marked]);

  const shiftMonth = (delta: number) =>
    setMonth((m) => new Date(m.getFullYear(), m.getMonth() + delta, 1));

  return (
    <div className={cn("w-full max-w-sm select-none", className)}>
      <div className="flex items-center justify-between px-1 pb-3">
        <p className="text-headline">{formatMonth(month)}</p>
        <div className="flex gap-1.5">
          <button
            type="button"
            aria-label="Previous month"
            onClick={() => shiftMonth(-1)}
            className="pressable flex size-9 items-center justify-center rounded-full bg-surface hover:bg-surface-2"
          >
            <ChevronLeft className="size-4.5" />
          </button>
          <button
            type="button"
            aria-label="Next month"
            onClick={() => shiftMonth(1)}
            className="pressable flex size-9 items-center justify-center rounded-full bg-surface hover:bg-surface-2"
          >
            <ChevronRight className="size-4.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 pb-1.5">
        {labels.map((label) => (
          <span key={label} className="py-1 text-center text-caption text-faint">
            {label}
          </span>
        ))}
      </div>

      <div role="grid" className="grid grid-cols-7 gap-y-1">
        {Array.from({ length: leadingBlanks }).map((_, i) => (
          <span key={`blank-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = new Date(month.getFullYear(), month.getMonth(), i + 1);
          const key = fmt(date);
          const isSelected = key === selected;
          const isToday = key === today;
          return (
            <button
              key={key}
              type="button"
              aria-pressed={isSelected}
              aria-label={key}
              onClick={() => setSelected(key)}
              className={cn(
                "pressable relative mx-auto flex size-10 items-center justify-center rounded-full text-[0.9375rem] font-medium",
                isSelected
                  ? cn(tones[tone], "font-bold")
                  : cn(
                      "text-foreground hover:bg-surface",
                      isToday && "font-bold text-accent-text"
                    )
              )}
            >
              {i + 1}
              {markedSet.has(key) && !isSelected && (
                <span className="absolute bottom-1 size-1 rounded-full bg-accent" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
