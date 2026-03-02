import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

export default function EnterpriseCTA(): JSX.Element {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <svg className={styles.icon} viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5Zm-1 12.5h2v2h-2v-2Zm0-8h2v6h-2v-6Z"
            fill="currentColor"
          />
        </svg>
        <h3 className={styles.title}>获取企业版</h3>
      </div>
      <p className={styles.description}>
        开启企业级能力，免费试用 30 天，无需重新安装集群。体验 GPU 管理、安全审计等高级功能。
      </p>
      <div className={styles.divider} />
      <div className={styles.actions}>
        <Link className={styles.primaryBtn} to="/enterprise_server">
          <svg className={styles.btnIcon} viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm3.25 7.5H8.5v2.75a.5.5 0 0 1-1 0V8.5H4.75a.5.5 0 0 1 0-1H7.5V4.75a.5.5 0 0 1 1 0V7.5h2.75a.5.5 0 0 1 0 1Z"
              fill="currentColor"
            />
          </svg>
          免费试用
        </Link>
        <Link
          className={styles.secondaryBtn}
          to="https://rainbond.feishu.cn/share/base/shrcnv2iqnRsNJM6Y3hN5VhTJvg"
        >
          <svg className={styles.btnIcon} viewBox="0 0 16 16" fill="none">
            <path
              d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5ZM10 4V1L13 4h-3ZM5 8.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5Zm0 2a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5Z"
              fill="currentColor"
            />
          </svg>
          商业咨询
        </Link>
      </div>
    </div>
  );
}
