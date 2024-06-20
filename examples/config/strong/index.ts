import { ExampleConfig } from "../typings";

const commonConfig = {
  text: "[2024](strong:true), Happy [New](strong:true) Year!",
};

const config: ExampleConfig = {
  title: "Strong",
  text: commonConfig.text,
  configs: new Array(3).fill(commonConfig),
  buildIn: true,
};

export default config;
