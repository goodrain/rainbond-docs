import React from 'react';
import styles from './styles.module.css';
import { Card } from '@douyinfe/semi-ui';
import { IconServer, IconDesktop, IconLink } from '@douyinfe/semi-icons';
import clsx from 'clsx';
import CodeBlock from '@theme/CodeBlock';
import { Button } from '@douyinfe/semi-ui';

const CpuIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <rect width="16" height="16" x="4" y="4" rx="2"></rect>
    <rect width="6" height="6" x="9" y="9" rx="1"></rect>
    <path d="M15 2v2"></path>
    <path d="M15 20v2"></path>
    <path d="M2 15h2"></path>
    <path d="M2 9h2"></path>
    <path d="M20 15h2"></path>
    <path d="M20 9h2"></path>
    <path d="M9 2v2"></path>
    <path d="M9 20v2"></path>
  </svg>
);

const TerminalIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <polyline points="4 17 10 11 4 5"></polyline>
    <line x1="12" y1="19" x2="20" y2="19"></line>
  </svg>
);

export default function GettingStarted() {
  return (
    <div className={clsx('container', styles.container)}>
      <div className='row'>
        <div className='col col--12'>
          <p className={styles.title}>Getting Started</p>
          <p className={styles.subtitle}>3-Minute Quick Installation</p>
        </div>
      </div>
      <div className='row'>
        <div className={clsx(styles.card_wrapper, 'col col--12')}>
          <Card className={styles.card}>
            <div className={styles.gradient_bg}></div>
            <div className={styles.card_header}>
              <div className={styles.header_content}>
                <div className={styles.icon_wrapper}>
                  <IconServer className={styles.card_header_icon}/>
                </div>
                <div>
                  <h3 className={styles.card_header_title}>
                    Minimum Requirements
                  </h3>
                  <p className={styles.card_description}>
                    Hardware and software needed to run Rainbond
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.card_content}>
              <ul className={styles.requirements}>
                <li className={styles.requirement}>
                  <div className={styles.icon_wrapper}>
                    <IconDesktop className={styles.requirement_icon} />
                  </div>
                  <div>
                    <p className={styles.requirement_title}>Linux OS (CentOS 7+/Ubuntu 18.04+)</p>
                    <p className={styles.requirement_desc}>Compatible with most modern Linux distributions</p>
                  </div>
                </li>

                <li className={styles.requirement}>
                  <div className={styles.icon_wrapper}>
                    <CpuIcon />
                  </div>
                  <div>
                    <p className={styles.requirement_title}>2 CPU cores / 8GB RAM / 50GB disk space</p>
                    <p className={styles.requirement_desc}>Recommended for development environments</p>
                  </div>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        <div className={clsx(styles.card_wrapper, 'col col--12', styles.mt_4)}>
          <Card className={styles.card}>
            <div className={styles.gradient_bg_purple}></div>
            <div className={styles.card_header}>
              <div className={styles.header_content}>
                <div className={clsx(styles.icon_wrapper, styles.icon_wrapper_purple)}>
                  <TerminalIcon />
                </div>
                <div>
                  <h3 className={styles.card_header_title}>
                    Installation Command
                  </h3>
                  <p className={styles.card_description}>
                    One-line command to install Rainbond
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.card_content}>
              <CodeBlock language="bash">
                curl -o install.sh https://get.rainbond.com && IMGHUB_MIRROR=rainbond bash ./install.sh
              </CodeBlock>
              <p className={styles.note}>
                After the command is executed successfully, open a browser and enter{' '}
                <code className={styles.inline_code}>
                  http://{'<IP>'}:7070
                </code>{' '}
                to access the platform and start deploying applications.
              </p>
            </div>

            <div className={styles.card_footer}>
              <a href="/docs/quick-start/quick-install">
                <Button icon={<IconLink />} theme="solid" style={{ marginRight: 10 }} size='large'>View Full Installation Guide</Button>
              </a>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
