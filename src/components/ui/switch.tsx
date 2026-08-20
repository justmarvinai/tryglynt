import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/hooks";

export interface SwitchProps
  extends Omit<React.ComponentProps<"button">, "onChange"> {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  size?: "sm" | "md";
  /** On-state color. CleanOS defaults to ink (near-black), like the screenshots. */
  tone?: "ink" | "accent" | "success";
}

const tones = {
  ink: "bg-inverse",
  accent: "bg-accent",
  success: "bg-success",
};

/** iOS-style toggle. */
export function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  size = "md",
  tone = "ink",
  className,
  disabled,
  ...props
}: SwitchProps) {
  const [on, setOn] = useControllableState({
    value: checked,
    defaultValue: defaultChecked,
    onChange: onCheckedChange,
  });

  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      disabled={disabled}
      onClick={() => setOn(!on)}
      className={cn(
        "relative inline-flex shrink-0 items-center rounded-full transition-colors duration-200",
        "disabled:pointer-events-none disabled:opacity-40",
        size === "md" ? "h-8 w-[3.25rem] p-0.5" : "h-6 w-10 p-0.5",
        on ? tones[tone] : "bg-surface-2",
        className
      )}
      {...props}
    >
      <span
        className={cn(
          "block rounded-full bg-white shadow-[0_2px_6px_rgba(16,16,19,0.25)] transition-transform duration-200 ease-[var(--ease-out-quart)]",
          size === "md" ? "size-7" : "size-5",
          on && (size === "md" ? "translate-x-5" : "translate-x-4")
        )}
      />
    </button>
  );
}
