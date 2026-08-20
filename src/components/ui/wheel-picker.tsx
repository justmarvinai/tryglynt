import * as React from "react";
import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/hooks";

export interface WheelOption {
  value: string;
  label: React.ReactNode;
}

export interface WheelPickerProps {
  options: Array<WheelOption | string | number>;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  /** Accessible name for the wheel. */
  label?: string;
  className?: string;
}

const ITEM = 44; // px per row
const VISIBLE = 5;
const HEIGHT = ITEM * VISIBLE;
const PAD = (HEIGHT - ITEM) / 2;

/**
 * iOS-style scroll wheel with snapping. Compose several inside
 * `<WheelPickerGroup>` for multi-column pickers (see TimePicker).
 */
export function WheelPicker({
  options,
  value,
  defaultValue,
  onChange,
  label,
  className,
}: WheelPickerProps) {
  const opts = React.useMemo<WheelOption[]>(
    () =>
      options.map((o) =>
        typeof o === "object" ? o : { value: String(o), label: String(o) }
      ),
    [options]
  );

  const [current, setCurrent] = useControllableState({
    value,
    defaultValue: defaultValue ?? opts[0]?.value ?? "",
    onChange,
  });

  const scrollRef = React.useRef<HTMLDivElement>(null);
  const settleTimer = React.useRef<number>(0);
  const isUserScroll = React.useRef(false);
  const currentIndex = Math.max(0, opts.findIndex((o) => o.value === current));
  const [activeIndex, setActiveIndex] = React.useState(currentIndex);

  // Keep the wheel aligned with the current value (initial + external changes).
  React.useEffect(() => {
    if (isUserScroll.current) return;
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTop = currentIndex * ITEM;
    setActiveIndex(currentIndex);
  }, [currentIndex, opts.length]);

  const commit = () => {
    const el = scrollRef.current;
    if (!el) return;
    const idx = Math.min(
      opts.length - 1,
      Math.max(0, Math.round(el.scrollTop / ITEM))
    );
    isUserScroll.current = false;
    if (opts[idx] && opts[idx].value !== current) setCurrent(opts[idx].value);
  };

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    isUserScroll.current = true;
    const idx = Math.min(
      opts.length - 1,
      Math.max(0, Math.round(el.scrollTop / ITEM))
    );
    setActiveIndex(idx);
    window.clearTimeout(settleTimer.current);
    settleTimer.current = window.setTimeout(commit, 140);
  };

  const scrollToIndex = (idx: number) => {
    scrollRef.current?.scrollTo({ top: idx * ITEM, behavior: "smooth" });
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(
        opts.length - 1,
        Math.max(0, activeIndex + (e.key === "ArrowDown" ? 1 : -1))
      );
      isUserScroll.current = false;
      setCurrent(opts[next].value);
      scrollToIndex(next);
    }
  };

  return (
    <div className={cn("relative min-w-[4.5rem]", className)} style={{ height: HEIGHT }}>
      {/* Center highlight */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-1/2 h-11 -translate-y-1/2 rounded-[0.875rem] bg-surface"
      />
      <div
        ref={scrollRef}
        role="listbox"
        aria-label={label}
        tabIndex={0}
        onScroll={onScroll}
        onKeyDown={onKeyDown}
        className="scrollbar-none mask-wheel relative h-full snap-y snap-mandatory overflow-y-auto overscroll-contain outline-none"
      >
        <div style={{ height: PAD }} />
        {opts.map((option, i) => (
          <div
            key={option.value}
            role="option"
            aria-selected={i === activeIndex}
            onClick={() => scrollToIndex(i)}
            className={cn(
              "flex h-11 cursor-pointer snap-center items-center justify-center px-3",
              "text-[1.375rem] font-medium tabular-nums transition-colors duration-100",
              i === activeIndex ? "text-foreground" : "text-faint"
            )}
          >
            {option.label}
          </div>
        ))}
        <div style={{ height: PAD }} />
      </div>
    </div>
  );
}

/** Lays out multiple wheels with separators, e.g. `<span>:</span>`. */
export function WheelPickerGroup({
  children,
  className,
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-1 [&>span]:text-title2 [&>span]:text-foreground",
        className
      )}
    >
      {children}
    </div>
  );
}
