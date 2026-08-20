import { cn } from "@/lib/cn";

export interface FabProps extends React.ComponentProps<"button"> {
  /** Accessible name — required because the button has no visible text. */
  label: string;
  size?: "md" | "lg";
  /** Fixes the FAB to the bottom-right corner (safe-area aware). */
  fixed?: boolean;
}

/** Floating action button — the round blue "+" from the CleanOS home screen. */
export function Fab({
  label,
  size = "lg",
  fixed = false,
  className,
  type = "button",
  ...props
}: FabProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        "pressable inline-flex shrink-0 select-none items-center justify-center",
        "rounded-full bg-accent text-accent-foreground shadow-fab",
        "hover:bg-accent-strong disabled:pointer-events-none disabled:opacity-40",
        size === "lg" ? "size-16 [&_svg]:size-7" : "size-14 [&_svg]:size-6",
        fixed && "fixed bottom-6 right-5 z-40 mb-safe",
        className
      )}
      {...props}
    />
  );
}
