import { Segment, DeepSegment, ParseOptions } from "./types.js";
import { getCacheKey, getCache, setCache } from "./cache.js";

const DEFAULT_REGEX = /\[.*?\]\(.*?:.*?\)/s;

const BRACKETS = "[()]";

function isEscaped(text: string, pos: number): boolean {
  if (pos === 0) return false;
  let count = 0;
  for (let j = pos - 1; j >= 0 && text[j] === "\\"; j--) {
    count++;
  }
  return count % 2 === 1;
}

function findNextUnescaped(text: string, startFrom: number): number {
  for (let i = startFrom; i < text.length; i++) {
    if (text[i] === "[" && !isEscaped(text, i)) {
      return i;
    }
  }
  return -1;
}

enum State {
  Complete = -1,
  Init = 0,
  MidBracketClosed = 1,
  MinBracketClosed = 2,
}

function parseDefault(text: string, regex: RegExp): (Segment | string)[] {
  const bracketStack: string[] = [];
  const result: (Segment | string)[] = [];

  let state: State = State.Init;

  if (!isValidTextDefault(text, regex)) return [text];

  let cursor = findNextUnescaped(text, 0);
  if (cursor === -1) return [text];
  const current: { text?: string; type?: string; typeVal?: string } = {
    text: "",
  };
  result.push(text.slice(0, cursor));

  for (let i = cursor; i < text.length; i++) {
    if (state === State.Complete) {
      const nextStart = findNextUnescaped(text, i);
      if (nextStart === -1) {
        result.push(text.slice(i));
        break;
      }
      result.push(text.slice(i, nextStart));
      i = nextStart;
      cursor = i;
      state = State.Init;
    }

    const char = text[i];
    if (isEscaped(text, i)) continue;
    const bracketIdx = BRACKETS.indexOf(char);
    if (bracketIdx === -1) continue;

    const depth = bracketStack.length;

    if (depth === 0) {
      bracketStack.push(char);
      continue;
    }
    if (bracketIdx === 0 || bracketIdx === 1) {
      bracketStack.push(char);
      continue;
    }

    const lastIdx = BRACKETS.indexOf(bracketStack[depth - 1]);
    if (lastIdx + bracketIdx === 3) {
      if (lastIdx === 0) state = State.MidBracketClosed;
      if (lastIdx === 1) state = State.MinBracketClosed;
      bracketStack.pop();

      if (bracketStack.length === 0 && state === State.MidBracketClosed) {
        const textContent = text.slice(cursor + 1, i);
        current.text = textContent;
        cursor = i + 1;
        continue;
      }

      if (bracketStack.length === 0 && state === State.MinBracketClosed) {
        const [type, ...typeVals] = text.slice(cursor + 1, i).split(":");
        current.type = type;
        current.typeVal = typeVals.join(":");
        result.push({ ...current } as Segment);

        delete current.text;
        delete current.type;
        delete current.typeVal;

        state = State.Complete;
      }
    }
  }

  return result;
}

function isValidTextDefault(text: string, regex?: RegExp): boolean {
  return (regex ?? DEFAULT_REGEX).test(text);
}

export function parse(
  text: string,
  options?: ParseOptions,
): (Segment | string)[] {
  if (options?.parse) {
    return options.parse(text);
  }
  const regex = options?.regex;
  const cacheKey = getCacheKey(text, regex);
  const cached = getCache<(Segment | string)[]>(cacheKey);
  if (cached) return cached;

  const effectiveRegex = regex ?? DEFAULT_REGEX;
  if (!isValidTextDefault(text, effectiveRegex)) {
    const result = [text];
    setCache(cacheKey, result);
    return result;
  }
  const result = parseDefault(text, effectiveRegex);
  setCache(cacheKey, result);
  return result;
}

export function isValidText(text: string, regex?: RegExp): boolean {
  return isValidTextDefault(text, regex);
}

export function parseDeep(
  text: string,
  options?: ParseOptions,
): (DeepSegment | string)[] {
  if (options?.parse) {
    return parse(text, options);
  }
  const flat = parse(text, options);
  return flat.map((item) => {
    if (typeof item === "string") return item;
    if (isValidText(item.text, options?.regex)) {
      const children = parseDeep(item.text, options);
      if (children.length === 1 && typeof children[0] === "string") {
        return item;
      }
      return { ...item, children };
    }
    return item;
  });
}
