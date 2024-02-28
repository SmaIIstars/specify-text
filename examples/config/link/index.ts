import { ExampleConfig } from "../typings";

const commonConfig = {
  text: "[1.SpecifyText](link:https://github.com/SmaIIstars/SpecifyText)\n[2.Happy\n New Year!!!](link:https://github.com/SmaIIstars/SpecifyText)",
};

const config: ExampleConfig = {
  title: "Link",
  text: commonConfig.text,
  configs: new Array(3).fill(commonConfig),
};

export default config;
