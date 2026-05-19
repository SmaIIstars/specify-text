import React, { memo } from "react";
import { Segment } from "@specify-text/parser";
import { BlankLine, BlankLineProps } from "@specify-text/react-widgets-base";
import { StrongProps } from "@specify-text/react";

import styles from "./link-text.module.scss";
import { SpecifyText } from "@specify-text/react";

export interface LinkTextProps
  extends Segment,
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
      handleClick(typeVal ?? '');
    } else if (linkType === "link") {
      handleLinkClick(typeVal ?? '');
    }
  };

  return (
    <span
      className={`${linkWrapperClassName} ${styles.linkTextWrapper}`}
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
