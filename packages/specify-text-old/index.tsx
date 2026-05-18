import { CSSProperties, useMemo } from "react";

import { textSplit } from "./utils";
import { defaultWidgetMap } from "./widget";
import DividingParagraph from "./components/dividing-paragraph";
import {
  BaseWidgetProps,
  BuildInWidgetProps,
  WidgetMap,
} from "./typings/widget";

export interface SpecifyTextProps extends BuildInWidgetProps {
  text: string;
  wrapperClassName?: string;
  widgetMap?: WidgetMap;
  style?: CSSProperties;

  textSplit?: (textStr: string) => (BaseWidgetProps | string)[];
}

const SpecifyText = <T,>(
  props: NonNullable<T> & NonNullable<SpecifyTextProps>
) => {
  const {
    text,
    wrapperClassName,
    widgetMap,
    textSplit: textSplitFn,
    style,
  } = props;

  const paragraphs = useMemo(() => {
    return (
      (textSplitFn ? textSplitFn(text) : textSplit(text)).filter((t) => t) ?? []
    );
  }, [text, textSplitFn]);

  const curWidget = useMemo(
    () => ({ ...defaultWidgetMap, ...widgetMap }),
    [widgetMap]
  );

  return (
    <>
      {text && (
        <span className={wrapperClassName} style={style}>
          {paragraphs.map((p, idx) => {
            if (typeof p === "string") {
              return (
                <DividingParagraph
                  key={p ? `${p}-${idx}` : idx}
                  {...props}
                  text={p}
                />
              );
            }

            const { text: content, type, typeVal } = p;
            const Component = Reflect.get(curWidget, type);

            return Component ? (
              <Component
                key={content ? `${content}-${idx}` : idx}
                {...props}
                typeVal={typeVal}
                type={type}
                text={content}
              />
            ) : (
              <DividingParagraph
                key={content ? `${content}-${idx}` : idx}
                {...props}
                text={content}
              />
            );
          })}
        </span>
      )}
    </>
  );
};

export default SpecifyText;
