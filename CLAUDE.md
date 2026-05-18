# AI Agent Instructions for specify-text

## What this repo is

- A TypeScript + React library for parsing and rendering special tagged text.
- The package is built with Vite and exports a React component library from `packages/index.ts`.
- `examples/` contains demo usage and shows how custom widgets are registered.
- `packages/specify-text/` is the main implementation, with `typings/` for public props and `utils/` for parser/core logic.

## Key files and directories

- `package.json` — root package metadata, scripts, dependencies, package exports.
- `vite.config.ts` — build configuration, including `@` and `~@` path aliases.
- `packages/index.ts` — public library entry point.
- `packages/specify-text/index.tsx` — core component implementation.
- `packages/specify-text/utils/core.ts` — text parsing / matching logic.
- `examples/` — usage examples and custom widget registration patterns.

## Build / Dev commands

- Install dependencies: `pnpm install` (pnpm lock file present) or `npm install` if needed.
- Start development mode: `pnpm dev`
- Build package: `pnpm build`
- Lint code: `pnpm lint`

> There is no dedicated test command in this repo.

## Important conventions

- The repo uses ES module syntax (`type: module`) with React and Vite.
- Path aliases in TS/Vite are:
  - `@/*` → `./packages/*`
  - `~@/*` → `./packages/specify-text/*`
- The library is intended to publish as a package with both CJS and ESM exports, plus a separate `./style` export.
- Custom widget mapping is the core extensibility mechanism; examples show how `widgetMap` is used.
- Keep changes backwards compatible for React >=16 and TypeScript consumers.

## How to help in this repo

- Prefer editing `packages/specify-text/*` for core behavior and `examples/*` for usage patterns.
- Use `README.md` as the source of truth for API/usage documentation; link to it rather than copying large sections.
- When modifying build or package exports, verify `pnpm build` succeeds and the library entrypoint still works.

## Useful references

- `README.md` — public usage and widget patterns
- `package.json` — scripts, dependencies, exports
- `vite.config.ts` — build output and alias resolution
