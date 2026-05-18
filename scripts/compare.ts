// scripts/compare.ts
// 对比测试工具：同一输入分别跑新旧实现，断言一致

import { textSplit } from '../packages/specify-text-old/utils/core';
import { parse } from '../packages/parser/src/index';
import { createCatalog, resolve } from '../packages/core/src/index';
import type { Segment } from '../packages/parser/src/index';

interface CompareResult {
  input: string;
  pass: boolean;
  oldOutput: unknown;
  newOutput: unknown;
}

function deepEqual(a: unknown, b: unknown): boolean {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function compareParse(input: string): CompareResult {
  const oldResult = textSplit(input);
  const newResult = parse(input);
  return {
    input,
    pass: deepEqual(oldResult, newResult),
    oldOutput: oldResult,
    newOutput: newResult,
  };
}

export function compareResolve(input: string): CompareResult {
  const oldSegments = textSplit(input);
  const newSegments = parse(input);

  const catalog = createCatalog({
    italics: () => 'italics',
    strong: () => 'strong',
  });

  const typedSegments = newSegments.filter(
    (s): s is Segment => typeof s !== 'string'
  );
  const newResolved = resolve(typedSegments, catalog);

  // Old logic: simulate catalog lookup - check if type is in known set
  const knownTypes = new Set(['italics', 'strong']);
  const oldResolved = oldSegments.map((seg) => {
    if (typeof seg === 'string') {
      return { text: seg, hasResolver: false };
    }
    const type = (seg as { type?: string }).type;
    const hasResolver = type ? knownTypes.has(type) : false;
    return { text: (seg as { text: string }).text, hasResolver };
  });

  // New: map all parse results to normalized form
  let resolvedIdx = 0;
  const newNormalized = newSegments.map((seg) => {
    if (typeof seg === 'string') {
      return { text: seg, hasResolver: false };
    }
    const resolved = newResolved[resolvedIdx++];
    return {
      text: seg.text,
      hasResolver: resolved ? resolved.resolver !== null : false,
    };
  });

  return {
    input,
    pass: deepEqual(oldResolved, newNormalized),
    oldOutput: oldResolved,
    newOutput: newNormalized,
  };
}

const testCases = [
  // 纯文本
  '2024 Happy New Year!',
  // 基础标记
  '[SpecifyText](italics:true)',
  // 嵌套标记
  '[[1.SpecifyText](strong:true) Nesting](colorful:rgba(123,213,123,0.7))',
  // 多标记
  '[2024](strong:true), Happy [New](strong:true) Year!',
  // 条件渲染
  '[ScreenSize1](conditional:screenSize1)[ScreenSize2](conditional:screenSize2)',
  // 变量
  '[Year](variable:year) Happy New Year!',
  // 链接
  '[1.SpecifyText](link:https://github.com/SmaIIstars/SpecifyText)',
  // 多彩
  '[1.SpecifyText](colorful:rgba(123,213,123,0.7))',
  // 空字符串
  '',
  // 无标记纯文本
  'plain text without any markers',
];

const parseResults = testCases.map(compareParse);
const resolveResults = testCases.map(compareResolve);
const allResults = [...parseResults, ...resolveResults];
const allFailed = allResults.filter((r) => !r.pass);

if (allFailed.length > 0) {
  console.error('FAILED:');
  allFailed.forEach((f) => {
    console.error(`  input: "${f.input}"`);
    console.error(`  old: ${JSON.stringify(f.oldOutput)}`);
    console.error(`  new: ${JSON.stringify(f.newOutput)}`);
  });
  process.exit(1);
}

console.log(
  `All ${testCases.length * 2} test cases passed (${testCases.length} parse + ${testCases.length} resolve).`
);
