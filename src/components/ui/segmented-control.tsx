import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/hooks";

export interface SegmentedOption {
  value: string;
  label: React.ReactNode;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps {
  options: SegmentedOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md";
  /** Stretch to the container width. */
  full?: boolean;
  className?: string;
}

/** iOS-style segmented control with a sliding thumb. */
export function SegmentedControl({
  options,
  value,
  defaultValue,
  onChange,
  size = "md",
  full,
  className,
}: SegmentedControlProps) {
  const [current, setCurrent] = useControllableState({
    value,
    defaultValue: defaultValue ?? options[0]?.value,
    onChange: onChange as (v: string | undefined) => void,
  });
  const index = Math.max(
    0,
    options.findIndex((o) => o.value === current)
  );

  return (
    <div
      role="radiogroup"
      className={cn(
        "relative inline-grid rounded-full bg-surface p-1",
        full && "grid w-full",
        className
      )}
      style={{ gridTemplateColumns: `repeat(${options.length}, 1fr)` }}
    >
      <span
        aria-hidden
        className="absolute inset-y-1 rounded-full bg-background shadow-soft transition-transform duration-300 ease-[var(--ease-out-quart)]"
        style={{
          width: `calc((100% - 0.5rem) / ${options.length})`,
          left: "0.25rem",
          transform: `translateX(${index * 100}%)`,
        }}
      />
      {options.map((option) => {
        const selected = option.value === current;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => setCurrent(option.value)}
            className={cn(
              "relative z-10 flex select-none items-center justify-center gap-1.5 rounded-full font-semibold transition-colors",
              size === "md"
                ? "h-9 px-5 text-[0.9375rem] [&_svg]:size-4"
                : "h-7 px-3.5 text-[0.8125rem] [&_svg]:size-3.5",
              selected ? "text-foreground" : "text-muted hover:text-foreground"
            )}
          >
            {option.icon}
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
