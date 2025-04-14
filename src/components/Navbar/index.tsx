import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import clsx from 'clsx';
import { Button } from '@douyinfe/semi-ui';
import { IconArticle, IconGithubLogo } from '@douyinfe/semi-icons';

export default function Navbar() {
  const [starCount, setStarCount] = useState<string>('');

  useEffect(() => {
    fetch('https://api.github.com/repos/goodrain/rainbond')
      .then(response => response.json())
      .then(data => {
        const stars = data.stargazers_count;
        setStarCount(stars >= 1000 ? `${(stars / 1000).toFixed(1)}k` : String(stars));
      })
      .catch(() => setStarCount(''));
  }, []);

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
        
        <a
        href="https://github.com/goodrain/rainbond" 
        target="_blank" 
        rel="noopener noreferrer"
        className={styles.github_button}
        >
          <IconGithubLogo className={styles.github_icon} size="large"/>
          <span className={styles.github_text}>Star</span>
          {starCount && <span className={styles.star_count}>{starCount}</span>}
        </a>
      </div>
    </nav>
  );
} 