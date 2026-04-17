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

  const routePath = "/feature/service-mesh";
  const pageTitle = "Service Mesh 微服务治理平台：拓扑、可观测与插件扩展 | Rainbond";
  const pageDescription =
    "Rainbond 提供 Service Mesh 微服务治理平台能力，支持微服务拓扑、服务编排、插件扩展、SkyWalking/Jaeger/Pinpoint 等可观测集成，帮助团队降低微服务治理门槛。";
  const pageKeywords =
    "Service Mesh, 微服务治理, 微服务拓扑, 可观测平台, SkyWalking, Jaeger, Pinpoint, Arthas, Kubernetes 微服务平台, Rainbond";
  const pageUrl = new URL(routePath, siteConfig.url).toString();

  const FeatureHeaderTitle = {
    title: "开箱即用的 Service Mesh 微服务治理平台",
    description:
      "Rainbond 让传统应用和微服务应用以更低门槛接入 Service Mesh 体系。团队可以通过图形化拓扑、插件化可观测能力和服务治理扩展，在不深挖底层网格实现细节的前提下完成微服务编排、监控和诊断。",
  };

  const FeatureHeaderImage = {
    imageURL: "/img/homepage/feature/servicemesh.png",
    imageAlt: "Rainbond Service Mesh 微服务治理平台总览",
    title: FeatureHeaderTitle.title,
  };

  const imageUrl = new URL(FeatureHeaderImage.imageURL, siteConfig.url).toString();

  const FeatureContentList = [
    {
      imageRight: "/img/homepage/feature/servicemesh/servicemesh1.png",
      imageAltRight: "Rainbond 微服务拓扑和图形化编排界面",
      titleRight: "图形化微服务编排和服务拓扑",
      descListRight: [
        "通过交互式拓扑图查看微服务运行状态和依赖关系。",
        "通过拼积木式操作实现微服务编排，降低治理复杂度。",
      ],
      imageLeft: "/img/homepage/feature/servicemesh/servicemesh2.png",
      imageAltLeft: "Rainbond Service Mesh 插件和可观测能力展示",
      titleLeft: "插件扩展可观测能力，覆盖监控与性能分析",
      descListLeft: [
        "内置插件支持 HTTP 协议和 MySQL 协议的性能监控与分析。",
        "支持对接 SkyWalking、Jaeger、Pinpoint、OpenTelemetry、Pyroscope 和 Arthas 等第三方工具。",
        "通过监控插件扩展业务监控能力，让排障和观测入口更统一。",
      ],
    },
    {
      imageRight: "/img/homepage/feature/servicemesh/servicemesh3.png",
      imageAltRight: "Rainbond 支持切换 Service Mesh 框架",
      titleRight: "支持多种 Service Mesh 框架并可持续扩展",
      descListRight: [
        "支持一键切换 Service Mesh 框架，兼顾灵活性与治理一致性。",
        "支持通过插件扩展更多 Service Mesh 框架和微服务能力。",
      ],
      imageLeft: "",
      titleLeft: "",
      descListLeft: [""],
    },
  ];

  const seoParagraphs = [
    "Rainbond 不是只把 Service Mesh 当作底层网络能力，而是把微服务拓扑、依赖关系、治理插件和观测工具汇总到更容易落地的微服务治理平台里。团队可以在同一个控制台里完成编排、排障和治理动作。",
    "对于已经进入 Spring Cloud、Dubbo 或 Kubernetes 微服务阶段的团队来说，Service Mesh 真正的价值不只是流量接管，还包括可观测性、性能分析、故障定位和跨服务关系的统一呈现。Rainbond 在这些场景里提供了更低门槛的操作入口。",
    "如果你正在寻找兼顾微服务治理、Service Mesh、SkyWalking、Jaeger、Pinpoint 和 Arthas 接入能力的平台，这一页展示的就是 Rainbond 在微服务治理场景中的核心能力组合。",
  ];

  const keywordHighlights = [
    "Service Mesh 微服务治理",
    "图形化服务拓扑",
    "可观测与性能分析",
    "SkyWalking / Jaeger / Pinpoint",
    "插件化监控扩展",
    "Kubernetes 微服务平台",
  ];

  const relatedLinks = [
    {
      title: "SkyWalking 集成",
      description: "查看 Rainbond 如何通过插件方式接入 SkyWalking，实现链路追踪与观测分析。",
      to: "/docs/reference/tracking/skywalking",
    },
    {
      title: "Jaeger 集成",
      description: "了解 Jaeger 在 Rainbond 微服务治理场景中的接入与使用方式。",
      to: "/docs/reference/tracking/jaeger",
    },
    {
      title: "Arthas 在线诊断",
      description: "查看如何借助 Arthas 在 Rainbond 中做线上诊断与微服务排障。",
      to: "/docs/reference/analysis/arthas",
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
    about: ["Service Mesh", "微服务治理", "可观测平台", "Rainbond"],
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
            <h2 className={styles.sectionTitle}>微服务治理场景与能力边界</h2>
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
