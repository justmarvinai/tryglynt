import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/i18n";

export interface TrendPoint {
  date: string;
  value: number;
  label: string;
}

/**
 * Compact bar trend with a dashed target line — used for nutrient and
 * energy history. Hand-rolled SVG to stay in the CleanOS language.
 */
export function TrendChart({
  points,
  target,
  unit,
  decimals = 0,
  className,
}: {
  points: TrendPoint[];
  target?: number;
  unit: string;
  decimals?: number;
  className?: string;
}) {
  const max = Math.max(target ?? 0, ...points.map((p) => p.value), 1) * 1.15;
  const height = 120;

  return (
    <div className={cn("w-full", className)}>
      <div className="relative flex h-[120px] items-end gap-[3px]" style={{ height }}>
        {target != null && target > 0 && (
          <div
            aria-hidden
            className="absolute inset-x-0 border-t border-dashed border-faint/60"
            style={{ bottom: `${(target / max) * 100}%` }}
          />
        )}
        {points.map((point) => {
          const pct = Math.min(100, (point.value / max) * 100);
          const reached = target != null && point.value >= target * 0.9;
          return (
            <div
              key={point.date}
              className="group relative flex flex-1 flex-col justify-end"
              title={`${point.label}: ${formatNumber(point.value, decimals)} ${unit}`}
            >
              <div
                className={cn(
                  "w-full rounded-t-md transition-all duration-500 ease-[var(--ease-out-quart)]",
                  point.value === 0
                    ? "bg-surface-2"
                    : reached
                      ? "bg-accent"
                      : "bg-accent/40"
                )}
                style={{ height: `${Math.max(2, pct)}%` }}
              />
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex gap-[3px]">
        {points.map((point, i) => (
          <span
            key={point.date}
            className="flex-1 text-center text-[0.625rem] text-faint"
          >
            {points.length <= 10 || i % 5 === 0 ? point.label : ""}
          </span>
        ))}
      </div>
    </div>
  );
}
