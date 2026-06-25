import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

type VideoDocCalloutProps = {
  title: string;
  description: string;
  href: string;
  cover: string;
  coverAlt: string;
  layout?: 'horizontal' | 'stacked';
};

export default function VideoDocCallout({
  title,
  description,
  href,
  cover,
  coverAlt,
  layout = 'horizontal',
}: VideoDocCalloutProps): JSX.Element {
  return (
    <Link className={`${styles.callout} ${layout === 'stacked' ? styles.stacked : ''}`} to={href}>
      <span className={styles.coverWrap}>
        <img className={styles.cover} src={cover} alt={coverAlt} loading="lazy" />
        <span className={styles.play} aria-hidden="true" />
      </span>
      <span className={styles.content}>
        <span className={styles.label}>视频教程</span>
        <span className={styles.title}>{title}</span>
        <span className={styles.description}>{description}</span>
      </span>
    </Link>
  );
}

export function VideoDocCalloutGrid({ children }: { children: React.ReactNode }): JSX.Element {
  return <div className={styles.grid}>{children}</div>;
}
