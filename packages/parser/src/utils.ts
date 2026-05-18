export function escape(text: string): string {
  return text.replace(/\[/g, '\\[');
}

export function unescape(text: string): string {
  return text.replace(/\\\[/g, '[');
}
