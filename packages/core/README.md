# @specify-text/core

Framework-agnostic component catalog and resolver for specify-text.

Takes parsed segments from `@specify-text/parser` and resolves them against a
catalog of handler functions. Works with any UI framework (React, Vue, Svelte, etc.).

## Installation

```bash
npm install @specify-text/core
```

## API

### `createCatalog(defaults?)`

Creates a `Catalog` (a `Map<string, ComponentResolver>`) with optional default entries.

```ts
import { createCatalog } from '@specify-text/core';

const catalog = createCatalog({
  bold: (props) => `<b>${props.text}</b>`,
});
```

### `resolve(segments, catalog)`

Resolves parsed segments against a catalog. Returns `ResolvedSegment[]`.

```ts
import { resolve } from '@specify-text/core';

const resolved = resolve(segments, catalog);
// [{ text: 'world', resolver: <function>, props: { text: 'world', type: 'bold', ... } }]
```

### `resolveWithFallback(segments, catalog, onError?)`

Same as `resolve`, but catches errors per-segment and calls `onError` for error handling.

```ts
import { resolveWithFallback } from '@specify-text/core';

const resolved = resolveWithFallback(segments, catalog, (err, segment) => {
  console.warn('Failed to resolve segment:', segment, err);
});
```

### `stringToBoolean(value)`

Converts a string to a boolean. Returns `false` for `""`, `"false"`, `"null"`, `"undefined"`, `"0"`, `"NaN"`; `true` for everything else.

```ts
import { stringToBoolean } from '@specify-text/core';

stringToBoolean('true');  // true
stringToBoolean('false'); // false
```

## Types

- `ComponentResolver<T>` — `(props: Segment & T) => unknown`
- `Catalog` — `Map<string, ComponentResolver>`
- `ResolvedSegment` — `{ text: string; resolver: ComponentResolver | null; props: Segment }`
