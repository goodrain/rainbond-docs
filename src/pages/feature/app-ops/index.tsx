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
    title: "通过应用模型抽象，简化应用运维",
    description: "通过应用模型抽象，让开发人员可以更多的关心业务本身，而不是底层复杂工具的使用问题。最终的效果是降低操作成本和理解难度，让Kubernetes更加容易落地。"
  };

  const FeatureHeaderImage = {
    imageURL: "/img/homepage/feature/appmodel.png",
  };
  
  const FeatureContentList = [
      {
        imageRight: "/img/homepage/feature/appops/appops1.png",
        titleRight: "开发人员可以掌控的应用运维",
        descListRight: [
          "应用级属性和动作，开发人员容易理解和使用",
          "支持多人协作，并记录所有操作记录",
        ],
        imageLeft: "/img/homepage/feature/appops/appops2.png",
        titleLeft: "功能强大的内置应用网关",
        descListLeft: [
          "支持基于域名、访问路径、请求头、Cookie的访问路由控制",
          "支持Https证书管理和自动签发证书",
          "支持灰度发布和AB测试",
        ],
      },
      {
        imageRight: "/img/homepage/feature/appops/appops3.png",
        titleRight: "业务自动伸缩",
        descListRight: [
          "支持手动伸缩和基于规则的自动伸缩",
        ],
        imageLeft: "/img/homepage/feature/appops/appops4.png",
        titleLeft: "在线Web终端，方便业务调试",
        descListLeft: [
          "支持 Web 页面的 Shell 终端",
        ],
      },
      {
        imageRight: "/img/homepage/feature/appops/appops5.png",
        titleRight: "Web方式日志管理",
        descListRight: [
          "支持通过Web查看日志，支持日志搜索",
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
      <Background />
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