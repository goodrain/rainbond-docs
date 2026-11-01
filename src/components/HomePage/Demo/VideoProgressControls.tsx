import React from 'react';
import clsx from 'clsx';
import type { LucideIcon } from 'lucide-react';
import styles from './styles.module.css';
import { trackUmamiEvent } from '@src/utils/umami';

interface VideoProgressItem {
  key: string;
  title: string;
  icon: LucideIcon;
}

interface VideoProgressControlsProps {
  items: readonly VideoProgressItem[];
  activeKey: string;
  label: string;
  className?: string;
  onChange: (key: string) => void;
  fillRef: (key: string, node: HTMLSpanElement | null) => void;
}

export default function VideoProgressControls({ items, activeKey, label, className, onChange, fillRef }: VideoProgressControlsProps) {
  return (
    <div className={clsx(styles.moduleControls, className)} aria-label={label} style={{ '--module-count': items.length } as React.CSSProperties}>
      {items.map(({ key, title, icon: Icon }) => (
        <button key={key} type="button" className={clsx(styles.moduleButton, key === activeKey && styles.moduleButtonActive)} onClick={() => { if (key !== activeKey) trackUmamiEvent('home_demo_step_selected', { module: 'home_demo', scenario: label, step: key, step_title: title }); onChange(key); }} aria-current={key === activeKey ? 'step' : undefined}>
          <span className={styles.moduleProgress} aria-hidden="true"><span ref={node => fillRef(key, node)} className={styles.moduleProgressFill} /></span>
          <span className={styles.moduleButtonContent}><Icon className={styles.moduleIcon} aria-hidden="true" /><span className={styles.moduleButtonLabel}>{title}</span></span>
        </button>
      ))}
    </div>
  );
}
