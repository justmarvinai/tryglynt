import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/cn";

export interface PromoBannerProps {
  /** Leading icon — e.g. a crown for "Upgrade to Pro". */
  icon?: React.ReactNode;
  children: React.ReactNode;
  href?: string;
  onPress?: () => void;
  variant?: "inverse" | "accent" | "surface";
  className?: string;
}

const variants = {
  inverse: "bg-inverse text-inverse-foreground",
  accent: "bg-accent text-accent-foreground",
  surface: "bg-surface text-foreground",
};

/** High-emphasis full-width banner — the "Upgrade to Pro" bar. */
export function PromoBanner({
  icon,
  children,
  href,
  onPress,
  variant = "inverse",
  className,
}: PromoBannerProps) {
  const content = (
    <>
      {icon != null && (
        <span className="flex shrink-0 items-center [&_svg]:size-6">{icon}</span>
      )}
      <span className="flex-1 truncate text-[1.1875rem] font-bold tracking-[-0.01em]">
        {children}
      </span>
      <ArrowRight className="size-5 shrink-0" />
    </>
  );

  const classes = cn(
    "pressable flex min-h-16 w-full items-center gap-3.5 rounded-row px-5 text-left",
    variants[variant],
    "hover:opacity-90",
    className
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <button type="button" onClick={onPress} className={classes}>
      {content}
    </button>
  );
}
