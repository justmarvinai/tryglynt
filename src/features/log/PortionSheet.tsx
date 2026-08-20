import * as React from "react";
import { Star, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Disclosure } from "@/components/ui/accordion";
import { IconButton } from "@/components/ui/icon-button";
import { SelectField } from "@/components/ui/select-field";
import { Sheet } from "@/components/ui/sheet";
import { Stepper } from "@/components/ui/stepper";
import { useToast } from "@/components/ui/toast";
import { NutrientTable } from "@/components/glynt/NutrientTable";
import { suggestMealSlot } from "@/config/meals";
import { useSettings } from "@/lib/db/repo/appRepo";
import {
  addFoodEntry,
  addRecipeEntry,
  deleteEntry,
  restoreEntry,
  updateFoodEntry,
} from "@/lib/db/repo/diaryRepo";
import { computeRecipeNutrition, useFood, useRecipe } from "@/lib/db/repo/foodRepo";
import { toggleFavorite, useFavorites } from "@/lib/db/repo/trackingRepo";
import { scaleVector } from "@/lib/engine/aggregate";
import type { NutrientVector } from "@/lib/engine/types";
import { resolveGrams, unitOptionsFor } from "@/lib/food/portions";
import { fmt, formatAmount, formatNumber, t } from "@/lib/i18n";
import { useUiStore } from "@/stores/uiStore";

function MacroPreview({ vector }: { vector: NutrientVector }) {
  const items = [
    { label: "kcal", value: vector.energy ?? 0, decimals: 0 as const },
    { label: "Protein", value: vector.protein, decimals: 1 as const },
    { label: "Kohlenh.", value: vector.carbs, decimals: 1 as const },
    { label: "Fett", value: vector.fat, decimals: 1 as const },
  ];
  return (
    <div className="grid grid-cols-4 gap-2">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex flex-col items-center rounded-row bg-surface px-1 py-2.5"
        >
          <span className="text-headline tabular-nums">
            {item.value != null ? formatNumber(item.value, item.decimals) : "–"}
          </span>
          <span className="mt-0.5 text-caption text-muted">{item.label}</span>
        </div>
      ))}
    </div>
  );
}

export function PortionSheet() {
  const { toast } = useToast();
  const target = useUiStore((s) => s.portionTarget);
  const editingEntry = useUiStore((s) => s.editingEntry);
  const closePortion = useUiStore((s) => s.closePortion);
  const activeDate = useUiStore((s) => s.activeDate);

  const settings = useSettings();
  const favorites = useFavorites();
  const food = useFood(target?.kind === "food" ? target.foodId : undefined);
  const recipe = useRecipe(target?.kind === "recipe" ? target.recipeId : undefined);

  const open = target != null || editingEntry != null;

  // ---------------------------------------------------------------- state
  const [amount, setAmount] = React.useState(1);
  const [unit, setUnit] = React.useState<string>("g");
  const [mealId, setMealId] = React.useState<string>("");
  const [recipeNutrition, setRecipeNutrition] = React.useState<NutrientVector>({});

  const slots = React.useMemo(() => settings?.mealSlots ?? [], [settings]);

  // Initialize when the sheet opens / target changes.
  React.useEffect(() => {
    if (!open) return;
    if (editingEntry) {
      setAmount(editingEntry.amount);
      setUnit(editingEntry.unit);
      setMealId(editingEntry.mealId);
      return;
    }
    if (food) {
      const first = unitOptionsFor(food)[0];
      setAmount(first.defaultAmount);
      setUnit(first.unit);
    } else if (recipe) {
      setAmount(1);
      setUnit("portion:Portion");
    }
    const hinted = useUiStore.getState().logMealId;
    setMealId(
      hinted && slots.some((s) => s.id === hinted)
        ? hinted
        : (suggestMealSlot(slots, new Date().getHours())?.id ?? slots[0]?.id ?? "")
    );
  }, [open, editingEntry, food?.id, recipe?.id, slots.length]); // eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    let cancelled = false;
    if (recipe) {
      void computeRecipeNutrition(recipe.ingredients, recipe.servings).then((n) => {
        if (!cancelled) setRecipeNutrition(n.perServing);
      });
    }
    return () => {
      cancelled = true;
    };
  }, [recipe]);

  // ------------------------------------------------------------- derived
  const grams = food ? resolveGrams(food, amount, unit) : 0;
  const preview: NutrientVector = food
    ? scaleVector(food.per100, grams)
    : recipe
      ? Object.fromEntries(
          Object.entries(recipeNutrition).map(([k, v]) => [k, (v ?? 0) * amount])
        )
      : {};

  const foodRef = food ? `food:${food.id}` : recipe ? `recipe:${recipe.id}` : "";
  const isFavorite = (favorites ?? []).some((f) => f.foodRef === foodRef);

  const unitOptions = food ? unitOptionsFor(food) : [];
  const currentUnit = unitOptions.find((u) => u.unit === unit);
  const mealName = (id: string) => slots.find((s) => s.id === id)?.name ?? id;
  const title = food?.name ?? recipe?.name ?? "";
  const thinData = food != null && food.dataQuality !== "full";

  // -------------------------------------------------------------- actions
  const close = () => closePortion();

  const submit = async () => {
    if (food) {
      if (editingEntry) {
        await updateFoodEntry(editingEntry, { food, amount, unit, grams, mealId });
        toast({ title: t.log.entryUpdated, tone: "success" });
      } else {
        const entry = await addFoodEntry({
          food,
          date: activeDate,
          mealId,
          amount,
          unit,
          grams,
        });
        toast({
          title: t.log.added,
          description: fmt(t.log.addedTo, { name: food.name, meal: mealName(mealId) }),
          tone: "success",
          action: { label: t.common.undo, onPress: () => void deleteEntry(entry.id) },
        });
      }
    } else if (recipe) {
      const entry = await addRecipeEntry({
        recipe,
        date: activeDate,
        mealId,
        servings: amount,
      });
      toast({
        title: t.log.added,
        description: fmt(t.log.addedTo, { name: recipe.name, meal: mealName(mealId) }),
        tone: "success",
        action: { label: t.common.undo, onPress: () => void deleteEntry(entry.id) },
      });
    }
    close();
  };

  const removeEntry = async () => {
    if (!editingEntry) return;
    const removed = await deleteEntry(editingEntry.id);
    if (removed) {
      toast({
        title: t.log.entryDeleted,
        action: { label: t.common.undo, onPress: () => void restoreEntry(removed) },
      });
    }
    close();
  };

  const onToggleFavorite = async () => {
    if (!foodRef) return;
    const added = await toggleFavorite(foodRef);
    toast({ title: added ? t.log.favoriteAdded : t.log.favoriteRemoved });
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => (o ? undefined : close())}
      title={title}
      desktop="sheet"
      footer={
        <div className="flex flex-col gap-2">
          <Button full size="lg" onClick={() => void submit()} disabled={!food && !recipe}>
            {editingEntry ? t.common.save : t.common.add}
          </Button>
          {editingEntry && (
            <Button full size="lg" variant="danger-soft" onClick={() => void removeEntry()}>
              <Trash2 /> {t.common.delete}
            </Button>
          )}
        </div>
      }
    >
      <div className="flex flex-col gap-4 pb-2">
        <div className="flex items-center justify-between gap-3">
          <MacroPreview vector={preview} />
          <IconButton
            label={isFavorite ? t.log.favoriteRemoved : t.log.favoriteAdded}
            variant={isFavorite ? "soft" : "ghost"}
            onClick={() => void onToggleFavorite()}
            className={isFavorite ? "text-warning" : undefined}
          >
            <Star fill={isFavorite ? "currentColor" : "none"} />
          </IconButton>
        </div>

        {thinData && <Callout tone="warning">{t.log.dataThin}</Callout>}

        <div className="flex items-center justify-between gap-3">
          <span className="text-headline">{recipe ? t.log.servings : t.log.amount}</span>
          <Stepper
            min={currentUnit?.step ?? 0.5}
            max={recipe ? 20 : 5000}
            step={currentUnit?.step ?? (recipe ? 0.5 : 5)}
            value={amount}
            onChange={setAmount}
            format={(v) => formatNumber(v, 1)}
          />
        </div>

        {food && (
          <SelectField
            label={t.log.unit}
            value={unit}
            onChange={(e) => {
              const next = unitOptions.find((u) => u.unit === e.target.value);
              setUnit(e.target.value);
              if (next) setAmount(next.defaultAmount);
            }}
          >
            {unitOptions.map((u) => (
              <option key={u.unit} value={u.unit}>
                {u.label}
              </option>
            ))}
          </SelectField>
        )}

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

        {food && (
          <p className="text-footnote text-muted">
            {formatAmount(grams, food.isLiquid ? "ml" : "g", 0)}
          </p>
        )}

        <Disclosure title={t.log.moreNutrients}>
          <div className="px-2 pb-3">
            <NutrientTable vector={preview} />
          </div>
        </Disclosure>
      </div>
    </Sheet>
  );
}
