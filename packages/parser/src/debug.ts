import { parse, parseDeep } from './parse.js';
import { Segment, DeepSegment, ParseOptions } from './types.js';

function formatSegmentValue(segment: Segment | DeepSegment | string): string {
  if (typeof segment === 'string') {
    return `"${segment}" (plain)`;
  }
  const parts = [
    `text: "${segment.text}"`,
    `type: "${segment.type ?? ''}"`,
    `typeVal: "${segment.typeVal ?? ''}"`,
  ];
  return `Segment { ${parts.join(', ')} }`;
}

function buildLines(
  items: (Segment | DeepSegment | string)[],
  indent: string
): string[] {
  const lines: string[] = [];
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const isLast = i === items.length - 1;
    const prefix = indent + (isLast ? '└─' : '├─');
    lines.push(`${prefix} ${i}: ${formatSegmentValue(item)}`);

    if (typeof item !== 'string' && 'children' in item && item.children) {
      const childPrefix = indent + (isLast ? '   ' : '│  ');
      lines.push(`${childPrefix}└─ children (${item.children.length}):`);
      const childLines = buildLines(item.children, childPrefix + '   ');
      lines.push(...childLines);
    }
  }
  return lines;
}

export function printAst(text: string, options?: ParseOptions): string {
  const ast = parse(text, options);
  const lines: string[] = [];
  lines.push(`[SpecifyText] AST (${ast.length} segments)`);
  lines.push(...buildLines(ast, ''));
  return lines.join('\n');
}

export function printAstToConsole(text: string, options?: ParseOptions): void {
  const ast = parse(text, options);
  console.group(`[SpecifyText] AST (${ast.length} segments)`);
  for (const line of buildLines(ast, '')) {
    console.log(line);
  }
  console.groupEnd();
}

export function printDeepAst(text: string, options?: ParseOptions): string {
  const ast = parseDeep(text, options);
  const lines: string[] = [];
  lines.push(`[SpecifyText] Deep AST (${ast.length} segments)`);
  lines.push(...buildLines(ast, ''));
  return lines.join('\n');
}

export function printDeepAstToConsole(text: string, options?: ParseOptions): void {
  const ast = parseDeep(text, options);
  console.group(`[SpecifyText] Deep AST (${ast.length} segments)`);
  for (const line of buildLines(ast, '')) {
    console.log(line);
  }
  console.groupEnd();
}
