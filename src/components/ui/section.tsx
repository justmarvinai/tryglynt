import { cn } from "@/lib/cn";

export interface SectionHeaderProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  title: React.ReactNode;
  /** Optional right-aligned action (e.g. a "See all" link button). */
  action?: React.ReactNode;
}

/** Bold section heading — "Sprache ändern", "Benachrichtigungen", … */
export function SectionHeader({
  title,
  action,
  className,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn("flex items-end justify-between gap-4 px-1", className)}
      {...props}
    >
      <h2 className="text-title2">{title}</h2>
      {action != null && <span className="shrink-0">{action}</span>}
    </div>
  );
}

export interface SectionProps
  extends Omit<React.ComponentProps<"section">, "title"> {
  title?: React.ReactNode;
  action?: React.ReactNode;
}

/** Vertical grouping with the standard CleanOS rhythm. */
export function Section({ title, action, className, children, ...props }: SectionProps) {
  return (
    <section className={cn("space-y-3.5", className)} {...props}>
      {title != null && <SectionHeader title={title} action={action} />}
      {children}
    </section>
  );
}
