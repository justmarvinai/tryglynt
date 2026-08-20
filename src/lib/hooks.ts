import * as React from "react";

/** Controlled/uncontrolled state helper (shadcn-style). */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: {
  value?: T;
  defaultValue: T;
  onChange?: (value: T) => void;
}) {
  const [internal, setInternal] = React.useState<T>(defaultValue);
  const isControlled = value !== undefined;
  const state = isControlled ? (value as T) : internal;
  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;

  const setState = React.useCallback(
    (next: T) => {
      if (!isControlled) setInternal(next);
      onChangeRef.current?.(next);
    },
    [isControlled]
  );
  return [state, setState] as const;
}

/** Locks body scroll while `locked` is true (sheets, dialogs). */
export function useLockBodyScroll(locked: boolean) {
  React.useEffect(() => {
    if (!locked) return;
    const { body } = document;
    const count = Number(body.dataset.cosScrollLocks ?? "0") + 1;
    body.dataset.cosScrollLocks = String(count);
    const prev = body.style.overflow;
    body.style.overflow = "hidden";
    return () => {
      const next = Number(body.dataset.cosScrollLocks ?? "1") - 1;
      body.dataset.cosScrollLocks = String(Math.max(0, next));
      if (next <= 0) body.style.overflow = prev;
    };
  }, [locked]);
}

/** Calls `handler` when Escape is pressed and `active` is true. */
export function useEscapeKey(active: boolean, handler: () => void) {
  const handlerRef = React.useRef(handler);
  handlerRef.current = handler;
  React.useEffect(() => {
    if (!active) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handlerRef.current();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [active]);
}

/** True after first client render — gate portals and browser-only UI. */
export function useMounted() {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
}

/** Reactive CSS media query match. */
export function useMediaQuery(query: string) {
  const subscribe = React.useCallback(
    (cb: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    [query]
  );
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  );
}
