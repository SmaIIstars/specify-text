# @specify-text/parser

DSL parser for specify-text — a zero-dependency tagged-text AST generator.

Parses text containing `[display text](type:value)` syntax into structured segments,
with built-in LRU caching for performance.

## Installation

```bash
npm install @specify-text/parser
```

## API

### `parse(text, options?)`

Parses a string into an array of `Segment` or plain string items.

```ts
import { parse } from '@specify-text/parser';

const result = parse('Hello [world](bold:true)');
// [{ text: 'world', type: 'bold', typeVal: 'true' }]
```

- **options.regex** — custom `RegExp` for pre-checking if text contains tags.
- **options.parse** — fully custom parse function `(text: string) => Segment[]`.

### `parseDeep(text, options?)`

Recursively parses nested tagged text into a tree of `DeepSegment` objects.
Inner tagged text (e.g. `[text](type:val)` inside a segment's text) is
automatically parsed into the `children` array.

```ts
import { parseDeep } from '@specify-text/parser';

const result = parseDeep('[[Bold](strong:true)](colorful:red)');
// [
//   '',
//   {
//     text: '[Bold](strong:true)',
//     type: 'colorful',
//     typeVal: 'red',
//     children: [
//       '',
//       { text: 'Bold', type: 'strong', typeVal: 'true' }
//     ]
//   }
// ]

### `isValidText(text, regex?)`

Returns `true` if the text contains any tag patterns.

```ts
import { isValidText } from '@specify-text/parser';

isValidText('Hello [world](bold:true)'); // true
isValidText('Plain text');               // false
```

### `escape(text)` / `unescape(text)`

Escape or unescape bracket characters in text.

```ts
import { escape, unescape } from '@specify-text/parser';

escape('hello [world]');   // 'hello \\[world\\]'
unescape('hello \\[world\\]'); // 'hello [world]'
```

### `LRUCache`

Generic LRU cache class exported for advanced use.

```ts
import { LRUCache } from '@specify-text/parser';

const cache = new LRUCache<string, number>(100);
cache.put('key', 42);
cache.get('key'); // 42
```

### `clearCache()`

Clears the internal parse result cache.

```ts
import { clearCache } from '@specify-text/parser';
clearCache();
```

### `printDeepAst(text, options?)` / `printDeepAstToConsole(text, options?)`

Like `printAst` / `printAstToConsole`, but uses `parseDeep` internally to visualize
the full nested AST tree with indented children.

## Types

- `Segment` — `{ text: string; type?: string; typeVal?: string }`
- `DeepSegment` — `Segment` with optional `children: (DeepSegment | string)[]`
- `ParseOptions` — `{ regex?: RegExp; parse?: (text: string) => Segment[] }`
