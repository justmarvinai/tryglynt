import * as React from "react";
import { SearchField } from "@/components/ui/search-field";
import { Sheet } from "@/components/ui/sheet";
import type { Food } from "@/lib/db/models";
import { useAllFoods } from "@/lib/db/repo/foodRepo";
import { searchFoods } from "@/lib/food/search";
import { t } from "@/lib/i18n";
import { FoodResultRow, per100Subtitle } from "@/features/log/FoodResultRow";

/** Small food search sheet for pickers (recipe ingredients, stack items). */
export function FoodPickerSheet({
  open,
  onOpenChange,
  onPick,
  title,
  filter,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onPick: (food: Food) => void;
  title: string;
  filter?: (food: Food) => boolean;
}) {
  const foods = useAllFoods();
  const [query, setQuery] = React.useState("");

  React.useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const list = React.useMemo(() => {
    let base = foods ?? [];
    if (filter) base = base.filter(filter);
    return searchFoods(base, query, 40);
  }, [foods, filter, query]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange} title={title} desktop="sheet">
      <div className="flex flex-col gap-3 pb-4">
        <SearchField
          autoFocus
          value={query}
          onChange={setQuery}
          placeholder={t.log.searchPlaceholder}
        />
        <div className="flex flex-col gap-2.5">
          {list.map((food) => (
            <FoodResultRow
              key={food.id}
              name={food.name}
              subtitle={per100Subtitle(food.per100.energy, food.isLiquid)}
              onPress={() => onPick(food)}
            />
          ))}
        </div>
      </div>
    </Sheet>
  );
}
