import React, { memo } from "react";

import BlankLine, { BlankLineProps } from "../blank-line";
import { BaseWidgetProps } from "@/specify-text/typings/widget";
import Strong, { StrongProps } from "../strong";

export interface DividingParagraphProps
  extends BaseWidgetProps,
    StrongProps,
    BlankLineProps {
  dividingParagraphWrapperClassName?: string;
  onClick?: (...args: unknown[]) => unknown;
}

const DividingParagraph = (props: DividingParagraphProps) => {
  const {
    text,
    strong = false,
    dividingParagraphWrapperClassName,
    textClassName,
    onClick,
    blankLineClassName,
  } = props;

  const paragraphs = text.split("\n") ?? [];

  return (
    <span className={dividingParagraphWrapperClassName} onClick={onClick}>
      {paragraphs?.map((l, idy) => {
        return (
          <React.Fragment key={l ? `${l}-${idy}` : idy}>
            <Strong strong={strong} text={l} textClassName={textClassName} />
            {idy + 1 !== paragraphs.length && (
              <BlankLine blankLineClassName={blankLineClassName} />
            )}
          </React.Fragment>
        );
      })}
    </span>
  );
};

export default memo(DividingParagraph);
