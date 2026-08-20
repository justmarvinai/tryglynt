import { Plus } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/cn";
import { formatNumber, t } from "@/lib/i18n";

export interface FoodResultRowProps {
  name: string;
  /** e.g. „52 kcal · je 100 g" or brand. */
  subtitle: string;
  onPress: () => void;
  /** Instant add at default portion (the „+"). */
  onQuickAdd?: () => void;
  className?: string;
}

/** Search-result row in the log sheet — tap for portion, + for instant add. */
export function FoodResultRow({
  name,
  subtitle,
  onPress,
  onQuickAdd,
  className,
}: FoodResultRowProps) {
  return (
    <div
      className={cn(
        "pressable flex min-h-16 items-center gap-3 rounded-row bg-surface pl-4 pr-2",
        className
      )}
    >
      <button
        type="button"
        onClick={onPress}
        className="flex min-w-0 flex-1 flex-col items-start py-2.5 text-left"
      >
        <span className="w-full truncate text-[1.0625rem] font-semibold">{name}</span>
        <span className="mt-0.5 text-footnote text-muted">{subtitle}</span>
      </button>
      {onQuickAdd && (
        <IconButton label={t.common.add} variant="ghost" size="sm" onClick={onQuickAdd}>
          <Plus />
        </IconButton>
      )}
    </div>
  );
}

/** „52 kcal · je 100 g" subtitle helper. */
export function per100Subtitle(energy: number | undefined, isLiquid?: boolean): string {
  const base = isLiquid ? t.log.perHundredMl : t.log.perHundred;
  if (energy == null) return base;
  return `${formatNumber(energy, 0)} kcal · ${base}`;
}
