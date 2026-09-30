import { useSyncExternalStore } from "react";

interface ThemeInfo {
  readonly label: string;
  readonly appearance: "light" | "dark";
}

/** Every theme in styles.css. The key is the `data-theme` value. */
export const themes = { "neon-void": { label: "Neon Void", appearance: "dark" }, "grok-night": { label: "Grok Night", appearance: "dark" } } as const satisfies Readonly<Record<string, ThemeInfo>>;

export type ThemeId = keyof typeof themes;

export const defaultTheme: ThemeId = "neon-void";

const storageKey = "theme";

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === "string" && Object.hasOwn(themes, value);
}

export const themeIds: readonly ThemeId[] = Object.keys(themes).filter(isThemeId);

function apply(id: ThemeId): void {
  const info: ThemeInfo = themes[id];
  const root = document.documentElement;
  root.dataset["theme"] = id;
  root.classList.toggle("dark", info.appearance === "dark");
}

/** Apply the saved theme, or `fallback`, before the first render. */
export function initTheme(fallback: ThemeId = defaultTheme): void {
  let stored: string | null = null;
  try {
    stored = localStorage.getItem(storageKey);
  } catch {
    // Storage is blocked (private mode, sandboxed iframe): use the fallback.
  }
  apply(isThemeId(stored) ? stored : fallback);
}

export function setTheme(id: ThemeId): void {
  apply(id);
  try {
    localStorage.setItem(storageKey, id);
  } catch {
    // Storage is blocked: the theme still applies until the page reloads.
  }
}

// The <html> attribute is the store, so the hook stays correct whoever changes it.
function currentTheme(): ThemeId {
  const value = document.documentElement.dataset["theme"];
  return isThemeId(value) ? value : defaultTheme;
}

function subscribe(onChange: () => void): () => void {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => {
    observer.disconnect();
  };
}

export function useTheme(): ThemeId {
  return useSyncExternalStore(subscribe, currentTheme);
}
