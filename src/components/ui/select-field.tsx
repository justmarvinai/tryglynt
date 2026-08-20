import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/cn";

export interface SelectFieldProps extends React.ComponentProps<"select"> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
}

/**
 * Styled native `<select>` — reliable everywhere, keyboard friendly.
 * For a fully custom iOS-style picker, open an OptionList inside a Sheet.
 */
export function SelectField({
  label,
  hint,
  error,
  className,
  id,
  children,
  disabled,
  ...props
}: SelectFieldProps) {
  const autoId = React.useId();
  const selectId = id ?? autoId;

  return (
    <div className={cn("w-full", disabled && "opacity-50", className)}>
      {label != null && (
        <label
          htmlFor={selectId}
          className="mb-2 block px-1 text-subhead font-semibold text-foreground"
        >
          {label}
        </label>
      )}
      <div className="relative">
        <select
          id={selectId}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          className={cn(
            "h-14 w-full appearance-none rounded-field bg-surface px-4 pr-11 text-[1.0625rem] text-foreground",
            "outline-none transition-shadow focus:bg-background focus:ring-2 focus:ring-accent",
            error && "ring-2 ring-danger focus:ring-danger"
          )}
          {...props}
        >
          {children}
        </select>
        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-5 -translate-y-1/2 text-faint" />
      </div>
      {(error ?? hint) != null && (
        <p
          className={cn(
            "mt-2 px-1 text-footnote",
            error ? "text-danger" : "text-muted"
          )}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
