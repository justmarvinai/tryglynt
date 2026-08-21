import * as React from "react";
import { cn } from "@/lib/cn";

export interface CarouselProps {
  /** Slides — each child becomes a full-width snap page. */
  children: React.ReactNode;
  /** Show the dot indicator below. */
  dots?: boolean;
  index?: number;
  onIndexChange?: (index: number) => void;
  className?: string;
  slideClassName?: string;
}

/** Swipeable full-width carousel with snap paging — onboarding, banners. */
export function Carousel({
  children,
  dots = true,
  index,
  onIndexChange,
  className,
  slideClassName,
}: CarouselProps) {
  const slides = React.Children.toArray(children);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [internal, setInternal] = React.useState(0);
  const current = index ?? internal;
  const onIndexChangeRef = React.useRef(onIndexChange);
  onIndexChangeRef.current = onIndexChange;

  const onScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const next = Math.round(el.scrollLeft / el.clientWidth);
    if (next !== current) {
      setInternal(next);
      onIndexChangeRef.current?.(next);
    }
  };

  const scrollTo = (i: number) => {
    const el = scrollRef.current;
    el?.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  // Follow external index control.
  React.useEffect(() => {
    if (index == null) return;
    const el = scrollRef.current;
    if (el && Math.round(el.scrollLeft / el.clientWidth) !== index) scrollTo(index);
  }, [index]);

  return (
    <div className={cn("w-full", className)}>
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="scrollbar-none flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain"
        tabIndex={0}
        data-scroll-rail
        role="group"
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className={cn("w-full shrink-0 snap-center", slideClassName)}
            aria-hidden={i !== current}
          >
            {slide}
          </div>
        ))}
      </div>
      {dots && slides.length > 1 && (
        <div className="flex items-center justify-center gap-2 pt-5">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === current}
              onClick={() => scrollTo(i)}
              className={cn(
                "h-2 rounded-full transition-all duration-300 ease-[var(--ease-out-quart)]",
                i === current ? "w-6 bg-foreground" : "w-2 bg-surface-2 hover:bg-faint/50"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
