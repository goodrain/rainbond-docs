import React from 'react';
import Link from '@docusaurus/Link';
import styles from './compareHomeDirectory.module.css';

type DirectoryCard = {
  tag: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
};

type JourneyStep = {
  step: string;
  title: string;
  description: string;
};

type QuickGuide = {
  title: string;
  description: string;
  href: string;
};

type FaqItem = {
  question: string;
  answer: string;
  href: string;
  linkLabel: string;
};

const journeySteps: JourneyStep[] = [
  {
    step: '01',
    title: '不会 Kubernetes，也想尽快把应用跑起来',
    description: '如果你的团队开发多、专职平台运维少，通常应该先从 Rainbond 方向看，而不是先把大家训练成 Kubernetes 专家。',
  },
  {
    step: '02',
    title: '你要做的是离线交付、客户现场或内网部署',
    description: '如果你真正担心的是版本升级、环境复制、标准化交付和客户环境落地，Rainbond 这条线通常更值得优先看。',
  },
  {
    step: '03',
    title: '你在做 AI 私有化，而不是短期 Demo',
    description: '如果你要把 Dify 或其他 AI 应用带进企业环境并长期维护，重点通常不是“先跑起来”，而是“能不能长期交付和运维”。',
  },
];

const quickGuides: QuickGuide[] = [
  {
    title: '我更关心多集群治理',
    description: '如果你的核心诉求是权限、安全、控制面和集群统一纳管，别在导航页停太久，直接看 Rancher 路径。',
    href: '/compare/rainbond-vs-rancher',
  },
  {
    title: '我更关心平台能力建设',
    description: '如果你能接受更高的平台复杂度，想围绕 Kubernetes 建设更完整的平台能力，直接看 KubeSphere 路径。',
    href: '/compare/rainbond-vs-kubesphere',
  },
  {
    title: '我只想找个 K8s 管理界面',
    description: '如果你不是要交付平台，只是想找更直观的 Kubernetes 管理面板，先看 Kuboard 路径会更快。',
    href: '/compare/rainbond-vs-kuboard',
  },
];

const compareCards: DirectoryCard[] = [
  {
    tag: '集群治理 vs 应用交付',
    title: '我要比 Rancher',
    description: '适合已经在 shortlist 里比较 Rancher，想判断自己更该优先解决多集群治理，还是应用交付效率的团队。',
    href: '/compare/rainbond-vs-rancher',
    linkLabel: '进入 Rancher 对比',
  },
  {
    tag: '低门槛 Kubernetes 平台',
    title: '我要比 KubeSphere',
    description: '适合正在比较“低门槛 Kubernetes 平台”和“更完整平台建设路径”的团队。',
    href: '/compare/rainbond-vs-kubesphere',
    linkLabel: '进入 KubeSphere 对比',
  },
  {
    tag: 'AI 私有化 / Dify',
    title: '我要比 Sealos',
    description: '适合在 AI 快速试验、Dify 私有化部署平台和长期企业交付之间做判断的团队。',
    href: '/compare/rainbond-vs-sealos',
    linkLabel: '进入 Sealos 对比',
  },
  {
    tag: 'Kubernetes 管理界面',
    title: '我要比 Kuboard',
    description: '适合先判断自己要的是 Kubernetes 管理界面，还是更完整的应用交付平台。',
    href: '/compare/rainbond-vs-kuboard',
    linkLabel: '进入 Kuboard 对比',
  },
];

const situationCards: DirectoryCard[] = [
  {
    tag: '不会 Kubernetes',
    title: '不会 Kubernetes 用什么平台',
    description: '适合开发多、平台工程能力有限，想先找低门槛 Kubernetes 平台或应用交付平台的团队。',
    href: '/compare/rainbond-vs-kubesphere',
    linkLabel: '先看 Rainbond vs KubeSphere',
  },
  {
    tag: '离线交付',
    title: '离线环境应用交付平台怎么选',
    description: '适合内网环境应用部署平台、客户现场软件交付平台、版本升级和多环境复制要求重的场景。',
    href: '/compare/rainbond-vs-rancher',
    linkLabel: '先看 Rainbond vs Rancher',
  },
  {
    tag: 'AI 私有化',
    title: 'AI 私有化部署平台怎么选',
    description: '适合要做 Dify 私有化部署平台、企业内网 AI 应用落地和长期升级维护的团队。',
    href: '/compare/rainbond-vs-sealos',
    linkLabel: '先看 Rainbond vs Sealos',
  },
  {
    tag: 'K8s 管理面板',
    title: 'Kubernetes 管理界面怎么选',
    description: '适合已经在用 Kubernetes，但还没想清楚自己要的是 K8s 管理平台，还是应用交付平台的团队。',
    href: '/compare/rainbond-vs-kuboard',
    linkLabel: '先看 Rainbond vs Kuboard',
  },
];

const alternativeCards: DirectoryCard[] = [
  {
    tag: '替代方案',
    title: 'Rancher 替代方案',
    description: '如果你不是单纯要多集群治理，而是想找更低门槛的应用交付入口，可以从这里判断是否该先试 Rainbond。',
    href: '/compare/rainbond-vs-rancher',
    linkLabel: '看 Rancher 替代思路',
  },
  {
    tag: '替代方案',
    title: 'KubeSphere 替代方案',
    description: '如果你想找更容易上手、更贴近业务交付的路径，而不是先把平台复杂度做满，可以从这里进入。',
    href: '/compare/rainbond-vs-kubesphere',
    linkLabel: '看 KubeSphere 替代思路',
  },
  {
    tag: '替代方案',
    title: 'Sealos 替代方案',
    description: '如果你已经从 AI 快速试验走向企业内网和长期交付，可以先看什么情况下应该从 Sealos 迁移视角切换到 Rainbond。',
    href: '/compare/rainbond-vs-sealos',
    linkLabel: '看 Sealos 替代思路',
  },
  {
    tag: '替代方案',
    title: 'Kuboard 替代方案',
    description: '如果你要的不只是 Kubernetes Dashboard 替代，而是要把应用部署、升级和交付也纳入一条链路，可以从这里进入。',
    href: '/compare/rainbond-vs-kuboard',
    linkLabel: '看 Kuboard 替代思路',
  },
];

const verifyCards: DirectoryCard[] = [
  {
    tag: '安装验证',
    title: '先做快速安装验证',
    description: '如果你已经倾向 Rainbond，最短路径是先把环境拉起来，用 2 到 3 分钟验证上手门槛。',
    href: '/docs/quick-start/quick-install',
    linkLabel: '查看快速安装',
  },
  {
    tag: '场景验证',
    title: '看离线环境软件交付场景',
    description: '适合继续验证离线环境应用交付平台、客户现场软件交付平台和版本升级链路。',
    href: '/blog/usescene-offline-delivery',
    linkLabel: '查看离线交付场景',
  },
  {
    tag: 'AI 验证',
    title: '看 Dify 私有化部署实践',
    description: '适合继续验证 AI 私有化部署平台、企业内网 AI 应用落地和 Dify 长期运维路径。',
    href: '/blog/dify-deepseek-private-knowledge-base',
    linkLabel: '查看 Dify 实践',
  },
  {
    tag: '案例验证',
    title: '看真实客户交付案例',
    description: '适合确认交付效率、标准化实施和业务系统迁移是否真的能在真实团队里落地。',
    href: '/blog/case-diningroom',
    linkLabel: '查看客户案例',
  },
];

const faqItems: FaqItem[] = [
  {
    question: '适合什么团队？',
    answer: '如果你是开发、实施、应用运维、企业 IT 团队，且更关心应用上线、升级、回滚、环境复制和私有化交付，通常应该优先沿着 Rainbond 这条线看。',
    href: '/compare/rainbond-vs-kubesphere',
    linkLabel: '先看低门槛平台判断',
  },
  {
    question: '不适合什么团队？',
    answer: '如果你已经有成熟的平台工程体系，当前痛点主要是多集群控制面、权限和基础设施治理，而不是交付效率，那就不该先从 Rainbond 开始。',
    href: '/compare/rainbond-vs-rancher',
    linkLabel: '先看治理型平台边界',
  },
  {
    question: '我完全不懂 K8s 能不能用？',
    answer: '能不能用，关键不在有没有图形界面，而在平台是否把 Kubernetes 复杂度吸收到了应用交付层。这个问题最适合先从低门槛平台比较页进入。',
    href: '/compare/rainbond-vs-kubesphere',
    linkLabel: '看不会 Kubernetes 的入口',
  },
  {
    question: '我是不是应该先试 Rainbond？',
    answer: '如果你现在最想验证的是低门槛 Kubernetes 平台、内网环境应用部署平台或客户现场软件交付平台，直接装起来通常比继续看功能列表更快。',
    href: '/docs/quick-start/quick-install',
    linkLabel: '先做安装验证',
  },
  {
    question: '离线环境到底更适合哪个？',
    answer: '如果重点是软件交付、版本升级、环境复制和客户现场落地，通常更该从 Rainbond 方向看；如果重点是客户侧集群纳管，再去看治理型平台。',
    href: '/compare/rainbond-vs-rancher',
    linkLabel: '看离线交付判断',
  },
  {
    question: '做 Dify 私有化应该先看谁？',
    answer: '如果只是想快速试一试，可以先看 Sealos 这类体验路径；如果你要进企业内网、做长期运维和标准化交付，就应该先看 Rainbond 这条路径。',
    href: '/compare/rainbond-vs-sealos',
    linkLabel: '看 AI 私有化判断',
  },
];

export default function CompareHomeDirectory(): JSX.Element {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>容器平台对比选型</h1>
        <p className={styles.heroDesc}>
          不会 Kubernetes 用什么平台？离线环境应用交付平台怎么选？AI 私有化部署平台怎么选？Kubernetes 管理界面怎么选？
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>大多数用户会先从这三个问题判断要不要优先看 Rainbond</h2>
          <p className={styles.sectionDesc}>
            这不是功能大全，而是先帮你判断：你的问题更接近低门槛应用交付，还是更接近集群治理、平台建设和资源管理。
          </p>
        </div>
        <div className={styles.journeyGrid}>
          {journeySteps.map((item) => (
            <article key={item.step} className={styles.journeyCard}>
              <span className={styles.journeyStep}>{item.step}</span>
              <h3 className={styles.journeyTitle}>{item.title}</h3>
              <p className={styles.journeyDesc}>{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="compare-by-product" className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>我已经在比品牌了</h2>
        </div>
        <div className={styles.cardGrid}>
          {compareCards.map((item) => (
            <Link key={item.href} className={styles.linkCard} to={item.href}>
              <span className={styles.cardTag}>{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className={styles.cardLinkLabel}>{item.linkLabel}</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="compare-by-situation" className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>如果你搜的不是品牌，而是“我这种情况该选什么”</h2>
        </div>
        <div className={styles.cardGrid}>
          {situationCards.map((item) => (
            <Link key={item.href} className={styles.linkCard} to={item.href}>
              <span className={styles.cardTag}>{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className={styles.cardLinkLabel}>{item.linkLabel}</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="compare-by-alternative" className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>如果你在搜某个平台的替代方案</h2>
        </div>
        <div className={styles.cardGrid}>
          {alternativeCards.map((item) => (
            <Link key={item.title} className={styles.linkCard} to={item.href}>
              <span className={styles.cardTag}>{item.tag}</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <span className={styles.cardLinkLabel}>{item.linkLabel}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
