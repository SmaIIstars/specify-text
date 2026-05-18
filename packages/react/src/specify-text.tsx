import React, { CSSProperties, useMemo } from 'react';
import { Segment, ParseOptions, parse } from '@specify-text/parser';
import { ComponentResolver, createCatalog } from '@specify-text/core';
import { DividingParagraph } from '@specify-text/react-widgets-base';
import { DEFAULT_BASE_WIDGETS } from './default-widgets';

export interface SpecifyTextProps {
  text: string;
  wrapperClassName?: string;
  widgetMap?: Record<string, ComponentResolver>;
  style?: CSSProperties;
  textSplit?: (text: string) => (Segment | string)[];
  onError?: (error: Error, segment: Segment) => void;
  parseOptions?: ParseOptions;
  [key: string]: unknown;
}

const SpecifyTextInner = (props: SpecifyTextProps) => {
  const {
    text,
    wrapperClassName,
    widgetMap,
    textSplit: customSplit,
    style,
    onError,
  } = props;

  const segments = useMemo((): (Segment | string)[] => {
    if (customSplit) {
      return customSplit(text);
    }
    return parse(text);
  }, [text, customSplit]);

  const catalog = useMemo(() => {
    const combined = { ...DEFAULT_BASE_WIDGETS, ...widgetMap };
    return createCatalog(combined);
  }, [widgetMap]);

  return (
    <>
      {text && (
        <span className={wrapperClassName} style={style}>
          {segments.map((item, idx) => {
            if (typeof item === 'string') {
              return (
                <DividingParagraph key={idx} {...props} text={item} />
              );
            }
            if (!item.type) {
              return (
                <DividingParagraph key={idx} {...props} text={item.text} />
              );
            }
            const resolver = catalog.get(item.type);
            if (resolver) {
              try {
                return (
                  <React.Fragment key={idx}>
                    {resolver({ ...props, ...item }) as React.ReactNode}
                  </React.Fragment>
                );
              } catch (e) {
                const error = e instanceof Error ? e : new Error(String(e));
                onError?.(error, item);
                return (
                  <DividingParagraph key={idx} {...props} text={item.text} />
                );
              }
            }
            return (
              <DividingParagraph key={idx} {...props} text={item.text} />
            );
          })}
        </span>
      )}
    </>
  );
};

export const SpecifyText = React.memo(SpecifyTextInner) as React.FC<SpecifyTextProps>;
