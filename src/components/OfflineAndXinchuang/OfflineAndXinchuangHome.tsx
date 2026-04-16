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
    title: '信创平台能力',
    description: '为什么 Rainbond 能作为国产化信创场景下的一体化应用管理平台。',
    href: '/offline-and-xinchuang/xinchuang-platform',
    linkLabel: '进入平台专题',
  },
];

const capabilitySteps: CapabilityStep[] = [
  {
    phase: '第一步',
    title: '平台级信创环境适配',
    description:
      'Rainbond 面向国产化信创场景，不只是“能不能跑起来”，而是把环境支持、平台承载和长期运维放到同一条能力链路里。',
    points: [
      '兼容国产 CPU、国产操作系统等典型信创环境',
      '支持一云多芯和异构集群统一管理，适合过渡期混合架构场景',
      '帮助团队先把环境差异收敛到平台层，而不是每个项目重复消化',
    ],
  },
  {
    phase: '第二步',
    title: '应用迁移与多架构承载',
    description:
      '面对从 x86 到 ARM、从传统交付到云原生应用管理的过渡，Rainbond 更强调应用级视角，而不是只停留在资源管理层。',
    points: [
      '支持通过源代码、软件包、容器镜像等方式承接现有业务',
      '适合把遗留系统逐步迁入国产化信创环境，而不是一次性重构',
      '便于在异构资源池中持续做应用部署、升级和编排',
    ],
  },
  {
    phase: '第三步',
    title: '完全离线环境安装落地',
    description:
      '对客户内网、政企机房和完全离线环境，Rainbond 提供的不只是安装命令，而是一条更适合实施和交付的落地路径。',
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
      '很多团队的难点不在首次安装，而在后续交付。Rainbond 更适合从应用模板、版本管理和复制交付来降低重复劳动。',
    points: [
      '把业务系统沉淀为可导出导入的应用模板，提升多环境复用能力',
      '围绕版本做升级和回滚，而不是每次都重新拼装环境',
      '更适合私有化交付、客户现场实施和长期运维场景',
    ],
  },
];

export default function OfflineAndXinchuangHome(): JSX.Element {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>通过Rainbond实现离线场景和国产化信创</h1>
        <p className={styles.heroDesc}>
          Rainbond 是一不用懂 Kubernetes 的开源容器平台。在国产化信创、客户内网和完全离线环境中，它不只是回答“能不能安装”，而是把环境适配、应用迁移、标准化交付、升级回滚和持续运维尽量收口到统一平台里。
        </p>
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
            Rainbond 的价值不只是替你把底层 Kubernetes 装起来，也不是只提供一个资源管理面板，而是以应用为中心，把环境支持、应用迁移、应用模板、部署升级和日常运维尽量放到同一套平台能力里。
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
