import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import { Button } from '@douyinfe/semi-ui';
import Link from '@docusaurus/Link';
import { IconBolt, IconFile } from '@douyinfe/semi-icons';

export default function Home() {

  return (
    <div className={clsx('container', styles.container)}>
      <div className={clsx(styles.hero_title, 'row')}>
        <div className='col col--12'>
          <p className={styles.hero_title_one}>No need to learn Kubernetes</p>
          <p className={styles.hero_title_two}>Manage enterprise apps like mobile apps</p>
          <div className={styles.hero_title_three_div}>
            <p className={styles.hero_title_three}>Rainbond = Heroku-like Experience + Native Kubernetes Support + Self-hosted Capabilities</p>
          </div>
          <p className={styles.hero_title_four}>Rainbond is 100% open-source, offers a serverless experience, and allows you to easily manage containerized applications without needing to understand Kubernetes.</p>
        </div>
      </div>
      <div className={clsx(styles.hero_button, 'row')}>
        <div className='col col--12'>
          <Link to="/docs/quick-start/quick-install">
            <Button theme='solid' type='primary' icon={<IconBolt />} size='large' className={clsx(styles.hero_button_style, styles.hero_button_style_left)}>
              Get Started
            </Button>
          </Link>
          <Link to="/docs">
            <Button theme='outline' type='tertiary' icon={<IconFile />} size='large' className={styles.hero_button_style}>
              Documentation
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
