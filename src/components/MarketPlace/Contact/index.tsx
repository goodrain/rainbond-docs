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
import { Button } from '@douyinfe/semi-ui';
import Translate from "@docusaurus/Translate";
import IconApp from '/img/rainstore/svg/app.svg';
import Iconapply from '/img/rainstore/svg/apply.svg';
import Iconconsult from '/img/rainstore/svg/consult.svg';
import Carousel from '../Carousel';
export default function Contact() {

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
    <div className={styles.card}>
      <animated.div style={animatedTexts[0]} className={styles.card_body}>
          <h2>联系我们</h2>
          <p>如需了解更多信息或获取支持，欢迎随时与我们联系，我们将竭诚为您服务。</p>
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
      </animated.div>
    </div>
  );
}