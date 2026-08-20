import * as React from "react";
import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/hooks";

interface RadioContextValue {
  value: string | undefined;
  setValue: (v: string) => void;
  tone: "ink" | "accent";
}

const RadioContext = React.createContext<RadioContextValue | null>(null);

export interface RadioGroupProps
  extends Omit<React.ComponentProps<"div">, "onChange"> {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  tone?: "ink" | "accent";
}

export function RadioGroup({
  value,
  defaultValue,
  onChange,
  tone = "ink",
  className,
  ...props
}: RadioGroupProps) {
  const [current, setCurrent] = useControllableState<string | undefined>({
    value,
    defaultValue,
    onChange: onChange as (v: string | undefined) => void,
  });
  return (
    <RadioContext.Provider
      value={{ value: current, setValue: (v) => setCurrent(v), tone }}
    >
      <div role="radiogroup" className={cn("space-y-3", className)} {...props} />
    </RadioContext.Provider>
  );
}

export interface RadioProps
  extends Omit<React.ComponentProps<"button">, "value" | "children"> {
  value: string;
  label?: React.ReactNode;
}

export function Radio({ value, label, className, disabled, ...props }: RadioProps) {
  const ctx = React.useContext(RadioContext);
  if (!ctx) throw new Error("<Radio> must be used inside <RadioGroup>");
  const selected = ctx.value === value;

  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      disabled={disabled}
      onClick={() => ctx.setValue(value)}
      className={cn(
        "group flex select-none items-center gap-3 text-left",
        "disabled:pointer-events-none disabled:opacity-40",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "size-6 shrink-0 rounded-full border transition-all duration-150",
          selected
            ? ctx.tone === "ink"
              ? "border-[7.5px] border-inverse bg-background"
              : "border-[7.5px] border-accent bg-background"
            : "border-border bg-background group-hover:bg-surface"
        )}
      />
      {label != null && (
        <span className="text-[1.0625rem] font-medium text-foreground">{label}</span>
      )}
    </button>
  );
}
