// One Word for Your Wi-Fi — entry program.
//
// Writes a single original word to /output/entry.txt.
// No dependencies, no network, fully deterministic.
//
// The word: Peekaboo
// Why it wins: home Wi-Fi keeps vanishing and reappearing, exactly like
// a game of peekaboo — there one second, gone the next, back again when
// you least expect it. It is funny at once, true to how home Wi-Fi
// actually behaves, a fresh angle nobody reaches for first, and it works
// instantly as a single word — and as a network name.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// --- Entry constants -------------------------------------------------------

const ENTRY_WORD = "Peekaboo";
const OUTPUT_PATH = "/output/entry.txt";

// Competition gate: UTF-8 text, 1–20 characters, a single word.
const MIN_CHARS = 1;
const MAX_CHARS = 20;
const ENCODING = "utf8" as const;

// --- Validation gate -------------------------------------------------------

/** Count characters as Unicode code points, the same way the gate does. */
function countChars(word: string): number {
  return [...word].length;
}

/**
 * Validate the entry word against every rule of the competition gate.
 * Throws a descriptive error on the first rule that fails.
 */
function validateEntry(word: string): void {
  if (typeof word !== "string") {
    throw new Error("entry must be a string");
  }

  const chars = countChars(word);
  if (chars < MIN_CHARS || chars > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${chars}`,
    );
  }

  if (word.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (/\s/.test(word)) {
    throw new Error("entry must be a single word (no white space)");
  }
  if (/[\u0000-\u001F\u007F]/.test(word)) {
    throw new Error("entry must not contain control characters");
  }
  if (!/[A-Za-z]/.test(word)) {
    throw new Error("entry must contain at least one letter");
  }
  if (word !== word.normalize("NFC")) {
    throw new Error("entry must be in Unicode NFC form");
  }

  // Must round-trip as UTF-8 unchanged.
  const encoded = Buffer.from(word, ENCODING);
  if (encoded.toString(ENCODING) !== word) {
    throw new Error("entry must be valid UTF-8 text");
  }
}

// --- Write + verify-after-write --------------------------------------------

/** Write the entry word to the output path, creating its directory first. */
function writeEntry(word: string, outputPath: string): void {
  mkdirSync(dirname(outputPath), { recursive: true });
  writeFileSync(outputPath, word, ENCODING);
}

/**
 * Read the file back and compare it byte-for-byte with the expected word.
 * A mismatch means the write did not land as intended — fail loudly
 * instead of silently leaving a wrong entry behind.
 */
function verifyEntry(word: string, outputPath: string): void {
  const expected = Buffer.from(word, ENCODING);
  const actual = readFileSync(outputPath);
  if (!expected.equals(actual)) {
    throw new Error(
      `verification failed: ${outputPath} does not contain the entry ` +
        `(expected ${expected.length} bytes, got ${actual.length} bytes)`,
    );
  }
}

// --- Main ------------------------------------------------------------------

function main(): void {
  validateEntry(ENTRY_WORD);
  writeEntry(ENTRY_WORD, OUTPUT_PATH);
  verifyEntry(ENTRY_WORD, OUTPUT_PATH);
  console.log(
    `wrote ${countChars(ENTRY_WORD)} characters to ${OUTPUT_PATH} (verified)`,
  );
}

main();
