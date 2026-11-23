#!/usr/bin/env node
/**
 * qa — umbrella static QA gates (design, seo, a11y, links). Does not run build.
 * Run: node scripts/qa/run-all.mjs
 */
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "../..");
const scripts = [
  "scripts/qa/assert-design.mjs",
  "scripts/qa/assert-seo.mjs",
  "scripts/qa/assert-a11y.mjs",
  "scripts/qa/assert-links.mjs",
];

let failed = false;
for (const script of scripts) {
  const result = spawnSync(process.execPath, [resolve(root, script)], {
    stdio: "inherit",
    cwd: root,
  });
  if (result.status !== 0) failed = true;
}

if (failed) {
  console.error("[qa] FAILED");
  process.exit(1);
}
console.log("[qa] all gates passed");
