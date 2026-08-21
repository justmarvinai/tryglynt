import * as React from "react";
import { Button } from "@/components/ui/button";
import { Sheet } from "@/components/ui/sheet";
import { TextField } from "@/components/ui/text-field";
import { useToast } from "@/components/ui/toast";
import { kgToLb, lbToKg } from "@/config/units";
import { useProfile, useSettings } from "@/lib/db/repo/appRepo";
import { logWeight } from "@/lib/db/repo/trackingRepo";
import { todayISO } from "@/lib/dates";
import { formatNumber, t } from "@/lib/i18n";

/** Log today's weight (+ optional body fat). Updates the profile too. */
export function WeightSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const { toast } = useToast();
  const profile = useProfile();
  const settings = useSettings();
  const imperial = settings?.units === "imperial";

  const [weight, setWeight] = React.useState("");
  const [bodyFat, setBodyFat] = React.useState("");
  const [date, setDate] = React.useState(todayISO());

  React.useEffect(() => {
    if (!open || !profile) return;
    const value = imperial ? kgToLb(profile.weightKg) : profile.weightKg;
    setWeight(formatNumber(value, 1));
    setBodyFat(profile.bodyFatPct != null ? formatNumber(profile.bodyFatPct, 1) : "");
    setDate(todayISO());
  }, [open, profile, imperial]);

  const parse = (raw: string) => {
    const value = Number(raw.replace(",", "."));
    return Number.isFinite(value) && value > 0 ? value : undefined;
  };

  const parsedWeight = parse(weight);
  const valid = parsedWeight != null;

  const submit = async () => {
    if (!parsedWeight) return;
    await logWeight({
      date,
      weightKg: imperial ? lbToKg(parsedWeight) : parsedWeight,
      bodyFatPct: parse(bodyFat),
    });
    toast({ title: t.weight.saved, tone: "success" });
    onOpenChange(false);
  };

  return (
    <Sheet
      open={open}
      onOpenChange={onOpenChange}
      title={t.weight.title}
      description={t.weight.hint}
      desktop="sheet"
      footer={
        <Button full size="lg" onClick={() => void submit()} disabled={!valid}>
          {t.weight.save}
        </Button>
      }
    >
      <div className="flex flex-col gap-4 pb-2">
        <TextField
          label={`${t.weight.current} (${imperial ? "lb" : "kg"})`}
          inputMode="decimal"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          autoFocus
        />
        <TextField
          label={`${t.weight.bodyFat} (%)`}
          inputMode="decimal"
          value={bodyFat}
          onChange={(e) => setBodyFat(e.target.value)}
        />
        <TextField
          label={t.weight.date}
          type="date"
          value={date}
          max={todayISO()}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
    </Sheet>
  );
}
