import { Callout } from "@/components/ui/callout";
import { OptionItem, OptionList } from "@/components/ui/option-list";
import { TextField } from "@/components/ui/text-field";
import type { GenderIdentity } from "@/lib/db/models";
import type { SexBasis } from "@/lib/engine/types";
import { t } from "@/lib/i18n";
import { StepShell, type StepShellProps } from "./StepShell";

type ShellPass = Pick<StepShellProps, "step" | "totalSteps" | "onBack">;

export function NameStep({
  value,
  onChange,
  onNext,
  ...shell
}: {
  value: string;
  onChange: (v: string) => void;
  onNext: () => void;
} & ShellPass) {
  return (
    <StepShell
      title={t.onboarding.nameTitle}
      {...shell}
      onNext={onNext}
      nextDisabled={value.trim().length === 0}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (value.trim()) onNext();
        }}
      >
        <TextField
          autoFocus
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={t.onboarding.namePlaceholder}
          hint={t.onboarding.nameHint}
          autoComplete="given-name"
          enterKeyHint="next"
          maxLength={40}
        />
      </form>
    </StepShell>
  );
}

export function SexStep({
  value,
  onChange,
  onNext,
  ...shell
}: {
  value?: SexBasis;
  onChange: (v: SexBasis) => void;
  onNext: () => void;
} & ShellPass) {
  return (
    <StepShell
      title={t.onboarding.sexTitle}
      {...shell}
      onNext={onNext}
      nextDisabled={!value}
    >
      <OptionList>
        <OptionItem
          label={t.onboarding.sexFemale}
          selected={value === "female"}
          onSelect={() => onChange("female")}
        />
        <OptionItem
          label={t.onboarding.sexMale}
          selected={value === "male"}
          onSelect={() => onChange("male")}
        />
      </OptionList>
      <Callout tone="info" title={t.onboarding.sexWhyTitle} className="mt-6">
        {t.onboarding.sexWhyBody}
      </Callout>
    </StepShell>
  );
}

const genderOptions: Array<{ kind: Exclude<GenderIdentity["kind"], "self">; label: string }> = [
  { kind: "female", label: t.onboarding.genderFemale },
  { kind: "male", label: t.onboarding.genderMale },
  { kind: "nonbinary", label: t.onboarding.genderNonbinary },
  { kind: "diverse", label: t.onboarding.genderDiverse },
  { kind: "none", label: t.onboarding.genderNone },
];

export function GenderStep({
  value,
  onChange,
  onNext,
  ...shell
}: {
  value: GenderIdentity;
  onChange: (v: GenderIdentity) => void;
  onNext: () => void;
} & ShellPass) {
  return (
    <StepShell
      title={t.onboarding.genderTitle}
      subtitle={t.onboarding.genderSubtitle}
      {...shell}
      onNext={onNext}
    >
      <OptionList>
        {genderOptions.map((option) => (
          <OptionItem
            key={option.kind}
            label={option.label}
            selected={value.kind === option.kind}
            onSelect={() => onChange({ kind: option.kind })}
          />
        ))}
        <OptionItem
          label={t.onboarding.genderSelf}
          selected={value.kind === "self"}
          onSelect={() => onChange({ kind: "self", label: "" })}
        />
      </OptionList>
      {value.kind === "self" && (
        <TextField
          autoFocus
          className="mt-4"
          value={value.label}
          onChange={(e) => onChange({ kind: "self", label: e.target.value })}
          placeholder={t.onboarding.genderSelfPlaceholder}
          maxLength={40}
        />
      )}
    </StepShell>
  );
}
