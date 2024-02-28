import {
  WidgetMap,
  ColorfulText,
  ColorfulTextProps,
  LinkText,
  LinkTextProps,
  VariableText,
  VariableTextProps,
} from "../../packages";

export interface CustomWidgetTypeMap {
  colorful: ColorfulTextProps;
  link: LinkTextProps;
  var: VariableTextProps;
}

const widgetMap: WidgetMap<CustomWidgetTypeMap> = {
  colorful: (props: ColorfulTextProps) => <ColorfulText {...props} />,
  link: (props: LinkTextProps) => <LinkText {...props} />,
  var: (props: VariableTextProps) => <VariableText {...props} />,
};
export default widgetMap;

export type CustomWidgetMapProps<T = CustomWidgetTypeMap> = Partial<T[keyof T]>;
