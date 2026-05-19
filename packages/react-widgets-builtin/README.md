# @specify-text/react-widgets-builtin

内置扩展 Widget 集，需通过 `widgetMap` 手动注册后使用。

## 安装

```bash
npm i @specify-text/react-widgets-builtin
```

## 导出

### `ColorfulText`

彩色文字，支持纯色和渐变。

```tsx
import { ColorfulText } from '@specify-text/react-widgets-builtin';

// 纯色
<SpecifyText
  text="Hello [world](colorful:red)"
  widgetMap={{ colorful: (p) => <ColorfulText {...p} /> }}
/>

// 渐变
<SpecifyText
  text="[Gradient](colorful:linear-gradient(270deg, #00d6c8 0%, #00a3f5 100%))"
  widgetMap={{ colorful: (p) => <ColorfulText {...p} /> }}
/>
```

### `LinkText`

超链接。

```tsx
import { LinkText } from '@specify-text/react-widgets-builtin';

<SpecifyText
  text="[npm](link:https://www.npmjs.com)"
  widgetMap={{ link: (p) => <LinkText {...p} /> }}
/>
```

### `VariableText`

变量替换，配合 `variableMap` 使用。

### `ConditionalText`

条件渲染，配合 `conditionalMap` 使用。多个条件以逗号分隔，任一匹配即显示。

## 链接

- [GitHub](https://github.com/SmaIIstars/specify-text)