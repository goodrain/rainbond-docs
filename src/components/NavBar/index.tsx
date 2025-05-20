import React, { useEffect, useState } from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import clsx from 'clsx';
import { Button, Dropdown, HotKeys } from '@douyinfe/semi-ui';
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
        <div className={styles.navLink}>
          <Dropdown
            position="bottomLeft"
            render={
              <Dropdown.Menu>
                <Link to="/xinchuang" className={styles.dropdownItem}>
                  <Dropdown.Item>
                    信创
                  </Dropdown.Item>
                </Link>
                <Link to="/feature/devops" className={styles.dropdownItem}>
                  <Dropdown.Item>
                    一体化DevOps
                  </Dropdown.Item>
                </Link>
                <Link to="/feature/multi-cluster" className={styles.dropdownItem}>
                  <Dropdown.Item>
                    K8s 多集群管理
                  </Dropdown.Item>
                </Link>
                <Link to="/feature/service-mesh" className={styles.dropdownItem}>
                  <Dropdown.Item>
                    开箱即用的微服务治理
                  </Dropdown.Item>                   
                </Link>  
                <Link to="/feature/app-ops" className={styles.dropdownItem}>
                  <Dropdown.Item>
                    自动化应用运维
                  </Dropdown.Item>                   
                </Link>                   
              </Dropdown.Menu>
            }
            >
            <Button theme="borderless" type="tertiary" icon={<IconGallery />}>
              功能特性
            </Button>
          </Dropdown>
        </div>
        <div className={styles.navLink}>
          <Dropdown
            position="bottomLeft"
            render={
              <Dropdown.Menu>
                <Link to="/usescene" className={styles.dropdownItem}>
                  <Dropdown.Item>
                    使用场景
                  </Dropdown.Item>
                </Link>
                <Link to="/case" className={styles.dropdownItem}>
                  <Dropdown.Item>
                    用户案例
                  </Dropdown.Item>
                </Link>
                <Link to="/blog" className={styles.dropdownItem}>
                  <Dropdown.Item>
                    博客
                  </Dropdown.Item>
                </Link>
                <Link to="/docs/Intro" className={styles.dropdownItem}>
                  <Dropdown.Item>
                    OpenAPI
                  </Dropdown.Item>                   
                </Link>
              </Dropdown.Menu>
            }
            >
            <Button theme="borderless" type="tertiary" icon={<IconLayers />}>
              深入
            </Button>
          </Dropdown>
        </div>
        <div className={styles.navLink}>
          <Link to="/enterprise_server">
            <Button theme="borderless" type="tertiary" icon={<IconApartment />}>
              企业版
            </Button>
          </Link>
        </div>
        <div className={styles.navLink}>
          <Link to="/marketplace">
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