/**
 * Getränke — Werte je 100 ml. Quellenbasis: USDA FoodData Central /
 * BLS-typische Werte. Koffein und Alkohol sind real erfasst.
 */
import type { SeedCategoryFile } from "../types";

export const getraenke: SeedCategoryFile = {
  category: "getraenke",
  foods: [
    {
      id: "wasser",
      name: "Wasser (still)",
      isLiquid: true,
      portions: [["1 Glas (250 ml)", 250], ["1 Flasche (500 ml)", 500], ["1 große Flasche (750 ml)", 750]],
      n: { energy: 0, water: 100, alcohol: 0, protein: 0, carbs: 0, sugar: 0, fiber: 0, fat: 0, satFat: 0, cholesterol: 0, sodium: 1, potassium: 0, calcium: 2, magnesium: 1, vitB12: 0, vitD: 0, caffeine: 0 },
    },
    {
      id: "mineralwasser",
      name: "Mineralwasser (medium)",
      isLiquid: true,
      portions: [["1 Glas (250 ml)", 250], ["1 Flasche (500 ml)", 500], ["1 Flasche (700 ml)", 700]],
      n: { energy: 0, water: 100, alcohol: 0, protein: 0, carbs: 0, sugar: 0, fiber: 0, fat: 0, satFat: 0, cholesterol: 0, sodium: 12, potassium: 2, calcium: 35, magnesium: 12, chloride: 15, fluoride: 0.02, vitB12: 0, vitD: 0, caffeine: 0 },
    },
    {
      id: "apfelsaft",
      name: "Apfelsaft",
      isLiquid: true,
      portions: [["1 Glas (200 ml)", 200], ["1 Glas Schorle-Anteil (100 ml)", 100]],
      n: { energy: 46, water: 88, alcohol: 0, protein: 0.1, carbs: 11.3, sugar: 9.6, fiber: 0.2, fat: 0.1, satFat: 0.02, monoFat: 0.01, polyFat: 0.03, cholesterol: 0, potassium: 101, calcium: 8, iron: 0.1, magnesium: 5, phosphorus: 7, sodium: 4, zinc: 0.02, copper: 0.01, manganese: 0.1, selenium: 0, vitA: 0, vitB1: 0.02, vitB2: 0.02, vitB3: 0.1, vitB5: 0.05, vitB6: 0.02, vitB9: 0, vitB12: 0, vitC: 1, vitD: 0, vitE: 0.01, vitK: 0.1, caffeine: 0 },
    },
    {
      id: "orangensaft",
      name: "Orangensaft",
      isLiquid: true,
      portions: [["1 Glas (200 ml)", 200], ["1 kleines Glas (125 ml)", 125]],
      n: { energy: 45, water: 88, alcohol: 0, protein: 0.7, carbs: 10.2, sugar: 8.4, fiber: 0.2, fat: 0.2, satFat: 0.02, monoFat: 0.03, polyFat: 0.04, cholesterol: 0, potassium: 200, calcium: 11, iron: 0.2, magnesium: 11, phosphorus: 17, sodium: 1, zinc: 0.05, copper: 0.04, manganese: 0.01, selenium: 0, vitA: 10, vitB1: 0.09, vitB2: 0.03, vitB3: 0.4, vitB5: 0.19, vitB6: 0.04, vitB9: 30, vitB12: 0, vitC: 50, vitD: 0, vitE: 0.04, caffeine: 0 },
    },
    {
      id: "cola",
      name: "Cola",
      isLiquid: true,
      portions: [["1 Glas (250 ml)", 250], ["1 Dose (330 ml)", 330], ["1 Flasche (500 ml)", 500]],
      n: { energy: 42, water: 89, alcohol: 0, protein: 0, carbs: 10.6, sugar: 10.6, fiber: 0, fat: 0, satFat: 0, cholesterol: 0, potassium: 2, calcium: 2, magnesium: 1, phosphorus: 15, sodium: 4, vitB12: 0, vitD: 0, caffeine: 10 },
    },
    {
      id: "kaffee",
      name: "Kaffee (schwarz)",
      isLiquid: true,
      portions: [["1 Tasse (200 ml)", 200], ["1 Becher (300 ml)", 300]],
      n: { energy: 2, water: 99, alcohol: 0, protein: 0.1, carbs: 0, sugar: 0, fiber: 0, fat: 0, satFat: 0, cholesterol: 0, potassium: 49, calcium: 2, iron: 0.01, magnesium: 3, phosphorus: 3, sodium: 2, zinc: 0.02, manganese: 0.02, vitB2: 0.08, vitB3: 0.7, vitB5: 0.1, vitB12: 0, vitD: 0, caffeine: 40 },
    },
    {
      id: "espresso",
      name: "Espresso",
      isLiquid: true,
      portions: [["1 Espresso (30 ml)", 30], ["1 doppelter Espresso (60 ml)", 60]],
      n: { energy: 9, water: 97, alcohol: 0, protein: 0.1, carbs: 1.5, sugar: 0, fiber: 0, fat: 0.2, satFat: 0.1, cholesterol: 0, potassium: 115, calcium: 2, iron: 0.1, magnesium: 80, phosphorus: 7, sodium: 14, zinc: 0.05, manganese: 0.05, vitB2: 0.18, vitB3: 5.2, vitB5: 0.2, vitB12: 0, vitD: 0, caffeine: 212 },
    },
    {
      id: "schwarzer-tee",
      name: "Schwarzer Tee",
      isLiquid: true,
      portions: [["1 Tasse (200 ml)", 200], ["1 Becher (300 ml)", 300]],
      n: { energy: 1, water: 100, alcohol: 0, protein: 0, carbs: 0.3, sugar: 0, fiber: 0, fat: 0, satFat: 0, cholesterol: 0, potassium: 37, calcium: 0, iron: 0.02, magnesium: 3, phosphorus: 1, sodium: 3, zinc: 0.02, manganese: 0.22, fluoride: 0.37, vitB2: 0.01, vitB3: 0.1, vitB12: 0, vitD: 0, caffeine: 20 },
    },
    {
      id: "gruener-tee",
      name: "Grüner Tee",
      isLiquid: true,
      portions: [["1 Tasse (200 ml)", 200], ["1 Becher (300 ml)", 300]],
      n: { energy: 1, water: 100, alcohol: 0, protein: 0.2, carbs: 0, sugar: 0, fiber: 0, fat: 0, satFat: 0, cholesterol: 0, potassium: 27, calcium: 0, iron: 0.02, magnesium: 1, phosphorus: 1, sodium: 1, zinc: 0.01, manganese: 0.18, fluoride: 0.3, vitB2: 0.06, vitB3: 0.03, vitB9: 5, vitB12: 0, vitC: 0.3, vitD: 0, caffeine: 12 },
    },
    {
      id: "bier-pils",
      name: "Bier (Pils)",
      isLiquid: true,
      portions: [["1 Flasche (330 ml)", 330], ["1 Glas (500 ml)", 500], ["1 kleines Glas (200 ml)", 200]],
      n: { energy: 42, water: 93, alcohol: 3.9, protein: 0.5, carbs: 3.2, sugar: 0.1, fiber: 0, fat: 0, satFat: 0, cholesterol: 0, potassium: 40, calcium: 4, iron: 0.02, magnesium: 7, phosphorus: 15, sodium: 4, zinc: 0.02, selenium: 1, vitB1: 0.01, vitB2: 0.03, vitB3: 0.6, vitB5: 0.04, vitB6: 0.05, vitB9: 6, vitB12: 0.02, vitD: 0, caffeine: 0 },
    },
    {
      id: "weisswein",
      name: "Weißwein (trocken)",
      isLiquid: true,
      portions: [["1 Glas (125 ml)", 125], ["1 Glas (200 ml)", 200]],
      n: { energy: 82, water: 86, alcohol: 10.3, protein: 0.1, carbs: 2.6, sugar: 1, fiber: 0, fat: 0, satFat: 0, cholesterol: 0, potassium: 71, calcium: 9, iron: 0.3, magnesium: 10, phosphorus: 18, sodium: 5, zinc: 0.12, copper: 0.01, manganese: 0.13, selenium: 0, vitB1: 0.01, vitB2: 0.01, vitB3: 0.1, vitB5: 0.05, vitB6: 0.04, vitB9: 0, vitB12: 0, vitD: 0, caffeine: 0 },
    },
    {
      id: "rotwein",
      name: "Rotwein (trocken)",
      isLiquid: true,
      portions: [["1 Glas (125 ml)", 125], ["1 Glas (200 ml)", 200]],
      n: { energy: 85, water: 86, alcohol: 10.6, protein: 0.1, carbs: 2.6, sugar: 0.6, fiber: 0, fat: 0, satFat: 0, cholesterol: 0, potassium: 127, calcium: 8, iron: 0.5, magnesium: 12, phosphorus: 23, sodium: 4, zinc: 0.14, copper: 0.01, manganese: 0.13, selenium: 0, vitB1: 0.01, vitB2: 0.03, vitB3: 0.2, vitB5: 0.03, vitB6: 0.06, vitB9: 1, vitB12: 0, vitD: 0, vitK: 0.4, caffeine: 0 },
    },
  ],
};
