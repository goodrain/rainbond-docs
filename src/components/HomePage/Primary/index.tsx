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
import IconCloud from '/img/homepage/svg/cloud.svg';
import { Tabs, TabPane, Typography } from '@douyinfe/semi-ui';
import CTypist from '../../CTypist';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Link from "@docusaurus/Link";
import CodeBlock from '@theme/CodeBlock';
import { calcLength } from "framer-motion";

export default function Primary() {
  const [billingType, setBillingType] = useState('monthly');

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
  const handleOnClickLinkRainbondCloud = () => {
    window.open('https://run.rainbond.com')
  }
  const xinchuang = <Translate id='primary.install.xc.title'>信创</Translate>

  return (
    <div className="row">
      <div className={clsx("col col--12", styles.pricing)}>
        <animated.div style={animatedTexts[0]} className={styles.pricing_header}>
          <h2 className={styles.rainbond_title_top}>
            <Translate id='primary.titleOne'>无需学习Kubernetes</Translate>
          </h2>
          <h1 className={styles.pricing_title}>
            <Translate id='primary.titleTwo'>像管理手机APP一样管理企业应用</Translate>
          </h1>
          <p className={styles.pricing_description}>
            <Translate id='primary.description'>
            Rainbond 是一个云原生应用管理平台，100%兼容 Kubernetes API，100%开源，Serverless体验，不需要懂 Kubernetes 也能轻松管理容器化应用，支持国产化信创、适合私有部署的一体化应用管理平台。
            </Translate>
          </p>
        </animated.div>
        <animated.div style={animatedTexts[1]} className={styles.btnBox}>
            <Button icon={<IconCloud />} onClick={handleOnClickLinkRainbondCloud} theme="solid" className={styles.buttonLeft} size='large'>
              在线体验
            </Button>
            <Link to="/docs/quick-start/quick-install">
              <Button icon={<Iconlinux />} theme="solid" className={styles.buttonRight} size='large'>
                <Translate id='primary.install-dind'>开始安装</Translate>
              </Button>
            </Link>
          {/* {!LocalUrlEn ? (
             <OverlayTrigger placement="bottom" 
             overlay={
               <div className="card shadow--tl">
                 <div className="card__body">
                   <img width="200px" height="200px" src="/wechat/wechat.png" />
                 </div>
               </div>
               }>
               <Button theme="solid" className={styles.buttonRight} size='large'>
                 <Translate id='primary.join-user'>加入用户群</Translate>
               </Button>
             </OverlayTrigger>
          ) : (
              <Button onClick={handleOnClickLink} theme="solid" className={styles.buttonRightEn} size='large'>
                <Translate id='primary.join-user'>加入用户群</Translate>
              </Button>
          )} */}
        </animated.div>
      </div>
      {/* <div className={clsx("col col--5", styles.rainbond)}>
        <animated.div style={animatedTexts[0]}>
          <h2 className={styles.rainbond_title_top}>
            <Translate id='primary.titleOne'>无需学习Kubernetes</Translate>
          </h2>
          <h2 className={clsx({
            [styles.rainbond_title]: ! LocalUrlEn,
            [styles.rainbond_title_en]: LocalUrlEn,
          })}>
            <Translate id='primary.titleTwo'></Translate>
          </h2>
        </animated.div>
        <animated.div style={animatedTexts[0]} className={styles.rainbond_description}>
          <Translate id='primary.description'>
         
          </Translate>
        </animated.div>
        
      </div> */}
      <animated.div style={animatedTexts[1]} className="col col--7">
          
      </animated.div>
    </div>
  );
}