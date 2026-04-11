import React from 'react';
import styles from './styles.module.css';
import TrackedLink from '@src/components/Analytics/TrackedLink';

interface PrimaryPath {
  badge: string;
  title: string;
  summary: string;
  to: string;
  cta: string;
  facts: string[];
  installPath: string;
  tone: 'trial' | 'host' | 'k8s' | 'offline' | 'xinchuang';
}

interface SecondaryEntry {
  badge: string;
  title: string;
  summary: string;
  to: string;
  cta: string;
  facts: string[];
  tone: 'multi' | 'xinchuang';
}

interface FollowUpCard {
  title: string;
  summary: string;
  to: string;
  cta: string;
  tone: 'gettingStarted' | 'support';
}

interface FlowStep {
  index: string;
  title: string;
  summary: string;
}

const flowSteps: FlowStep[] = [
  {
    index: '01',
    title: '判断当前环境',
    summary: '先确认自己是试装、正式部署，还是已有 Kubernetes 或离线环境。',
  },
  {
    index: '02',
    title: '选择首次安装路径',
    summary: '首次安装优先在快速安装、主机安装、Kubernetes 安装、离线安装中选择。',
  },
  {
    index: '03',
    title: '继续扩展或落地',
    summary: '装好之后再看多集群、信创专题、首个应用和排障支持。',
  },
];

const primaryPaths: PrimaryPath[] = [
  {
    badge: '适合试装',
    title: '快速安装',
    summary: '适合本地电脑试装、学习和 PoC 验证，最快进入可用控制台。',
    to: '/docs/quick-start/quick-install',
    cta: '快速安装',
    installPath: 'quick_install',
    facts: ['学习 / PoC / 本地试装', 'Mac 需 OrbStack，Windows 需 WSL', '2 到 3 分钟完成基础环境启动'],
    tone: 'trial',
  },
  {
    badge: '正式部署',
    title: '集群安装',
    summary: '从 Linux 主机开始搭建正式集群，适合没有现成 K8s 集群的生产部署。',
    to: '/docs/installation/multi-node-install',
    cta: '集群安装',
    installPath: 'multi_node_install',
    facts: ['没有现成 Kubernetes 集群', '至少 3 台 Linux 主机，节点间网络互通', '使用 ROI 从主机搭建 Rainbond 集群'],
    tone: 'host',
  },
  {
    badge: '已有集群',
    title: '基于 Kubernetes 安装',
    summary: '已有可用 Kubernetes 集群时，直接通过 Helm 安装 Rainbond。',
    to: '/docs/installation/install-with-helm',
    cta: 'Kubernetes 安装',
    installPath: 'helm_install',
    facts: ['适合自建或托管 Kubernetes 集群', '需要 kubectl、Helm 和 Kubernetes 1.24+', '直接在现有集群中安装 Rainbond'],
    tone: 'k8s',
  },
  {
    badge: '受限环境',
    title: '离线安装',
    summary: '适合客户现场、内网和断网环境，优先解决离线包准备与交付问题。',
    to: '/docs/installation/offline',
    cta: '离线安装',
    installPath: 'offline_install',
    facts: ['客户现场 / 内网 / 不能直接联网', '至少 3 台 Linux 主机，并提前准备离线包', '使用 ROI + offline-packages 完成安装'],
    tone: 'offline',
  },
  {
    badge: '国产化',
    title: '国产化信创',
    summary: '适合国产化、多架构、一云多芯等场景，先确认架构与迁移方式，再进入对应安装路径。',
    to: '/docs/installation/multi-node-install',
    cta: '信创安装',
    installPath: 'xinchuang_install',
    facts: ['聚焦 x86_64、ARM64 与异构环境', '适合先判断安装、迁移与编排策略再落地'],
    tone: 'xinchuang',
  },
];



const followUpCards: FollowUpCard[] = [
  {
    title: '第一个应用',
    summary: '安装完成后，最快进入首个成功体验的路径。',
    to: '/docs/quick-start/getting-started',
    cta: '去部署第一个应用',
    tone: 'gettingStarted',
  },
  {
    title: '排障与支持',
    summary: '安装中断、UI 打不开或路径选错时，从这里快速恢复。',
    to: '/docs/troubleshooting',
    cta: '去排障 / 支持',
    tone: 'support',
  },
];

export default function InstallHub(): JSX.Element {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroIntro}>
          <h1 className={styles.heroTitle}>选择适合你当前环境的安装入口</h1>
          <p className={styles.heroDescription}>
            不要先复制命令，先判断自己是在试装、正式部署，还是受离线、信创或已有集群条件约束。
            选对入口，后面的安装步骤才更高效。
          </p>
          <div className={styles.heroTags}>
            <span className={styles.heroTag}>试装 / PoC</span>
            <span className={styles.heroTag}>已有 Kubernetes</span>
            <span className={styles.heroTag}>离线 / 内网</span>
            <span className={styles.heroTag}>信创 / 多架构</span>
          </div>
        </div>
      </section>

      <section className={styles.flowRail}>
        {flowSteps.map((step) => (
          <article key={step.index} className={styles.flowStep}>
            <span className={styles.flowIndex}>{step.index}</span>
            <div className={styles.flowContent}>
              <h3 className={styles.flowTitle}>{step.title}</h3>
              <p className={styles.flowSummary}>{step.summary}</p>
            </div>
          </article>
        ))}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>第一次安装 Rainbond，从这里选一条主路径</h2>
          <p className={styles.sectionDescription}>
            下面路径覆盖了大多数首次安装场景。
          </p>
        </div>

        <div className={styles.pathGrid}>
          {primaryPaths.map((item) => (
            <article key={item.title} className={`${styles.pathCard} ${styles[item.tone]}`}>
              <div className={styles.pathBadge}>{item.badge}</div>
              <h3 className={styles.pathTitle}>{item.title}</h3>
              <p className={styles.pathSummary}>{item.summary}</p>
              <ul className={styles.factList}>
                {item.facts.map((fact) => (
                  <li key={`${item.title}-${fact}`} className={styles.factItem}>
                    {fact}
                  </li>
                ))}
              </ul>
              <TrackedLink
                to={item.to}
                className={styles.pathButton}
                eventName="install_path_selected"
                eventProps={{
                  install_path: item.installPath,
                  module: 'install_hub_primary',
                  target_path: item.to,
                }}>
                {item.cta}
              </TrackedLink>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.followUpTitle}>安装完成后，不要停在“装好了”</h2>
        <p className={styles.followUpDescription}>
          真正的下一步是完成首个成功，或者在遇到问题时知道该从哪里继续推进。
        </p>

        <div className={styles.followUpGrid}>
          {followUpCards.map((item) => (
            <article key={item.title} className={`${styles.followUpCard} ${styles[item.tone]}`}>
              <h3 className={styles.followUpCardTitle}>{item.title}</h3>
              <p className={styles.followUpCardSummary}>{item.summary}</p>
              <TrackedLink
                to={item.to}
                className={styles.followUpLink}
                appendSourcePageParam>
                {item.cta}
              </TrackedLink>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>安装中途卡住了怎么办？</h2>
          <p className={styles.sectionDescription}>
            不必回到首页重新找。先判断是继续换安装路径、看排障，还是直接进入社区支持。
          </p>
        </div>
        <div className={styles.followUpGrid}>
          <article className={`${styles.followUpCard} ${styles.support}`}>
            <h3 className={styles.followUpCardTitle}>直接找人继续推进</h3>
            <p className={styles.followUpCardSummary}>
              如果你已经知道自己卡住了，直接进入社区支持页会比继续盲查更快，里面已经包含微信群和其他支持入口。
            </p>
            <TrackedLink
              to="/docs/support"
              className={styles.followUpLink}
              appendSourcePageParam>
              去社区支持
            </TrackedLink>
          </article>
        </div>
      </section>
    </div>
  );
}
