import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/hooks";

export interface SliderProps
  extends Omit<React.ComponentProps<"input">, "onChange" | "value" | "size"> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  tone?: "accent" | "ink" | "success" | "pink";
}

const fills = {
  accent: "var(--cos-accent)",
  ink: "var(--cos-inverse)",
  success: "var(--cos-success)",
  pink: "var(--cos-pink)",
};

/** iOS-style slider with a large white thumb. */
export function Slider({
  value,
  defaultValue = 50,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  tone = "accent",
  className,
  ...props
}: SliderProps) {
  const [current, setCurrent] = useControllableState({
    value,
    defaultValue,
    onChange,
  });
  const progress = ((current - min) / (max - min)) * 100;

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={current}
      onChange={(e) => setCurrent(Number(e.target.value))}
      className={cn("cos-range", className)}
      style={
        {
          "--cos-range-progress": `${progress}%`,
          "--cos-range-fill": fills[tone],
        } as React.CSSProperties
      }
      {...props}
    />
  );
}
