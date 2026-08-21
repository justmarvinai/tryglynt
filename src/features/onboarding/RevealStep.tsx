import * as React from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Screen } from "@/components/ui/screen";
import { StatCard } from "@/components/ui/stat-card";
import { GlyntMark } from "@/components/glynt/GlyntMark";
import type { PersonalTargets } from "@/lib/engine/targets";
import { fmt, formatAmount, formatNumber, t } from "@/lib/i18n";

/** Counts up to `target` once, ~800 ms, honoring reduced motion. */
function useCountUp(target: number): number {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    const start = performance.now();
    const duration = 800;
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setValue(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target]);
  return value;
}

export function RevealStep({
  targets,
  onFinish,
  saving,
}: {
  targets: PersonalTargets;
  onFinish: () => void;
  saving: boolean;
}) {
  const [phase, setPhase] = React.useState<"computing" | "reveal">("computing");

  React.useEffect(() => {
    const timer = window.setTimeout(() => setPhase("reveal"), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  if (phase === "computing") {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-6 bg-background px-8">
        <GlyntMark className="size-16 animate-pulse text-accent-text" />
        <p className="text-body text-muted">{t.onboarding.computing}</p>
      </div>
    );
  }

  return (
    <Screen className="flex min-h-dvh flex-col pt-safe">
      <div className="animate-zoom-in flex flex-1 flex-col justify-center py-8">
        <h1 className="text-title1">{t.onboarding.revealTitle}</h1>
        <p className="mt-2 text-subhead text-muted">{t.onboarding.revealSubtitle}</p>

        <div className="mt-8 rounded-card bg-surface p-6 text-center">
          <div className="text-display text-accent-text">
            <EnergyCount value={targets.energyKcal} />
          </div>
          <p className="mt-1 text-subhead text-muted">
            {t.onboarding.revealEnergy} · kcal
          </p>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <StatCard
            value={formatAmount(targets.macros.proteinG, "g", 0)}
            label="Protein"
          />
          <StatCard
            value={formatAmount(targets.macros.carbsG, "g", 0)}
            label="Kohlenhydrate"
          />
          <StatCard value={formatAmount(targets.macros.fatG, "g", 0)} label="Fett" />
          <StatCard
            value={formatAmount(targets.waterMl / 1000, "l", 1)}
            label="Wasser"
          />
        </div>

        <div className="mt-6 flex items-center gap-3 rounded-row bg-accent-soft px-4 py-3.5 text-accent-text">
          <Sparkles className="size-5 shrink-0" />
          <p className="text-subhead font-semibold">
            {fmt(t.onboarding.revealMicros, {
              count: formatNumber(targets.micros.length, 0),
            })}
          </p>
        </div>

        <p className="mt-4 text-footnote text-muted">{t.onboarding.revealAdjustHint}</p>
        <p className="mt-2 text-footnote text-faint">{t.onboarding.revealDisclaimer}</p>
      </div>

      <div className="pb-6">
        <Button size="xl" full onClick={onFinish} loading={saving}>
          {t.onboarding.finish}
        </Button>
      </div>
    </Screen>
  );
}

function EnergyCount({ value }: { value: number }) {
  const shown = useCountUp(value);
  return <>{formatNumber(shown, 0)}</>;
}
