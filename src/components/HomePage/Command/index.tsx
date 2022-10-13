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
      <div className="card">
        <div className="card__header" style={{ textAlign: 'center' }}>
          <h3>快速安装</h3>
        </div>
        <div className="card__body">
          <CodeBlock language="bash">
            {`curl -o install.sh https://get.rainbond.com && bash ./install.sh`}
          </CodeBlock>
        </div>
      </div>
    </animated.div>
  );
}