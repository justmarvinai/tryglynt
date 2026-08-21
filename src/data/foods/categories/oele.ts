/**
 * Öle & Fette — Werte je 100 g. Quellenbasis: USDA FoodData Central /
 * BLS-typische Referenzwerte. Wichtige Vitamin-E- und Omega-3-Quellen.
 */
import type { SeedCategoryFile } from "../types";

export const oele: SeedCategoryFile = {
  category: "oele",
  foods: [
    {
      id: "olivenoel",
      name: "Olivenöl (nativ extra)",
      portions: [["1 EL (10 g)", 10], ["1 TL (5 g)", 5]],
      n: { energy: 884, water: 0, protein: 0, carbs: 0, sugar: 0, fiber: 0, fat: 100, satFat: 13.8, monoFat: 73, polyFat: 10.5, transFat: 0, omega3: 0.76, cholesterol: 0, iron: 0.6, sodium: 2, vitB12: 0, vitD: 0, vitE: 14.4, vitK: 60.2 },
    },
    {
      id: "rapsoel",
      name: "Rapsöl",
      portions: [["1 EL (10 g)", 10], ["1 TL (5 g)", 5]],
      n: { energy: 884, water: 0, protein: 0, carbs: 0, sugar: 0, fiber: 0, fat: 100, satFat: 7.4, monoFat: 63.3, polyFat: 28.1, transFat: 0.4, omega3: 9.1, cholesterol: 0, sodium: 0, vitB12: 0, vitD: 0, vitE: 17.5, vitK: 71.3 },
    },
    {
      id: "sonnenblumenoel",
      name: "Sonnenblumenöl",
      portions: [["1 EL (10 g)", 10], ["1 TL (5 g)", 5]],
      n: { energy: 884, water: 0, protein: 0, carbs: 0, sugar: 0, fiber: 0, fat: 100, satFat: 10.3, monoFat: 19.5, polyFat: 65.7, transFat: 0, omega3: 0.2, cholesterol: 0, sodium: 0, vitB12: 0, vitD: 0, vitE: 41.1, vitK: 5.4 },
    },
    {
      id: "leinoel",
      name: "Leinöl",
      portions: [["1 EL (10 g)", 10], ["1 TL (5 g)", 5]],
      n: { energy: 884, water: 0, protein: 0, carbs: 0, sugar: 0, fiber: 0, fat: 100, satFat: 8.9, monoFat: 18.4, polyFat: 67.8, transFat: 0, omega3: 53.3, cholesterol: 0, sodium: 0, vitB12: 0, vitD: 0, vitE: 0.5, vitK: 9.3 },
    },
    {
      id: "kokosoel",
      name: "Kokosöl",
      portions: [["1 EL (10 g)", 10], ["1 TL (5 g)", 5]],
      n: { energy: 862, water: 0.03, protein: 0, carbs: 0, sugar: 0, fiber: 0, fat: 100, satFat: 82.5, monoFat: 6.3, polyFat: 1.7, transFat: 0, cholesterol: 0, sodium: 0, vitB12: 0, vitD: 0, vitE: 0.1, vitK: 0.6 },
    },
    {
      id: "margarine",
      name: "Margarine",
      portions: [["1 TL (5 g)", 5], ["1 EL (15 g)", 15], ["1 Portion Brotaufstrich", 10]],
      n: { energy: 717, water: 16, protein: 0.2, carbs: 0.7, sugar: 0.7, fiber: 0, fat: 80, satFat: 16, monoFat: 35, polyFat: 25, transFat: 1, omega3: 2, cholesterol: 0, sodium: 700, potassium: 18, calcium: 3, vitA: 800, vitB12: 0, vitD: 7.5, vitE: 20, vitK: 93 },
    },
    {
      id: "butterschmalz",
      name: "Butterschmalz",
      portions: [["1 EL (15 g)", 15], ["1 TL (5 g)", 5]],
      n: { energy: 900, water: 0.2, protein: 0.3, carbs: 0, sugar: 0, fiber: 0, fat: 99.8, satFat: 62, monoFat: 29, polyFat: 3.7, transFat: 4, omega3: 0.3, cholesterol: 256, sodium: 2, calcium: 4, vitA: 840, vitB12: 0.01, vitD: 1.5, vitE: 2.8, vitK: 8.6 },
    },
  ],
};
