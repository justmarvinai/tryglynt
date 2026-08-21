/**
 * Fleisch & Geflügel — Werte je 100 g, gegart (sofern nicht anders
 * benannt). Quellenbasis: USDA FoodData Central / BLS-typische Werte.
 * Wichtige B12-, Zink-, Eisen- und Selen-Quellen.
 */
import type { SeedCategoryFile } from "../types";

export const fleisch: SeedCategoryFile = {
  category: "fleisch",
  foods: [
    {
      id: "haehnchenbrust",
      name: "Hähnchenbrust (gebraten)",
      portions: [["1 Portion (150 g)", 150], ["1 Filet (180 g)", 180]],
      n: { energy: 165, water: 65, protein: 31, carbs: 0, sugar: 0, fiber: 0, fat: 3.6, satFat: 1, monoFat: 1.2, polyFat: 0.8, transFat: 0.02, omega3: 0.05, cholesterol: 85, potassium: 256, calcium: 15, iron: 1, magnesium: 29, phosphorus: 228, sodium: 74, zinc: 1, copper: 0.05, selenium: 27, iodine: 4, vitA: 9, vitB1: 0.07, vitB2: 0.11, vitB3: 13.7, vitB5: 1.5, vitB6: 0.6, vitB9: 4, vitB12: 0.3, vitD: 0.1, vitE: 0.3, vitK: 0.3, choline: 85 },
    },
    {
      id: "haehnchenschenkel",
      name: "Hähnchenschenkel (gebraten)",
      portions: [["1 Schenkel (110 g)", 110], ["1 Portion (150 g)", 150]],
      n: { energy: 209, water: 62, protein: 26, carbs: 0, sugar: 0, fiber: 0, fat: 11, satFat: 3, monoFat: 4.2, polyFat: 2.5, transFat: 0.06, omega3: 0.12, cholesterol: 135, potassium: 230, calcium: 12, iron: 1.3, magnesium: 23, phosphorus: 180, sodium: 88, zinc: 2.2, copper: 0.08, selenium: 22, iodine: 5, vitA: 25, vitB1: 0.07, vitB2: 0.22, vitB3: 6.2, vitB5: 1.2, vitB6: 0.34, vitB9: 8, vitB12: 0.6, vitD: 0.2, vitE: 0.3, choline: 78 },
    },
    {
      id: "putenbrust",
      name: "Putenbrust (gebraten)",
      portions: [["1 Portion (150 g)", 150], ["1 Schnitzel (120 g)", 120]],
      n: { energy: 147, water: 68, protein: 30, carbs: 0, sugar: 0, fiber: 0, fat: 2, satFat: 0.6, monoFat: 0.4, polyFat: 0.5, transFat: 0.01, omega3: 0.04, cholesterol: 70, potassium: 300, calcium: 12, iron: 1.1, magnesium: 30, phosphorus: 230, sodium: 60, zinc: 1.6, copper: 0.05, selenium: 30, iodine: 3, vitA: 3, vitB1: 0.05, vitB2: 0.13, vitB3: 11.8, vitB5: 0.9, vitB6: 0.6, vitB9: 6, vitB12: 0.4, vitD: 0.1, vitE: 0.1, choline: 80 },
    },
    {
      id: "rinderhack",
      name: "Rinderhackfleisch (gebraten)",
      portions: [["1 Portion (125 g)", 125], ["1 Frikadelle (80 g)", 80]],
      n: { energy: 254, water: 58, protein: 26, carbs: 0, sugar: 0, fiber: 0, fat: 17, satFat: 6.6, monoFat: 7.3, polyFat: 0.5, transFat: 0.8, omega3: 0.04, cholesterol: 88, potassium: 318, calcium: 24, iron: 2.6, magnesium: 21, phosphorus: 198, sodium: 78, zinc: 6.2, copper: 0.08, selenium: 21, iodine: 5, vitA: 3, vitB1: 0.05, vitB2: 0.19, vitB3: 5.4, vitB5: 0.6, vitB6: 0.35, vitB9: 9, vitB12: 2.6, vitD: 0.2, vitE: 0.4, choline: 82 },
    },
    {
      id: "rindersteak",
      name: "Rindersteak (gebraten)",
      portions: [["1 Steak (200 g)", 200], ["1 Portion (150 g)", 150]],
      n: { energy: 217, water: 60, protein: 30, carbs: 0, sugar: 0, fiber: 0, fat: 10.5, satFat: 4.1, monoFat: 4.5, polyFat: 0.4, transFat: 0.5, omega3: 0.03, cholesterol: 80, potassium: 350, calcium: 14, iron: 2.7, magnesium: 26, phosphorus: 230, sodium: 60, zinc: 5.5, copper: 0.09, selenium: 27, iodine: 4, vitB1: 0.08, vitB2: 0.2, vitB3: 6.5, vitB5: 0.7, vitB6: 0.5, vitB9: 8, vitB12: 2.4, vitD: 0.1, vitE: 0.4, choline: 90 },
    },
    {
      id: "schweinefilet",
      name: "Schweinefilet (gebraten)",
      portions: [["1 Portion (150 g)", 150], ["1 Medaillon (60 g)", 60]],
      n: { energy: 165, water: 66, protein: 30, carbs: 0, sugar: 0, fiber: 0, fat: 4.5, satFat: 1.5, monoFat: 1.8, polyFat: 0.5, transFat: 0.02, omega3: 0.02, cholesterol: 85, potassium: 420, calcium: 8, iron: 1, magnesium: 28, phosphorus: 260, sodium: 55, zinc: 2.2, copper: 0.09, selenium: 40, iodine: 3, vitB1: 0.9, vitB2: 0.36, vitB3: 8, vitB5: 0.9, vitB6: 0.6, vitB9: 3, vitB12: 0.6, vitD: 0.5, vitE: 0.2, choline: 95 },
    },
    {
      id: "schweineschnitzel-paniert",
      name: "Schweineschnitzel (paniert, gebraten)",
      portions: [["1 Schnitzel (150 g)", 150], ["1 Portion (180 g)", 180]],
      n: { energy: 290, water: 50, protein: 22, carbs: 14, sugar: 0.8, fiber: 0.8, fat: 16, satFat: 4.5, monoFat: 6.5, polyFat: 3.8, transFat: 0.2, omega3: 0.2, cholesterol: 85, potassium: 330, calcium: 30, iron: 1.4, magnesium: 27, phosphorus: 220, sodium: 350, zinc: 2, copper: 0.09, selenium: 30, iodine: 4, vitB1: 0.6, vitB2: 0.3, vitB3: 6, vitB5: 0.8, vitB6: 0.4, vitB9: 15, vitB12: 0.6, vitD: 0.4, vitE: 1.5, choline: 80 },
    },
    {
      id: "kochschinken",
      name: "Kochschinken",
      portions: [["1 Scheibe (25 g)", 25], ["1 Portion (50 g)", 50]],
      n: { energy: 107, water: 74, protein: 18, carbs: 0.8, sugar: 0.8, fiber: 0, fat: 3.5, satFat: 1.2, monoFat: 1.5, polyFat: 0.4, transFat: 0.02, cholesterol: 45, potassium: 300, calcium: 8, iron: 0.8, magnesium: 20, phosphorus: 230, sodium: 1100, zinc: 1.6, copper: 0.06, selenium: 25, iodine: 4, vitB1: 0.5, vitB2: 0.2, vitB3: 4.5, vitB5: 0.6, vitB6: 0.3, vitB9: 3, vitB12: 0.7, vitD: 0.6, vitE: 0.2, choline: 60 },
    },
    {
      id: "salami",
      name: "Salami",
      portions: [["1 Scheibe (10 g)", 10], ["1 Portion (30 g)", 30]],
      n: { energy: 407, water: 35, protein: 22, carbs: 1.2, sugar: 1, fiber: 0, fat: 35, satFat: 13, monoFat: 16, polyFat: 3.4, transFat: 0.5, omega3: 0.2, cholesterol: 79, potassium: 340, calcium: 12, iron: 1.5, magnesium: 20, phosphorus: 200, sodium: 1700, zinc: 3, copper: 0.1, selenium: 20, iodine: 4, vitB1: 0.3, vitB2: 0.25, vitB3: 4.5, vitB5: 0.7, vitB6: 0.35, vitB9: 2, vitB12: 1.6, vitD: 0.8, vitE: 0.3, choline: 65 },
    },
    {
      id: "bratwurst",
      name: "Bratwurst (gebraten)",
      portions: [["1 Bratwurst (100 g)", 100], ["1 Nürnberger (25 g)", 25]],
      n: { energy: 297, water: 52, protein: 13, carbs: 1.5, sugar: 0.8, fiber: 0, fat: 26, satFat: 9.5, monoFat: 12, polyFat: 2.8, transFat: 0.4, omega3: 0.2, cholesterol: 70, potassium: 220, calcium: 15, iron: 1.1, magnesium: 14, phosphorus: 140, sodium: 850, zinc: 1.9, copper: 0.07, selenium: 14, iodine: 4, vitB1: 0.3, vitB2: 0.2, vitB3: 2.8, vitB5: 0.5, vitB6: 0.2, vitB9: 2, vitB12: 1, vitD: 0.7, vitE: 0.3, choline: 60 },
    },
    {
      id: "leberwurst",
      name: "Leberwurst",
      portions: [["1 Portion Brotaufstrich (20 g)", 20], ["1 Scheibe (15 g)", 15]],
      n: { energy: 326, water: 50, protein: 14, carbs: 2.2, sugar: 0.5, fiber: 0, fat: 29, satFat: 10.6, monoFat: 13, polyFat: 3, transFat: 0.4, omega3: 0.2, cholesterol: 158, potassium: 170, calcium: 20, iron: 5.4, magnesium: 12, phosphorus: 240, sodium: 860, zinc: 2.4, copper: 0.4, selenium: 25, iodine: 6, vitA: 4220, vitB1: 0.15, vitB2: 1.2, vitB3: 6, vitB5: 4, vitB6: 0.2, vitB7: 30, vitB9: 90, vitB12: 12, vitC: 3, vitD: 0.6, vitE: 0.4, choline: 190 },
    },
    {
      id: "rinderleber",
      name: "Rinderleber (gebraten)",
      portions: [["1 Portion (125 g)", 125], ["1 Scheibe (80 g)", 80]],
      n: { energy: 175, water: 63, protein: 27, carbs: 5.1, sugar: 0, fiber: 0, fat: 4.9, satFat: 1.7, monoFat: 0.7, polyFat: 0.9, transFat: 0.1, omega3: 0.06, cholesterol: 396, potassium: 313, calcium: 6, iron: 6.2, magnesium: 21, phosphorus: 497, sodium: 78, zinc: 5.2, copper: 14.3, manganese: 0.4, selenium: 36, iodine: 8, vitA: 9440, vitB1: 0.19, vitB2: 3.4, vitB3: 17.5, vitB5: 7.2, vitB6: 1.1, vitB7: 42, vitB9: 253, vitB12: 70, vitC: 1.9, vitD: 1.2, vitE: 0.5, vitK: 3.1, choline: 426 },
    },
    {
      id: "lammkotelett",
      name: "Lammkotelett (gebraten)",
      portions: [["1 Kotelett (90 g)", 90], ["1 Portion (150 g)", 150]],
      n: { energy: 282, water: 55, protein: 25, carbs: 0, sugar: 0, fiber: 0, fat: 20, satFat: 8.8, monoFat: 8.3, polyFat: 1.5, transFat: 0.8, omega3: 0.3, cholesterol: 97, potassium: 310, calcium: 17, iron: 1.9, magnesium: 24, phosphorus: 200, sodium: 72, zinc: 4.5, copper: 0.11, selenium: 25, iodine: 3, vitB1: 0.13, vitB2: 0.25, vitB3: 6.5, vitB5: 0.7, vitB6: 0.13, vitB9: 18, vitB12: 2.6, vitD: 0.3, vitE: 0.2, choline: 90 },
    },
  ],
};
