// TODO: replace the default export
// import { SpecifyText } from "specify-text";
import widgetMap, { CustomWidgetMapProps } from "../../config/widget-map";
import { SpecifyTextCustomType } from "../specify-text";

const SpecifyTextCustom = (props: SpecifyTextCustomType) => {
  return <div>npm</div>;
  // return <SpecifyText<CustomWidgetMapProps> {...props} widgetMap={widgetMap} />;
};

export default SpecifyTextCustom;
