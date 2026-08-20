/**
 * Theme system: "system" | "light" | "dark", persisted in localStorage,
 * applied as the `.dark` class (CleanOS token flip) + theme-color meta.
 * The pre-paint bootstrap in index.html mirrors this logic.
 */

export type ThemePref = "system" | "light" | "dark";

const STORAGE_KEY = "glynt.theme";
const DARK_BG = "#0a0a0c";
const LIGHT_BG = "#ffffff";

export function getThemePref(): ThemePref {
  const v = localStorage.getItem(STORAGE_KEY);
  return v === "light" || v === "dark" ? v : "system";
}

export function resolveIsDark(pref: ThemePref): boolean {
  if (pref === "dark") return true;
  if (pref === "light") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function apply(pref: ThemePref) {
  const dark = resolveIsDark(pref);
  document.documentElement.classList.toggle("dark", dark);
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", dark ? DARK_BG : LIGHT_BG);
}

export function setThemePref(pref: ThemePref) {
  if (pref === "system") localStorage.removeItem(STORAGE_KEY);
  else localStorage.setItem(STORAGE_KEY, pref);
  apply(pref);
  for (const l of listeners) l(pref);
}

const listeners = new Set<(pref: ThemePref) => void>();

/** Subscribe to pref changes (for settings UI). Returns unsubscribe. */
export function onThemePrefChange(fn: (pref: ThemePref) => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}

/** Call once at startup: re-applies + follows OS changes while on "system". */
export function initTheme() {
  apply(getThemePref());
  const mql = window.matchMedia("(prefers-color-scheme: dark)");
  mql.addEventListener("change", () => {
    if (getThemePref() === "system") apply("system");
  });
}
