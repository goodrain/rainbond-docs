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
import { FeatureContent, FeatureContentImage, FeatureHeader} from '../../../components/FeatureList';
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
    title: "易用的一体化DevOps，不改变开发者使用习惯",
    description: "Rainbond使用“以应用为中心”的设计理念，对开发人员友好，不用学习容器和Kubernetes等底层技术，开发人员对应用开发和应用运维过程自主可控，已有项目和代码不需要改变。复杂的系统管理和平台管理由平台管理员负责，兼容各种Kubernetes版本和Kubernetes工具，实现各司其职。"
  };

  const FeatureHeaderImage = {
    imageURL: "/img/homepage/feature/devops.png",
  };

  const FeatureContentList = [
      {
        imageRight: "/img/homepage/feature/devops/devops1.png",
        titleRight: "支持常见的所有部署方式",
        descListRight: [
          "源代码自动识别和自动构建（Java、Python、Node.js、PHP、Golang、Html、.Netcore、jar/war）",
          "支持Dockerfile、Docker Compose和容器镜像构建和部署",
          "支持外部Kubernetes Yaml 和 Helm 应用部署",
        ],
        imageLeft: "/img/homepage/feature/devops/devops2.png",
        titleLeft: "代码一键部署和回滚",
        descListLeft: [
          "源代码自动构建和部署，并滚动更新，业务不中断",
          "配置 webhook，实现代码提交触发自动构建",
        ],
      },
      {
        imageRight: "/img/homepage/feature/devops/devops3.png",
        titleRight: "快速搭建开发环境和测试环境",
        descListRight: [
          "开发和测试人员完全自主搭建和维护环境",
          "搭建新开发场景，基于已有环境一键复制",
          "不用时关闭环境释放资源，需要时按需开启"
        ],
        imageLeft: "/img/homepage/feature/devops/devops4.png",
        titleLeft: "整合外部工具，扩展DevOps能力",
        descListLeft: [
          "整合Gitee、Gitlab、Github等多种源代码仓库，实现单点登录",
          "支持对接Nexus、Artifactory等制品库",
          "对接已有Jenkins实现持续集成，对接SonarQube实现代码检测，对接OpenVSCode实现Web IDE",
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