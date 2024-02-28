import SpecifyText from "../../../dist";
import widgetMap, { CustomWidgetMapProps } from "../../config/widget-map";
import { SpecifyTextCustomType } from "../specify-text";

const SpecifyTextDist = (props: SpecifyTextCustomType) => {
  return <SpecifyText<CustomWidgetMapProps> {...props} widgetMap={widgetMap} />;
};

export default SpecifyTextDist;
