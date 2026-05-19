# @specify-text/react

React 渲染器 — 将解析后的文本片段渲染为 React 组件。

## 安装

```bash
npm i @specify-text/react
```

## 导出

### `SpecifyText`

核心渲染组件，接收文本 + Widget 映射，输出 React 节点。

```tsx
import { SpecifyText } from '@specify-text/react';

<SpecifyText text="Hello [world](strong:true)" />
```

### `ErrorBoundary`

Widget 级别的错误边界，每个 Widget 渲染时自动包裹。

### `DEFAULT_BASE_WIDGETS`

内置 Widget 映射表，包含 `italic` 和 `strong`，自动合并到 catalog。

### `BlankLine` / `ParagraphGroup`

从 `@specify-text/react-widgets-base` 转导出，用于处理换行和纯文本段落。

### `Italic` / `Strong`

内置的斜体和加粗 Widget。

## 链接

- [GitHub](https://github.com/SmaIIstars/specify-text)