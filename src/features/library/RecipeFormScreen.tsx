import * as React from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Dialog } from "@/components/ui/dialog";
import { Disclosure } from "@/components/ui/accordion";
import { IconButton } from "@/components/ui/icon-button";
import { Screen } from "@/components/ui/screen";
import { Section } from "@/components/ui/section";
import { Stepper } from "@/components/ui/stepper";
import { TextField } from "@/components/ui/text-field";
import { TopBar } from "@/components/ui/top-bar";
import { useToast } from "@/components/ui/toast";
import { NutrientTable } from "@/components/glynt/NutrientTable";
import type { Food, RecipeIngredient } from "@/lib/db/models";
import {
  computeRecipeNutrition,
  deleteRecipe,
  saveRecipe,
  useAllFoods,
  useRecipe,
  type RecipeNutrition,
} from "@/lib/db/repo/foodRepo";
import { fmt, formatAmount, formatNumber, t } from "@/lib/i18n";
import { FoodPickerSheet } from "./FoodPickerSheet";

export function RecipeFormScreen() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const editing = id !== "neu" ? id : undefined;
  const existing = useRecipe(editing);
  const foods = useAllFoods();

  const [name, setName] = React.useState("");
  const [servings, setServings] = React.useState(2);
  const [ingredients, setIngredients] = React.useState<RecipeIngredient[]>([]);
  const [pickerOpen, setPickerOpen] = React.useState(false);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [nutrition, setNutrition] = React.useState<RecipeNutrition | null>(null);

  React.useEffect(() => {
    if (!existing) return;
    setName(existing.name);
    setServings(existing.servings);
    setIngredients(existing.ingredients);
  }, [existing]);

  React.useEffect(() => {
    let cancelled = false;
    void computeRecipeNutrition(ingredients, servings).then((n) => {
      if (!cancelled) setNutrition(n);
    });
    return () => {
      cancelled = true;
    };
  }, [ingredients, servings]);

  const foodName = (foodId: string) =>
    foods?.find((f) => f.id === foodId)?.name ?? "—";

  const addIngredient = (food: Food) => {
    setIngredients((prev) => [...prev, { foodId: food.id, grams: 100 }]);
    setPickerOpen(false);
  };

  const save = async () => {
    if (!name.trim()) {
      setError(t.recipeForm.nameRequired);
      return;
    }
    if (ingredients.length === 0) {
      setError(t.recipeForm.ingredientsRequired);
      return;
    }
    await saveRecipe({ name: name.trim(), servings, ingredients }, editing);
    toast({ title: t.recipeForm.saved, tone: "success" });
    navigate(-1);
  };

  const remove = async () => {
    if (!editing) return;
    await deleteRecipe(editing);
    toast({ title: t.recipeForm.deleted });
    navigate("/bibliothek");
  };

  return (
    <>
      <TopBar
        title={editing ? t.recipeForm.editTitle : t.recipeForm.createTitle}
        leading={
          <IconButton label={t.common.back} variant="ghost" onClick={() => navigate(-1)}>
            <ChevronLeft />
          </IconButton>
        }
      />
      <Screen className="gap-4 pt-2 pb-28">
        <TextField
          label={t.recipeForm.name}
          placeholder={t.recipeForm.namePlaceholder}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(null);
          }}
          maxLength={80}
        />

        <div className="flex items-center justify-between gap-3">
          <span className="text-headline">{t.recipeForm.servings}</span>
          <Stepper min={1} max={20} step={1} value={servings} onChange={setServings} />
        </div>

        <Section title={t.recipeForm.ingredients}>
          <div className="flex flex-col gap-2.5">
            {ingredients.length === 0 && (
              <p className="px-1 text-subhead text-muted">{t.recipeForm.noIngredients}</p>
            )}
            {ingredients.map((ing, i) => (
              <div
                key={`${ing.foodId}-${i}`}
                className="flex items-center gap-3 rounded-row bg-surface py-2 pl-4 pr-2"
              >
                <span className="min-w-0 flex-1 truncate text-[1.0625rem] font-semibold">
                  {foodName(ing.foodId)}
                </span>
                <TextField
                  aria-label={fmt(t.recipeForm.gramsFor, { name: foodName(ing.foodId) })}
                  inputMode="decimal"
                  value={String(ing.grams || "")}
                  onChange={(e) => {
                    const v = Number(e.target.value.replace(",", "."));
                    setIngredients((prev) =>
                      prev.map((p, j) =>
                        j === i ? { ...p, grams: Number.isFinite(v) && v > 0 ? v : 0 } : p
                      )
                    );
                  }}
                  trailing="g"
                  className="w-28"
                />
                <IconButton
                  label={t.common.delete}
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    setIngredients((prev) => prev.filter((_, j) => j !== i))
                  }
                >
                  <Trash2 />
                </IconButton>
              </div>
            ))}
            <Button size="md" variant="soft" onClick={() => setPickerOpen(true)}>
              <Plus /> {t.recipeForm.addIngredient}
            </Button>
          </div>
        </Section>

        {nutrition && ingredients.length > 0 && (
          <Disclosure
            title={t.recipeForm.perServing}
            meta={`${formatAmount(nutrition.perServing.energy ?? 0, "kcal", 0)} · ${formatNumber(nutrition.gramsPerServing, 0)} g`}
            defaultOpen
          >
            <div className="px-2 pb-3">
              <NutrientTable vector={nutrition.perServing} />
            </div>
          </Disclosure>
        )}

        {error && <Callout tone="danger">{error}</Callout>}

        <div className="mt-2 flex flex-col gap-2">
          <Button size="lg" full onClick={() => void save()}>
            {t.common.save}
          </Button>
          {editing && (
            <Button
              size="lg"
              full
              variant="danger-soft"
              onClick={() => setConfirmDelete(true)}
            >
              <Trash2 /> {t.common.delete}
            </Button>
          )}
        </div>
      </Screen>

      <FoodPickerSheet
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onPick={addIngredient}
        title={t.recipeForm.searchTitle}
      />

      <Dialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title={t.recipeForm.deleteTitle}
        description={t.recipeForm.deleteBody}
        actions={
          <>
            <Button variant="danger" full onClick={() => void remove()}>
              {t.common.delete}
            </Button>
            <Button variant="ghost" full onClick={() => setConfirmDelete(false)}>
              {t.common.cancel}
            </Button>
          </>
        }
      />
    </>
  );
}
