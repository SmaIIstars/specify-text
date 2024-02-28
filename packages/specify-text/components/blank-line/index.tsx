import { memo } from "react";

export type BlankLineProps = {
  blankLineClassName?: string;
};

const BlankLine = (props: BlankLineProps) => {
  const { blankLineClassName } = props;

  return <div className={blankLineClassName} />;
};

export default memo(BlankLine);
