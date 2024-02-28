import { ExampleConfig } from "../typings";

const commonConfig = {
  text: "[1.SpecifyText](colorful:rgba(123,213,123,0.7))\n[2.Happy New Year!!!](colorful:linear-gradient(-90deg,#121212 0,#35c3ff 30%,#fda399 50%,#76d880 70%,#ebf38b 90%,#adadad 100%))",
};

const config: ExampleConfig = {
  title: "Colorful",
  text: commonConfig.text,
  configs: new Array(3).fill(commonConfig),
};

export default config;
