import React from 'react';
import Link from '@docusaurus/Link';
import styles from './styles.module.css';
import axios from 'axios';
import { IconGithubLogo } from '@douyinfe/semi-icons';

// 下拉箭头 SVG 组件
const DropdownArrow = () => (
  <svg className={styles.dropdownArrow} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.5 6.25L8 9.75L11.5 6.25" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Navbar() {
  const handleOnClickLinkRainbondCloud = () => {
    axios({
      method: 'get',
      url: 'https://run.rainbond.com/console/user_source',
      params: {
        content: 'rainbond',
        sms_type: 'rainbond',
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
    window.open('https://run.rainbond.com/#/user/login?link=rainbond')
  }

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContent}>
        {/* 左侧区域 */}
        <div className={styles.navbarLeft}>
          <Link href="/" className={styles.homeLink}>
            <img src="/img/rainbondlog.png" alt="Rainbond Logo" className={styles.logo} />
          </Link>

          <div className={styles.nav}>
            <Link to="/docs" className={styles.navLink}>
              文档
            </Link>

            <div className={styles.dropdown}>
              <div className={styles.dropdownTrigger}>
                <span>深入</span>
                <DropdownArrow />
              </div>
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

            <Link to="/enterprise_server" className={styles.navLink}>
              企业版
            </Link>

            <a onClick={handleOnClickLinkRainbondCloud} className={styles.navLink}>
              云服务
            </a>

            <Link to="https://hub.grapps.cn" className={styles.navLink}>
              应用商店
            </Link>
          </div>
        </div>

        {/* 右侧区域 */}
        <div className={styles.navbarRight}>
          <a
            href="https://github.com/goodrain/rainbond"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.github_button}
          >
            <IconGithubLogo size="extra-large" className={styles.github_icon} />
          </a>
          <Link to="/docs/quick-start/quick-install" className={`${styles.github_button} ${styles.primaryButton}`}>
            立即使用
          </Link>
        </div>
      </div>
    </nav>
  );
} 