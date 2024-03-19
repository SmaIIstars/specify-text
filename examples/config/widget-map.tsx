import {
  WidgetMap,
  ColorfulText,
  ColorfulTextProps,
  LinkText,
  LinkTextProps,
  VariableText,
  VariableTextProps,
  ConditionalText,
  ConditionalTextProps,
} from "../../packages";

export interface CustomWidgetTypeMap {
  colorful: ColorfulTextProps;
  link: LinkTextProps;
  variable: VariableTextProps;
  conditional: ConditionalTextProps;
}

const widgetMap: WidgetMap<CustomWidgetTypeMap> = {
  colorful: (props: ColorfulTextProps) => <ColorfulText {...props} />,
  link: (props: LinkTextProps) => <LinkText {...props} />,
  variable: (props: VariableTextProps) => <VariableText {...props} />,
  conditional: (props: ConditionalTextProps) => <ConditionalText {...props} />,
};
export default widgetMap;

export type CustomWidgetMapProps<T = CustomWidgetTypeMap> = Partial<T[keyof T]>;
