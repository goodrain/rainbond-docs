import React from 'react';
import Link from '@docusaurus/Link';
import styles from './offlineAndXinchuangHome.module.css';
import TrackedLink from '@src/components/Analytics/TrackedLink';

type TopicCard = {
  tag: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

type CapabilityStep = {
  phase: string;
  title: string;
  description: string;
  points: string[];
};

const topicCards: TopicCard[] = [
  {
    tag: '离线交付',
    title: '客户现场怎么做离线交付',
    description: '离线环境下如何做标准化交付、版本升级、环境复制和回滚。',
    href: '/offline-and-xinchuang/offline-delivery',
    linkLabel: '进入离线交付专题',
  },
  {
    tag: '麒麟 / ARM',
    title: '麒麟 V10 / ARM 部署',
    description: '麒麟 V10 + ARM 架构能不能跑、怎么装、有哪些实施注意事项。',
    href: '/offline-and-xinchuang/kunpeng-kylin-deploy',
    linkLabel: '进入部署专题',
  },
  {
    tag: '迁移方案',
    title: 'x86 到 ARM 迁移',
    description: '哪些业务适合迁、Rainbond 在迁移链路中的价值是什么、怎么分阶段落地。',
    href: '/offline-and-xinchuang/x86-to-arm',
    linkLabel: '进入迁移专题',
  },
  {
    tag: '平台能力',
    title: '信创环境能力与边界',
    description: '核对 x86_64、ARM64、麒麟 V10 等公开验证范围，以及仍需现场测试的组合。',
    href: '/offline-and-xinchuang/xinchuang-platform',
    linkLabel: '进入平台专题',
  },
];

const capabilitySteps: CapabilityStep[] = [
  {
    phase: '第一步',
    title: '平台级信创环境适配',
    description:
      'Rainbond 可以在已验证的国产 CPU 和操作系统组合上承载应用，并继续管理部署、升级和日常运维。',
    points: [
      '当前公开实操覆盖 x86_64、ARM64 以及麒麟 V10 / 鲲鹏路径',
      '文档提供 x86_64 与 ARM64 混合集群、独立多集群两种管理方式',
      '飞腾、龙芯、统信和国产数据库等组合需要按具体版本重新验证',
    ],
  },
  {
    phase: '第二步',
    title: '应用迁移与多架构承载',
    description:
      '迁移到 ARM 前，需要逐项检查业务镜像和依赖。通过验证的组件可以继续按应用统一部署和编排。',
    points: [
      '可以通过源代码、软件包或容器镜像部署现有业务',
      '迁移前需要检查基础镜像、系统包和闭源依赖是否支持目标架构',
      '应用模板跨架构安装的前提是组件镜像或源码能够支持目标架构',
    ],
  },
  {
    phase: '第三步',
    title: '完全离线环境安装落地',
    description:
      '客户内网或完全离线时，需要提前准备平台安装包、业务镜像、应用模板和依赖清单。',
    points: [
      '支持提前准备离线安装包、镜像和依赖，适应严格网络隔离环境',
      '可结合 ROI 等路径更快完成纯离线环境中的平台部署',
      '适合把“怎么装起来”沉淀成可执行的实施手册和交付步骤',
    ],
  },
  {
    phase: '第四步',
    title: '离线交付、升级与回滚',
    description:
      '应用首次安装后，还要持续升级和维护。模板和版本记录可以减少多个客户环境中的重复操作。',
    points: [
      '把业务系统沉淀为可导出导入的应用模板，提升多环境复用能力',
      '围绕版本做升级和回滚，而不是每次都重新拼装环境',
      '适用于私有化交付、客户现场实施和长期运维',
    ],
  },
];

export default function OfflineAndXinchuangHome(): JSX.Element {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>软件离线部署与交付、国产化信创适配</h1>
        <p className={styles.heroDesc}>
          Rainbond 是基于 Kubernetes 的开源容器平台。在国产化信创、客户内网和完全离线环境中，平台用于管理环境适配、应用迁移、模板交付、升级回滚和日常运维。
        </p>
        <p className={styles.heroHint}>最近更新时间：2026-10-25。公开验证范围包括麒麟 V10 / 鲲鹏 ARM 场景；统信、飞腾、龙芯及国产数据库组合需要按具体版本现场验证。</p>
        <div className={styles.heroActions}>
          <TrackedLink
            to="/docs/installation/offline"
            className={styles.primaryAction}
            eventName="cta_install_clicked"
            eventProps={{
              module: 'offline_xinchuang_hero',
              cta_text: '去离线安装',
              target_path: '/docs/installation/offline',
            }}>
            去离线安装
          </TrackedLink>
          <TrackedLink
            to="/docs/installation/multi-node-install"
            className={styles.secondaryAction}
            eventName="cta_install_clicked"
            eventProps={{
              module: 'offline_xinchuang_hero',
              cta_text: '去信创安装',
              target_path: '/docs/installation/multi-node-install',
            }}>
            去信创安装
          </TrackedLink>
          <TrackedLink
            to="/marketplace"
            className={styles.secondaryAction}
            eventName="cta_marketplace_clicked"
            eventProps={{
              module: 'offline_xinchuang_hero',
              cta_text: '进入应用市场',
              target_path: '/marketplace',
            }}
            appendSourcePageParam>
            进入应用市场
          </TrackedLink>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Rainbond 在这类项目里解决什么</h2>
          <p className={styles.sectionDesc}>
            对很多团队来说，应用既要运行在国产 CPU、国产操作系统和异构资源环境里，又要面对内网隔离、离线安装、客户现场交付以及后续升级回滚。
          </p>
          <p className={styles.sectionDesc}>
            Rainbond 按应用组织组件、依赖、配置和版本。底层仍然是 Kubernetes，但开发和实施人员处理更多的是应用部署与维护，而不是单独管理每个资源对象。
          </p>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>Rainbond 的核心能力可以分成这四类</h2>
        </div>
        <ol className={styles.capabilityFlow}>
          {capabilitySteps.map((item, index) => (
            <li key={item.title} className={styles.capabilityStep}>
              <div className={styles.capabilityMarker}>
                <span className={styles.capabilityMarkerIndex}>
                  {String(index + 1).padStart(2, '0')}
                </span>
              </div>
              <div className={styles.capabilityBody}>
                <h3 className={styles.capabilityTitle}>{item.title}</h3>
                <p className={styles.capabilityDesc}>{item.description}</p>
                <ul className={styles.capabilityList}>
                  {item.points.map((point) => (
                    <li key={point} className={styles.capabilityItem}>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>你可以从这里继续往下看</h2>
        </div>
        <div className={styles.topicGrid}>
          {topicCards.map((item) => (
            <Link key={item.href} to={item.href} className={styles.topicCard}>
              <span className={styles.topicTag}>{item.tag}</span>
              <h3 className={styles.topicTitle}>{item.title}</h3>
              <p className={styles.topicDesc}>{item.description}</p>
              <span className={styles.topicLink}>{item.linkLabel}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
