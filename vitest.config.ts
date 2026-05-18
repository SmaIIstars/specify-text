import { defineConfig } from 'vitest/config';
import path from 'path';

const resolve = (directory: string) => path.join(__dirname, directory);

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve('packages'),
      '~@': resolve('packages/specify-text'),
    },
  },
  test: {
    include: ['packages/*/src/**/*.test.ts'],
  },
});
