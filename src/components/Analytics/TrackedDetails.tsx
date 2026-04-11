import React from 'react';
import {trackUmamiEvent} from '@src/utils/umami';
import styles from './styles.module.css';

type TrackedDetailsProps = {
  summary: string;
  section: string;
  children: React.ReactNode;
};

export default function TrackedDetails({
  summary,
  section,
  children,
}: TrackedDetailsProps): JSX.Element {
  const handleToggle = (event: React.SyntheticEvent<HTMLDetailsElement>) => {
    if (event.currentTarget.open) {
      trackUmamiEvent('install_prereq_viewed', {section});
    }
  };

  return (
    <details className={styles.trackedDetails} onToggle={handleToggle}>
      <summary className={styles.detailSummary}>{summary}</summary>
      <div className={styles.detailBody}>{children}</div>
    </details>
  );
}
