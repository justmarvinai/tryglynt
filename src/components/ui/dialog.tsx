import * as React from "react";
import { cn } from "@/lib/cn";
import { useEscapeKey, useLockBodyScroll } from "@/lib/hooks";
import { Portal } from "@/lib/portal";

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Extra content between the description and the actions. */
  children?: React.ReactNode;
  /** Action buttons — stacked full-width, primary first. */
  actions?: React.ReactNode;
  dismissible?: boolean;
  className?: string;
}

/** Centered alert dialog for confirmations. */
export function Dialog({
  open,
  onOpenChange,
  title,
  description,
  children,
  actions,
  dismissible = true,
  className,
}: DialogProps) {
  const [visible, setVisible] = React.useState(open);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const titleId = React.useId();
  const closing = !open && visible;

  React.useEffect(() => {
    if (open) setVisible(true);
  }, [open]);

  useLockBodyScroll(open || visible);
  useEscapeKey(open && dismissible, () => onOpenChange(false));

  React.useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.focus({ preventScroll: true });
    return () => previous?.focus?.({ preventScroll: true });
  }, [open]);

  if (!open && !visible) return null;

  return (
    <Portal>
      <div
        aria-hidden
        onClick={dismissible ? () => onOpenChange(false) : undefined}
        className={cn(
          "fixed inset-0 z-50 bg-black/40 dark:bg-black/60",
          closing ? "animate-fade-out" : "animate-fade-in"
        )}
        onAnimationEnd={() => {
          if (closing) setVisible(false);
        }}
      />
      <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center p-6">
        <div
          ref={panelRef}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby={titleId}
          tabIndex={-1}
          className={cn(
            "pointer-events-auto w-full max-w-[21rem] rounded-sheet bg-background p-6 text-center shadow-pop outline-none",
            closing ? "animate-zoom-out" : "animate-zoom-in",
            className
          )}
        >
          <h2 id={titleId} className="text-title3">
            {title}
          </h2>
          {description != null && (
            <p className="mt-2 text-subhead leading-relaxed text-muted">
              {description}
            </p>
          )}
          {children != null && <div className="mt-4 text-left">{children}</div>}
          {actions != null && (
            <div className="mt-6 flex flex-col gap-2.5">{actions}</div>
          )}
        </div>
      </div>
    </Portal>
  );
}
