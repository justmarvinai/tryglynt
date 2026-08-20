import * as React from "react";
import { useNavigate } from "react-router";
import { ChevronLeft, Pill, Plus, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { IconButton } from "@/components/ui/icon-button";
import { Row, RowGroup } from "@/components/ui/list-row";
import { Screen } from "@/components/ui/screen";
import { TopBar } from "@/components/ui/top-bar";
import { useToast } from "@/components/ui/toast";
import { useAllFoods } from "@/lib/db/repo/foodRepo";
import {
  addRegimenItem,
  logRegimen,
  removeRegimenItem,
  useRegimen,
} from "@/lib/db/repo/trackingRepo";
import type { Food } from "@/lib/db/models";
import { suggestMealSlot } from "@/config/meals";
import { useSettings } from "@/lib/db/repo/appRepo";
import { defaultUnitFor, formatPortion } from "@/lib/food/portions";
import { fmt, t } from "@/lib/i18n";
import { useUiStore } from "@/stores/uiStore";
import { FoodPickerSheet } from "./FoodPickerSheet";

export function StackScreen() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const regimen = useRegimen();
  const foods = useAllFoods();
  const settings = useSettings();
  const activeDate = useUiStore((s) => s.activeDate);
  const [pickerOpen, setPickerOpen] = React.useState(false);

  const foodById = React.useMemo(() => {
    const map = new Map<string, Food>();
    for (const f of foods ?? []) map.set(f.id, f);
    return map;
  }, [foods]);

  const addItem = async (food: Food) => {
    const unit = defaultUnitFor(food);
    const slots = settings?.mealSlots ?? [];
    await addRegimenItem({
      food,
      amount: unit.defaultAmount,
      unit: unit.unit,
      grams: unit.defaultAmount * unit.gramsPerUnit,
      mealId: suggestMealSlot(slots, 8)?.id ?? slots[0]?.id ?? "breakfast",
    });
    setPickerOpen(false);
  };

  const logAll = async () => {
    const count = await logRegimen(activeDate);
    toast({
      title: count > 0 ? fmt(t.stack.logged, { count }) : t.stack.empty,
      tone: count > 0 ? "success" : "default",
    });
  };

  return (
    <>
      <TopBar
        title={t.stack.title}
        leading={
          <IconButton label={t.common.back} variant="ghost" onClick={() => navigate(-1)}>
            <ChevronLeft />
          </IconButton>
        }
      />
      <Screen className="gap-4 pt-2">
        <p className="text-subhead text-muted">{t.stack.subtitle}</p>

        {(regimen ?? []).length === 0 ? (
          <EmptyState
            icon={<Pill />}
            title={t.stack.empty}
            description={t.stack.emptyBody}
            action={
              <Button size="md" onClick={() => setPickerOpen(true)}>
                <Plus /> {t.stack.addItem}
              </Button>
            }
          />
        ) : (
          <>
            <Button size="lg" full onClick={() => void logAll()}>
              <Zap /> {t.stack.logAll}
            </Button>
            <RowGroup>
              {(regimen ?? []).map((item) => {
                const food = foodById.get(item.foodId);
                return (
                  <Row
                    key={item.id}
                    leading={<Pill className="text-accent" />}
                    title={food?.name ?? "—"}
                    subtitle={formatPortion(item.amount, item.unit, item.grams)}
                    trailing="none"
                    value={
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-danger"
                        onClick={() => void removeRegimenItem(item.id)}
                      >
                        {t.stack.removeItem}
                      </Button>
                    }
                  />
                );
              })}
            </RowGroup>
            <Button size="md" variant="soft" onClick={() => setPickerOpen(true)}>
              <Plus /> {t.stack.addItem}
            </Button>
          </>
        )}
      </Screen>

      <FoodPickerSheet
        open={pickerOpen}
        onOpenChange={setPickerOpen}
        onPick={(food) => void addItem(food)}
        title={t.stack.searchTitle}
        filter={(f) => f.kind === "supplement" || f.category === "supplemente"}
      />
    </>
  );
}
