import { ExampleConfig } from "../typings";
import styles from "./index.module.scss";

const commonConfig = {
  text: "[Year](variable:year) Happy New Year!",
  blankLineClassName: styles.variableBlankLine,
  variableClassName: styles.variableText,
  variableMap: { year: 2024 },
};

const config: ExampleConfig = {
  title: "Variable",
  text: commonConfig.text,
  configs: new Array(3).fill(commonConfig),
};

export default config;
