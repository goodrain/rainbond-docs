import React from 'react';
import styles from './styles.module.css';
import TrackedLink from '@src/components/Analytics/TrackedLink';

type Action = {
  label: string;
  to: string;
  installPath: string;
  variant?: 'primary' | 'secondary';
};

type InstallCard = {
  badge: string;
  title: string;
  summary: string;
  tone: 'trial' | 'host' | 'k8s' | 'offline' | 'xinchuang';
  actions: Action[];
};

const regularInstallCards: InstallCard[] = [
  {
    badge: '只想先体验',
    title: '快速安装',
    summary: '适合本地试装、学习和 PoC 验证，先把 Rainbond 跑起来。',
    tone: 'trial',
    actions: [
      {
        label: '去快速安装',
        to: '/docs/quick-start/quick-install',
        installPath: 'quick_install',
      },
    ],
  },
  {
    badge: '没有现成集群',
    title: '集群安装',
    summary: '从 Linux 主机开始搭建正式集群，适合生产环境部署。',
    tone: 'host',
    actions: [
      {
        label: '从 Linux 主机开始',
        to: '/docs/installation/multi-node-install',
        installPath: 'multi_node_install',
      },
    ],
  },
  {
    badge: '已有 Kubernetes',
    title: '基于 Kubernetes 安装',
    summary: '已有可用 Kubernetes 集群时，直接通过 Helm 安装 Rainbond。',
    tone: 'k8s',
    actions: [
      {
        label: '去 Kubernetes 安装',
        to: '/docs/installation/install-with-helm',
        installPath: 'helm_install',
      },
    ],
  },
];

const constrainedInstallCards: InstallCard[] = [
  {
    badge: '内网 / 客户现场',
    title: '离线安装',
    summary: '环境不能直接联网时，优先解决离线包准备与交付问题。',
    tone: 'offline',
    actions: [
      {
        label: '去离线安装',
        to: '/docs/installation/offline',
        installPath: 'offline_install',
      },
    ],
  },
  {
    badge: '国产化 / 多架构',
    title: '国产化信创',
    summary: '适合信创、多架构、一云多芯等场景，先确认架构再落地。',
    tone: 'xinchuang',
    actions: [
      {
        label: '去信创安装',
        to: '/docs/installation/multi-node-install',
        installPath: 'xinchuang_install',
      },
    ],
  },
];

export default function InstallHub(): JSX.Element {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heroTitle}>按你当前环境，直接选一种安装方式</h1>
        <div className={styles.heroTags}>
          <span className={styles.heroTag}>常规在线环境</span>
          <span className={styles.heroTag}>离线 / 客户现场</span>
          <span className={styles.heroTag}>国产化 / 多架构</span>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.gridRegular}>
          {regularInstallCards.map((card) => (
            <article key={card.title} className={`${styles.card} ${styles[card.tone]}`}>
              <span className={styles.badge}>{card.badge}</span>
              <h2 className={styles.cardTitle}>{card.title}</h2>
              <p className={styles.cardSummary}>{card.summary}</p>
              <div className={styles.actionGroup}>
                {card.actions.map((action) => (
                  <TrackedLink
                    key={`${card.title}-${action.label}`}
                    to={action.to}
                    className={`${styles.actionButton} ${action.variant === 'secondary' ? styles.actionButtonSecondary : styles.actionButtonPrimary}`}
                    eventName="install_hub_path_selected"
                    eventProps={{
                      install_path: action.installPath,
                      module: 'install_hub_decision',
                      target_path: action.to,
                    }}>
                    {action.label}
                  </TrackedLink>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHead}>
          <h2 className={styles.sectionTitle}>离线 / 信创 / 受限环境</h2>
          <p className={styles.sectionDescription}>如果环境不能直接联网，或者你需要考虑客户现场、国产化和多架构约束，从这里进入会更准确。</p>
        </div>
        <div className={styles.gridConstrained}>
          {constrainedInstallCards.map((card) => (
          <article key={card.title} className={`${styles.card} ${styles[card.tone]}`}>
            <span className={styles.badge}>{card.badge}</span>
            <h2 className={styles.cardTitle}>{card.title}</h2>
            <p className={styles.cardSummary}>{card.summary}</p>
            <div className={styles.actionGroup}>
              {card.actions.map((action) => (
                <TrackedLink
                  key={`${card.title}-${action.label}`}
                  to={action.to}
                  className={`${styles.actionButton} ${action.variant === 'secondary' ? styles.actionButtonSecondary : styles.actionButtonPrimary}`}
                  eventName="install_hub_path_selected"
                  eventProps={{
                    install_path: action.installPath,
                    module: 'install_hub_decision',
                    target_path: action.to,
                  }}>
                  {action.label}
                </TrackedLink>
              ))}
            </div>
          </article>
          ))}
        </div>
      </section>

      <section className={styles.footerRail}>
        <div className={styles.footerCopy}>
          <h2 className={styles.footerTitle}>下一步</h2>
          <p className={styles.footerDescription}>装好了继续部署第一个应用；还是不确定就去社区支持。</p>
        </div>
        <div className={styles.footerActions}>
          <TrackedLink
            to="/docs/quick-start/getting-started"
            className={styles.footerLink}
            appendSourcePageParam>
            去部署第一个应用
          </TrackedLink>
          <TrackedLink
            to="/docs/support"
            className={styles.footerLink}
            appendSourcePageParam>
            获取社区支持
          </TrackedLink>
        </div>
      </section>
    </div>
  );
}
