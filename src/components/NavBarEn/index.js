import Translate from '@docusaurus/Translate';
import React, { useEffect, useState } from 'react';
import styles from './index.module.scss';
import NavbarColorModeToggle from '@theme/Navbar/ColorModeToggle';
import LocaleDropdownNavbarItem from '@theme/NavbarItem/LocaleDropdownNavbarItem';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import AnnouncementBar from '@theme/AnnouncementBar';

export default function Index(props) {
  // 菜单开关
  const [menu_Config, setMenu_Config] = useState(true);
  const [menu_Config_Drop, setMenu_Config_Drop] = useState(false);

  return (
    <div>
      <header className={`${styles.mdHeader}`}>
        <AnnouncementBar />
        {/* 导航栏 */}
        <nav className={`${styles.nav_bar} ${styles.width}`}>
          {/* 左侧logo */}
          <Link className={styles.left_logo} href='/'>
            <img src='/img/rainbondlog.png'></img>
          </Link>
          {/* 右侧列表 */}
          <div className={styles.nav_container}>
            <ul className={styles.nav_lists}>
              <li>
                <Link to="/docs/">
                  <Translate id='navbar.doc'>
                    Docs
                  </Translate>
                </Link>
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
              {/* <li>
                <Link to="/docs/quick-start/getting-started" className={clsx("button button--primary", styles.buttonQuick)}>
                  <Translate id='navbar.quickstart'>
                    快速开始
                  </Translate>
                </Link>
              </li> */}
              <LocaleDropdownNavbarItem dropdownItemsBefore={[]} dropdownItemsAfter={[]} items={[]} />
            </ul>
          </div>
          {/* 移动端导航栏 */}
          <div
              className={styles.isMobieNav}
              style={{display: 'none'}}
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
                <Translate id='navbar.feature'>功能特性</Translate>
                <img className={styles.iconDropDown} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABUUlEQVRoge3Wr0tdcRzH4WfeKcpwCCIMBAXBIlgWFpYMppUVLUs2i9F/4SbXtrBmsmhZWVpYWrhhRVgZCBMGggiiyIZjTsO9XyZ3XO65P86P8HngE88571c7hBBCCCGEEEIYujpuK371rDE7FRjb6d5kjYAHeFeB0e23i5FeQrQe2KvA+HQHqPUakdSwX4GI9xjtNyIZw4cSIz5ifNCIZAKfSoj4jEfDikgeo1FgRAOTw45IpvClgIhDTOcVkczga44R3/Ak74hkFkc5RBxjvqiIZA7fBxx+/35godCCexZx0mVgljvFUsHb/7OMM/1HnONp4as7eIZLvUdctJ6tlOe4kj3iJ1ZKWZrBKn7pHnGNFyVtzOwlfusc8Qfrpa3r0Zrm4PaIG7wqcVdfNjSHp4i/2Cx10QC2/AvZzvNDD/N8Od5q/jXD65y/FUIIIYRQNXfPaMyAru8lkAAAAABJRU5ErkJggg==" />
                <ul className="dropdown__menu">
                  <li>
                    <Link to="/feature/devops" className={clsx("dropdown__link", styles.DropDownFont)}>
                      <Translate id='navbar.feature.devops'>
                        一体化DevOps
                      </Translate>
                    </Link>
                  </li>
                  <li>
                    <Link to="/feature/multi-cluster" className={clsx("dropdown__link", styles.DropDownFont)}>
                      <Translate id='navbar.feature.k8scluster'>
                        Kubernetes多集群管理
                      </Translate>
                    </Link>
                  </li>
                  <li>
                    <Link to="/feature/service-mesh" className={clsx("dropdown__link", styles.DropDownFont)}>
                      <Translate id='navbar.feature.servicemesh'>
                        开箱即用的微服务治理
                      </Translate>
                    </Link>
                  </li>
                  <li>
                    <Link to="/feature/app-market" className={clsx("dropdown__link", styles.DropDownFont)}>
                      <Translate id='navbar.feature.appstore'>
                        云原生应用市场
                      </Translate>
                    </Link>
                  </li>
                  <li>
                    <Link to="/feature/app-ops" className={clsx("dropdown__link", styles.DropDownFont)}>
                      <Translate id='navbar.feature.appops'>
                        自动化应用运维
                      </Translate>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div className="dropdown dropdown--hoverable">
                <Translate>深入</Translate>
                <img className={styles.iconDropDown} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABUUlEQVRoge3Wr0tdcRzH4WfeKcpwCCIMBAXBIlgWFpYMppUVLUs2i9F/4SbXtrBmsmhZWVpYWrhhRVgZCBMGggiiyIZjTsO9XyZ3XO65P86P8HngE88571c7hBBCCCGEEEIYujpuK371rDE7FRjb6d5kjYAHeFeB0e23i5FeQrQe2KvA+HQHqPUakdSwX4GI9xjtNyIZw4cSIz5ifNCIZAKfSoj4jEfDikgeo1FgRAOTw45IpvClgIhDTOcVkczga44R3/Ak74hkFkc5RBxjvqiIZA7fBxx+/35godCCexZx0mVgljvFUsHb/7OMM/1HnONp4as7eIZLvUdctJ6tlOe4kj3iJ1ZKWZrBKn7pHnGNFyVtzOwlfusc8Qfrpa3r0Zrm4PaIG7wqcVdfNjSHp4i/2Cx10QC2/AvZzvNDD/N8Od5q/jXD65y/FUIIIYRQNXfPaMyAru8lkAAAAABJRU5ErkJggg==" />
                <ul className="dropdown__menu">
                  <li>
                    <Link to="/usescene" className={clsx("dropdown__link", styles.DropDownFont)}>
                      <Translate id='navbar.usescene'>
                        使用场景
                      </Translate>
                    </Link>
                  </li>
                  <li>
                    <Link to="/case" className={clsx("dropdown__link", styles.DropDownFont)}>
                      <Translate id='navbar.case'>
                        用户案例
                      </Translate>
                    </Link>
                  </li>
                  <li>
                    <Link to="/blog" className={clsx("dropdown__link", styles.DropDownFont)}>
                      <Translate id='navbar.blog'>
                        博客
                      </Translate>
                    </Link>
                  </li>
                  <li>
                    <Link to="/docs/Intro" className={clsx("dropdown__link", styles.DropDownFont)}>
                      <Translate id='navbar.intro'>
                        OpenAPI
                      </Translate>
                    </Link>
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
              <div className="dropdown dropdown--hoverable">
                <Link to="https://hub.grapps.cn" className={styles.StoreFont}>
                  <Translate id='navbar.appstore'>应用商店</Translate>
                </Link>
                <img className={styles.iconDropDown} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAABmJLR0QA/wD/AP+gvaeTAAABUUlEQVRoge3Wr0tdcRzH4WfeKcpwCCIMBAXBIlgWFpYMppUVLUs2i9F/4SbXtrBmsmhZWVpYWrhhRVgZCBMGggiiyIZjTsO9XyZ3XO65P86P8HngE88571c7hBBCCCGEEEIYujpuK371rDE7FRjb6d5kjYAHeFeB0e23i5FeQrQe2KvA+HQHqPUakdSwX4GI9xjtNyIZw4cSIz5ifNCIZAKfSoj4jEfDikgeo1FgRAOTw45IpvClgIhDTOcVkczga44R3/Ak74hkFkc5RBxjvqiIZA7fBxx+/35godCCexZx0mVgljvFUsHb/7OMM/1HnONp4as7eIZLvUdctJ6tlOe4kj3iJ1ZKWZrBKn7pHnGNFyVtzOwlfusc8Qfrpa3r0Zrm4PaIG7wqcVdfNjSHp4i/2Cx10QC2/AvZzvNDD/N8Od5q/jXD65y/FUIIIYRQNXfPaMyAru8lkAAAAABJRU5ErkJggg==" />
                <ul className="dropdown__menu">
                  <li>
                    <Link to="/opensourceApps" className={clsx("dropdown__link", styles.DropDownFont)}>
                      <Translate id='navbar.opensourceapps'>
                        精选应用
                      </Translate>
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
