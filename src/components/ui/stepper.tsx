import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/hooks";

export interface StepperProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: "sm" | "md";
  /** Formats the displayed value, e.g. `(v) => \`${v} min\``. */
  format?: (value: number) => React.ReactNode;
  className?: string;
}

/** Pill-shaped − / + counter. */
export function Stepper({
  value,
  defaultValue = 0,
  onChange,
  min = 0,
  max = 99,
  step = 1,
  size = "md",
  format,
  className,
}: StepperProps) {
  const [current, setCurrent] = useControllableState({
    value,
    defaultValue,
    onChange,
  });

  const set = (next: number) => setCurrent(Math.min(max, Math.max(min, next)));
  const btn = cn(
    "pressable flex items-center justify-center rounded-full text-foreground",
    "hover:bg-surface-2 disabled:pointer-events-none disabled:opacity-30",
    size === "md" ? "size-12 [&_svg]:size-5" : "size-9 [&_svg]:size-4"
  );

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full bg-surface",
        size === "md" ? "h-12" : "h-9",
        className
      )}
    >
      <button
        type="button"
        aria-label="Decrease"
        disabled={current <= min}
        onClick={() => set(current - step)}
        className={btn}
      >
        <Minus />
      </button>
      <span
        aria-live="polite"
        className={cn(
          "min-w-10 text-center font-bold tabular-nums",
          size === "md" ? "text-[1.0625rem]" : "text-[0.9375rem]"
        )}
      >
        {format ? format(current) : current}
      </span>
      <button
        type="button"
        aria-label="Increase"
        disabled={current >= max}
        onClick={() => set(current + step)}
        className={btn}
      >
        <Plus />
      </button>
    </div>
  );
}
