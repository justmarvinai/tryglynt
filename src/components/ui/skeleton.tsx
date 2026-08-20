import { cn } from "@/lib/cn";

export interface SkeletonProps extends React.ComponentProps<"div"> {}

/** Shimmering placeholder block. Size it with className. */
export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      aria-hidden
      className={cn(
        "animate-shimmer rounded-field",
        "bg-[linear-gradient(100deg,var(--cos-surface)_40%,var(--cos-surface-2)_50%,var(--cos-surface)_60%)]",
        "bg-[length:200%_100%]",
        className
      )}
      {...props}
    />
  );
}

export interface SkeletonTextProps extends React.ComponentProps<"div"> {
  lines?: number;
}

/** A stack of shimmering text lines; the last line is shorter. */
export function SkeletonText({ lines = 3, className, ...props }: SkeletonTextProps) {
  return (
    <div aria-hidden className={cn("space-y-2.5", className)} {...props}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn("h-4 rounded-md", i === lines - 1 ? "w-3/5" : "w-full")}
        />
      ))}
    </div>
  );
}
