import React from 'react';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import styles from './compareHomeDirectory.module.css';
import TrackedLink from '@src/components/Analytics/TrackedLink';
import CompareAiCapabilities from './CompareAiCapabilities';

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
    description: '开发人员多、平台运维少时，应先比较应用部署、日志、域名和回滚是否容易使用，再考虑需要暴露多少 Kubernetes 细节。',
  },
  {
    step: '02',
    title: '你要做的是离线交付、客户现场或内网部署',
    description: '这类项目要比较应用模板、离线包、环境参数、升级和回滚，不能只看集群是否能接入。',
  },
  {
    step: '03',
    title: '你在做 AI 私有化，而不是短期 Demo',
    description: '把 Dify、自研 AI 应用和大模型带进企业环境时，需要同时验证模型服务、GPU、密钥、监控、升级和离线物料。',
  },
];

const quickGuides: QuickGuide[] = [
  {
    title: '我更关心多集群治理',
    description: '主要需求是权限、安全、控制面和集群纳管时，重点比较 Rancher 等集群管理产品。',
    href: '/compare/rainbond-vs-rancher',
  },
  {
    title: '我更关心平台能力建设',
    description: '需要工作空间、多租户和较完整的 Kubernetes 平台能力时，可以继续比较 KubeSphere。',
    href: '/compare/rainbond-vs-kubesphere',
  },
  {
    title: '我只想找个 K8s 管理界面',
    description: '只需要更直观地查看和操作 Kubernetes 资源时，可以比较 Kuboard 等管理面板。',
    href: '/compare/rainbond-vs-kuboard',
  },
];

const platformRows = [
  ['Rainbond', '应用交付与应用全生命周期', '源码、镜像、Compose、模板、升级回滚和多集群应用', '开发、实施、企业 IT 与应用运维团队', '/docs/quick-start/architecture/design-concept'],
  ['Rancher', 'Kubernetes 集群管理', '集群供应、统一认证、RBAC、监控与 Fleet 持续交付', '平台与基础设施团队', 'https://ranchermanager.docs.rancher.com/getting-started/overview'],
  ['KubeSphere', '多租户 Kubernetes 平台', '多集群、工作空间、项目、RBAC 与可插拔平台能力', '希望建设综合云原生平台的团队', 'https://www.kubesphere.io/docs/v4.1/07-cluster-management/'],
  ['Sealos', '云上开发与应用部署体验', 'DevBox、App Deploy 与应用商店', '快速试验和云上开发团队', 'https://sealos.io/docs/guides/app-deploy/'],
  ['OpenShift', '企业 Kubernetes 应用平台', '集群、Operator、构建、开发者控制台和企业支持生态', '需要完整企业平台与商业支持的组织', 'https://docs.redhat.com/en/documentation/openshift_container_platform/4.21/html/building_applications/index'],
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
    description: '需要多集群治理时重点看 Rancher；需要让开发和实施人员管理应用时，再比较 Rainbond 的交付入口。',
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
    description: '需要查看 Kubernetes 资源时比较管理面板；还要管理应用部署、升级和交付时，再比较应用平台。',
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
    question: '应该先试用应用交付平台吗？',
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
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {'@type': 'Answer', text: item.answer},
    })),
  };
  return (
    <div className={styles.page}>
      <Head><script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script></Head>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>开源容器平台对比与选型指南</h1>
        <p className={styles.heroDesc}>
          容器管理关注工作负载，集群管理关注节点、权限与 Kubernetes 控制面，应用管理关注代码到上线、升级和交付。先确定主要问题，再比较 Rainbond、KubeSphere、Rancher、Sealos 和 OpenShift。
        </p>
        <p className={styles.heroDesc}>最近更新时间：2026-10-25。竞品信息依据下方官方文档，产品版本变化时应重新核对。</p>
        <div className={styles.heroActions}>
          <TrackedLink
            to="/install-hub"
            className={styles.primaryAction}
            eventName="cta_install_clicked"
            eventProps={{
              module: 'compare_directory_hero',
              cta_text: '先选安装路径',
              target_path: '/install-hub',
            }}>
            先选安装路径
          </TrackedLink>
          <TrackedLink
            to="/docs/quick-start/quick-install"
            className={styles.secondaryAction}
            eventName="cta_install_clicked"
            eventProps={{
              module: 'compare_directory_hero',
              cta_text: '直接快速安装',
              target_path: '/docs/quick-start/quick-install',
            }}>
            直接快速安装
          </TrackedLink>
          <TrackedLink
            to="/marketplace"
            className={styles.secondaryAction}
            eventName="cta_marketplace_clicked"
            eventProps={{
              module: 'compare_directory_hero',
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
          <h2 className={styles.sectionTitle}>集群管理、容器管理和应用管理不是同一件事</h2>
          <p className={styles.sectionDesc}>如果问题是创建或接入集群、统一 RBAC 和策略，优先看集群管理；如果问题是部署、升级、回滚和交付业务系统，优先看应用管理；两类平台也可以分工使用。</p>
        </div>
        <div className={styles.selectionTableWrap}>
          <table>
            <thead><tr><th>平台</th><th>主要定位</th><th>官方能力线索</th><th>更适合</th><th>来源</th></tr></thead>
            <tbody>{platformRows.map((row) => <tr key={row[0]}><td><strong>{row[0]}</strong></td><td>{row[1]}</td><td>{row[2]}</td><td>{row[3]}</td><td><Link to={row[4]}>官方文档</Link></td></tr>)}</tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>先判断团队要管理什么</h2>
          <p className={styles.sectionDesc}>
            应用交付、集群治理和资源管理使用的是同一套 Kubernetes 基础，但对应不同的产品重点和使用人员。
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

      <CompareAiCapabilities />

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
          <h2 className={styles.sectionTitle}>按使用场景比较</h2>
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
          <h2 className={styles.sectionTitle}>已有候选产品时怎么比较</h2>
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

      <section className={styles.section}>
        <div className={styles.sectionHead}><h2 className={styles.sectionTitle}>常见问题</h2></div>
        <div className={styles.faqList}>
          {faqItems.map((item) => <details key={item.question}><summary>{item.question}</summary><p>{item.answer}</p><Link to={item.href}>{item.linkLabel}</Link></details>)}
        </div>
      </section>
    </div>
  );
}
