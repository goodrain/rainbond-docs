import React from 'react';
import styles from './styles.module.css';

interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({ children }: PageContainerProps) {
  return (
    <div className={styles.pageContainer}>
      {children}
    </div>
  );
}
