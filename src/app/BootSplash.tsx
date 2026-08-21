import { GlyntMark } from "@/components/glynt/GlyntMark";

/** Shown while the profile gate resolves (a few frames at most). */
export function BootSplash() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-background">
      <GlyntMark className="size-16 animate-pulse text-accent-text" />
    </div>
  );
}
