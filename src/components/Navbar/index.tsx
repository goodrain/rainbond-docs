import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import clsx from 'clsx';
import { Button } from '@douyinfe/semi-ui';
import { IconArticle, IconGithubLogo } from '@douyinfe/semi-icons';


export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.homeLink}>
        <img src="/img/rainbond.png" alt="Rainbond Logo" className={styles.logo} />
      </Link>
      
      <div className={styles.divider} />
      
      <div className={styles.nav}>
        <Link to="/docs" className={styles.navLink}>
          <span className={styles.navLinkText}>Documentation</span>
        </Link>
        
        <Link to="https://github.com/goodrain/rainbond" className={styles.navLink}>
          <IconGithubLogo size="large"/>
        </Link>
      </div>
    </nav>
  );
} 