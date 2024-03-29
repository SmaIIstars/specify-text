# SpecifyText

## 开始

SpecifyText 擅长处理特定格式的文本. 它能将文本解析并与预设类型匹配, 然后直接输出. 下面是文本的约定格式定义:

```bash
# text: 文案内容
# type: 类型
# typeVal: 约定好的关键字

[text](type: typeVal)
```

例如，在处理彩色文案时, 你可以定义一个彩色格式, 如`[SpecifyText](colorful:rgba(123,213,123,0.8)`. 当输入该格式的文本时, SpecifyText 会自动将其解析为 `colorful` 类型并根据传入的颜色 `rgba(123,213,123,0.8)` 输出彩色的文案.

![colorful](https://cdn.jsdelivr.net/gh/SmaIIstars/imgCDN/specify-text/colorful1.png)

SpecifyText 在处理各种特殊文本格式时非常高效、灵活, 能大大提高开发效率, 减少重复性开发量.

## 流程

Widget: 一个能够处理解析后的文案内容并输出特定格式的基本构建块
![core-process](https://cdn.jsdelivr.net/gh/SmaIIstars/imgCDN/specify-text/core-process.png)

## 使用

### 安装

```bash
npm i specify-text
```

### 基础使用

已内置部分小组件可直接使用, 例如: 换行、斜体等, 详见 Widget 部分

```typescript
import SpecifyText from "specify-text";

const SpecifyTextPage = () => {
  return <SpecifyText text="start\nend" />;
};

export default SpecifyTextPage;
```

### 样式引入

```typescript
import "specify-text/style";
```

![basic-usage](https://cdn.jsdelivr.net/gh/SmaIIstars/imgCDN/specify-text/basic-usage.png)

### 进阶使用

在基础组件上再添加扩展 已提供 或者 自己开发 的组件能力

```typescript
import { SpecifyText, ColorfulText, ColorfulTextProps } from "specify-text";

// Widget 外部组件映射表
const widgetMap = {
  colorful: (props: ColorfulTextProps) => <ColorfulText {...props} />,
};

const SpecifyTextPage = () => {
  return <SpecifyText text="start\nend" widgetMap={widgetMap} />;
};

export default SpecifyTextPage;
```

### 更好的体验

通过上面的方式添加后, 会发现能力已经可以使用了, 只是没有类型提示罢了. SpecifyText 提供了可扩展的 Props, 只需要传入范型即可

```typescript
import {
  WidgetMap,
  ColorfulText,
  ColorfulTextProps,
  LinkTextProps,
  LinkText,
} from "specify-text";

// Widget 类型映射表
export interface CustomWidgetTypeMap {
  colorful: ColorfulTextProps;
  link: LinkTextProps;
}

// Widget 外部组件映射表
const widgetMap: WidgetMap<CustomWidgetTypeMap> = {
  colorful: (props: ColorfulTextProps) => <ColorfulText {...props} />,
  link: (props: LinkTextProps) => <LinkText {...props} />,
};

// 联合类型
export type CustomWidgetMapProps<T = CustomWidgetTypeMap> = Partial<T[keyof T]>;

// 建议再次封装一层, 这样就不用每次在调用 SpecifyText 组件的时候都需要传入范型
type CustomSpecifyTextProps = Record<string, any>

const CustomSpecifyText = (props: CustomSpecifyTextProps) => {
  return (
    {/* 自定义范型传入 */}
    <SpecifyText<CustomWidgetMapType>
        text="[SpecifyText](link:https://www.npmjs.com/package/specify-text"
        widgetMap={widgetMap}
        {...props}
    />
  );
};

export default CustomSpecifyText;
```

## Widget 组件

组件有内置、已提供和自定义三大部分

### 内置组件

#### 换行

已支持换行符换行(\n), 不需要额外配置直接使用即可

```markdown
Specify\nText
```

![build-in-dividing-line](https://cdn.jsdelivr.net/gh/SmaIIstars/imgCDN/specify-text/build-in-dividing-line.png)

| Name               | Description | Required | Default | Type   | Tip |
| ------------------ | ----------- | -------- | ------- | ------ | --- |
| blankLineClassName | 包装类名称  | No       |         | string |     |

#### 斜体

```markdown
# typeVal 可为任意值, 不是必传

start [123456789](italics:true) end
```

![build-in-italics](https://cdn.jsdelivr.net/gh/SmaIIstars/imgCDN/specify-text/build-in-italics.png)

| Name          | Description | Required | Default | Type   | Tip |
| ------------- | ----------- | -------- | ------- | ------ | --- |
| textClassName | 包装类名称  | No       |         | string |     |

### 已提供的组件

已经提供的组件, 使用需要通过 widget 属性进行注册

#### 彩色字体

```markdown
# 1. linear-gradient 开头会添加到 background-image 属性

[SpecifyText](colorful:linear-gradient(270deg, #00d6c8 0%, #00a3f5 100%))

# 2. 其余添加 background-color 属性

[SpecifyText](colorful:red)
```

![provided-colorful](https://cdn.jsdelivr.net/gh/SmaIIstars/imgCDN/specify-text/provided-colorful.png)

| Name                  | Description | Required | Default | Type   | Tip                     |
| --------------------- | ----------- | -------- | ------- | ------ | ----------------------- |
| colorfulTextClassName | 包装类名称  | No       |         | string |                         |
| typeVal               | 值          | Yes      |         | string | rgba 或 linear-gradient |

#### 超链接

```markdown
[SpecifyText](link:https://www.npmjs.com/package/specify-text)
```

![provided-link](https://cdn.jsdelivr.net/gh/SmaIIstars/imgCDN/specify-text/provided-link.png)

| Name                 | Description    | Required | Default | Type                   | Tip  |
| -------------------- | -------------- | -------- | ------- | ---------------------- | ---- |
| linkWrapperClassName | 包装类名称     | No       |         | string                 |      |
| typeVal              | 值             | Yes      |         | string                 | 链接 |
| onClick              | 自定义点击事件 | No       |         | (link: string) => void |      |

#### 变量

```typescript
//  text 文案
// [any description](var:variable) ,Happy New Year!

import { SpecifyText, VariableText } from "specify-text";

// Widget 外部组件映射表
const widgetMap = {
  var: (props: VariableTextProps) => <VariableText {...props} />,
};

const SpecifyTextPage = () => {
  return (
    <SpecifyText
      text="[Year](variable:year) Happy New Year!"
      widgetMap={widgetMap}
      variableMap={{ year: 2024 }}
    />
  );
};

export default SpecifyTextPage;
```

![variable](https://cdn.jsdelivr.net/gh/SmaIIstars/imgCDN/specify-text/provided-variable.png)

| Name              | Description | Required | Default | Type                | Tip            |
| ----------------- | ----------- | -------- | ------- | ------------------- | -------------- |
| variableClassName | 包装类名称  | No       |         | string              |                |
| typeVal           | 值          | Yes      |         | string              | 使用的变量名称 |
| variableMap       | 变量映射表  | Yes      |         | Record<string, any> |                |

#### 条件判断

只有符合条件的内容会被展示, 变量名称可以是任意值, 通过传入的变量名称来判断的, 如果以变量名称为变量的值为 TRUE, 则会展示, 否则不展示. (例如示例, 1 为屏幕宽度 <= 1280, 2 为屏幕宽度 <= 1920, 3 为其他)

```tsx
const getSizeBasedOnScreenWidth = () => {
  const screenWidth = window.innerWidth;

  if (screenWidth <= 1280) {
    return 1;
  } else if (screenWidth <= 1980) {
    return 2;
  } else {
    return 3;
  }
};

const text = "[ScreenSize1\n](conditional:screenSize1)[ScreenSize2\n](conditional:screenSize2)[ScreenSize3\n](conditional:screenSize3)[ScreenSize12\n](conditional:screenSize1,screenSize2)[ScreenSize23\n](conditional:screenSize2,screenSize3)"


<SpecifyText
  text={text}
  conditionalMap={{ [`screenSize${getSizeBasedOnScreenWidth()}`]: true }}
/>
```

![variable](https://cdn.jsdelivr.net/gh/SmaIIstars/imgCDN/specify-text/provided-conditional.png)

| Name                     | Description    | Required | Default | Type                    | Tip              |
| ------------------------ | -------------- | -------- | ------- | ----------------------- | ---------------- |
| conditionalTextClassName | 包装类名称     | No       |         | string                  |                  |
| typeVal                  | 值             | Yes      |         | string                  | 条件变量名称     |
| delimiter                | 分隔符         | No       | ,       | string                  | 多条件之间分隔符 |
| conditionalMap           | 条件变量映射表 | Yes      |         | Record<string, boolean> |                  |

### 自定义组件

以内置组件 Colorful 编写为例

```typescript
import React, { memo } from "react";
import cls from "classnames";
// 导入内置类型和内置组件
import { BaseWidgetProps, BlankLine } from "specify-text";

import styles from "./index.module.scss";

// 定义组件类型, 并继承 BaseWidgetProps , 可以对 type、typeVal 类型进行重载
export interface ColorfulTextProps extends BaseWidgetProps {
  type: "colorful";
  typeVal: string;
  colorfulTextClassName?: string;
  blankLineClassName?: string;
}

const ColorfulText = (props: ColorfulTextProps) => {
  // 处理逻辑
  const { text, typeVal, colorfulTextClassName, ...resetProps } = props;

  const paragraphs = text.split("\n");

  return (
    <>
      {paragraphs?.map((line, idx) => {
        return (
          <React.Fragment key={line}>
            <span
              className={cls([
                colorfulTextClassName,
                styles.colorfulTextWrapper,
              ])}
              style={{
                [typeVal.startsWith("linear-gradient")
                  ? `backgroundImage`
                  : `backgroundColor`]: typeVal,
              }}
            >
              {line}
            </span>

            {idx + 1 !== paragraphs.length && <BlankLine {...resetProps} />}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default memo(ColorfulText);
```

### 自定义文案约定格式

可以自己约定文案的解析格式, 只需要满足最终返回对象包含以下几点即可:

```typescript
export type BaseWidgetProps = {
  text: string;
  type?: any;
  typeVal?: any;
};
```

使用方法:

```typescript
const SpecifyTextCustom = (props: SpecifyTextCustomType) => {
  const customTextSplit = (textStr: string) => {
    // 自定义处理逻辑

    return [
      {
        text: textStr,
        type: "custom",
        typeVal: "custom",
      },
    ];
  };

  return (
    <SpecifyText<CustomWidgetMapProps>
      {...props}
      widgetMap={widgetMap}
      textSplit={customTextSplit}
    />
  );
};
```
