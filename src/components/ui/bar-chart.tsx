import * as React from "react";
import { cn } from "@/lib/cn";

export interface BarChartDatum {
  label: React.ReactNode;
  value: number;
}

export interface BarChartProps {
  /** Single series by design — for comparisons, render two charts side by side. */
  data: BarChartDatum[];
  /** Plot height in px (labels add to it). */
  height?: number;
  tone?: "accent" | "success" | "pink" | "ink";
  /** Initially highlighted bar: an index, "max", "last", or null for none. */
  highlight?: number | "max" | "last" | null;
  /** Formats the value bubble above the selected bar. */
  formatValue?: (value: number) => React.ReactNode;
  onSelect?: (index: number) => void;
  className?: string;
}

const tones = {
  accent: "bg-accent",
  success: "bg-success",
  pink: "bg-pink",
  ink: "bg-inverse",
};

/**
 * Tap-to-inspect activity bars (Apple-Fitness style). Muted pill bars,
 * one emphasized bar with its value labeled — never a number on every bar.
 */
export function BarChart({
  data,
  height = 150,
  tone = "accent",
  highlight = "max",
  formatValue = (v) => v,
  onSelect,
  className,
}: BarChartProps) {
  const initial =
    highlight === "max"
      ? data.reduce((best, d, i) => (d.value > data[best].value ? i : best), 0)
      : highlight === "last"
        ? data.length - 1
        : highlight;
  const [selected, setSelected] = React.useState<number | null>(initial);
  const max = Math.max(1, ...data.map((d) => d.value));

  return (
    <div className={cn("flex w-full items-end gap-2", className)}>
      {data.map((d, i) => {
        const active = i === selected;
        const barHeight = Math.max(8, Math.round((d.value / max) * height));
        return (
          <button
            key={i}
            type="button"
            aria-label={`${typeof d.label === "string" ? d.label : `Bar ${i + 1}`}: ${d.value}`}
            aria-pressed={active}
            onClick={() => {
              setSelected(i);
              onSelect?.(i);
            }}
            className="group flex min-w-0 flex-1 flex-col items-center gap-2"
          >
            <span
              className={cn(
                "text-caption font-bold tabular-nums text-foreground transition-opacity",
                active ? "opacity-100" : "opacity-0"
              )}
            >
              {formatValue(d.value)}
            </span>
            <span
              style={{ height: barHeight }}
              className={cn(
                "w-full max-w-8 rounded-full transition-[background-color,height] duration-300 ease-[var(--ease-out-quart)]",
                active
                  ? tones[tone]
                  : "bg-surface-2 group-hover:bg-faint/50"
              )}
            />
            <span
              className={cn(
                "truncate text-caption",
                active ? "font-bold text-foreground" : "text-faint"
              )}
            >
              {d.label}
            </span>
          </button>
        );
      })}
    </div>
  );
}
