/**
 * Hülsenfrüchte — Werte je 100 g essbarer Anteil (gegart, sofern nicht
 * anders benannt). Quellenbasis: USDA FoodData Central / BLS-typische
 * Referenzwerte; Kohlenhydrate ohne Ballaststoffe (EU-Konvention).
 * Fehlender Wert = keine Daten (nicht 0!).
 */
import type { SeedCategoryFile } from "../types";

export const huelsenfruechte: SeedCategoryFile = {
  category: "huelsenfruechte",
  foods: [
    {
      id: "linsen-gekocht",
      name: "Linsen (gekocht)",
      portions: [["1 Portion (150 g)", 150], ["1 EL", 20]],
      n: { energy: 116, water: 69.6, alcohol: 0, protein: 9, carbs: 12.2, sugar: 1.8, fiber: 7.9, fat: 0.4, satFat: 0.05, monoFat: 0.06, polyFat: 0.18, transFat: 0, omega3: 0.04, cholesterol: 0, potassium: 369, calcium: 19, iron: 3.3, magnesium: 36, phosphorus: 180, sodium: 2, zinc: 1.27, copper: 0.25, manganese: 0.49, selenium: 3, vitA: 0, vitB1: 0.17, vitB2: 0.07, vitB3: 1.1, vitB5: 0.64, vitB6: 0.18, vitB9: 181, vitB12: 0, vitC: 1.5, vitD: 0, vitE: 0.1, vitK: 1.7, choline: 32.7 },
    },
    {
      id: "rote-linsen-gekocht",
      name: "Rote Linsen (gekocht)",
      portions: [["1 Portion (150 g)", 150], ["1 EL", 20]],
      n: { energy: 105, water: 72, alcohol: 0, protein: 7.5, carbs: 15.5, sugar: 0.6, fiber: 3.2, fat: 0.6, satFat: 0.1, monoFat: 0.1, polyFat: 0.3, transFat: 0, omega3: 0.05, cholesterol: 0, potassium: 220, calcium: 16, iron: 2.4, magnesium: 25, phosphorus: 100, sodium: 4, zinc: 1.2, copper: 0.25, manganese: 0.4, vitA: 0, vitB1: 0.11, vitB2: 0.04, vitB3: 0.5, vitB6: 0.11, vitB9: 50, vitB12: 0, vitD: 0, vitE: 0.1 },
    },
    {
      id: "kichererbsen-gekocht",
      name: "Kichererbsen (gekocht)",
      portions: [["1 Portion (150 g)", 150], ["1/2 Dose (abgetropft 120 g)", 120], ["1 EL", 20]],
      n: { energy: 164, water: 60.2, alcohol: 0, protein: 8.9, carbs: 19.8, sugar: 4.8, fiber: 7.6, fat: 2.6, satFat: 0.27, monoFat: 0.58, polyFat: 1.16, transFat: 0, omega3: 0.04, cholesterol: 0, potassium: 291, calcium: 49, iron: 2.9, magnesium: 48, phosphorus: 168, sodium: 7, zinc: 1.53, copper: 0.35, manganese: 1.03, selenium: 4, vitA: 1, vitB1: 0.12, vitB2: 0.06, vitB3: 0.5, vitB5: 0.29, vitB6: 0.14, vitB9: 172, vitB12: 0, vitC: 1.3, vitD: 0, vitE: 0.4, vitK: 4, choline: 42.8 },
    },
    {
      id: "kidneybohnen-gekocht",
      name: "Kidneybohnen (gekocht)",
      portions: [["1 Portion (150 g)", 150], ["1/2 Dose (abgetropft 125 g)", 125]],
      n: { energy: 127, water: 66.9, alcohol: 0, protein: 8.7, carbs: 16.4, sugar: 0.3, fiber: 6.4, fat: 0.5, satFat: 0.07, monoFat: 0.04, polyFat: 0.28, transFat: 0, omega3: 0.17, cholesterol: 0, potassium: 403, calcium: 28, iron: 2.9, magnesium: 45, phosphorus: 142, sodium: 2, zinc: 1.07, copper: 0.24, manganese: 0.43, selenium: 1, vitA: 0, vitB1: 0.16, vitB2: 0.06, vitB3: 0.6, vitB5: 0.22, vitB6: 0.12, vitB9: 130, vitB12: 0, vitC: 1.2, vitD: 0, vitE: 0, vitK: 8.4, choline: 30.5 },
    },
    {
      id: "weisse-bohnen-gekocht",
      name: "Weiße Bohnen (gekocht)",
      portions: [["1 Portion (150 g)", 150], ["1/2 Dose (abgetropft 120 g)", 120]],
      n: { energy: 139, water: 63.1, alcohol: 0, protein: 9.7, carbs: 18.8, sugar: 0.3, fiber: 6.3, fat: 0.4, satFat: 0.09, monoFat: 0.03, polyFat: 0.15, transFat: 0, cholesterol: 0, potassium: 561, calcium: 90, iron: 3.7, magnesium: 63, phosphorus: 113, sodium: 6, zinc: 1.38, copper: 0.26, manganese: 0.64, selenium: 1, vitA: 0, vitB1: 0.12, vitB2: 0.05, vitB3: 0.1, vitB5: 0.23, vitB6: 0.11, vitB9: 81, vitB12: 0, vitC: 0, vitD: 0 },
    },
    {
      id: "edamame",
      name: "Edamame",
      portions: [["1 Portion (100 g)", 100], ["1 Schale (150 g)", 150]],
      n: { energy: 121, water: 72.8, alcohol: 0, protein: 11.9, carbs: 3.7, sugar: 2.2, fiber: 5.2, fat: 5.2, satFat: 0.62, monoFat: 1.28, polyFat: 2.16, transFat: 0, omega3: 0.36, cholesterol: 0, potassium: 436, calcium: 63, iron: 2.3, magnesium: 64, phosphorus: 169, sodium: 6, zinc: 1.37, copper: 0.35, manganese: 1.01, selenium: 1, vitA: 15, vitB1: 0.2, vitB2: 0.16, vitB3: 0.9, vitB5: 0.54, vitB6: 0.1, vitB9: 311, vitB12: 0, vitC: 6.1, vitD: 0, vitE: 0.7, vitK: 26.7, choline: 56.3 },
    },
    {
      id: "hummus",
      name: "Hummus",
      portions: [["1 EL", 30], ["1 Portion (75 g)", 75]],
      n: { energy: 166, water: 66.6, alcohol: 0, protein: 7.9, carbs: 8.3, sugar: 0.3, fiber: 6, fat: 9.6, satFat: 1.44, monoFat: 4.03, polyFat: 3.61, transFat: 0, cholesterol: 0, potassium: 228, calcium: 38, iron: 2.4, magnesium: 71, phosphorus: 176, sodium: 379, zinc: 1.83, copper: 0.53, manganese: 0.77, selenium: 3, vitA: 1, vitB1: 0.18, vitB2: 0.06, vitB3: 0.6, vitB6: 0.2, vitB9: 83, vitB12: 0, vitC: 0, vitD: 0, vitE: 1.8, vitK: 3 },
    },
    {
      id: "baked-beans-dose",
      name: "Baked Beans (Dose)",
      portions: [["1/2 Dose (210 g)", 210], ["3 EL", 90]],
      n: { energy: 79, water: 73, alcohol: 0, protein: 4.7, carbs: 12.9, sugar: 4.9, fiber: 3.8, fat: 0.2, satFat: 0.1, transFat: 0, cholesterol: 0, potassium: 300, calcium: 40, iron: 1.2, magnesium: 27, phosphorus: 100, sodium: 250, zinc: 1.1, copper: 0.2, manganese: 0.5, vitB1: 0.1, vitB2: 0.06, vitB3: 0.4, vitB6: 0.12, vitB9: 12, vitB12: 0, vitD: 0 },
    },
    {
      id: "falafel",
      name: "Falafel",
      portions: [["1 Portion (5 Bällchen)", 85], ["1 Bällchen", 17]],
      n: { energy: 333, water: 34.6, alcohol: 0, protein: 13.3, carbs: 26.9, sugar: 1.5, fiber: 4.9, fat: 17.8, satFat: 2.39, monoFat: 10.11, polyFat: 4.13, transFat: 0, cholesterol: 0, potassium: 585, calcium: 54, iron: 3.4, magnesium: 82, phosphorus: 192, sodium: 294, zinc: 1.5, copper: 0.25, manganese: 0.69, vitB1: 0.15, vitB2: 0.17, vitB3: 1, vitB5: 0.29, vitB6: 0.13, vitB9: 78, vitB12: 0, vitC: 1.6, vitD: 0 },
    },
  ],
};
