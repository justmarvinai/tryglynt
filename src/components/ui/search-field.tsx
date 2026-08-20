import * as React from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/hooks";

export interface SearchFieldProps
  extends Omit<React.ComponentProps<"input">, "onChange" | "value" | "size"> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
}

/** Pill-shaped search input with a built-in clear button. */
export function SearchField({
  value,
  defaultValue = "",
  onChange,
  placeholder = "Search",
  className,
  disabled,
  ...props
}: SearchFieldProps) {
  const [current, setCurrent] = useControllableState({
    value,
    defaultValue,
    onChange,
  });

  return (
    <div
      className={cn(
        "relative flex items-center",
        disabled && "opacity-50",
        className
      )}
    >
      <Search className="pointer-events-none absolute left-4 size-5 text-faint" />
      <input
        type="search"
        role="searchbox"
        value={current}
        onChange={(e) => setCurrent(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "h-12 w-full rounded-full bg-surface pl-12 pr-11 text-[1rem] text-foreground",
          "placeholder:text-faint outline-none transition-shadow",
          "focus:bg-background focus:ring-2 focus:ring-accent",
          "[&::-webkit-search-cancel-button]:hidden"
        )}
        {...props}
      />
      {current.length > 0 && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => setCurrent("")}
          className="absolute right-3 flex size-7 items-center justify-center rounded-full bg-surface-2 text-muted hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
