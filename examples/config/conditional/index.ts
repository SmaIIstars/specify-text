import { ExampleConfig } from "../typings";

const commonConfig = {
  text: "[ScreenSize1\n](conditional:screenSize1)[ScreenSize2\n](conditional:screenSize2)[ScreenSize3\n](conditional:screenSize3)[ScreenSize12\n](conditional:screenSize1,screenSize2)[ScreenSize23\n](conditional:screenSize2,screenSize3)",
};

const config: ExampleConfig = {
  title: "Conditional",
  text: commonConfig.text,
  configs: new Array(3).fill(commonConfig),
};

export default config;
