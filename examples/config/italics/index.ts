import { ExampleConfig } from "../typings";

const commonConfig = {
  text: "[SpecifyText](italics:true)",
};

const config: ExampleConfig = {
  title: "Italics",
  text: commonConfig.text,
  configs: new Array(3).fill(commonConfig),
  buildIn: true,
};

export default config;
