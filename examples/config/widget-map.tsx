import {
  ColorfulText,
  ColorfulTextProps,
  LinkText,
  LinkTextProps,
  VariableText,
  VariableTextProps,
  ConditionalText,
  ConditionalTextProps,
  Strong,
  StrongProps,
} from "../../packages";

export interface CustomWidgetTypeMap {
  colorful: ColorfulTextProps;
  link: LinkTextProps;
  variable: VariableTextProps;
  conditional: ConditionalTextProps;
  strong: StrongProps;
}

const widgetMap: Record<string, React.FC> = {
  colorful: (props: ColorfulTextProps) => <ColorfulText {...props} />,
  link: (props: LinkTextProps) => <LinkText {...props} />,
  variable: (props: VariableTextProps) => <VariableText {...props} />,
  conditional: (props: ConditionalTextProps) => <ConditionalText {...props} />,
  strong: (props: StrongProps) => <Strong {...props} />,
};
export default widgetMap;

export type CustomWidgetMapProps<T = CustomWidgetTypeMap> = Partial<T[keyof T]>;
