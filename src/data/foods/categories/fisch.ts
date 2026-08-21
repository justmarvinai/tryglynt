/**
 * Fisch & Meeresfrüchte — Werte je 100 g, gegart (sofern nicht anders
 * benannt). Quellenbasis: USDA FoodData Central / BLS-typische Werte.
 * Die wichtigsten Jod-, Vitamin-D- und Omega-3-Quellen.
 */
import type { SeedCategoryFile } from "../types";

export const fisch: SeedCategoryFile = {
  category: "fisch",
  foods: [
    {
      id: "lachs",
      name: "Lachs (gebraten)",
      portions: [["1 Filet (140 g)", 140], ["1 Portion (120 g)", 120]],
      n: { energy: 208, water: 64, protein: 22, carbs: 0, sugar: 0, fiber: 0, fat: 13, satFat: 3.1, monoFat: 3.8, polyFat: 3.9, transFat: 0.02, omega3: 2.3, cholesterol: 63, potassium: 384, calcium: 12, iron: 0.3, magnesium: 29, phosphorus: 240, sodium: 59, zinc: 0.4, copper: 0.05, selenium: 36, iodine: 30, vitA: 12, vitB1: 0.23, vitB2: 0.15, vitB3: 8.5, vitB5: 1.6, vitB6: 0.6, vitB9: 26, vitB12: 3.2, vitC: 3.9, vitD: 13, vitE: 3.6, vitK: 0.5, choline: 91 },
    },
    {
      id: "thunfisch-dose",
      name: "Thunfisch (Dose, in Wasser)",
      portions: [["1 Dose abgetropft (110 g)", 110], ["1 Portion (60 g)", 60]],
      n: { energy: 116, water: 74, protein: 26, carbs: 0, sugar: 0, fiber: 0, fat: 0.8, satFat: 0.2, monoFat: 0.1, polyFat: 0.3, omega3: 0.23, cholesterol: 36, potassium: 237, calcium: 11, iron: 1.3, magnesium: 28, phosphorus: 190, sodium: 320, zinc: 0.7, copper: 0.06, selenium: 68, iodine: 15, vitA: 6, vitB1: 0.03, vitB2: 0.08, vitB3: 13, vitB5: 0.3, vitB6: 0.32, vitB9: 4, vitB12: 2.5, vitD: 1.7, vitE: 0.4, choline: 65 },
    },
    {
      id: "forelle",
      name: "Forelle (gebraten)",
      portions: [["1 Filet (130 g)", 130], ["1 Portion (150 g)", 150]],
      n: { energy: 168, water: 68, protein: 24, carbs: 0, sugar: 0, fiber: 0, fat: 7.5, satFat: 2.1, monoFat: 2.5, polyFat: 2.3, omega3: 1.1, cholesterol: 69, potassium: 441, calcium: 51, iron: 0.4, magnesium: 32, phosphorus: 279, sodium: 61, zinc: 0.6, copper: 0.2, selenium: 15, iodine: 12, vitA: 17, vitB1: 0.14, vitB2: 0.11, vitB3: 6.1, vitB5: 1.5, vitB6: 0.29, vitB9: 15, vitB12: 5.4, vitC: 2.4, vitD: 15, vitE: 2.3, choline: 85 },
    },
    {
      id: "kabeljau",
      name: "Kabeljau (gebraten)",
      portions: [["1 Filet (150 g)", 150], ["1 Portion (120 g)", 120]],
      n: { energy: 105, water: 76, protein: 23, carbs: 0, sugar: 0, fiber: 0, fat: 0.9, satFat: 0.2, monoFat: 0.1, polyFat: 0.3, omega3: 0.2, cholesterol: 55, potassium: 244, calcium: 14, iron: 0.5, magnesium: 36, phosphorus: 205, sodium: 78, zinc: 0.6, copper: 0.04, selenium: 38, iodine: 155, vitA: 12, vitB1: 0.09, vitB2: 0.08, vitB3: 2.4, vitB5: 0.2, vitB6: 0.28, vitB9: 8, vitB12: 1.1, vitC: 1, vitD: 1.2, vitE: 0.7, choline: 80 },
    },
    {
      id: "matjes",
      name: "Hering (Matjes)",
      portions: [["1 Filet (80 g)", 80], ["1 Portion (100 g)", 100]],
      n: { energy: 262, water: 58, protein: 17, carbs: 0, sugar: 0, fiber: 0, fat: 21, satFat: 4.8, monoFat: 10.5, polyFat: 4.2, omega3: 2, cholesterol: 77, potassium: 300, calcium: 40, iron: 1.1, magnesium: 30, phosphorus: 230, sodium: 900, zinc: 0.9, copper: 0.1, selenium: 43, iodine: 40, vitA: 40, vitB1: 0.04, vitB2: 0.22, vitB3: 3.5, vitB5: 0.7, vitB6: 0.3, vitB9: 5, vitB12: 8.5, vitD: 12, vitE: 1.5, choline: 75 },
    },
    {
      id: "makrele-geraeuchert",
      name: "Makrele (geräuchert)",
      portions: [["1 Filet (100 g)", 100], ["1 Portion (80 g)", 80]],
      n: { energy: 288, water: 54, protein: 21, carbs: 0, sugar: 0, fiber: 0, fat: 23, satFat: 5.4, monoFat: 9, polyFat: 5.5, omega3: 2.7, cholesterol: 76, potassium: 380, calcium: 15, iron: 1, magnesium: 30, phosphorus: 240, sodium: 750, zinc: 0.9, copper: 0.08, selenium: 44, iodine: 55, vitA: 100, vitB1: 0.14, vitB2: 0.36, vitB3: 8, vitB5: 0.9, vitB6: 0.4, vitB9: 3, vitB12: 8, vitD: 8, vitE: 1.9, choline: 70 },
    },
    {
      id: "garnelen",
      name: "Garnelen (gegart)",
      portions: [["1 Portion (100 g)", 100], ["1 Garnele (12 g)", 12]],
      n: { energy: 99, water: 77, protein: 21, carbs: 0.2, sugar: 0, fiber: 0, fat: 1.4, satFat: 0.3, monoFat: 0.2, polyFat: 0.5, omega3: 0.32, cholesterol: 189, potassium: 259, calcium: 70, iron: 0.5, magnesium: 39, phosphorus: 237, sodium: 111, zinc: 1.6, copper: 0.2, selenium: 40, iodine: 40, vitA: 54, vitB1: 0.03, vitB2: 0.03, vitB3: 2.6, vitB5: 0.3, vitB6: 0.16, vitB9: 19, vitB12: 1.4, vitD: 0.1, vitE: 1.4, choline: 81 },
    },
    {
      id: "seelachs",
      name: "Seelachs (gebraten)",
      portions: [["1 Filet (150 g)", 150], ["1 Portion (120 g)", 120]],
      n: { energy: 111, water: 74, protein: 23, carbs: 0, sugar: 0, fiber: 0, fat: 1.4, satFat: 0.3, monoFat: 0.2, polyFat: 0.6, omega3: 0.45, cholesterol: 82, potassium: 440, calcium: 25, iron: 0.3, magnesium: 33, phosphorus: 250, sodium: 110, zinc: 0.5, copper: 0.05, selenium: 40, iodine: 200, vitA: 10, vitB1: 0.06, vitB2: 0.1, vitB3: 3.5, vitB5: 0.4, vitB6: 0.3, vitB9: 3, vitB12: 3.5, vitD: 1.3, vitE: 0.6, choline: 75 },
    },
    {
      id: "sardinen-dose",
      name: "Sardinen (Dose, in Öl)",
      portions: [["1 Dose abgetropft (90 g)", 90], ["1 Sardine (12 g)", 12]],
      n: { energy: 208, water: 60, protein: 25, carbs: 0, sugar: 0, fiber: 0, fat: 11, satFat: 1.5, monoFat: 3.9, polyFat: 5, omega3: 1.5, cholesterol: 142, potassium: 397, calcium: 382, iron: 2.9, magnesium: 39, phosphorus: 490, sodium: 505, zinc: 1.3, copper: 0.19, selenium: 53, iodine: 35, vitA: 32, vitB1: 0.08, vitB2: 0.23, vitB3: 5.2, vitB5: 0.6, vitB6: 0.17, vitB9: 10, vitB12: 8.9, vitD: 4.8, vitE: 2, vitK: 2.6, choline: 75 },
    },
    {
      id: "raeucherlachs",
      name: "Räucherlachs",
      portions: [["1 Scheibe (25 g)", 25], ["1 Portion (60 g)", 60]],
      n: { energy: 142, water: 72, protein: 18, carbs: 0, sugar: 0, fiber: 0, fat: 7.5, satFat: 1.6, monoFat: 3.5, polyFat: 1.7, omega3: 1.1, cholesterol: 23, potassium: 175, calcium: 11, iron: 0.9, magnesium: 18, phosphorus: 164, sodium: 1880, zinc: 0.3, copper: 0.06, selenium: 33, iodine: 25, vitA: 26, vitB1: 0.02, vitB2: 0.1, vitB3: 4.7, vitB5: 0.8, vitB6: 0.28, vitB9: 2, vitB12: 3.3, vitD: 17, vitE: 1.4, choline: 70 },
    },
  ],
};
