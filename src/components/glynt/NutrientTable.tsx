import { GROUP_NAMES, NUTRIENTS, SODIUM_TO_SALT } from "@/config/nutrients";
import type { NutrientVector } from "@/lib/engine/types";
import { formatAmount, t } from "@/lib/i18n";

/**
 * Read-only full nutrient panel for an amount of food (portion preview,
 * food detail). Absent values render as „keine Daten" — never 0.
 */
export function NutrientTable({
  vector,
  className,
}: {
  vector: NutrientVector;
  className?: string;
}) {
  const groups = ["energy", "macros", "fats", "vitamins", "minerals", "extended"] as const;

  return (
    <div className={className}>
      {groups.map((group) => {
        const defs = NUTRIENTS.filter((n) => n.group === group);
        const rows = defs.filter((n) => vector[n.id] != null);
        if (rows.length === 0) return null;
        return (
          <div key={group} className="mb-4 last:mb-0">
            <p className="mb-1.5 px-1 text-caption uppercase tracking-wide text-faint">
              {GROUP_NAMES[group]}
            </p>
            <div className="overflow-hidden rounded-row bg-background/60">
              {defs.map((def) => {
                const value = vector[def.id];
                if (value == null) return null;
                return (
                  <div
                    key={def.id}
                    className="flex items-baseline justify-between gap-3 border-b border-hairline px-3.5 py-2 last:border-b-0"
                  >
                    <span className="text-subhead">{def.name}</span>
                    <span className="shrink-0 text-subhead font-semibold tabular-nums">
                      {formatAmount(value, def.unit, def.decimals)}
                      {def.id === "sodium" && (
                        <span className="ml-1.5 font-normal text-muted">
                          ({formatAmount((value * SODIUM_TO_SALT) / 1000, "g Salz", 1)})
                        </span>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      {Object.keys(vector).length === 0 && (
        <p className="px-1 text-subhead text-muted">{t.common.noData}</p>
      )}
    </div>
  );
}
