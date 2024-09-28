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
export default function Feature() {

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
  const images = [
    { src: "/img/rainstore/img/banner1.jpg", description: "展示所有已上架的应用，支持按分类、标签等进行筛选与搜索，方便用户快速找到所需应用" },
    { src: "/img/rainstore/img/banner2.jpg", description: "展示应用的详细信息，包括功能描述、版本记录、用户评价、作者信息、评论等，帮助用户全面了解应用内容" },
    { src: "/img/rainstore/img/banner6.jpg", description: "提供应用使用情况的可视化统计，包括订单信息、月流水、应用访问量、应用信息等，帮助管理员全面分析数据" },
    { src: "/img/rainstore/img/banner3.jpg", description: "管理员对已发布应用进行管理，应用的上下架管理、应用整体分类管理" },
    { src: "/img/rainstore/img/banner4.jpg", description: "应用发布者对应用进行信息编辑，例如：应用名称、分类、标签、logo、简介以及富文本编辑应用介绍" },
    { src: "/img/rainstore/img/banner9.jpg", description: "应用支持上传RAM、Docker、Helm、其他软件包四种类型，记录并管理每种类型应用的各个版本" },
    { src: "/img/rainstore/img/banner5.jpg", description: "为应用提供不同功能套餐，用户可以根据需求选择合适的版本或功能组合，灵活满足多样化需求" },
    { src: "/img/rainstore/img/banner7.jpg", description: "提供订单追踪与管理功能，帮助开发者查看应用购买情况，处理订单相关的售后问题" },
    { src: "/img/rainstore/img/banner8.jpg", description: "支持多种交付模式，如后台直接交付、离线包交付、SaaS交付等，确保应用能够灵活交付至不同用户环境" },
    

  ];

  return (
    <div className={styles.card}>
      <animated.div style={animatedTexts[0]} className={styles.card_body}>
          <h2>你想要的功能，都在这里</h2>
          <p>Rainstore 实现应用全流程管理，包括应用上架、套餐管理、数据统计、分类管理和角色管理，帮助企业高效配置和管理应用。</p>
      </animated.div>
      <animated.div style={animatedTexts[1]} className={styles.card_carousel}>
        <Carousel images={images} interval={5000} />
      </animated.div>
    </div>
  );
}