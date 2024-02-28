# SpecifyText

## 开始

SpecifyText 擅长处理特定格式的文本。它能将文本解析并与预设类型匹配，然后直接输出。下面是文本的约定格式定义:

```bash
# text: 文案内容
# type: 类型
# typeVal: 约定好的关键字

[text](type: typeVal)
```

例如，在处理彩色文案时，你可以定义一个彩色格式，如`[SpecifyText](colorful:rgba(123,213,123,0.5)`。当输入符合该格式的文本时，SpecifyText 会自动将其解析为 `colorful` 类型并根据传入的 `rgba(123,213,123,0.5)` 输出彩色文案。
