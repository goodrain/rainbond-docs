/**
 * Copyright (c) Goodrain, Inc.
 *
 * This source code is licensed under the LGPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from "react";
import { animated, useTrail } from "react-spring";
import CodeBlock from '@theme/CodeBlock';
import { Tabs, TabPane } from '@douyinfe/semi-ui';
import {useWindowSize} from '@docusaurus/theme-common';
import styles from "./styles.module.css";
import clsx from "clsx";
import Translate from "@docusaurus/Translate";

export default function Command() {

  const animatedTexts = useTrail(5, {
    from: { opacity: 0, transform: 'translateY(3em)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: {
      mass: 3,
      friction: 45,
      tension: 460,
    },
  })
  const windowSize = useWindowSize();
  const tabPosition = windowSize === 'mobile' ? "top" : "left";
  
  return (
    <animated.div style={animatedTexts[0]}>
      <div className={clsx("card", styles.card)}>
        <div className="card__header" style={{ textAlign: 'center' }}>
          <h3><Translate id="command.title">Linux & Mac 快速安装</Translate></h3>
        </div>
        <div className={clsx("card__body", styles.card_body)}>
          <CodeBlock language="bash">
            {`curl -o install.sh https://get.rainbond.com && bash ./install.sh`}
          </CodeBlock>
        </div>
      </div>
    </animated.div>
  );
}