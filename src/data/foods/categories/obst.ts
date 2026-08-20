/**
 * Obst — Werte je 100 g essbarer Anteil (roh, sofern nicht anders
 * benannt). Quellenbasis: USDA FoodData Central / BLS-typische
 * Referenzwerte. Fehlender Wert = keine Daten (nicht 0!).
 */
import type { SeedCategoryFile } from "../types";

export const obst: SeedCategoryFile = {
  category: "obst",
  foods: [
    {
      id: "apfel",
      name: "Apfel",
      portions: [["1 mittlerer Apfel", 180], ["1 kleiner Apfel", 130], ["1 großer Apfel", 220]],
      n: { energy: 52, water: 85.6, alcohol: 0, protein: 0.3, carbs: 11.4, sugar: 10.4, fiber: 2.4, fat: 0.2, satFat: 0.03, monoFat: 0.01, polyFat: 0.05, transFat: 0, omega3: 0.01, cholesterol: 0, potassium: 107, calcium: 6, iron: 0.1, magnesium: 5, phosphorus: 11, sodium: 1, zinc: 0.04, copper: 0.03, manganese: 0.04, selenium: 0, iodine: 1, vitA: 3, vitB1: 0.02, vitB2: 0.03, vitB3: 0.1, vitB5: 0.06, vitB6: 0.04, vitB9: 3, vitB12: 0, vitC: 4.6, vitD: 0, vitE: 0.2, vitK: 2.2, choline: 3.4 },
    },
    {
      id: "banane",
      name: "Banane",
      portions: [["1 mittlere Banane", 120], ["1 kleine Banane", 90], ["1 große Banane", 150]],
      n: { energy: 89, water: 74.9, alcohol: 0, protein: 1.1, carbs: 20.2, sugar: 12.2, fiber: 2.6, fat: 0.3, satFat: 0.11, monoFat: 0.03, polyFat: 0.07, transFat: 0, omega3: 0.03, cholesterol: 0, potassium: 358, calcium: 5, iron: 0.3, magnesium: 27, phosphorus: 22, sodium: 1, zinc: 0.15, copper: 0.08, manganese: 0.27, selenium: 1, iodine: 2, vitA: 3, vitB1: 0.03, vitB2: 0.07, vitB3: 0.7, vitB5: 0.33, vitB6: 0.37, vitB7: 5, vitB9: 20, vitB12: 0, vitC: 8.7, vitD: 0, vitE: 0.1, vitK: 0.5, choline: 9.8 },
    },
    {
      id: "orange",
      name: "Orange",
      portions: [["1 mittlere Orange", 150], ["1 kleine Orange", 100]],
      n: { energy: 47, water: 86.8, alcohol: 0, protein: 0.9, carbs: 9.4, sugar: 9.4, fiber: 2.4, fat: 0.1, satFat: 0.02, monoFat: 0.02, polyFat: 0.03, transFat: 0, omega3: 0.01, cholesterol: 0, potassium: 181, calcium: 40, iron: 0.1, magnesium: 10, phosphorus: 14, sodium: 0, zinc: 0.07, copper: 0.05, manganese: 0.03, selenium: 1, iodine: 1, vitA: 11, vitB1: 0.09, vitB2: 0.04, vitB3: 0.3, vitB5: 0.25, vitB6: 0.06, vitB9: 30, vitB12: 0, vitC: 53.2, vitD: 0, vitE: 0.2, vitK: 0, choline: 8.4 },
    },
    {
      id: "erdbeeren",
      name: "Erdbeeren",
      portions: [["1 Schale (250 g)", 250], ["1 Handvoll", 100], ["1 Erdbeere", 15]],
      n: { energy: 32, water: 91, alcohol: 0, protein: 0.7, carbs: 5.7, sugar: 4.9, fiber: 2, fat: 0.3, satFat: 0.02, monoFat: 0.04, polyFat: 0.16, transFat: 0, omega3: 0.07, cholesterol: 0, potassium: 153, calcium: 16, iron: 0.4, magnesium: 13, phosphorus: 24, sodium: 1, zinc: 0.14, copper: 0.05, manganese: 0.39, selenium: 0, iodine: 1, vitA: 1, vitB1: 0.02, vitB2: 0.02, vitB3: 0.4, vitB5: 0.13, vitB6: 0.05, vitB7: 4, vitB9: 24, vitB12: 0, vitC: 58.8, vitD: 0, vitE: 0.3, vitK: 2.2, choline: 5.7 },
    },
    {
      id: "blaubeeren",
      name: "Blaubeeren",
      portions: [["1 Handvoll", 75], ["1 Schale (125 g)", 125]],
      n: { energy: 57, water: 84.2, alcohol: 0, protein: 0.7, carbs: 12.1, sugar: 10, fiber: 2.4, fat: 0.3, satFat: 0.03, monoFat: 0.05, polyFat: 0.15, transFat: 0, omega3: 0.06, cholesterol: 0, potassium: 77, calcium: 6, iron: 0.3, magnesium: 6, phosphorus: 12, sodium: 1, zinc: 0.16, copper: 0.06, manganese: 0.34, selenium: 0, vitA: 3, vitB1: 0.04, vitB2: 0.04, vitB3: 0.4, vitB5: 0.12, vitB6: 0.05, vitB9: 6, vitB12: 0, vitC: 9.7, vitD: 0, vitE: 0.6, vitK: 19.3, choline: 6 },
    },
    {
      id: "himbeeren",
      name: "Himbeeren",
      portions: [["1 Handvoll", 60], ["1 Schale (125 g)", 125]],
      n: { energy: 52, water: 85.8, alcohol: 0, protein: 1.2, carbs: 5.4, sugar: 4.4, fiber: 6.5, fat: 0.7, satFat: 0.02, monoFat: 0.06, polyFat: 0.38, transFat: 0, omega3: 0.13, cholesterol: 0, potassium: 151, calcium: 25, iron: 0.7, magnesium: 22, phosphorus: 29, sodium: 1, zinc: 0.42, copper: 0.09, manganese: 0.67, selenium: 0, vitA: 2, vitB1: 0.03, vitB2: 0.04, vitB3: 0.6, vitB5: 0.33, vitB6: 0.06, vitB9: 21, vitB12: 0, vitC: 26.2, vitD: 0, vitE: 0.9, vitK: 7.8, choline: 12.3 },
    },
    {
      id: "weintrauben",
      name: "Weintrauben",
      portions: [["1 Handvoll", 80], ["1 kleine Rispe", 150]],
      n: { energy: 69, water: 80.5, alcohol: 0, protein: 0.7, carbs: 17.2, sugar: 15.5, fiber: 0.9, fat: 0.2, satFat: 0.05, monoFat: 0.01, polyFat: 0.05, transFat: 0, omega3: 0.01, cholesterol: 0, potassium: 191, calcium: 10, iron: 0.4, magnesium: 7, phosphorus: 20, sodium: 2, zinc: 0.07, copper: 0.13, manganese: 0.07, selenium: 0, iodine: 1, vitA: 3, vitB1: 0.07, vitB2: 0.07, vitB3: 0.2, vitB5: 0.05, vitB6: 0.09, vitB9: 2, vitB12: 0, vitC: 3.2, vitD: 0, vitE: 0.2, vitK: 14.6, choline: 5.6 },
    },
    {
      id: "birne",
      name: "Birne",
      portions: [["1 mittlere Birne", 170], ["1 kleine Birne", 130]],
      n: { energy: 57, water: 84, alcohol: 0, protein: 0.4, carbs: 12.1, sugar: 9.8, fiber: 3.1, fat: 0.1, satFat: 0.02, monoFat: 0.03, polyFat: 0.03, transFat: 0, omega3: 0, cholesterol: 0, potassium: 116, calcium: 9, iron: 0.2, magnesium: 7, phosphorus: 12, sodium: 1, zinc: 0.1, copper: 0.08, manganese: 0.05, selenium: 0, iodine: 1, vitA: 1, vitB1: 0.01, vitB2: 0.03, vitB3: 0.2, vitB5: 0.05, vitB6: 0.03, vitB9: 7, vitB12: 0, vitC: 4.3, vitD: 0, vitE: 0.1, vitK: 4.4, choline: 5.1 },
    },
    {
      id: "pfirsich",
      name: "Pfirsich",
      portions: [["1 mittlerer Pfirsich", 150]],
      n: { energy: 39, water: 88.9, alcohol: 0, protein: 0.9, carbs: 8.0, sugar: 8, fiber: 1.5, fat: 0.3, satFat: 0.02, monoFat: 0.07, polyFat: 0.09, transFat: 0, omega3: 0, cholesterol: 0, potassium: 190, calcium: 6, iron: 0.3, magnesium: 9, phosphorus: 20, sodium: 0, zinc: 0.17, copper: 0.07, manganese: 0.06, selenium: 0, vitA: 16, vitB1: 0.02, vitB2: 0.03, vitB3: 0.8, vitB5: 0.15, vitB6: 0.03, vitB9: 4, vitB12: 0, vitC: 6.6, vitD: 0, vitE: 0.7, vitK: 2.6, choline: 6.1 },
    },
    {
      id: "kiwi",
      name: "Kiwi",
      portions: [["1 Kiwi", 75]],
      n: { energy: 61, water: 83.1, alcohol: 0, protein: 1.1, carbs: 11.7, sugar: 9, fiber: 3, fat: 0.5, satFat: 0.03, monoFat: 0.05, polyFat: 0.29, transFat: 0, omega3: 0.04, cholesterol: 0, potassium: 312, calcium: 34, iron: 0.3, magnesium: 17, phosphorus: 34, sodium: 3, zinc: 0.14, copper: 0.13, manganese: 0.1, selenium: 0, iodine: 3, vitA: 4, vitB1: 0.03, vitB2: 0.03, vitB3: 0.3, vitB5: 0.18, vitB6: 0.06, vitB9: 25, vitB12: 0, vitC: 92.7, vitD: 0, vitE: 1.5, vitK: 40.3, choline: 7.8 },
    },
    {
      id: "ananas",
      name: "Ananas",
      portions: [["1 Scheibe", 80], ["1 Schale gewürfelt (150 g)", 150]],
      n: { energy: 50, water: 86, alcohol: 0, protein: 0.5, carbs: 11.7, sugar: 9.9, fiber: 1.4, fat: 0.1, satFat: 0.01, monoFat: 0.01, polyFat: 0.04, transFat: 0, omega3: 0.02, cholesterol: 0, potassium: 109, calcium: 13, iron: 0.3, magnesium: 12, phosphorus: 8, sodium: 1, zinc: 0.12, copper: 0.11, manganese: 0.93, selenium: 0, vitA: 3, vitB1: 0.08, vitB2: 0.03, vitB3: 0.5, vitB5: 0.21, vitB6: 0.11, vitB9: 18, vitB12: 0, vitC: 47.8, vitD: 0, vitE: 0, vitK: 0.7, choline: 5.5 },
    },
    {
      id: "mango",
      name: "Mango",
      portions: [["1/2 Mango", 100], ["1 Mango", 200]],
      n: { energy: 60, water: 83.5, alcohol: 0, protein: 0.8, carbs: 13.4, sugar: 13.4, fiber: 1.6, fat: 0.4, satFat: 0.09, monoFat: 0.14, polyFat: 0.07, transFat: 0, omega3: 0.05, cholesterol: 0, potassium: 168, calcium: 11, iron: 0.2, magnesium: 10, phosphorus: 14, sodium: 1, zinc: 0.09, copper: 0.11, manganese: 0.06, selenium: 1, vitA: 54, vitB1: 0.03, vitB2: 0.04, vitB3: 0.7, vitB5: 0.2, vitB6: 0.12, vitB9: 43, vitB12: 0, vitC: 36.4, vitD: 0, vitE: 0.9, vitK: 4.2, choline: 7.6 },
    },
    {
      id: "wassermelone",
      name: "Wassermelone",
      portions: [["1 Scheibe", 200], ["1 Schale gewürfelt (150 g)", 150]],
      n: { energy: 30, water: 91.4, alcohol: 0, protein: 0.6, carbs: 7.2, sugar: 6.2, fiber: 0.4, fat: 0.2, satFat: 0.02, monoFat: 0.04, polyFat: 0.05, transFat: 0, omega3: 0, cholesterol: 0, potassium: 112, calcium: 7, iron: 0.2, magnesium: 10, phosphorus: 11, sodium: 1, zinc: 0.1, copper: 0.04, manganese: 0.04, selenium: 0, vitA: 28, vitB1: 0.03, vitB2: 0.02, vitB3: 0.2, vitB5: 0.22, vitB6: 0.05, vitB9: 3, vitB12: 0, vitC: 8.1, vitD: 0, vitE: 0.1, vitK: 0.1, choline: 4.1 },
    },
    {
      id: "zitrone",
      name: "Zitrone",
      portions: [["Saft einer Zitrone", 45], ["1 Zitrone", 85]],
      n: { energy: 29, water: 89, alcohol: 0, protein: 1.1, carbs: 6.5, sugar: 2.5, fiber: 2.8, fat: 0.3, satFat: 0.04, monoFat: 0.01, polyFat: 0.09, transFat: 0, omega3: 0.03, cholesterol: 0, potassium: 138, calcium: 26, iron: 0.6, magnesium: 8, phosphorus: 16, sodium: 2, zinc: 0.06, copper: 0.04, manganese: 0.03, selenium: 0, vitA: 1, vitB1: 0.04, vitB2: 0.02, vitB3: 0.1, vitB5: 0.19, vitB6: 0.08, vitB9: 11, vitB12: 0, vitC: 53, vitD: 0, vitE: 0.2, vitK: 0, choline: 5.1 },
    },
    {
      id: "pflaume",
      name: "Pflaume",
      portions: [["1 Pflaume", 65], ["3 Pflaumen", 195]],
      n: { energy: 46, water: 87.2, alcohol: 0, protein: 0.7, carbs: 10.0, sugar: 9.9, fiber: 1.4, fat: 0.3, satFat: 0.02, monoFat: 0.13, polyFat: 0.04, transFat: 0, omega3: 0, cholesterol: 0, potassium: 157, calcium: 6, iron: 0.2, magnesium: 7, phosphorus: 16, sodium: 0, zinc: 0.1, copper: 0.06, manganese: 0.05, selenium: 0, vitA: 17, vitB1: 0.03, vitB2: 0.03, vitB3: 0.4, vitB5: 0.14, vitB6: 0.03, vitB9: 5, vitB12: 0, vitC: 9.5, vitD: 0, vitE: 0.3, vitK: 6.4, choline: 1.9 },
    },
    {
      id: "suesskirschen",
      name: "Süßkirschen",
      portions: [["1 Handvoll", 80], ["1 Schale (200 g)", 200]],
      n: { energy: 63, water: 82.2, alcohol: 0, protein: 1.1, carbs: 13.9, sugar: 12.8, fiber: 2.1, fat: 0.2, satFat: 0.04, monoFat: 0.05, polyFat: 0.05, transFat: 0, omega3: 0.03, cholesterol: 0, potassium: 222, calcium: 13, iron: 0.4, magnesium: 11, phosphorus: 21, sodium: 0, zinc: 0.07, copper: 0.06, manganese: 0.07, selenium: 0, vitA: 3, vitB1: 0.03, vitB2: 0.03, vitB3: 0.2, vitB5: 0.2, vitB6: 0.05, vitB9: 4, vitB12: 0, vitC: 7, vitD: 0, vitE: 0.1, vitK: 2.1, choline: 6.1 },
    },
    {
      id: "avocado",
      name: "Avocado",
      portions: [["1/2 Avocado", 100], ["1 Avocado", 200]],
      n: { energy: 160, water: 73.2, alcohol: 0, protein: 2, carbs: 1.8, sugar: 0.7, fiber: 6.7, fat: 14.7, satFat: 2.13, monoFat: 9.8, polyFat: 1.82, transFat: 0, omega3: 0.11, cholesterol: 0, potassium: 485, calcium: 12, iron: 0.6, magnesium: 29, phosphorus: 52, sodium: 7, zinc: 0.64, copper: 0.19, manganese: 0.14, selenium: 0, vitA: 7, vitB1: 0.07, vitB2: 0.13, vitB3: 1.7, vitB5: 1.39, vitB6: 0.26, vitB7: 3, vitB9: 81, vitB12: 0, vitC: 10, vitD: 0, vitE: 2.1, vitK: 21, choline: 14.2 },
    },
    {
      id: "rosinen",
      name: "Rosinen",
      portions: [["1 EL", 10], ["1 kleine Handvoll", 30]],
      n: { energy: 299, water: 15.4, alcohol: 0, protein: 3.1, carbs: 75.5, sugar: 59.2, fiber: 3.7, fat: 0.5, satFat: 0.06, monoFat: 0.05, polyFat: 0.04, transFat: 0, omega3: 0, cholesterol: 0, potassium: 749, calcium: 50, iron: 1.9, magnesium: 32, phosphorus: 101, sodium: 11, zinc: 0.22, copper: 0.32, manganese: 0.3, selenium: 1, vitA: 0, vitB1: 0.11, vitB2: 0.13, vitB3: 0.8, vitB5: 0.1, vitB6: 0.17, vitB9: 5, vitB12: 0, vitC: 2.3, vitD: 0, vitE: 0.1, vitK: 3.5, choline: 11.1 },
    },
    {
      id: "datteln",
      name: "Datteln (getrocknet)",
      portions: [["1 Dattel", 24], ["3 Datteln", 72]],
      n: { energy: 277, water: 21.3, alcohol: 0, protein: 1.8, carbs: 68.3, sugar: 66.5, fiber: 6.7, fat: 0.2, satFat: 0.03, monoFat: 0.04, polyFat: 0.02, transFat: 0, omega3: 0, cholesterol: 0, potassium: 696, calcium: 64, iron: 0.9, magnesium: 54, phosphorus: 62, sodium: 1, zinc: 0.44, copper: 0.36, manganese: 0.3, selenium: 3, vitA: 7, vitB1: 0.05, vitB2: 0.06, vitB3: 1.6, vitB5: 0.8, vitB6: 0.25, vitB9: 15, vitB12: 0, vitC: 0, vitD: 0, vitE: 0, vitK: 2.7, choline: 9.9 },
    },
  ],
};
