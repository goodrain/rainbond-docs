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
import IconSlack from '/img/homepage/svg/slack.svg';
import { Tabs, TabPane, Typography } from '@douyinfe/semi-ui';
import CTypist from '../../CTypist';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Link from "@docusaurus/Link";
import CodeBlock from '@theme/CodeBlock';
import { calcLength } from "framer-motion";

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

  const handleOnClickLink = () => {
    window.open('https://join.slack.com/t/rainbond-slack/shared_invite/zt-1ft4g75pg-KJ0h_IAtvG9DMgeE_BNjZQ')
  }

  const xinchuang = <Translate id='primary.install.xc.title'>信创</Translate>

  return (
    <div className="row">
      <div className={clsx("col col--5", styles.rainbond)}>
        <animated.div style={animatedTexts[0]}>
          <h2 className={styles.rainbond_title_top}>
            <Translate id='primary.titleOne'>不用懂 Kubernetes 的</Translate>
          </h2>
          <h2 className={clsx({
            [styles.rainbond_title]: ! LocalUrlEn,
            [styles.rainbond_title_en]: LocalUrlEn,
          })}>
            <Translate id='primary.titleTwo'>云原生应用管理平台</Translate>
          </h2>
        </animated.div>
        <animated.div style={animatedTexts[0]} className={styles.rainbond_description}>
          <Translate id='primary.description'>
            Rainbond 核心100%开源，Serverless体验，不需要懂K8s也能轻松管理容器化应用，平滑无缝过渡到K8s，是国内首个支持国产化信创、适合私有部署的一体化应用管理平台。
          </Translate>
        </animated.div>
        <animated.div style={animatedTexts[1]} className={styles.btnBox}>
          {/* <Link to="/docs/quick-start/quick-install">
            <Button icon={<Iconlinux />} theme="solid" className={styles.buttonLeft} size='large'>
              <Translate id='primary.install-dind'>快速入门</Translate>
            </Button>
          </Link> */}
          {!LocalUrlEn ? (
             <OverlayTrigger placement="bottom" 
             overlay={
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
          ) : (
              <Button icon={<IconSlack />} onClick={handleOnClickLink} theme="solid" className={styles.buttonRightEn} size='large'>
                <Translate id='primary.join-user'>加入用户群</Translate>
              </Button>
          )}
        </animated.div>
      </div>
      <animated.div style={animatedTexts[1]} className="col col--7">
        <div className="row" style={{ borderBottom: '1px solid #f0f1f5'}}>
          <div className="col col--3">
            <span className={styles.install_number_one}>01</span>
            <span className={styles.install_title_one}>
              <Translate id='primary.install.linux.title'>5分钟安装</Translate>
            </span>
          </div>
          <div className="col col--9">
            <Tabs type="card">
              <TabPane tab="Linux" itemKey="1">
                <p style={{ marginTop: "10px" }}>
                  <Translate id='primary.install.linux.desc'>请在终端中执行以下命令:</Translate>
                </p>
                <CodeBlock language="bash" className={styles.code}>
                  <Translate id='primary.install.linux.cmd'>{`curl -o install.sh https://get.rainbond.com && bash ./install.sh`}</Translate>
                </CodeBlock>
              </TabPane>
              <TabPane tab="Mac" itemKey="2">
                <p style={{ marginTop: "10px" }}>
                  <Translate id='primary.install.mac.desc.one'>请安装</Translate>
                  <a href="https://docs.docker.com/desktop/install/mac-install/" target="_black"> Docker Desktop for Mac</a>
                  <Translate id='primary.install.mac.desc.two'>，随后在终端中执行以下命令:</Translate>
                </p>
                <CodeBlock language="bash" className={styles.code}>
                  <Translate id='primary.install.mac.cmd'>{`curl -o install.sh https://get.rainbond.com && bash ./install.sh`}</Translate>
                </CodeBlock>
              </TabPane>
              <TabPane tab="Windows" itemKey="3">
                <p style={{ marginTop: "10px" }}>
                  <Translate id='primary.install.win.desc.one'>请安装</Translate>
                  <a href="https://docs.docker.com/desktop/install/windows-install/" target="_black"> Docker Desktop for Windows</a>
                  <Translate id='primary.install.win.desc.two'>，随后在 PowerShell 中执行以下命令:</Translate>
                </p>
                <CodeBlock language="bash" className={styles.code}>
                  {!LocalUrlEn ? (
                    <Translate id='primary.install.win.cmd'>
                      Invoke-WebRequest "https://get.rainbond.com/install-rainbond.ps1" -o install-rainbond.ps1 ; .\install-rainbond.ps1
                    </Translate>
                  ) : (
                    <Translate id='primary.install.win.cmd'>
                      Invoke-WebRequest "https://get.rainbond.com/install-rainbond.ps1" -o install-rainbond.ps1 ; .\install-rainbond.ps1 -IMAGE_MIRROR rainbond
                    </Translate>
                  )}
                </CodeBlock>
              </TabPane>
              {!LocalUrlEn &&
                <TabPane tab={xinchuang} itemKey="4">
                <p style={{ marginTop: "10px" }}>
                  <Translate id='primary.install.xc.desc.one'>请在终端中执行以下命令:</Translate>
                </p>
                <CodeBlock language="bash" className={styles.code}>
                  {`curl -o install.sh https://get.rainbond.com && bash ./install.sh`}
                </CodeBlock>
                <Link to="/xinchuang" style={{ float: "right" }}>
                  <Translate id='primary.install.xc.desc.two'>了解更多 </Translate>
                </Link>
              </TabPane>
              }
            </Tabs>
          </div>
        </div>
        <div className="row" style={{ marginTop: '50px'}}>
          <div className="col col--3">
            <span className={styles.install_number_two}>02</span>
            <span className={!LocalUrlEn ? styles.install_title_two : styles.install_title_two_en}>
              <Translate id='primary.start.title'>30分钟上手</Translate>
            </span>
          </div>
          <div className="col col--9">
            <p>
              <Translate id='primary.start.desc.one'>之后，打开浏览器，输入 http://您的IP:7070，您可以访问 Rainbond 的 UI 了。跟随 </Translate>
              <Link href="/docs/quick-start/getting-started">
                <Translate id='primary.start.desc.two'>快速入门</Translate>
              </Link> 
              <Translate id='primary.start.desc.there'>部署您的第一个应用。</Translate>
            </p>
          </div>
        </div>
      </animated.div>
    </div>
  );
}