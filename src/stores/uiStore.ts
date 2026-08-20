/**
 * UI state (docs/ARCHITECTURE.md §4): active diary date + the global
 * logging flow sheets. Data itself lives in Dexie.
 */

import { create } from "zustand";
import type { DiaryEntry } from "@/lib/db/models";
import { todayISO } from "@/lib/dates";

export type LogTarget =
  | { kind: "food"; foodId: string }
  | { kind: "recipe"; recipeId: string };

interface UiState {
  /** The diary day currently shown on Heute. */
  activeDate: string;
  setActiveDate: (date: string) => void;

  /** Log search sheet. */
  logOpen: boolean;
  logMealId?: string;
  openLog: (mealId?: string) => void;
  closeLog: () => void;

  /** Portion sheet — either logging something new or editing an entry. */
  portionTarget?: LogTarget;
  editingEntry?: DiaryEntry;
  openPortion: (target: LogTarget) => void;
  openEntryEdit: (entry: DiaryEntry) => void;
  closePortion: () => void;

  /** Quick-add sheet. */
  quickAddOpen: boolean;
  openQuickAdd: () => void;
  closeQuickAdd: () => void;
}

export const useUiStore = create<UiState>((set) => ({
  activeDate: todayISO(),
  setActiveDate: (activeDate) => set({ activeDate }),

  logOpen: false,
  logMealId: undefined,
  openLog: (logMealId) => set({ logOpen: true, logMealId }),
  closeLog: () => set({ logOpen: false, logMealId: undefined }),

  portionTarget: undefined,
  editingEntry: undefined,
  openPortion: (portionTarget) =>
    set({ portionTarget, editingEntry: undefined }),
  openEntryEdit: (editingEntry) =>
    set({
      editingEntry,
      portionTarget:
        editingEntry.ref.type === "food"
          ? { kind: "food", foodId: editingEntry.ref.id }
          : undefined,
    }),
  closePortion: () => set({ portionTarget: undefined, editingEntry: undefined }),

  quickAddOpen: false,
  openQuickAdd: () => set({ quickAddOpen: true }),
  closeQuickAdd: () => set({ quickAddOpen: false }),
}));
