import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  noBorder?: boolean;
  style?: React.CSSProperties;
}

export default function Section({ children, className, noBorder = false, style }: SectionProps) {
  return (
    <section className={clsx(styles.section, !noBorder && styles.sectionBorder, className)} style={style}>
      {children}
    </section>
  );
}
