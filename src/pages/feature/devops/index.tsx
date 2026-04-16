/**
 * Copyright (c) Goodrain, Inc.
 *
 * This source code is licensed under the LGPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Link from "@docusaurus/Link";
import Head from "@docusaurus/Head";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Background from "@src/components/Background";
import React from "react";
import { animated, useTrail } from "react-spring";
import {
  FeatureContent,
  FeatureContentImage,
  FeatureHeader,
} from "../../../components/FeatureList";
import styles from "../../../components/FeatureList/styles.module.css";

export default function HowRainbond() {
  const { siteConfig } = useDocusaurusContext();
  const animatedTexts = useTrail(5, {
    from: { opacity: 0, transform: "translateY(3em)" },
    to: { opacity: 1, transform: "translateY(0)" },
    config: {
      mass: 3,
      friction: 45,
      tension: 460,
    },
  });

  const routePath = "/feature/devops";
  const pageTitle = "一体化 DevOps 平台：源码构建、持续交付与环境管理 | Rainbond";
  const pageDescription =
    "Rainbond 提供一体化 DevOps 平台能力，支持源码构建、镜像部署、Webhook 自动触发、持续交付、升级回滚和开发测试环境管理，帮助团队在 Kubernetes 上落地 DevOps。";
  const pageKeywords =
    "DevOps 平台, 持续交付, 持续集成, 源码构建, Webhook 自动部署, Kubernetes DevOps, 环境管理, 升级回滚, Rainbond";
  const pageUrl = new URL(routePath, siteConfig.url).toString();

  const FeatureHeaderTitle = {
    title: "一体化 DevOps 平台，不改变开发者已有使用习惯",
    description:
      "Rainbond 采用以应用为中心的设计理念，帮助团队在不深入学习容器和 Kubernetes 的前提下完成源码构建、镜像部署、持续交付和环境管理。复杂的平台管理交给管理员，开发团队专注业务开发与发布效率。",
  };

  const FeatureHeaderImage = {
    imageURL: "/img/homepage/feature/devops.png",
    imageAlt: "Rainbond 一体化 DevOps 平台能力展示",
    title: FeatureHeaderTitle.title,
  };

  const imageUrl = new URL(FeatureHeaderImage.imageURL, siteConfig.url).toString();

  const FeatureContentList = [
    {
      imageRight: "/img/homepage/feature/devops/devops1.png",
      imageAltRight: "Rainbond 支持源码、镜像、Dockerfile 与 Helm 的多种部署方式",
      titleRight: "支持源码、镜像、Dockerfile 与 Helm 等常见部署方式",
      descListRight: [
        "支持源代码自动识别和自动构建，覆盖 Java、Python、Node.js、PHP、Golang、HTML、.NET Core 以及 jar/war 等常见形态。",
        "支持 Dockerfile、Docker Compose 和容器镜像构建与部署。",
        "支持外部 Kubernetes YAML 和 Helm 应用部署。",
      ],
      imageLeft: "/img/homepage/feature/devops/devops2.png",
      imageAltLeft: "Rainbond 持续交付与升级回滚能力",
      titleLeft: "代码一键部署和回滚，持续交付更平滑",
      descListLeft: [
        "源码自动构建并滚动更新，业务不中断。",
        "支持配置 Webhook，让代码提交自动触发构建与发布流程。",
      ],
    },
    {
      imageRight: "/img/homepage/feature/devops/devops3.png",
      imageAltRight: "Rainbond 开发测试环境复制与管理界面",
      titleRight: "开发环境和测试环境可以快速复制与维护",
      descListRight: [
        "开发和测试人员可以自主搭建并维护环境，减少等待时间。",
        "基于已有环境一键复制新的开发场景，提升迭代效率。",
        "环境闲置时可关闭释放资源，使用时再按需开启。",
      ],
      imageLeft: "/img/homepage/feature/devops/devops4.png",
      imageAltLeft: "Rainbond 对接代码仓库与外部 DevOps 工具",
      titleLeft: "整合外部工具，扩展 DevOps 能力边界",
      descListLeft: [
        "整合 Gitee、GitLab、GitHub 等源代码仓库，实现单点登录和代码拉取。",
        "支持对接 Nexus、Artifactory 等制品库。",
        "可对接 Jenkins、SonarQube 和 OpenVSCode 等工具，补齐持续集成、代码检测与在线开发链路。",
      ],
    },
  ];

  const seoParagraphs = [
    "Rainbond 把源码构建、镜像构建、部署、升级和回滚串成同一条 DevOps 流程，让团队在 Kubernetes 上做持续交付时，不必自行拼装大量底层工具链。",
    "对于希望保留现有 Git 仓库和开发习惯的团队来说，一体化 DevOps 平台的核心价值不是替代所有工具，而是在源码管理、自动部署、环境管理和回滚控制之间建立更顺滑的协同链路。",
    "如果你正在寻找支持源码持续交付、Webhook 自动触发、镜像与 Helm 部署、多环境复制以及升级回滚的 Kubernetes DevOps 平台，这一页展示的就是 Rainbond 的主要能力边界。",
  ];

  const keywordHighlights = [
    "源码构建与自动部署",
    "持续集成与持续交付",
    "Webhook 自动触发构建",
    "多环境复制与环境管理",
    "镜像、YAML 与 Helm 部署",
    "升级回滚与发布稳定性",
  ];

  const relatedLinks = [
    {
      title: "源码持续交付",
      description: "查看 Rainbond 如何从源代码仓库构建、部署并持续更新应用。",
      to: "/docs/how-to-guides/delivery/continuous/source-code",
    },
    {
      title: "应用升级与回滚",
      description: "了解应用升级过程中的配置差异、版本变更和回滚策略。",
      to: "/docs/how-to-guides/delivery/upgrade-app",
    },
    {
      title: "多环境持续交付",
      description: "了解 Rainbond 在多集群、多环境下如何支撑持续交付链路。",
      to: "/docs/how-to-guides/delivery/continuous/multi-env",
    },
  ];

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: pageUrl,
    inLanguage: "zh-CN",
    primaryImageOfPage: imageUrl,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.title,
      url: siteConfig.url,
    },
    about: ["DevOps 平台", "持续交付", "持续集成", "Kubernetes DevOps", "Rainbond"],
  };

  return (
    <Layout title={pageTitle} description={pageDescription}>
      <Background />
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content={pageKeywords} />
        <link rel="canonical" href={pageUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:image" content={imageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      </Head>
      <animated.div style={animatedTexts[1]}>
        <FeatureHeader props={{ ...FeatureHeaderTitle }} />
        <FeatureContentImage props={{ FeatureHeaderImage }} />
        <div className={styles.global_content}>
          <section className={styles.seoSection}>
            <h2 className={styles.sectionTitle}>DevOps 场景覆盖与落地方式</h2>
            {seoParagraphs.map((paragraph) => (
              <p key={paragraph} className={styles.sectionParagraph}>
                {paragraph}
              </p>
            ))}
            <ul className={styles.keywordList}>
              {keywordHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        </div>
        <FeatureContent props={{ FeatureContentList }} />
        <div className={styles.global_content}>
          <section className={styles.seoSection}>
            <h2 className={styles.sectionTitle}>继续了解相关文档</h2>
            <div className={styles.linkGrid}>
              {relatedLinks.map((item) => (
                <Link key={item.to} to={item.to} className={styles.linkCard}>
                  <span className={styles.linkCardTitle}>{item.title}</span>
                  <p className={styles.linkCardDesc}>{item.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </animated.div>
    </Layout>
  );
}
