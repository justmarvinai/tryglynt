import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

export const cardVariants = cva("rounded-card", {
  variants: {
    variant: {
      /** Soft gray tile — the CleanOS default. */
      surface: "bg-surface text-foreground",
      /** White card with a hairline border, for grouping on the canvas. */
      plain: "bg-background text-foreground border border-hairline",
      /** White card lifted with a soft shadow (popovers, desktop). */
      elevated: "bg-background text-foreground shadow-pop",
      /** Near-black card — high-emphasis banners. */
      inverse: "bg-inverse text-inverse-foreground",
    },
    padding: {
      none: "",
      sm: "p-4",
      md: "p-5",
      lg: "p-6",
    },
  },
  defaultVariants: {
    variant: "surface",
    padding: "md",
  },
});

export interface CardProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof cardVariants> {}

export function Card({ className, variant, padding, ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant, padding }), className)} {...props} />
  );
}
