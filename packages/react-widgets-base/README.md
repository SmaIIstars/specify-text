# @specify-text/react-widgets-base

基础渲染组件，自动注册到 catalog。无需手动配置即可使用。

## 安装

```bash
npm i @specify-text/react-widgets-base
```

## 导出

### `BlankLine`

处理文本中的 `\n` 换行，拆分为段落。

### `ParagraphGroup`

渲染纯文本段落（即未被任何 Widget 匹配的文本）。

### `BaseWidgetProps`

所有 Widget 的基础属性类型：

```ts
interface BaseWidgetProps {
  text: string;
  type?: string;
  typeVal?: string;
}
```

## 链接

- [GitHub](https://github.com/SmaIIstars/specify-text)