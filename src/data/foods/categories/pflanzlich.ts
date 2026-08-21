/**
 * Pflanzliche Alternativen — Werte je 100 g (Drinks je 100 ml).
 * Quellenbasis: USDA FoodData Central / typische deutsche Produktwerte.
 * B12/Calcium nur dort, wo Anreicherung marktüblich ist.
 */
import type { SeedCategoryFile } from "../types";

export const pflanzlich: SeedCategoryFile = {
  category: "pflanzlich",
  foods: [
    {
      id: "tofu-natur",
      name: "Tofu (natur)",
      portions: [["1 Portion (100 g)", 100], ["1 Block (200 g)", 200]],
      n: { energy: 144, water: 70, protein: 15.8, carbs: 1.9, sugar: 0.6, fiber: 2.3, fat: 8.7, satFat: 1.3, monoFat: 1.9, polyFat: 4.9, transFat: 0, omega3: 0.6, cholesterol: 0, potassium: 237, calcium: 200, iron: 2.7, magnesium: 58, phosphorus: 190, sodium: 14, zinc: 1.6, copper: 0.4, manganese: 1.2, selenium: 17, vitA: 0, vitB1: 0.16, vitB2: 0.1, vitB3: 0.4, vitB5: 0.1, vitB6: 0.09, vitB9: 19, vitB12: 0, vitC: 0.2, vitD: 0, vitE: 0.01, vitK: 2.4, choline: 28 },
    },
    {
      id: "tempeh",
      name: "Tempeh",
      portions: [["1 Portion (100 g)", 100], ["1 Scheibe (40 g)", 40]],
      n: { energy: 192, water: 60, protein: 20.3, carbs: 7.6, sugar: 0, fiber: 1.4, fat: 10.8, satFat: 2.2, monoFat: 3, polyFat: 4, transFat: 0, omega3: 0.2, cholesterol: 0, potassium: 412, calcium: 111, iron: 2.7, magnesium: 81, phosphorus: 266, sodium: 9, zinc: 1.1, copper: 0.6, manganese: 1.3, selenium: 0, vitB1: 0.08, vitB2: 0.36, vitB3: 2.6, vitB5: 0.3, vitB6: 0.22, vitB9: 24, vitB12: 0.08, vitD: 0, vitE: 0.01, vitK: 0, choline: 30 },
    },
    {
      id: "sojadrink",
      name: "Sojadrink (ungesüßt, angereichert)",
      isLiquid: true,
      portions: [["1 Glas (200 ml)", 200], ["1 Schuss (30 ml)", 30]],
      n: { energy: 33, water: 93, protein: 3.3, carbs: 0.6, sugar: 0.5, fiber: 0.6, fat: 1.8, satFat: 0.3, monoFat: 0.4, polyFat: 1, transFat: 0, omega3: 0.1, cholesterol: 0, potassium: 118, calcium: 120, iron: 0.4, magnesium: 15, phosphorus: 52, sodium: 39, zinc: 0.3, copper: 0.1, manganese: 0.2, selenium: 2, vitA: 60, vitB1: 0.02, vitB2: 0.21, vitB3: 0.4, vitB5: 0.1, vitB6: 0.05, vitB9: 9, vitB12: 0.38, vitD: 0.75, vitE: 0.1, vitK: 3, choline: 24 },
    },
    {
      id: "haferdrink",
      name: "Haferdrink",
      isLiquid: true,
      portions: [["1 Glas (200 ml)", 200], ["1 Schuss (30 ml)", 30]],
      n: { energy: 46, water: 90, protein: 0.8, carbs: 6.6, sugar: 4, fiber: 0.8, fat: 1.5, satFat: 0.2, monoFat: 0.9, polyFat: 0.4, transFat: 0, omega3: 0.05, cholesterol: 0, potassium: 130, calcium: 120, iron: 0.2, magnesium: 10, phosphorus: 40, sodium: 45, zinc: 0.2, manganese: 0.3, vitA: 60, vitB2: 0.21, vitB12: 0.38, vitD: 0.75, vitE: 0.2 },
    },
    {
      id: "mandeldrink",
      name: "Mandeldrink (ungesüßt)",
      isLiquid: true,
      portions: [["1 Glas (200 ml)", 200], ["1 Schuss (30 ml)", 30]],
      n: { energy: 15, water: 97, protein: 0.5, carbs: 0.3, sugar: 0.2, fiber: 0.3, fat: 1.1, satFat: 0.1, monoFat: 0.7, polyFat: 0.3, transFat: 0, cholesterol: 0, potassium: 60, calcium: 120, iron: 0.2, magnesium: 6, phosphorus: 14, sodium: 60, zinc: 0.1, manganese: 0.1, vitA: 60, vitB2: 0.21, vitB12: 0.38, vitD: 0.75, vitE: 6 },
    },
    {
      id: "sojajoghurt",
      name: "Sojajoghurt (natur)",
      portions: [["1 Becher (150 g)", 150], ["1 EL", 25]],
      n: { energy: 55, water: 88, protein: 4, carbs: 1.2, sugar: 1, fiber: 0.8, fat: 2.3, satFat: 0.4, monoFat: 0.5, polyFat: 1.3, transFat: 0, omega3: 0.15, cholesterol: 0, potassium: 130, calcium: 120, iron: 0.5, magnesium: 18, phosphorus: 55, sodium: 30, zinc: 0.3, copper: 0.1, manganese: 0.2, vitA: 60, vitB2: 0.21, vitB6: 0.05, vitB9: 12, vitB12: 0.38, vitD: 0.75, vitE: 0.2, choline: 25 },
    },
    {
      id: "seitan",
      name: "Seitan",
      portions: [["1 Portion (100 g)", 100], ["1 Scheibe (30 g)", 30]],
      n: { energy: 141, water: 66, protein: 24, carbs: 8, sugar: 0.5, fiber: 0.6, fat: 1.4, satFat: 0.2, monoFat: 0.1, polyFat: 0.6, transFat: 0, cholesterol: 0, potassium: 100, calcium: 42, iron: 1.4, magnesium: 25, phosphorus: 90, sodium: 380, zinc: 0.7, copper: 0.1, manganese: 0.6, selenium: 20, vitB1: 0.04, vitB2: 0.06, vitB3: 0.9, vitB6: 0.03, vitB9: 8, vitB12: 0, vitD: 0 },
    },
    {
      id: "vegane-bratwurst",
      name: "Vegane Bratwurst",
      portions: [["1 Wurst (85 g)", 85], ["1 Portion (100 g)", 100]],
      n: { energy: 232, water: 58, protein: 17, carbs: 4.5, sugar: 1.2, fiber: 3.5, fat: 15, satFat: 6.5, monoFat: 4.5, polyFat: 3, transFat: 0, omega3: 0.4, cholesterol: 0, potassium: 180, calcium: 60, iron: 2.2, magnesium: 30, phosphorus: 130, sodium: 800, zinc: 1.2, copper: 0.2, manganese: 0.5, selenium: 5, vitB1: 0.1, vitB2: 0.15, vitB3: 1.5, vitB6: 0.1, vitB9: 20, vitB12: 0.9, vitD: 0, vitE: 1.5 },
    },
  ],
};
