import * as React from "react";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

const RowGroupContext = React.createContext(false);

export interface RowGroupProps extends React.ComponentProps<"div"> {
  /**
   * `false` (default): rows are separate cards with a gap — the CleanOS look.
   * `true`: rows merge into one card with hairline dividers (classic iOS).
   */
  joined?: boolean;
}

export function RowGroup({ joined = false, className, ...props }: RowGroupProps) {
  return (
    <RowGroupContext.Provider value={joined}>
      <div
        role="list"
        className={cn(
          joined
            ? "divide-y divide-hairline overflow-hidden rounded-card bg-surface"
            : "flex flex-col gap-3",
          className
        )}
        {...props}
      />
    </RowGroupContext.Provider>
  );
}

export interface RowProps {
  /** Icon, flag, or avatar shown before the text. */
  leading?: React.ReactNode;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Right-aligned value (e.g. the current setting). */
  value?: React.ReactNode;
  /** `"chevron"`, `"external"`, `"none"`, or any custom node (e.g. a Switch). */
  trailing?: React.ReactNode | "chevron" | "external" | "none";
  href?: string;
  target?: string;
  onPress?: () => void;
  disabled?: boolean;
  /** Tints the title red for destructive actions. */
  destructive?: boolean;
  className?: string;
}

/** A settings-style list row. Use inside RowGroup. */
export function Row({
  leading,
  title,
  subtitle,
  value,
  trailing = "chevron",
  href,
  target,
  onPress,
  disabled,
  destructive,
  className,
}: RowProps) {
  const joined = React.useContext(RowGroupContext);
  const interactive = Boolean(href || onPress) && !disabled;

  const content = (
    <>
      {leading != null && (
        <span className="flex shrink-0 items-center justify-center text-muted [&_svg]:size-6">
          {leading}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span
          className={cn(
            "block truncate text-[1.0625rem] font-medium",
            destructive ? "text-danger" : "text-foreground"
          )}
        >
          {title}
        </span>
        {subtitle != null && (
          <span className="mt-0.5 block truncate text-footnote text-muted">
            {subtitle}
          </span>
        )}
      </span>
      {value != null && (
        <span className="flex shrink-0 items-center gap-2 text-[1.0625rem] font-medium text-muted">
          {value}
        </span>
      )}
      {trailing === "chevron" ? (
        interactive ? <ChevronRight className="size-5 shrink-0 text-faint" /> : null
      ) : trailing === "external" ? (
        <ArrowUpRight className="size-5 shrink-0 text-faint" />
      ) : trailing === "none" ? null : (
        <span className="flex shrink-0 items-center">{trailing}</span>
      )}
    </>
  );

  const classes = cn(
    "flex w-full items-center gap-3.5 px-5 text-left",
    joined ? "min-h-14 py-2.5" : "min-h-16 rounded-row bg-surface py-3",
    interactive &&
      (joined ? "pressable hover:bg-surface-2/60" : "pressable hover:bg-surface-2"),
    disabled && "opacity-40",
    className
  );

  if (href && !disabled) {
    return (
      <a role="listitem" href={href} target={target} className={classes}>
        {content}
      </a>
    );
  }
  if (onPress) {
    return (
      <button
        role="listitem"
        type="button"
        onClick={onPress}
        disabled={disabled}
        className={classes}
      >
        {content}
      </button>
    );
  }
  return (
    <div role="listitem" className={classes}>
      {content}
    </div>
  );
}
