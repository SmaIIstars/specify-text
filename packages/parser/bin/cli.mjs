#!/usr/bin/env node
/// <reference types="node" />
import { parse, parseDeep, printAst, printDeepAst } from "../dist/index.js";

const args = process.argv.slice(2);

if (args[0] !== "parse") {
  console.log('Usage: specify-text parse [--deep] [--json] "<text>"');
  process.exit(1);
}

const rest = args.slice(1);
const jsonFlagIdx = rest.indexOf("--json");
const deepFlagIdx = rest.indexOf("--deep");

let jsonMode = false;
let deepMode = false;
let text;

if (jsonFlagIdx !== -1) jsonMode = true;
if (deepFlagIdx !== -1) deepMode = true;

text = rest.filter((_, i) => i !== jsonFlagIdx && i !== deepFlagIdx).join(" ");

if (!text) {
  console.log('Usage: specify-text parse [--deep] [--json] "<text>"');
  process.exit(1);
}

if (jsonMode) {
  const result = deepMode ? parseDeep(text) : parse(text);
  console.log(JSON.stringify(result, null, 2));
} else {
  console.log(deepMode ? printDeepAst(text) : printAst(text));
}
