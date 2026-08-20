import * as React from "react";
import { useNavigate } from "react-router";
import { NotebookPen, Plus, Star, UtensilsCrossed, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchField } from "@/components/ui/search-field";
import { Sheet } from "@/components/ui/sheet";
import { useToast } from "@/components/ui/toast";
import type { Food, Recipe } from "@/lib/db/models";
import { useAllFoods, useAllRecipes } from "@/lib/db/repo/foodRepo";
import { useFavorites, useRecents } from "@/lib/db/repo/trackingRepo";
import { addFoodEntry, addRecipeEntry, deleteEntry } from "@/lib/db/repo/diaryRepo";
import { useSettings } from "@/lib/db/repo/appRepo";
import { defaultUnitFor } from "@/lib/food/portions";
import { searchFoods, searchRecipes } from "@/lib/food/search";
import { suggestMealSlot } from "@/config/meals";
import { fmt, t } from "@/lib/i18n";
import { useUiStore } from "@/stores/uiStore";
import { FoodResultRow, per100Subtitle } from "./FoodResultRow";

type Tab = "recent" | "favorites" | "mine" | "recipes";

const TABS: Array<{ id: Tab; label: string }> = [
  { id: "recent", label: t.log.tabRecent },
  { id: "favorites", label: t.log.tabFavorites },
  { id: "mine", label: t.log.tabMine },
  { id: "recipes", label: t.log.tabRecipes },
];

export function LogSheet() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const open = useUiStore((s) => s.logOpen);
  const mealIdHint = useUiStore((s) => s.logMealId);
  const closeLog = useUiStore((s) => s.closeLog);
  const openPortion = useUiStore((s) => s.openPortion);
  const openQuickAdd = useUiStore((s) => s.openQuickAdd);
  const activeDate = useUiStore((s) => s.activeDate);

  const foods = useAllFoods();
  const recipes = useAllRecipes();
  const favorites = useFavorites();
  const recents = useRecents();
  const settings = useSettings();

  const [query, setQuery] = React.useState("");
  const [tab, setTab] = React.useState<Tab>("recent");

  React.useEffect(() => {
    if (!open) {
      setQuery("");
      setTab("recent");
    }
  }, [open]);

  const foodById = React.useMemo(() => {
    const map = new Map<string, Food>();
    for (const f of foods ?? []) map.set(f.id, f);
    return map;
  }, [foods]);
  const recipeById = React.useMemo(() => {
    const map = new Map<string, Recipe>();
    for (const r of recipes ?? []) map.set(r.id, r);
    return map;
  }, [recipes]);

  const searching = query.trim().length > 0;

  const results = React.useMemo(() => {
    if (!searching) return { foods: [] as Food[], recipes: [] as Recipe[] };
    return {
      foods: searchFoods(foods ?? [], query, 60),
      recipes: searchRecipes(recipes ?? [], query, 10),
    };
  }, [searching, query, foods, recipes]);

  const suggestedMeal = () => {
    const slots = settings?.mealSlots ?? [];
    if (mealIdHint && slots.some((s) => s.id === mealIdHint)) return mealIdHint;
    return suggestMealSlot(slots, new Date().getHours())?.id ?? slots[0]?.id ?? "snacks";
  };

  const mealName = (id: string) =>
    settings?.mealSlots.find((s) => s.id === id)?.name ?? id;

  /** Instant add at the default portion, with Undo. */
  const quickAddFood = async (food: Food) => {
    const unit = defaultUnitFor(food);
    const mealId = suggestedMeal();
    const entry = await addFoodEntry({
      food,
      date: activeDate,
      mealId,
      amount: unit.defaultAmount,
      unit: unit.unit,
      grams: unit.defaultAmount * unit.gramsPerUnit,
    });
    toast({
      title: t.log.added,
      description: fmt(t.log.addedTo, { name: food.name, meal: mealName(mealId) }),
      tone: "success",
      action: {
        label: t.common.undo,
        onPress: () => void deleteEntry(entry.id),
      },
    });
  };

  const quickAddRecipe = async (recipe: Recipe) => {
    const mealId = suggestedMeal();
    const entry = await addRecipeEntry({
      recipe,
      date: activeDate,
      mealId,
      servings: 1,
    });
    toast({
      title: t.log.added,
      description: fmt(t.log.addedTo, { name: recipe.name, meal: mealName(mealId) }),
      tone: "success",
      action: { label: t.common.undo, onPress: () => void deleteEntry(entry.id) },
    });
  };

  const favoriteItems = React.useMemo(() => {
    return (favorites ?? [])
      .slice()
      .sort((a, b) => b.addedAt - a.addedAt)
      .map((f) => f.foodRef);
  }, [favorites]);

  const recentItems = React.useMemo(
    () => (recents ?? []).map((r) => r.foodRef),
    [recents]
  );

  const renderRef = (ref: string) => {
    const [kind, id] = ref.split(":");
    if (kind === "food") {
      const food = foodById.get(id);
      if (!food) return null;
      return (
        <FoodResultRow
          key={ref}
          name={food.name}
          subtitle={per100Subtitle(food.per100.energy, food.isLiquid)}
          onPress={() => openPortion({ kind: "food", foodId: food.id })}
          onQuickAdd={() => void quickAddFood(food)}
        />
      );
    }
    const recipe = recipeById.get(id);
    if (!recipe) return null;
    return (
      <FoodResultRow
        key={ref}
        name={recipe.name}
        subtitle={t.log.tabRecipes}
        onPress={() => openPortion({ kind: "recipe", recipeId: recipe.id })}
        onQuickAdd={() => void quickAddRecipe(recipe)}
      />
    );
  };

  const mineFoods = (foods ?? []).filter((f) => f.source === "user");

  const emptyState = (icon: React.ReactNode, title: string, body: string, action?: React.ReactNode) => (
    <EmptyState icon={icon} title={title} description={body} action={action} className="py-10" />
  );

  const tabContent: Record<Tab, React.ReactNode> = {
    recent:
      recentItems.length === 0
        ? emptyState(<NotebookPen />, t.log.noRecentsTitle, t.log.noRecentsBody)
        : recentItems.map(renderRef),
    favorites:
      favoriteItems.length === 0
        ? emptyState(<Star />, t.log.noFavoritesTitle, t.log.noFavoritesBody)
        : favoriteItems.map(renderRef),
    mine:
      mineFoods.length === 0
        ? emptyState(
            <UtensilsCrossed />,
            t.log.noMineTitle,
            t.log.noMineBody,
            <Button
              size="md"
              onClick={() => {
                closeLog();
                navigate("/bibliothek/lebensmittel/neu");
              }}
            >
              {t.log.createFood}
            </Button>
          )
        : mineFoods.map((f) => renderRef(`food:${f.id}`)),
    recipes:
      (recipes ?? []).length === 0
        ? emptyState(
            <UtensilsCrossed />,
            t.log.noRecipesTitle,
            t.log.noRecipesBody,
            <Button
              size="md"
              onClick={() => {
                closeLog();
                navigate("/bibliothek/rezept/neu");
              }}
            >
              {t.log.createRecipe}
            </Button>
          )
        : (recipes ?? []).map((r) => renderRef(`recipe:${r.id}`)),
  };

  return (
    <Sheet
      open={open}
      onOpenChange={(o) => (o ? undefined : closeLog())}
      title={t.log.title}
      desktop="sheet"
      className="min-h-[85dvh]"
    >
      <div className="flex flex-col gap-4 pb-4">
        <SearchField
          autoFocus
          value={query}
          onChange={setQuery}
          placeholder={t.log.searchPlaceholder}
        />

        <div className="flex items-center gap-2">
          <Button size="sm" variant="soft" onClick={openQuickAdd}>
            <Zap /> {t.log.quickAdd}
          </Button>
          <Button
            size="sm"
            variant="soft"
            onClick={() => {
              closeLog();
              navigate("/bibliothek/lebensmittel/neu");
            }}
          >
            <Plus /> {t.log.createFood}
          </Button>
        </div>

        {!searching && (
          <div className="scrollbar-none -mx-1 flex gap-2 overflow-x-auto px-1">
            {TABS.map((item) => (
              <Chip
                key={item.id}
                selected={tab === item.id}
                onClick={() => setTab(item.id)}
              >
                {item.label}
              </Chip>
            ))}
          </div>
        )}

        <div className="flex flex-col gap-2.5">
          {searching ? (
            results.foods.length + results.recipes.length === 0 ? (
              emptyState(
                <UtensilsCrossed />,
                t.log.noResultsTitle,
                t.log.noResultsBody,
                <Button
                  size="md"
                  onClick={() => {
                    closeLog();
                    navigate("/bibliothek/lebensmittel/neu");
                  }}
                >
                  {t.log.createFood}
                </Button>
              )
            ) : (
              <>
                {results.recipes.map((r) => renderRef(`recipe:${r.id}`))}
                {results.foods.map((f) => renderRef(`food:${f.id}`))}
              </>
            )
          ) : (
            tabContent[tab]
          )}
        </div>
      </div>
    </Sheet>
  );
}
