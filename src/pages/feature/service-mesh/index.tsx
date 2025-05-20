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
    title: "开箱即用的微服务治理，拖拉拽式的微服务编排",
    description: "传统应用部署到Rainbond，开启应用级插件就可以支持Service Mesh，并可按需更换Service Mesh框架，通过组件级的插件扩展日志管理、性能分析、监控等服务治理工具，并支持Spring Cloud 、Dubbo等常见微服务框架"
  };

  const FeatureHeaderImage = {
    imageURL: "/img/homepage/feature/servicemesh.png",
  };
  
  const FeatureContentList = [
      {
        imageRight: "/img/homepage/feature/servicemesh/servicemesh1.png",
        titleRight: "图形化的微服务编排和服务拓扑",
        descListRight: [
          "交互式的拓扑图操作，了解微服务的运行情况和依赖关系",
          "通过拼积木的方式实现微服务编排"
        ],
        imageLeft: "/img/homepage/feature/servicemesh/servicemesh2.png",
        titleLeft: "通过插件支持丰富的监控和可观测能力",
        descListLeft: [
          "自带插件实现Http协议和Mysql协议的性能监控和性能分析",
          "支持对接丰富的第三方可观测工具（Pinpoint、Skywalking、Opentelemetry、Jaeger、Pyroscope、Arthas）",
          "通过监控插件扩展业务监控"
        ],
      },
      {
        imageRight: "/img/homepage/feature/servicemesh/servicemesh3.png",
        titleRight: "支持多种Service Mesh微服务框架，并可一键更换Service Mesh框架",
        descListRight: [
          "支持一键切换 Service Mesh 框架",
          "支持通过插件扩展更多 Service Mesh 框架",
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