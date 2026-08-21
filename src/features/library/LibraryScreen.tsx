import * as React from "react";
import { useNavigate } from "react-router";
import { LibraryBig, Pencil, Pill, Plus, Star, UtensilsCrossed } from "lucide-react";
import { BottomNavSpacer } from "@/components/ui/bottom-nav";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { EmptyState } from "@/components/ui/empty-state";
import { IconButton } from "@/components/ui/icon-button";
import { Row, RowGroup } from "@/components/ui/list-row";
import { Screen } from "@/components/ui/screen";
import { SearchField } from "@/components/ui/search-field";
import { Tabs } from "@/components/ui/tabs";
import { TopBar } from "@/components/ui/top-bar";
import { CATEGORIES } from "@/config/categories";
import type { Food, Recipe } from "@/lib/db/models";
import { useAllFoods, useAllRecipes } from "@/lib/db/repo/foodRepo";
import { useFavorites } from "@/lib/db/repo/trackingRepo";
import { searchFoods, searchRecipes } from "@/lib/food/search";
import { fmt, t } from "@/lib/i18n";
import { useUiStore } from "@/stores/uiStore";
import { FoodResultRow, per100Subtitle } from "@/features/log/FoodResultRow";

type Tab = "all" | "mine" | "recipes" | "favorites";

export function LibraryScreen() {
  const navigate = useNavigate();
  const openPortion = useUiStore((s) => s.openPortion);
  const foods = useAllFoods();
  const recipes = useAllRecipes();
  const favorites = useFavorites();

  const [tab, setTab] = React.useState<Tab>("all");
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<string | null>(null);

  const foodRow = (food: Food, editable = false) => (
    <FoodResultRow
      key={food.id}
      name={food.name}
      subtitle={
        food.brand
          ? `${food.brand} · ${per100Subtitle(food.per100.energy, food.isLiquid)}`
          : per100Subtitle(food.per100.energy, food.isLiquid)
      }
      onPress={() => openPortion({ kind: "food", foodId: food.id })}
      onQuickAdd={
        editable ? undefined : () => openPortion({ kind: "food", foodId: food.id })
      }
      className={editable ? "pr-1" : undefined}
    />
  );

  const userFoodRow = (food: Food) => (
    <div key={food.id} className="flex items-center gap-2">
      <div className="min-w-0 flex-1">{foodRow(food, true)}</div>
      <IconButton
        label={t.common.edit}
        variant="soft"
        size="sm"
        onClick={() => navigate(`/bibliothek/lebensmittel/${food.id}`)}
      >
        <Pencil />
      </IconButton>
    </div>
  );

  const recipeRow = (recipe: Recipe) => (
    <div key={recipe.id} className="flex items-center gap-2">
      <div className="min-w-0 flex-1">
        <FoodResultRow
          name={recipe.name}
          subtitle={t.log.tabRecipes}
          onPress={() => openPortion({ kind: "recipe", recipeId: recipe.id })}
        />
      </div>
      <IconButton
        label={t.common.edit}
        variant="soft"
        size="sm"
        onClick={() => navigate(`/bibliothek/rezept/${recipe.id}`)}
      >
        <Pencil />
      </IconButton>
    </div>
  );

  const searching = query.trim().length > 0;

  const allList = React.useMemo(() => {
    let list = foods ?? [];
    if (category) list = list.filter((f) => f.category === category);
    if (searching) list = searchFoods(list, query, 100);
    else list = list.slice(0, 200);
    return list;
  }, [foods, category, searching, query]);

  const mineList = React.useMemo(() => {
    const mine = (foods ?? []).filter((f) => f.source === "user");
    return searching ? searchFoods(mine, query, 100) : mine;
  }, [foods, searching, query]);

  const recipeList = React.useMemo(
    () => (searching ? searchRecipes(recipes ?? [], query, 100) : (recipes ?? [])),
    [recipes, searching, query]
  );

  const favoriteList = React.useMemo(() => {
    const refs = new Set((favorites ?? []).map((f) => f.foodRef));
    return {
      foods: (foods ?? []).filter((f) => refs.has(`food:${f.id}`)),
      recipes: (recipes ?? []).filter((r) => refs.has(`recipe:${r.id}`)),
    };
  }, [favorites, foods, recipes]);

  return (
    <>
      <TopBar title={t.library.title} large />
      <Screen className="pt-1">
        <SearchField
          value={query}
          onChange={setQuery}
          placeholder={t.library.searchPlaceholder}
        />

        <Tabs
          className="mt-4"
          tabs={[
            { value: "all", label: t.library.tabAll },
            { value: "mine", label: t.library.tabMine },
            { value: "recipes", label: t.library.tabRecipes },
            { value: "favorites", label: t.library.tabFavorites },
          ]}
          value={tab}
          onChange={(v) => setTab(v as Tab)}
        />

        <div className="mt-4 flex flex-col gap-2.5">
          {tab === "all" && (
            <>
              <RowGroup>
                <Row
                  leading={<Pill className="text-accent-text" />}
                  title={t.library.stack}
                  subtitle={t.library.stackSubtitle}
                  onPress={() => navigate("/bibliothek/stack")}
                />
              </RowGroup>
              <div className="scrollbar-none -mx-5 flex gap-2 overflow-x-auto px-5 py-1">
                <Chip selected={category === null} onClick={() => setCategory(null)}>
                  {t.library.allCategories}
                </Chip>
                {CATEGORIES.map((c) => (
                  <Chip
                    key={c.id}
                    selected={category === c.id}
                    onClick={() => setCategory(category === c.id ? null : c.id)}
                  >
                    {c.name}
                  </Chip>
                ))}
              </div>
              {allList.length === 0 ? (
                <EmptyState
                  icon={<LibraryBig />}
                  title={t.library.emptySearchTitle}
                  description={t.library.emptySearchBody}
                />
              ) : (
                <>
                  <p className="px-1 text-caption text-faint">
                    {fmt(t.library.foodCount, { count: allList.length })}
                  </p>
                  {allList.map((f) => foodRow(f))}
                </>
              )}
            </>
          )}

          {tab === "mine" && (
            <>
              <Button size="md" variant="soft" onClick={() => navigate("/bibliothek/lebensmittel/neu")}>
                <Plus /> {t.library.newFood}
              </Button>
              {mineList.length === 0 ? (
                <EmptyState
                  icon={<UtensilsCrossed />}
                  title={t.library.emptyMineTitle}
                  description={t.library.emptyMineBody}
                />
              ) : (
                mineList.map(userFoodRow)
              )}
            </>
          )}

          {tab === "recipes" && (
            <>
              <Button size="md" variant="soft" onClick={() => navigate("/bibliothek/rezept/neu")}>
                <Plus /> {t.library.newRecipe}
              </Button>
              {recipeList.length === 0 ? (
                <EmptyState
                  icon={<UtensilsCrossed />}
                  title={t.library.emptyRecipesTitle}
                  description={t.library.emptyRecipesBody}
                />
              ) : (
                recipeList.map(recipeRow)
              )}
            </>
          )}

          {tab === "favorites" &&
            (favoriteList.foods.length + favoriteList.recipes.length === 0 ? (
              <EmptyState
                icon={<Star />}
                title={t.library.emptyFavoritesTitle}
                description={t.library.emptyFavoritesBody}
              />
            ) : (
              <>
                {favoriteList.recipes.map((r) => (
                  <FoodResultRow
                    key={r.id}
                    name={r.name}
                    subtitle={t.log.tabRecipes}
                    onPress={() => openPortion({ kind: "recipe", recipeId: r.id })}
                  />
                ))}
                {favoriteList.foods.map((f) => foodRow(f))}
              </>
            ))}
        </div>
        <BottomNavSpacer />
      </Screen>
    </>
  );
}
