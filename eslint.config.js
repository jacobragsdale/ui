// @ts-check

import { defineConfig } from "eslint/config";

import { config } from "./config/eslint.js";

export default defineConfig(
  {
    ignores: [
      "template/**", // The template lints itself as a consumer would.
      "src/components/ui/**", // Vendored shadcn/ui sources, refreshed with `pnpm shadcn add --overwrite`; tsc still checks them.
      "test/violations.tsx" // Deliberately broken; test/lint.test.js lints it.
    ]
  },
  config(import.meta.dirname),
  {
    files: ["src/components/**"],
    rules: {
      // Components define the styles the rules protect, per @shadcn/lint's setup.
      "shadcn/no-restyle": "off",
      "shadcn/no-arbitrary-values": "off",
      "shadcn/require-static-classes": "off"
    }
  }
);
