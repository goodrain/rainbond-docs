import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';

interface PluginBadgeProps {
  type: 'enterprise' | 'open-source';
}

const config = {
  enterprise: {
    icon: (
      <svg className={styles.icon} viewBox="0 0 16 16" fill="none">
        <path
          d="M11.5 7H11V5a3 3 0 0 0-6 0v2h-.5A1.5 1.5 0 0 0 3 8.5v5A1.5 1.5 0 0 0 4.5 15h7a1.5 1.5 0 0 0 1.5-1.5v-5A1.5 1.5 0 0 0 11.5 7ZM6 5a2 2 0 1 1 4 0v2H6V5Zm3 7.5a1 1 0 1 1-2 0v-2a1 1 0 1 1 2 0v2Z"
          fill="currentColor"
        />
      </svg>
    ),
    label: '企业版插件',
    desc: '该功能为企业版专属，可免费试用 30 天',
    linkText: '了解企业版 →',
    linkTo: '/enterprise_server',
    className: styles.enterprise,
  },
  'open-source': {
    icon: (
      <svg className={styles.icon} viewBox="0 0 16 16" fill="none">
        <path
          d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1Zm3.354 5.354-4 4a.5.5 0 0 1-.708 0l-2-2a.5.5 0 1 1 .708-.708L7 9.293l3.646-3.647a.5.5 0 0 1 .708.708Z"
          fill="currentColor"
        />
      </svg>
    ),
    label: '开源插件',
    desc: '该插件完全开源，可直接启用',
    linkText: null,
    linkTo: null,
    className: styles.openSource,
  },
};

export default function PluginBadge({ type }: PluginBadgeProps): JSX.Element {
  const { icon, label, desc, linkText, linkTo, className } = config[type];

  return (
    <div className={`${styles.banner} ${className}`}>
      <div className={styles.content}>
        <span className={styles.label}>
          {icon}
          {label}
        </span>
        <span className={styles.desc}>{desc}</span>
      </div>
      {linkText && linkTo && (
        <Link className={styles.link} to={linkTo}>
          {linkText}
        </Link>
      )}
    </div>
  );
}
