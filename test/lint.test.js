import { ESLint } from "eslint";
import assert from "node:assert/strict";
import { test } from "node:test";

// A plugin upgrade or a broken design-system lookup can silently switch a rule off; this catches that.
test("the shared ESLint config reports every rule family", async () => {
  const eslint = new ESLint({ cwd: import.meta.dirname + "/..", ignore: false });
  const [result] = await eslint.lintFiles(["test/violations.tsx"]);
  const reported = new Set(result?.messages.map((message) => message.ruleId));
  const expected = [
    "@typescript-eslint/explicit-function-return-type",
    "@typescript-eslint/no-unsafe-type-assertion",
    "jsx-a11y-x/alt-text",
    "shadcn/no-arbitrary-values",
    "shadcn/no-inline-styles",
    "shadcn/no-raw-colors",
    "shadcn/no-restyle",
    "shadcn/no-unknown-classes",
    "shadcn/require-static-classes"
  ];
  assert.deepEqual(
    expected.filter((rule) => !reported.has(rule)),
    [],
    `missing rules; reported: ${[...reported].join(", ")}`
  );
});
