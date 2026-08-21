/**
 * Würzen & Saucen — Werte je 100 g (Flüssiges je 100 ml).
 * Quellenbasis: USDA FoodData Central / BLS-typische Werte.
 * Jodsalz ist in Deutschland die wichtigste Jodquelle.
 */
import type { SeedCategoryFile } from "../types";

export const wuerzen: SeedCategoryFile = {
  category: "wuerzen",
  foods: [
    {
      id: "tomatenketchup",
      name: "Tomatenketchup",
      portions: [["1 EL (15 g)", 15], ["1 Portion (30 g)", 30]],
      n: { energy: 112, water: 68, protein: 1.3, carbs: 24.4, sugar: 21.8, fiber: 0.3, fat: 0.1, satFat: 0.02, monoFat: 0.01, polyFat: 0.05, cholesterol: 0, potassium: 281, calcium: 15, iron: 0.3, magnesium: 13, phosphorus: 27, sodium: 907, zinc: 0.2, copper: 0.1, manganese: 0.1, selenium: 1, vitA: 21, vitB1: 0.01, vitB2: 0.1, vitB3: 1.2, vitB5: 0.1, vitB6: 0.15, vitB9: 9, vitB12: 0, vitC: 4.1, vitD: 0, vitE: 1.5, vitK: 3 },
    },
    {
      id: "senf",
      name: "Senf (mittelscharf)",
      portions: [["1 TL (5 g)", 5], ["1 EL (15 g)", 15]],
      n: { energy: 66, water: 83, protein: 3.7, carbs: 2.9, sugar: 1, fiber: 3.3, fat: 3.4, satFat: 0.2, monoFat: 2.2, polyFat: 0.8, cholesterol: 0, potassium: 152, calcium: 58, iron: 1.5, magnesium: 48, phosphorus: 106, sodium: 1135, zinc: 0.6, copper: 0.1, manganese: 0.4, selenium: 26, vitA: 1, vitB1: 0.1, vitB2: 0.05, vitB3: 0.5, vitB5: 0.1, vitB6: 0.06, vitB9: 8, vitB12: 0, vitC: 1.5, vitD: 0, vitE: 0.3, vitK: 1.8 },
    },
    {
      id: "mayonnaise",
      name: "Mayonnaise",
      portions: [["1 EL (15 g)", 15], ["1 TL (5 g)", 5]],
      n: { energy: 680, water: 15, protein: 1, carbs: 0.6, sugar: 0.6, fiber: 0, fat: 75, satFat: 6, monoFat: 18, polyFat: 45, transFat: 0.2, omega3: 4.5, cholesterol: 42, potassium: 20, calcium: 8, iron: 0.2, magnesium: 2, phosphorus: 28, sodium: 635, zinc: 0.1, selenium: 5, vitA: 40, vitB2: 0.02, vitB9: 5, vitB12: 0.2, vitD: 0.5, vitE: 12, vitK: 90, choline: 20 },
    },
    {
      id: "sojasauce",
      name: "Sojasauce",
      isLiquid: true,
      portions: [["1 EL (15 ml)", 15], ["1 TL (5 ml)", 5]],
      n: { energy: 53, water: 71, protein: 8.1, carbs: 4, sugar: 0.4, fiber: 0.8, fat: 0.6, satFat: 0.1, monoFat: 0.1, polyFat: 0.3, cholesterol: 0, potassium: 217, calcium: 20, iron: 1.5, magnesium: 43, phosphorus: 130, sodium: 5493, zinc: 0.5, copper: 0.1, manganese: 0.5, selenium: 1, vitB1: 0.06, vitB2: 0.15, vitB3: 2.2, vitB5: 0.3, vitB6: 0.15, vitB9: 14, vitB12: 0, vitD: 0, choline: 19 },
    },
    {
      id: "tomatenmark",
      name: "Tomatenmark",
      portions: [["1 EL (15 g)", 15], ["1 Dose (70 g)", 70]],
      n: { energy: 82, water: 74, protein: 4.3, carbs: 14, sugar: 12.2, fiber: 4.1, fat: 0.5, satFat: 0.1, monoFat: 0.1, polyFat: 0.2, cholesterol: 0, potassium: 1014, calcium: 36, iron: 2.9, magnesium: 42, phosphorus: 83, sodium: 59, zinc: 0.6, copper: 0.4, manganese: 0.3, selenium: 6, vitA: 66, vitB1: 0.06, vitB2: 0.15, vitB3: 3.4, vitB5: 0.4, vitB6: 0.22, vitB9: 21, vitB12: 0, vitC: 21.9, vitD: 0, vitE: 4.3, vitK: 11, choline: 21 },
    },
    {
      id: "gemuesebruehe",
      name: "Gemüsebrühe (zubereitet)",
      isLiquid: true,
      portions: [["1 Tasse (250 ml)", 250], ["1 Teller (350 ml)", 350]],
      n: { energy: 6, water: 98, protein: 0.3, carbs: 0.9, sugar: 0.3, fiber: 0, fat: 0.1, satFat: 0.02, cholesterol: 0, potassium: 25, calcium: 5, iron: 0.1, magnesium: 3, phosphorus: 5, sodium: 350, zinc: 0.03, vitB12: 0, vitC: 0, vitD: 0 },
    },
    {
      id: "jodsalz",
      name: "Speisesalz (jodiert)",
      portions: [["1 Prise (0,5 g)", 0.5], ["1 TL (5 g)", 5]],
      n: { energy: 0, water: 0.2, protein: 0, carbs: 0, sugar: 0, fiber: 0, fat: 0, satFat: 0, cholesterol: 0, sodium: 38700, chloride: 59000, calcium: 24, iron: 0.3, magnesium: 1, potassium: 8, zinc: 0.1, iodine: 2000, vitB12: 0, vitD: 0 },
    },
    {
      id: "pesto-genovese",
      name: "Pesto Genovese",
      portions: [["1 EL (15 g)", 15], ["1 Portion (50 g)", 50]],
      n: { energy: 460, water: 32, protein: 5.5, carbs: 4, sugar: 2.5, fiber: 1.5, fat: 46, satFat: 7.5, monoFat: 28, polyFat: 8, transFat: 0.1, omega3: 0.6, cholesterol: 8, potassium: 200, calcium: 190, iron: 1.5, magnesium: 40, phosphorus: 150, sodium: 800, zinc: 1.1, copper: 0.3, manganese: 0.6, selenium: 6, vitA: 120, vitB1: 0.1, vitB2: 0.15, vitB3: 1, vitB6: 0.1, vitB9: 25, vitB12: 0.3, vitC: 2, vitD: 0.1, vitE: 5, vitK: 90 },
    },
  ],
};
