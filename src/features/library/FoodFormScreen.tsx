import * as React from "react";
import { useNavigate, useParams } from "react-router";
import { ChevronLeft, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Callout } from "@/components/ui/callout";
import { Dialog } from "@/components/ui/dialog";
import { Disclosure } from "@/components/ui/accordion";
import { IconButton } from "@/components/ui/icon-button";
import { Row, RowGroup } from "@/components/ui/list-row";
import { Screen } from "@/components/ui/screen";
import { Section } from "@/components/ui/section";
import { SegmentedControl } from "@/components/ui/segmented-control";
import { SelectField } from "@/components/ui/select-field";
import { Switch } from "@/components/ui/switch";
import { TextField } from "@/components/ui/text-field";
import { TopBar } from "@/components/ui/top-bar";
import { useToast } from "@/components/ui/toast";
import { CATEGORIES, DEFAULT_USER_CATEGORY } from "@/config/categories";
import { NUTRIENTS, NUTRIENT_BY_ID } from "@/config/nutrients";
import { MACRO_RULES } from "@/config/targets";
import type { Portion } from "@/lib/db/models";
import {
  createUserFood,
  deleteUserFood,
  updateUserFood,
  useFood,
} from "@/lib/db/repo/foodRepo";
import type { NutrientId, NutrientVector } from "@/lib/engine/types";
import { fmt, formatNumber, t } from "@/lib/i18n";

const BASE_FIELDS: NutrientId[] = [
  "energy",
  "protein",
  "carbs",
  "sugar",
  "fiber",
  "fat",
  "satFat",
];

const parseNum = (raw: string): number | undefined => {
  if (raw.trim() === "") return undefined;
  const v = Number(raw.replace(",", "."));
  return Number.isFinite(v) && v >= 0 ? v : undefined;
};

type Values = Partial<Record<NutrientId, string>>;

export function FoodFormScreen() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const editing = id !== "neu" ? id : undefined;
  const existing = useFood(editing);

  const [name, setName] = React.useState("");
  const [brand, setBrand] = React.useState("");
  const [category, setCategory] = React.useState(DEFAULT_USER_CATEGORY);
  const [kind, setKind] = React.useState<"food" | "supplement">("food");
  const [isLiquid, setIsLiquid] = React.useState(false);
  const [values, setValues] = React.useState<Values>({});
  const [portions, setPortions] = React.useState<Portion[]>([]);
  const [confirmDelete, setConfirmDelete] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  // Prefill in edit mode.
  React.useEffect(() => {
    if (!existing) return;
    setName(existing.name);
    setBrand(existing.brand ?? "");
    setCategory(existing.category);
    setKind(existing.kind);
    setIsLiquid(existing.isLiquid ?? false);
    setPortions(existing.portions);
    const v: Values = {};
    for (const [key, value] of Object.entries(existing.per100)) {
      if (value != null)
        v[key as NutrientId] = formatNumber(value, 2).replace(/\.$/, "");
    }
    setValues(v);
  }, [existing]);

  const setValue = (id: NutrientId, raw: string) =>
    setValues((prev) => ({ ...prev, [id]: raw }));

  const vector = React.useMemo(() => {
    const out: NutrientVector = {};
    for (const [key, raw] of Object.entries(values)) {
      const v = parseNum(raw ?? "");
      if (v != null) out[key as NutrientId] = v;
    }
    return out;
  }, [values]);

  // Soft energy reconciliation warning (same formula as the seed validator).
  const energyWarning = React.useMemo(() => {
    const { energy, carbs, protein, fat, alcohol, fiber } = vector;
    if (energy == null) return null;
    if (carbs == null && protein == null && fat == null) return null;
    const expected =
      4 * (carbs ?? 0) +
      4 * (protein ?? 0) +
      9 * (fat ?? 0) +
      MACRO_RULES.kcalPerGram.alcohol * (alcohol ?? 0) +
      2 * (fiber ?? 0);
    const tolerance = Math.max(15, energy * 0.12);
    if (Math.abs(expected - energy) > tolerance) {
      return fmt(t.foodForm.energyMismatch, { expected: formatNumber(expected, 0) });
    }
    return null;
  }, [vector]);

  const fieldFor = (id: NutrientId) => {
    const def = NUTRIENT_BY_ID[id];
    return (
      <TextField
        key={id}
        label={`${def.name} (${def.unit})`}
        inputMode="decimal"
        value={values[id] ?? ""}
        onChange={(e) => setValue(id, e.target.value)}
      />
    );
  };

  const save = async () => {
    if (!name.trim()) {
      setError(t.foodForm.nameRequired);
      return;
    }
    if (vector.energy == null) {
      setError(t.foodForm.energyRequired);
      return;
    }
    const input = {
      kind,
      name: name.trim(),
      brand: brand.trim() || undefined,
      category,
      per100: vector,
      isLiquid: isLiquid || undefined,
      portions: portions.filter((p) => p.label.trim() && p.grams > 0),
      dataQuality: "partial" as const,
    };
    if (editing) await updateUserFood(editing, input);
    else await createUserFood(input);
    toast({ title: t.foodForm.saved, tone: "success" });
    navigate(-1);
  };

  const remove = async () => {
    if (!editing) return;
    await deleteUserFood(editing);
    toast({ title: t.foodForm.deleted });
    navigate("/bibliothek");
  };

  const extendedFields = NUTRIENTS.filter((n) => !BASE_FIELDS.includes(n.id));

  return (
    <>
      <TopBar
        title={editing ? t.foodForm.editTitle : t.foodForm.createTitle}
        leading={
          <IconButton label={t.common.back} variant="ghost" onClick={() => navigate(-1)}>
            <ChevronLeft />
          </IconButton>
        }
      />
      <Screen className="gap-4 pt-2 pb-28">
        <TextField
          label={t.foodForm.name}
          placeholder={t.foodForm.namePlaceholder}
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            setError(null);
          }}
          maxLength={80}
        />
        <TextField
          label={t.foodForm.brand}
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
          maxLength={60}
        />
        <div className="flex flex-col gap-1.5">
          <span className="px-1 text-subhead font-medium text-muted">
            {t.foodForm.kind}
          </span>
          <SegmentedControl
            full
            options={[
              { value: "food", label: t.foodForm.kindFood },
              { value: "supplement", label: t.foodForm.kindSupplement },
            ]}
            value={kind}
            onChange={(v) => setKind(v as "food" | "supplement")}
          />
        </div>
        <SelectField
          label={t.foodForm.category}
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </SelectField>
        <RowGroup>
          <Row
            title={t.foodForm.isLiquid}
            trailing={
              <Switch
                checked={isLiquid}
                onCheckedChange={setIsLiquid}
                aria-label={t.foodForm.isLiquid}
              />
            }
          />
        </RowGroup>

        <Section title={isLiquid ? t.foodForm.baseValuesMl : t.foodForm.baseValues}>
          <div className="grid grid-cols-2 gap-3">{BASE_FIELDS.map(fieldFor)}</div>
        </Section>

        {energyWarning && <Callout tone="warning">{energyWarning}</Callout>}

        <Disclosure title={t.foodForm.moreValues}>
          <div className="grid grid-cols-2 gap-3 px-4 pb-4">
            {extendedFields.map((n) => fieldFor(n.id))}
          </div>
        </Disclosure>

        <Section title={t.foodForm.portionsTitle}>
          <p className="mb-3 px-1 text-footnote text-muted">{t.foodForm.portionsHint}</p>
          <div className="flex flex-col gap-2.5">
            {portions.map((portion, i) => (
              <div key={i} className="flex items-end gap-2">
                <TextField
                  label={i === 0 ? t.foodForm.portionLabel : undefined}
                  value={portion.label}
                  onChange={(e) =>
                    setPortions((prev) =>
                      prev.map((p, j) => (j === i ? { ...p, label: e.target.value } : p))
                    )
                  }
                  className="flex-1"
                />
                <TextField
                  label={i === 0 ? t.foodForm.portionGrams : undefined}
                  inputMode="decimal"
                  value={String(portion.grams || "")}
                  onChange={(e) =>
                    setPortions((prev) =>
                      prev.map((p, j) =>
                        j === i ? { ...p, grams: parseNum(e.target.value) ?? 0 } : p
                      )
                    )
                  }
                  className="w-28"
                />
                <IconButton
                  label={t.common.delete}
                  variant="soft"
                  onClick={() => setPortions((prev) => prev.filter((_, j) => j !== i))}
                >
                  <Trash2 />
                </IconButton>
              </div>
            ))}
            <Button
              size="md"
              variant="soft"
              onClick={() => setPortions((prev) => [...prev, { label: "", grams: 0 }])}
            >
              <Plus /> {t.foodForm.portionAdd}
            </Button>
          </div>
        </Section>

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

      <Dialog
        open={confirmDelete}
        onOpenChange={setConfirmDelete}
        title={t.foodForm.deleteTitle}
        description={t.foodForm.deleteBody}
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
