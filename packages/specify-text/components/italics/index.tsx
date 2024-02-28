import { BaseWidgetProps } from "@/specify-text/typings/widget";
import { stringToBoolean } from "@/specify-text/utils";
import React, { memo } from "react";

import BlankLine, { BlankLineProps } from "~@/components/blank-line";

export interface ItalicsProps extends BaseWidgetProps, BlankLineProps {
  textClassName?: string;
}

const Italics = (props: ItalicsProps) => {
  const { text, typeVal, textClassName, blankLineClassName } = props;
  const paragraphs = text.split("\n");

  return (
    <>
      {paragraphs?.map((line, idx) => (
        <React.Fragment key={line ? `${line}` : `${line}-${idx}`}>
          {stringToBoolean(typeVal) ? (
            <i className={textClassName}>{line}</i>
          ) : (
            <span className={textClassName}>{line}</span>
          )}
          {idx + 1 !== paragraphs.length && (
            <BlankLine blankLineClassName={blankLineClassName} />
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default memo(Italics);
