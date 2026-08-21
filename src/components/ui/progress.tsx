import { cn } from "@/lib/cn";

type Tone = "accent" | "success" | "danger" | "pink" | "ink";

const barTones: Record<Tone, string> = {
  accent: "bg-accent",
  success: "bg-success",
  danger: "bg-danger",
  pink: "bg-pink",
  ink: "bg-inverse",
};

const ringTones: Record<Tone, string> = {
  accent: "text-accent-text",
  success: "text-success",
  danger: "text-danger",
  pink: "text-pink",
  ink: "text-inverse",
};

export interface ProgressBarProps extends React.ComponentProps<"div"> {
  value: number;
  max?: number;
  tone?: Tone;
  size?: "sm" | "md" | "lg";
}

/** Rounded linear progress. */
export function ProgressBar({
  value,
  max = 100,
  tone = "accent",
  size = "md",
  className,
  ...props
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn(
        "w-full overflow-hidden rounded-full bg-surface-2",
        size === "sm" ? "h-1.5" : size === "md" ? "h-2.5" : "h-3.5",
        className
      )}
      {...props}
    >
      <div
        className={cn(
          "h-full rounded-full transition-[width] duration-500 ease-[var(--ease-out-quart)]",
          barTones[tone]
        )}
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export interface ProgressRingProps extends React.ComponentProps<"div"> {
  value: number;
  max?: number;
  /** Diameter in px. */
  size?: number;
  strokeWidth?: number;
  tone?: Tone;
  /** Center content — defaults to a percentage. */
  children?: React.ReactNode;
}

/** Circular progress with center content. */
export function ProgressRing({
  value,
  max = 100,
  size = 72,
  strokeWidth = 7,
  tone = "accent",
  children,
  className,
  ...props
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const pct = Math.min(1, Math.max(0, value / max));

  return (
    <div
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      className={cn("relative inline-flex items-center justify-center", className)}
      style={{ width: size, height: size }}
      {...props}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          className="stroke-surface-2"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={circumference * (1 - pct)}
          className={cn(
            "stroke-current transition-[stroke-dashoffset] duration-500 ease-[var(--ease-out-quart)]",
            ringTones[tone]
          )}
        />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-footnote font-bold tabular-nums">
        {children ?? `${Math.round(pct * 100)}%`}
      </span>
    </div>
  );
}
