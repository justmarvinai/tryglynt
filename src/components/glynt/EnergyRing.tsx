import { cn } from "@/lib/cn";
import { formatNumber } from "@/lib/i18n";

export interface EnergyRingProps {
  consumed: number;
  target: number;
  /** Big number label, e.g. „übrig". */
  label: string;
  /** Label when the target is exceeded, e.g. „darüber". */
  overLabel: string;
  size?: number;
  className?: string;
}

/**
 * The Heute hero: a progress ring with the remaining energy in its
 * centre. Over-target is shown calmly in warning tint — never red-shamed
 * (docs/DESIGN.md §2).
 */
export function EnergyRing({
  consumed,
  target,
  label,
  overLabel,
  size = 208,
  className,
}: EnergyRingProps) {
  const stroke = 16;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const ratio = target > 0 ? consumed / target : 0;
  const over = ratio > 1;
  const dash = Math.min(1, Math.max(0, ratio)) * circumference;
  const remaining = Math.abs(Math.round(target - consumed));

  return (
    <div
      className={cn("relative mx-auto", className)}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${formatNumber(consumed, 0)} von ${formatNumber(target, 0)} kcal`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          className="stroke-surface-2"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${circumference}`}
          className={cn(
            "transition-[stroke-dasharray] duration-700 ease-[var(--ease-out-quart)]",
            over ? "stroke-warning" : "stroke-accent"
          )}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-display">{formatNumber(remaining, 0)}</span>
        <span className="mt-0.5 text-subhead text-muted">
          kcal {over ? overLabel : label}
        </span>
      </div>
    </div>
  );
}
