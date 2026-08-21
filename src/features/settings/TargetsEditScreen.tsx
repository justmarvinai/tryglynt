import * as React from "react";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { IconButton } from "@/components/ui/icon-button";
import { Row, RowGroup } from "@/components/ui/list-row";
import { Screen } from "@/components/ui/screen";
import { Section } from "@/components/ui/section";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { TextField } from "@/components/ui/text-field";
import { TopBar } from "@/components/ui/top-bar";
import { useToast } from "@/components/ui/toast";
import { REFERENCE_SOURCE_NAMES } from "@/lib/engine/reference";
import { updateProfile, updateSettings, useProfile, useSettings } from "@/lib/db/repo/appRepo";
import { computeTargets } from "@/lib/engine/targets";
import type { ReferenceSourceId, SexBasis } from "@/lib/engine/types";
import { formatAmount, formatNumber, t } from "@/lib/i18n";

const num = (raw: string) => {
  if (raw.trim() === "") return undefined;
  const value = Number(raw.replace(",", "."));
  return Number.isFinite(value) && value > 0 ? value : undefined;
};

export function TargetsEditScreen() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const profile = useProfile();
  const settings = useSettings();

  const [energy, setEnergy] = React.useState("");
  const [protein, setProtein] = React.useState("");
  const [fat, setFat] = React.useState("");
  const [carbs, setCarbs] = React.useState("");
  const [water, setWater] = React.useState("");

  React.useEffect(() => {
    if (!settings) return;
    const show = (v?: number) => (v != null ? formatNumber(v, 0) : "");
    setEnergy(show(settings.energyTargetOverride));
    setProtein(show(settings.proteinTargetOverride));
    setFat(show(settings.fatTargetOverride));
    setCarbs(show(settings.carbsTargetOverride));
    setWater(show(settings.waterGoalMlOverride));
  }, [settings]);

  if (!profile || !settings) return null;
  const targets = computeTargets(profile, settings);

  const save = async () => {
    await updateSettings({
      energyTargetOverride: num(energy),
      proteinTargetOverride: num(protein),
      fatTargetOverride: num(fat),
      carbsTargetOverride: num(carbs),
      waterGoalMlOverride: num(water),
    });
    toast({ title: t.targetsEdit.saved, tone: "success" });
    navigate(-1);
  };

  const reset = async () => {
    setEnergy("");
    setProtein("");
    setFat("");
    setCarbs("");
    setWater("");
    await updateSettings({
      energyTargetOverride: undefined,
      proteinTargetOverride: undefined,
      fatTargetOverride: undefined,
      carbsTargetOverride: undefined,
      waterGoalMlOverride: undefined,
    });
    toast({ title: t.targetsEdit.saved, tone: "success" });
  };

  return (
    <>
      <TopBar
        title={t.targetsEdit.title}
        leading={
          <IconButton label={t.common.back} variant="ghost" onClick={() => navigate(-1)}>
            <ChevronLeft />
          </IconButton>
        }
      />
      <Screen className="gap-4 pt-2 pb-28">
        <Section title={t.targetsEdit.source}>
          <SegmentedControl
            full
            options={[
              { value: "efsa", label: REFERENCE_SOURCE_NAMES.efsa },
              { value: "nih", label: REFERENCE_SOURCE_NAMES.nih },
            ]}
            value={profile.referenceSource}
            onChange={(v) =>
              void updateProfile({ referenceSource: v as ReferenceSourceId })
            }
          />
          <p className="mt-2 px-1 text-footnote text-muted">{t.targetsEdit.sourceHint}</p>
        </Section>

        <Section title={t.targetsEdit.basis}>
          <SegmentedControl
            full
            options={[
              { value: "female", label: t.targetsEdit.basisFemale },
              { value: "male", label: t.targetsEdit.basisMale },
            ]}
            value={profile.calculationBasisOverride ?? profile.sexAtBirth}
            onChange={(v) =>
              void updateProfile({ calculationBasisOverride: v as SexBasis })
            }
          />
          <p className="mt-2 px-1 text-footnote text-muted">{t.targetsEdit.basisHint}</p>
        </Section>

        <Section title={t.targetsEdit.computed}>
          <RowGroup>
            <Row
              title={t.targetsEdit.bmr}
              value={formatAmount(targets.bmrKcal, "kcal", 0)}
              trailing="none"
            />
            <Row
              title={t.targetsEdit.tdee}
              value={formatAmount(targets.tdeeKcal, "kcal", 0)}
              trailing="none"
            />
          </RowGroup>
        </Section>

        <Section title={t.you.targets}>
          <p className="mb-3 px-1 text-footnote text-muted">
            {t.targetsEdit.overrideHint}
          </p>
          <div className="flex flex-col gap-3">
            <TextField
              label={t.targetsEdit.energyTarget}
              inputMode="numeric"
              placeholder={formatNumber(targets.energyKcal, 0)}
              value={energy}
              onChange={(e) => setEnergy(e.target.value)}
            />
            <div className="grid grid-cols-3 gap-3">
              <TextField
                label={t.targetsEdit.proteinTarget}
                inputMode="decimal"
                placeholder={formatNumber(targets.macros.proteinG, 0)}
                value={protein}
                onChange={(e) => setProtein(e.target.value)}
              />
              <TextField
                label={t.targetsEdit.carbsTarget}
                inputMode="decimal"
                placeholder={formatNumber(targets.macros.carbsG, 0)}
                value={carbs}
                onChange={(e) => setCarbs(e.target.value)}
              />
              <TextField
                label={t.targetsEdit.fatTarget}
                inputMode="decimal"
                placeholder={formatNumber(targets.macros.fatG, 0)}
                value={fat}
                onChange={(e) => setFat(e.target.value)}
              />
            </div>
            <TextField
              label={t.targetsEdit.waterTarget}
              inputMode="numeric"
              placeholder={formatNumber(targets.waterMl, 0)}
              value={water}
              onChange={(e) => setWater(e.target.value)}
            />
          </div>
        </Section>

        <Callout tone="info">{t.onboarding.revealDisclaimer}</Callout>

        <div className="flex flex-col gap-2">
          <Button size="lg" full onClick={() => void save()}>
            {t.common.save}
          </Button>
          <Button size="lg" full variant="ghost" onClick={() => void reset()}>
            {t.targetsEdit.reset}
          </Button>
        </div>
      </Screen>
    </>
  );
}
