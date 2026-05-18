import { memo, useMemo } from "react";

import cls from "classnames";
import { Segment } from "@specify-text/parser";

import styles from "./conditional-text.module.scss";
import { SpecifyText } from "@specify-text/react";

export interface ConditionalTextProps extends Segment {
  type: "conditional";
  typeVal: string;
  conditionalTextClassName?: string;
  delimiter?: string;
  conditionalMap?: Record<string, boolean>;
}

const ConditionalText = (props: ConditionalTextProps) => {
  const {
    typeVal,
    conditionalTextClassName,
    conditionalMap = {},
    delimiter = ",",
  } = props;

  const isShow = useMemo(() => {
    return typeVal
      .split(delimiter)
      .some((condition) => Reflect.get(conditionalMap, condition));
  }, [typeVal, delimiter, conditionalMap]);

  return isShow ? (
    <SpecifyText
      {...props}
      text={typeVal}
      className={cls([styles.conditionalTextWrapper, conditionalTextClassName])}
    />
  ) : (
    <></>
  );
};

export default memo(ConditionalText);
