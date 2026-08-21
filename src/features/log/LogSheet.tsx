import * as React from "react";
import { useNavigate } from "react-router";
import { Barcode, Globe, NotebookPen, Plus, Star, UtensilsCrossed, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Chip } from "@/components/ui/chip";
import { EmptyState } from "@/components/ui/empty-state";
import { SearchField } from "@/components/ui/search-field";
import { Spinner } from "@/components/ui/spinner";
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
import { BarcodeSheet } from "./BarcodeSheet";
import { FEATURES } from "@/config/app";
import { OffError, cacheOffFood, searchOff } from "@/lib/connectors/openFoodFacts";

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
  const [scanOpen, setScanOpen] = React.useState(false);
  const [offResults, setOffResults] = React.useState<Food[] | null>(null);
  const [offState, setOffState] = React.useState<
    "idle" | "loading" | "offline" | "error"
  >("idle");

  React.useEffect(() => {
    if (!open) {
      setQuery("");
      setTab("recent");
      setOffResults(null);
      setOffState("idle");
    }
  }, [open]);

  /** Online brand search — debounced, user-triggered by typing (D-008). */
  const runOffSearch = React.useCallback(async (term: string) => {
    setOffState("loading");
    try {
      setOffResults(await searchOff(term));
      setOffState("idle");
    } catch (error) {
      setOffResults(null);
      setOffState(
        error instanceof OffError && error.reason === "offline" ? "offline" : "error"
      );
    }
  }, []);

  React.useEffect(() => {
    if (!FEATURES.openFoodFacts || !open) return;
    const term = query.trim();
    if (term.length < 3) {
      setOffResults(null);
      setOffState("idle");
      return;
    }
    const timer = window.setTimeout(() => void runOffSearch(term), 550);
    return () => window.clearTimeout(timer);
  }, [query, open, runOffSearch]);

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

  /** Caching first means the portion sheet and diary work offline later. */
  const openOffFood = async (food: Food) => {
    const cached = await cacheOffFood(food);
    openPortion({ kind: "food", foodId: cached.id });
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
          {FEATURES.barcode && (
            <Button size="sm" variant="soft" onClick={() => setScanOpen(true)}>
              <Barcode /> {t.log.scan}
            </Button>
          )}
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

          {/* Open Food Facts: branded products, online only (D-008) */}
          {FEATURES.openFoodFacts && searching && (
            <div className="mt-2">
              <div className="mb-2 flex items-center gap-2 px-1">
                <Globe className="size-4 text-faint" />
                <p className="text-caption uppercase tracking-wide text-faint">
                  {t.log.offTab}
                </p>
                {offState === "loading" && <Spinner className="size-4" />}
              </div>

              {offState === "offline" && <Callout tone="info">{t.log.offOffline}</Callout>}
              {offState === "error" && <Callout tone="warning">{t.log.offError}</Callout>}

              {offResults && offResults.length > 0 && (
                <div className="flex flex-col gap-2.5">
                  {offResults.map((food) => (
                    <FoodResultRow
                      key={food.id}
                      name={food.name}
                      subtitle={`${food.brand ? `${food.brand} · ` : ""}${per100Subtitle(
                        food.per100.energy,
                        food.isLiquid
                      )}`}
                      onPress={() => void openOffFood(food)}
                    />
                  ))}
                  <p className="px-1 text-caption text-faint">{t.log.offHint}</p>
                </div>
              )}
              {offResults && offResults.length === 0 && offState === "idle" && (
                <p className="px-1 text-subhead text-muted">{t.log.offEmpty}</p>
              )}
            </div>
          )}
        </div>
      </div>

      <BarcodeSheet
        open={scanOpen}
        onOpenChange={setScanOpen}
        onFound={(food) => {
          closeLog();
          openPortion({ kind: "food", foodId: food.id });
        }}
      />
    </Sheet>
  );
}
