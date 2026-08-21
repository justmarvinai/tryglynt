/**
 * Gerichte & Fast Food — Werte je 100 g typischer Zubereitung
 * (Mischwerte). Quellenbasis: USDA FoodData Central / BLS-typische
 * Rezeptur-Durchschnitte. Mikros nur, wo seriös ableitbar.
 */
import type { SeedCategoryFile } from "../types";

export const gerichte: SeedCategoryFile = {
  category: "gerichte",
  foods: [
    {
      id: "pizza-margherita",
      name: "Pizza Margherita",
      portions: [["1 Pizza (350 g)", 350], ["1 Stück (90 g)", 90]],
      n: { energy: 258, water: 48, protein: 11, carbs: 30, sugar: 3.2, fiber: 2.3, fat: 9.8, satFat: 4.3, monoFat: 3.5, polyFat: 1.2, transFat: 0.2, omega3: 0.1, cholesterol: 20, potassium: 200, calcium: 220, iron: 1.8, magnesium: 25, phosphorus: 180, sodium: 600, zinc: 1.3, copper: 0.15, manganese: 0.4, selenium: 18, iodine: 12, vitA: 90, vitB1: 0.25, vitB2: 0.25, vitB3: 2.6, vitB5: 0.4, vitB6: 0.08, vitB9: 55, vitB12: 0.6, vitC: 2, vitD: 0.2, vitE: 0.8, vitK: 5 },
    },
    {
      id: "spaghetti-bolognese",
      name: "Spaghetti Bolognese",
      portions: [["1 Portion (400 g)", 400], ["1 kleine Portion (250 g)", 250]],
      n: { energy: 137, water: 70, protein: 7.2, carbs: 15.5, sugar: 2.4, fiber: 1.6, fat: 4.6, satFat: 1.6, monoFat: 2, polyFat: 0.6, transFat: 0.1, omega3: 0.05, cholesterol: 15, potassium: 230, calcium: 25, iron: 1.2, magnesium: 22, phosphorus: 90, sodium: 300, zinc: 1.3, copper: 0.1, manganese: 0.2, selenium: 12, vitA: 30, vitB1: 0.1, vitB2: 0.1, vitB3: 2, vitB5: 0.3, vitB6: 0.15, vitB9: 20, vitB12: 0.7, vitC: 4, vitD: 0.1, vitE: 0.6, vitK: 4 },
    },
    {
      id: "doener-kebab",
      name: "Döner Kebab",
      portions: [["1 Döner (350 g)", 350], ["1 halber Döner (175 g)", 175]],
      n: { energy: 215, water: 58, protein: 12.5, carbs: 20, sugar: 2.5, fiber: 1.8, fat: 8.5, satFat: 3, monoFat: 3.5, polyFat: 1.5, transFat: 0.2, omega3: 0.1, cholesterol: 30, potassium: 250, calcium: 80, iron: 1.6, magnesium: 28, phosphorus: 150, sodium: 550, zinc: 1.8, copper: 0.12, manganese: 0.35, selenium: 15, iodine: 6, vitA: 40, vitB1: 0.15, vitB2: 0.18, vitB3: 3, vitB5: 0.4, vitB6: 0.2, vitB9: 30, vitB12: 1, vitC: 6, vitD: 0.2, vitE: 0.9, vitK: 8 },
    },
    {
      id: "pommes-frites",
      name: "Pommes frites",
      portions: [["1 Portion (150 g)", 150], ["1 große Portion (250 g)", 250]],
      n: { energy: 274, water: 55, protein: 3.4, carbs: 32.6, sugar: 0.4, fiber: 3.3, fat: 14, satFat: 2.3, monoFat: 7.5, polyFat: 3.5, transFat: 0.1, omega3: 0.2, cholesterol: 0, potassium: 580, calcium: 15, iron: 0.8, magnesium: 27, phosphorus: 105, sodium: 300, zinc: 0.4, copper: 0.15, manganese: 0.2, selenium: 1, vitA: 0, vitB1: 0.13, vitB2: 0.03, vitB3: 2.5, vitB5: 0.4, vitB6: 0.3, vitB9: 25, vitB12: 0, vitC: 9, vitD: 0, vitE: 2.5, vitK: 10 },
    },
    {
      id: "currywurst",
      name: "Currywurst mit Sauce",
      portions: [["1 Portion (200 g)", 200], ["1 Wurst mit Sauce (150 g)", 150]],
      n: { energy: 264, water: 58, protein: 10.5, carbs: 8.5, sugar: 6.5, fiber: 0.6, fat: 21, satFat: 7.8, monoFat: 9.5, polyFat: 2.3, transFat: 0.3, omega3: 0.15, cholesterol: 55, potassium: 260, calcium: 20, iron: 1.1, magnesium: 16, phosphorus: 125, sodium: 950, zinc: 1.5, copper: 0.08, manganese: 0.1, selenium: 12, vitA: 25, vitB1: 0.25, vitB2: 0.16, vitB3: 2.4, vitB5: 0.4, vitB6: 0.18, vitB9: 6, vitB12: 0.8, vitC: 3, vitD: 0.6, vitE: 0.8 },
    },
    {
      id: "kartoffelpueree",
      name: "Kartoffelpüree",
      portions: [["1 Portion (200 g)", 200], ["1 kleine Portion (150 g)", 150]],
      n: { energy: 108, water: 77, protein: 2.2, carbs: 15.5, sugar: 1.8, fiber: 1.3, fat: 4.2, satFat: 2.5, monoFat: 1.1, polyFat: 0.2, transFat: 0.15, cholesterol: 12, potassium: 300, calcium: 40, iron: 0.3, magnesium: 18, phosphorus: 65, sodium: 320, zinc: 0.3, copper: 0.1, manganese: 0.1, selenium: 2, iodine: 6, vitA: 40, vitB1: 0.08, vitB2: 0.06, vitB3: 1, vitB5: 0.3, vitB6: 0.2, vitB9: 10, vitB12: 0.15, vitC: 8, vitD: 0.1, vitE: 0.15 },
    },
    {
      id: "pfannkuchen",
      name: "Pfannkuchen",
      portions: [["1 Pfannkuchen (100 g)", 100], ["1 Portion (200 g)", 200]],
      n: { energy: 227, water: 55, protein: 7.5, carbs: 26, sugar: 4.5, fiber: 0.9, fat: 9.5, satFat: 3.6, monoFat: 3.5, polyFat: 1.6, transFat: 0.15, omega3: 0.1, cholesterol: 90, potassium: 140, calcium: 90, iron: 1.2, magnesium: 15, phosphorus: 140, sodium: 250, zinc: 0.8, copper: 0.07, manganese: 0.25, selenium: 15, iodine: 10, vitA: 80, vitB1: 0.15, vitB2: 0.25, vitB3: 1.3, vitB5: 0.6, vitB6: 0.06, vitB9: 30, vitB12: 0.5, vitD: 0.7, vitE: 0.7, choline: 60 },
    },
    {
      id: "gemuesesuppe",
      name: "Gemüsesuppe",
      isLiquid: true,
      portions: [["1 Teller (350 ml)", 350], ["1 Tasse (250 ml)", 250]],
      n: { energy: 42, water: 89, protein: 1.4, carbs: 5.5, sugar: 1.8, fiber: 1.4, fat: 1.4, satFat: 0.3, monoFat: 0.7, polyFat: 0.3, cholesterol: 0, potassium: 180, calcium: 20, iron: 0.5, magnesium: 12, phosphorus: 35, sodium: 400, zinc: 0.3, copper: 0.06, manganese: 0.1, selenium: 1, vitA: 250, vitB1: 0.04, vitB2: 0.04, vitB3: 0.6, vitB5: 0.2, vitB6: 0.1, vitB9: 15, vitB12: 0, vitC: 6, vitD: 0, vitE: 0.5, vitK: 15 },
    },
    {
      id: "chili-con-carne",
      name: "Chili con Carne",
      portions: [["1 Portion (350 g)", 350], ["1 kleine Portion (250 g)", 250]],
      n: { energy: 129, water: 74, protein: 9.5, carbs: 8.5, sugar: 2.2, fiber: 3.2, fat: 5.5, satFat: 2.1, monoFat: 2.3, polyFat: 0.5, transFat: 0.2, omega3: 0.05, cholesterol: 22, potassium: 340, calcium: 35, iron: 2, magnesium: 30, phosphorus: 130, sodium: 380, zinc: 2, copper: 0.15, manganese: 0.3, selenium: 8, vitA: 45, vitB1: 0.1, vitB2: 0.12, vitB3: 2.2, vitB5: 0.4, vitB6: 0.2, vitB9: 40, vitB12: 0.9, vitC: 8, vitD: 0.1, vitE: 0.6, vitK: 5 },
    },
    {
      id: "kaesespaetzle",
      name: "Käsespätzle",
      portions: [["1 Portion (350 g)", 350], ["1 kleine Portion (250 g)", 250]],
      n: { energy: 215, water: 60, protein: 9.5, carbs: 22, sugar: 1.5, fiber: 1.2, fat: 9.5, satFat: 5.5, monoFat: 2.8, polyFat: 0.6, transFat: 0.3, cholesterol: 55, potassium: 130, calcium: 220, iron: 1, magnesium: 20, phosphorus: 200, sodium: 480, zinc: 1.4, copper: 0.08, manganese: 0.25, selenium: 18, iodine: 12, vitA: 110, vitB1: 0.12, vitB2: 0.25, vitB3: 1.2, vitB5: 0.5, vitB6: 0.07, vitB9: 35, vitB12: 0.8, vitD: 0.4, vitE: 0.5, choline: 45 },
    },
  ],
};
