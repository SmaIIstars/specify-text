import Italics, { ItalicsProps } from "./components/italics";
import Strong, { StrongProps } from "./components/strong";
import { WidgetMap } from "./typings/widget";

// default widget map
export const defaultWidgetMap: WidgetMap = {
  italics: (props: ItalicsProps) => <Italics {...props} />,
  strong: (props: StrongProps) => <Strong {...props} />,
};
