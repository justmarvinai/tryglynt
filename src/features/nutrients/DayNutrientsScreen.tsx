import { useNavigate, useSearchParams } from "react-router";
import { ChevronLeft } from "lucide-react";
import { BottomNavSpacer } from "@/components/ui/bottom-nav";
import { Callout } from "@/components/ui/callout";
import { IconButton } from "@/components/ui/icon-button";
import { Screen } from "@/components/ui/screen";
import { Skeleton } from "@/components/ui/skeleton";
import { TopBar } from "@/components/ui/top-bar";
import { NutrientBar } from "@/components/glynt/NutrientBar";
import { GROUP_NAMES, NUTRIENT_BY_ID, type NutrientGroup } from "@/config/nutrients";
import { formatLongDate, todayISO } from "@/lib/dates";
import { t } from "@/lib/i18n";
import { useUiStore } from "@/stores/uiStore";
import { useDayData } from "@/features/today/useDayData";

const GROUPS: NutrientGroup[] = [
  "energy",
  "macros",
  "fats",
  "vitamins",
  "minerals",
  "extended",
];

/** Full nutrient panel for one day, grouped like the panel config. */
export function DayNutrientsScreen() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const activeDate = useUiStore((s) => s.activeDate);
  const date = params.get("date") ?? activeDate ?? todayISO();
  const { loading, day } = useDayData(date);

  return (
    <>
      <TopBar
        title={t.nutrients.dayTitle}
        leading={
          <IconButton label={t.common.back} variant="ghost" onClick={() => navigate(-1)}>
            <ChevronLeft />
          </IconButton>
        }
      />
      <Screen className="pt-1">
        <p className="px-1 text-subhead text-muted">{formatLongDate(date)}</p>

        {loading || !day ? (
          <div className="mt-5 space-y-3">
            <Skeleton className="h-24 rounded-card" />
            <Skeleton className="h-40 rounded-card" />
            <Skeleton className="h-40 rounded-card" />
          </div>
        ) : day.entryCount === 0 ? (
          <Callout tone="info" className="mt-5">
            {t.nutrients.empty}
          </Callout>
        ) : (
          GROUPS.map((group) => {
            const rows = day.statuses.filter(
              (s) => NUTRIENT_BY_ID[s.id]?.group === group
            );
            if (rows.length === 0) return null;
            return (
              <section key={group} className="mt-6">
                <h2 className="mb-3 px-1 text-title3">{GROUP_NAMES[group]}</h2>
                <div className="flex flex-col gap-4 rounded-card bg-surface p-5">
                  {rows.map((status) => (
                    <NutrientBar
                      key={status.id}
                      status={status}
                      onPress={() => navigate(`/naehrstoff/${status.id}`)}
                    />
                  ))}
                </div>
              </section>
            );
          })
        )}
        <BottomNavSpacer />
      </Screen>
    </>
  );
}
