import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import { Button } from '@douyinfe/semi-ui';
import { IconFile, IconGallery, IconBox, IconForward, IconGithubLogo, IconLayers, IconSetting, IconApartment, IconApps } from '@douyinfe/semi-icons';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.homeLink}>
        <img src="/img/rainbond.png" alt="Rainbond Logo" className={styles.logo} />
      </Link>
      
      <div className={styles.divider} />
      
      <div className={styles.nav}>
        <div className={styles.navLink}>
          <Link to="/docs">
            <Button theme="borderless" type="tertiary" icon={<IconFile />}>
              文档
            </Button>
          </Link>
        </div>
        {/* <div className={styles.navLink}>
          <div className={styles.dropdown}>
            <Button 
              theme="borderless" 
              type="tertiary" 
              icon={<IconGallery />}
            >
              功能特性
            </Button>
            <div className={styles.dropdownMenu}>
              <Link to="/xinchuang" className={styles.dropdownItem}>
                信创
              </Link>
              <Link to="/feature/devops" className={styles.dropdownItem}>
                一体化DevOps
              </Link>
              <Link to="/feature/multi-cluster" className={styles.dropdownItem}>
                K8s 多集群管理
              </Link>
              <Link to="/feature/service-mesh" className={styles.dropdownItem}>
                开箱即用的微服务治理
              </Link>
              <Link to="/feature/app-ops" className={styles.dropdownItem}>
                自动化应用运维
              </Link>
            </div>
          </div>
        </div> */}
        <div className={styles.navLink}>
          <div className={styles.dropdown}>
            <Button 
              theme="borderless" 
              type="tertiary" 
              icon={<IconLayers />}
            >
              深入
            </Button>
            <div className={styles.dropdownMenu}>
              <Link to="/usescene" className={styles.dropdownItem}>
                使用场景
              </Link>
              <Link to="/case" className={styles.dropdownItem}>
                用户案例
              </Link>
              <Link to="/blog" className={styles.dropdownItem}>
                博客
              </Link>
              <Link to="/docs/Intro" className={styles.dropdownItem}>
                OpenAPI
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.navLink}>
          <Link to="/enterprise_server">
            <Button theme="borderless" type="tertiary" icon={<IconApartment />}>
              企业版
            </Button>
          </Link>
        </div>
        <div className={styles.navLink}>
          <Link to="https://hub.grapps.cn">
            <Button theme="borderless" type="tertiary" icon={<IconApps />}>
              应用商店
            </Button>
          </Link>
        </div>
        <a
          href="https://github.com/goodrain/rainbond" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.github_button}
        >
          <IconGithubLogo className={styles.github_icon} size="large"/>
        </a>
      </div>
    </nav>
  );
} 