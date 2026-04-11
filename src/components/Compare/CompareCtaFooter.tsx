import React from 'react';
import styles from './compareDocBlocks.module.css';
import TrackedLink from '@src/components/Analytics/TrackedLink';

type LinkItem = {
  href: string;
  note: string;
};

type Props = {
  caseLink: LinkItem;
  sceneLink: LinkItem;
  installLink?: LinkItem & {
    label: string;
  };
};

const INSTALL_LINK = '/docs/quick-start/quick-install';

export default function CompareCtaFooter({caseLink, sceneLink, installLink}: Props): JSX.Element {
  const resolvedInstallLink = installLink || {
    href: INSTALL_LINK,
    label: '查看快速安装',
    note: '2-3 分钟完成基础环境启动，尽快进入验证。',
  };

  return (
    <section className={styles.ctaWrap}>
      <h2 className={styles.ctaTitle}>下一步动作</h2>
      <p className={styles.ctaDesc}>
        如果你已经大致判断 Rainbond 更适合自己，不要停在“看懂了”这一步，直接进入试用、安装、案例和场景验证。
      </p>
      <div className={styles.ctaGrid}>
        <TrackedLink
          className={styles.ctaCard}
          to={resolvedInstallLink.href}
          eventName="cta_install_clicked"
          eventProps={{
            module: 'compare_page_footer',
            cta_text: resolvedInstallLink.label,
            target_path: resolvedInstallLink.href,
          }}>
          <div className={styles.ctaLabel}>{resolvedInstallLink.label}</div>
          <div className={styles.ctaNote}>{resolvedInstallLink.note}</div>
        </TrackedLink>
        <TrackedLink className={styles.ctaCard} to={sceneLink.href}>
          <div className={styles.ctaLabel}>查看相关场景方案</div>
          <div className={styles.ctaNote}>{sceneLink.note}</div>
        </TrackedLink>
      </div>
    </section>
  );
}
