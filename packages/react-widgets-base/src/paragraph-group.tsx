import React, { memo } from "react";

import BlankLine, { BlankLineProps } from "./blank-line";
import { BaseWidgetProps } from "./types";

export interface ParagraphGroupProps
  extends BaseWidgetProps,
    BlankLineProps {
  textClassName?: string;
  paragraphGroupWrapperClassName?: string;
  onClick?: (...args: any[]) => any;
}

const ParagraphGroup = (props: ParagraphGroupProps) => {
  const {
    text,
    textClassName,
    paragraphGroupWrapperClassName,
    onClick,
    blankLineClassName,
  } = props;

  if (!text) return;
  const paragraphs = text.split("\n") ?? [];

  return (
    <span className={paragraphGroupWrapperClassName} onClick={onClick}>
      {paragraphs?.map((l, idy) => {
        return (
          <React.Fragment key={l ? `${l}-${idy}` : idy}>
            <span className={textClassName}>{l}</span>

            {idy + 1 !== paragraphs.length && (
              <BlankLine blankLineClassName={blankLineClassName} />
            )}
          </React.Fragment>
        );
      })}
    </span>
  );
};

export default memo(ParagraphGroup);
