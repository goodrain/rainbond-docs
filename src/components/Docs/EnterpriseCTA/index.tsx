import React from 'react';
import Link, {ConsultationLink} from '@src/components/Analytics/TrackedLink';
import {ENTERPRISE_PAGE_ENTRY_EVENT_NAME, buildEnterprisePageEntryEventProps} from '@src/utils/consultation';
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
        开启企业级能力，免费试用 15 天，无需重新安装集群。
      </p>
      <div className={styles.divider} />
      <div className={styles.actions}>
        <Link className={styles.primaryBtn} to="/enterprise_server" eventName={ENTERPRISE_PAGE_ENTRY_EVENT_NAME} eventProps={buildEnterprisePageEntryEventProps('docs_enterprise_cta_trial', '免费试用')}>
          免费试用
        </Link>
        <ConsultationLink
          className={styles.secondaryBtn}
          entryName="docs_enterprise_cta"
          target="_blank"
          rel="noreferrer"
        >
          商业咨询
        </ConsultationLink>
      </div>
    </div>
  );
}
