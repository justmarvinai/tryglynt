import * as React from "react";
import { cn } from "@/lib/cn";
import { useEscapeKey, useLockBodyScroll } from "@/lib/hooks";
import { Portal } from "@/lib/portal";

export interface SheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Centered title in the sheet header. */
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Allow closing via backdrop, Escape and drag. */
  dismissible?: boolean;
  /** Show the iOS grabber handle. */
  showHandle?: boolean;
  /** On `sm+` screens: morph into a centered dialog (default) or stay a bottom sheet. */
  desktop?: "dialog" | "sheet";
  /** Pinned below the scrollable content — put primary actions here. */
  footer?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

function focusables(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
    )
  ).filter((el) => el.offsetParent !== null);
}

/**
 * Bottom sheet with drag-to-close — the CleanOS modal surface.
 * Sheets can stack: opening a sheet from inside a sheet just works.
 */
export function Sheet({
  open,
  onOpenChange,
  title,
  description,
  dismissible = true,
  showHandle = true,
  desktop = "dialog",
  footer,
  children,
  className,
}: SheetProps) {
  const [visible, setVisible] = React.useState(open);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const dragState = React.useRef<{ startY: number; startT: number } | null>(null);
  const titleId = React.useId();
  const closing = !open && visible;

  React.useEffect(() => {
    if (open) setVisible(true);
  }, [open]);

  useLockBodyScroll(open || visible);
  useEscapeKey(open && dismissible, () => onOpenChange(false));

  // Focus the panel when it opens; restore focus on close.
  React.useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    panelRef.current?.focus({ preventScroll: true });
    return () => previous?.focus?.({ preventScroll: true });
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "Tab" || !panelRef.current) return;
    const els = focusables(panelRef.current);
    if (els.length === 0) return;
    const first = els[0];
    const last = els[els.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const onDragStart = (e: React.PointerEvent) => {
    if (!dismissible) return;
    if (desktop === "dialog" && window.matchMedia("(min-width: 640px)").matches)
      return;
    dragState.current = { startY: e.clientY, startT: Date.now() };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    if (panelRef.current) panelRef.current.style.transition = "none";
  };

  const onDragMove = (e: React.PointerEvent) => {
    if (!dragState.current || !panelRef.current) return;
    const dy = Math.max(0, e.clientY - dragState.current.startY);
    panelRef.current.style.transform = `translateY(${dy}px)`;
  };

  const onDragEnd = (e: React.PointerEvent) => {
    const state = dragState.current;
    const panel = panelRef.current;
    dragState.current = null;
    if (!state || !panel) return;
    const dy = Math.max(0, e.clientY - state.startY);
    const velocity = dy / Math.max(1, Date.now() - state.startT);
    panel.style.transition = "transform 0.3s var(--ease-out-quart)";
    if (dy > 110 || velocity > 0.5) {
      panel.style.transform = "translateY(105%)";
      const done = () => {
        panel.style.transition = "";
        panel.style.transform = "";
        setVisible(false);
        onOpenChange(false);
      };
      panel.addEventListener("transitionend", done, { once: true });
      window.setTimeout(done, 350);
    } else {
      panel.style.transform = "translateY(0)";
      window.setTimeout(() => {
        if (panel) panel.style.transition = "";
      }, 320);
    }
  };

  if (!open && !visible) return null;

  return (
    <Portal>
      {/* Backdrop */}
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
      {/* Positioner */}
      <div
        className={cn(
          "pointer-events-none fixed inset-0 z-50 flex flex-col justify-end",
          desktop === "dialog" && "sm:items-center sm:justify-center sm:p-6"
        )}
      >
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={title != null ? titleId : undefined}
          tabIndex={-1}
          onKeyDown={onKeyDown}
          className={cn(
            "pointer-events-auto relative flex max-h-[92dvh] w-full flex-col rounded-t-sheet bg-background shadow-sheet outline-none",
            desktop === "dialog"
              ? "sm:max-h-[85dvh] sm:max-w-md sm:rounded-sheet"
              : "sm:mx-auto sm:max-w-md",
            closing
              ? cn("animate-sheet-out", desktop === "dialog" && "sm:animate-zoom-out")
              : cn("animate-sheet-in", desktop === "dialog" && "sm:animate-zoom-in"),
            className
          )}
        >
          {/* Grabber + header (drag surface) */}
          <div
            className="shrink-0 touch-none"
            onPointerDown={onDragStart}
            onPointerMove={onDragMove}
            onPointerUp={onDragEnd}
            onPointerCancel={onDragEnd}
          >
            {showHandle && (
              <div className="mx-auto mt-2.5 h-1.5 w-10 rounded-full bg-surface-2" />
            )}
            {(title != null || description != null) && (
              <div className="px-6 pb-2 pt-5 text-center">
                {title != null && (
                  <h2 id={titleId} className="text-title2">
                    {title}
                  </h2>
                )}
                {description != null && (
                  <p className="mt-1.5 text-subhead text-muted">{description}</p>
                )}
              </div>
            )}
          </div>
          {/* Content */}
          <div className="min-h-0 flex-1 overflow-y-auto px-5 pb-6 pt-3">
            {children}
          </div>
          {footer != null && (
            <div className="shrink-0 border-t border-hairline px-5 pb-6 pt-4 mb-safe">
              {footer}
            </div>
          )}
          {footer == null && <div className="pb-safe" />}
        </div>
      </div>
    </Portal>
  );
}
