import React from 'react';
import {
  IconBriefcase,
  IconCode,
  IconShield,
  IconCloud,
} from '@douyinfe/semi-icons';
import styles from './styles.module.css';

type CardTheme = 'enterprise' | 'devops' | 'domestic' | 'offline';

interface WhyChooseCard {
  title: string;
  audience: string;
  summary: string;
  metrics: Array<{
    value: string;
    label: string;
  }>;
  theme: CardTheme;
}

const cards: WhyChooseCard[] = [
  {
    title: '企业级 IT 管理',
    audience: '中大型企业、政府、事业单位',
    summary: '统一纳管多云与多集群，沉淀标准化交付能力。',
    metrics: [
      { value: '200%', label: '交付提效' },
      { value: '60%', label: '资源降本' },
    ],
    theme: 'enterprise',
  },
  {
    title: '敏捷开发与迭代',
    audience: '个人开发者、中小型研发团队',
    summary: '降低平台复杂度，让研发团队专注业务交付。',
    metrics: [{ value: '200%', label: '迭代提效' }],
    theme: 'devops',
  },
  {
    title: '信创与国产化替代',
    audience: '政府、国企、金融等关键行业',
    summary: '兼容主流信创环境，尽量减少迁移改造成本。',
    metrics: [
      { value: '100%', label: '信创兼容' },
      { value: '0', label: '代码改造' },
    ],
    theme: 'domestic',
  },
  {
    title: '离线与特殊环境',
    audience: '军工、航空、涉密及偏远地区',
    summary: '在断网和特殊环境下仍能完成稳定部署与运行。',
    metrics: [
      { value: '一键', label: '离线导出' },
      { value: '4核8G', label: '运行门槛' },
    ],
    theme: 'offline',
  },
];

const iconMap: Record<CardTheme, React.ReactNode> = {
  enterprise: <IconBriefcase size="large" />,
  devops: <IconCode size="large" />,
  domestic: <IconShield size="large" />,
  offline: <IconCloud size="large" />,
};

export default function WhyChoose() {
  return (
    <div className={styles.whyChooseSection}>
      <div className={styles.bgSection}>
        <div className={styles.lf}></div>
        <div className={styles.mid}>
          <img src="/img/split-bg.png" alt="" />
          <div className={styles.titleWrapper}>
            <h2 className={styles.sectionTitle}>为什么选择 Rainbond？</h2>
            <p className={styles.sectionSubtitle}>为不同场景量身定制云原生解决方案</p>
          </div>
        </div>
        <div className={styles.rt}></div>
      </div>

      <div className={styles.cardGrid}>
        {cards.map((card) => (
          <article key={card.title} className={`${styles.card} ${styles[card.theme]}`}>
            <div className={styles.cardTop}>
              <div className={styles.iconBadge}>{iconMap[card.theme]}</div>
            </div>

            <div className={styles.cardHeading}>
              <h3 className={styles.cardTitle}>{card.title}</h3>
              <p className={styles.cardAudience}>{card.audience}</p>
            </div>

            <p className={styles.cardSummary}>{card.summary}</p>

            <div className={styles.metricsRow}>
              {card.metrics.map((metric) => (
                <div key={`${metric.value}-${metric.label}`} className={styles.metricCard}>
                  <div className={styles.metricValue}>{metric.value}</div>
                  <div className={styles.metricLabel}>{metric.label}</div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
