import { BlankLineProps } from "../components/blank-line";
import { DividingParagraphProps } from "../components/dividing-paragraph";
import { ItalicsProps } from "../components/italics";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type BaseWidgetType = string;
export type BaseWidgetProps = {
  text: string;
  type?: any;
  typeVal?: any;
};

export type WidgetFn<WidgetProps> = (
  props: WidgetProps & BaseWidgetProps
) => JSX.Element;

export type WidgetTypeMap<Type = string, Props = any> = Record<
  BaseWidgetType & Type,
  BaseWidgetProps & Props
>;

export type WidgetMap<Map extends WidgetTypeMap = WidgetTypeMap> = {
  [K in keyof Map]: WidgetFn<Map[K]>;
};

export interface BuildInWidgetProps
  extends BlankLineProps,
    DividingParagraphProps,
    ItalicsProps {}
