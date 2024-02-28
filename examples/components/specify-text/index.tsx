import { BaseWidgetProps } from "@/specify-text/typings";
import SpecifyText from "@/specify-text";

import widgetMap, { CustomWidgetMapProps } from "../../config/widget-map";

export type SpecifyTextCustomType = BaseWidgetProps & CustomWidgetMapProps;

const SpecifyTextCustom = (props: SpecifyTextCustomType) => {
  return <SpecifyText<CustomWidgetMapProps> {...props} widgetMap={widgetMap} />;
};

export default SpecifyTextCustom;
