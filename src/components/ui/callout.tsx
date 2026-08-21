import { AlertTriangle, CheckCircle2, Info, OctagonAlert } from "lucide-react";
import { cn } from "@/lib/cn";

export interface CalloutProps
  extends Omit<React.ComponentProps<"div">, "title"> {
  tone?: "info" | "success" | "warning" | "danger";
  title?: React.ReactNode;
  /** Replaces the default tone icon. */
  icon?: React.ReactNode;
}

const tones = {
  info: { box: "bg-accent-soft", icon: "text-accent-text", Icon: Info },
  success: { box: "bg-success-soft", icon: "text-success", Icon: CheckCircle2 },
  warning: { box: "bg-warning-soft", icon: "text-warning", Icon: AlertTriangle },
  danger: { box: "bg-danger-soft", icon: "text-danger", Icon: OctagonAlert },
};

/** Soft-tinted inline notice with an icon. */
export function Callout({
  tone = "info",
  title,
  icon,
  className,
  children,
  ...props
}: CalloutProps) {
  const t = tones[tone];
  return (
    <div
      role="note"
      className={cn("flex gap-3 rounded-row p-4 text-foreground", t.box, className)}
      {...props}
    >
      <span className={cn("mt-0.5 shrink-0 [&_svg]:size-5", t.icon)}>
        {icon ?? <t.Icon />}
      </span>
      <div className="min-w-0 text-subhead leading-relaxed">
        {title != null && <p className="mb-0.5 font-semibold">{title}</p>}
        {children}
      </div>
    </div>
  );
}
