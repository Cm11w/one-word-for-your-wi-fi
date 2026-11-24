// One Word for Your Wi-Fi — entry program.
// Writes one word describing Wi-Fi, to /output/entry.txt.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

const WORD = "Ghosting";

// Gate check (mirrors the sealed scorer): 1-20 chars, not only whitespace,
// exactly one word, letters only. Fail loudly instead of writing an invalid entry.
if (WORD.length < 1 || WORD.length > 20) {
  throw new Error(`Gate failed: word is ${WORD.length} chars (must be 1-20).`);
}
if (WORD.trim().length === 0) {
  throw new Error("Gate failed: word is only whitespace.");
}
if (WORD !== WORD.trim()) {
  throw new Error("Gate failed: word has leading or trailing whitespace.");
}
if (/\s/.test(WORD)) {
  throw new Error("Gate failed: entry must be a single word (no whitespace).");
}
if (!/^[A-Za-z]+$/.test(WORD)) {
  throw new Error("Gate failed: entry must be one word of letters only.");
}

const outPath = process.env.OUTPUT_PATH ?? "/output/entry.txt";
mkdirSync(dirname(outPath), { recursive: true });
writeFileSync(outPath, WORD, "utf8");
console.log(`Wrote ${WORD.length} chars to ${outPath}`);
