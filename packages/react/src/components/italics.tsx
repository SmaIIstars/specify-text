import { isValidText } from "@specify-text/parser";
import React, { memo } from "react";

import BlankLine, { BlankLineProps } from "./blank-line";
import { SpecifyText } from "../specify-text";
import { BaseWidgetProps } from "../types";

const stringToBoolean = (value: string) => {
  return ["", "false", "null", "undefined", "0", "NaN"].includes(value)
    ? false
    : true;
};

export interface ItalicsProps extends BaseWidgetProps, BlankLineProps {
  textClassName?: string;
  ItalicsTextClassName?: string;
}

const Italics = (props: ItalicsProps) => {
  const {
    text,
    typeVal,
    textClassName,
    blankLineClassName,
    ItalicsTextClassName,
  } = props;
  const paragraphs = text.split("\n");

  return (
    <>
      {paragraphs?.map((line, idx) => (
        <React.Fragment key={line ? `${line}` : `${line}-${idx}`}>
          {stringToBoolean(typeVal ?? "") ? (
            <i className={ItalicsTextClassName}>
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

export default memo(Italics);
