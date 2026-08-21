import { Droplets, Minus, Plus } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { cn } from "@/lib/cn";
import { formatNumber, t } from "@/lib/i18n";

/** Quick-tap water tracking with a glass grid (D-002). */
export function WaterCard({
  consumedMl,
  targetMl,
  glassMl,
  onAdd,
  onRemove,
  className,
}: {
  consumedMl: number;
  targetMl: number;
  glassMl: number;
  onAdd: () => void;
  onRemove: () => void;
  className?: string;
}) {
  const goalGlasses = Math.max(1, Math.round(targetMl / glassMl));
  const fullGlasses = Math.floor(consumedMl / glassMl);
  const glasses = Array.from({ length: Math.max(goalGlasses, fullGlasses) });

  return (
    <section className={cn("rounded-card bg-surface p-5", className)}>
      <div className="flex items-center gap-3">
        <span className="flex size-11 shrink-0 items-center justify-center rounded-row bg-accent-soft text-accent">
          <Droplets className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-title3">{t.today.water}</p>
          <p className="mt-0.5 text-footnote text-muted tabular-nums">
            {formatNumber(consumedMl / 1000, 1)} / {formatNumber(targetMl / 1000, 1)} l
          </p>
        </div>
        <div className="flex items-center gap-1.5">
          <IconButton
            label={t.today.waterRemove}
            variant="soft"
            size="sm"
            disabled={consumedMl <= 0}
            onClick={onRemove}
          >
            <Minus />
          </IconButton>
          <IconButton label={t.today.waterAdd} variant="soft" onClick={onAdd}>
            <Plus />
          </IconButton>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5">
        {glasses.map((_, i) => (
          <span
            key={i}
            aria-hidden
            className={cn(
              "h-7 w-5 rounded-b-md rounded-t-sm border-2 transition-colors duration-300",
              i < fullGlasses
                ? "border-accent bg-accent"
                : "border-surface-2 bg-background"
            )}
          />
        ))}
      </div>
    </section>
  );
}
