import { createPortal } from "react-dom";
import { useMounted } from "@/lib/hooks";

/** Renders children into document.body after mount (SSR-safe). */
export function Portal({ children }: { children: React.ReactNode }) {
  const mounted = useMounted();
  if (!mounted) return null;
  return createPortal(children, document.body);
}
