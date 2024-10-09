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
export default function AppType() {

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
    window.open('https://rainbond.feishu.cn/share/base/shrcnv2iqnRsNJM6Y3hN5VhTJvg')
  }

  return (
    <div className={styles.card}>
      <animated.div style={animatedTexts[0]} className={styles.card_body}>
        <div className={styles.apptype_img}>
          <img src="/img/rainstore/svg/apptype.svg" alt="" />
        </div>
        <div className={styles.apptype_text}>
          <h2>支持常见应用包</h2>
          <p>支持四种类型的软件包，包括 Docker 镜像、Helm Chart、Rainbond App Model (RAM) 和其他软件包等，满足不同行业和业务的需求。</p>
        </div>
      </animated.div>
      <animated.div style={animatedTexts[0]} className={styles.card_body}>
        <div className={styles.apptype_text}>
          <h2>多样化应用交付形式</h2>
          <p>通过一键安装、离线包导出、私有化部署和后台一键交付等多种方式，灵活满足企业的多样化应用交付需求。</p>
        </div>
        <div className={styles.apptype_img}>
          <img src="/img/rainstore/svg/delivery.svg" alt="" />
        </div>
      </animated.div>
    </div>
  );
}