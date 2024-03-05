import { useMemo } from "react";

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
    ...resetProps
  } = props;

  const paragraphs = useMemo(() => {
    return (textSplitFn ? textSplitFn(text) : textSplit(text)) ?? [];
  }, [text, textSplitFn]);

  const curWidget = useMemo(
    () => ({ ...defaultWidgetMap, ...widgetMap }),
    [widgetMap]
  );

  return (
    <>
      {text && (
        <div className={wrapperClassName}>
          {paragraphs.map((p, idx) => {
            if (typeof p === "string") {
              return (
                <DividingParagraph
                  key={p ? `${p}-${idx}` : idx}
                  text={p}
                  {...resetProps}
                />
              );
            }

            const { text: content, type, typeVal } = p;

            const Component = Reflect.get(curWidget, type);

            return Component ? (
              <Component
                key={content ? `${content}-${idx}` : idx}
                text={content}
                typeVal={typeVal}
                type={type}
                {...resetProps}
              />
            ) : (
              <DividingParagraph
                key={content ? `${content}-${idx}` : idx}
                text={content}
                {...resetProps}
              />
            );
          })}
        </div>
      )}
    </>
  );
};

export default SpecifyText;
