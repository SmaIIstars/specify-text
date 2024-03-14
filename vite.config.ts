import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import typescript from "@rollup/plugin-typescript";
import path from "path";

const resolve = (directory: string) => path.join(__dirname, directory);

export default defineConfig({
  plugins: [
    react(),
    typescript({
      target: "es5",
      rootDir: resolve("packages"),
      declaration: true,
      declarationDir: resolve("dist"),
      exclude: resolve("node_modules/**"),
      allowSyntheticDefaultImports: true,
    }),
  ],
  resolve: {
    alias: {
      "@": resolve("packages"),
      "~@": resolve("packages/specify-text"),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[local]",
    },
  },
  build: {
    outDir: "dist",
    lib: {
      // 注意此处的路径要配置正确
      entry: resolve("packages/index.ts"),
      name: "SpecifyText",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    // 自定义构建配置，可直接调整底层Rollup选项；Rollup有一套预设
    // https://rollupjs.org/guide/en/#big-list-of-options
    rollupOptions: {
      external: ["react"],
      output: { globals: { react: "React" } },
    },
    sourcemap: "hidden",
  },
});
