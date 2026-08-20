import { cn } from "@/lib/cn";

const sizes = {
  sm: { box: "size-4", bar: "w-[1.5px]", inset: 62 },
  md: { box: "size-5", bar: "w-[2px]", inset: 62 },
  lg: { box: "size-8", bar: "w-[3px]", inset: 62 },
};

export interface SpinnerProps extends React.ComponentProps<"span"> {
  size?: keyof typeof sizes;
}

/** iOS-style spoke activity indicator. Inherits `currentColor`. */
export function Spinner({ size = "md", className, ...props }: SpinnerProps) {
  const s = sizes[size];
  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn("relative inline-block shrink-0", s.box, className)}
      {...props}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "absolute left-1/2 top-0 h-full origin-center -translate-x-1/2",
            s.bar
          )}
          style={{ transform: `rotate(${i * 45}deg)` }}
        >
          <span
            className="block h-[30%] w-full rounded-full bg-current"
            style={{
              animation: "cos-spoke 0.8s linear infinite",
              animationDelay: `${-0.8 + i * 0.1}s`,
            }}
          />
        </span>
      ))}
    </span>
  );
}
