import * as React from "react";
import { cn } from "@/lib/cn";
import { Chip } from "@/components/ui/chip";

export interface DayStripItem {
  /** Stable key, e.g. an ISO date. */
  key: string;
  /** What the chip shows — usually the day number. */
  label: React.ReactNode;
}

export interface DayStripProps {
  items: DayStripItem[];
  value?: string;
  onChange?: (key: string) => void;
  /** Selected chip color. */
  tone?: "pink" | "accent" | "ink" | "success";
  className?: string;
}

/** Horizontally scrolling day selector with squircle chips. */
export function DayStrip({
  items,
  value,
  onChange,
  tone = "pink",
  className,
}: DayStripProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const first = React.useRef(true);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container || value == null) return;
    const el = container.querySelector<HTMLElement>(`[data-key="${value}"]`);
    el?.scrollIntoView({
      inline: "center",
      block: "nearest",
      behavior: first.current ? "instant" : "smooth",
    });
    first.current = false;
  }, [value]);

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label="Select day"
      className={cn(
        "scrollbar-none flex snap-x gap-3 overflow-x-auto px-1 py-1",
        className
      )}
    >
      {items.map((item) => (
        <Chip
          key={item.key}
          data-key={item.key}
          size="square"
          tone={tone}
          selected={item.key === value}
          onClick={() => onChange?.(item.key)}
          className="snap-center"
        >
          {item.label}
        </Chip>
      ))}
    </div>
  );
}

/** Builds DayStrip items around a center date (default: today). */
export function buildDays(center: Date = new Date(), before = 4, after = 4) {
  const days: Array<DayStripItem & { date: Date }> = [];
  for (let offset = -before; offset <= after; offset++) {
    const date = new Date(center);
    date.setDate(center.getDate() + offset);
    days.push({
      key: date.toISOString().slice(0, 10),
      label: date.getDate(),
      date,
    });
  }
  return days;
}
