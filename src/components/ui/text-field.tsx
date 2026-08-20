import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export interface TextFieldProps
  extends Omit<React.ComponentProps<"input">, "size"> {
  label?: React.ReactNode;
  /** Helper text below the field. */
  hint?: React.ReactNode;
  /** Error message — overrides hint and tints the field red. */
  error?: React.ReactNode;
  /** Icon shown at the start of the field. */
  leading?: React.ReactNode;
  /** Node shown at the end of the field (icon, unit, button). */
  trailing?: React.ReactNode;
  /** Shows an ✕ button to clear the value. */
  clearable?: boolean;
}

/** Soft gray input field — the CleanOS text input. */
export function TextField({
  label,
  hint,
  error,
  leading,
  trailing,
  clearable,
  className,
  id,
  value,
  defaultValue,
  onChange,
  disabled,
  ...props
}: TextFieldProps) {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [internal, setInternal] = React.useState(String(defaultValue ?? ""));
  const currentValue = value !== undefined ? String(value) : internal;
  const showClear = Boolean(clearable && currentValue.length > 0 && !disabled);

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
      <div className="relative flex items-center">
        {leading != null && (
          <span className="pointer-events-none absolute left-4 flex items-center text-faint [&_svg]:size-5">
            {leading}
          </span>
        )}
        <input
          ref={inputRef}
          id={inputId}
          value={value !== undefined ? value : internal}
          onChange={(e) => {
            if (value === undefined) setInternal(e.target.value);
            onChange?.(e);
          }}
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          className={cn(
            "h-14 w-full rounded-field bg-surface px-4 text-[1.0625rem] text-foreground",
            "placeholder:text-faint",
            "outline-none transition-shadow focus:bg-background focus:ring-2 focus:ring-accent",
            error && "ring-2 ring-danger focus:ring-danger",
            leading != null && "pl-12",
            (trailing != null || showClear) && "pr-12"
          )}
          {...props}
        />
        {showClear ? (
          <button
            type="button"
            aria-label="Clear"
            onClick={() => {
              if (value === undefined) setInternal("");
              const el = inputRef.current;
              if (el) {
                const setter = Object.getOwnPropertyDescriptor(
                  HTMLInputElement.prototype,
                  "value"
                )?.set;
                setter?.call(el, "");
                el.dispatchEvent(new Event("input", { bubbles: true }));
                el.focus();
              }
            }}
            className="absolute right-3 flex size-7 items-center justify-center rounded-full bg-surface-2 text-muted hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        ) : (
          trailing != null && (
            <span className="absolute right-4 flex items-center text-faint [&_svg]:size-5">
              {trailing}
            </span>
          )
        )}
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
