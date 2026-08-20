import * as React from "react";
import { useNavigate } from "react-router";
import { defaultSettings, completeOnboarding } from "@/lib/db/repo/appRepo";
import { computeTargets } from "@/lib/engine/targets";
import { BirthdayStep, BodyFatStep, HeightStep, WeightStep } from "./BodySteps";
import { GenderStep, NameStep, SexStep } from "./IdentitySteps";
import { ActivityStep, ApproachStep } from "./LifestyleSteps";
import { RevealStep } from "./RevealStep";
import { WelcomeStep } from "./WelcomeStep";
import { draftToProfile, initialDraft, type OnboardingDraft } from "./draft";

const STEPS = [
  "welcome",
  "name",
  "sex",
  "gender",
  "birthday",
  "height",
  "weight",
  "bodyfat",
  "activity",
  "approach",
  "reveal",
] as const;

type StepId = (typeof STEPS)[number];

/** Input steps counted for the progress dots (welcome & reveal excluded). */
const DOT_STEPS = STEPS.length - 2;

export function OnboardingFlow() {
  const navigate = useNavigate();
  const [draft, setDraft] = React.useState<OnboardingDraft>(initialDraft);
  const [stepIndex, setStepIndex] = React.useState(0);
  const [saving, setSaving] = React.useState(false);

  const step: StepId = STEPS[stepIndex];
  const patch = (p: Partial<OnboardingDraft>) => setDraft((d) => ({ ...d, ...p }));
  const next = () => setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  const back = () => setStepIndex((i) => Math.max(i - 1, 0));

  const shell = (dotIndex: number) => ({
    step: dotIndex,
    totalSteps: DOT_STEPS,
    onBack: back,
  });

  const finish = async () => {
    const profile = draftToProfile(draft);
    if (!profile || saving) return;
    setSaving(true);
    try {
      await completeOnboarding(profile, draft.units);
      navigate("/heute", { replace: true });
    } finally {
      setSaving(false);
    }
  };

  switch (step) {
    case "welcome":
      return <WelcomeStep onStart={next} />;
    case "name":
      return (
        <NameStep
          {...shell(0)}
          value={draft.name}
          onChange={(name) => patch({ name })}
          onNext={next}
        />
      );
    case "sex":
      return (
        <SexStep
          {...shell(1)}
          value={draft.sexAtBirth}
          onChange={(sexAtBirth) => patch({ sexAtBirth })}
          onNext={next}
        />
      );
    case "gender":
      return (
        <GenderStep
          {...shell(2)}
          value={draft.gender}
          onChange={(gender) => patch({ gender })}
          onNext={next}
        />
      );
    case "birthday":
      return (
        <BirthdayStep
          {...shell(3)}
          value={draft.birthDate}
          onChange={(birthDate) => patch({ birthDate })}
          onNext={() => {
            if (!draft.birthDate) patch({ birthDate: "2000-01-01" });
            next();
          }}
        />
      );
    case "height":
      return (
        <HeightStep
          {...shell(4)}
          valueCm={draft.heightCm}
          units={draft.units}
          onChange={(heightCm) => patch({ heightCm })}
          onUnitsChange={(units) => patch({ units })}
          onNext={next}
        />
      );
    case "weight":
      return (
        <WeightStep
          {...shell(5)}
          valueKg={draft.weightKg}
          units={draft.units}
          onChange={(weightKg) => patch({ weightKg })}
          onUnitsChange={(units) => patch({ units })}
          onNext={next}
        />
      );
    case "bodyfat":
      return (
        <BodyFatStep
          {...shell(6)}
          value={draft.bodyFatPct}
          onChange={(bodyFatPct) => patch({ bodyFatPct })}
          onNext={next}
          onSkip={() => {
            patch({ bodyFatPct: undefined });
            next();
          }}
        />
      );
    case "activity":
      return (
        <ActivityStep
          {...shell(7)}
          value={draft.activityLevel}
          onChange={(activityLevel) => patch({ activityLevel })}
          onNext={next}
        />
      );
    case "approach":
      return (
        <ApproachStep
          {...shell(8)}
          approach={draft.approach}
          modifier={draft.approachModifier}
          onChange={(approach, approachModifier) =>
            patch({ approach, approachModifier })
          }
          onNext={next}
        />
      );
    case "reveal": {
      const profile = draftToProfile(draft);
      if (!profile) {
        // A required answer is missing — jump back to the first gap.
        setStepIndex(1);
        return null;
      }
      const targets = computeTargets(
        { ...profile, id: "me", createdAt: 0, updatedAt: 0 },
        { ...defaultSettings(), units: draft.units }
      );
      return <RevealStep targets={targets} onFinish={finish} saving={saving} />;
    }
  }
}
