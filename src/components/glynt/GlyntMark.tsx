import { cn } from "@/lib/cn";

/**
 * The Glynt "G" mark (docs/DESIGN.md §3) — inherits `currentColor`.
 * Same geometry as scripts/make-icons.mjs.
 */
export function GlyntMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      aria-hidden
      className={cn("size-12", className)}
      fill="none"
    >
      <path
        d="M 396 256 A 140 140 0 1 1 326 134.76"
        stroke="currentColor"
        strokeWidth="56"
        strokeLinecap="round"
      />
      <path
        d="M 396 256 L 300 256"
        stroke="currentColor"
        strokeWidth="56"
        strokeLinecap="round"
      />
      <circle cx="377.24" cy="186" r="30" fill="currentColor" />
    </svg>
  );
}
