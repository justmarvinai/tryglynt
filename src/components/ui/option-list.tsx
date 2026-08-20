import { Check } from "lucide-react";
import { cn } from "@/lib/cn";

export interface OptionListProps extends React.ComponentProps<"div"> {}

/** Single-select list — language pickers, sort orders, themes. */
export function OptionList({ className, ...props }: OptionListProps) {
  return (
    <div role="listbox" className={cn("flex flex-col gap-3", className)} {...props} />
  );
}

export interface OptionItemProps {
  /** Icon or flag at the start of the row. */
  leading?: React.ReactNode;
  label: React.ReactNode;
  description?: React.ReactNode;
  selected?: boolean;
  onSelect?: () => void;
  disabled?: boolean;
  className?: string;
}

export function OptionItem({
  leading,
  label,
  description,
  selected = false,
  onSelect,
  disabled,
  className,
}: OptionItemProps) {
  return (
    <button
      type="button"
      role="option"
      aria-selected={selected}
      disabled={disabled}
      onClick={onSelect}
      className={cn(
        "pressable flex min-h-14 w-full items-center gap-3.5 rounded-row px-4 py-2.5 text-left",
        selected ? "bg-surface-2" : "bg-surface hover:bg-surface-2/70",
        disabled && "pointer-events-none opacity-40",
        className
      )}
    >
      {leading != null && (
        <span className="flex shrink-0 items-center justify-center [&_svg]:size-6">
          {leading}
        </span>
      )}
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[1.0625rem] font-semibold text-foreground">
          {label}
        </span>
        {description != null && (
          <span className="mt-0.5 block truncate text-footnote text-muted">
            {description}
          </span>
        )}
      </span>
      {selected && <Check className="size-5 shrink-0 text-foreground" strokeWidth={2.5} />}
    </button>
  );
}
