import { memo, useMemo } from "react";

import cls from "classnames";
import { BaseWidgetProps } from "@/specify-text/typings/widget";

import styles from "./index.module.scss";

export interface ConditionalTextProps extends BaseWidgetProps {
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
    <div
      className={cls([styles.conditionalTextWrapper, conditionalTextClassName])}
    >
      {typeVal}
    </div>
  ) : (
    <></>
  );
};

export default memo(ConditionalText);
