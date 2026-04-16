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

  const routePath = "/feature/multi-cluster";
  const pageTitle = "Kubernetes 多集群管理平台：多云应用交付与统一纳管 | Rainbond";
  const pageDescription =
    "Rainbond 提供 Kubernetes 多集群管理平台能力，支持多云和混合云集群接入、应用级统一管理、跨集群交付、迁移与团队权限管理，帮助企业降低多集群运维复杂度。";
  const pageKeywords =
    "Kubernetes 多集群管理, 多云应用管理, 多集群平台, 混合云管理, 跨集群交付, 应用级多云管理, 团队权限管理, Rainbond";
  const pageUrl = new URL(routePath, siteConfig.url).toString();

  const FeatureHeaderTitle = {
    title: "Kubernetes 多集群管理，实现应用级多云管理",
    description:
      "Rainbond 控制台支持对接多种 Kubernetes 集群，并以应用为中心提供一致的开发、交付和运维体验。团队不必直接编写 YAML，也能实现跨集群部署、安装、迁移和备份。",
  };

  const FeatureHeaderImage = {
    imageURL: "/img/homepage/feature/k8scluster.png",
    imageAlt: "Rainbond Kubernetes 多集群管理平台总览",
    title: FeatureHeaderTitle.title,
  };

  const imageUrl = new URL(FeatureHeaderImage.imageURL, siteConfig.url).toString();

  const FeatureContentList = [
    {
      imageRight: "/img/homepage/feature/k8scluster/k8scluster1.png",
      imageAltRight: "Rainbond 多集群接入与集群纳管界面",
      titleRight: "支持对接多种 Kubernetes 集群",
      descListRight: [
        "通过向导对接自建 Kubernetes 集群、阿里云 ACK、华为云 CCE、腾讯云 TKE 等常见环境。",
        "支持在 Linux 服务器上自动化安装和扩展集群。",
      ],
      imageLeft: "/img/homepage/feature/k8scluster/k8scluster2.png",
      imageAltLeft: "Rainbond 接管现有 Kubernetes 应用的管理界面",
      titleLeft: "接管已有 Kubernetes 应用，统一纳管更轻松",
      descListLeft: [
        "通过向导接管已部署到 Kubernetes 集群中的应用。",
        "通过 Web 控制台管理 Kubernetes 应用，降低 YAML 运维门槛。",
      ],
    },
    {
      imageRight: "/img/homepage/feature/k8scluster/k8scluster3.png",
      imageAltRight: "Rainbond 多团队权限与资源空间配置界面",
      titleRight: "适合企业的团队管理和权限管理",
      descListRight: [
        "团队资源空间支持独享和共享，适合多团队协作。",
        "支持细粒度的团队权限管理，兼顾安全性与交付效率。",
      ],
      imageLeft: "",
      titleLeft: "",
      descListLeft: [""],
    },
  ];

  const seoParagraphs = [
    "Rainbond 关注的不是只做集群列表管理，而是在多集群和多云环境中提供一致的应用交付入口。团队可以把不同云厂商或不同机房的 Kubernetes 集群统一接入，再按应用维度完成部署、迁移和持续更新。",
    "对于需要同时管理私有云、公有云和混合云资源的企业来说，Kubernetes 多集群管理平台的关键价值在于降低集群异构带来的操作复杂度，并通过统一的权限模型和应用模型减少跨团队沟通成本。",
    "如果你正在寻找覆盖多集群接入、跨环境交付、应用迁移、团队权限和多云管理的应用级平台，这一页展示的就是 Rainbond 在多集群场景中的核心能力。",
  ];

  const keywordHighlights = [
    "Kubernetes 多集群管理",
    "多云应用交付",
    "混合云与私有云统一纳管",
    "跨集群部署与迁移",
    "团队权限和资源隔离",
    "应用级多云管理体验",
  ];

  const relatedLinks = [
    {
      title: "图形化安装多集群",
      description: "了解如何通过图形界面把新的 Kubernetes 集群接入 Rainbond。",
      to: "/docs/installation/install-with-ui",
    },
    {
      title: "多环境持续交付",
      description: "查看 Rainbond 在多集群、多环境场景中的持续交付实践。",
      to: "/docs/how-to-guides/delivery/continuous/multi-env",
    },
    {
      title: "Rainbond vs Rancher",
      description: "对比 Rainbond 与 Rancher 在多集群治理和应用交付上的差异。",
      to: "/compare/rainbond-vs-rancher",
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
    about: ["Kubernetes 多集群管理", "多云应用管理", "混合云管理", "Rainbond"],
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
            <h2 className={styles.sectionTitle}>多集群管理场景与业务价值</h2>
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
