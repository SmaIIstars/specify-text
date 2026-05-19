import type { ComponentResolver } from "@specify-text/core";
import {
  ColorfulText,
  ColorfulTextProps,
} from "@specify-text/react-widgets-builtin";
import { LinkText, LinkTextProps } from "@specify-text/react-widgets-builtin";
import {
  VariableText,
  VariableTextProps,
} from "@specify-text/react-widgets-builtin";
import {
  ConditionalText,
  ConditionalTextProps,
} from "@specify-text/react-widgets-builtin";

// Extend the base props type with custom widget props.
// This enables full TypeScript support for widgetMap consumers.
export interface CustomWidgetTypeMap {
  colorful: ColorfulTextProps;
  link: LinkTextProps;
  variable: VariableTextProps;
  conditional: ConditionalTextProps;
}

export type CustomWidgetMapProps<T = CustomWidgetTypeMap> = Partial<T[keyof T]>;

// Register custom widgets. Built-in widgets (italic, strong) are already
// handled by DEFAULT_BASE_WIDGETS from @specify-text/react.
const widgetMap: Record<string, ComponentResolver> = {
  colorful: ColorfulText as ComponentResolver,
  link: LinkText as ComponentResolver,
  variable: VariableText as ComponentResolver,
  conditional: ConditionalText as ComponentResolver,
};

export default widgetMap;
