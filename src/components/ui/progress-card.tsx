import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface ProgressCardProps {
  /** Current progress, e.g. `0` in "0/5". */
  value: number;
  /** Target, e.g. `5` in "0/5". Omit to show just the value. */
  max?: number;
  label: React.ReactNode;
  href?: string;
  onPress?: () => void;
  className?: string;
}

/** Wide stat card with a "value/max" figure and a chevron — tap to drill in. */
export function ProgressCard({
  value,
  max,
  label,
  href,
  onPress,
  className,
}: ProgressCardProps) {
  const interactive = Boolean(href || onPress);

  const content = (
    <>
      <span className="min-w-0">
        <span className="block text-display">
          {value}
          {max != null && <span>/{max}</span>}
        </span>
        <span className="mt-1.5 block text-body text-muted">{label}</span>
      </span>
      {interactive && (
        <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-background text-foreground shadow-soft">
          <ChevronRight className="size-5" />
        </span>
      )}
    </>
  );

  const classes = cn(
    "flex w-full items-center justify-between gap-4 rounded-card bg-surface p-5 text-left",
    interactive && "pressable hover:bg-surface-2",
    className
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }
  if (onPress) {
    return (
      <button type="button" onClick={onPress} className={classes}>
        {content}
      </button>
    );
  }
  return <div className={classes}>{content}</div>;
}
