import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { Card } from '@douyinfe/semi-ui';
import { IconServer, IconCode, IconTerminal, IconApps, IconPriceTag } from '@douyinfe/semi-icons';

export default function CardList() {
  return (
    <div className={clsx('container', styles.container_two)}>
      <div className='row'>
        <div className={clsx(styles.core_capabilities, 'col col--12')}>
          <p className={styles.core_capabilities_title}>Core Capabilities</p>
          <p className={styles.core_capabilities_description}>Rainbond provides a complete application management platform with enterprise-grade features</p>
        </div>
      </div>
      <div className='row'>
        <div className={clsx(styles.core_capabilities_card, 'col col--4')}>
          <Card 
            shadows='hover'
            header={
              <div className={styles.core_capabilities_card_header}>
                <IconServer size='extra-large' className={styles.core_capabilities_card_header_icon}/>
                <p className={styles.core_capabilities_card_header_title}>
                  Install Enterprise Software Like Mobile Apps
                </p>
              </div>
            }
            className={styles.core_capabilities_card_style}
          >
            <p className={styles.core_capabilities_card_description}>
              Through the built-in application marketplace, various published microservice application templates support one-click installation and upgrades, even for systems with 100+ microservices.
            </p>
          </Card>
        </div>
        <div className={clsx(styles.core_capabilities_card, 'col col--4')}>
          <Card 
            shadows='hover'
            header={
              <div className={styles.core_capabilities_card_header}>
                <IconCode size='extra-large' className={styles.core_capabilities_card_header_icon}/>
                <p className={styles.core_capabilities_card_header_title}>
                  Containerization Without Dockerfile and YAML
                </p>
              </div>
            }
            className={styles.core_capabilities_card_style}
          >
            <p className={styles.core_capabilities_card_description}>
              The platform automatically recognizes multiple development languages like Java, Python, Golang, NodeJS, PHP, .NetCore, etc., completing build and deployment through a wizard-like process.
            </p>
          </Card>
        </div>
        <div className={clsx(styles.core_capabilities_card, 'col col--4')}>
          <Card 
            shadows='hover'
            header={
              <div className={styles.core_capabilities_card_header}>
                <IconTerminal size='extra-large' className={styles.core_capabilities_card_header_icon}/>
                <p className={styles.core_capabilities_card_header_title}>
                  Full Application Lifecycle Management
                </p>
              </div>
            }
            className={styles.core_capabilities_card_style}
          >
            <p className={styles.core_capabilities_card_description}>
              Serverless experience where regular developers can manage and maintain applications and components without learning, including start, stop, build, update, auto-scaling, gateway policy management, etc.
            </p>
          </Card>
        </div>
        <div className={clsx(styles.core_capabilities_card, 'col col--4')}>
          <Card 
            shadows='hover'
            header={
              <div className={styles.core_capabilities_card_header}>
                <IconApps size='extra-large' className={styles.core_capabilities_card_header_icon}/>
                <p className={styles.core_capabilities_card_header_title}>
                  Microservice Modular Assembly
                </p>
              </div>
            }
            className={styles.core_capabilities_card_style}
          >
            <p className={styles.core_capabilities_card_description}>
              Business components running on Rainbond support modular dependency orchestration, one-click publishing as reusable application templates, enabling business component accumulation and reuse.
            </p>
          </Card>
        </div>
        <div className={clsx(styles.core_capabilities_card, 'col col--4')}>
          <Card 
            shadows='hover'
            header={
              <div className={styles.core_capabilities_card_header}>
                <IconPriceTag size='extra-large' className={styles.core_capabilities_card_header_icon}/>
                <p className={styles.core_capabilities_card_header_title}>
                  Standardized Offline Delivery
                </p>
              </div>
            }
            className={styles.core_capabilities_card_style}
          >
            <p className={styles.core_capabilities_card_description}>
              Packages applications with all dependencies (including container images) into version-controlled bundles, enabling secure cross-environment deployment through physical media transfer and automatic integrity verification.
            </p>
          </Card>
        </div>
        <div className={clsx(styles.core_capabilities_card, 'col col--4')}>
          <Card 
            shadows='hover'
            header={
              <div className={styles.core_capabilities_card_header}>
                <IconServer size='extra-large' className={styles.core_capabilities_card_header_icon}/>
                <p className={styles.core_capabilities_card_header_title}>
                  Multi-team Resource Governance
                </p>
              </div>
            }
            className={styles.core_capabilities_card_style}
          >
            <p className={styles.core_capabilities_card_description}>
              Expands infrastructure by integrating existing servers into unified clusters, creates isolated team spaces with role-based access control and resource quotas.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}