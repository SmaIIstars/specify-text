import { describe, it, expect, beforeEach } from 'vitest';
import { parse, isValidText } from '../parse';
import { escape, unescape } from '../utils';
import { clearCache } from '../cache';

describe('parse', () => {
  it('returns plain text as-is', () => {
    expect(parse('Hello World')).toEqual(['Hello World']);
  });

  it('parses a single tagged segment', () => {
    expect(parse('[Hello](italic:true)')).toEqual([
      '',
      { text: 'Hello', type: 'italic', typeVal: 'true' },
    ]);
  });

  it('parses multiple tagged segments', () => {
    expect(parse('[2024](strong:true), Happy [New](strong:true) Year!')).toEqual([
      '',
      { text: '2024', type: 'strong', typeVal: 'true' },
      ', Happy ',
      { text: 'New', type: 'strong', typeVal: 'true' },
      ' Year!',
    ]);
  });

  it('parses nested tags', () => {
    expect(parse('[[1.SpecifyText](strong:true) Nesting](colorful:rgba(123,213,123,0.7))')).toEqual([
      '',
      {
        text: '[1.SpecifyText](strong:true) Nesting',
        type: 'colorful',
        typeVal: 'rgba(123,213,123,0.7)',
      },
    ]);
  });

  it('parses conditional text', () => {
    expect(parse('[ScreenSize1](conditional:screenSize1)')).toEqual([
      '',
      { text: 'ScreenSize1', type: 'conditional', typeVal: 'screenSize1' },
    ]);
  });

  it('parses variable text', () => {
    expect(parse('[Year](variable:year) Happy New Year!')).toEqual([
      '',
      { text: 'Year', type: 'variable', typeVal: 'year' },
      ' Happy New Year!',
    ]);
  });

  it('parses link text', () => {
    expect(parse('[1.SpecifyText](link:https://github.com/SmaIIstars/SpecifyText)')).toEqual([
      '',
      {
        text: '1.SpecifyText',
        type: 'link',
        typeVal: 'https://github.com/SmaIIstars/SpecifyText',
      },
    ]);
  });

  it('parses colorful text', () => {
    expect(parse('[1.SpecifyText](colorful:rgba(123,213,123,0.7))')).toEqual([
      '',
      {
        text: '1.SpecifyText',
        type: 'colorful',
        typeVal: 'rgba(123,213,123,0.7)',
      },
    ]);
  });

  it('handles empty string', () => {
    expect(parse('')).toEqual(['']);
  });

  it('handles text without markers', () => {
    expect(parse('plain text without any markers')).toEqual(['plain text without any markers']);
  });

  it('handles typeVal with multiple colons', () => {
    expect(parse('[text](colorful:rgba(123,213,123,0.7))')).toEqual([
      '',
      { text: 'text', type: 'colorful', typeVal: 'rgba(123,213,123,0.7)' },
    ]);
  });

  it('handles consecutive tagged segments', () => {
    expect(parse('[a](strong:true)[b](strong:false)')).toEqual([
      '',
      { text: 'a', type: 'strong', typeVal: 'true' },
      '',
      { text: 'b', type: 'strong', typeVal: 'false' },
    ]);
  });
});

describe('parse with escape', () => {
  it('treats escaped bracket as literal text', () => {
    expect(parse('hello \\[not a tag\\] world')).toEqual([
      'hello \\[not a tag\\] world',
    ]);
  });

  it('handles mixed escaped and real tags', () => {
    expect(parse('\\[escaped\\] [real](bold:true)')).toEqual([
      '\\[escaped\\] ',
      { text: 'real', type: 'bold', typeVal: 'true' },
    ]);
  });

  it('keeps escaped text raw in segment', () => {
    expect(parse('[hello \\[world\\]](bold:true)')).toEqual([
      '',
      { text: 'hello \\[world\\]', type: 'bold', typeVal: 'true' },
    ]);
  });

  it('handles escaped backslash before bracket', () => {
    // \\[ = literal backslash + real bracket
    expect(parse('hello \\\\[real](bold:true)')).toEqual([
      'hello \\\\',
      { text: 'real', type: 'bold', typeVal: 'true' },
    ]);
  });

  it('preserves backslash before non-special characters', () => {
    expect(parse('hello \\n world')).toEqual(['hello \\n world']);
  });

  it('preserves \\n between tags as literal text', () => {
    expect(parse('[a](bold:true)\\n[b](bold:true)')).toEqual([
      '',
      { text: 'a', type: 'bold', typeVal: 'true' },
      '\\n',
      { text: 'b', type: 'bold', typeVal: 'true' },
    ]);
  });

  it('round-trip: escape then parse keeps raw text', () => {
    const original = '[real](bold:true)';
    const escaped = escape(original);
    const parsed = parse(escaped);
    // parse returns raw text; unescape at render time restores original
    expect(parsed).toEqual([escaped]);
  });

  // Edge case: 3 backslashes before bracket → bracket IS escaped
  it('triple backslash escapes the bracket (odd count)', () => {
    expect(parse('hello \\\\\\[not a tag\\] world')).toEqual([
      'hello \\\\\\[not a tag\\] world',
    ]);
  });

  // Edge case: 4 backslashes before bracket → bracket is NOT escaped
  it('quadruple backslash: bracket is real (even count)', () => {
    expect(parse('hello \\\\\\\\[real](bold:true)')).toEqual([
      'hello \\\\\\\\',
      { text: 'real', type: 'bold', typeVal: 'true' },
    ]);
  });

  // Edge case: all brackets escaped → entire text is plain
  it('treats fully escaped text as plain string', () => {
    expect(parse('\\[a\\]\\(b\\)')).toEqual(['\\[a\\]\\(b\\)']);
  });

  // Edge case: escaped parens inside tag text are preserved
  it('preserves escaped parens inside tag text', () => {
    expect(parse('[hello \\(world\\)](bold:true)')).toEqual([
      '',
      { text: 'hello \\(world\\)', type: 'bold', typeVal: 'true' },
    ]);
  });

  // Edge case: trailing backslash at end of text
  it('preserves trailing backslash', () => {
    expect(parse('hello\\')).toEqual(['hello\\']);
  });

  // Edge case: double backslash in plain text (no tags)
  it('preserves double backslash in plain text', () => {
    expect(parse('hello \\\\ world')).toEqual(['hello \\\\ world']);
  });
});

describe('isValidText', () => {
  it('returns true for tagged text', () => {
    expect(isValidText('[Hello](italic:true)')).toBe(true);
  });

  it('returns false for plain text', () => {
    expect(isValidText('Hello World')).toBe(false);
  });
});

describe('cache', () => {
  beforeEach(() => {
    clearCache();
  });

  it('returns cached result on repeated calls', () => {
    const result1 = parse('[Hello](italic:true)');
    const result2 = parse('[Hello](italic:true)');
    expect(result1).toBe(result2);
  });

  it('distinguishes different regex patterns', () => {
    const r1 = parse('[Hello](italic:true)', { regex: /\[.*?\]\(.*?:.*?\)/s });
    const r2 = parse('[Hello](italic:true)', { regex: /\[.*?\]\(.*?\)/s });
    expect(r1).not.toBe(r2);
  });

  it('skips cache when custom parse is provided', () => {
    const fn = () => [{ text: 'custom' }];
    expect(parse('x', { parse: fn })).toEqual([{ text: 'custom' }]);
    expect(parse('x', { parse: fn })).toEqual([{ text: 'custom' }]);
  });

  it('clearCache empties the cache', () => {
    const r1 = parse('[a](strong:true)');
    clearCache();
    const r2 = parse('[a](strong:true)');
    expect(r1).not.toBe(r2);
  });
});

describe('escape / unescape', () => {
  it('handles empty string', () => {
    expect(escape('')).toBe('');
    expect(unescape('')).toBe('');
  });

  it('escapes square brackets', () => {
    expect(escape('[text]')).toBe('\\[text\\]');
  });

  it('unescapes square brackets', () => {
    expect(unescape('\\[text\\]')).toBe('[text]');
  });

  it('escapes and unescapes all special characters', () => {
    const original = 'hello [world] (test) \\ backslash';
    expect(unescape(escape(original))).toBe(original);
  });

  it('round-trips correctly', () => {
    const original = '[hello] world';
    expect(unescape(escape(original))).toBe(original);
  });
});
