/**
 * Milchprodukte & Eier — Werte je 100 g (Flüssiges je 100 ml).
 * Quellenbasis: USDA FoodData Central / BLS-typische Referenzwerte.
 * Wichtige Jod-, Calcium-, B2- und B12-Quellen im deutschen Markt.
 */
import type { SeedCategoryFile } from "../types";

export const milchEier: SeedCategoryFile = {
  category: "milch-eier",
  foods: [
    {
      id: "vollmilch",
      name: "Vollmilch (3,5 %)",
      isLiquid: true,
      portions: [["1 Glas (200 ml)", 200], ["1 Schuss (30 ml)", 30], ["1 Tasse (250 ml)", 250]],
      n: { energy: 64, water: 88, protein: 3.3, carbs: 4.7, sugar: 4.7, fiber: 0, fat: 3.6, satFat: 2.1, monoFat: 1, polyFat: 0.15, transFat: 0.12, omega3: 0.02, cholesterol: 14, potassium: 150, calcium: 120, iron: 0.05, magnesium: 12, phosphorus: 93, sodium: 44, zinc: 0.4, copper: 0.01, selenium: 4, iodine: 15, vitA: 46, vitB1: 0.04, vitB2: 0.18, vitB3: 0.1, vitB5: 0.36, vitB6: 0.04, vitB7: 3, vitB9: 5, vitB12: 0.4, vitC: 1.5, vitD: 0.09, vitE: 0.1, vitK: 0.3, choline: 17 },
    },
    {
      id: "fettarme-milch",
      name: "Fettarme Milch (1,5 %)",
      isLiquid: true,
      portions: [["1 Glas (200 ml)", 200], ["1 Schuss (30 ml)", 30]],
      n: { energy: 47, water: 89.5, protein: 3.4, carbs: 4.8, sugar: 4.8, fiber: 0, fat: 1.5, satFat: 0.9, monoFat: 0.4, polyFat: 0.06, transFat: 0.05, omega3: 0.01, cholesterol: 6, potassium: 155, calcium: 122, iron: 0.05, magnesium: 12, phosphorus: 95, sodium: 45, zinc: 0.4, selenium: 4, iodine: 15, vitA: 20, vitB1: 0.04, vitB2: 0.18, vitB3: 0.1, vitB5: 0.36, vitB6: 0.04, vitB7: 3, vitB9: 5, vitB12: 0.4, vitC: 1.5, vitD: 0.05, vitE: 0.03, vitK: 0.2, choline: 17 },
    },
    {
      id: "magerquark",
      name: "Magerquark",
      portions: [["1 Portion (250 g)", 250], ["1 EL", 30]],
      n: { energy: 67, water: 82, protein: 12, carbs: 4, sugar: 4, fiber: 0, fat: 0.3, satFat: 0.2, monoFat: 0.08, polyFat: 0.01, cholesterol: 1, potassium: 130, calcium: 92, iron: 0.1, magnesium: 11, phosphorus: 160, sodium: 40, zinc: 0.5, selenium: 8, iodine: 4, vitA: 1, vitB1: 0.04, vitB2: 0.3, vitB3: 0.1, vitB5: 0.4, vitB6: 0.07, vitB9: 15, vitB12: 0.8, vitC: 1, vitD: 0, vitE: 0, choline: 17 },
    },
    {
      id: "speisequark-20",
      name: "Speisequark (20 % Fett i. Tr.)",
      portions: [["1 Portion (250 g)", 250], ["1 EL", 30]],
      n: { energy: 109, water: 76, protein: 11, carbs: 3.2, sugar: 3.2, fiber: 0, fat: 5.1, satFat: 3.2, monoFat: 1.4, polyFat: 0.15, transFat: 0.17, cholesterol: 20, potassium: 120, calcium: 85, iron: 0.1, magnesium: 10, phosphorus: 150, sodium: 40, zinc: 0.5, selenium: 8, iodine: 4, vitA: 60, vitB1: 0.04, vitB2: 0.3, vitB3: 0.1, vitB5: 0.4, vitB6: 0.07, vitB9: 15, vitB12: 0.7, vitD: 0.1, vitE: 0.1, choline: 17 },
    },
    {
      id: "skyr",
      name: "Skyr (natur)",
      portions: [["1 Becher (150 g)", 150], ["1 Portion (450 g)", 450]],
      n: { energy: 63, water: 82, protein: 11, carbs: 4, sugar: 4, fiber: 0, fat: 0.2, satFat: 0.13, monoFat: 0.05, cholesterol: 2, potassium: 150, calcium: 130, iron: 0.1, magnesium: 12, phosphorus: 140, sodium: 45, zinc: 0.5, selenium: 9, iodine: 12, vitB2: 0.25, vitB5: 0.4, vitB6: 0.06, vitB9: 8, vitB12: 0.6, vitD: 0, choline: 15 },
    },
    {
      id: "naturjoghurt-35",
      name: "Naturjoghurt (3,5 %)",
      portions: [["1 Becher (150 g)", 150], ["1 EL", 25]],
      n: { energy: 66, water: 87.9, protein: 3.5, carbs: 4.6, sugar: 4.6, fiber: 0, fat: 3.6, satFat: 2.3, monoFat: 0.9, polyFat: 0.1, transFat: 0.13, omega3: 0.03, cholesterol: 14, potassium: 160, calcium: 130, iron: 0.1, magnesium: 13, phosphorus: 105, sodium: 50, zinc: 0.5, selenium: 3, iodine: 12, vitA: 40, vitB1: 0.04, vitB2: 0.2, vitB3: 0.1, vitB5: 0.4, vitB6: 0.04, vitB7: 3, vitB9: 8, vitB12: 0.4, vitC: 1, vitD: 0.06, vitE: 0.1, choline: 15 },
    },
    {
      id: "naturjoghurt-15",
      name: "Naturjoghurt (1,5 %)",
      portions: [["1 Becher (150 g)", 150], ["1 EL", 25]],
      n: { energy: 50, water: 89, protein: 3.6, carbs: 4.7, sugar: 4.7, fiber: 0, fat: 1.5, satFat: 1, monoFat: 0.4, polyFat: 0.05, cholesterol: 6, potassium: 165, calcium: 135, iron: 0.1, magnesium: 13, phosphorus: 108, sodium: 50, zinc: 0.5, selenium: 3, iodine: 12, vitA: 17, vitB2: 0.2, vitB5: 0.4, vitB6: 0.04, vitB9: 8, vitB12: 0.4, vitC: 1, vitD: 0.03, choline: 15 },
    },
    {
      id: "griechischer-joghurt",
      name: "Griechischer Joghurt (10 %)",
      portions: [["1 Becher (150 g)", 150], ["1 EL", 25]],
      n: { energy: 133, water: 77, protein: 4, carbs: 3.5, sugar: 3.5, fiber: 0, fat: 10.2, satFat: 6.7, monoFat: 2.6, polyFat: 0.3, transFat: 0.4, cholesterol: 25, potassium: 140, calcium: 110, iron: 0.1, magnesium: 11, phosphorus: 90, sodium: 45, zinc: 0.4, iodine: 10, vitA: 100, vitB2: 0.18, vitB5: 0.3, vitB6: 0.04, vitB9: 7, vitB12: 0.4, vitD: 0.1, vitE: 0.2, choline: 15 },
    },
    {
      id: "butter",
      name: "Butter",
      portions: [["1 TL (5 g)", 5], ["1 EL (15 g)", 15], ["1 Portion Brotaufstrich", 10]],
      n: { energy: 741, water: 16, protein: 0.7, carbs: 0.6, sugar: 0.6, fiber: 0, fat: 83, satFat: 52, monoFat: 21, polyFat: 2.5, transFat: 3.3, omega3: 0.3, cholesterol: 215, potassium: 24, calcium: 15, magnesium: 2, phosphorus: 24, sodium: 11, zinc: 0.1, selenium: 1, iodine: 5, vitA: 700, vitB2: 0.02, vitB12: 0.1, vitD: 1.2, vitE: 2.2, vitK: 7, choline: 19 },
    },
    {
      id: "schlagsahne",
      name: "Schlagsahne (30 %)",
      isLiquid: true,
      portions: [["1 EL", 15], ["1 Portion (50 ml)", 50]],
      n: { energy: 292, water: 65, protein: 2.4, carbs: 3.2, sugar: 3.2, fiber: 0, fat: 30, satFat: 19, monoFat: 7.5, polyFat: 0.9, transFat: 1.2, cholesterol: 90, potassium: 90, calcium: 80, magnesium: 8, phosphorus: 65, sodium: 30, zinc: 0.3, iodine: 8, vitA: 320, vitB2: 0.14, vitB5: 0.3, vitB12: 0.2, vitD: 0.4, vitE: 0.9, choline: 15 },
    },
    {
      id: "saure-sahne",
      name: "Saure Sahne (10 %)",
      portions: [["1 EL", 15], ["1 Becher (200 g)", 200]],
      n: { energy: 117, water: 80, protein: 3, carbs: 3.6, sugar: 3.6, fiber: 0, fat: 10, satFat: 6.4, monoFat: 2.6, polyFat: 0.3, transFat: 0.4, cholesterol: 30, potassium: 130, calcium: 105, magnesium: 11, phosphorus: 85, sodium: 40, zinc: 0.4, iodine: 9, vitA: 95, vitB2: 0.16, vitB5: 0.3, vitB12: 0.3, vitD: 0.1, vitE: 0.3, choline: 15 },
    },
    {
      id: "gouda",
      name: "Gouda (48 % Fett i. Tr.)",
      portions: [["1 Scheibe (30 g)", 30], ["1 Portion (50 g)", 50]],
      n: { energy: 356, water: 41, protein: 25, carbs: 2.2, sugar: 2.2, fiber: 0, fat: 27, satFat: 17.6, monoFat: 7.7, polyFat: 0.7, transFat: 1, cholesterol: 114, potassium: 121, calcium: 700, iron: 0.2, magnesium: 29, phosphorus: 546, sodium: 819, zinc: 3.9, copper: 0.04, selenium: 14, iodine: 30, vitA: 230, vitB1: 0.03, vitB2: 0.33, vitB3: 0.2, vitB5: 0.34, vitB6: 0.08, vitB9: 21, vitB12: 1.5, vitD: 0.5, vitE: 0.24, vitK: 2.3, choline: 15 },
    },
    {
      id: "emmentaler",
      name: "Emmentaler",
      portions: [["1 Scheibe (30 g)", 30], ["1 Portion (50 g)", 50]],
      n: { energy: 380, water: 36, protein: 28.5, carbs: 1.4, sugar: 1.4, fiber: 0, fat: 29.7, satFat: 18.6, monoFat: 8, polyFat: 1, transFat: 1.1, cholesterol: 92, potassium: 96, calcium: 1100, iron: 0.3, magnesium: 40, phosphorus: 620, sodium: 340, zinc: 4.4, copper: 0.04, selenium: 15, iodine: 40, vitA: 270, vitB2: 0.36, vitB3: 0.1, vitB5: 0.4, vitB6: 0.08, vitB9: 10, vitB12: 1.7, vitD: 1.1, vitE: 0.4, choline: 15 },
    },
    {
      id: "mozzarella",
      name: "Mozzarella",
      portions: [["1 Kugel (125 g)", 125], ["1 Scheibe (25 g)", 25]],
      n: { energy: 254, water: 54, protein: 18, carbs: 2.2, sugar: 1, fiber: 0, fat: 19, satFat: 12, monoFat: 5.3, polyFat: 0.6, transFat: 0.7, cholesterol: 54, potassium: 76, calcium: 505, iron: 0.2, magnesium: 20, phosphorus: 354, sodium: 486, zinc: 2.9, selenium: 17, iodine: 25, vitA: 170, vitB2: 0.28, vitB3: 0.1, vitB5: 0.14, vitB6: 0.04, vitB9: 7, vitB12: 2.3, vitD: 0.4, vitE: 0.2, choline: 15 },
    },
    {
      id: "feta",
      name: "Feta",
      portions: [["1 Portion (50 g)", 50], ["1 Würfel (20 g)", 20]],
      n: { energy: 264, water: 55, protein: 14, carbs: 4.1, sugar: 4.1, fiber: 0, fat: 21, satFat: 15, monoFat: 4.6, polyFat: 0.6, transFat: 0.8, cholesterol: 89, potassium: 62, calcium: 493, iron: 0.7, magnesium: 19, phosphorus: 337, sodium: 1116, zinc: 2.9, copper: 0.03, selenium: 15, iodine: 20, vitA: 125, vitB1: 0.15, vitB2: 0.84, vitB3: 1, vitB5: 0.97, vitB6: 0.42, vitB9: 32, vitB12: 1.7, vitD: 0.4, vitE: 0.2, choline: 15 },
    },
    {
      id: "huettenkaese",
      name: "Hüttenkäse (körniger Frischkäse)",
      portions: [["1 Becher (200 g)", 200], ["1 EL", 30]],
      n: { energy: 98, water: 79, protein: 11, carbs: 3.4, sugar: 2.7, fiber: 0, fat: 4.3, satFat: 1.7, monoFat: 1, polyFat: 0.1, cholesterol: 17, potassium: 104, calcium: 83, iron: 0.1, magnesium: 8, phosphorus: 159, sodium: 364, zinc: 0.4, selenium: 10, iodine: 10, vitA: 37, vitB2: 0.16, vitB3: 0.1, vitB5: 0.5, vitB6: 0.04, vitB9: 12, vitB12: 0.4, vitD: 0.03, choline: 15 },
    },
    {
      id: "frischkaese",
      name: "Frischkäse (Doppelrahmstufe)",
      portions: [["1 EL (20 g)", 20], ["1 Portion Brotaufstrich", 30]],
      n: { energy: 342, water: 53, protein: 6.2, carbs: 4.1, sugar: 3.8, fiber: 0, fat: 34, satFat: 20, monoFat: 8.6, polyFat: 1.4, transFat: 1.2, cholesterol: 101, potassium: 138, calcium: 98, iron: 0.1, magnesium: 9, phosphorus: 106, sodium: 314, zinc: 0.5, selenium: 5, iodine: 8, vitA: 300, vitB2: 0.25, vitB5: 0.5, vitB6: 0.05, vitB9: 10, vitB12: 0.3, vitD: 0.6, vitE: 0.7, choline: 15 },
    },
    {
      id: "parmesan",
      name: "Parmesan",
      portions: [["1 EL gerieben (10 g)", 10], ["1 Portion (30 g)", 30]],
      n: { energy: 402, water: 29, protein: 36, carbs: 3.2, sugar: 0.8, fiber: 0, fat: 26, satFat: 17, monoFat: 7.6, polyFat: 0.6, transFat: 0.9, cholesterol: 68, potassium: 92, calcium: 1184, iron: 0.8, magnesium: 44, phosphorus: 694, sodium: 1602, zinc: 2.8, copper: 0.03, selenium: 23, iodine: 35, vitA: 200, vitB2: 0.33, vitB3: 0.27, vitB5: 0.45, vitB6: 0.09, vitB9: 7, vitB12: 1.2, vitD: 0.5, vitE: 0.22, choline: 15 },
    },
    {
      id: "huehnerei",
      name: "Hühnerei (gekocht)",
      portions: [["1 Ei (M, 55 g)", 55], ["1 Ei (L, 65 g)", 65]],
      n: { energy: 155, water: 75, protein: 13, carbs: 1.1, sugar: 1.1, fiber: 0, fat: 11, satFat: 3.3, monoFat: 4.1, polyFat: 1.4, transFat: 0.04, omega3: 0.08, cholesterol: 373, potassium: 126, calcium: 50, iron: 1.2, magnesium: 10, phosphorus: 172, sodium: 124, zinc: 1.1, copper: 0.01, selenium: 31, iodine: 20, vitA: 149, vitB1: 0.07, vitB2: 0.51, vitB3: 0.06, vitB5: 1.4, vitB6: 0.12, vitB7: 25, vitB9: 44, vitB12: 1.1, vitD: 2.2, vitE: 1, vitK: 0.3, choline: 294 },
    },
    {
      id: "eiklar",
      name: "Eiklar",
      portions: [["1 Eiklar (33 g)", 33], ["100 g", 100]],
      n: { energy: 52, water: 88, protein: 10.9, carbs: 0.7, sugar: 0.7, fiber: 0, fat: 0.2, satFat: 0, monoFat: 0, polyFat: 0, cholesterol: 0, potassium: 163, calcium: 7, iron: 0.1, magnesium: 11, phosphorus: 15, sodium: 166, zinc: 0.03, selenium: 20, vitA: 0, vitB2: 0.44, vitB3: 0.1, vitB5: 0.19, vitB6: 0.01, vitB9: 4, vitB12: 0.09, vitD: 0, choline: 1.1 },
    },
  ],
};
