import { cn } from "@/lib/cn";

export interface StatCardProps extends React.ComponentProps<"div"> {
  /** The big number. */
  value: React.ReactNode;
  label: React.ReactNode;
  /** Colors the value: e.g. "success" once a goal is hit. */
  tone?: "default" | "accent" | "success" | "danger" | "pink";
}

const tones = {
  default: "text-foreground",
  accent: "text-accent-text",
  success: "text-success",
  danger: "text-danger",
  pink: "text-pink",
};

/** Big-number stat tile. Put three in a `grid grid-cols-3 gap-3`. */
export function StatCard({
  value,
  label,
  tone = "default",
  className,
  ...props
}: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-card bg-surface px-3 py-6 text-center",
        className
      )}
      {...props}
    >
      <div className={cn("text-display", tones[tone])}>{value}</div>
      <div className="mt-1.5 text-subhead text-muted">{label}</div>
    </div>
  );
}
