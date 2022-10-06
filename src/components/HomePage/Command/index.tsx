/**
 * Copyright (c) Goodrain, Inc.
 *
 * This source code is licensed under the LGPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { animated, useTrail } from "react-spring";
import CodeBlock from '@theme/CodeBlock';
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


  return (
    <animated.div style={animatedTexts[0]}>
      <CodeBlock language="bash" title="快速体验 Rainbond">
        {`docker run --privileged -d -p 7070:7070 -p 80:80 -p 443:443 -p 6060:6060 -p 8443:8443 \\
-v ~/rainbonddata:/app/data \\
-v /opt/rainbond:/opt/rainbond \\
-v ~/dockerdata:/var/lib/docker \\
-e EIP=<YOUR_IP> \\
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.8.1-dind-allinone`}
      </CodeBlock>
    </animated.div>
  );
}