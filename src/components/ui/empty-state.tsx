import { cn } from "@/lib/cn";

export interface EmptyStateProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  icon?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Call-to-action, e.g. a Button. */
  action?: React.ReactNode;
}

/** Friendly centered placeholder for empty lists and zero states. */
export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
  ...props
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-6 py-14 text-center",
        className
      )}
      {...props}
    >
      {icon != null && (
        <div className="mb-4 flex size-16 items-center justify-center rounded-full bg-surface text-muted [&_svg]:size-7">
          {icon}
        </div>
      )}
      <h3 className="text-title3">{title}</h3>
      {description != null && (
        <p className="mt-1.5 max-w-[17rem] text-subhead text-muted">{description}</p>
      )}
      {action != null && <div className="mt-6">{action}</div>}
    </div>
  );
}
