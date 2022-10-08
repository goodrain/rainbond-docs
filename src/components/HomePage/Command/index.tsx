/**
 * Copyright (c) Goodrain, Inc.
 *
 * This source code is licensed under the LGPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { animated, useTrail } from "react-spring";
import CodeBlock from '@theme/CodeBlock';
import { Tabs, TabPane } from '@douyinfe/semi-ui';

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
  
  const ScreenWidth = window.screen.width;
  const tabPosition = ScreenWidth < 1000 ? "top" : "left";

  return (
    <animated.div style={animatedTexts[0]}>
      <Tabs type="line" tabPosition={tabPosition}>
        <TabPane tab="Linux" itemKey="1">
          <h3>在 Linux 上快速安装体验 Rainbond</h3>
          <CodeBlock language="bash">
        {`docker run --privileged -d -p 7070:7070 -p 80:80 -p 443:443 -p 6060:6060 -p 8443:8443 \\
--name=rainbond-allinone --restart=on-failure \\
-v ~/.ssh:/root/.ssh \\
-v ~/rainbonddata:/app/data \\
-v /opt/rainbond:/opt/rainbond \\
-v ~/dockerdata:/var/lib/docker \\
-e EIP=<YOUR_IP> \\
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.8.1-dind-allinone`}
          </CodeBlock>
        </TabPane>
        <TabPane tab="Linux ARM" itemKey="2">
          <h3>在 Linux ARM 上快速安装体验 Rainbond</h3>
          <CodeBlock language="bash">
        {`docker run --privileged -d -p 7070:7070 -p 80:80 -p 443:443 -p 6060:6060 -p 8443:8443 \\
--name=rainbond-allinone --restart=on-failure \\
-v ~/.ssh:/root/.ssh \\
-v ~/rainbonddata:/app/data \\
-v /opt/rainbond:/opt/rainbond \\
-v ~/dockerdata:/var/lib/docker \\
-e EIP=<YOUR_IP> \\
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.8.1-arm64-dind-allinone`}
          </CodeBlock>
        </TabPane>
        <TabPane tab="Mac Intel" itemKey="3">
          <h3>在 Mac Intel 上快速安装体验 Rainbond</h3>
          <CodeBlock language="bash">
        {`docker run --privileged -d -p 7070:7070 -p 80:80 -p 443:443 -p 6060:6060 -p 8443:8443 \\
--name=rainbond-allinone --restart=on-failure \\
-v ~/.ssh:/root/.ssh \\
-v ~/opt/rainbond:/opt/rainbond \\
-v ~/rainbonddata:/app/data \\
-e EIP=<YOUR_IP> \\
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.8.1-dind-allinone`}
          </CodeBlock>
        </TabPane>
        <TabPane tab="Mac M1" itemKey="4">
          <h3>在 Mac M1 上快速安装体验 Rainbond</h3>
          <CodeBlock language="bash">
        {`docker run --privileged -d -p 7070:7070 -p 80:80 -p 443:443 -p 6060:6060 -p 8443:8443 \\
--name=rainbond-allinone --restart=on-failure \\
-v ~/.ssh:/root/.ssh \\
-v ~/opt/rainbond:/opt/rainbond \\
-v ~/rainbonddata:/app/data \\
-e EIP=<YOUR_IP> \\
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.8.1-arm64-dind-allinone`}
          </CodeBlock>
        </TabPane>
        <TabPane tab="Win" itemKey="5">
          <h3>在 Win 上快速安装体验 Rainbond</h3>
          <CodeBlock language="bash">
        {`docker run --privileged -d  -p 7070:7070 -p 80:80 -p 443:443 -p 6060:6060 -p 8443:8443 ^
--name=rainbond-allinone --restart=on-failure ^
-v ~/.ssh:/root/.ssh ^
-v ~/rainbonddata:/app/data ^
-v ~/opt/rainbond:/opt/rainbond ^
-e EIP=<YOUR_IP> ^
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.8.1-dind-allinone`}
          </CodeBlock>
        </TabPane>
      </Tabs>
    </animated.div>
  );
}