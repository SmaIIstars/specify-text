// scripts/compare.ts
// 对比测试工具：同一输入分别跑新旧实现，断言一致

import { textSplit } from '../packages/specify-text/utils/core';
import { parse } from '../packages/parser/src/index';

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

const results = testCases.map(compareParse);
const failed = results.filter((r) => !r.pass);

if (failed.length > 0) {
  console.error('FAILED:');
  failed.forEach((f) => {
    console.error(`  input: "${f.input}"`);
    console.error(`  old: ${JSON.stringify(f.oldOutput)}`);
    console.error(`  new: ${JSON.stringify(f.newOutput)}`);
  });
  process.exit(1);
}

console.log(`All ${results.length} test cases passed.`);
