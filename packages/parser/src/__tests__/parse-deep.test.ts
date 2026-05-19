import { describe, it, expect } from 'vitest';
import { parseDeep } from '../parse';
import { printDeepAst, printDeepAstToConsole } from '../debug';

describe('parseDeep', () => {
  it('returns plain text as-is', () => {
    expect(parseDeep('Hello World')).toEqual(['Hello World']);
  });

  it('parses a single tagged segment with no nesting', () => {
    expect(parseDeep('[Hello](italic:true)')).toEqual([
      '',
      { text: 'Hello', type: 'italic', typeVal: 'true' },
    ]);
  });

  it('recursively parses nested tags', () => {
    const result = parseDeep(
      '[[Bold & Colorful](strong:true)](colorful:rgba(255,100,100,0.5))'
    );
    expect(result).toEqual([
      '',
      {
        text: '[Bold & Colorful](strong:true)',
        type: 'colorful',
        typeVal: 'rgba(255,100,100,0.5)',
        children: [
          '',
          { text: 'Bold & Colorful', type: 'strong', typeVal: 'true' },
        ],
      },
    ]);
  });

  it('handles mixed plain and nested segments', () => {
    const result = parseDeep(
      'Prefix [[Nested](strong:true)](colorful:red) Suffix'
    );
    expect(result).toEqual([
      'Prefix ',
      {
        text: '[Nested](strong:true)',
        type: 'colorful',
        typeVal: 'red',
        children: [
          '',
          { text: 'Nested', type: 'strong', typeVal: 'true' },
        ],
      },
      ' Suffix',
    ]);
  });

  it('handles triple nesting', () => {
    const result = parseDeep(
      '[[[Deep](italic:true)](strong:true)](colorful:blue)'
    );
    expect(result).toEqual([
      '',
      {
        text: '[[Deep](italic:true)](strong:true)',
        type: 'colorful',
        typeVal: 'blue',
        children: [
          '',
          {
            text: '[Deep](italic:true)',
            type: 'strong',
            typeVal: 'true',
            children: [
              '',
              { text: 'Deep', type: 'italic', typeVal: 'true' },
            ],
          },
        ],
      },
    ]);
  });

  it('handles empty string', () => {
    expect(parseDeep('')).toEqual(['']);
  });

  it('handles text without markers', () => {
    expect(parseDeep('plain text')).toEqual(['plain text']);
  });

  it('treats escaped inner brackets as literal text, not nested tags', () => {
    const result = parseDeep(
      '[!\\[Bold & Colorful\\]\\(strong:true\\)!](colorful:rgba(255,100,100,0.5))'
    );
    expect(result).toEqual([
      '',
      {
        text: '!\\[Bold & Colorful\\]\\(strong:true\\)!',
        type: 'colorful',
        typeVal: 'rgba(255,100,100,0.5)',
      },
    ]);
  });

  it('handles escaped text alongside real nested tags', () => {
    const result = parseDeep(
      '[before \\[escaped\\] [real](bold:true) after](colorful:red)'
    );
    expect(result).toEqual([
      '',
      {
        text: 'before \\[escaped\\] [real](bold:true) after',
        type: 'colorful',
        typeVal: 'red',
        children: [
          'before \\[escaped\\] ',
          { text: 'real', type: 'bold', typeVal: 'true' },
          ' after',
        ],
      },
    ]);
  });

  it('handles consecutive nested tags', () => {
    const result = parseDeep(
      '[[A](strong:true)](colorful:red)[[B](italic:true)](colorful:blue)'
    );
    expect(result).toEqual([
      '',
      {
        text: '[A](strong:true)',
        type: 'colorful',
        typeVal: 'red',
        children: [
          '',
          { text: 'A', type: 'strong', typeVal: 'true' },
        ],
      },
      '',
      {
        text: '[B](italic:true)',
        type: 'colorful',
        typeVal: 'blue',
        children: [
          '',
          { text: 'B', type: 'italic', typeVal: 'true' },
        ],
      },
    ]);
  });

  // Edge case: fully escaped inner text → no children (not a real nested tag)
  it('treats fully escaped inner text as leaf (no children)', () => {
    const result = parseDeep('[\\[a\\]](b:c)');
    expect(result).toEqual([
      '',
      { text: '\\[a\\]', type: 'b', typeVal: 'c' },
    ]);
  });
});

describe('printDeepAst', () => {
  it('formats plain text correctly', () => {
    const result = printDeepAst('Hello World');
    expect(result).toBe(
      '[SpecifyText] Deep AST (1 segments)\n' +
      '└─ 0: "Hello World" (plain)'
    );
  });

  it('formats nested segments with indentation', () => {
    const result = printDeepAst(
      '[[Bold](strong:true)](colorful:red)'
    );
    expect(result).toBe(
      '[SpecifyText] Deep AST (2 segments)\n' +
      '├─ 0: "" (plain)\n' +
      '└─ 1: Segment { text: "[Bold](strong:true)", type: "colorful", typeVal: "red" }\n' +
      '   └─ children (2):\n' +
      '      ├─ 0: "" (plain)\n' +
      '      └─ 1: Segment { text: "Bold", type: "strong", typeVal: "true" }'
    );
  });

  it('formats triple nesting', () => {
    const result = printDeepAst(
      '[[[Deep](italic:true)](strong:true)](colorful:blue)'
    );
    expect(result).toBe(
      '[SpecifyText] Deep AST (2 segments)\n' +
      '├─ 0: "" (plain)\n' +
      '└─ 1: Segment { text: "[[Deep](italic:true)](strong:true)", type: "colorful", typeVal: "blue" }\n' +
      '   └─ children (2):\n' +
      '      ├─ 0: "" (plain)\n' +
      '      └─ 1: Segment { text: "[Deep](italic:true)", type: "strong", typeVal: "true" }\n' +
      '         └─ children (2):\n' +
      '            ├─ 0: "" (plain)\n' +
      '            └─ 1: Segment { text: "Deep", type: "italic", typeVal: "true" }'
    );
  });
});

describe('printDeepAstToConsole', () => {
  it('does not throw on valid input', () => {
    expect(() => printDeepAstToConsole('Hello World')).not.toThrow();
    expect(() =>
      printDeepAstToConsole(
        '[[Bold](strong:true)](colorful:red)'
      )
    ).not.toThrow();
  });
});
