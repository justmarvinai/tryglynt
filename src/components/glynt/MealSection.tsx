import { EllipsisVertical, Plus } from "lucide-react";
import { IconButton } from "@/components/ui/icon-button";
import { Row, RowGroup } from "@/components/ui/list-row";
import type { DiaryEntry } from "@/lib/db/models";
import { formatPortion } from "@/lib/food/portions";
import { formatAmount, t } from "@/lib/i18n";

export interface MealSectionProps {
  name: string;
  entries: DiaryEntry[];
  onAdd: () => void;
  onEntryPress: (entry: DiaryEntry) => void;
  onMenu?: () => void;
}

/** One diary meal on the Heute screen. */
export function MealSection({
  name,
  entries,
  onAdd,
  onEntryPress,
  onMenu,
}: MealSectionProps) {
  const kcal = entries.reduce((sum, e) => sum + (e.snapshot.energy ?? 0), 0);

  return (
    <section className="mt-6 first:mt-0">
      <div className="mb-2.5 flex items-center justify-between px-1">
        <h2 className="text-title3">{name}</h2>
        <div className="flex items-center gap-1">
          {kcal > 0 && (
            <span className="text-subhead font-semibold tabular-nums text-muted">
              {formatAmount(kcal, "kcal", 0)}
            </span>
          )}
          {onMenu && (
            <IconButton label={`${name} — Optionen`} variant="ghost" size="sm" onClick={onMenu}>
              <EllipsisVertical />
            </IconButton>
          )}
        </div>
      </div>
      <RowGroup joined>
        {entries.map((entry) => (
          <Row
            key={entry.id}
            title={entry.name}
            subtitle={
              entry.ref.type === "quick"
                ? t.log.quickAddTitle
                : formatPortion(entry.amount, entry.unit, entry.grams)
            }
            value={formatAmount(entry.snapshot.energy ?? 0, "kcal", 0)}
            onPress={() => onEntryPress(entry)}
          />
        ))}
        <Row
          leading={<Plus className="text-accent-text" />}
          title={<span className="text-accent-text">{t.common.add}</span>}
          trailing="none"
          onPress={onAdd}
        />
      </RowGroup>
    </section>
  );
}
