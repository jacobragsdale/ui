import { useSyncExternalStore } from "react";

declare module "react" {
  // Pass data-driven values to classes through CSS variables, as in style={{ "--fill": "40%" }} with className="w-(--fill)".
  // Declared here because every app imports this module, which puts the augmentation in its program.
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style -- declaration merging needs an interface, not a Record.
  interface CSSProperties {
    [variable: `--${string}`]: string | number | undefined;
  }
}

interface ThemeInfo {
  readonly label: string;
  readonly appearance: "light" | "dark";
}

/** Every theme in styles.css. The key is the `data-theme` value. */
export const themes = {
  "neon-void": { label: "Neon Void", appearance: "dark" },
  "grok-night": { label: "Grok Night", appearance: "dark" },
  "tokyo-night": { label: "Tokyo Night", appearance: "dark" },
  synthwave: { label: "Synthwave", appearance: "dark" },
  cyberpunk: { label: "Cyberpunk", appearance: "dark" },
  phosphor: { label: "Phosphor", appearance: "dark" },
  blueprint: { label: "Blueprint", appearance: "dark" },
  "art-deco": { label: "Art Deco", appearance: "dark" },
  "liquid-glass": { label: "Liquid Glass", appearance: "dark" },
  dracula: { label: "Dracula", appearance: "dark" },
  nord: { label: "Nord", appearance: "dark" },
  catppuccin: { label: "Catppuccin", appearance: "dark" },
  gruvbox: { label: "Gruvbox", appearance: "dark" },
  "neo-brutalism": { label: "Neo Brutalism", appearance: "light" },
  "windows-98": { label: "Windows 98", appearance: "light" },
  aqua: { label: "Aqua", appearance: "light" },
  editorial: { label: "Editorial", appearance: "light" },
  notebook: { label: "Notebook", appearance: "light" },
  clay: { label: "Clay", appearance: "light" },
  "game-boy": { label: "Game Boy", appearance: "light" },
  solarized: { label: "Solarized", appearance: "light" }
} as const satisfies Readonly<Record<string, ThemeInfo>>;

export type ThemeId = keyof typeof themes;

export const defaultTheme: ThemeId = "neon-void";

const storageKey = "theme";

// The choice lives in a cookie on the parent domain, so every app under it (hub., lights., money.ragsdale.dev) shares it.
// Cookies ignore ports, so dev servers on localhost share it as well.
// ponytail: the parent is the last two labels, which a public suffix like co.uk rejects; localStorage then keeps the old per-app behaviour.
function cookieDomain(): string {
  const { hostname } = location;
  return hostname.includes(".") && !/^[\d.]+$|:/.test(hostname) ? `; domain=${hostname.split(".").slice(-2).join(".")}` : "";
}

function savedTheme(): string | null {
  const cookie = /(?:^|; )ui-theme=([^;]*)/.exec(document.cookie)?.[1];
  if (cookie !== undefined) {
    return cookie;
  }
  try {
    // Choices saved per app before the cookie existed.
    return localStorage.getItem(storageKey);
  } catch {
    // Storage is blocked (private mode, sandboxed iframe): use the fallback.
    return null;
  }
}

export function isThemeId(value: unknown): value is ThemeId {
  return typeof value === "string" && Object.hasOwn(themes, value);
}

export const themeIds: readonly ThemeId[] = Object.keys(themes).filter(isThemeId);

function apply(id: ThemeId): void {
  const info: ThemeInfo = themes[id];
  const root = document.documentElement;
  root.dataset["theme"] = id;
  root.classList.toggle("dark", info.appearance === "dark");
  // Installed web apps paint the status bar from this meta tag; read the colour from the stylesheet so it stays the one source.
  const background = getComputedStyle(root).getPropertyValue("--background").trim();
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", background);
}

/** Apply the saved theme, or `fallback`, before the first render, and again whenever the tab returns, in case another app changed it. */
export function initTheme(fallback: ThemeId = defaultTheme): void {
  const sync = (): void => {
    const stored = savedTheme();
    apply(isThemeId(stored) ? stored : fallback);
  };
  sync();
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      sync();
    }
  });
}

export function setTheme(id: ThemeId): void {
  apply(id);
  // 400 days is the longest expiry browsers keep.
  document.cookie = `ui-theme=${id}; path=/; max-age=34560000; samesite=lax${cookieDomain()}`;
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
