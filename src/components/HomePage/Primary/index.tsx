/**
 * Copyright (c) Goodrain, Inc.
 *
 * This source code is licensed under the LGPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from "react";
import { animated, useTrail } from "react-spring";
import styles from "./styles.module.css";
import clsx from 'clsx';
import { useLocation } from '@docusaurus/router';
import Translate from "@docusaurus/Translate";
import { Button } from '@douyinfe/semi-ui';
import Iconlinux from '/img/homepage/svg/linux.svg';
import Iconk8s from '/img/homepage/svg/k8s.svg';
import { Typography } from '@douyinfe/semi-ui';

export default function Primary() {
  const { Text } = Typography;
  const [mask_config, setMask_config] = useState(false);
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
      <div className={clsx("col col--6", styles.rainbond)}>
        <animated.h2
          className={clsx({
            [styles.rainbond_title]: ! LocalUrlEn,
            [styles.rainbond_title_en]: LocalUrlEn,
          })}
          style={animatedTexts[0]}
        >
          <Translate id='primary.title'>云原生多云应用管理平台</Translate>
        </animated.h2>
        <animated.div style={animatedTexts[0]} className={styles.rainbond_description}>
          <Translate id='primary.description'>
            Rainbond 核心100%开源，使用简单，不需要懂容器和Kubernetes，支持管理多种Kubernetes集群，提供企业级应用的全生命周期管理。
          </Translate>
        </animated.div>
        <animated.div style={animatedTexts[1]} className={styles.btnBox}>
          <Text link={{ href: '/docs/installation/install-with-dind' }}>
            <Button icon={<Iconlinux />} theme="solid" className={styles.buttonLeft} size='large'>
              <Translate id='primary.install-dind'>在单机安装</Translate>
            </Button>
          </Text>
          <Text link={{ href: '/docs/installation/install-with-helm/' }}>
            <Button icon={<Iconk8s />} theme="solid" className={styles.buttonRight} size='large'>
              <Translate id='primary.install-helm'>在 Kubernetes 安装</Translate>
            </Button>
          </Text>
        </animated.div>
      </div>
      <div className="col col--6">
          <animated.div style={animatedTexts[1]}>
            <div
              className="mask_video"
              onClick={() => {
                setMask_config(true);
              }}
            >
              <img src='/img/video/video-rainbond.png'/>
            </div>
          </animated.div>
      </div>
      {mask_config && (
        <div
          className={styles.mask_div}
          onClick={() => {
            setMask_config(false);
          }}
        >
          <div className={styles.bili_video}>
            <video
              onClick={e => {
                e.stopPropagation();
              }}
              style={{ width: '100%' }}
              src='https://static.goodrain.com/mp4/HomePageVideo/%E9%A6%96%E9%A1%B5%E8%A7%86%E9%A2%91.mp4'
              controls={true}
              autoPlay
            ></video>
          </div>
        </div>
      )}
    </div>
  );
}