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

  const routePath = "/feature/app-ops";
  const pageTitle = "应用运维平台与自动化运维能力 | Rainbond";
  const pageDescription =
    "Rainbond 提供面向开发团队的应用运维平台，支持应用生命周期管理、日志查询、环境变量、依赖注入、自动伸缩、网关、快照与 Web 终端，让 Kubernetes 应用运维更简单。";
  const pageKeywords =
    "应用运维, 自动化运维, Kubernetes 运维平台, 应用生命周期管理, 日志管理, Web终端, 自动伸缩, 应用快照, Rainbond";
  const pageUrl = new URL(routePath, siteConfig.url).toString();

  const FeatureHeaderTitle = {
    title: "应用运维平台：用应用模型简化 Kubernetes 运维",
    description:
      "Rainbond 通过应用模型抽象，把环境变量、依赖关系、网关、日志、自动伸缩和应用快照统一到一个入口，让开发团队在不直接编写 Kubernetes YAML 的前提下，也能完成高频应用运维工作。",
  };

  const FeatureHeaderImage = {
    imageURL: "/img/homepage/feature/appmodel.png",
    imageAlt: "Rainbond 应用运维平台功能总览",
    title: FeatureHeaderTitle.title,
  };

  const imageUrl = new URL(FeatureHeaderImage.imageURL, siteConfig.url).toString();

  const FeatureContentList = [
    {
      imageRight: "/img/homepage/feature/appops/appops1.png",
      imageAltRight: "Rainbond 应用运维平台中的应用级操作面板",
      titleRight: "开发人员也能掌控的应用运维",
      descListRight: [
        "应用级属性和动作统一收敛到控制台，开发人员更容易理解和使用。",
        "支持多人协作，并保留关键操作记录，方便审计和回溯。",
      ],
      imageLeft: "/img/homepage/feature/appops/appops2.png",
      imageAltLeft: "Rainbond 应用网关和路由运维界面",
      titleLeft: "内置应用网关，覆盖常见流量治理场景",
      descListLeft: [
        "支持基于域名、访问路径、请求头和 Cookie 的访问路由控制。",
        "支持 HTTPS 证书管理与自动签发。",
        "支持灰度发布和 A/B 测试，提升应用运维灵活性。",
      ],
    },
    {
      imageRight: "/img/homepage/feature/appops/appops3.png",
      imageAltRight: "Rainbond 自动伸缩与资源调整界面",
      titleRight: "自动伸缩能力让应用运维更省心",
      descListRight: [
        "支持手动伸缩和基于规则的自动伸缩，兼顾稳定性与资源效率。",
      ],
      imageLeft: "/img/homepage/feature/appops/appops4.png",
      imageAltLeft: "Rainbond Web 终端用于在线调试应用",
      titleLeft: "在线 Web 终端，方便应用调试和运维排障",
      descListLeft: [
        "支持在浏览器中直接进入 Shell 终端，加快问题定位和日常运维。",
      ],
    },
    {
      imageRight: "/img/homepage/feature/appops/appops5.png",
      imageAltRight: "Rainbond 日志查询与日志检索界面",
      titleRight: "Web 日志管理覆盖常见排障动作",
      descListRight: [
        "支持通过 Web 查看应用日志并进行搜索，减少运维切换成本。",
      ],
      imageLeft: "",
      titleLeft: "",
      descListLeft: [""],
    },
  ];

  const seoParagraphs = [
    "Rainbond 将环境变量、依赖关系、端口、存储、日志、伸缩和网关统一抽象为应用运维能力，让团队在 Kubernetes 上做日常变更时，不必从零维护复杂 YAML 和底层资源对象。",
    "对私有云、多团队和多环境场景来说，应用运维平台不只是能改配置，更重要的是要做到可视化、可审计和可复用。Rainbond 把应用生命周期管理、自动化运维和故障排查放到同一控制台，适合开发与平台团队协同使用。",
    "如果你正在寻找覆盖应用快照、日志查询、Web 终端、环境变量管理、依赖注入和自动伸缩的 Kubernetes 运维平台，这一页展示的就是 Rainbond 在应用运维场景中的核心能力组合。",
  ];

  const keywordHighlights = [
    "应用生命周期管理",
    "Kubernetes 应用运维",
    "日志查询与 Web 终端",
    "环境变量与依赖注入",
    "应用快照与回滚",
    "自动伸缩与网关治理",
  ];

  const relatedLinks = [
    {
      title: "应用快照与回滚",
      description: "了解如何为应用创建快照、查看变更、导出版本并执行回滚。",
      to: "/docs/how-to-guides/app-ops/app-snapshot",
    },
    {
      title: "服务自动伸缩",
      description: "查看 Rainbond 自动伸缩的配置方式、触发规则与适用场景。",
      to: "/docs/how-to-guides/app-ops/service-auto-scaling",
    },
    {
      title: "环境变量管理",
      description: "了解如何统一管理自定义环境变量、连接信息和应用配置。",
      to: "/docs/how-to-guides/app-ops/environment-manage",
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
    about: ["应用运维", "自动化运维", "Kubernetes 运维平台", "Rainbond"],
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
            <h2 className={styles.sectionTitle}>应用运维场景与价值</h2>
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
