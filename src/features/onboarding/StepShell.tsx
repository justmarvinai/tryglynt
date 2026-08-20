import * as React from "react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Screen } from "@/components/ui/screen";
import { TopBar } from "@/components/ui/top-bar";
import { cn } from "@/lib/cn";
import { t } from "@/lib/i18n";

/** Progress dots for the wizard. */
export function StepDots({ current, total }: { current: number; total: number }) {
  return (
    <div
      className="flex items-center justify-center gap-1.5"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={current + 1}
      aria-label={t.onboarding.stepOf
        .replace("{current}", String(current + 1))
        .replace("{total}", String(total))}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-1.5 rounded-full transition-all duration-300",
            i === current ? "w-5 bg-accent" : "w-1.5 bg-surface-2"
          )}
        />
      ))}
    </div>
  );
}

export interface StepShellProps {
  title: string;
  subtitle?: string;
  step: number;
  totalSteps: number;
  onBack?: () => void;
  /** Footer primary action. */
  nextLabel?: string;
  onNext?: () => void;
  nextDisabled?: boolean;
  /** Secondary ghost action under the primary (e.g. „Überspringen"). */
  secondaryLabel?: string;
  onSecondary?: () => void;
  children: React.ReactNode;
}

/** Shared scaffold for every onboarding step. */
export function StepShell({
  title,
  subtitle,
  step,
  totalSteps,
  onBack,
  nextLabel = t.common.next,
  onNext,
  nextDisabled,
  secondaryLabel,
  onSecondary,
  children,
}: StepShellProps) {
  return (
    <div className="flex min-h-dvh flex-col">
      <TopBar
        transparent
        leading={
          onBack && (
            <IconButton label={t.common.back} variant="ghost" onClick={onBack}>
              <ChevronLeft />
            </IconButton>
          )
        }
        title={<StepDots current={step} total={totalSteps} />}
      />
      <Screen className="flex-1 pt-2">
        <h1 className="text-title1">{title}</h1>
        {subtitle && <p className="mt-2 text-subhead text-muted">{subtitle}</p>}
        <div className="flex flex-1 flex-col pt-6">{children}</div>
        <div className="flex flex-col gap-2 pb-4 pt-8">
          {onNext && (
            <Button size="xl" full onClick={onNext} disabled={nextDisabled}>
              {nextLabel}
            </Button>
          )}
          {secondaryLabel && onSecondary && (
            <Button size="lg" variant="ghost" full onClick={onSecondary}>
              {secondaryLabel}
            </Button>
          )}
        </div>
      </Screen>
    </div>
  );
}
