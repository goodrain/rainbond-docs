import React from 'react';
import styles from './compareDocBlocks.module.css';
import TrackedLink from '@src/components/Analytics/TrackedLink';

type Props = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel: string;
  secondaryHref: string;
};

export default function CompareInlineCta({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: Props): JSX.Element {
  return (
    <section className={styles.ctaWrap}>
      <h2 className={styles.ctaTitle}>{title}</h2>
      <p className={styles.ctaDesc}>{description}</p>
      <div className={styles.ctaGrid}>
        <TrackedLink
          className={styles.ctaCard}
          to={primaryHref}
          eventName="cta_install_clicked"
          eventProps={{
            module: 'compare_page_inline',
            cta_text: primaryLabel,
            target_path: primaryHref,
          }}>
          <div className={styles.ctaLabel}>{primaryLabel}</div>
          <div className={styles.ctaNote}>把高意向阅读直接收口到对应安装路径。</div>
        </TrackedLink>
        <TrackedLink className={styles.ctaCard} to={secondaryHref} appendSourcePageParam>
          <div className={styles.ctaLabel}>{secondaryLabel}</div>
          <div className={styles.ctaNote}>如果你还在比较阶段，先看更贴近当前处境的下一篇内容。</div>
        </TrackedLink>
      </div>
    </section>
  );
}
