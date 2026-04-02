import React from 'react';
import Link from '@docusaurus/Link';
import styles from './compareDocBlocks.module.css';

type LinkItem = {
  href: string;
  note: string;
};

type Props = {
  caseLink: LinkItem;
  sceneLink: LinkItem;
};

const INSTALL_LINK = '/docs/quick-start/quick-install';

export default function CompareCtaFooter({caseLink, sceneLink}: Props): JSX.Element {
  return (
    <section className={styles.ctaWrap}>
      <h2 className={styles.ctaTitle}>下一步动作</h2>
      <p className={styles.ctaDesc}>
        如果你已经大致判断 Rainbond 更适合自己，不要停在“看懂了”这一步，直接进入试用、安装、案例和场景验证。
      </p>
      <div className={styles.ctaGrid}>
        <Link className={styles.ctaCard} to={INSTALL_LINK}>
          <div className={styles.ctaLabel}>查看快速安装</div>
          <div className={styles.ctaNote}>2-3 分钟完成基础环境启动，尽快进入验证。</div>
        </Link>
        <Link className={styles.ctaCard} to={sceneLink.href}>
          <div className={styles.ctaLabel}>查看相关场景方案</div>
          <div className={styles.ctaNote}>{sceneLink.note}</div>
        </Link>
      </div>
    </section>
  );
}
