import { isValidText } from "@specify-text/parser";
import React from "react";

import { BlankLine, BlankLineProps } from "@specify-text/react-widgets-base";
import { BaseWidgetProps } from "@specify-text/react-widgets-base";
import { stringToBoolean } from "@specify-text/core";
import { SpecifyText } from "./specify-text";

export interface ItalicProps extends BaseWidgetProps, BlankLineProps {
  textClassName?: string;
  italicTextClassName?: string;
}

const Italic = (props: ItalicProps) => {
  const {
    text,
    typeVal,
    textClassName,
    blankLineClassName,
    italicTextClassName,
  } = props;
  const paragraphs = text.split("\n");

  return (
    <>
      {paragraphs?.map((line, idx) => (
        <React.Fragment key={line ? `${line}` : `${line}-${idx}`}>
          {stringToBoolean(typeVal ?? "") ? (
            <i className={italicTextClassName}>
              {isValidText(line) ? (
                <SpecifyText {...props} text={line} />
              ) : (
                text
              )}
            </i>
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

export default Italic;
