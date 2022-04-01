import Translate from '@docusaurus/Translate';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
export default function Index(props) {
  // 菜单开关
  const [menu_Config, setMenu_Config] = useState(true);
  useEffect(() => {
    // 注册页面滚动事件
    window.addEventListener('scroll', handleScrollPage);
    return () => {
      window.removeEventListener('scroll', handleScrollPage);
    };
  }, []);
  //   头部NavBar滚动
  const handleScrollPage = () => {
    let scrollTop = document.documentElement.scrollTop;
    const nav_scroll = document.querySelector('.mdHeader'); //导航栏
    // 头部tab
    if (scrollTop > 0) {
      nav_scroll.classList.add('nav_scroll_bar');
    } else {
      nav_scroll.classList.remove('nav_scroll_bar');
    }
  };
  return (
    <div>
      <header className={`${styles.mdHeader} mdHeader`}>
        {/* 导航栏 */}
        <nav className={`${styles.nav_bar} ${styles.width}`}>
          {/* 左侧logo */}
          <a className={styles.left_logo} href='/'>
            <img src='/img/rainbondlog.png'></img>
          </a>
          {/* 右侧列表 */}
          <div className={styles.nav_container}>
            <ul className={styles.nav_lists}>
              <li>
                <a href='/docs/'>
                  <Translate>Rainbond是什么?</Translate>
                </a>
              </li>
              <li>
                <a href='/enterprise_server'>
                  <Translate>产品</Translate>
                </a>
              </li>
              <li>
                <a href='/docs/quick-start/get-start/'>
                  <Translate>文档</Translate>
                </a>
              </li>
              <li>
                <a href='/docs/quick-start/quick-install'>
                  <Translate>快速开始</Translate>
                </a>
              </li>
              <li>
                <a href='/useScene'>
                  <Translate>使用场景</Translate>
                </a>
              </li>
              <li>
                <a href='/case'>
                  <Translate>案例</Translate>
                </a>
              </li>
              <li>
                <a href='/blog'>
                  <Translate>博客</Translate>
                </a>
              </li>
              <li>
                <a
                  className={styles.githubLogo}
                  href='https://github.com/goodrain/rainbond'
                  target='_blank'
                ></a>
              </li>
            </ul>
          </div>
          {/* 移动端导航栏 */}
          <div
            className={styles.isMobieNav}
            style={{ display: 'none' }}
            onClick={() => {
              setMenu_Config(!menu_Config);
            }}
          >
            {(menu_Config && <img src='/img/menu.svg' alt='' />) || (
              <img src='/img/close.svg' alt='' />
            )}
          </div>
        </nav>
      </header>
      {!menu_Config && (
        <div className={styles.isMobieNavBar}>
          <ul className={styles.mobile_nav_lists}>
            <li>
              <a href='/docs/'>
                <Translate>Rainbond是什么?</Translate>
              </a>
            </li>
            <li>
              <a href='/enterprise_server'>
                <Translate>产品</Translate>
              </a>
            </li>
            <li>
              <a href='/docs/quick-start/get-start/'>
                <Translate>文档</Translate>
              </a>
            </li>
            <li>
              <a href='/docs/quick-start/quick-install'>
                <Translate>快速开始</Translate>
              </a>
            </li>
            <li>
              <a href='/useScene'>
                <Translate>使用场景</Translate>
              </a>
            </li>
            <li>
              <a href='/case'>
                <Translate>案例</Translate>
              </a>
            </li>
            <li>
              <a href='/blog'>
                <Translate>博客</Translate>
              </a>
            </li>
            <li>
              <a
                className={styles.githubLogo}
                href='https://github.com/goodrain/rainbond'
                target='_blank'
              ></a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
