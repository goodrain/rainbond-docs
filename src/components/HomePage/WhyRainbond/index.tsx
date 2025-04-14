import React, { useState } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

export default function CardList() {
  const [activeTab, setActiveTab] = useState('DeveloperPerspective');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const checkIcon = () => {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="check-icon">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>
    )
  }

  return (
    <div className={clsx('container', styles.container)}>
      <div className='row'>
        <div className={clsx(styles.title_col, 'col col--12')}>
          <p className={styles.title}>Why Rainbond?</p>
          <p className={styles.description}>Rainbond provides a complete application management platform with enterprise-grade features</p>
        </div>
      </div>
      <div className='row'>
        <div className={clsx(styles.tabs_col, 'col col--12')}>
          <ul className="tabs tabs--block">
            <li 
              className={clsx("tabs__item", { "tabs__item--active": activeTab === 'DeveloperPerspective' }, styles.tab_item)}
              onClick={() => handleTabClick('DeveloperPerspective')}
            >
              Developer Perspective
            </li>
            <li 
              className={clsx("tabs__item", { "tabs__item--active": activeTab === 'OpsPlatformAdminPerspective' }, styles.tab_item)}
              onClick={() => handleTabClick('OpsPlatformAdminPerspective')}
            >
              Ops/Platform Admin Perspective
            </li>
          </ul>
          <div className={styles.tab_content}>
            {activeTab === 'DeveloperPerspective' && (
              <div>
                <p className={styles.content_title}>Developer Pain Points Solved</p>
                <div className={styles.content_item}>
                  {checkIcon()}
                  <span>
                    "I need to deploy a system with 20 microservices, but don't want to study K8s configs for each component"
                  </span>
                </div>
                <div className={styles.content_item}>
                  {checkIcon()}
                  <span>
                    "The configuration differences between production and test environments make every deployment risky"
                  </span>
                </div>
                <div className={styles.content_item}>
                  {checkIcon()}
                  <span>
                    "How to quickly deliver complex systems in customer's offline environment?"
                  </span>
                </div>
              </div>
            )}
            {activeTab === 'OpsPlatformAdminPerspective' && (
              <div>
              <p className={styles.content_title}>Ops/Platform Admin Pain Points Solved</p>
              <div className={styles.content_item}>
                {checkIcon()}
                <span>
                  "Need to give developers autonomy while ensuring cluster stability"
                </span>
              </div>
              <div className={styles.content_item}>
                {checkIcon()}
                <span>
                  "Traditional application cloud-native transformation costs too much"
                </span>
              </div>
              <div className={styles.content_item}>
                {checkIcon()}
                <span>
                  "Unified application management across multi/hybrid cloud environments"
                </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}