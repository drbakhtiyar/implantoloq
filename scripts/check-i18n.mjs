#!/usr/bin/env node
// Verifies all locale files in messages/ have identical key sets.
// Arrays are treated as leaf nodes (length is not checked; structural keys are).
import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const messagesDir = join(__dirname, '..', 'messages');

function flatKeys(obj, prefix = '') {
  const keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${k}` : k;
    if (Array.isArray(v) || v === null || typeof v !== 'object') {
      keys.push(path);
    } else {
      keys.push(...flatKeys(v, path));
    }
  }
  return keys;
}

const files = readdirSync(messagesDir).filter((f) => f.endsWith('.json'));
if (files.length < 2) {
  console.log('Fewer than 2 locale files found — nothing to compare.');
  process.exit(0);
}

const locales = {};
for (const file of files) {
  const locale = file.replace('.json', '');
  const content = JSON.parse(readFileSync(join(messagesDir, file), 'utf8'));
  locales[locale] = new Set(flatKeys(content));
}

const [reference, ...others] = Object.keys(locales);
let hasError = false;

for (const locale of others) {
  const missing = [...locales[reference]].filter((k) => !locales[locale].has(k));
  const extra = [...locales[locale]].filter((k) => !locales[reference].has(k));

  if (missing.length > 0) {
    console.error(`\n[${locale}] Missing ${missing.length} key(s) vs [${reference}]:`);
    missing.forEach((k) => console.error(`  - ${k}`));
    hasError = true;
  }
  if (extra.length > 0) {
    console.error(`\n[${locale}] Extra ${extra.length} key(s) vs [${reference}]:`);
    extra.forEach((k) => console.error(`  + ${k}`));
    hasError = true;
  }
}

if (hasError) {
  console.error('\ni18n parity check FAILED.');
  process.exit(1);
} else {
  console.log(`i18n parity OK across: ${[reference, ...others].join(', ')}`);
}
