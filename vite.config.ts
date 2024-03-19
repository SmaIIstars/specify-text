import { defineConfig } from "vite";
import { readFileSync } from "fs";
import react from "@vitejs/plugin-react";
import typescript from "@rollup/plugin-typescript";
import path from "path";

const resolve = (directory: string) => path.join(__dirname, directory);

const packageJson = JSON.parse(
  readFileSync("./package.json", { encoding: "utf-8" })
);
const globals = {
  ...(packageJson?.dependencies || {}),
};

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
      entry: resolve("packages/index.ts"),
      name: "SpecifyText",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    // 自定义构建配置，可直接调整底层Rollup选项；Rollup有一套预设
    // https://rollupjs.org/guide/en/#big-list-of-options
    rollupOptions: {
      external: ["react", "react-dom", ...Object.keys(globals)],
      output: { globals: { react: "React" } },
    },
    sourcemap: "hidden",
  },
});
