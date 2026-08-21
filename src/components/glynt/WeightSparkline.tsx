import { cn } from "@/lib/cn";
import type { WeightEntry } from "@/lib/db/models";

/** Minimal weight trend line — area + line, CleanOS accent. */
export function WeightSparkline({
  entries,
  className,
}: {
  entries: WeightEntry[];
  className?: string;
}) {
  if (entries.length < 2) return null;
  const width = 320;
  const height = 90;
  const values = entries.map((e) => e.weightKg);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = Math.max(0.5, max - min);

  const points = entries.map((entry, i) => {
    const x = (i / (entries.length - 1)) * width;
    const y = height - ((entry.weightKg - min) / span) * (height - 12) - 6;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio="none"
      className={cn("h-24 w-full", className)}
      aria-hidden
    >
      <polyline
        points={`0,${height} ${points.join(" ")} ${width},${height}`}
        className="fill-accent/10"
      />
      <polyline
        points={points.join(" ")}
        fill="none"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-accent"
      />
    </svg>
  );
}
