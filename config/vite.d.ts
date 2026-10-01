/** Vite settings every app on this package needs; see vite.js. Typed structurally so this package needs no Vite dependency. */
export function ui(): { readonly name: string; readonly config: () => { readonly optimizeDeps: { readonly extensions: string[] } } };
