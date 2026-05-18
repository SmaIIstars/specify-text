import { BaseWidgetProps } from "../typings/widget";

const SpecifyTextRegex = /\[.*?\]\(.*?:.*?\)/s;

type TextSliceType = (BaseWidgetProps | string)[];

const Brackets = "[()]";
enum TextCheckStatus {
  CompleteClosed = -1,
  InitStatus = 0,
  MidBracketClosed = 1,
  MinBracketClosed = 2,
}

const textCheckSplit = (text: string) => {
  const bracketStack = [];
  const splitList: TextSliceType = [];

  let flag = TextCheckStatus.InitStatus;

  if (!isValidText(text)) return [text];

  let curIdx = text.indexOf("[");
  const obj: BaseWidgetProps = {
    text: "",
  };
  splitList.push(text.slice(0, curIdx));

  for (let i = curIdx; i < text.length; i++) {
    if (flag === TextCheckStatus.CompleteClosed) {
      const nextStartIdx = text.slice(i).indexOf("[");
      if (nextStartIdx === -1) {
        splitList.push(text.slice(i));
        break;
      }
      splitList.push(text.slice(i, i + nextStartIdx));
      i = i + nextStartIdx;
      curIdx = i;
      flag = TextCheckStatus.InitStatus;
    }

    const char = text[i];

    const bracketIdx = Brackets.indexOf(char);
    if (bracketIdx === -1) continue;

    const bracketStackDeep = bracketStack.length;

    if (bracketStackDeep === 0) {
      bracketStack.push(char);
      continue;
    }
    if (bracketIdx === 0 || bracketIdx === 1) {
      bracketStack.push(char);
      continue;
    }

    const latestBracketIdx = Brackets.indexOf(
      bracketStack[bracketStackDeep - 1]
    );
    if (latestBracketIdx + bracketIdx === 3) {
      if (latestBracketIdx === 0) flag = TextCheckStatus.MidBracketClosed;
      if (latestBracketIdx === 1) flag = TextCheckStatus.MinBracketClosed;
      bracketStack.pop();
      if (
        bracketStack.length === 0 &&
        flag === TextCheckStatus.MidBracketClosed
      ) {
        const msgText1 = text.slice(curIdx + 1, i);
        Reflect.set(obj, "text", msgText1);
        // console.log("msgText1", msgText1);
        curIdx = i + 1;
        continue;
      }

      if (
        bracketStack.length === 0 &&
        flag === TextCheckStatus.MinBracketClosed
      ) {
        const [type, ...typeVals] = text.slice(curIdx + 1, i).split(":");
        Reflect.set(obj, "type", type);
        Reflect.set(obj, "typeVal", typeVals.join(":"));
        splitList.push({ ...obj });

        Object.keys(obj).forEach((key) => {
          delete obj[key];
        });

        flag = TextCheckStatus.CompleteClosed;
      }
    }
  }

  return splitList;
};

const textSplit = (str: string) => {
  return textCheckSplit(str);
};

const isValidText = (str: string) => {
  return SpecifyTextRegex.test(str);
};

export { isValidText, textSplit };
