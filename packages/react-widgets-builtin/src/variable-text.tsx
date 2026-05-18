import { memo, useMemo } from "react";
import { Segment } from "@specify-text/parser";
import { BlankLineProps } from "@specify-text/react-widgets-base";
import { StrongProps } from "@specify-text/react";
import { SpecifyText } from "@specify-text/react";

export interface VariableTextProps
  extends Segment,
    BlankLineProps,
    StrongProps {
  type: "variable";
  typeVal: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variableMap: Record<string, any>;

  variableClassName?: string;
}

const VariableText = (props: VariableTextProps) => {
  const { text, typeVal, variableMap = {}, variableClassName } = props;
  const realVal = useMemo(
    () => Reflect.get(variableMap, typeVal) ?? text,
    [typeVal, variableMap, text]
  );

  return (
    <SpecifyText
      {...props}
      wrapperClassName={variableClassName}
      text={`${realVal}`}
    />
  );
};

export default memo(VariableText);
