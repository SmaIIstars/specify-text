import React, { memo } from "react";

import { Segment } from "@specify-text/parser";
import { BlankLine, BlankLineProps } from "@specify-text/react-widgets-base";

import styles from "./colorful-text.module.scss";
import { SpecifyText } from "@specify-text/react";

export interface ColorfulTextProps extends Segment, BlankLineProps {
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
            <SpecifyText
              {...props}
              text={line}
              wrapperClassName={`${colorfulTextClassName} ${styles.colorfulTextWrapper}`}
              style={{
                [typeVal.startsWith("linear-gradient")
                  ? `backgroundImage`
                  : `backgroundColor`]: typeVal,
              }}
            />

            {idx + 1 !== paragraphs.length && <BlankLine {...resetProps} />}
          </React.Fragment>
        );
      })}
    </>
  );
};

export default memo(ColorfulText);
