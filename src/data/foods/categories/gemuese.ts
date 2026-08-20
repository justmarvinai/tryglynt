/**
 * Gemüse — Werte je 100 g essbarer Anteil (roh, sofern nicht anders
 * benannt). Quellenbasis: USDA FoodData Central / BLS-typische
 * Referenzwerte; Kohlenhydrate ohne Ballaststoffe (EU-Konvention).
 * Fehlender Wert = keine Daten (nicht 0!).
 */
import type { SeedCategoryFile } from "../types";

export const gemuese: SeedCategoryFile = {
  category: "gemuese",
  foods: [
    {
      id: "tomate",
      name: "Tomate",
      portions: [["1 mittlere Tomate", 100], ["1 kleine Tomate", 60], ["1 große Tomate", 150]],
      n: { energy: 18, water: 94.5, alcohol: 0, protein: 0.9, carbs: 2.7, sugar: 2.6, fiber: 1.2, fat: 0.2, satFat: 0.03, monoFat: 0.03, polyFat: 0.08, transFat: 0, cholesterol: 0, potassium: 237, calcium: 10, iron: 0.3, magnesium: 11, phosphorus: 24, sodium: 5, zinc: 0.17, copper: 0.06, manganese: 0.11, selenium: 0, vitA: 42, vitB1: 0.04, vitB2: 0.02, vitB3: 0.6, vitB5: 0.09, vitB6: 0.08, vitB9: 15, vitB12: 0, vitC: 13.7, vitD: 0, vitE: 0.5, vitK: 7.9, choline: 6.7 },
    },
    {
      id: "cherrytomaten",
      name: "Cherrytomaten",
      portions: [["1 Handvoll", 100], ["1 Cherrytomate", 12], ["1 Schale (250 g)", 250]],
      n: { energy: 21, water: 93, alcohol: 0, protein: 1, carbs: 3.2, sugar: 3.1, fiber: 1.3, fat: 0.3, satFat: 0.03, monoFat: 0.03, polyFat: 0.09, transFat: 0, cholesterol: 0, potassium: 250, calcium: 11, iron: 0.3, magnesium: 12, phosphorus: 26, sodium: 6, zinc: 0.18, copper: 0.06, manganese: 0.12, vitA: 45, vitB1: 0.04, vitB2: 0.02, vitB3: 0.6, vitB5: 0.1, vitB6: 0.09, vitB9: 16, vitB12: 0, vitC: 22, vitD: 0, vitE: 0.6, vitK: 8, choline: 7 },
    },
    {
      id: "salatgurke",
      name: "Salatgurke",
      portions: [["1/2 Gurke", 200], ["5 Scheiben", 50], ["1 Gurke", 400]],
      n: { energy: 15, water: 95.2, alcohol: 0, protein: 0.7, carbs: 3.1, sugar: 1.7, fiber: 0.5, fat: 0.1, satFat: 0.04, monoFat: 0.01, polyFat: 0.03, transFat: 0, cholesterol: 0, potassium: 147, calcium: 16, iron: 0.3, magnesium: 13, phosphorus: 24, sodium: 2, zinc: 0.2, copper: 0.04, manganese: 0.08, selenium: 0, vitA: 5, vitB1: 0.03, vitB2: 0.03, vitB3: 0.1, vitB5: 0.26, vitB6: 0.04, vitB9: 7, vitB12: 0, vitC: 2.8, vitD: 0, vitE: 0, vitK: 16.4, choline: 6 },
    },
    {
      id: "paprika-rot",
      name: "Paprika, rot",
      portions: [["1 Paprika", 150], ["1/2 Paprika", 75]],
      n: { energy: 31, water: 92.2, alcohol: 0, protein: 1, carbs: 3.9, sugar: 3.9, fiber: 2.1, fat: 0.3, satFat: 0.03, monoFat: 0.01, polyFat: 0.07, transFat: 0, omega3: 0.03, cholesterol: 0, potassium: 211, calcium: 7, iron: 0.4, magnesium: 12, phosphorus: 26, sodium: 4, zinc: 0.25, copper: 0.02, manganese: 0.11, selenium: 0, vitA: 157, vitB1: 0.05, vitB2: 0.09, vitB3: 1, vitB5: 0.32, vitB6: 0.29, vitB9: 46, vitB12: 0, vitC: 127.7, vitD: 0, vitE: 1.6, vitK: 4.9, choline: 5.6 },
    },
    {
      id: "karotte",
      name: "Karotte",
      portions: [["1 Karotte", 80], ["1 kleine Karotte", 50], ["1 große Karotte", 120]],
      n: { energy: 41, water: 88.3, alcohol: 0, protein: 0.9, carbs: 6.8, sugar: 4.7, fiber: 2.8, fat: 0.2, satFat: 0.04, monoFat: 0.01, polyFat: 0.12, transFat: 0, cholesterol: 0, potassium: 320, calcium: 33, iron: 0.3, magnesium: 12, phosphorus: 35, sodium: 69, zinc: 0.24, copper: 0.05, manganese: 0.14, selenium: 0, vitA: 835, vitB1: 0.07, vitB2: 0.06, vitB3: 1, vitB5: 0.27, vitB6: 0.14, vitB7: 5, vitB9: 19, vitB12: 0, vitC: 5.9, vitD: 0, vitE: 0.7, vitK: 13.2, choline: 8.8 },
    },
    {
      id: "brokkoli-gekocht",
      name: "Brokkoli (gekocht)",
      portions: [["1 Portion (200 g)", 200], ["1 Röschen", 20]],
      n: { energy: 35, water: 89.3, alcohol: 0, protein: 2.4, carbs: 3.9, sugar: 1.4, fiber: 3.3, fat: 0.4, satFat: 0.08, monoFat: 0.03, polyFat: 0.17, transFat: 0, omega3: 0.12, cholesterol: 0, potassium: 293, calcium: 40, iron: 0.7, magnesium: 21, phosphorus: 67, sodium: 41, zinc: 0.45, copper: 0.06, manganese: 0.19, selenium: 2, iodine: 15, vitA: 77, vitB1: 0.06, vitB2: 0.12, vitB3: 0.6, vitB5: 0.62, vitB6: 0.2, vitB9: 108, vitB12: 0, vitC: 64.9, vitD: 0, vitE: 1.5, vitK: 141.1, choline: 40.1 },
    },
    {
      id: "blumenkohl-gekocht",
      name: "Blumenkohl (gekocht)",
      portions: [["1 Portion (200 g)", 200], ["1 Röschen", 25]],
      n: { energy: 23, water: 93, alcohol: 0, protein: 1.8, carbs: 1.8, sugar: 1.8, fiber: 2.3, fat: 0.5, satFat: 0.07, monoFat: 0.03, polyFat: 0.22, transFat: 0, omega3: 0.1, cholesterol: 0, potassium: 142, calcium: 16, iron: 0.2, magnesium: 9, phosphorus: 32, sodium: 15, zinc: 0.17, copper: 0.02, manganese: 0.13, selenium: 1, vitA: 0, vitB1: 0.04, vitB2: 0.05, vitB3: 0.4, vitB5: 0.51, vitB6: 0.17, vitB9: 44, vitB12: 0, vitC: 44.3, vitD: 0, vitE: 0.1, vitK: 13.8, choline: 39.1 },
    },
    {
      id: "spinat",
      name: "Spinat",
      portions: [["1 Portion (150 g)", 150], ["1 Handvoll", 30]],
      n: { energy: 23, water: 91.4, alcohol: 0, protein: 2.9, carbs: 1.4, sugar: 0.4, fiber: 2.2, fat: 0.4, satFat: 0.06, monoFat: 0.01, polyFat: 0.17, transFat: 0, omega3: 0.14, cholesterol: 0, potassium: 558, calcium: 99, iron: 2.7, magnesium: 79, phosphorus: 49, sodium: 79, zinc: 0.53, copper: 0.13, manganese: 0.9, selenium: 1, iodine: 12, vitA: 469, vitB1: 0.08, vitB2: 0.19, vitB3: 0.7, vitB5: 0.07, vitB6: 0.2, vitB7: 7, vitB9: 194, vitB12: 0, vitC: 28.1, vitD: 0, vitE: 2, vitK: 482.9, choline: 19.3 },
    },
    {
      id: "gruenkohl",
      name: "Grünkohl",
      portions: [["1 Portion (150 g)", 150], ["1 Handvoll", 25]],
      n: { energy: 35, water: 89.6, alcohol: 0, protein: 2.9, carbs: 0.3, sugar: 0.3, fiber: 4.1, fat: 1.5, satFat: 0.18, monoFat: 0.1, polyFat: 0.67, transFat: 0, omega3: 0.38, cholesterol: 0, potassium: 348, calcium: 254, iron: 1.6, magnesium: 33, phosphorus: 55, sodium: 53, zinc: 0.39, copper: 0.05, manganese: 0.92, selenium: 1, vitA: 241, vitB1: 0.11, vitB2: 0.35, vitB3: 1.2, vitB5: 0.37, vitB6: 0.15, vitB9: 62, vitB12: 0, vitC: 93.4, vitD: 0, vitE: 0.7, vitK: 389.6, choline: 0.8 },
    },
    {
      id: "zucchini",
      name: "Zucchini",
      portions: [["1/2 Zucchini", 100], ["1 Zucchini", 200]],
      n: { energy: 17, water: 94.8, alcohol: 0, protein: 1.2, carbs: 2.1, sugar: 2.1, fiber: 1, fat: 0.3, satFat: 0.08, monoFat: 0.01, polyFat: 0.09, transFat: 0, cholesterol: 0, potassium: 261, calcium: 16, iron: 0.4, magnesium: 18, phosphorus: 38, sodium: 8, zinc: 0.32, copper: 0.05, manganese: 0.18, selenium: 0, vitA: 10, vitB1: 0.05, vitB2: 0.09, vitB3: 0.5, vitB5: 0.2, vitB6: 0.16, vitB9: 24, vitB12: 0, vitC: 17.9, vitD: 0, vitE: 0.1, vitK: 4.3, choline: 9.5 },
    },
    {
      id: "aubergine",
      name: "Aubergine",
      portions: [["1/2 Aubergine", 125], ["1 Aubergine", 250]],
      n: { energy: 25, water: 92.3, alcohol: 0, protein: 1, carbs: 2.9, sugar: 2.9, fiber: 3, fat: 0.2, satFat: 0.03, monoFat: 0.02, polyFat: 0.08, transFat: 0, omega3: 0.01, cholesterol: 0, potassium: 229, calcium: 9, iron: 0.2, magnesium: 14, phosphorus: 24, sodium: 2, zinc: 0.16, copper: 0.08, manganese: 0.23, selenium: 0, vitA: 1, vitB1: 0.04, vitB2: 0.04, vitB3: 0.6, vitB5: 0.28, vitB6: 0.08, vitB9: 22, vitB12: 0, vitC: 2.2, vitD: 0, vitE: 0.3, vitK: 3.5, choline: 6.9 },
    },
    {
      id: "champignons",
      name: "Champignons",
      portions: [["1 Portion (125 g)", 125], ["1 Champignon", 15], ["1 Packung (250 g)", 250]],
      n: { energy: 22, water: 92.4, alcohol: 0, protein: 3.1, carbs: 2.3, sugar: 2, fiber: 1, fat: 0.3, satFat: 0.05, monoFat: 0, polyFat: 0.16, transFat: 0, cholesterol: 0, potassium: 318, calcium: 3, iron: 0.5, magnesium: 9, phosphorus: 86, sodium: 5, zinc: 0.52, copper: 0.32, manganese: 0.05, selenium: 9, vitA: 0, vitB1: 0.08, vitB2: 0.4, vitB3: 3.6, vitB5: 1.5, vitB6: 0.1, vitB7: 16, vitB9: 17, vitB12: 0, vitC: 2.1, vitD: 0.2, vitE: 0, vitK: 0, choline: 17.3 },
    },
    {
      id: "zwiebel",
      name: "Zwiebel",
      portions: [["1 mittlere Zwiebel", 90], ["1 kleine Zwiebel", 60], ["1 EL gewürfelt", 10]],
      n: { energy: 40, water: 89.1, alcohol: 0, protein: 1.1, carbs: 7.6, sugar: 4.2, fiber: 1.7, fat: 0.1, satFat: 0.04, monoFat: 0.01, polyFat: 0.02, transFat: 0, cholesterol: 0, potassium: 146, calcium: 23, iron: 0.2, magnesium: 10, phosphorus: 29, sodium: 4, zinc: 0.17, copper: 0.04, manganese: 0.13, selenium: 1, vitA: 0, vitB1: 0.05, vitB2: 0.03, vitB3: 0.1, vitB5: 0.12, vitB6: 0.12, vitB9: 19, vitB12: 0, vitC: 7.4, vitD: 0, vitE: 0, vitK: 0.4, choline: 6.1 },
    },
    {
      id: "knoblauch",
      name: "Knoblauch",
      portions: [["1 Zehe", 3], ["1 Knolle", 40]],
      n: { energy: 149, water: 58.6, alcohol: 0, protein: 6.4, carbs: 31, sugar: 1, fiber: 2.1, fat: 0.5, satFat: 0.09, monoFat: 0.01, polyFat: 0.25, transFat: 0, omega3: 0.02, cholesterol: 0, potassium: 401, calcium: 181, iron: 1.7, magnesium: 25, phosphorus: 153, sodium: 17, zinc: 1.16, copper: 0.3, manganese: 1.67, selenium: 14, vitA: 0, vitB1: 0.2, vitB2: 0.11, vitB3: 0.7, vitB5: 0.6, vitB6: 1.24, vitB9: 3, vitB12: 0, vitC: 31.2, vitD: 0, vitE: 0.1, vitK: 1.7, choline: 23.2 },
    },
    {
      id: "kartoffeln-gekocht",
      name: "Kartoffeln (gekocht)",
      portions: [["1 Portion (250 g)", 250], ["1 mittlere Kartoffel", 100], ["1 kleine Kartoffel", 70]],
      n: { energy: 86, water: 77, alcohol: 0, protein: 1.7, carbs: 18.2, sugar: 0.9, fiber: 1.8, fat: 0.1, satFat: 0.03, monoFat: 0, polyFat: 0.04, transFat: 0, omega3: 0.01, cholesterol: 0, potassium: 328, calcium: 8, iron: 0.3, magnesium: 20, phosphorus: 40, sodium: 5, zinc: 0.27, copper: 0.17, manganese: 0.14, selenium: 0, vitA: 0, vitB1: 0.1, vitB2: 0.02, vitB3: 1.3, vitB5: 0.51, vitB6: 0.27, vitB9: 9, vitB12: 0, vitC: 7.4, vitD: 0, vitE: 0, vitK: 2.2, choline: 13.5 },
    },
    {
      id: "suesskartoffel-gekocht",
      name: "Süßkartoffel (gekocht)",
      portions: [["1 Portion (200 g)", 200], ["1 mittlere Süßkartoffel", 130]],
      n: { energy: 76, water: 80.1, alcohol: 0, protein: 1.4, carbs: 15.2, sugar: 5.7, fiber: 2.5, fat: 0.1, satFat: 0.03, monoFat: 0, polyFat: 0.06, transFat: 0, cholesterol: 0, potassium: 230, calcium: 27, iron: 0.7, magnesium: 18, phosphorus: 32, sodium: 27, zinc: 0.2, copper: 0.09, manganese: 0.27, selenium: 0, vitA: 787, vitB1: 0.06, vitB2: 0.05, vitB3: 0.5, vitB5: 0.58, vitB6: 0.17, vitB9: 6, vitB12: 0, vitC: 12.8, vitD: 0, vitE: 0.9, vitK: 2.1, choline: 10.8 },
    },
    {
      id: "hokkaido-kuerbis",
      name: "Hokkaido-Kürbis",
      portions: [["1 Portion (200 g)", 200], ["1 Spalte", 75]],
      n: { energy: 34, water: 89.8, alcohol: 0, protein: 1, carbs: 7.1, sugar: 2.2, fiber: 1.5, fat: 0.1, satFat: 0.03, monoFat: 0.01, polyFat: 0.06, transFat: 0, cholesterol: 0, potassium: 350, calcium: 28, iron: 0.6, magnesium: 14, phosphorus: 23, sodium: 4, zinc: 0.13, copper: 0.06, manganese: 0.16, selenium: 0, vitA: 68, vitB1: 0.03, vitB2: 0.06, vitB3: 0.5, vitB5: 0.16, vitB6: 0.16, vitB9: 24, vitB12: 0, vitC: 12.3, vitD: 0, vitE: 0.1, vitK: 1.1 },
    },
    {
      id: "rote-bete",
      name: "Rote Bete",
      portions: [["1 Knolle", 100], ["1 Portion (150 g)", 150]],
      n: { energy: 43, water: 87.6, alcohol: 0, protein: 1.6, carbs: 6.8, sugar: 6.8, fiber: 2.8, fat: 0.2, satFat: 0.03, monoFat: 0.03, polyFat: 0.06, transFat: 0, omega3: 0.01, cholesterol: 0, potassium: 325, calcium: 16, iron: 0.8, magnesium: 23, phosphorus: 40, sodium: 78, zinc: 0.35, copper: 0.08, manganese: 0.33, selenium: 1, vitA: 2, vitB1: 0.03, vitB2: 0.04, vitB3: 0.3, vitB5: 0.16, vitB6: 0.07, vitB9: 109, vitB12: 0, vitC: 4.9, vitD: 0, vitE: 0, vitK: 0.2, choline: 6.3 },
    },
    {
      id: "eisbergsalat",
      name: "Eisbergsalat",
      portions: [["1 Portion (80 g)", 80], ["1 Blatt", 20], ["1/2 Kopf", 250]],
      n: { energy: 14, water: 95.6, alcohol: 0, protein: 0.9, carbs: 1.8, sugar: 1.8, fiber: 1.2, fat: 0.1, satFat: 0.02, monoFat: 0.01, polyFat: 0.07, transFat: 0, omega3: 0.04, cholesterol: 0, potassium: 141, calcium: 18, iron: 0.4, magnesium: 7, phosphorus: 20, sodium: 10, zinc: 0.15, copper: 0.03, manganese: 0.13, selenium: 0, vitA: 25, vitB1: 0.04, vitB2: 0.03, vitB3: 0.1, vitB5: 0.09, vitB6: 0.04, vitB9: 29, vitB12: 0, vitC: 2.8, vitD: 0, vitE: 0.2, vitK: 24.1, choline: 6.7 },
    },
    {
      id: "rucola",
      name: "Rucola",
      portions: [["1 Handvoll", 20], ["1 Packung (125 g)", 125]],
      n: { energy: 25, water: 91.7, alcohol: 0, protein: 2.6, carbs: 2.1, sugar: 2, fiber: 1.6, fat: 0.7, satFat: 0.09, monoFat: 0.05, polyFat: 0.32, transFat: 0, omega3: 0.17, cholesterol: 0, potassium: 369, calcium: 160, iron: 1.5, magnesium: 47, phosphorus: 52, sodium: 27, zinc: 0.47, copper: 0.08, manganese: 0.32, selenium: 0, vitA: 119, vitB1: 0.04, vitB2: 0.09, vitB3: 0.3, vitB5: 0.44, vitB6: 0.07, vitB9: 97, vitB12: 0, vitC: 15, vitD: 0, vitE: 0.4, vitK: 108.6, choline: 15.3 },
    },
    {
      id: "feldsalat",
      name: "Feldsalat",
      portions: [["1 Portion (50 g)", 50], ["1 Handvoll", 20]],
      n: { energy: 16, water: 92.8, alcohol: 0, protein: 1.8, carbs: 0.7, sugar: 0.7, fiber: 1.5, fat: 0.4, cholesterol: 0, potassium: 420, calcium: 35, iron: 2, magnesium: 13, phosphorus: 50, sodium: 4, zinc: 0.5, copper: 0.13, manganese: 0.36, selenium: 1, vitA: 355, vitB1: 0.07, vitB2: 0.09, vitB3: 0.4, vitB6: 0.25, vitB9: 145, vitB12: 0, vitC: 35, vitD: 0, vitE: 0.6 },
    },
    {
      id: "erbsen-gekocht",
      name: "Erbsen (gekocht)",
      portions: [["1 Portion (150 g)", 150], ["3 EL", 60]],
      n: { energy: 84, water: 77.9, alcohol: 0, protein: 5.4, carbs: 10.1, sugar: 5.9, fiber: 5.5, fat: 0.2, satFat: 0.04, monoFat: 0.02, polyFat: 0.1, transFat: 0, omega3: 0.04, cholesterol: 0, potassium: 271, calcium: 27, iron: 1.5, magnesium: 39, phosphorus: 117, sodium: 3, zinc: 1.19, copper: 0.17, manganese: 0.53, selenium: 2, vitA: 40, vitB1: 0.26, vitB2: 0.15, vitB3: 2, vitB5: 0.15, vitB6: 0.22, vitB9: 63, vitB12: 0, vitC: 14.2, vitD: 0, vitE: 0.1, vitK: 25.9, choline: 30.4 },
    },
    {
      id: "mais-dose",
      name: "Mais (Dose)",
      portions: [["3 EL", 60], ["1 kleine Dose (abgetropft 140 g)", 140]],
      n: { energy: 77, water: 77, alcohol: 0, protein: 2.9, carbs: 9.6, sugar: 3.6, fiber: 3.4, fat: 1.5, satFat: 0.2, monoFat: 0.4, polyFat: 0.7, transFat: 0, cholesterol: 0, potassium: 176, calcium: 4, iron: 0.4, magnesium: 21, phosphorus: 60, sodium: 160, zinc: 0.4, copper: 0.04, manganese: 0.12, selenium: 1, vitA: 10, vitB1: 0.03, vitB2: 0.05, vitB3: 0.9, vitB5: 0.7, vitB6: 0.05, vitB9: 40, vitB12: 0, vitC: 5.5, vitD: 0, vitE: 0.1, vitK: 0.4, choline: 22 },
    },
  ],
};
