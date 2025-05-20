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
    title: "Kubernetes 多集群管理，实现应用级多云管理",
    description: "Rainbond控制台支持对接管理多种Kubernetes集群，支持应用级开发和管理体验，不需要写Yaml，通过应用级抽象，应用跨集群部署、安装、迁移、备份"
  };

  const FeatureHeaderImage = {
    imageURL: "/img/homepage/feature/k8scluster.png",
  };
  
  const FeatureContentList = [
      {
        imageRight: "/img/homepage/feature/k8scluster/k8scluster1.png",
        titleRight: "支持对接多种kubernetes集群",
        descListRight: [
          "通过向导对接自建kubernetes集群、阿里云ACK、华为云CCE、腾讯云TKE",
          "支持 Linux 服务器自动化安装",
        ],
        imageLeft: "/img/homepage/feature/k8scluster/k8scluster2.png",
        titleLeft: "接管已有Kubernetes集群应用",
        descListLeft: [
          "通过向导接管已经部署到Kubernetes里的应用",
          "Web控制台管理Kubernetes应用，不需要写YAML",
        ],
      },
      {
        imageRight: "/img/homepage/feature/k8scluster/k8scluster3.png",
        titleRight: "适合企业的团队管理和权限管理",
        descListRight: [
          "团队资源空间支持独享和共享",
          "支持细粒度的团队权限管理",
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