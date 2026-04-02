import React from 'react';
import Link from '@docusaurus/Link';
import styles from './compareDocBlocks.module.css';

export type CompareEvidenceItem = {
  type: '案例' | '场景' | '安装' | '应用市场';
  title: string;
  metric?: string;
  description: string;
  href: string;
};

type Props = {
  items: CompareEvidenceItem[];
};

function typeClassName(type: CompareEvidenceItem['type']): string {
  switch (type) {
    case '案例':
      return styles.evidenceCase;
    case '场景':
      return styles.evidenceScene;
    case '安装':
      return styles.evidenceInstall;
    case '应用市场':
      return styles.evidenceMarket;
    default:
      return '';
  }
}

export default function CompareEvidenceCards({items}: Props): JSX.Element {
  return (
    <div className={styles.evidenceGrid}>
      {items.map((item) => (
        <Link
          key={`${item.type}-${item.title}`}
          className={`${styles.evidenceCard} ${typeClassName(item.type)}`}
          to={item.href}>
          <div className={styles.evidenceMeta}>
            <span className={styles.evidenceType}>{item.type}</span>
            {item.metric ? <span className={styles.evidenceMetric}>{item.metric}</span> : null}
          </div>
          <div className={styles.evidenceBody}>
            <h3 className={styles.evidenceTitle}>{item.title}</h3>
            <p className={styles.evidenceDesc}>{item.description}</p>
          </div>
          <div className={styles.evidenceFooter}>
            <span className={styles.evidenceLink}>查看详情</span>
          </div>
        </Link>
      ))}
    </div>
  );
}
