import { SpecifyText } from "@specify-text/react";

import widgetMap, { CustomWidgetMapProps } from "./widget-map";
import styles from "./index.module.scss";

interface DemoSection {
  title: string;
  text: string;
  props: CustomWidgetMapProps;
}

const demoList: DemoSection[] = [
  {
    title: "Built-in Widgets (italic, strong)",
    text: "[Hello World](italic:true)\n[Hello World](strong:true)",
    props: {},
  },
  {
    title: "Link Widget",
    text: "[SpecifyText on GitHub](link:https://github.com/SmaIIstars/SpecifyText)",
    props: {},
  },
  {
    title: "Variable Widget",
    text: "[Year](variable:year) Happy New Year!",
    props: { variableMap: { year: 2026 } },
  },
  {
    title: "Colorful Widget",
    text: "[Colorful Text](colorful:rgba(123,213,123,0.7))",
    props: {},
  },
  {
    title: "Conditional Widget",
    text: "[Visible Content](conditional:show)[Hidden Content](conditional:hide)",
    props: { conditionalMap: { show: true } },
  },
  {
    title: "Nested Widgets",
    text: "[[Bold & Colorful](strong:true)](colorful:rgba(255,100,100,0.5))",
    props: {},
  },
];

const App = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>SpecifyText Demo</h1>
      <p className={styles.subtitle}>
        Custom tagged-text parser with pluggable widget rendering.
      </p>

      {demoList.map((demo) => (
        <section key={demo.title} className={styles.section}>
          <h2 className={styles.sectionTitle}>{demo.title}</h2>

          <div className={styles.rawText}>
            <label className={styles.label}>Raw text:</label>
            <code className={styles.code}>{demo.text}</code>
          </div>

          <div className={styles.output}>
            <label className={styles.label}>Output:</label>
            <div className={styles.rendered}>
              <SpecifyText
                text={demo.text}
                widgetMap={widgetMap}
                {...demo.props}
              />
            </div>
          </div>
        </section>
      ))}
    </div>
  );
};

export default App;
