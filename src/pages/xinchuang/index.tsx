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
} from "../../components/FeatureList";
import styles from "../../components/FeatureList/styles.module.css";

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

  const routePath = "/xinchuang";
  const pageTitle = "信创云平台与国产化应用迁移方案 | Rainbond";
  const pageDescription =
    "Rainbond 提供适配信创场景的云平台能力，支持国产 CPU、国产操作系统、多架构应用迁移、一云多芯、多集群统一管理和应用模板交付，帮助团队推进国产化替代与信创上云。";
  const pageKeywords =
    "信创云平台, 国产化应用迁移, 信创迁移上云, 国产 CPU, 国产操作系统, 一云多芯, 多架构部署, 多集群管理, Rainbond";
  const pageUrl = new URL(routePath, siteConfig.url).toString();

  const FeatureHeaderTitle = {
    title: "零基础完成信创场景的应用迁移与云平台建设",
    description:
      "Rainbond 面向国产化和信创场景提供更低门槛的迁移路径。团队可以基于统一控制台管理国产 CPU、国产操作系统和多架构集群，让传统应用、遗留系统和云原生应用以更可控的成本迁移到信创环境。",
    customButton: "true",
    RightURL: "/offline-and-xinchuang",
    RightButton: "进入新版专题",
  };

  const FeatureHeaderImage = {
    imageURL: "/img/homepage/xinchuang/micro-service.png",
    imageAlt: "Rainbond 信创云平台与应用迁移能力展示",
    title: FeatureHeaderTitle.title,
  };

  const imageUrl = new URL(FeatureHeaderImage.imageURL, siteConfig.url).toString();

  const FeatureContentList = [
    {
      imageRight: "/img/homepage/xinchuang/cert.png",
      imageAltRight: "Rainbond 兼容国产 CPU 和信创环境认证展示",
      titleRight: "符合信创要求的一体化应用管理平台",
      descListRight: [
        "兼容主流国产 CPU 架构，适配信创场景中的基础环境要求。",
        "已获得多家国内 CPU 厂商兼容性认证。",
        "把信创应用的开发、运维和交付流程统一管理，降低国产化落地成本。",
      ],
      imageLeft: "/img/homepage/xinchuang/micro-service-topology.png",
      imageAltLeft: "Rainbond 支持传统应用迁移到信创环境",
      titleLeft: "传统应用可以更快迁移到信创环境",
      descListLeft: [
        "屏蔽架构差异，以更低成本把应用迁移到国产化信创环境。",
        "只需提供源代码、软件包或容器镜像，即可在指定架构环境中构建和运行。",
        "开源应用商店支持不同架构的应用模板与软件快速部署。",
        "支持多架构应用混合部署和异构微服务图形化编排。",
      ],
    },
    {
      imageRight: "/img/homepage/xinchuang/cluster.png",
      imageAltRight: "Rainbond 一云多芯和异构集群统一管理界面",
      titleRight: "一云多芯，统一管理与统一调度",
      descListRight: [
        "通过图形化界面快速安装部署，自动识别服务器架构，支持一云多芯异构集群建设。",
        "统一管理不同类型集群和业务，提升信创环境下的资源利用效率。",
      ],
      imageLeft: "",
      titleLeft: "",
      descListLeft: [""],
    },
  ];

  const seoParagraphs = [
    "Rainbond 在信创场景中的核心价值，不只是把应用部署到国产化服务器上，而是帮助团队把信创云平台、应用迁移、多架构运行和应用交付链路打通。这样一来，传统系统和新应用都可以在统一平台上持续演进。",
    "对于需要推进国产 CPU、麒麟或其他国产操作系统适配的团队来说，真正困难的部分往往不是一次性迁移，而是迁移后的长期运维、模板复用、多集群调度和持续交付。Rainbond 针对这些高频问题提供了更成体系的入口。",
    "如果你正在寻找覆盖信创云平台建设、国产化应用迁移、一云多芯、多集群管理和多架构应用模板交付的方案，这一页展示的就是 Rainbond 在信创场景中的核心能力。",
  ];

  const keywordHighlights = [
    "信创云平台建设",
    "国产化应用迁移",
    "多架构与一云多芯",
    "国产 CPU 与操作系统适配",
    "多集群统一管理",
    "信创应用模板交付",
  ];

  const relatedLinks = [
    {
      title: "离线 / 信创 / 国产化专题",
      description: "从专题页查看离线交付、信创迁移、ARM 部署和国产化场景的完整路径。",
      to: "/offline-and-xinchuang",
    },
    {
      title: "多架构安装指南",
      description: "了解如何在多架构和信创环境中安装并接入 Rainbond 集群。",
      to: "/docs/how-to-guides/localization-guide/multi-arch-installation",
    },
    {
      title: "多架构应用编排",
      description: "查看信创和异构环境下多架构应用如何编排、部署和运维。",
      to: "/docs/how-to-guides/localization-guide/multi-arch-app-orchestration",
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
    about: ["信创云平台", "国产化应用迁移", "一云多芯", "Rainbond"],
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
            <h2 className={styles.sectionTitle}>信创迁移场景与平台价值</h2>
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
            <h2 className={styles.sectionTitle}>继续了解相关内容</h2>
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
