import SpecifyText from "specify-text";
import widgetMap, { CustomWidgetMapProps } from "../../config/widget-map";
import { SpecifyTextCustomType } from "../specify-text";

const SpecifyTextCustom = (props: SpecifyTextCustomType) => {
  return <SpecifyText<CustomWidgetMapProps> {...props} widgetMap={widgetMap} />;
};

export default SpecifyTextCustom;
