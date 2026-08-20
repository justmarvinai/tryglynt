/**
 * Supplemente — kind "supplement": Werte je 100 g Präparat, Portionen in
 * Tabletten-/Kapselgewicht. Konzentrationen sind gewollt hoch (Validator-
 * Plausibilitätsgrenzen gelten hier nicht). Dosen typischer Drogerie-
 * Präparate (DE). Whey ist reguläres Lebensmittel in dieser Kategorie.
 */
import type { SeedCategoryFile } from "../types";

export const supplemente: SeedCategoryFile = {
  category: "supplemente",
  foods: [
    {
      id: "vitamin-d3-800ie",
      name: "Vitamin D3 (800 I.E. / 20 µg)",
      kind: "supplement",
      portions: [["1 Tablette", 0.2]],
      n: { energy: 0, protein: 0, carbs: 0, fat: 0, vitD: 10000 },
    },
    {
      id: "vitamin-b12-500",
      name: "Vitamin B12 (500 µg)",
      kind: "supplement",
      portions: [["1 Tablette", 0.3]],
      n: { energy: 0, protein: 0, carbs: 0, fat: 0, vitB12: 166667 },
    },
    {
      id: "multivitamin",
      name: "Multivitamin-Tablette (100 % NRV)",
      kind: "supplement",
      portions: [["1 Tablette", 1]],
      n: { energy: 0, protein: 0, carbs: 0, fat: 0, vitA: 80000, vitB1: 110, vitB2: 140, vitB3: 1600, vitB5: 600, vitB6: 140, vitB7: 5000, vitB9: 20000, vitB12: 250, vitC: 8000, vitD: 500, vitE: 1200, vitK: 7500 },
    },
    {
      id: "magnesium-300",
      name: "Magnesium (300 mg)",
      kind: "supplement",
      portions: [["1 Tablette", 1.5]],
      n: { energy: 0, protein: 0, carbs: 0, fat: 0, magnesium: 20000 },
    },
    {
      id: "omega-3-kapsel",
      name: "Omega-3-Kapsel (1000 mg Fischöl)",
      kind: "supplement",
      portions: [["1 Kapsel", 1.4]],
      n: { energy: 643, protein: 0, carbs: 0, fat: 71.4, satFat: 16, monoFat: 25, polyFat: 28, omega3: 21.4, cholesterol: 340, vitD: 0, vitE: 700 },
    },
    {
      id: "eisen-14",
      name: "Eisen (14 mg)",
      kind: "supplement",
      portions: [["1 Tablette", 0.5]],
      n: { energy: 0, protein: 0, carbs: 0, fat: 0, iron: 2800 },
    },
    {
      id: "zink-10",
      name: "Zink (10 mg)",
      kind: "supplement",
      portions: [["1 Tablette", 0.5]],
      n: { energy: 0, protein: 0, carbs: 0, fat: 0, zinc: 2000 },
    },
    {
      id: "jod-150",
      name: "Jod (150 µg)",
      kind: "supplement",
      portions: [["1 Tablette", 0.2]],
      n: { energy: 0, protein: 0, carbs: 0, fat: 0, iodine: 75000 },
    },
    {
      id: "folsaeure-400",
      name: "Folsäure (400 µg)",
      kind: "supplement",
      portions: [["1 Tablette", 0.3]],
      n: { energy: 0, protein: 0, carbs: 0, fat: 0, vitB9: 133333 },
    },
    {
      id: "whey-protein",
      name: "Whey Protein (neutral)",
      portions: [["1 Messlöffel (30 g)", 30]],
      n: { energy: 385, water: 5, protein: 78, carbs: 6, sugar: 5, fiber: 0, fat: 5.5, satFat: 3.5, monoFat: 1.5, polyFat: 0.5, transFat: 0.2, cholesterol: 180, potassium: 500, calcium: 450, iron: 1, magnesium: 90, phosphorus: 350, sodium: 200, zinc: 1.2, vitB2: 1.2, vitB12: 2.5 },
    },
  ],
};
