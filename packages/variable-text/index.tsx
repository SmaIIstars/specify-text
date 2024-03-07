import { memo, useMemo } from "react";
import { BlankLineProps } from "@/specify-text/components/blank-line";
import { BaseWidgetProps } from "@/specify-text/typings";
import { StrongProps } from "@/specify-text/components/strong";
import DividingParagraph from "@/specify-text/components/dividing-paragraph";

export interface VariableTextProps
  extends BaseWidgetProps,
    BlankLineProps,
    StrongProps {
  type: "variable";
  typeVal: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  variableMap: Record<string, any>;

  variableClassName?: string;
}

const VariableText = (props: VariableTextProps) => {
  const { typeVal, variableMap = {}, variableClassName, ...resetProps } = props;
  const realVal = useMemo(
    () => Reflect.get(variableMap, typeVal, ""),
    [typeVal, variableMap]
  );

  return (
    <>
      <DividingParagraph
        dividingParagraphWrapperClassName={variableClassName}
        {...resetProps}
        text={`${realVal}`}
      />
    </>
  );
};

export default memo(VariableText);
