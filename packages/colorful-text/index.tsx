import React, { memo } from "react";

import cls from "classnames";
import { BaseWidgetProps } from "@/specify-text/typings/widget";
import BlankLine, {
  BlankLineProps,
} from "@/specify-text/components/blank-line";

import styles from "./index.module.scss";

export interface ColorfulTextProps extends BaseWidgetProps, BlankLineProps {
  type: "colorful";
  typeVal: string;
  colorfulTextClassName?: string;
}

const ColorfulText = (props: ColorfulTextProps) => {
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
