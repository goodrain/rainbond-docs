import React from 'react';
import Link from '@docusaurus/Link';
import styles from './topicActionGrid.module.css';

export type TopicActionItem = {
  label: string;
  note: string;
  href: string;
};

type Props = {
  title: string;
  description: string;
  items: TopicActionItem[];
};

export default function TopicActionGrid({title, description, items}: Props): JSX.Element {
  return (
    <section className={styles.wrap}>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.desc}>{description}</p>
      <div className={styles.grid}>
        {items.map((item) => (
          <Link key={`${item.label}-${item.href}`} to={item.href} className={styles.card}>
            <div className={styles.label}>{item.label}</div>
            <div className={styles.note}>{item.note}</div>
          </Link>
        ))}
      </div>
    </section>
  );
}
