import * as React from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button";
import { Screen } from "@/components/ui/screen";
import { Section } from "@/components/ui/section";
import { TextField } from "@/components/ui/text-field";
import { TopBar } from "@/components/ui/top-bar";
import { useToast } from "@/components/ui/toast";
import { DEFAULT_GLASS_SIZE_ML } from "@/config/meals";
import { updateSettings, useSettings } from "@/lib/db/repo/appRepo";
import type { MealSlot } from "@/lib/db/models";
import { formatNumber, t } from "@/lib/i18n";

const hour = (raw: string, fallback: number) => {
  const value = Number(raw);
  return Number.isInteger(value) && value >= 0 && value <= 24 ? value : fallback;
};

export function MealsEditScreen() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const settings = useSettings();

  const [slots, setSlots] = React.useState<MealSlot[]>([]);
  const [glass, setGlass] = React.useState("");
  const [goal, setGoal] = React.useState("");

  React.useEffect(() => {
    if (!settings) return;
    setSlots(settings.mealSlots.map((s) => ({ ...s })));
    setGlass(String(settings.glassSizeMl));
    setGoal(settings.waterGoalMlOverride ? String(settings.waterGoalMlOverride) : "");
  }, [settings]);

  const save = async () => {
    const cleaned = slots
      .map((slot) => ({ ...slot, name: slot.name.trim() }))
      .filter((slot) => slot.name.length > 0);
    if (cleaned.length === 0) {
      toast({ title: t.mealsEdit.lastSlot, tone: "danger" });
      return;
    }
    const glassMl = Number(glass);
    await updateSettings({
      mealSlots: cleaned,
      glassSizeMl:
        Number.isFinite(glassMl) && glassMl >= 50 ? glassMl : DEFAULT_GLASS_SIZE_ML,
      waterGoalMlOverride: goal.trim() === "" ? undefined : Number(goal),
    });
    toast({ title: t.mealsEdit.saved, tone: "success" });
    navigate(-1);
  };

  return (
    <>
      <TopBar
        title={t.mealsEdit.title}
        leading={
          <IconButton label={t.common.back} variant="ghost" onClick={() => navigate(-1)}>
            <ChevronLeft />
          </IconButton>
        }
      />
      <Screen className="gap-4 pt-2 pb-28">
        <Section title={t.mealsEdit.slots}>
          <p className="mb-3 px-1 text-footnote text-muted">{t.mealsEdit.slotsHint}</p>
          <div className="flex flex-col gap-3">
            {slots.map((slot, i) => (
              <div key={slot.id} className="flex items-end gap-2">
                <TextField
                  label={i === 0 ? t.mealsEdit.slotName : undefined}
                  value={slot.name}
                  onChange={(e) =>
                    setSlots((prev) =>
                      prev.map((s, j) => (j === i ? { ...s, name: e.target.value } : s))
                    )
                  }
                  className="flex-1"
                  maxLength={24}
                />
                <TextField
                  label={i === 0 ? t.mealsEdit.from : undefined}
                  inputMode="numeric"
                  value={String(slot.fromHour)}
                  onChange={(e) =>
                    setSlots((prev) =>
                      prev.map((s, j) =>
                        j === i ? { ...s, fromHour: hour(e.target.value, s.fromHour) } : s
                      )
                    )
                  }
                  className="w-20"
                />
                <TextField
                  label={i === 0 ? t.mealsEdit.to : undefined}
                  inputMode="numeric"
                  value={String(slot.toHour)}
                  onChange={(e) =>
                    setSlots((prev) =>
                      prev.map((s, j) =>
                        j === i ? { ...s, toHour: hour(e.target.value, s.toHour) } : s
                      )
                    )
                  }
                  className="w-20"
                />
                <IconButton
                  label={t.common.delete}
                  variant="soft"
                  disabled={slots.length <= 1}
                  onClick={() => setSlots((prev) => prev.filter((_, j) => j !== i))}
                >
                  <Trash2 />
                </IconButton>
              </div>
            ))}
            <Button
              size="md"
              variant="soft"
              onClick={() =>
                setSlots((prev) => [
                  ...prev,
                  {
                    id: `slot-${Date.now()}`,
                    name: "",
                    fromHour: 0,
                    toHour: 24,
                  },
                ])
              }
            >
              <Plus /> {t.mealsEdit.addSlot}
            </Button>
          </div>
        </Section>

        <Section title={t.mealsEdit.water}>
          <div className="grid grid-cols-2 gap-3">
            <TextField
              label={t.mealsEdit.glassSize}
              inputMode="numeric"
              value={glass}
              onChange={(e) => setGlass(e.target.value)}
            />
            <TextField
              label={t.mealsEdit.waterGoal}
              inputMode="numeric"
              placeholder={formatNumber(settings?.waterGoalMlOverride ?? 0, 0) || "2000"}
              hint={t.mealsEdit.waterGoalHint}
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
            />
          </div>
        </Section>

        <Button size="lg" full className="mt-2" onClick={() => void save()}>
          {t.common.save}
        </Button>
      </Screen>
    </>
  );
}
