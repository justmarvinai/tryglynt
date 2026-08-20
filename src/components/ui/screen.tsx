import { cn } from "@/lib/cn";

export interface ScreenProps extends React.ComponentProps<"main"> {
  /** Content width: sm = phone (28rem), md = 36rem, lg = 48rem, full. */
  maxWidth?: "sm" | "md" | "lg" | "full";
  /** Adds bottom padding so content clears a Dock. */
  withDock?: boolean;
  /** Horizontal padding on/off. */
  padded?: boolean;
}

const widths = {
  sm: "max-w-md",
  md: "max-w-xl",
  lg: "max-w-3xl",
  full: "max-w-none",
};

/**
 * Page container with the CleanOS rhythm — mobile-first, centers on
 * larger screens. Wrap each app screen in one.
 */
export function Screen({
  maxWidth = "sm",
  withDock = false,
  padded = true,
  className,
  ...props
}: ScreenProps) {
  return (
    <main
      className={cn(
        "mx-auto flex w-full flex-col pt-safe",
        widths[maxWidth],
        padded && "px-5",
        withDock ? "pb-40" : "pb-10",
        className
      )}
      {...props}
    />
  );
}
