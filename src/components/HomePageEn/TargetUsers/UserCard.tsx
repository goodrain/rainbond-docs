import React from 'react';
import styles from './styles.module.scss';

interface UserCardProps {
  title: string;
  icon: string;
  needs: string[];
  useCases: string[];
}

const UserCard: React.FC<UserCardProps> = ({ title, icon, needs, useCases }) => {
  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <span className={styles.icon}>{icon}</span>
        <h3 className={styles.title}>{title}</h3>
      </div>
      
      <div className={styles.content}>
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Needs</h4>
          <ul className={styles.list}>
            {needs.map((need, index) => (
              <li key={index} className={styles.listItem}>
                {need}
              </li>
            ))}
          </ul>
        </div>
        
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>Use Cases</h4>
          <ul className={styles.list}>
            {useCases.map((useCase, index) => (
              <li key={index} className={styles.listItem}>
                {useCase}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserCard; 