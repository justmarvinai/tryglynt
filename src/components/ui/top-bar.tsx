import { cn } from "@/lib/cn";

export interface TopBarProps {
  title?: React.ReactNode;
  /** Left slot — usually an IconButton (close ✕, back ‹). */
  leading?: React.ReactNode;
  /** Right slot — actions. */
  trailing?: React.ReactNode;
  /** Adds a large bold title under the bar (iOS large-title style). */
  large?: boolean;
  sticky?: boolean;
  /** Removes the blurred background. */
  transparent?: boolean;
  className?: string;
}

/** Screen header with a centered title. */
export function TopBar({
  title,
  leading,
  trailing,
  large = false,
  sticky = true,
  transparent = false,
  className,
}: TopBarProps) {
  return (
    <header
      className={cn(
        "z-30 w-full",
        sticky && "sticky top-0",
        !transparent && "bg-background/85 backdrop-blur-xl",
        className
      )}
    >
      <div className="grid h-16 grid-cols-[minmax(3rem,1fr)_auto_minmax(3rem,1fr)] items-center px-4">
        <div className="flex justify-start">{leading}</div>
        {!large && title != null ? (
          <h1 className="truncate px-2 text-center text-title3">{title}</h1>
        ) : (
          <div />
        )}
        <div className="flex justify-end gap-2">{trailing}</div>
      </div>
      {large && title != null && (
        <h1 className="px-5 pb-3 pt-1 text-title1">{title}</h1>
      )}
    </header>
  );
}
