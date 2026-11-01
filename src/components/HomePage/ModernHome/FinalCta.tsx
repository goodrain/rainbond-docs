import React from 'react';
import Link from '@src/components/Analytics/TrackedLink';
import styles from './styles.module.css';

export default function FinalCta() {
  return <section className={styles.finalCta}><div className={`${styles.container} ${styles.finalGrid}`}><div><h2>先部署一个真实应用，再决定是否长期使用。</h2><p>从结果开始，而不是从学习平台开始。</p></div><div><Link className={styles.inverseButton} to="/rainskills" eventName="home_rainskills_clicked" eventProps={{ module: 'home_final_cta', cta_text: '让 AI 帮我部署', target_path: '/rainskills' }}>让 AI 帮我部署</Link><Link className={styles.ghostButton} to="/docs/quick-start/quick-install" eventName="cta_install_clicked" eventProps={{ module: 'home_final_cta', cta_text: '安装 Rainbond', target_path: '/docs/quick-start/quick-install' }}>安装 Rainbond</Link></div></div></section>;
}
