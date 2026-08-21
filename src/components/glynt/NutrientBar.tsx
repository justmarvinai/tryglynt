import { cn } from "@/lib/cn";
import { NUTRIENT_BY_ID } from "@/config/nutrients";
import type { NutrientStatus } from "@/lib/engine/day";
import { formatAmount, formatNumber, t } from "@/lib/i18n";

/**
 * One nutrient as label + bar + amount/target. Goals fill accent-green;
 * limits stay neutral and turn warning past 100 % (never danger-red).
 */
export function NutrientBar({
  status,
  compact = false,
  /** "amount" shows „12 g / 25", "percent" shows „48 %" (multi-day averages). */
  display = "amount",
  onPress,
  className,
}: {
  status: NutrientStatus;
  compact?: boolean;
  display?: "amount" | "percent";
  onPress?: () => void;
  className?: string;
}) {
  const def = NUTRIENT_BY_ID[status.id];
  const coverage = status.coverage ?? 0;
  const pct = Math.min(100, Math.round(coverage * 100));
  const isLimit = status.targetType === "limit";
  const over = coverage > 1;

  const fill = status.noData
    ? "bg-surface-2"
    : status.overUl
      ? "bg-warning"
      : isLimit
        ? over
          ? "bg-warning"
          : "bg-faint"
        : "bg-accent";

  const body = (
    <>
      <div className="flex items-baseline justify-between gap-2">
        <span
          className={cn(
            "truncate",
            compact ? "text-footnote" : "text-subhead font-medium"
          )}
        >
          {compact ? (def?.shortName ?? def?.name) : def?.name}
        </span>
        <span className="shrink-0 text-footnote tabular-nums text-muted">
          {status.noData ? (
            t.common.noData
          ) : display === "percent" ? (
            `${formatNumber(pct, 0)} %`
          ) : (
            <>
              {formatAmount(status.amount, def?.unit ?? "g", def?.decimals ?? 0)}
              {status.target != null && (
                <span className="text-faint">
                  {" / "}
                  {formatNumber(status.target, def?.decimals ?? 0)}
                </span>
              )}
            </>
          )}
        </span>
      </div>
      <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-2">
        <div
          className={cn(
            "h-full rounded-full transition-[width] duration-500 ease-[var(--ease-out-quart)]",
            fill
          )}
          style={{ width: `${pct}%` }}
        />
      </div>
      {(status.overUl || (status.gaps > 0 && !status.noData)) && (
        <p className="mt-1 text-caption text-faint">
          {status.overUl ? t.today.overUl : `${status.gaps} × ${t.common.noData}`}
        </p>
      )}
    </>
  );

  if (onPress) {
    return (
      <button
        type="button"
        onClick={onPress}
        aria-label={`${def?.name}: ${pct} % — Details`}
        className={cn("pressable block w-full text-left", className)}
      >
        {body}
      </button>
    );
  }
  return <div className={className}>{body}</div>;
}
