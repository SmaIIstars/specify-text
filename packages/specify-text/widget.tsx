import Italics, { ItalicsProps } from "./components/italics";
import { WidgetMap } from "./typings/widget";

// default widget map
export const defaultWidgetMap: WidgetMap = {
  italics: (props: ItalicsProps) => <Italics {...props} />,
};
