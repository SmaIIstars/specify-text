import SpecifyText from "@/specify-text";
import { BaseWidgetProps } from "@/specify-text/typings";
import { isValidText, stringToBoolean } from "@/specify-text/utils";
import { memo } from "react";

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
      {strong || stringToBoolean(typeVal) ? (
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
