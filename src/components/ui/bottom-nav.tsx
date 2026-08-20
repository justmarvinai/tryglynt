import { cn } from "@/lib/cn";

export interface BottomNavProps extends React.ComponentProps<"nav"> {
  /** Max content width — match your Screen. */
  maxWidth?: "sm" | "md" | "lg";
}

const widths = { sm: "max-w-md", md: "max-w-xl", lg: "max-w-3xl" };

/**
 * iOS-style bottom tab bar with a blurred background.
 * Use for 3–5 top-level destinations; use Dock for action-centric screens.
 */
export function BottomNav({
  maxWidth = "sm",
  className,
  children,
  ...props
}: BottomNavProps) {
  return (
    <nav
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t border-hairline bg-background/85 pb-safe backdrop-blur-xl",
        className
      )}
      {...props}
    >
      <div className={cn("mx-auto flex items-stretch px-2", widths[maxWidth])}>
        {children}
      </div>
    </nav>
  );
}

export interface BottomNavItemProps {
  icon: React.ReactNode;
  label: React.ReactNode;
  /** Small count bubble on the icon. */
  badge?: React.ReactNode;
  active?: boolean;
  href?: string;
  onPress?: () => void;
  className?: string;
}

export function BottomNavItem({
  icon,
  label,
  badge,
  active = false,
  href,
  onPress,
  className,
}: BottomNavItemProps) {
  const classes = cn(
    "flex flex-1 select-none flex-col items-center gap-1 pb-2 pt-2.5 transition-colors",
    "[&_svg]:size-6",
    active ? "text-foreground" : "text-faint hover:text-muted",
    className
  );

  const content = (
    <>
      <span className="relative">
        {icon}
        {badge != null && (
          <span className="absolute -right-2.5 -top-1.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-full bg-danger px-1 text-[0.625rem] font-bold text-white ring-2 ring-background">
            {badge}
          </span>
        )}
      </span>
      <span className="text-[0.6875rem] font-semibold">{label}</span>
    </>
  );

  if (href) {
    return (
      <a href={href} aria-current={active ? "page" : undefined} className={classes}>
        {content}
      </a>
    );
  }
  return (
    <button
      type="button"
      onClick={onPress}
      aria-current={active ? "page" : undefined}
      className={classes}
    >
      {content}
    </button>
  );
}

/** Spacer to keep scrollable content clear of the BottomNav. */
export function BottomNavSpacer({ className, ...props }: React.ComponentProps<"div">) {
  return <div aria-hidden className={cn("h-24 shrink-0", className)} {...props} />;
}
