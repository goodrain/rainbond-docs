import React from 'react';
import styles from './compareHeroGraphic.module.css';
import TrackedLink from '@src/components/Analytics/TrackedLink';

type Bullet = {
  label: string;
  value: string;
};

type Side = {
  name: string;
  accent: 'blue' | 'orange' | 'teal' | 'green' | 'slate';
  summary: string;
  bullets: Bullet[];
};

type Props = {
  title?: string;
  subtitle?: string;
  decision?: string;
  primaryCta?: {
    label: string;
    href: string;
  };
  secondaryCta?: {
    label: string;
    href: string;
  };
  audienceHint?: string;
  left: Side;
  right: Side;
};

function cardClassName(accent: Side['accent']) {
  return `${styles.card} ${styles[`card${accent[0].toUpperCase()}${accent.slice(1)}`]}`;
}

function badgeClassName(accent: Side['accent']) {
  return `${styles.badge} ${styles[`badge${accent[0].toUpperCase()}${accent.slice(1)}`]}`;
}

export default function CompareHeroGraphic({
  title,
  subtitle,
  decision,
  primaryCta,
  secondaryCta,
  audienceHint,
  left,
  right,
}: Props): JSX.Element {
  const hasTopContent = Boolean(title || subtitle || decision || primaryCta || secondaryCta || audienceHint);
  const ariaLabel = title ? `${title} 对比摘要` : `${left.name} 与 ${right.name} 对比摘要`;

  return (
    <section className={styles.wrap} aria-label={ariaLabel}>
      {hasTopContent ? (
        <div className={styles.top}>
          {(title || subtitle || primaryCta || secondaryCta || audienceHint) ? (
            <div>
              {title ? <h1 className={styles.title}>{title}</h1> : null}
              {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
              {decision ? (
                <div className={styles.decisionInline}>
                  <p>{decision}</p>
                </div>
              ) : null}
              {primaryCta || secondaryCta ? (
                <div className={styles.actions}>
                  {primaryCta ? (
                    <TrackedLink
                      className={styles.primaryButton}
                      to={primaryCta.href}
                      eventName="cta_install_clicked"
                      eventProps={{
                        module: 'compare_page_hero',
                        cta_text: primaryCta.label,
                        target_path: primaryCta.href,
                      }}>
                      {primaryCta.label}
                    </TrackedLink>
                  ) : null}
                  {secondaryCta ? (
                    <TrackedLink
                      className={styles.secondaryButton}
                      to={secondaryCta.href}
                      appendSourcePageParam>
                      {secondaryCta.label}
                    </TrackedLink>
                  ) : null}
                </div>
              ) : null}
              {audienceHint ? (
                <p className={styles.hintInline}>
                  <strong>适合谁先看这页：</strong>
                  {audienceHint}
                </p>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}

      <div className={styles.grid}>
        <article className={cardClassName(left.accent)}>
          <div className={badgeClassName(left.accent)}>{left.name}</div>
          <h3 className={styles.summary}>{left.summary}</h3>
          <div className={styles.list}>
            {left.bullets.map((item) => (
              <div key={`${left.name}-${item.label}`} className={styles.item}>
                <div className={styles.itemLabel}>{item.label}</div>
                <div className={styles.itemValue}>{item.value}</div>
              </div>
            ))}
          </div>
        </article>

        <article className={cardClassName(right.accent)}>
          <div className={badgeClassName(right.accent)}>{right.name}</div>
          <h3 className={styles.summary}>{right.summary}</h3>
          <div className={styles.list}>
            {right.bullets.map((item) => (
              <div key={`${right.name}-${item.label}`} className={styles.item}>
                <div className={styles.itemLabel}>{item.label}</div>
                <div className={styles.itemValue}>{item.value}</div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
