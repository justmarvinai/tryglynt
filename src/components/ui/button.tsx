import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import { Spinner } from "@/components/ui/spinner";

export const buttonVariants = cva(
  [
    "pressable inline-flex shrink-0 select-none items-center justify-center gap-2",
    "whitespace-nowrap rounded-full font-semibold",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        primary: "bg-accent text-accent-foreground hover:bg-accent-strong",
        ink: "bg-inverse text-inverse-foreground hover:opacity-90",
        soft: "bg-surface text-foreground hover:bg-surface-2",
        outline: "border border-border bg-background text-foreground hover:bg-surface",
        ghost: "text-foreground hover:bg-surface",
        danger: "bg-danger text-white hover:opacity-90",
        "danger-soft": "bg-danger-soft text-danger hover:opacity-85",
        link: "h-auto rounded-none p-0 text-accent-text underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-9 px-4 text-[0.9375rem] [&_svg]:size-4",
        md: "h-12 px-5 text-[1rem] [&_svg]:size-5",
        lg: "h-14 px-6 text-[1.0625rem] [&_svg]:size-5",
        xl: "h-16 px-8 text-[1.125rem] [&_svg]:size-6",
      },
      full: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "lg",
    },
  }
);

export interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {
  /** Shows a spinner and disables the button. */
  loading?: boolean;
}

export function Button({
  className,
  variant,
  size,
  full,
  loading,
  disabled,
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={cn(buttonVariants({ variant, size, full }), className)}
      {...props}
    >
      {loading && <Spinner size="sm" />}
      {children}
    </button>
  );
}
