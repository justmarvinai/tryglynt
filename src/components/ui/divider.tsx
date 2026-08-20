import { cn } from "@/lib/cn";

export interface DividerProps extends React.ComponentProps<"div"> {
  orientation?: "horizontal" | "vertical";
  /** Indents the divider so it aligns with row content. */
  inset?: boolean;
}

export function Divider({
  orientation = "horizontal",
  inset,
  className,
  ...props
}: DividerProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-hairline",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px self-stretch",
        inset && (orientation === "horizontal" ? "mx-5 w-auto" : "my-2 h-auto"),
        className
      )}
      {...props}
    />
  );
}
