import { BaseWidgetProps } from "../typings/widget";

const SpecifyTextRegex = /\[([\s\S]*?)\]\((.*?):(.*?[)]?)\)/g;

type TextSliceType = (BaseWidgetProps | string)[];

const textSplit = (textStr: string) => {
  let splitIdx = 0;
  const parts: TextSliceType = [];
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const match = SpecifyTextRegex.exec(textStr);
    if (!match) {
      parts.push(textStr.slice(splitIdx));
      break;
    }

    const [, text, type, typeVal] = match;
    parts.push(textStr.slice(splitIdx, match.index), { text, type, typeVal });
    splitIdx = SpecifyTextRegex.lastIndex;
  }

  return parts.length ? parts : [textStr];
};

export { textSplit };
