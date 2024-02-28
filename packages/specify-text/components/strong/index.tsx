import { BaseWidgetProps } from "@/specify-text/typings";
import { memo } from "react";

export interface StrongProps extends BaseWidgetProps {
  strong?: boolean;
  textClassName?: string;
}

const Strong = (props: StrongProps) => {
  const { text, strong, textClassName } = props;

  return (
    <>
      {strong ? (
        <strong className={textClassName}>{text}</strong>
      ) : (
        <span className={textClassName}>{text}</span>
      )}
    </>
  );
};

export default memo(Strong);
