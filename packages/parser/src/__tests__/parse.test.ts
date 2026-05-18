import { describe, it, expect } from 'vitest';
import { parse, isValidText } from '../parse';
import { escape, unescape } from '../utils';

describe('parse', () => {
  it('returns plain text as-is', () => {
    expect(parse('Hello World')).toEqual(['Hello World']);
  });

  it('parses a single tagged segment', () => {
    expect(parse('[Hello](italics:true)')).toEqual([
      '',
      { text: 'Hello', type: 'italics', typeVal: 'true' },
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

describe('isValidText', () => {
  it('returns true for tagged text', () => {
    expect(isValidText('[Hello](italics:true)')).toBe(true);
  });

  it('returns false for plain text', () => {
    expect(isValidText('Hello World')).toBe(false);
  });
});

describe('escape / unescape', () => {
  it('escapes square brackets', () => {
    expect(escape('[text]')).toBe('\\[text]');
  });

  it('unescapes square brackets', () => {
    expect(unescape('\\[text]')).toBe('[text]');
  });

  it('round-trips correctly', () => {
    const original = '[hello] world';
    expect(unescape(escape(original))).toBe(original);
  });
});
