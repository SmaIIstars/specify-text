import React, { memo } from "react";
import cls from "classnames";
import { BaseWidgetProps } from "@/specify-text/typings/widget";
import { StrongProps } from "@/specify-text/components/strong";
import BlankLine, {
  BlankLineProps,
} from "@/specify-text/components/blank-line";

import styles from "./index.module.scss";
import SpecifyText from "@/specify-text";

export interface LinkTextProps
  extends BaseWidgetProps,
    BlankLineProps,
    StrongProps {
  type: "link";
  linkWrapperClassName?: string;
  onClick?: (link: string) => void;
}

const handleLinkClick = (link: string) => {
  window.open(link, "_blank");
};

const LinkText = (props: LinkTextProps) => {
  const {
    text,
    type: linkType,
    typeVal,
    linkWrapperClassName,
    onClick: handleClick,
  } = props;

  const paragraphs = text.split("\n");

  const handleLinkOnClick = () => {
    if (handleClick) {
      handleClick(typeVal);
    } else if (linkType === "link") {
      handleLinkClick(typeVal);
    }
  };

  return (
    <span
      className={cls(styles.linkTextWrapper, linkWrapperClassName)}
      onClick={handleLinkOnClick}
    >
      {paragraphs?.map((line, idx) => (
        <React.Fragment key={line}>
          <SpecifyText {...props} text={line} />
          {idx + 1 !== paragraphs.length && (
            <BlankLine
              blankLineClassName={styles.linkTextBlankLine}
              {...props}
            />
          )}
        </React.Fragment>
      ))}
    </span>
  );
};

export default memo(LinkText);
