/**
 * Süßes & Snacks — Werte je 100 g. Quellenbasis: USDA FoodData Central /
 * BLS-typische Werte. Koffein in Schokolade ist real erfasst.
 */
import type { SeedCategoryFile } from "../types";

export const suesses: SeedCategoryFile = {
  category: "suesses",
  foods: [
    {
      id: "vollmilchschokolade",
      name: "Vollmilchschokolade",
      portions: [["1 Riegel (100 g)", 100], ["1 Reihe (20 g)", 20], ["1 Stück (5 g)", 5]],
      n: { energy: 535, water: 1.5, protein: 7.6, carbs: 57.9, sugar: 51.5, fiber: 3.4, fat: 29.7, satFat: 18.5, monoFat: 8.5, polyFat: 1.1, transFat: 0.1, omega3: 0.04, cholesterol: 23, potassium: 372, calcium: 189, iron: 2.4, magnesium: 63, phosphorus: 208, sodium: 79, zinc: 2.3, copper: 0.5, manganese: 0.5, selenium: 5, vitA: 65, vitB1: 0.11, vitB2: 0.3, vitB3: 0.4, vitB5: 0.5, vitB6: 0.04, vitB9: 11, vitB12: 0.8, vitC: 0, vitD: 0.1, vitE: 0.5, vitK: 5.7, choline: 46, caffeine: 20 },
    },
    {
      id: "zartbitterschokolade",
      name: "Zartbitterschokolade (70 %)",
      portions: [["1 Riegel (100 g)", 100], ["1 Reihe (20 g)", 20], ["1 Stück (5 g)", 5]],
      n: { energy: 598, water: 1, protein: 7.8, carbs: 34.2, sugar: 24, fiber: 10.9, fat: 42.6, satFat: 24.5, monoFat: 12.8, polyFat: 1.3, transFat: 0.03, omega3: 0.03, cholesterol: 3, potassium: 715, calcium: 73, iron: 11.9, magnesium: 228, phosphorus: 308, sodium: 20, zinc: 3.3, copper: 1.8, manganese: 1.9, selenium: 7, vitA: 2, vitB1: 0.03, vitB2: 0.08, vitB3: 1.1, vitB5: 0.4, vitB6: 0.04, vitB9: 12, vitB12: 0.3, vitD: 0, vitE: 0.6, vitK: 7.3, choline: 46, caffeine: 80 },
    },
    {
      id: "gummibaerchen",
      name: "Gummibärchen",
      portions: [["1 Tüte (100 g)", 100], ["1 Handvoll (25 g)", 25]],
      n: { energy: 343, water: 8, protein: 6.9, carbs: 77.2, sugar: 46.4, fiber: 0, fat: 0.2, satFat: 0.1, cholesterol: 0, potassium: 5, calcium: 2, iron: 0.2, magnesium: 2, phosphorus: 10, sodium: 25, zinc: 0.1, vitB12: 0, vitC: 0, vitD: 0, caffeine: 0 },
    },
    {
      id: "honig",
      name: "Honig",
      portions: [["1 TL (10 g)", 10], ["1 EL (20 g)", 20]],
      n: { energy: 304, water: 17, protein: 0.3, carbs: 82.1, sugar: 82.1, fiber: 0.2, fat: 0, satFat: 0, cholesterol: 0, potassium: 52, calcium: 6, iron: 0.4, magnesium: 2, phosphorus: 4, sodium: 4, zinc: 0.2, copper: 0.04, manganese: 0.08, selenium: 1, vitB2: 0.04, vitB3: 0.1, vitB5: 0.07, vitB6: 0.02, vitB9: 2, vitB12: 0, vitC: 0.5, vitD: 0, caffeine: 0 },
    },
    {
      id: "erdbeermarmelade",
      name: "Erdbeermarmelade",
      portions: [["1 TL (10 g)", 10], ["1 Portion Brotaufstrich (20 g)", 20]],
      n: { energy: 250, water: 35, protein: 0.4, carbs: 60, sugar: 50, fiber: 1, fat: 0.1, satFat: 0.01, cholesterol: 0, potassium: 77, calcium: 20, iron: 0.4, magnesium: 6, phosphorus: 12, sodium: 32, zinc: 0.06, manganese: 0.1, vitB1: 0.01, vitB2: 0.03, vitB3: 0.2, vitB6: 0.02, vitB9: 7, vitB12: 0, vitC: 3, vitD: 0, vitE: 0.1, caffeine: 0 },
    },
    {
      id: "nuss-nougat-creme",
      name: "Nuss-Nougat-Creme",
      portions: [["1 TL (10 g)", 10], ["1 Portion Brotaufstrich (20 g)", 20]],
      n: { energy: 539, water: 1, protein: 6.3, carbs: 56.8, sugar: 56.3, fiber: 3.4, fat: 30.9, satFat: 10.6, monoFat: 16.4, polyFat: 3.2, transFat: 0.1, omega3: 0.1, cholesterol: 1, potassium: 407, calcium: 108, iron: 4.4, magnesium: 64, phosphorus: 156, sodium: 41, zinc: 1.3, copper: 0.5, manganese: 1.1, selenium: 3, vitA: 8, vitB1: 0.06, vitB2: 0.16, vitB3: 0.7, vitB5: 0.4, vitB6: 0.06, vitB9: 15, vitB12: 0.2, vitD: 0, vitE: 6.5, caffeine: 5 },
    },
    {
      id: "butterkekse",
      name: "Butterkekse",
      portions: [["1 Keks (6 g)", 6], ["1 Portion (30 g)", 30]],
      n: { energy: 460, water: 3, protein: 6.5, carbs: 72, sugar: 22, fiber: 2, fat: 15, satFat: 8.5, monoFat: 4.5, polyFat: 1.2, transFat: 0.3, omega3: 0.1, cholesterol: 35, potassium: 120, calcium: 45, iron: 1.5, magnesium: 15, phosphorus: 90, sodium: 380, zinc: 0.6, copper: 0.1, manganese: 0.4, selenium: 10, vitA: 90, vitB1: 0.2, vitB2: 0.15, vitB3: 1.5, vitB6: 0.05, vitB9: 20, vitB12: 0.1, vitD: 0.2, vitE: 0.8, caffeine: 0 },
    },
    {
      id: "salzstangen",
      name: "Salzstangen",
      portions: [["1 Handvoll (30 g)", 30], ["1 Tüte (75 g)", 75]],
      n: { energy: 380, water: 3, protein: 10, carbs: 76, sugar: 2.5, fiber: 3, fat: 3.5, satFat: 0.6, monoFat: 1.2, polyFat: 1.4, transFat: 0.05, omega3: 0.1, cholesterol: 0, potassium: 160, calcium: 25, iron: 3.5, magnesium: 25, phosphorus: 105, sodium: 1400, zinc: 0.8, copper: 0.15, manganese: 0.6, selenium: 25, vitB1: 0.4, vitB2: 0.3, vitB3: 4, vitB6: 0.06, vitB9: 130, vitB12: 0, vitD: 0, vitE: 0.4, caffeine: 0 },
    },
    {
      id: "kartoffelchips",
      name: "Kartoffelchips (Paprika)",
      portions: [["1 Handvoll (30 g)", 30], ["1 Tüte (175 g)", 175]],
      n: { energy: 539, water: 2, protein: 6.2, carbs: 49.7, sugar: 2.5, fiber: 4.4, fat: 34.6, satFat: 3.4, monoFat: 8.5, polyFat: 21, transFat: 0.1, omega3: 0.3, cholesterol: 0, potassium: 1230, calcium: 30, iron: 1.6, magnesium: 67, phosphorus: 165, sodium: 525, zinc: 1, copper: 0.4, manganese: 0.4, selenium: 8, vitA: 15, vitB1: 0.2, vitB2: 0.2, vitB3: 4.2, vitB5: 0.7, vitB6: 0.7, vitB9: 45, vitB12: 0, vitC: 15, vitD: 0, vitE: 7, vitK: 15, caffeine: 0 },
    },
    {
      id: "vanilleeis",
      name: "Vanilleeis",
      portions: [["1 Kugel (50 g)", 50], ["1 Portion (100 g)", 100]],
      n: { energy: 207, water: 61, protein: 3.5, carbs: 23.6, sugar: 21.2, fiber: 0.7, fat: 11, satFat: 6.8, monoFat: 3, polyFat: 0.5, transFat: 0.4, omega3: 0.08, cholesterol: 44, potassium: 199, calcium: 128, iron: 0.1, magnesium: 14, phosphorus: 105, sodium: 80, zinc: 0.7, copper: 0.03, selenium: 2, iodine: 12, vitA: 118, vitB1: 0.04, vitB2: 0.24, vitB3: 0.1, vitB5: 0.6, vitB6: 0.05, vitB9: 5, vitB12: 0.4, vitC: 0.6, vitD: 0.2, vitE: 0.3, vitK: 0.3, choline: 26, caffeine: 0 },
    },
  ],
};
