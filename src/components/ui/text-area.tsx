import * as React from "react";
import { cn } from "@/lib/cn";

export interface TextAreaProps extends React.ComponentProps<"textarea"> {
  label?: React.ReactNode;
  hint?: React.ReactNode;
  error?: React.ReactNode;
}

/** Multi-line CleanOS text input. */
export function TextArea({
  label,
  hint,
  error,
  className,
  id,
  rows = 4,
  disabled,
  ...props
}: TextAreaProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;

  return (
    <div className={cn("w-full", disabled && "opacity-50", className)}>
      {label != null && (
        <label
          htmlFor={inputId}
          className="mb-2 block px-1 text-subhead font-semibold text-foreground"
        >
          {label}
        </label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        disabled={disabled}
        aria-invalid={error ? true : undefined}
        className={cn(
          "w-full resize-y rounded-field bg-surface px-4 py-3.5 text-[1.0625rem] text-foreground",
          "placeholder:text-faint",
          "outline-none transition-shadow focus:bg-background focus:ring-2 focus:ring-accent",
          error && "ring-2 ring-danger focus:ring-danger"
        )}
        {...props}
      />
      {(error ?? hint) != null && (
        <p
          className={cn(
            "mt-1.5 px-1 text-footnote",
            error ? "text-danger" : "text-muted"
          )}
        >
          {error ?? hint}
        </p>
      )}
    </div>
  );
}
