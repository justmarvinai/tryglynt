/**
 * Nüsse & Saaten — Werte je 100 g essbarer Anteil (Kerne, roh, sofern
 * nicht anders benannt). Quellenbasis: USDA FoodData Central /
 * BLS-typische Referenzwerte. Kohlenhydrate nach EU-Konvention (ohne
 * Ballaststoffe). Fehlender Wert = keine Daten (nicht 0!).
 */
import type { SeedCategoryFile } from "../types";

export const nuesse: SeedCategoryFile = {
  category: "nuesse",
  foods: [
    {
      id: "mandeln",
      name: "Mandeln",
      portions: [["1 Handvoll", 25], ["1 EL", 10], ["10 Mandeln", 12]],
      n: { energy: 579, water: 4.4, alcohol: 0, protein: 21.2, carbs: 9.1, sugar: 4.4, fiber: 12.5, fat: 49.9, satFat: 3.8, monoFat: 31.6, polyFat: 12.3, transFat: 0.02, omega3: 0, cholesterol: 0, potassium: 733, calcium: 269, iron: 3.7, magnesium: 270, phosphorus: 481, sodium: 1, zinc: 3.1, copper: 1.03, manganese: 2.18, selenium: 4, vitA: 0, vitB1: 0.21, vitB2: 1.14, vitB3: 3.6, vitB5: 0.47, vitB6: 0.14, vitB7: 34, vitB9: 44, vitB12: 0, vitC: 0, vitD: 0, vitE: 25.6, vitK: 0, choline: 52.1 },
    },
    {
      id: "walnuesse",
      name: "Walnüsse",
      portions: [["1 Handvoll", 25], ["1 Walnuss", 5]],
      n: { energy: 654, water: 4.1, alcohol: 0, protein: 15.2, carbs: 7.0, sugar: 2.6, fiber: 6.7, fat: 65.2, satFat: 6.1, monoFat: 8.9, polyFat: 47.2, transFat: 0, omega3: 9.08, cholesterol: 0, potassium: 441, calcium: 98, iron: 2.9, magnesium: 158, phosphorus: 346, sodium: 2, zinc: 3.1, copper: 1.59, manganese: 3.4, selenium: 5, vitA: 1, vitB1: 0.34, vitB2: 0.15, vitB3: 1.1, vitB5: 0.57, vitB6: 0.54, vitB7: 19, vitB9: 98, vitB12: 0, vitC: 1.3, vitD: 0, vitE: 0.7, vitK: 2.7, choline: 39.2 },
    },
    {
      id: "haselnuesse",
      name: "Haselnüsse",
      portions: [["1 Handvoll", 25], ["1 EL", 10]],
      n: { energy: 628, water: 5.3, alcohol: 0, protein: 15.0, carbs: 7.0, sugar: 4.3, fiber: 9.7, fat: 60.8, satFat: 4.5, monoFat: 45.7, polyFat: 7.9, transFat: 0, omega3: 0.09, cholesterol: 0, potassium: 680, calcium: 114, iron: 4.7, magnesium: 163, phosphorus: 290, sodium: 0, zinc: 2.5, copper: 1.73, manganese: 6.2, selenium: 2, vitA: 1, vitB1: 0.64, vitB2: 0.11, vitB3: 1.8, vitB5: 0.92, vitB6: 0.56, vitB9: 113, vitB12: 0, vitC: 6.3, vitD: 0, vitE: 15.0, vitK: 14.2, choline: 45.6 },
    },
    {
      id: "cashewkerne",
      name: "Cashewkerne",
      portions: [["1 Handvoll", 25], ["1 EL", 10]],
      n: { energy: 553, water: 5.2, alcohol: 0, protein: 18.2, carbs: 26.9, sugar: 5.9, fiber: 3.3, fat: 43.9, satFat: 7.8, monoFat: 23.8, polyFat: 7.8, transFat: 0, omega3: 0.06, cholesterol: 0, potassium: 660, calcium: 37, iron: 6.7, magnesium: 292, phosphorus: 593, sodium: 12, zinc: 5.8, copper: 2.2, manganese: 1.66, selenium: 20, vitA: 0, vitB1: 0.42, vitB2: 0.06, vitB3: 1.1, vitB5: 0.86, vitB6: 0.42, vitB9: 25, vitB12: 0, vitC: 0.5, vitD: 0, vitE: 0.9, vitK: 34.1, choline: 61.0 },
    },
    {
      id: "erdnuesse",
      name: "Erdnüsse (geröstet)",
      portions: [["1 Handvoll", 25], ["1 EL", 10]],
      n: { energy: 587, water: 1.6, alcohol: 0, protein: 24.4, carbs: 12.9, sugar: 4.2, fiber: 8.4, fat: 49.7, satFat: 6.9, monoFat: 26.2, polyFat: 9.8, transFat: 0, omega3: 0, cholesterol: 0, potassium: 634, calcium: 54, iron: 2.3, magnesium: 178, phosphorus: 363, sodium: 6, zinc: 3.3, copper: 0.67, manganese: 2.08, selenium: 8, vitA: 0, vitB1: 0.44, vitB2: 0.1, vitB3: 13.5, vitB5: 1.4, vitB6: 0.26, vitB9: 145, vitB12: 0, vitC: 0, vitD: 0, vitE: 4.9, vitK: 0, choline: 64.6 },
    },
    {
      id: "pistazien",
      name: "Pistazien",
      portions: [["1 Handvoll", 25], ["1 EL", 10]],
      n: { energy: 560, water: 4.4, alcohol: 0, protein: 20.2, carbs: 16.6, sugar: 7.7, fiber: 10.6, fat: 45.3, satFat: 5.9, monoFat: 23.3, polyFat: 14.4, transFat: 0, omega3: 0.25, cholesterol: 0, potassium: 1025, calcium: 105, iron: 3.9, magnesium: 121, phosphorus: 490, sodium: 1, zinc: 2.2, copper: 1.3, manganese: 1.2, selenium: 7, vitA: 26, vitB1: 0.87, vitB2: 0.16, vitB3: 1.3, vitB5: 0.52, vitB6: 1.7, vitB9: 51, vitB12: 0, vitC: 5.6, vitD: 0, vitE: 2.9, vitK: 13.2, choline: 71.4 },
    },
    {
      id: "paranuesse",
      name: "Paranüsse",
      portions: [["1 Paranuss", 5], ["2 Paranüsse", 10], ["1 Handvoll", 25]],
      n: { energy: 659, water: 3.5, alcohol: 0, protein: 14.3, carbs: 4.8, sugar: 2.3, fiber: 7.5, fat: 67.1, satFat: 16.1, monoFat: 23.9, polyFat: 24.4, transFat: 0, omega3: 0.02, cholesterol: 0, potassium: 659, calcium: 160, iron: 2.4, magnesium: 376, phosphorus: 725, sodium: 3, zinc: 4.1, copper: 1.74, manganese: 1.2, selenium: 1917, vitA: 0, vitB1: 0.62, vitB2: 0.04, vitB3: 0.3, vitB5: 0.18, vitB6: 0.1, vitB9: 22, vitB12: 0, vitC: 0.7, vitD: 0, vitE: 5.7, vitK: 0, choline: 28.8 },
    },
    {
      id: "kuerbiskerne",
      name: "Kürbiskerne",
      portions: [["1 EL", 10], ["1 Handvoll", 25]],
      n: { energy: 559, water: 5.2, alcohol: 0, protein: 30.2, carbs: 4.7, sugar: 1.4, fiber: 6.0, fat: 49.1, satFat: 8.7, monoFat: 16.2, polyFat: 21.0, transFat: 0, omega3: 0.12, cholesterol: 0, potassium: 809, calcium: 46, iron: 8.8, magnesium: 592, phosphorus: 1233, sodium: 7, zinc: 7.8, copper: 1.34, manganese: 4.5, selenium: 9, vitA: 1, vitB1: 0.27, vitB2: 0.15, vitB3: 5.0, vitB5: 0.75, vitB6: 0.14, vitB9: 58, vitB12: 0, vitC: 1.9, vitD: 0, vitE: 2.2, vitK: 7.3, choline: 63.0 },
    },
    {
      id: "sonnenblumenkerne",
      name: "Sonnenblumenkerne",
      portions: [["1 EL", 10], ["1 Handvoll", 25]],
      n: { energy: 584, water: 4.7, alcohol: 0, protein: 20.8, carbs: 11.4, sugar: 2.6, fiber: 8.6, fat: 51.5, satFat: 4.5, monoFat: 18.5, polyFat: 23.1, transFat: 0, omega3: 0.07, cholesterol: 0, potassium: 645, calcium: 78, iron: 5.3, magnesium: 325, phosphorus: 660, sodium: 9, zinc: 5.0, copper: 1.8, manganese: 1.95, selenium: 53, vitA: 3, vitB1: 1.48, vitB2: 0.36, vitB3: 8.3, vitB5: 1.13, vitB6: 1.35, vitB9: 227, vitB12: 0, vitC: 1.4, vitD: 0, vitE: 35.2, vitK: 0, choline: 55.1 },
    },
    {
      id: "leinsamen",
      name: "Leinsamen (geschrotet)",
      portions: [["1 EL", 10], ["1 TL", 4]],
      n: { energy: 534, water: 7.0, alcohol: 0, protein: 18.3, carbs: 1.6, sugar: 1.6, fiber: 27.3, fat: 42.2, satFat: 3.7, monoFat: 7.5, polyFat: 28.7, transFat: 0, omega3: 22.8, cholesterol: 0, potassium: 813, calcium: 255, iron: 5.7, magnesium: 392, phosphorus: 642, sodium: 30, zinc: 4.3, copper: 1.22, manganese: 2.48, selenium: 25, vitA: 0, vitB1: 1.64, vitB2: 0.16, vitB3: 3.1, vitB5: 0.99, vitB6: 0.47, vitB9: 87, vitB12: 0, vitC: 0.6, vitD: 0, vitE: 0.3, vitK: 4.3, choline: 78.7 },
    },
    {
      id: "chiasamen",
      name: "Chiasamen",
      portions: [["1 EL", 12], ["1 TL", 5]],
      n: { energy: 486, water: 5.8, alcohol: 0, protein: 16.5, carbs: 7.7, sugar: 0, fiber: 34.4, fat: 30.7, satFat: 3.3, monoFat: 2.3, polyFat: 23.7, transFat: 0.14, omega3: 17.8, cholesterol: 0, potassium: 407, calcium: 631, iron: 7.7, magnesium: 335, phosphorus: 860, sodium: 16, zinc: 4.6, copper: 0.92, manganese: 2.72, selenium: 55, vitB1: 0.62, vitB2: 0.17, vitB3: 8.8, vitB9: 49, vitB12: 0, vitC: 1.6, vitD: 0, vitE: 0.5 },
    },
    {
      id: "sesam",
      name: "Sesam",
      portions: [["1 EL", 10], ["1 TL", 4]],
      n: { energy: 573, water: 4.7, alcohol: 0, protein: 17.7, carbs: 11.7, sugar: 0.3, fiber: 11.8, fat: 49.7, satFat: 7.0, monoFat: 18.8, polyFat: 21.8, transFat: 0, omega3: 0.38, cholesterol: 0, potassium: 468, calcium: 975, iron: 14.6, magnesium: 351, phosphorus: 629, sodium: 11, zinc: 7.8, copper: 4.08, manganese: 2.46, selenium: 34, vitA: 0, vitB1: 0.79, vitB2: 0.25, vitB3: 4.5, vitB5: 0.05, vitB6: 0.79, vitB9: 97, vitB12: 0, vitC: 0, vitD: 0, vitE: 0.3, vitK: 0, choline: 25.6 },
    },
    {
      id: "erdnussbutter",
      name: "Erdnussbutter",
      portions: [["1 EL", 15], ["1 TL", 8], ["1 Portion (30 g)", 30]],
      n: { energy: 588, water: 1.8, alcohol: 0, protein: 25.1, carbs: 13.6, sugar: 9.2, fiber: 6.0, fat: 50.4, satFat: 10.3, monoFat: 24.0, polyFat: 12.5, transFat: 0, omega3: 0, cholesterol: 0, potassium: 649, calcium: 43, iron: 1.9, magnesium: 154, phosphorus: 358, sodium: 470, zinc: 2.5, copper: 0.42, manganese: 1.46, selenium: 5, vitA: 0, vitB1: 0.11, vitB2: 0.11, vitB3: 13.1, vitB5: 1.1, vitB6: 0.44, vitB9: 87, vitB12: 0, vitC: 0, vitD: 0, vitE: 9.1, vitK: 0.3, choline: 63.0 },
    },
  ],
};
