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
import { FeatureContent, FeatureContentImage, FeatureHeader, CustomButton} from '../../components/FeatureList';
import Head from "@docusaurus/Head";
import Background from "@src/components/Background";

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
    title: "零基础完成“信创”场景云应用迁移",
    description: "专门针对国产化信创场景推出的Rainbond “信创”版本，全面降低应用系统向信创环境中迁移的技术成本，助力信创应用零成本迁移上云。Rainbond 长期深耕国产化IT生态，与多家国产CPU架构完成兼容性认证，能够在不同的架构下快速部署运行。信创应用、遗留业务系统可以提供源代码、软件包、容器镜像等方式零成本完成向国产化信创环境迁移上云。同时，Rainbond 借助强大的多云管理能力，使得用户可以通过统一的控制台管理多个异构集群、“一云多芯”集群，充分利用不同云平台的资源，完成跨云调度、异构应用混合编排等高难度动作。信创版本还进一步拓展了云原生应用商店的功能。信创应用可以被轻松地发布成为适用于不同架构的应用模板，在国产化信创环境中一键安装。开源应用商店也提供不同架构下可用的上百款开源软件，极大降低了面向国产化信创环境的软件交付成本。",
    customButton: "true",
    LeftURL: "/docs/quick-start/quick-install",
    LeftButton: "快速安装",
    RightURL: "/docs/how-to-guides/localization-guide/intro",
    RightButton: "了解更多",
  };

  const FeatureHeaderImage = {
    imageURL: "/img/homepage/xinchuang/micro-service.png",
  };

  const FeatureContentList = [
      {
        imageRight: "/img/homepage/xinchuang/cert.png",
        titleRight: "符合信创要求的一体化应用管理平台",
        descListRight: [
          "“信创”版本兼容主流国产化CPU，全面支持信创场景",
          "获得了国内各大 CPU 厂商的认证",
          "一体化管理信创应用的开发、运维、交付全流程，极大降低国产化信创场景下的应用管理成本",
        ],
        imageLeft: "/img/homepage/xinchuang/micro-service-topology.png",
        titleLeft: "传统应用快速迁移到信创环境",
        descListLeft: [
          "屏蔽架构差异，以最低成本将应用迁移到国产化信创环境之中",
          "仅需要提供源代码，即可在指定架构环境中编译运行",
          "开源应用商店提供不同架构的应用模板，上百种开源软件一键部署",
          "多架构应用混合部署，异构微服务组件图形化编排。助力各类传统应用快速迁移到信创环境"
        ],
      },
      {
        imageRight: "/img/homepage/xinchuang/cluster.png",
        titleRight: "一云多芯，统一管理统一调度",
        descListRight: [
          "基于图形化界面快速安装部署，自动识别服务器架构，“一云多芯”异构集群一键化部署",
          "统一管理各种类型集群，不同类型业务统一调度管理",
        ],
        imageLeft: "",
        titleLeft: "",
        descListLeft: [
          "",
          "",
          "",
        ],
      },
   ];

  return (
    <Layout title={FeatureHeaderTitle.title} description={FeatureHeaderTitle.description}>
      <Head>
        <meta name={FeatureHeaderTitle.title} content={FeatureHeaderTitle.description} />
      </Head>
      <Background />
      <animated.div style={animatedTexts[1]}>
      <FeatureHeader props={{...FeatureHeaderTitle}} />
      <FeatureContentImage props={{FeatureHeaderImage}}/>
      <FeatureContent props={{FeatureContentList}}/>
      </animated.div>
    </Layout>
  );
 }