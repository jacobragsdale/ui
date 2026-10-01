// @ts-check

/**
 * Vite settings every app on this package needs. Usage in vite.config.ts: `plugins: [react(), tailwindcss(), ui()]`.
 *
 * The package ships .tsx source. Without `.tsx` in the dependency optimizer's extensions, `vite dev` never pre-bundles
 * the CommonJS modules those files import (Base UI's use-sync-external-store shim), and every page fails to load.
 */
export function ui() {
  return { name: "@jacobragsdale/ui", config: () => ({ optimizeDeps: { extensions: [".tsx"] } }) };
}
