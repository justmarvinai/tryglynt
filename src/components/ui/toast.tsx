import * as React from "react";
import { CheckCircle2, Info, OctagonAlert } from "lucide-react";
import { cn } from "@/lib/cn";
import { Portal } from "@/lib/portal";

export interface ToastOptions {
  title: React.ReactNode;
  description?: React.ReactNode;
  tone?: "default" | "success" | "danger" | "info";
  /** ms before auto-dismiss. */
  duration?: number;
  /** Glynt extension: inline action pill (e.g. „Rückgängig"). */
  action?: { label: string; onPress: () => void };
}

interface ToastItem extends ToastOptions {
  id: number;
  leaving?: boolean;
}

interface ToastContextValue {
  toast: (options: ToastOptions) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);

/** Read the `toast()` function. Must be used under `<ToastProvider>`. */
export function useToast() {
  const ctx = React.useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside <ToastProvider>");
  return ctx;
}

const icons = {
  default: null,
  success: <CheckCircle2 className="size-5 text-success" />,
  danger: <OctagonAlert className="size-5 text-danger" />,
  info: <Info className="size-5 text-accent" />,
};

/** Wrap your app (or a subtree) once; then call `useToast().toast({...})`. */
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = React.useState<ToastItem[]>([]);
  const idRef = React.useRef(0);

  const dismiss = React.useCallback((id: number) => {
    setItems((prev) =>
      prev.map((t) => (t.id === id ? { ...t, leaving: true } : t))
    );
    window.setTimeout(
      () => setItems((prev) => prev.filter((t) => t.id !== id)),
      220
    );
  }, []);

  const toast = React.useCallback(
    (options: ToastOptions) => {
      const id = ++idRef.current;
      setItems((prev) => [...prev.slice(-2), { ...options, id }]);
      window.setTimeout(() => dismiss(id), options.duration ?? 3500);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <Portal>
        <div
          aria-live="polite"
          className="pointer-events-none fixed inset-x-5 bottom-6 z-[70] flex flex-col items-center gap-2.5 mb-safe sm:inset-x-auto sm:right-6 sm:items-end"
        >
          {items.map((t) => (
            <div
              key={t.id}
              role="status"
              onClick={() => dismiss(t.id)}
              className={cn(
                "pointer-events-auto flex w-full max-w-sm cursor-pointer items-center gap-3 rounded-row bg-inverse px-4.5 py-3.5 text-left text-inverse-foreground shadow-pop sm:w-auto sm:min-w-64",
                t.leaving ? "animate-fade-out" : "animate-toast-in"
              )}
            >
              {icons[t.tone ?? "default"]}
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[0.9375rem] font-semibold">
                  {t.title}
                </span>
                {t.description != null && (
                  <span className="mt-0.5 block text-footnote opacity-70">
                    {t.description}
                  </span>
                )}
              </span>
              {t.action != null && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    t.action?.onPress();
                    dismiss(t.id);
                  }}
                  className="pressable shrink-0 rounded-full bg-inverse-foreground/15 px-3.5 py-1.5 text-footnote font-bold"
                >
                  {t.action.label}
                </button>
              )}
            </div>
          ))}
        </div>
      </Portal>
    </ToastContext.Provider>
  );
}
