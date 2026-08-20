import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface FeatureCardProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Optional icon rendered above the title. */
  icon?: React.ReactNode;
  href?: string;
  onPress?: () => void;
  className?: string;
}

/** Tall navigation card with a chevron — put two in a `grid grid-cols-2 gap-4`. */
export function FeatureCard({
  title,
  description,
  icon,
  href,
  onPress,
  className,
}: FeatureCardProps) {
  const interactive = Boolean(href || onPress);

  const content = (
    <>
      {icon != null && (
        <span className="mb-3 flex size-11 items-center justify-center rounded-full bg-background text-foreground shadow-soft [&_svg]:size-5">
          {icon}
        </span>
      )}
      <span className="block text-[1.5rem] font-bold leading-[1.15] tracking-[-0.02em]">
        {title}
      </span>
      {description != null && (
        <span className="mt-2 block text-body leading-snug text-muted">
          {description}
        </span>
      )}
      <span className="mt-auto flex justify-end pt-4">
        {interactive && (
          <span className="flex size-11 items-center justify-center rounded-full bg-background text-foreground shadow-soft">
            <ChevronRight className="size-5" />
          </span>
        )}
      </span>
    </>
  );

  const classes = cn(
    "flex min-h-[12rem] w-full flex-col rounded-card bg-surface p-5 text-left",
    interactive && "pressable hover:bg-surface-2",
    className
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }
  if (onPress) {
    return (
      <button type="button" onClick={onPress} className={classes}>
        {content}
      </button>
    );
  }
  return <div className={classes}>{content}</div>;
}
