/**
 * Getreide & Beilagen — Werte je 100 g essbarer Anteil (gekocht, wo
 * benannt). Quellenbasis: USDA FoodData Central / BLS-typische
 * Referenzwerte. Fehlender Wert = keine Daten (nicht 0!).
 */
import type { SeedCategoryFile } from "../types";

export const getreide: SeedCategoryFile = {
  category: "getreide",
  foods: [
    {
      id: "haferflocken",
      name: "Haferflocken (zart)",
      portions: [["1 Portion (50 g)", 50], ["1 EL", 10]],
      n: { energy: 372, water: 10.0, alcohol: 0, protein: 13.5, carbs: 58.7, sugar: 0.7, fiber: 10.0, fat: 7.0, satFat: 1.2, monoFat: 2.2, polyFat: 2.5, transFat: 0, omega3: 0.11, cholesterol: 0, potassium: 362, calcium: 52, iron: 4.3, magnesium: 138, phosphorus: 410, sodium: 6, zinc: 3.6, copper: 0.39, manganese: 3.6, selenium: 29, vitA: 0, vitB1: 0.46, vitB2: 0.16, vitB3: 1.1, vitB5: 1.1, vitB6: 0.1, vitB7: 20, vitB9: 32, vitB12: 0, vitC: 0, vitD: 0, vitE: 0.4, vitK: 2.0, choline: 40.4 },
    },
    {
      id: "reis-weiss",
      name: "Reis, weiß (gekocht)",
      portions: [["1 Portion (180 g)", 180], ["1 kleine Portion (125 g)", 125]],
      n: { energy: 130, water: 68.4, alcohol: 0, protein: 2.7, carbs: 27.8, sugar: 0.1, fiber: 0.4, fat: 0.3, satFat: 0.08, monoFat: 0.09, polyFat: 0.08, transFat: 0, omega3: 0.01, cholesterol: 0, potassium: 35, calcium: 10, iron: 0.2, magnesium: 12, phosphorus: 43, sodium: 1, zinc: 0.49, copper: 0.07, manganese: 0.47, selenium: 8, vitA: 0, vitB1: 0.02, vitB2: 0.01, vitB3: 0.4, vitB5: 0.39, vitB6: 0.09, vitB9: 3, vitB12: 0, vitC: 0, vitD: 0, vitE: 0, vitK: 0, choline: 2.1 },
    },
    {
      id: "reis-vollkorn",
      name: "Reis, Vollkorn (gekocht)",
      portions: [["1 Portion (180 g)", 180], ["1 kleine Portion (125 g)", 125]],
      n: { energy: 123, water: 70.3, alcohol: 0, protein: 2.7, carbs: 24.0, sugar: 0.2, fiber: 1.6, fat: 1.0, satFat: 0.26, monoFat: 0.36, polyFat: 0.35, transFat: 0, omega3: 0.01, cholesterol: 0, potassium: 86, calcium: 3, iron: 0.6, magnesium: 39, phosphorus: 103, sodium: 4, zinc: 0.71, copper: 0.11, manganese: 0.97, selenium: 6, vitA: 0, vitB1: 0.18, vitB2: 0.07, vitB3: 2.6, vitB5: 0.38, vitB6: 0.12, vitB9: 9, vitB12: 0, vitC: 0, vitD: 0, vitE: 0.2, vitK: 0.2, choline: 9.2 },
    },
    {
      id: "basmatireis",
      name: "Basmatireis (gekocht)",
      portions: [["1 Portion (180 g)", 180], ["1 kleine Portion (125 g)", 125]],
      n: { energy: 128, water: 69.0, alcohol: 0, protein: 2.6, carbs: 27.2, sugar: 0.1, fiber: 0.5, fat: 0.3, satFat: 0.08, monoFat: 0.09, polyFat: 0.08, transFat: 0, omega3: 0.01, cholesterol: 0, potassium: 40, calcium: 8, iron: 0.2, magnesium: 13, phosphorus: 45, sodium: 1, zinc: 0.45, copper: 0.07, manganese: 0.45, selenium: 8, vitA: 0, vitB1: 0.03, vitB2: 0.01, vitB3: 0.5, vitB5: 0.35, vitB6: 0.09, vitB9: 3, vitB12: 0, vitC: 0, vitD: 0, vitE: 0, vitK: 0, choline: 2.1 },
    },
    {
      id: "nudeln",
      name: "Nudeln (gekocht)",
      portions: [["1 Portion (200 g)", 200], ["1 kleine Portion (150 g)", 150]],
      n: { energy: 158, water: 62.1, alcohol: 0, protein: 5.8, carbs: 29.1, sugar: 0.6, fiber: 1.8, fat: 0.9, satFat: 0.18, monoFat: 0.13, polyFat: 0.32, transFat: 0, omega3: 0.01, cholesterol: 0, potassium: 44, calcium: 7, iron: 0.5, magnesium: 18, phosphorus: 58, sodium: 1, zinc: 0.51, copper: 0.1, manganese: 0.32, selenium: 26, vitA: 0, vitB1: 0.02, vitB2: 0.02, vitB3: 0.4, vitB5: 0.11, vitB6: 0.05, vitB9: 7, vitB12: 0, vitC: 0, vitD: 0, vitE: 0.1, vitK: 0, choline: 6.5 },
    },
    {
      id: "vollkornnudeln",
      name: "Vollkornnudeln (gekocht)",
      portions: [["1 Portion (200 g)", 200], ["1 kleine Portion (150 g)", 150]],
      n: { energy: 133, water: 64.0, alcohol: 0, protein: 5.5, carbs: 23.0, sugar: 0.8, fiber: 4.5, fat: 1.1, satFat: 0.2, monoFat: 0.15, polyFat: 0.45, transFat: 0, omega3: 0.02, cholesterol: 0, potassium: 62, calcium: 15, iron: 1.1, magnesium: 30, phosphorus: 89, sodium: 3, zinc: 0.81, copper: 0.14, manganese: 0.72, selenium: 26, vitA: 0, vitB1: 0.11, vitB2: 0.05, vitB3: 0.7, vitB5: 0.35, vitB6: 0.08, vitB9: 7, vitB12: 0, vitC: 0, vitD: 0, vitE: 0.2, vitK: 0.6, choline: 8.0 },
    },
    {
      id: "couscous",
      name: "Couscous (gekocht)",
      portions: [["1 Portion (180 g)", 180], ["1 Beilage (100 g)", 100]],
      n: { energy: 112, water: 72.6, alcohol: 0, protein: 3.8, carbs: 21.8, sugar: 0.1, fiber: 1.4, fat: 0.2, satFat: 0.03, monoFat: 0.02, polyFat: 0.06, transFat: 0, omega3: 0, cholesterol: 0, potassium: 58, calcium: 8, iron: 0.4, magnesium: 8, phosphorus: 22, sodium: 5, zinc: 0.26, copper: 0.04, manganese: 0.08, selenium: 28, vitA: 0, vitB1: 0.06, vitB2: 0.03, vitB3: 1.0, vitB5: 0.37, vitB6: 0.05, vitB9: 15, vitB12: 0, vitC: 0, vitD: 0, vitE: 0.1, vitK: 0.1, choline: 3.3 },
    },
    {
      id: "quinoa",
      name: "Quinoa (gekocht)",
      portions: [["1 Portion (180 g)", 180], ["1 Beilage (100 g)", 100]],
      n: { energy: 120, water: 71.6, alcohol: 0, protein: 4.4, carbs: 18.5, sugar: 0.9, fiber: 2.8, fat: 1.9, satFat: 0.23, monoFat: 0.53, polyFat: 1.08, transFat: 0, omega3: 0.09, cholesterol: 0, potassium: 172, calcium: 17, iron: 1.5, magnesium: 64, phosphorus: 152, sodium: 7, zinc: 1.1, copper: 0.19, manganese: 0.63, selenium: 3, vitA: 0, vitB1: 0.11, vitB2: 0.11, vitB3: 0.4, vitB6: 0.12, vitB9: 42, vitB12: 0, vitC: 0, vitD: 0, vitE: 0.6, vitK: 0, choline: 23.0 },
    },
    {
      id: "bulgur",
      name: "Bulgur (gekocht)",
      portions: [["1 Portion (180 g)", 180], ["1 Beilage (100 g)", 100]],
      n: { energy: 83, water: 77.8, alcohol: 0, protein: 3.1, carbs: 14.1, sugar: 0.1, fiber: 4.5, fat: 0.2, satFat: 0.04, monoFat: 0.03, polyFat: 0.1, transFat: 0, omega3: 0, cholesterol: 0, potassium: 68, calcium: 10, iron: 1.0, magnesium: 32, phosphorus: 40, sodium: 5, zinc: 0.57, copper: 0.08, manganese: 0.61, selenium: 1, vitA: 0, vitB1: 0.06, vitB2: 0.03, vitB3: 1.0, vitB5: 0.34, vitB6: 0.08, vitB9: 18, vitB12: 0, vitC: 0, vitD: 0, vitE: 0, vitK: 0.5, choline: 6.9 },
    },
    {
      id: "hirse",
      name: "Hirse (gekocht)",
      portions: [["1 Portion (180 g)", 180], ["1 Beilage (100 g)", 100]],
      n: { energy: 119, water: 71.4, alcohol: 0, protein: 3.5, carbs: 22.4, sugar: 0.1, fiber: 1.3, fat: 1.0, satFat: 0.17, monoFat: 0.18, polyFat: 0.51, transFat: 0, omega3: 0.01, cholesterol: 0, potassium: 62, calcium: 3, iron: 0.6, magnesium: 44, phosphorus: 100, sodium: 2, zinc: 0.91, copper: 0.16, manganese: 0.27, selenium: 1, vitA: 0, vitB1: 0.11, vitB2: 0.08, vitB3: 1.3, vitB5: 0.17, vitB6: 0.11, vitB9: 19, vitB12: 0, vitC: 0, vitD: 0, vitE: 0, vitK: 0.3, choline: 11.2 },
    },
    {
      id: "cornflakes",
      name: "Cornflakes",
      portions: [["1 Portion (30 g)", 30], ["1 Schüssel (50 g)", 50]],
      n: { energy: 375, water: 3.0, alcohol: 0, protein: 7.5, carbs: 80.0, sugar: 8.0, fiber: 3.0, fat: 0.9, satFat: 0.2, monoFat: 0.2, polyFat: 0.4, transFat: 0, cholesterol: 0, potassium: 120, calcium: 8, iron: 1.0, magnesium: 14, phosphorus: 50, sodium: 650, zinc: 0.4, copper: 0.05, manganese: 0.12, selenium: 5, vitA: 0, vitB1: 0.07, vitB2: 0.06, vitB3: 0.9, vitB6: 0.06, vitB9: 8, vitB12: 0, vitC: 0, vitD: 0, vitE: 0.2 },
    },
    {
      id: "muesli",
      name: "Müsli (ungesüßt)",
      portions: [["1 Portion (50 g)", 50], ["1 Schüssel (80 g)", 80]],
      n: { energy: 357, water: 8.0, alcohol: 0, protein: 10.5, carbs: 56.0, sugar: 4.5, fiber: 10.0, fat: 7.0, satFat: 1.2, monoFat: 2.5, polyFat: 2.8, transFat: 0, omega3: 0.15, cholesterol: 0, potassium: 400, calcium: 50, iron: 3.8, magnesium: 120, phosphorus: 350, sodium: 15, zinc: 2.8, copper: 0.4, manganese: 3.0, vitA: 0, vitB1: 0.35, vitB2: 0.15, vitB3: 2.0, vitB5: 1.0, vitB6: 0.15, vitB9: 40, vitB12: 0, vitC: 0.5, vitD: 0, vitE: 1.5, vitK: 2.0 },
    },
    {
      id: "dinkelflocken",
      name: "Dinkelflocken",
      portions: [["1 Portion (50 g)", 50], ["1 EL", 10]],
      n: { energy: 338, water: 11.0, alcohol: 0, protein: 14.6, carbs: 59.5, sugar: 6.8, fiber: 10.7, fat: 2.4, satFat: 0.41, monoFat: 0.45, polyFat: 1.26, transFat: 0, omega3: 0.1, cholesterol: 0, potassium: 388, calcium: 27, iron: 4.4, magnesium: 136, phosphorus: 401, sodium: 8, zinc: 3.3, copper: 0.51, manganese: 3.0, selenium: 12, vitA: 0, vitB1: 0.36, vitB2: 0.11, vitB3: 6.8, vitB5: 1.07, vitB6: 0.23, vitB9: 45, vitB12: 0, vitC: 0, vitD: 0, vitE: 0.8, vitK: 3.6, choline: 31.2 },
    },
    {
      id: "buchweizen",
      name: "Buchweizen (gekocht)",
      portions: [["1 Portion (180 g)", 180], ["1 Beilage (100 g)", 100]],
      n: { energy: 92, water: 75.6, alcohol: 0, protein: 3.4, carbs: 17.2, sugar: 0.9, fiber: 2.7, fat: 0.6, satFat: 0.13, monoFat: 0.19, polyFat: 0.19, transFat: 0, omega3: 0.02, cholesterol: 0, potassium: 88, calcium: 7, iron: 0.8, magnesium: 51, phosphorus: 70, sodium: 4, zinc: 0.61, copper: 0.15, manganese: 0.4, selenium: 2, vitA: 0, vitB1: 0.04, vitB2: 0.04, vitB3: 0.9, vitB5: 0.36, vitB6: 0.08, vitB9: 14, vitB12: 0, vitC: 0, vitD: 0, vitE: 0.1, vitK: 1.9, choline: 20.1 },
    },
  ],
};
