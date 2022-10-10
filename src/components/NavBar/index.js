import Translate from '@docusaurus/Translate';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import LocaleDropdownNavbarItem from '@site/src/theme/NavbarItem/LocaleDropdownNavbarItem';
import Link from '@docusaurus/Link';
import { useLocation } from '@docusaurus/router';

export default function Index(props) {
  // 菜单开关
  const [menu_Config, setMenu_Config] = useState(true);
  const [menu_Config_Drop, setMenu_Config_Drop] = useState(false);
  
  const EN_URL = useLocation().pathname.includes('/en/');
  const [language, setLanguage] = useState('/en');
  useEffect(() => {
    if (EN_URL) {
      setLanguage('/en/');
    }else{
      setLanguage('/');
    }
  });

  return (
    <div>
      <header className={`${styles.mdHeader}`}>
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
                <a href={language + 'enterprise_server'}>
                  <Translate id='navbar.enterprise'>企业版</Translate>
                </a>
              </li>
              <li>
                <div className="dropdown dropdown--hoverable">
                  <Translate id='navbar.learn'>深入</Translate>
                  <img className={styles.iconDropDown} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABUUlEQVRoge3Wr0tdcRzH4WfeKcpwCCIMBAXBIlgWFpYMppUVLUs2i9F/4SbXtrBmsmhZWVpYWrhhRVgZCBMGggiiyIZjTsO9XyZ3XO65P86P8HngE88571c7hBBCCCGEEEIYujpuK371rDE7FRjb6d5kjYAHeFeB0e23i5FeQrQe2KvA+HQHqPUakdSwX4GI9xjtNyIZw4cSIz5ifNCIZAKfSoj4jEfDikgeo1FgRAOTw45IpvClgIhDTOcVkczga44R3/Ak74hkFkc5RBxjvqiIZA7fBxx+/35godCCexZx0mVgljvFUsHb/7OMM/1HnONp4as7eIZLvUdctJ6tlOe4kj3iJ1ZKWZrBKn7pHnGNFyVtzOwlfusc8Qfrpa3r0Zrm4PaIG7wqcVdfNjSHp4i/2Cx10QC2/AvZzvNDD/N8Od5q/jXD65y/FUIIIYRQNXfPaMyAru8lkAAAAABJRU5ErkJggg=="/>
                  <ul className="dropdown__menu">
                    <li>
                      <a className={`${styles.DropDownFont} dropdown__link`} href={language + 'feature'}><Translate id='navbar.feature'>功能特性</Translate></a>
                    </li>
                    <li>
                      <a className={`${styles.DropDownFont} dropdown__link`} href={language + 'usescene'}><Translate id='navbar.usescene'>使用场景</Translate></a>
                    </li>
                    <li>
                      <a className={`${styles.DropDownFont} dropdown__link`} href={language + 'case'}><Translate id='navbar.case'>用户案例</Translate></a>
                    </li>
                    <li>
                      <a className={`${styles.DropDownFont} dropdown__link`} href={language + 'blog'}><Translate id='navbar.blog'>博客</Translate></a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a href={language + 'docs/'}>
                  <Translate id='navbar.doc'>文档</Translate>
                </a>
              </li>
              <li>
                <div className="dropdown dropdown--hoverable">
                  <Link to="https://store.goodrain.com/markets/rainbond" className={styles.StoreFont}>
                    <Translate id='navbar.appstore'>应用商店</Translate>
                  </Link>
                  <img className={styles.iconDropDown} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABUUlEQVRoge3Wr0tdcRzH4WfeKcpwCCIMBAXBIlgWFpYMppUVLUs2i9F/4SbXtrBmsmhZWVpYWrhhRVgZCBMGggiiyIZjTsO9XyZ3XO65P86P8HngE88571c7hBBCCCGEEEIYujpuK371rDE7FRjb6d5kjYAHeFeB0e23i5FeQrQe2KvA+HQHqPUakdSwX4GI9xjtNyIZw4cSIz5ifNCIZAKfSoj4jEfDikgeo1FgRAOTw45IpvClgIhDTOcVkczga44R3/Ak74hkFkc5RBxjvqiIZA7fBxx+/35godCCexZx0mVgljvFUsHb/7OMM/1HnONp4as7eIZLvUdctJ6tlOe4kj3iJ1ZKWZrBKn7pHnGNFyVtzOwlfusc8Qfrpa3r0Zrm4PaIG7wqcVdfNjSHp4i/2Cx10QC2/AvZzvNDD/N8Od5q/jXD65y/FUIIIYRQNXfPaMyAru8lkAAAAABJRU5ErkJggg=="/>
                  <ul className="dropdown__menu">
                    <li>
                      <a className={`${styles.DropDownFont} dropdown__link`} href={language + 'opensourceApps'}>
                        <Translate id='navbar.opensourceapps'>精选应用</Translate>
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a
                  className={styles.githubLogo}
                  href='https://github.com/goodrain/rainbond'
                  target='_blank'
                ></a>
              </li>
              {/* <li>
                <NavbarColorModeToggle/>
              </li> */}
              <li>
                <a className={`button button--primary ${styles.buttonQuick}`} href={language + 'docs/quick-start/getting-started'}><Translate id='navbar.quickstart'>快速开始</Translate></a>
              </li>
              <LocaleDropdownNavbarItem dropdownItemsBefore={[]} dropdownItemsAfter={[]} items={[]} />
            </ul>
          </div>
          {/* 移动端导航栏 */}
          <div
            className={styles.isMobieNav}
            style={{ display: 'none' }}
            onClick={() => {
              setMenu_Config(!menu_Config);
              setMenu_Config_Drop(!menu_Config_Drop);
            }}
          >
            {(menu_Config && <img src='/img/menu.svg' alt='' />) || (
              <img src='/img/close.svg' alt='' />
            )}
          </div>
        </nav>
      </header>
      {menu_Config_Drop && (
        <div className={styles.isMobieNavBar}>
          <ul className={styles.mobile_nav_lists}>
            <li>
              <a href='/enterprise_server'>
                <Translate>产品</Translate>
              </a>
            </li>
            <li>
              <div className="dropdown dropdown--hoverable">
                <Translate>深入</Translate>
                <img className={styles.iconDropDown} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABUUlEQVRoge3Wr0tdcRzH4WfeKcpwCCIMBAXBIlgWFpYMppUVLUs2i9F/4SbXtrBmsmhZWVpYWrhhRVgZCBMGggiiyIZjTsO9XyZ3XO65P86P8HngE88571c7hBBCCCGEEEIYujpuK371rDE7FRjb6d5kjYAHeFeB0e23i5FeQrQe2KvA+HQHqPUakdSwX4GI9xjtNyIZw4cSIz5ifNCIZAKfSoj4jEfDikgeo1FgRAOTw45IpvClgIhDTOcVkczga44R3/Ak74hkFkc5RBxjvqiIZA7fBxx+/35godCCexZx0mVgljvFUsHb/7OMM/1HnONp4as7eIZLvUdctJ6tlOe4kj3iJ1ZKWZrBKn7pHnGNFyVtzOwlfusc8Qfrpa3r0Zrm4PaIG7wqcVdfNjSHp4i/2Cx10QC2/AvZzvNDD/N8Od5q/jXD65y/FUIIIYRQNXfPaMyAru8lkAAAAABJRU5ErkJggg=="/>
                <ul className="dropdown__menu">
                  <li>
                    <a className={`${styles.DropDownFont} dropdown__link`} href="/feature">功能特性</a>
                  </li>
                  <li>
                    <a className={`${styles.DropDownFont} dropdown__link`} href="/usescene">使用场景</a>
                  </li>
                  <li>
                    <a className={`${styles.DropDownFont} dropdown__link`} href="/case">用户案例</a>
                  </li>
                  <li>
                    <a className={`${styles.DropDownFont} dropdown__link`} href="/blog">博客</a>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <a href='/docs/'>
                <Translate id='navbar.doc'>文档</Translate>
              </a>
            </li>
            <li>
              <a
                href='https://store.goodrain.com/markets/rainbond'
                target='_blank'
              >
                <Translate>应用商店</Translate>
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
