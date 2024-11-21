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
import Link from "@docusaurus/Link";
import IconLink from '/img/rainstore/svg/link.svg';
import Iconconsult from '/img/rainstore/svg/consult.svg';

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
    <div className={styles.rainstore}>
      <animated.div style={animatedTexts[0]}>
        <h1 className={styles.rainstore_title}>云原生应用市场</h1>
      </animated.div>
      <animated.div style={animatedTexts[0]} className={styles.rainstore_description}>
        <span style={{fontWeight: '600'}}>Rainstore </span> 帮助构建行业应用生态，集成行业能力，连接应用开发者与使用者，提供灵活交付形式，助力企业实现数字化转型与高效管理，打造行业IT领域的“App Store”！
      </animated.div>
      <animated.div style={animatedTexts[0]} className={styles.rainstore_btn}>
        <a
          className={styles.link}
          href='https://rainbond.feishu.cn/share/base/shrcnv2iqnRsNJM6Y3hN5VhTJvg'
          target='_blank'
        >
          <Button icon={<Iconconsult />} theme="solid" className={styles.buttonLeft} size='large'>
            <Translate id=''>商业咨询</Translate>
          </Button>
        </a>
        <a
          className={styles.link}
          href='https://hub.grapps.cn/'
          target='_blank'
        >
          <Button icon={<IconLink />} theme="solid" className={styles.buttonRight} size='large'>
            <Translate id=''>访问开源应用市场</Translate>
          </Button>
        </a>
      </animated.div>
    </div>
  );
}