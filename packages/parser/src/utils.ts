const SPECIALS = "\\[]()";

export function escape(text: string): string {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    if (SPECIALS.includes(text[i])) {
      result += "\\";
    }
    result += text[i];
  }
  return result;
}

export function unescape(text: string): string {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    if (
      text[i] === "\\" &&
      i + 1 < text.length &&
      SPECIALS.includes(text[i + 1])
    ) {
      result += text[i + 1];
      i++;
    } else {
      result += text[i];
    }
  }
  return result;
}
