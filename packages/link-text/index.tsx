import React, { memo } from "react";
import cls from "classnames";
import { BaseWidgetProps } from "@/specify-text/typings/widget";
import { StrongProps } from "@/specify-text/components/strong";
import BlankLine, {
  BlankLineProps,
} from "@/specify-text/components/blank-line";
import DividingParagraph from "@/specify-text/components/dividing-paragraph";

import styles from "./index.module.scss";

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

    ...resetProps
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
          <DividingParagraph text={line} {...resetProps} />
          {idx + 1 !== paragraphs.length && (
            <BlankLine
              blankLineClassName={styles.linkTextBlankLine}
              {...resetProps}
            />
          )}
        </React.Fragment>
      ))}
    </span>
  );
};

export default memo(LinkText);
