import * as React from "react";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/select-field";
import { Sheet } from "@/components/ui/sheet";
import { TextField } from "@/components/ui/text-field";
import { useToast } from "@/components/ui/toast";
import { suggestMealSlot } from "@/config/meals";
import { useSettings } from "@/lib/db/repo/appRepo";
import { addQuickEntry, deleteEntry } from "@/lib/db/repo/diaryRepo";
import type { NutrientVector } from "@/lib/engine/types";
import { t } from "@/lib/i18n";
import { useUiStore } from "@/stores/uiStore";

/** Parses a German decimal input ("12,5") — empty/invalid → undefined. */
function parseAmount(raw: string): number | undefined {
  const value = Number(raw.replace(",", "."));
  return Number.isFinite(value) && value >= 0 && raw.trim() !== "" ? value : undefined;
}

export function QuickAddSheet() {
  const { toast } = useToast();
  const open = useUiStore((s) => s.quickAddOpen);
  const closeQuickAdd = useUiStore((s) => s.closeQuickAdd);
  const activeDate = useUiStore((s) => s.activeDate);
  const settings = useSettings();
  const slots = settings?.mealSlots ?? [];

  const [name, setName] = React.useState("");
  const [kcal, setKcal] = React.useState("");
  const [protein, setProtein] = React.useState("");
  const [carbs, setCarbs] = React.useState("");
  const [fat, setFat] = React.useState("");
  const [mealId, setMealId] = React.useState("");

  React.useEffect(() => {
    if (open) {
      setName("");
      setKcal("");
      setProtein("");
      setCarbs("");
      setFat("");
      setMealId(suggestMealSlot(slots, new Date().getHours())?.id ?? slots[0]?.id ?? "");
    }
  }, [open, slots.length]); // eslint-disable-line react-hooks/exhaustive-deps

  const energy = parseAmount(kcal);
  const valid = energy != null;

  const submit = async () => {
    if (!valid) return;
    const snapshot: NutrientVector = { energy };
    const p = parseAmount(protein);
    const c = parseAmount(carbs);
    const f = parseAmount(fat);
    if (p != null) snapshot.protein = p;
    if (c != null) snapshot.carbs = c;
    if (f != null) snapshot.fat = f;
    const entry = await addQuickEntry({ date: activeDate, mealId, name, snapshot });
    toast({
      title: t.log.added,
      tone: "success",
      action: { label: t.common.undo, onPress: () => void deleteEntry(entry.id) },
    });
    closeQuickAdd();
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => (o ? undefined : closeQuickAdd())}
      title={t.log.quickAddTitle}
      description={t.log.quickAddHint}
      desktop="sheet"
      footer={
        <Button full size="lg" onClick={() => void submit()} disabled={!valid}>
          {t.common.add}
        </Button>
      }
    >
      <div className="flex flex-col gap-4 pb-2">
        <TextField
          label={t.log.kcalLabel}
          inputMode="decimal"
          value={kcal}
          onChange={(e) => setKcal(e.target.value)}
          autoFocus
        />
        <div className="grid grid-cols-3 gap-3">
          <TextField
            label={t.log.proteinLabel}
            inputMode="decimal"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
          />
          <TextField
            label={t.log.carbsLabel}
            inputMode="decimal"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
          />
          <TextField
            label={t.log.fatLabel}
            inputMode="decimal"
            value={fat}
            onChange={(e) => setFat(e.target.value)}
          />
        </div>
        <TextField
          label={t.log.quickAddName}
          placeholder={t.log.quickAddNamePlaceholder}
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={60}
        />
        <SelectField
          label={t.log.meal}
          value={mealId}
          onChange={(e) => setMealId(e.target.value)}
        >
          {slots.map((slot) => (
            <option key={slot.id} value={slot.id}>
              {slot.name}
            </option>
          ))}
        </SelectField>
      </div>
    </Sheet>
  );
}
