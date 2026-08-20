import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const chipVariants = cva(
  [
    "pressable inline-flex shrink-0 select-none items-center justify-center gap-1.5",
    "font-semibold tabular-nums disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:size-4 [&_svg]:shrink-0",
  ],
  {
    variants: {
      size: {
        sm: "h-9 rounded-full px-4 text-[0.9375rem]",
        md: "h-11 rounded-full px-5 text-[1rem]",
        /** Square squircle chip — day numbers, single characters. */
        square: "size-14 rounded-row px-0 text-[1.1875rem]",
      },
      tone: {
        ink: "",
        pink: "",
        accent: "",
        success: "",
      },
      selected: {
        true: "",
        false: "border border-border bg-background text-foreground hover:bg-surface",
      },
    },
    compoundVariants: [
      {
        selected: true,
        tone: "ink",
        class: "border border-transparent bg-inverse text-inverse-foreground",
      },
      {
        selected: true,
        tone: "pink",
        class:
          "border border-pink-strong/60 bg-gradient-to-b from-pink/80 to-pink text-white shadow-[0_4px_14px_-4px_var(--cos-pink)]",
      },
      {
        selected: true,
        tone: "accent",
        class: "border border-transparent bg-accent text-accent-foreground",
      },
      {
        selected: true,
        tone: "success",
        class: "border border-transparent bg-success text-white",
      },
    ],
    defaultVariants: {
      size: "md",
      tone: "ink",
      selected: false,
    },
  }
);

export interface ChipProps
  extends Omit<React.ComponentProps<"button">, "children">,
    VariantProps<typeof chipVariants> {
  children?: React.ReactNode;
}

export function Chip({
  className,
  size,
  tone,
  selected = false,
  type = "button",
  ...props
}: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={Boolean(selected)}
      className={cn(chipVariants({ size, tone, selected }), className)}
      {...props}
    />
  );
}
