import { describe, it, expect, vi } from 'vitest';
import { printAst, printAstToConsole } from '../debug';

describe('printAst', () => {
  it('formats plain text correctly', () => {
    const result = printAst('Hello World');
    expect(result).toBe(
      '[SpecifyText] AST (1 segments)\n' +
      '└─ 0: "Hello World" (plain)'
    );
  });

  it('formats a single tagged segment', () => {
    const result = printAst('[Hello](italic:true)');
    expect(result).toBe(
      '[SpecifyText] AST (2 segments)\n' +
      '├─ 0: "" (plain)\n' +
      '└─ 1: Segment { text: "Hello", type: "italic", typeVal: "true" }'
    );
  });

  it('formats multiple mixed segments', () => {
    const result = printAst('[2024](strong:true), Happy [New](strong:true) Year!');
    expect(result).toBe(
      '[SpecifyText] AST (5 segments)\n' +
      '├─ 0: "" (plain)\n' +
      '├─ 1: Segment { text: "2024", type: "strong", typeVal: "true" }\n' +
      '├─ 2: ", Happy " (plain)\n' +
      '├─ 3: Segment { text: "New", type: "strong", typeVal: "true" }\n' +
      '└─ 4: " Year!" (plain)'
    );
  });

  it('formats a nested tag segment', () => {
    const result = printAst('[[1.SpecifyText](strong:true) Nesting](colorful:rgba(123,213,123,0.7))');
    expect(result).toBe(
      '[SpecifyText] AST (2 segments)\n' +
      '├─ 0: "" (plain)\n' +
      '└─ 1: Segment { text: "[1.SpecifyText](strong:true) Nesting", type: "colorful", typeVal: "rgba(123,213,123,0.7)" }'
    );
  });

  it('formats empty string correctly', () => {
    const result = printAst('');
    expect(result).toBe(
      '[SpecifyText] AST (1 segments)\n' +
      '└─ 0: "" (plain)'
    );
  });

  it('accepts a custom regex option', () => {
    const result = printAst('[Hello](italic:true)', { regex: /\[.*?\]\(.*?\)/s });
    expect(result).toBe(
      '[SpecifyText] AST (2 segments)\n' +
      '├─ 0: "" (plain)\n' +
      '└─ 1: Segment { text: "Hello", type: "italic", typeVal: "true" }'
    );
  });
});

describe('printAstToConsole', () => {
  it('does not throw on valid input', () => {
    expect(() => printAstToConsole('Hello World')).not.toThrow();
    expect(() => printAstToConsole('[Hello](italic:true)')).not.toThrow();
    expect(() => printAstToConsole('')).not.toThrow();
  });

  it('calls console.group and console.log with correct output', () => {
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    const groupSpy = vi.spyOn(console, 'group').mockImplementation(() => {});
    const groupEndSpy = vi.spyOn(console, 'groupEnd').mockImplementation(() => {});

    printAstToConsole('Hello World');

    expect(groupSpy).toHaveBeenCalledWith('[SpecifyText] AST (1 segments)');
    expect(logSpy).toHaveBeenCalledWith('└─ 0: "Hello World" (plain)');
    expect(groupEndSpy).toHaveBeenCalled();

    logSpy.mockRestore();
    groupSpy.mockRestore();
    groupEndSpy.mockRestore();
  });
});
