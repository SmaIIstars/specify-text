import { useMemo } from "react";

import { textSplit } from "./utils";
import { defaultWidgetMap } from "./widget";
import DividingParagraph from "./components/dividing-paragraph";
import { BuildInWidgetProps, WidgetMap } from "./typings/widget";

export interface SpecifyTextProps extends BuildInWidgetProps {
  text: string;
  wrapperClassName?: string;
  widgetMap?: WidgetMap;
}

const SpecifyText = <T,>(
  props: NonNullable<T> & NonNullable<SpecifyTextProps>
) => {
  const { text, wrapperClassName, widgetMap, ...resetProps } = props;

  const paragraphs = useMemo(() => {
    return textSplit(text) ?? [];
  }, [text]);

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
