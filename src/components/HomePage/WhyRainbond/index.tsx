import React from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  Boxes,
  Code2,
  Database,
  RefreshCw,
  Rocket,
  ShieldCheck,
} from 'lucide-react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface Benefit {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface RuntimeCard {
  title: string;
  status: string;
  icon: LucideIcon;
  className: 'codeCard' | 'databaseCard' | 'platformCard';
  tone: 'code' | 'database' | 'platform';
}

const benefits: Benefit[] = [
  {
    title: '不只完成一次部署',
    description: 'Rainbond 统一处理构建、网络、数据、证书和扩缩容。',
    icon: Rocket,
  },
  {
    title: '后续运维仍然可控',
    description: '查看状态和日志，完成升级、备份、恢复与回滚。',
    icon: RefreshCw,
  },
  {
    title: '仍然运行在你的环境',
    description: '应用、数据和模型保留在自己的服务器或 Kubernetes 中。',
    icon: ShieldCheck,
  },
];

const runtimeCards: RuntimeCard[] = [
  {
    title: 'Agent 直接部署到服务器',
    status: '完成一次部署',
    icon: Code2,
    className: 'codeCard',
    tone: 'code',
  },
  {
    title: '环境、依赖与后续运维',
    status: '仍需自己处理',
    icon: Database,
    className: 'databaseCard',
    tone: 'database',
  },
  {
    title: 'Agent 通过 Rainbond 部署',
    status: '持续可运维',
    icon: Boxes,
    className: 'platformCard',
    tone: 'platform',
  },
];

export default function WhyRainbond() {
  return (
    <section className={styles.section} aria-labelledby="why-rainbond-title">
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 id="why-rainbond-title" className={styles.title}>AI开发代码，Rainbond 让它稳定运行</h2>
          <p className={styles.subtitle}>AI 可以完成一次部署，但环境、依赖、网络、数据和后续运维，仍需要 Rainbond 持续管理。</p>
        </header>

        <div className={styles.contentGrid}>
          <div className={styles.message}>
            <h3 className={styles.claim}>
              Agent 负责发起部署，<br />
              Rainbond 让应用<span className={styles.highlight}>稳定运行</span>，<br />
              并且持续可运维。
            </h3>

            <ul className={styles.benefitList}>
              {benefits.map(({ title, description, icon: Icon }) => (
                <li key={title} className={styles.benefitItem}>
                  <span className={styles.benefitIcon} aria-hidden="true">
                    <Icon size={18} strokeWidth={2} />
                  </span>
                  <div>
                    <h4 className={styles.benefitTitle}>{title}</h4>
                    <p className={styles.benefitDescription}>{description}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.visual} aria-label="Agent 直接部署与通过 Rainbond 部署的区别">
            {runtimeCards.map(({ title, status, icon: Icon, className, tone }) => (
              <article key={title} className={clsx(styles.visualCard, styles[className], styles[tone])}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardIcon} aria-hidden="true">
                    <Icon size={19} strokeWidth={2.2} />
                  </span>
                  <h3 className={styles.cardTitle}>{title}</h3>
                  <span className={styles.status}>{status}</span>
                </div>
                <div className={styles.cardLines} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
