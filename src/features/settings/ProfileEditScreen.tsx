import * as React from "react";
import { useNavigate } from "react-router";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { IconButton } from "@/components/ui/icon-button";
import { Screen } from "@/components/ui/screen";
import { Section } from "@/components/ui/section";
import { SelectField } from "@/components/ui/select-field";
import { Slider } from "@/components/ui/slider";
import { TextField } from "@/components/ui/text-field";
import { TopBar } from "@/components/ui/top-bar";
import { useToast } from "@/components/ui/toast";
import { ACTIVITY_LEVELS } from "@/config/activity";
import { APPROACHES, APPROACH_BY_ID } from "@/config/targets";
import { cmToFtIn, ftInToCm, kgToLb, lbToKg } from "@/config/units";
import { useProfile, useSettings, updateProfile } from "@/lib/db/repo/appRepo";
import { computeTargets } from "@/lib/engine/targets";
import type { ActivityLevelId, ApproachId } from "@/lib/engine/types";
import type { GenderIdentity } from "@/lib/db/models";
import { fmt, formatNumber, t } from "@/lib/i18n";

const GENDERS: Array<{ kind: GenderIdentity["kind"]; label: string }> = [
  { kind: "female", label: t.onboarding.genderFemale },
  { kind: "male", label: t.onboarding.genderMale },
  { kind: "nonbinary", label: t.onboarding.genderNonbinary },
  { kind: "diverse", label: t.onboarding.genderDiverse },
  { kind: "self", label: t.onboarding.genderSelf },
  { kind: "none", label: t.onboarding.genderNone },
];

const num = (raw: string) => {
  const value = Number(raw.replace(",", "."));
  return Number.isFinite(value) && value > 0 ? value : undefined;
};

export function ProfileEditScreen() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const profile = useProfile();
  const settings = useSettings();
  const imperial = settings?.units === "imperial";

  const [name, setName] = React.useState("");
  const [birthDate, setBirthDate] = React.useState("");
  const [height, setHeight] = React.useState("");
  const [weight, setWeight] = React.useState("");
  const [bodyFat, setBodyFat] = React.useState("");
  const [activity, setActivity] = React.useState<ActivityLevelId>("moderate");
  const [approach, setApproach] = React.useState<ApproachId>("nourish");
  const [modifier, setModifier] = React.useState(1);
  const [gender, setGender] = React.useState<GenderIdentity>({ kind: "none" });
  const [diff, setDiff] = React.useState<{ before: number; after: number } | null>(null);

  React.useEffect(() => {
    if (!profile) return;
    setName(profile.name);
    setBirthDate(profile.birthDate);
    setHeight(
      formatNumber(
        imperial ? cmToFtIn(profile.heightCm).ft * 12 + cmToFtIn(profile.heightCm).inch : profile.heightCm,
        imperial ? 0 : 0
      )
    );
    setWeight(formatNumber(imperial ? kgToLb(profile.weightKg) : profile.weightKg, 1));
    setBodyFat(profile.bodyFatPct != null ? formatNumber(profile.bodyFatPct, 1) : "");
    setActivity(profile.activityLevel);
    setApproach(profile.approach);
    setModifier(profile.approachModifier);
    setGender(profile.gender);
  }, [profile, imperial]);

  if (!profile || !settings) return null;

  const def = APPROACH_BY_ID[approach];
  const adjustable = def.minModifier !== def.maxModifier;

  const save = async () => {
    const heightValue = num(height);
    const weightValue = num(weight);
    if (!name.trim() || !heightValue || !weightValue) return;

    const heightCm = imperial
      ? ftInToCm(Math.floor(heightValue / 12), heightValue % 12)
      : heightValue;
    const weightKg = imperial ? lbToKg(weightValue) : weightValue;

    const before = computeTargets(profile, settings).energyKcal;
    const patch = {
      name: name.trim(),
      birthDate,
      heightCm,
      weightKg,
      bodyFatPct: num(bodyFat),
      activityLevel: activity,
      approach,
      approachModifier: modifier,
      gender,
    };
    await updateProfile(patch);
    const after = computeTargets({ ...profile, ...patch }, settings).energyKcal;
    toast({ title: t.profileEdit.saved, tone: "success" });
    if (after !== before) setDiff({ before, after });
    else navigate(-1);
  };

  return (
    <>
      <TopBar
        title={t.profileEdit.title}
        leading={
          <IconButton label={t.common.back} variant="ghost" onClick={() => navigate(-1)}>
            <ChevronLeft />
          </IconButton>
        }
      />
      <Screen className="gap-4 pt-2 pb-28">
        <TextField
          label={t.profileEdit.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={40}
        />
        <TextField
          label={t.profileEdit.birthDate}
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <div className="grid grid-cols-2 gap-3">
          <TextField
            label={imperial ? t.profileEdit.heightIn : t.profileEdit.heightCm}
            inputMode="decimal"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
          <TextField
            label={imperial ? t.profileEdit.weightLb : t.profileEdit.weightKg}
            inputMode="decimal"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </div>
        <TextField
          label={t.profileEdit.bodyFat}
          hint={t.profileEdit.bodyFatHint}
          inputMode="decimal"
          value={bodyFat}
          onChange={(e) => setBodyFat(e.target.value)}
        />

        <SelectField
          label={t.profileEdit.gender}
          value={gender.kind}
          onChange={(e) => {
            const kind = e.target.value as GenderIdentity["kind"];
            setGender(kind === "self" ? { kind: "self", label: "" } : { kind } as GenderIdentity);
          }}
        >
          {GENDERS.map((g) => (
            <option key={g.kind} value={g.kind}>
              {g.label}
            </option>
          ))}
        </SelectField>
        {gender.kind === "self" && (
          <TextField
            value={gender.label}
            placeholder={t.onboarding.genderSelfPlaceholder}
            onChange={(e) => setGender({ kind: "self", label: e.target.value })}
            maxLength={40}
          />
        )}

        <SelectField
          label={t.profileEdit.activity}
          value={activity}
          onChange={(e) => setActivity(e.target.value as ActivityLevelId)}
        >
          {ACTIVITY_LEVELS.map((level) => (
            <option key={level.id} value={level.id}>
              {level.name} — {level.description}
            </option>
          ))}
        </SelectField>

        <SelectField
          label={t.profileEdit.approach}
          value={approach}
          onChange={(e) => {
            const next = e.target.value as ApproachId;
            setApproach(next);
            setModifier(APPROACH_BY_ID[next].defaultModifier);
          }}
        >
          {APPROACHES.map((option) => (
            <option key={option.id} value={option.id}>
              {option.name} — {option.description}
            </option>
          ))}
        </SelectField>

        {adjustable && (
          <Section title={t.onboarding.approachIntensity}>
            <div className="rounded-card bg-surface p-5">
              <p className="text-title3 tabular-nums">
                {Math.round((modifier - 1) * 100) > 0 ? "+" : "−"}
                {formatNumber(Math.abs(Math.round((modifier - 1) * 100)), 0)} %
              </p>
              <Slider
                className="mt-3"
                min={Math.round(def.minModifier * 100)}
                max={Math.round(def.maxModifier * 100)}
                step={1}
                value={Math.round(modifier * 100)}
                onChange={(v) => setModifier(v / 100)}
                aria-label={t.onboarding.approachIntensity}
              />
            </div>
          </Section>
        )}

        {diff && (
          <Callout tone="success" title={t.profileEdit.targetsChanged}>
            {fmt(t.profileEdit.energyBefore, { value: formatNumber(diff.before, 0) })} ·{" "}
            {fmt(t.profileEdit.energyAfter, { value: formatNumber(diff.after, 0) })}
          </Callout>
        )}

        <Button size="lg" full className="mt-2" onClick={() => void save()}>
          {t.common.save}
        </Button>
      </Screen>
    </>
  );
}
