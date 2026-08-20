import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/hooks";

export interface CheckboxProps
  extends Omit<React.ComponentProps<"button">, "onChange" | "children"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  /** Optional visible label — clicking it toggles the checkbox. */
  label?: React.ReactNode;
  tone?: "ink" | "accent";
}

/** Rounded checkbox with a springy check. */
export function Checkbox({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  tone = "ink",
  className,
  disabled,
  ...props
}: CheckboxProps) {
  const [on, setOn] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  });

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={on}
      disabled={disabled}
      onClick={() => setOn(!on)}
      className={cn(
        "group inline-flex select-none items-center gap-3 text-left",
        "disabled:pointer-events-none disabled:opacity-40",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "flex size-6 shrink-0 items-center justify-center rounded-lg border transition-colors duration-150",
          on
            ? tone === "ink"
              ? "border-inverse bg-inverse text-inverse-foreground"
              : "border-accent bg-accent text-accent-foreground"
            : "border-border bg-background group-hover:bg-surface"
        )}
      >
        <Check
          className={cn(
            "size-4 transition-transform duration-150 ease-[var(--ease-spring)]",
            on ? "scale-100" : "scale-0"
          )}
          strokeWidth={3}
        />
      </span>
      {label != null && (
        <span className="text-[1.0625rem] font-medium text-foreground">{label}</span>
      )}
    </button>
  );
}
