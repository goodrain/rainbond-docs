import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import LayoutProviders from '@theme/LayoutProviders';
import 'animate.css';
import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import styles from './index.module.scss';
import AnnouncementBar from '@theme/AnnouncementBar';
import Footer from '@theme/Footer';
import Translate from '@docusaurus/Translate';

import Primary from '../components/HomePage/Primary';
import Command from '../components/HomePage/Command';
import Platform from '../components/HomePage/Platform';
import Feature from '../components/HomePage/Feature';
import VideoLearn from '../components/HomePage/VideoLearn';
import HowRainbond from '../components/HomePage/HowRainbond';
import Users from '../components/HomePage/Users';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [hover_img, setHover_Img] = useState(false);

  return (
    <LayoutProviders>
      <Head>
        <title>{siteConfig.title}</title>
        <meta property='og:title' content={siteConfig.title} />
        <link rel='icon' href={siteConfig.favicon} type='image/x-icon' />
      </Head>
      {/* 导航栏 */}
      <AnnouncementBar />
      <NavBar />
      
      <div>
        <section id={styles.section_first} className={styles.width}>
          <Primary />
        </section>

        <section id={styles.section_second} className={styles.width}>
          <Command />
        </section>

        <section id={styles.thirdscreen}>
          <div className={styles.width}>
            <Platform />
          </div>
        </section>

        <section className={styles.width}>
          <Feature />
        </section>
        
        <section className={styles.fifthscreen}>
          <div id={styles.section_fifth} className={styles.width}>
            <HowRainbond />
          </div>
        </section>
        
        <section className={styles.sixthscreen}>
          <div className={styles.width}>
            <VideoLearn />
          </div>
        </section>
        
        <section className={styles.seventhscreen}>
          <div className={styles.width}>
            <Users />
          </div>
        </section>

      </div>
      {/* 底部 */}
      <footer className={`${styles.footer_container} `}>
        <h1><Translate id='participate'>参与其中</Translate></h1>
        <div className={`${styles.join_type} ${styles.width}`}>
          <a href='https://t.goodrain.com' target='_blank'>
            <div className={styles.join_logo}>
              <img src='/img/discourse.png' alt='' />
            </div>
            <div className={styles.join_detali}>
              <h4 style={{ fontSize: '20px' }}>
                <Translate id='participate.community.title'>社区</Translate>
              </h4>
              <p>
                <Translate id='participate.community.description'>参考社区,学习或贡献更多Rainbond用例用法</Translate>
              </p>
            </div>
          </a>
          <a
            href='#'
            onMouseMove={() => {
              setHover_Img(true);
            }}
            onMouseLeave={() => {
              setHover_Img(false);
            }}
          >
            <div className={styles.join_logo}>
              {hover_img && (
                <img
                  src='/img/wechart.jpeg'
                  alt='WeChat 979885495'
                  className={styles.hover_img}
                />
              )}
              <img src='/img/we-chat.png' alt='' />
            </div>
            <div className={styles.join_detali}>
              <h4 style={{ fontSize: '20px' }}>WeChat</h4>
              <p>
                <Translate id='participate.wechat'>添加微信助手,加入微信技术交流群 (18800156151)</Translate>
              </p>
            </div>
          </a>
          <a href='#'>
            <div className={styles.join_logo}>
              <img src='/img/dingding.png' alt='' />
            </div>
            <div className={styles.join_detali}>
              <h4 style={{ fontSize: '20px' }}>
                <Translate id='participate.dingtalk.title'>钉钉群</Translate>
              </h4>
              <p>
                <Translate id='participate.dingtalk.description'>搜索钉钉群号进群(31096419)</Translate>
              </p>
            </div>
          </a>
          <a href='/community/contribution/'>
            <div className={styles.join_logo}>
              <img src='/img/GitHub.png' alt='' />
            </div>
            <div className={styles.join_detali}>
              <h4 style={{ fontSize: '20px' }}>
                <Translate id='participate.contribution.title'>贡献</Translate>
              </h4>
              <p>
                <Translate id='participate.contribution.description'>欢迎参与贡献,你可以提出Issues和解决Issues开始</Translate>
              </p>
            </div>
          </a>
        </div>
      </footer>
      <Footer/>
    </LayoutProviders>
  );
}
