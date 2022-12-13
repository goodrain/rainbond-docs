/**
 * Copyright (c) Goodrain, Inc.
 *
 * This source code is licensed under the LGPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
**/

/**
 * Copyright (c) Goodrain, Inc.
 *
 * This source code is licensed under the LGPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

 import Link from "@docusaurus/Link";
 import Translate from "@docusaurus/Translate";
 import clsx from "clsx";
 import React from "react";
 import { animated, useTrail } from "react-spring";
 import styles from "./styles.module.css";
 import Layout from '@theme/Layout';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { FeatureContent, FeatureContentImage, FeatureHeader } from '../../../components/FeatureList';
import Head from "@docusaurus/Head";

 export default function HowRainbond() {
  const animatedTexts = useTrail(5, {
    from: { opacity: 0, transform: 'translateY(3em)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: {
      mass: 3,
      friction: 45,
      tension: 460,
    },
  })
  const FeatureHeaderTitle = {
    title: "云原生应用市场，实现企业应用自动化交付",
    description: "支持应用市场全流程管理（应用构建和拼装、应用发布应用市场、应用市场展示和管理、应用导出和导入、应用一键安装和升级），通过应用模版可以将任何类型的应用发布到应用市场，并实现复杂应用一键交付客户环境。"
  };

  const FeatureHeaderImage = {
    imageURL: "/img/homepage/feature/appstore.png",
  };
  
  const FeatureContentList = [
      {
        imageRight: "/img/homepage/feature/appstore/appstore1.png",
        titleRight: "支持企业应用各种交付模式",
        descListRight: [
          "对接各类客户环境，实现企业应用私有交付",
          "可拼装的业务模块，提高开发效率和客户交付速度",
          "支持离线环境导出和导入软件包，对于非容器环境，支持导出原生软件包，一个命令启动。"
        ],
        imageLeft: "/img/homepage/feature/appstore/appstore2.png",
        titleLeft: "应用系统一键发布应用市场",
        descListLeft: [
          "通过所见即所得的体验，不需要写代码和Yaml，一键将应用运行相关的所有要素发布到应用市场，并支持定义版本",
        ],
      },
      {
        imageRight: "/img/homepage/feature/appstore/appstore3.png",
        titleRight: "80款应用开源应用一键安装",
        descListRight: [
          "内置 80+ 开源应用",
          "支持一键从应用市场安装开源应用",
        ],
        imageLeft: "/img/homepage/feature/appstore/appstore4.png",
        titleLeft: "新版本按需升级和回滚",
        descListLeft: [
          "支持应用版本管理，应用版本回滚",
        ],
      },
      {
        imageRight: "/img/homepage/feature/appstore/appstore5.png",
        titleRight: "实现企业内部能力积累的复用",
        descListRight: [
          "面向内部研发场景，主要积累技术模版，模版颗粒度相对较小，为了提高开发效率。",
          "面向客户交付场景，主要积累业务模版，模版颗粒度较大，通过模版可以快速拼装客户解决方案，提高交付效率。",
          "面向销售场景，主要积累可以销售的产品模版，颗粒度最大，能帮助销售快速演示、使用和整体交付。",
        ],
        imageLeft: "",
        titleLeft: "",
        descListLeft: [
          "",
        ],
      },
   ];

  return (
    <Layout title={FeatureHeaderTitle.title} description={FeatureHeaderTitle.description}>
      <Head>
        <meta name={FeatureHeaderTitle.title} content={FeatureHeaderTitle.description} />
      </Head>
      <animated.div style={animatedTexts[1]}>
      <FeatureHeader props={{...FeatureHeaderTitle}} />
      <FeatureContentImage props={{FeatureHeaderImage}}/>
      <FeatureContent props={{FeatureContentList}}/>
      </animated.div>
    </Layout>
  );
 }