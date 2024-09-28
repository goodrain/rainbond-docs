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
import Carousel from '../Carousel';
export default function Scene() {

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
        <h2>场景与解决方案</h2>
        <p>Rainstore 针对企业不同场景，提供多元化的解决方案</p>
      </animated.div>
      <animated.div style={animatedTexts[1]} className={styles.card_scene}>
        <div className={styles.scent_content}>
          <div className={styles.scene_title}>构建行业应用生态</div>
          <div className={styles.scene_desc}>
            Rainstore
            通过开放的行业应用市场，聚合上游应用和资源，建立开发者生态，简化应用的发布过程，帮助企业快速接入并整合所需工具，实现能力复用共享，显著降低交付成本
          </div>
        </div>
        <div className={styles.scent_content}>
          <div className={styles.scene_title}>软件资产化管理</div>
          <div className={styles.scene_desc}>
            Rainstore 建立企业级应用商店，简化企业软件的管理和运维，减少对供应商的依赖，实现内部应用的标准化管理，确保软件的可追溯性，最大化软件价值，任何人都能轻松安装和使用
          </div>
        </div>
        <div className={styles.scent_content}>
          <div className={styles.scene_title}>企业软件资源积累和复用</div>
          <div className={styles.scene_desc}>
            针对企业下每个子公司需要重复建设内容的问题，Rainstore 将企业软件模块化，通过灵活拼装模块实现个性化交付。采购一次后，其他公司可直接使用，避免重复建设和购买，降低成本，提升交付效率并扩大规模
          </div>
        </div>
        <div className={styles.scent_content}>
          <div className={styles.scene_title}>应用自动化分发</div>
          <div className={styles.scene_desc}>
            Rainstore 构建全局应用市场，实现应用的自动化分发。支持多地点的离线交付，确保应用能够快速、便捷地分发至各个业务单元，提升整体运营效率
          </div>
        </div>
      </animated.div>
    </div>
  );
}