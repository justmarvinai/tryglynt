import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const iconButtonVariants = cva(
  [
    "pressable inline-flex shrink-0 select-none items-center justify-center rounded-full",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        soft: "bg-surface text-foreground hover:bg-surface-2",
        primary: "bg-accent text-accent-foreground hover:bg-accent-strong",
        ink: "bg-inverse text-inverse-foreground hover:opacity-90",
        outline: "border border-border bg-background text-foreground hover:bg-surface",
        ghost: "text-foreground hover:bg-surface",
        white: "bg-background text-foreground shadow-soft",
        danger: "bg-danger-soft text-danger hover:opacity-85",
      },
      size: {
        xs: "size-8 [&_svg]:size-4",
        sm: "size-9 [&_svg]:size-4",
        md: "size-11 [&_svg]:size-5",
        lg: "size-14 [&_svg]:size-6",
        xl: "size-16 [&_svg]:size-7",
      },
    },
    defaultVariants: {
      variant: "soft",
      size: "md",
    },
  }
);

export interface IconButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof iconButtonVariants> {
  /** Accessible name — required because the button has no visible text. */
  label: string;
}

export function IconButton({
  className,
  variant,
  size,
  label,
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(iconButtonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
