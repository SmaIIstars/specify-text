import { useState } from "react";
import SpecifyText from "../../../dist";
import widgetMap, { CustomWidgetMapProps } from "../../config/widget-map";
import { SpecifyTextCustomType } from "../specify-text";

import { getSizeBasedOnScreenWidth } from "../../utils";
import useResize from "../../hooks/resize";

const SpecifyTextDist = (props: SpecifyTextCustomType) => {
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

export default SpecifyTextDist;
