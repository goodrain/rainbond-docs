import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import TrackedLink from '@src/components/Analytics/TrackedLink';

export default function Home() {

  return (
    <div className={clsx('container', styles.container)}>
      <div className={styles.hero_title}>
        {/* 标签 */}
        <div className={styles.hero_badge}>
          100%开源，核心功能永久免费
        </div>

        {/* 标题部分 */}
        <h1 className={styles.hero_title_one}>不用懂 Kubernetes 的</h1>
        <h1 className={styles.hero_title_two}>开源容器平台</h1>
        <p className={styles.hero_title_four}>底层基于 Kubernetes，屏蔽复杂性，让团队更容易交付和管理应用，像安装手机 App 一样简单。</p>

        {/* 按钮区块 */}
        <div className={styles.hero_button}>
          <TrackedLink
            to="/docs/quick-start/quick-install"
            className={`${styles.hero_button_style} ${styles.hero_button_primary}`}
            eventName="cta_home_install_clicked"
            eventProps={{
              module: 'home_hero',
              cta_text: '3 分钟体验安装',
              target_path: '/docs/quick-start/quick-install',
            }}>
            3 分钟安装体验
          </TrackedLink>

          <TrackedLink
            to="/docs"
            className={`${styles.hero_button_style} ${styles.hero_button_secondary}`}
            eventName="cta_docs_clicked"
            eventProps={{
              module: 'home_hero',
              cta_text: '了解 Rainbond',
              target_path: '/docs',
            }}>
            了解 Rainbond
          </TrackedLink>
        </div>

        {/* 统计信息区块 */}
        <div className={styles.hero_stats_row}>
          <div className={styles.hero_stat_item}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
            <span>Github star 6k+</span>
          </div>
          <div className={styles.hero_stat_item}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            <span>下载安装 10M+</span>
          </div>
          <div className={styles.hero_stat_item}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
            <span>生产用户 10000+</span>
          </div>
        </div>
      </div>
    </div>
  );
}
