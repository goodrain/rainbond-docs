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
import CustomerCase from '../ClientCaseStudy';
export default function Case() {

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
  const cases = [
    {
      logo: '/img/rainstore/img/yanxiang.jpeg',
      title: '研祥',
      solgan: '支持上万人即点即用的SaaS应用体验',
      content: '支持单体应用和微服务应用的快速上云部署，应用整体打包，实现不同用户间的快速分享与复刻。',
    },
    {
      logo: '/img/rainstore/img/boe.png',
      title: '京东方',
      solgan: '提升5倍的离线交付效率',
      content: '服务内部产品研发流程，支撑架构、开发、测试环节，通过多云模式集成外部应用供应商或外包厂商，实现内外产品集成，并支持大型项目集成方案分钟级交付，显著节省交付时间。',
    },
    {
      logo: '/img/rainstore/img/mk.jpeg',
      title: '煤炭科工',
      solgan: '打造煤炭工业互联网应用开发和交付生态',
      content: '积累并复用技术组件、业务组件、工业算法和运维能力，通过 拖拉拽 快速编排形成行业解决方案，基于云原生应用研发框架实现统一认证与授权，一键交付并支持远程个性化定制与运维。',
    },
    {
      logo: '/img/rainstore/svg/jundui.svg',
      title: '军队',
      solgan: '实现复杂应用的多级分发',
      content: '落地云原生应用交付规范和供应商准入机制，实现离线环境下的高效应用交付与分发，并通过自动化运维保障应用的故障自愈与高可用性。',
    },
  ];


  return (
    <div className={styles.card}>
      <animated.div style={animatedTexts[0]} className={styles.card_body}>
          <h2>客户案例</h2>
      </animated.div>
      <animated.div style={animatedTexts[1]} className={styles.card_case}>
          <CustomerCase cases={cases} />
      </animated.div>
    </div>
  );
}