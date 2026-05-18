import { Segment, ParseOptions } from './types';

const DEFAULT_REGEX = /\[.*?\]\(.*?:.*?\)/s;

const BRACKETS = '[()]';

enum State {
  Complete = -1,
  Init = 0,
  MidBracketClosed = 1,
  MinBracketClosed = 2,
}

function parseDefault(text: string): (Segment | string)[] {
  const bracketStack: string[] = [];
  const result: (Segment | string)[] = [];

  let state: State = State.Init;

  if (!isValidTextDefault(text)) return [text];

  let cursor = text.indexOf('[');
  const current: { text?: string; type?: string; typeVal?: string } = { text: '' };
  result.push(text.slice(0, cursor));

  for (let i = cursor; i < text.length; i++) {
    if (state === State.Complete) {
      const nextStart = text.slice(i).indexOf('[');
      if (nextStart === -1) {
        result.push(text.slice(i));
        break;
      }
      result.push(text.slice(i, i + nextStart));
      i = i + nextStart;
      cursor = i;
      state = State.Init;
    }

    const char = text[i];
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
        const [type, ...typeVals] = text.slice(cursor + 1, i).split(':');
        current.type = type;
        current.typeVal = typeVals.join(':');
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

export function parse(text: string, options?: ParseOptions): (Segment | string)[] {
  if (options?.parse) {
    return options.parse(text);
  }
  const regex = options?.regex ?? DEFAULT_REGEX;
  if (!isValidTextDefault(text, regex)) {
    return [text];
  }
  return parseDefault(text);
}

export function isValidText(text: string, regex?: RegExp): boolean {
  return isValidTextDefault(text, regex);
}
