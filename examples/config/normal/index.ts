import { ExampleConfig } from "../typings";

const commonConfig = {
  text: "2024 \nHappy New Year!",
};

const config: ExampleConfig = {
  title: "Normal",
  text: commonConfig.text,
  configs: new Array(3).fill(commonConfig),
  buildIn: true,
};

export default config;
