import React from 'react';
import styles from './styles.module.css';

export default function GridDecoration() {
  return (
    <>
      <div className={styles.gridLeft} />
      <div className={styles.gridRight} />
    </>
  );
}
