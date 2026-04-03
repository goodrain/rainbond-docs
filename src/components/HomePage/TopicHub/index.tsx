import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

const topics = [
  {
    label: '专题',
    title: '国产信创',
    description: '围绕离线交付、鲲鹏 / 麒麟部署、x86 到 ARM 迁移和信创平台能力，帮你更快判断 Rainbond 是否适合你的国产化环境。',
    href: '/offline-and-xinchuang',
    linkLabel: '进入国产信创专题',
  },
  {
    label: '专题',
    title: '选型中心',
    description: '围绕不会 Kubernetes、离线交付、AI 私有化和替代方案，快速判断应该先看 Rainbond 还是其他路径。',
    href: '/compare',
    linkLabel: '进入选型中心',
  },
];

export default function TopicHub() {
  return (
    <section className={styles.section}>
      <div className={styles.header}>
        <span className={styles.eyebrow}>Topics</span>
        <h2 className={styles.title}>专题推荐</h2>
        <p className={styles.description}>
          如果你不只是来“看文档”，而是带着明确问题来找解决方案，可以先从专题入口开始。
        </p>
      </div>
      <div className={styles.grid}>
        {topics.map((item) => (
          <Link key={item.href} to={item.href} className={styles.card}>
            <span className={styles.label}>{item.label}</span>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDescription}>{item.description}</p>
            <span className={styles.cardLink}>{item.linkLabel}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
