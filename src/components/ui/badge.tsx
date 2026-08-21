import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const badgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center font-semibold tabular-nums",
  {
    variants: {
      tone: {
        neutral: "",
        ink: "",
        accent: "",
        success: "",
        danger: "",
        warning: "",
        pink: "",
      },
      variant: {
        solid: "",
        soft: "",
      },
      size: {
        sm: "h-5 min-w-5 rounded-full px-1.5 text-[0.6875rem]",
        md: "h-6 min-w-6 rounded-full px-2 text-xs",
        lg: "h-8 min-w-8 rounded-full px-2.5 text-[0.9375rem]",
        /** Big squircle stat badge — the green streak counter. */
        tile: "size-14 rounded-row px-2 text-[1.75rem] font-extrabold",
      },
    },
    compoundVariants: [
      { tone: "neutral", variant: "solid", class: "bg-surface-2 text-foreground" },
      { tone: "neutral", variant: "soft", class: "bg-surface text-muted" },
      { tone: "ink", variant: "solid", class: "bg-inverse text-inverse-foreground" },
      { tone: "ink", variant: "soft", class: "bg-surface text-foreground" },
      { tone: "accent", variant: "solid", class: "bg-accent text-accent-foreground" },
      { tone: "accent", variant: "soft", class: "bg-accent-soft text-accent-text" },
      { tone: "success", variant: "solid", class: "bg-success text-white" },
      { tone: "success", variant: "soft", class: "bg-success-soft text-success" },
      { tone: "danger", variant: "solid", class: "bg-danger text-white" },
      { tone: "danger", variant: "soft", class: "bg-danger-soft text-danger" },
      { tone: "warning", variant: "solid", class: "bg-warning text-white" },
      { tone: "warning", variant: "soft", class: "bg-warning-soft text-warning" },
      { tone: "pink", variant: "solid", class: "bg-pink text-white" },
      { tone: "pink", variant: "soft", class: "bg-pink-soft text-pink-strong" },
    ],
    defaultVariants: {
      tone: "ink",
      variant: "solid",
      size: "md",
    },
  }
);

export interface BadgeProps
  extends React.ComponentProps<"span">,
    VariantProps<typeof badgeVariants> {
  /** Renders a small dot with no content. */
  dot?: boolean;
}

export function Badge({
  className,
  tone,
  variant,
  size,
  dot,
  children,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        badgeVariants({ tone, variant, size }),
        dot && "size-2.5 min-w-0 p-0",
        className
      )}
      {...props}
    >
      {dot ? null : children}
    </span>
  );
}
