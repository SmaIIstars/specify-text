import { isValidText } from "@specify-text/parser";
import { memo } from "react";

import { SpecifyText } from "@specify-text/react";
import { BaseWidgetProps } from "./types";

const stringToBoolean = (value: string) => {
  return ["", "false", "null", "undefined", "0", "NaN"].includes(value)
    ? false
    : true;
};

export interface StrongProps extends BaseWidgetProps {
  strong?: boolean;
  textClassName?: string;
  strongTextClassName?: string;
}

const Strong = (props: StrongProps) => {
  const {
    text,
    typeVal,
    strong = false,
    textClassName,
    strongTextClassName,
  } = props;

  return (
    <>
      {strong || stringToBoolean(typeVal ?? "") ? (
        <strong className={strongTextClassName}>
          {isValidText(text) ? <SpecifyText {...props} text={text} /> : text}
        </strong>
      ) : (
        <span className={textClassName}>{text}</span>
      )}
    </>
  );
};

export default memo(Strong);
