import { ExampleConfig } from "../typings";

const commonConfig = {
  text: `[[1.SpecifyText](strong:true) Nesting](colorful:rgba(123,213,123,0.7))
  [[2.SpecifyText](colorful:red) Nesting](strong:true)
  [[3.Specify[[Text](link: https://github.com/SmaIIstars/SpecifyText)](colorful:green)](colorful:red) Nesting ](strong:true)
  `,
};

const config: ExampleConfig = {
  title: "Nesting",
  text: commonConfig.text,
  configs: new Array(3).fill(commonConfig),
};

export default config;
