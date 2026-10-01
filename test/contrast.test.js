import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

// DESIGN.md promises every text token clears 5.5:1 on the surfaces it sits on, in every theme. This holds new themes to it.
const minimum = 5.5;
const textOnSurface = [
  ...["foreground", "muted-foreground", "primary", "destructive", "success", "warning"].flatMap((text) => ["background", "card", "muted", "popover"].map((surface) => [text, surface])),
  ["card-foreground", "card"],
  ["popover-foreground", "popover"],
  ["secondary-foreground", "secondary"],
  ["accent-foreground", "accent"],
  ["primary-foreground", "primary"]
];

function luminance(hex) {
  const [r, g, b] = [1, 3, 5].map((index) => {
    const channel = Number.parseInt(hex.slice(index, index + 2), 16) / 255;
    return channel <= 0.040_45 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a, b) {
  const [light, dark] = [luminance(a), luminance(b)].toSorted((x, y) => y - x);
  return (light + 0.05) / (dark + 0.05);
}

const css = readFileSync(new URL("../src/styles.css", import.meta.url), "utf8");
const themes = [...css.matchAll(/\[data-theme="([a-z-]+)"\]\s*\{([^}]*)\}/g)].map(([, name, body]) => [
  name,
  Object.fromEntries([...body.matchAll(/--([a-z-]+):\s*(#[0-9a-f]{6});/g)].map(([, key, value]) => [key, value]))
]);

test("styles.css declares the themes", () => {
  assert.ok(themes.length >= 3, `found ${String(themes.length)} theme blocks`);
});

for (const [name, tokens] of themes) {
  test(`${name}: text tokens clear ${String(minimum)}:1`, () => {
    const failures = textOnSurface
      .map(([text, surface]) => [text, surface, contrast(tokens[text] ?? "", tokens[surface] ?? "")])
      .filter(([, , ratio]) => !(ratio >= minimum))
      .map(([text, surface, ratio]) => `${text} on ${surface}: ${ratio.toFixed(2)}`);
    assert.deepEqual(failures, []);
  });
}
