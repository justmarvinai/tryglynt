/**
 * Brot & Backwaren — Werte je 100 g essbarer Anteil. Quellenbasis:
 * USDA FoodData Central / BLS-typische Referenzwerte (deutsche
 * Rezepturen, unangereichertes Mehl). Fehlender Wert = keine Daten
 * (nicht 0!).
 */
import type { SeedCategoryFile } from "../types";

export const brot: SeedCategoryFile = {
  category: "brot",
  foods: [
    {
      id: "vollkornbrot",
      name: "Vollkornbrot",
      portions: [["1 Scheibe", 45], ["1/2 Scheibe", 23], ["2 Scheiben", 90]],
      n: { energy: 211, water: 41.0, alcohol: 0, protein: 7.8, carbs: 37.0, sugar: 2.5, fiber: 8.0, fat: 1.8, satFat: 0.3, monoFat: 0.3, polyFat: 0.8, transFat: 0, omega3: 0.06, cholesterol: 0, potassium: 250, calcium: 45, iron: 2.5, magnesium: 60, phosphorus: 190, sodium: 500, zinc: 1.5, copper: 0.25, manganese: 1.7, selenium: 25, vitA: 0, vitB1: 0.25, vitB2: 0.15, vitB3: 3.0, vitB5: 0.6, vitB6: 0.18, vitB9: 40, vitB12: 0, vitC: 0, vitD: 0, vitE: 0.5, vitK: 1.5, choline: 27.2 },
    },
    {
      id: "roggenmischbrot",
      name: "Roggenmischbrot",
      portions: [["1 Scheibe", 45], ["1/2 Scheibe", 23], ["2 Scheiben", 90]],
      n: { energy: 215, water: 38.5, alcohol: 0, protein: 6.5, carbs: 42.0, sugar: 1.5, fiber: 6.0, fat: 1.0, satFat: 0.2, monoFat: 0.2, polyFat: 0.4, transFat: 0, omega3: 0.03, cholesterol: 0, potassium: 190, calcium: 30, iron: 1.3, magnesium: 35, phosphorus: 130, sodium: 530, zinc: 1.0, copper: 0.18, manganese: 0.8, selenium: 15, vitA: 0, vitB1: 0.15, vitB2: 0.08, vitB3: 1.3, vitB5: 0.4, vitB6: 0.1, vitB9: 20, vitB12: 0, vitC: 0, vitD: 0, vitE: 0.3, vitK: 1.2, choline: 14.6 },
    },
    {
      id: "weizenbroetchen",
      name: "Weizenbrötchen",
      portions: [["1 Brötchen", 60], ["1/2 Brötchen", 30]],
      n: { energy: 265, water: 31.0, alcohol: 0, protein: 8.5, carbs: 52.0, sugar: 2.0, fiber: 3.2, fat: 1.5, satFat: 0.3, monoFat: 0.2, polyFat: 0.6, transFat: 0, omega3: 0.02, cholesterol: 0, potassium: 130, calcium: 25, iron: 1.2, magnesium: 22, phosphorus: 90, sodium: 500, zinc: 0.8, copper: 0.12, manganese: 0.5, selenium: 20, vitA: 0, vitB1: 0.1, vitB2: 0.08, vitB3: 1.2, vitB5: 0.4, vitB6: 0.06, vitB9: 15, vitB12: 0, vitC: 0, vitD: 0, vitE: 0.3, vitK: 0.5, choline: 14.6 },
    },
    {
      id: "vollkornbroetchen",
      name: "Vollkornbrötchen",
      portions: [["1 Brötchen", 60], ["1/2 Brötchen", 30]],
      n: { energy: 240, water: 35.0, alcohol: 0, protein: 9.5, carbs: 41.0, sugar: 2.0, fiber: 7.0, fat: 2.5, satFat: 0.4, monoFat: 0.5, polyFat: 1.1, transFat: 0, omega3: 0.08, cholesterol: 0, potassium: 240, calcium: 50, iron: 2.4, magnesium: 55, phosphorus: 180, sodium: 480, zinc: 1.5, copper: 0.22, manganese: 1.6, selenium: 24, vitA: 0, vitB1: 0.22, vitB2: 0.12, vitB3: 2.8, vitB5: 0.55, vitB6: 0.15, vitB9: 35, vitB12: 0, vitC: 0, vitD: 0, vitE: 0.6, vitK: 1.5, choline: 25.0 },
    },
    {
      id: "toastbrot",
      name: "Toastbrot (Weizen)",
      portions: [["1 Scheibe", 25], ["2 Scheiben", 50]],
      n: { energy: 265, water: 33.0, alcohol: 0, protein: 7.9, carbs: 47.5, sugar: 3.7, fiber: 3.1, fat: 3.8, satFat: 0.5, monoFat: 1.2, polyFat: 1.5, transFat: 0, omega3: 0.15, cholesterol: 0, potassium: 120, calcium: 30, iron: 1.1, magnesium: 20, phosphorus: 85, sodium: 470, zinc: 0.7, copper: 0.1, manganese: 0.5, selenium: 18, vitA: 0, vitB1: 0.1, vitB2: 0.07, vitB3: 1.1, vitB5: 0.4, vitB6: 0.05, vitB9: 20, vitB12: 0, vitC: 0, vitD: 0, vitE: 0.8, vitK: 1.0, choline: 15.0 },
    },
    {
      id: "vollkorntoast",
      name: "Vollkorntoast",
      portions: [["1 Scheibe", 25], ["2 Scheiben", 50]],
      n: { energy: 244, water: 36.0, alcohol: 0, protein: 9.0, carbs: 41.0, sugar: 3.5, fiber: 6.0, fat: 3.5, satFat: 0.5, monoFat: 1.1, polyFat: 1.4, transFat: 0, omega3: 0.15, cholesterol: 0, potassium: 220, calcium: 45, iron: 2.2, magnesium: 50, phosphorus: 160, sodium: 460, zinc: 1.3, copper: 0.2, manganese: 1.4, selenium: 22, vitA: 0, vitB1: 0.2, vitB2: 0.1, vitB3: 2.5, vitB5: 0.5, vitB6: 0.12, vitB9: 30, vitB12: 0, vitC: 0, vitD: 0, vitE: 0.9, vitK: 2.0, choline: 22.0 },
    },
    {
      id: "pumpernickel",
      name: "Pumpernickel",
      portions: [["1 Scheibe", 45], ["2 Scheiben", 90]],
      n: { energy: 184, water: 44.0, alcohol: 0, protein: 4.9, carbs: 34.0, sugar: 5.0, fiber: 9.0, fat: 1.2, satFat: 0.2, monoFat: 0.2, polyFat: 0.5, transFat: 0, omega3: 0.04, cholesterol: 0, potassium: 220, calcium: 25, iron: 1.5, magnesium: 45, phosphorus: 130, sodium: 430, zinc: 1.2, copper: 0.2, manganese: 1.0, selenium: 10, vitA: 0, vitB1: 0.12, vitB2: 0.08, vitB3: 1.0, vitB5: 0.4, vitB6: 0.1, vitB9: 20, vitB12: 0, vitC: 0, vitD: 0, vitE: 0.3, vitK: 1.0, choline: 15.2 },
    },
    {
      id: "knaeckebrot",
      name: "Knäckebrot (Roggen)",
      portions: [["1 Scheibe", 25], ["2 Scheiben", 50]],
      n: { energy: 338, water: 6.0, alcohol: 0, protein: 10.0, carbs: 58.0, sugar: 1.5, fiber: 21.0, fat: 1.7, satFat: 0.3, monoFat: 0.3, polyFat: 0.9, transFat: 0, omega3: 0.08, cholesterol: 0, potassium: 320, calcium: 30, iron: 2.4, magnesium: 78, phosphorus: 270, sodium: 520, zinc: 2.3, copper: 0.34, manganese: 1.8, selenium: 5, vitA: 0, vitB1: 0.23, vitB2: 0.14, vitB3: 1.5, vitB5: 0.6, vitB6: 0.15, vitB9: 25, vitB12: 0, vitC: 0, vitD: 0, vitE: 0.5 },
    },
    {
      id: "laugenbrezel",
      name: "Laugenbrezel",
      portions: [["1 Brezel", 85], ["1 kleine Brezel", 60]],
      n: { energy: 316, water: 30.0, alcohol: 0, protein: 9.0, carbs: 58.0, sugar: 1.5, fiber: 3.0, fat: 3.5, satFat: 1.2, monoFat: 1.2, polyFat: 0.7, potassium: 140, calcium: 20, iron: 1.3, magnesium: 25, phosphorus: 95, sodium: 1100, zinc: 0.8, copper: 0.12, manganese: 0.55, selenium: 20, vitB1: 0.15, vitB2: 0.1, vitB3: 1.3, vitB5: 0.4, vitB6: 0.05, vitB9: 15, vitC: 0, vitE: 0.3 },
    },
    {
      id: "croissant",
      name: "Croissant",
      portions: [["1 Croissant", 60], ["1 Mini-Croissant", 35]],
      n: { energy: 406, water: 23.2, alcohol: 0, protein: 8.2, carbs: 43.2, sugar: 11.3, fiber: 2.6, fat: 21.0, satFat: 11.7, monoFat: 5.5, polyFat: 1.08, transFat: 0.3, omega3: 0.1, cholesterol: 67, potassium: 118, calcium: 37, iron: 1.0, magnesium: 16, phosphorus: 105, sodium: 424, zinc: 0.75, copper: 0.06, selenium: 23, vitA: 117, vitB1: 0.1, vitB2: 0.15, vitB3: 1.2, vitB5: 0.5, vitB6: 0.03, vitB9: 30, vitB12: 0.2, vitC: 0, vitE: 0.8, vitK: 1.9 },
    },
  ],
};
