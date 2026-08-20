import { OptionItem, OptionList } from "@/components/ui/option-list";
import { Slider } from "@/components/ui/slider";
import { ACTIVITY_LEVELS } from "@/config/activity";
import { APPROACHES, APPROACH_BY_ID } from "@/config/targets";
import type { ActivityLevelId, ApproachId } from "@/lib/engine/types";
import { t, formatNumber } from "@/lib/i18n";
import { StepShell, type StepShellProps } from "./StepShell";

type ShellPass = Pick<StepShellProps, "step" | "totalSteps" | "onBack">;

export function ActivityStep({
  value,
  onChange,
  onNext,
  ...shell
}: {
  value?: ActivityLevelId;
  onChange: (v: ActivityLevelId) => void;
  onNext: () => void;
} & ShellPass) {
  return (
    <StepShell
      title={t.onboarding.activityTitle}
      subtitle={t.onboarding.activitySubtitle}
      {...shell}
      onNext={onNext}
      nextDisabled={!value}
    >
      <OptionList>
        {ACTIVITY_LEVELS.map((level) => (
          <OptionItem
            key={level.id}
            label={level.name}
            description={level.description}
            selected={value === level.id}
            onSelect={() => onChange(level.id)}
          />
        ))}
      </OptionList>
    </StepShell>
  );
}

/** Modifier as signed percent, e.g. 0.875 → „−12 %". */
function modifierLabel(modifier: number): string {
  const pct = Math.round((modifier - 1) * 100);
  if (pct === 0) return "±0 %";
  return `${pct > 0 ? "+" : "−"}${formatNumber(Math.abs(pct), 0)} %`;
}

export function ApproachStep({
  approach,
  modifier,
  onChange,
  onNext,
  ...shell
}: {
  approach: ApproachId;
  modifier: number;
  onChange: (approach: ApproachId, modifier: number) => void;
  onNext: () => void;
} & ShellPass) {
  const def = APPROACH_BY_ID[approach];
  const adjustable = def.minModifier !== def.maxModifier;

  return (
    <StepShell
      title={t.onboarding.approachTitle}
      subtitle={t.onboarding.approachSubtitle}
      {...shell}
      onNext={onNext}
    >
      <OptionList>
        {APPROACHES.map((option) => (
          <OptionItem
            key={option.id}
            label={option.name}
            description={option.description}
            selected={approach === option.id}
            onSelect={() => onChange(option.id, option.defaultModifier)}
          />
        ))}
      </OptionList>

      {adjustable && (
        <div className="mt-6 rounded-card bg-surface p-5">
          <div className="flex items-baseline justify-between">
            <span className="text-headline">{t.onboarding.approachIntensity}</span>
            <span className="text-title3 tabular-nums">{modifierLabel(modifier)}</span>
          </div>
          <Slider
            className="mt-3"
            min={Math.round(def.minModifier * 100)}
            max={Math.round(def.maxModifier * 100)}
            step={1}
            value={Math.round(modifier * 100)}
            onChange={(v) => onChange(approach, v / 100)}
            aria-label={t.onboarding.approachIntensity}
          />
        </div>
      )}
    </StepShell>
  );
}
