import assert from "node:assert/strict";
import { test } from "node:test";

// Apps on sibling subdomains share one theme only if the cookie names their parent domain.
test("setTheme writes the cookie to the parent domain", async () => {
  const written = [];
  globalThis.location = { hostname: "" };
  globalThis.getComputedStyle = () => ({ getPropertyValue: () => "" });
  globalThis.document = {
    documentElement: { dataset: {}, classList: { toggle: () => {} } },
    querySelector: () => null,
    set cookie(value) {
      written.push(value);
    }
  };
  const { setTheme } = await import("../src/lib/theme.ts");
  for (const hostname of ["lights.ragsdale.dev", "localhost", "192.168.8.233"]) {
    globalThis.location.hostname = hostname;
    setTheme("nord");
  }
  assert.deepEqual(
    written.map((cookie) => /domain=([^;]*)/.exec(cookie)?.[1]),
    ["ragsdale.dev", undefined, undefined]
  );
});
