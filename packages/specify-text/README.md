# specify-text

声明式解析并渲染特定格式的标记文本，支持自定义 Widget 扩展。

```tsx
import SpecifyText from 'specify-text';

<SpecifyText text="Hello [world](strong:true)" />
```

## 安装

```bash
npm i specify-text
```

## 基础使用

```tsx
import SpecifyText from 'specify-text';
import 'specify-text/style';

<SpecifyText text="start\nend" />
```

内置 `italic` 和 `strong` 两种 Widget，无需额外配置。

## 自定义 Widget

```tsx
import SpecifyText, { ColorfulText } from 'specify-text';

const widgetMap = {
  colorful: (props) => <ColorfulText {...props} />,
};

<SpecifyText
  text="Hello [world](colorful:red)"
  widgetMap={widgetMap}
/>
```

## Props

| Prop | 类型 | 说明 |
|------|------|------|
| `text` | `string` | 待解析文本 |
| `widgetMap` | `Record<string, ComponentResolver>` | 自定义 Widget 映射 |
| `wrapperClassName` | `string` | 外层容器类名 |
| `style` | `CSSProperties` | 外层容器样式 |
| `textSplit` | `(text: string) => Segment[]` | 自定义解析函数 |
| `onError` | `(error, segment) => void` | Widget 渲染错误回调 |
| `debug` | `boolean` | 开启后输出 AST 到控制台 |

## 链接

- [GitHub](https://github.com/SmaIIstars/specify-text)