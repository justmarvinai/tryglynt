/**
 * The nutrient panel — single source of truth for every nutrient the app
 * knows: German display names, units, groups, display order, decimals,
 * target semantics and short info texts (docs/SCIENCE.md §5, D-015).
 *
 * `targetType`:
 *  - "goal"  → reach the target ("gut versorgt" at ≥100 %)
 *  - "limit" → stay under the target (neutral bar, warning past 100 %)
 *  - "info"  → tracked & shown, no daily target (e.g. Koffein)
 */

import type { NutrientId } from "@/lib/engine/types";

export type NutrientGroup =
  | "energy"
  | "macros"
  | "fats"
  | "vitamins"
  | "minerals"
  | "extended";

export type TargetType = "goal" | "limit" | "info";

export interface NutrientDef {
  id: NutrientId;
  /** German display name. */
  name: string;
  /** Short name for tight UI (bars, chips) — defaults to `name`. */
  shortName?: string;
  unit: "kcal" | "g" | "mg" | "µg" | "ml";
  group: NutrientGroup;
  targetType: TargetType;
  /** Fraction digits for display. */
  decimals: 0 | 1 | 2;
  /** „Wofür ist das gut?" — short, factual, no medical claims. */
  info: string;
}

/** Ordered as displayed in the day panel. */
export const NUTRIENTS: readonly NutrientDef[] = [
  // ---------------------------------------------------------------- energy
  {
    id: "energy",
    name: "Energie",
    unit: "kcal",
    group: "energy",
    targetType: "goal",
    decimals: 0,
    info: "Dein Körper braucht Energie für alles — vom Denken bis zum Training. Glynt berechnet deinen Bedarf aus Grundumsatz und Aktivität.",
  },
  {
    id: "water",
    name: "Wasser",
    unit: "ml",
    group: "energy",
    targetType: "goal",
    decimals: 0,
    info: "Wasser reguliert Temperatur, Kreislauf und Verdauung. Der Richtwert deckt Getränke ab — ein Teil deines Bedarfs kommt zusätzlich aus dem Essen.",
  },
  {
    id: "alcohol",
    name: "Alkohol",
    unit: "g",
    group: "energy",
    targetType: "info",
    decimals: 1,
    info: "Alkohol liefert 7 kcal pro Gramm und zählt in deine Energiebilanz. Es gibt keine als sicher geltende Menge — Glynt zeigt ihn transparent an.",
  },
  // ---------------------------------------------------------------- macros
  {
    id: "protein",
    name: "Protein",
    unit: "g",
    group: "macros",
    targetType: "goal",
    decimals: 1,
    info: "Baustoff für Muskeln, Enzyme und Immunsystem. Dein Ziel richtet sich nach Körpergewicht und Aktivität.",
  },
  {
    id: "carbs",
    name: "Kohlenhydrate",
    shortName: "Kohlenhydr.",
    unit: "g",
    group: "macros",
    targetType: "goal",
    decimals: 1,
    info: "Die schnellste Energiequelle deines Körpers, besonders fürs Gehirn. Dein Ziel ergibt sich aus der Energie, die nach Protein und Fett übrig bleibt.",
  },
  {
    id: "sugar",
    name: "Zucker",
    unit: "g",
    group: "macros",
    targetType: "limit",
    decimals: 1,
    info: "Freier Zucker liefert Energie ohne weitere Nährstoffe. Die WHO empfiehlt, unter 10 % der täglichen Energie zu bleiben.",
  },
  {
    id: "fiber",
    name: "Ballaststoffe",
    shortName: "Ballastst.",
    unit: "g",
    group: "macros",
    targetType: "goal",
    decimals: 1,
    info: "Gut für Verdauung, Sättigung und Blutzucker. Vollkorn, Hülsenfrüchte und Gemüse sind die besten Quellen.",
  },
  {
    id: "fat",
    name: "Fett",
    unit: "g",
    group: "macros",
    targetType: "goal",
    decimals: 1,
    info: "Träger fettlöslicher Vitamine und Baustoff für Zellen und Hormone. Etwa 30 % deiner Energie ist ein guter Richtwert.",
  },
  // ------------------------------------------------------------------ fats
  {
    id: "satFat",
    name: "Gesättigte Fettsäuren",
    shortName: "Gesättigt",
    unit: "g",
    group: "fats",
    targetType: "limit",
    decimals: 1,
    info: "Stecken v. a. in tierischen Produkten. Empfohlen wird, unter 10 % der täglichen Energie zu bleiben und öfter zu ungesättigten Fetten zu greifen.",
  },
  {
    id: "monoFat",
    name: "Einfach ungesättigte Fettsäuren",
    shortName: "Einfach unges.",
    unit: "g",
    group: "fats",
    targetType: "info",
    decimals: 1,
    info: "Die Fette aus Olivenöl, Avocado und Nüssen — eine gute Basis für deine Fettzufuhr.",
  },
  {
    id: "polyFat",
    name: "Mehrfach ungesättigte Fettsäuren",
    shortName: "Mehrfach unges.",
    unit: "g",
    group: "fats",
    targetType: "info",
    decimals: 1,
    info: "Essenzielle Fettsäuren, die dein Körper nicht selbst bilden kann — aus Pflanzenölen, Nüssen, Saaten und Fisch.",
  },
  {
    id: "transFat",
    name: "Transfettsäuren",
    shortName: "Transfette",
    unit: "g",
    group: "fats",
    targetType: "limit",
    decimals: 1,
    info: "Entstehen v. a. bei industrieller Fetthärtung. So wenig wie möglich — die WHO empfiehlt unter 1 % der Energie.",
  },
  {
    id: "omega3",
    name: "Omega-3-Fettsäuren",
    shortName: "Omega-3",
    unit: "g",
    group: "fats",
    targetType: "goal",
    decimals: 2,
    info: "Wichtig für Herz und Gehirn. Fetter Fisch liefert EPA/DHA, Lein- und Walnüsse liefern ALA.",
  },
  {
    id: "cholesterol",
    name: "Cholesterin",
    unit: "mg",
    group: "fats",
    targetType: "info",
    decimals: 0,
    info: "Dein Körper stellt Cholesterin selbst her; das aus der Nahrung wirkt bei den meisten Menschen nur wenig auf den Blutwert.",
  },
  // -------------------------------------------------------------- vitamins
  {
    id: "vitA",
    name: "Vitamin A",
    unit: "µg",
    group: "vitamins",
    targetType: "goal",
    decimals: 0,
    info: "Wichtig für Sehen, Haut und Immunsystem. Steckt in Leber, Eiern und als Provitamin in orangem und grünem Gemüse.",
  },
  {
    id: "vitB1",
    name: "Vitamin B1 (Thiamin)",
    shortName: "B1 Thiamin",
    unit: "mg",
    group: "vitamins",
    targetType: "goal",
    decimals: 2,
    info: "Hilft, Kohlenhydrate in Energie umzuwandeln. Gute Quellen: Vollkorn, Hülsenfrüchte, Schweinefleisch.",
  },
  {
    id: "vitB2",
    name: "Vitamin B2 (Riboflavin)",
    shortName: "B2 Riboflavin",
    unit: "mg",
    group: "vitamins",
    targetType: "goal",
    decimals: 2,
    info: "Beteiligt am Energiestoffwechsel. Steckt in Milchprodukten, Eiern, Pilzen und grünem Gemüse.",
  },
  {
    id: "vitB3",
    name: "Vitamin B3 (Niacin)",
    shortName: "B3 Niacin",
    unit: "mg",
    group: "vitamins",
    targetType: "goal",
    decimals: 1,
    info: "Zentral für den Energiestoffwechsel. Gute Quellen: Fleisch, Fisch, Erdnüsse, Vollkorn.",
  },
  {
    id: "vitB5",
    name: "Vitamin B5 (Pantothensäure)",
    shortName: "B5 Pantothen.",
    unit: "mg",
    group: "vitamins",
    targetType: "goal",
    decimals: 1,
    info: "Baustein eines zentralen Stoffwechsel-Coenzyms. Kommt in fast allen Lebensmitteln vor.",
  },
  {
    id: "vitB6",
    name: "Vitamin B6",
    unit: "mg",
    group: "vitamins",
    targetType: "goal",
    decimals: 2,
    info: "Wichtig für Eiweißstoffwechsel und Nervensystem. Steckt in Fleisch, Fisch, Kartoffeln und Bananen.",
  },
  {
    id: "vitB7",
    name: "Vitamin B7 (Biotin)",
    shortName: "B7 Biotin",
    unit: "µg",
    group: "vitamins",
    targetType: "goal",
    decimals: 0,
    info: "Bekannt für Haut, Haare und Nägel; beteiligt am Fett- und Zuckerstoffwechsel. Quellen: Eier, Nüsse, Haferflocken.",
  },
  {
    id: "vitB9",
    name: "Folat (Vitamin B9)",
    shortName: "Folat",
    unit: "µg",
    group: "vitamins",
    targetType: "goal",
    decimals: 0,
    info: "Wichtig für Zellteilung und Blutbildung. Grünes Blattgemüse, Hülsenfrüchte und Vollkorn sind gute Quellen.",
  },
  {
    id: "vitB12",
    name: "Vitamin B12",
    unit: "µg",
    group: "vitamins",
    targetType: "goal",
    decimals: 1,
    info: "Nötig für Blutbildung und Nerven. Kommt praktisch nur in tierischen Produkten vor — bei veganer Ernährung ist ein Supplement Standard.",
  },
  {
    id: "vitC",
    name: "Vitamin C",
    unit: "mg",
    group: "vitamins",
    targetType: "goal",
    decimals: 0,
    info: "Antioxidans, unterstützt Immunsystem und Eisenaufnahme. Paprika, Beeren und Zitrusfrüchte sind top.",
  },
  {
    id: "vitD",
    name: "Vitamin D",
    unit: "µg",
    group: "vitamins",
    targetType: "goal",
    decimals: 1,
    info: "Wichtig für Knochen und Immunsystem. Der Körper bildet es mit Sonnenlicht — über Lebensmittel allein ist der Richtwert schwer zu erreichen.",
  },
  {
    id: "vitE",
    name: "Vitamin E",
    unit: "mg",
    group: "vitamins",
    targetType: "goal",
    decimals: 1,
    info: "Schützt Zellen vor oxidativem Stress. Pflanzenöle, Nüsse und Saaten liefern am meisten.",
  },
  {
    id: "vitK",
    name: "Vitamin K",
    unit: "µg",
    group: "vitamins",
    targetType: "goal",
    decimals: 0,
    info: "Nötig für Blutgerinnung und Knochenstoffwechsel. Grünes Gemüse wie Grünkohl und Spinat ist die beste Quelle.",
  },
  {
    id: "choline",
    name: "Cholin",
    unit: "mg",
    group: "vitamins",
    targetType: "goal",
    decimals: 0,
    info: "Baustein für Zellmembranen und Botenstoffe. Eier und Leber sind besonders reich daran.",
  },
  // -------------------------------------------------------------- minerals
  {
    id: "calcium",
    name: "Calcium",
    unit: "mg",
    group: "minerals",
    targetType: "goal",
    decimals: 0,
    info: "Der wichtigste Baustoff für Knochen und Zähne. Milchprodukte, grünes Gemüse und Mineralwasser tragen bei.",
  },
  {
    id: "iron",
    name: "Eisen",
    unit: "mg",
    group: "minerals",
    targetType: "goal",
    decimals: 1,
    info: "Transportiert Sauerstoff im Blut. Fleisch liefert gut verfügbares Eisen; pflanzliches Eisen nimmst du mit Vitamin C besser auf.",
  },
  {
    id: "magnesium",
    name: "Magnesium",
    unit: "mg",
    group: "minerals",
    targetType: "goal",
    decimals: 0,
    info: "Beteiligt an über 300 Stoffwechselreaktionen, u. a. Muskel- und Nervenfunktion. Nüsse, Vollkorn und Hülsenfrüchte sind reich daran.",
  },
  {
    id: "zinc",
    name: "Zink",
    unit: "mg",
    group: "minerals",
    targetType: "goal",
    decimals: 1,
    info: "Wichtig für Immunsystem, Haut und Wundheilung. Fleisch, Käse, Nüsse und Vollkorn sind gute Quellen.",
  },
  {
    id: "potassium",
    name: "Kalium",
    unit: "mg",
    group: "minerals",
    targetType: "goal",
    decimals: 0,
    info: "Gegenspieler von Natrium — wichtig für Blutdruck, Muskeln und Nerven. Obst, Gemüse und Kartoffeln liefern viel.",
  },
  {
    id: "sodium",
    name: "Natrium",
    unit: "mg",
    group: "minerals",
    targetType: "limit",
    decimals: 0,
    info: "Reguliert den Wasserhaushalt — zu viel davon (als Salz) kann den Blutdruck erhöhen. Die WHO empfiehlt unter 5 g Salz pro Tag.",
  },
  {
    id: "phosphorus",
    name: "Phosphor",
    unit: "mg",
    group: "minerals",
    targetType: "goal",
    decimals: 0,
    info: "Zusammen mit Calcium Baustoff für Knochen; außerdem Teil des Energiestoffwechsels. In eiweißreichen Lebensmitteln reichlich vorhanden.",
  },
  {
    id: "selenium",
    name: "Selen",
    unit: "µg",
    group: "minerals",
    targetType: "goal",
    decimals: 0,
    info: "Antioxidativ wirksam, wichtig für die Schilddrüse. Paranüsse, Fisch und Eier sind gute Quellen.",
  },
  {
    id: "copper",
    name: "Kupfer",
    unit: "mg",
    group: "minerals",
    targetType: "goal",
    decimals: 2,
    info: "Wichtig für Eisenverwertung und Bindegewebe. Steckt in Nüssen, Kakao, Vollkorn und Hülsenfrüchten.",
  },
  {
    id: "manganese",
    name: "Mangan",
    unit: "mg",
    group: "minerals",
    targetType: "goal",
    decimals: 1,
    info: "Baustein vieler Enzyme, u. a. für Knochen und Stoffwechsel. Vollkorn, Nüsse und Tee liefern viel.",
  },
  {
    id: "iodine",
    name: "Jod",
    unit: "µg",
    group: "minerals",
    targetType: "goal",
    decimals: 0,
    info: "Unverzichtbar für die Schilddrüse. In Deutschland sind Seefisch, Milchprodukte und Jodsalz die wichtigsten Quellen.",
  },
  {
    id: "chloride",
    name: "Chlorid",
    unit: "mg",
    group: "minerals",
    targetType: "info",
    decimals: 0,
    info: "Kommt fast immer zusammen mit Natrium als Salz — wichtig für Wasserhaushalt und Magensäure.",
  },
  // -------------------------------------------------------------- extended
  {
    id: "chromium",
    name: "Chrom",
    unit: "µg",
    group: "extended",
    targetType: "goal",
    decimals: 0,
    info: "Spielt eine Rolle im Zuckerstoffwechsel. Die EFSA sieht keinen Referenzwert vor; die US-Werte dienen als Orientierung.",
  },
  {
    id: "molybdenum",
    name: "Molybdän",
    unit: "µg",
    group: "extended",
    targetType: "goal",
    decimals: 0,
    info: "Baustein einiger Enzyme. Hülsenfrüchte und Getreide sind die wichtigsten Quellen.",
  },
  {
    id: "fluoride",
    name: "Fluorid",
    unit: "mg",
    group: "extended",
    targetType: "goal",
    decimals: 1,
    info: "Härtet den Zahnschmelz. Kommt über Zahnpflege, Trinkwasser und schwarzen Tee.",
  },
  {
    id: "caffeine",
    name: "Koffein",
    unit: "mg",
    group: "extended",
    targetType: "info",
    decimals: 0,
    info: "Bis etwa 400 mg pro Tag gelten für gesunde Erwachsene als unbedenklich (EFSA) — das sind rund 4 Tassen Kaffee.",
  },
] as const;

export const NUTRIENT_BY_ID: Record<string, NutrientDef> = Object.fromEntries(
  NUTRIENTS.map((n) => [n.id, n])
);

export const GROUP_NAMES: Record<NutrientGroup, string> = {
  energy: "Energie",
  macros: "Makronährstoffe",
  fats: "Fette im Detail",
  vitamins: "Vitamine",
  minerals: "Mineralstoffe",
  extended: "Weitere",
};

/** Salt (g) shown alongside sodium: NaCl ≈ Natrium × 2,5 (D-026.3). */
export const SODIUM_TO_SALT = 2.5;
