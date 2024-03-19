import { useState } from "react";
import { BaseWidgetProps } from "@/specify-text/typings";
import SpecifyText from "@/specify-text";

import widgetMap, { CustomWidgetMapProps } from "../../config/widget-map";
import { getSizeBasedOnScreenWidth } from "../../utils";
import useResize from "../../hooks/resize";

export type SpecifyTextCustomType = BaseWidgetProps & CustomWidgetMapProps;

const SpecifyTextCustom = (props: SpecifyTextCustomType) => {
  const [screenSize, setScreenSize] = useState<number>(1);

  useResize(() => {
    setScreenSize(getSizeBasedOnScreenWidth());
  });

  return (
    <SpecifyText<CustomWidgetMapProps>
      {...props}
      widgetMap={widgetMap}
      conditionalMap={{ [`screenSize${screenSize}`]: true }}
    />
  );
};

export default SpecifyTextCustom;
