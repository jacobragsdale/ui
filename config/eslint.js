// @ts-check

import eslint from "@eslint/js";
import eslintReact from "@eslint-react/eslint-plugin";
import { plugin as shadcn } from "@shadcn/lint";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import jsxA11y from "eslint-plugin-jsx-a11y-x";
import reactRefresh from "eslint-plugin-react-refresh";
import unicorn from "eslint-plugin-unicorn";
import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";

/**
 * Shared flat config for React + TypeScript apps. Usage in an app's `eslint.config.js`:
 * `export default config(import.meta.dirname)`, optionally wrapped in `defineConfig(config(...), { ...overrides })`.
 *
 * @param {string} tsconfigRootDir The app's root directory, where its tsconfig.json lives.
 */
export function config(tsconfigRootDir) {
  return defineConfig(
    {
      ignores: ["coverage/**", "dist/**"] // Skip generated build and coverage output.
    },
    {
      linterOptions: {
        reportUnusedDisableDirectives: "error", // Reject stale eslint-disable comments.
        reportUnusedInlineConfigs: "error" // Reject inline rule settings that no longer change behavior.
      }
    },
    {
      files: ["**/*.{ts,tsx}"],
      extends: [
        eslint.configs.recommended, // Catch common JavaScript correctness errors.
        ...tseslint.configs.strictTypeChecked, // Enable the strict type-aware correctness rules.
        ...tseslint.configs.stylisticTypeChecked, // Prefer clear, modern TypeScript constructs.
        eslintReact.configs["strict-type-checked"], // React correctness, rules of hooks, and React Compiler purity checks.
        jsxA11y.configs.strict, // Accessibility of JSX markup.
        unicorn.configs.recommended, // Modern, unambiguous JavaScript idioms.
        reactRefresh.configs.vite // Keep component modules hot-reloadable.
      ],
      plugins: { shadcn },
      languageOptions: {
        parserOptions: {
          projectService: true, // Reuse TypeScript's project service for accurate type information.
          tsconfigRootDir // Resolve project configurations from the app.
        }
      },
      settings: {
        shadcn: {
          ui: "@jacobragsdale/ui/components", // Treat the shared components as the design system.
          note: "Design rules: https://github.com/jacobragsdale/ui/blob/main/DESIGN.md"
        }
      },
      rules: {
        complexity: ["error", 15], // Limit cyclomatic complexity.
        curly: ["error", "all"], // Require braces around every control-flow body.
        eqeqeq: ["error", "always"], // Require strict equality and inequality.
        "guard-for-in": "error", // Require inherited keys to be filtered in for-in loops.
        "no-param-reassign": ["error", { props: true }], // Prevent mutation through function parameters.
        "no-promise-executor-return": "error", // Reject misleading values returned from Promise executors.
        // Reject the error-prone comma operator.
        "no-restricted-syntax": ["error", { selector: "SequenceExpression", message: "Do not use the comma operator; split the expressions into explicit statements." }],
        "no-return-assign": ["error", "always"], // Keep assignment side effects out of return expressions.
        "prefer-object-has-own": "error", // Use the safe own-property check.
        "require-atomic-updates": "error", // Catch stale read-modify-write updates across awaits.
        "@typescript-eslint/consistent-type-exports": "error", // Mark type-only exports explicitly.
        "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports", fixStyle: "separate-type-imports" }], // Keep type-only dependencies out of runtime imports.
        // Require return contracts while preserving contextual callback inference.
        "@typescript-eslint/explicit-function-return-type": ["error", { allowConciseArrowFunctionExpressionsStartingWithVoid: false, allowExpressions: true, allowTypedFunctionExpressions: true }],
        "@typescript-eslint/explicit-member-accessibility": ["error", { accessibility: "explicit", overrides: { constructors: "no-public" } }], // Make class API visibility explicit.
        "@typescript-eslint/explicit-module-boundary-types": "error", // Type exported function and public method boundaries.
        "@typescript-eslint/no-floating-promises": ["error", { checkThenables: true, ignoreIIFE: false, ignoreVoid: false }], // Require every promise and thenable to be awaited or rejection-handled.
        "@typescript-eslint/no-import-type-side-effects": "error", // Prevent type-only imports from emitting side effects.
        "@typescript-eslint/no-loop-func": "error", // Prevent closures from capturing unsafe loop state.
        "@typescript-eslint/no-unsafe-type-assertion": "error", // Reject assertions that narrow without proof.
        "@typescript-eslint/prefer-readonly": "error", // Mark never-reassigned private members readonly.
        "@typescript-eslint/require-array-sort-compare": ["error", { ignoreStringArrays: false }], // Require explicit ordering for every array sort.
        "@typescript-eslint/strict-boolean-expressions": [
          "error",
          {
            allowAny: false,
            allowNullableBoolean: false,
            allowNullableEnum: false,
            allowNullableNumber: false,
            allowNullableObject: false,
            allowNullableString: false,
            allowNumber: false,
            allowString: false
          }
        ], // Require conditions to be actual booleans.
        "@typescript-eslint/strict-void-return": "error", // Reject discarded return values through void callbacks.
        // Require exhaustive union switches and defaults for open-ended values.
        "@typescript-eslint/switch-exhaustiveness-check": ["error", { allowDefaultCaseForExhaustiveSwitch: false, considerDefaultExhaustiveForUnions: false, requireDefaultForNonUnion: true }],
        "unicorn/name-replacements": ["error", { replacements: { props: false, ref: false } }], // Spell names out, except React's own props and ref.
        "unicorn/no-null": "off", // React and the DOM use null as their empty value.
        "unicorn/single-line-block-comment-style": "off", // One-line JSDoc summaries are fine.
        // Design system: pages place components; components own their look. Containers also accept spacing.
        "shadcn/no-restyle": ["error", { allow: ["layout"], contracts: [{ pattern: "^Card$|(Content|Header|Footer)$", allow: ["layout", "spacing"] }] }],
        "shadcn/no-raw-colors": "error", // Use theme tokens (bg-primary), never palette colours (bg-pink-500) or hex.
        "shadcn/no-arbitrary-values": "error", // Stay on the theme's scales; no p-[13px].
        "shadcn/no-inline-styles": "error", // Style with classes, not style={{}} or <style>.
        "shadcn/no-unknown-classes": "error", // Reject classes Tailwind cannot generate.
        "shadcn/require-static-classes": "error" // Keep component classes statically checkable.
      }
    },
    eslintConfigPrettier // Disable lint rules that conflict with Prettier.
  );
}
