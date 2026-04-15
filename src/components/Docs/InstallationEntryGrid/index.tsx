import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type InstallEntry = {
  title: string;
  summary: string;
  to: string;
  actionLabel: string;
  tone: 'quick' | 'host' | 'k8s' | 'offline';
};

const entries: InstallEntry[] = [
  {
    title: '快速安装',
    summary: '适合在 Linux 和 macOS 上快速部署。',
    to: '/docs/quick-start/quick-install',
    actionLabel: '去快速安装',
    tone: 'quick',
  },
  {
    title: '集群安装',
    summary: '从 Linux 主机开始搭建正式集群，适合高可用场景。',
    to: '/docs/installation/multi-node-install',
    actionLabel: '去集群安装',
    tone: 'host',
  },
  {
    title: '基于 Kubernetes 安装',
    summary: '已有可用 Kubernetes 集群时，直接通过 Helm 安装 Rainbond。',
    to: '/docs/installation/install-with-helm',
    actionLabel: '去 Kubernetes 安装',
    tone: 'k8s',
  },
  {
    title: '离线安装',
    summary: '环境不能直接联网时，优先准备离线包并按离线文档部署。',
    to: '/docs/installation/offline',
    actionLabel: '去离线安装',
    tone: 'offline',
  },
];

function EntryCard({ title, summary, to, actionLabel, tone }: InstallEntry): JSX.Element {
  return (
    <article className={`${styles.card} ${styles[tone]}`}>
      <h2 className={styles.cardTitle}>{title}</h2>
      <p className={styles.cardSummary}>{summary}</p>
      <Link className={styles.actionLink} to={to}>
        {actionLabel}
      </Link>
    </article>
  );
}

export default function InstallationEntryGrid(): JSX.Element {
  return (
    <section className={styles.wrapper}>
      <p className={styles.lead}>
        按你当前的部署环境，直接进入对应安装文档即可。
      </p>
      <div className={styles.grid}>
        {entries.map((entry) => (
          <EntryCard key={entry.title} {...entry} />
        ))}
      </div>
    </section>
  );
}
