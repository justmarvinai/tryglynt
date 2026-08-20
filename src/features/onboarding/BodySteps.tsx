import { SegmentedControl } from "@/components/ui/segmented-control";
import { Slider } from "@/components/ui/slider";
import { WheelPicker, WheelPickerGroup } from "@/components/ui/wheel-picker";
import { APP } from "@/config/app";
import {
  cmToFtIn,
  ftInToCm,
  kgToLb,
  lbToKg,
  type UnitSystem,
} from "@/config/units";
import { t, formatNumber } from "@/lib/i18n";
import { StepShell, type StepShellProps } from "./StepShell";

type ShellPass = Pick<StepShellProps, "step" | "totalSteps" | "onBack">;

/* ------------------------------------------------------------------ */
/*  Birthday                                                           */
/* ------------------------------------------------------------------ */

const range = (from: number, to: number): number[] =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

function daysInMonth(year: number, month: number): number {
  return new Date(year, month, 0).getDate();
}

export function BirthdayStep({
  value,
  onChange,
  onNext,
  ...shell
}: {
  value?: string;
  onChange: (iso: string) => void;
  onNext: () => void;
} & ShellPass) {
  const maxYear = new Date().getFullYear() - APP.minAgeYears;
  const [y, m, d] = (value ?? "2000-01-01").split("-").map(Number);

  const set = (year: number, month: number, day: number) => {
    const clampedDay = Math.min(day, daysInMonth(year, month));
    onChange(
      `${year}-${String(month).padStart(2, "0")}-${String(clampedDay).padStart(2, "0")}`
    );
  };

  return (
    <StepShell
      title={t.onboarding.birthdayTitle}
      subtitle={t.onboarding.birthdaySubtitle}
      {...shell}
      onNext={onNext}
    >
      <div className="flex flex-1 items-center">
        <WheelPickerGroup className="w-full">
          <WheelPicker
            label={t.onboarding.day}
            className="w-16"
            options={range(1, daysInMonth(y, m)).map(String)}
            value={String(d)}
            onChange={(v) => set(y, m, Number(v))}
          />
          <WheelPicker
            label={t.onboarding.month}
            className="w-36"
            options={t.onboarding.months.map((name, i) => ({
              value: String(i + 1),
              label: name,
            }))}
            value={String(m)}
            onChange={(v) => set(y, Number(v), d)}
          />
          <WheelPicker
            label={t.onboarding.year}
            className="w-24"
            options={range(1926, maxYear).reverse().map(String)}
            value={String(y)}
            onChange={(v) => set(Number(v), m, d)}
          />
        </WheelPickerGroup>
      </div>
    </StepShell>
  );
}

/* ------------------------------------------------------------------ */
/*  Height                                                             */
/* ------------------------------------------------------------------ */

export function HeightStep({
  valueCm,
  units,
  onChange,
  onUnitsChange,
  onNext,
  ...shell
}: {
  valueCm: number;
  units: UnitSystem;
  onChange: (cm: number) => void;
  onUnitsChange: (u: UnitSystem) => void;
  onNext: () => void;
} & ShellPass) {
  const { ft, inch } = cmToFtIn(valueCm);

  return (
    <StepShell title={t.onboarding.heightTitle} {...shell} onNext={onNext}>
      <div className="flex justify-center">
        <SegmentedControl
          size="sm"
          options={[
            { value: "metric", label: "cm" },
            { value: "imperial", label: "ft / in" },
          ]}
          value={units}
          onChange={(v) => onUnitsChange(v as UnitSystem)}
        />
      </div>
      <div className="flex flex-1 items-center">
        {units === "metric" ? (
          <WheelPickerGroup className="w-full">
            <WheelPicker
              label={t.onboarding.heightTitle}
              className="w-24"
              options={range(120, 220).map(String)}
              value={String(Math.round(valueCm))}
              onChange={(v) => onChange(Number(v))}
            />
            <span>cm</span>
          </WheelPickerGroup>
        ) : (
          <WheelPickerGroup className="w-full">
            <WheelPicker
              label="Fuß"
              className="w-20"
              options={range(4, 7).map(String)}
              value={String(ft)}
              onChange={(v) => onChange(ftInToCm(Number(v), inch))}
            />
            <span>ft</span>
            <WheelPicker
              label="Zoll"
              className="w-20"
              options={range(0, 11).map(String)}
              value={String(inch)}
              onChange={(v) => onChange(ftInToCm(ft, Number(v)))}
            />
            <span>in</span>
          </WheelPickerGroup>
        )}
      </div>
    </StepShell>
  );
}

/* ------------------------------------------------------------------ */
/*  Weight                                                             */
/* ------------------------------------------------------------------ */

export function WeightStep({
  valueKg,
  units,
  onChange,
  onUnitsChange,
  onNext,
  ...shell
}: {
  valueKg: number;
  units: UnitSystem;
  onChange: (kg: number) => void;
  onUnitsChange: (u: UnitSystem) => void;
  onNext: () => void;
} & ShellPass) {
  const whole = Math.floor(valueKg);
  const decimal = Math.round((valueKg - whole) * 10);
  const lb = Math.round(kgToLb(valueKg));

  return (
    <StepShell
      title={t.onboarding.weightTitle}
      subtitle={t.onboarding.weightSubtitle}
      {...shell}
      onNext={onNext}
    >
      <div className="flex justify-center">
        <SegmentedControl
          size="sm"
          options={[
            { value: "metric", label: "kg" },
            { value: "imperial", label: "lb" },
          ]}
          value={units}
          onChange={(v) => onUnitsChange(v as UnitSystem)}
        />
      </div>
      <div className="flex flex-1 items-center">
        {units === "metric" ? (
          <WheelPickerGroup className="w-full">
            <WheelPicker
              label={t.onboarding.weightTitle}
              className="w-24"
              options={range(35, 250).map(String)}
              value={String(whole)}
              onChange={(v) => onChange(Number(v) + decimal / 10)}
            />
            <span>,</span>
            <WheelPicker
              label="Nachkommastelle"
              className="w-16"
              options={range(0, 9).map(String)}
              value={String(decimal)}
              onChange={(v) => onChange(whole + Number(v) / 10)}
            />
            <span>kg</span>
          </WheelPickerGroup>
        ) : (
          <WheelPickerGroup className="w-full">
            <WheelPicker
              label={t.onboarding.weightTitle}
              className="w-24"
              options={range(80, 550).map(String)}
              value={String(lb)}
              onChange={(v) => onChange(lbToKg(Number(v)))}
            />
            <span>lb</span>
          </WheelPickerGroup>
        )}
      </div>
    </StepShell>
  );
}

/* ------------------------------------------------------------------ */
/*  Body fat (optional)                                                */
/* ------------------------------------------------------------------ */

export function BodyFatStep({
  value,
  onChange,
  onNext,
  onSkip,
  ...shell
}: {
  value?: number;
  onChange: (pct: number) => void;
  onNext: () => void;
  onSkip: () => void;
} & ShellPass) {
  const current = value ?? 25;

  return (
    <StepShell
      title={t.onboarding.bodyFatTitle}
      subtitle={t.onboarding.bodyFatSubtitle}
      {...shell}
      onNext={onNext}
      nextDisabled={value == null}
      secondaryLabel={t.onboarding.bodyFatSkip}
      onSecondary={onSkip}
    >
      <div className="flex flex-1 flex-col justify-center gap-8">
        <div className="text-center">
          <span className="text-display">
            {value != null ? `${formatNumber(current, 0)}\u202f%` : "–"}
          </span>
        </div>
        <Slider
          min={5}
          max={60}
          step={1}
          value={current}
          onChange={onChange}
          aria-label={t.onboarding.bodyFatTitle}
        />
      </div>
    </StepShell>
  );
}
