/**
 * Copyright (c) Goodrain, Inc.
 *
 * This source code is licensed under the LGPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useEffect, useState } from "react";
import { animated, useTrail } from "react-spring";
import styles from "./styles.module.css";
import clsx from 'clsx';
import { useLocation } from '@docusaurus/router';
import Translate from "@docusaurus/Translate";
import { Button } from '@douyinfe/semi-ui';
import Iconlinux from '/img/homepage/svg/linux.svg';
import Iconwechat from '/img/homepage/svg/wechat-white.svg';
import { Tabs, TabPane, Typography } from '@douyinfe/semi-ui';
import CTypist from '../../CTypist';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Link from "@docusaurus/Link";
import CodeBlock from '@theme/CodeBlock';

export default function Primary() {
  
  const LocalUrlEn = useLocation().pathname.includes('/en');

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
    <div className="row">
      <div className={clsx("col col--5", styles.rainbond)}>
        <animated.div style={animatedTexts[0]}>
          <h2 className={styles.rainbond_title_top}>
            <Translate id='primary.title'>不用懂 Kubernetes 的</Translate>
          </h2>
          <h2 className={clsx({
            [styles.rainbond_title]: ! LocalUrlEn,
            [styles.rainbond_title_en]: LocalUrlEn,
          })}>
            <Translate id='primary.title'>云原生应用管理平台</Translate>
          </h2>
        </animated.div>
        <animated.div style={animatedTexts[0]} className={styles.rainbond_description}>
          <Translate id='primary.description'>
            Rainbond 核心100%开源，Serverless体验，支持对接和管理多种 Kubernetes 集群，适合私有部署的一体化应用管理平台。
          </Translate>
        </animated.div>
        <animated.div style={animatedTexts[1]} className={styles.btnBox}>
          {/* <Link to="/docs/quick-start/quick-install">
            <Button icon={<Iconlinux />} theme="solid" className={styles.buttonLeft} size='large'>
              <Translate id='primary.install-dind'>快速入门</Translate>
            </Button>
          </Link> */}
          <OverlayTrigger placement="bottom" overlay={
            <div className="card shadow--tl">
              <div className="card__body">
                <img width="200px" height="200px" src="/wechat/wechat.png" />
              </div>
            </div>
            }>
            <Button icon={<Iconwechat />} theme="solid" className={styles.buttonRight} size='large'>
              <Translate id='primary.join-user'>加入用户群</Translate>
            </Button>
          </OverlayTrigger>
        </animated.div>
      </div>
      <animated.div style={animatedTexts[1]} className="col col--7">
        <div className="row" style={{ borderBottom: '1px solid #f0f1f5'}}>
          <div className="col col--3">
            <span className={styles.install_number_one}>01</span>
            <span className={styles.install_title_one}>5分钟安装</span>
          </div>
          <div className="col col--9">
            <Tabs type="card">
              <TabPane tab="Linux & Mac" itemKey="1">
                <CodeBlock language="bash" className={styles.code}>
                  {`curl -o install.sh https://get.rainbond.com && bash ./install.sh`}
                </CodeBlock>
              </TabPane>
              <TabPane tab="Windows" itemKey="2">
                <CodeBlock language="bash" className={styles.code}>
                  {`docker run --privileged -d --name=rainbond-allinone --restart=on-failure ^
                  -p 7070:7070 -p 80:80 -p 443:443 -p 6060:6060 ^
                  -p 10000-10010:10000-10010 ^
                  -v rainbond-data:/app/data ^
                  -v rainbond-opt:/opt/rainbond ^
                  -e EIP=<你的IP地址> ^
                  registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.14.1-dind-allinone`}
                </CodeBlock>
              </TabPane>
              <TabPane tab="信创" itemKey="3">
                <CodeBlock language="bash" className={styles.code}>
                  {`curl -o install.sh https://get.rainbond.com && bash ./install.sh`}
                </CodeBlock>
                <Link to="/xinchuang" style={{ float: "right" }}>了解更多 ></Link>
              </TabPane>
            </Tabs>
          </div>
        </div>
        <div className="row" style={{ marginTop: '50px'}}>
          <div className="col col--3">
            <span className={styles.install_number_two}>02</span>
            <span className={styles.install_title_two}>30分钟上手</span>
          </div>
          <div className="col col--9">
            <p>之后，打开浏览器，输入 http://您的IP:7070，您可以访问 Rainbond 的 UI 了。跟随 <Link href="/docs/quick-start/getting-started">快速入门</Link> 部署您的第一个应用。</p>
          </div>
        </div>
      </animated.div>
    </div>
  );
}