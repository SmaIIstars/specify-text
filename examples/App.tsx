import React from "react";
import cls from "classnames";

import SpecifyText from "./components/specify-text";
import SpecifyTextDist from "./components/specify-text-dist";
import SpecifyTextNpm from "./components/specify-text-npm";

import configs from "./config";

import styles from "./index.module.scss";

const App = () => {
  return (
    <div className={styles.appWrapper} style={{}}>
      {configs.map((cfg, idx) => {
        const { title, text, configs, buildIn } = cfg;
        const [devConfig, distConfig, npmConfig] = configs;

        return (
          <React.Fragment key={title}>
            <div
              className={cls({
                [styles.appPackagesTitle]: true,
                [styles.appPackages]: true,
                [styles.appPackagesTitleBuildIn]: buildIn,
              })}
            >
              {title}
            </div>

            <div
              className={cls({
                [styles.appPackages]: true,
                [styles.appPackagesText]: true,
                [styles.appPackagesTextCenter]: idx,
              })}
            >
              {JSON.stringify(text).slice(1, -1)}
            </div>

            <div className={cls(styles.appPackages, styles.appPackagesDev)}>
              {devConfig && <SpecifyText {...devConfig} />}
            </div>

            <div className={cls(styles.appPackages, styles.appPackagesDist)}>
              {distConfig && <SpecifyTextDist {...distConfig} />}
            </div>

            <div className={cls(styles.appPackages, styles.appPackagesNpm)}>
              {npmConfig && <SpecifyTextNpm {...npmConfig} />}
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default App;
