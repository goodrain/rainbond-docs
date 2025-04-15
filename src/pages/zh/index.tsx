import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import LayoutProviders from '@theme/Layout/Provider';
import React from 'react';
import NavBar from '../../components/NavBar';
import styles from './index.module.scss';
import AnnouncementBar from '@theme/AnnouncementBar';
import Footer from '@theme/Footer';

import Primary from '../../components/HomePage/Primary';
import Communitydata from '../../components/HomePage/Communitydata';
import Platform from '../../components/HomePage/Platform';
import Feature from '../../components/HomePage/Feature';
import Rainstore from '../../components/HomePage/Rainstore';
import Xinchuang from '../../components/HomePage/Xinchuang';
import VideoLearn from '../../components/HomePage/VideoLearn';
import HowRainbond from '../../components/HomePage/HowRainbond';
import Users from '../../components/HomePage/Users';
import JoinCommunity from '../../components/HomePage/JoinCommunity';
  
export default function ZhHome() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <LayoutProviders>
      <Head>
        <title>{siteConfig.title}</title>
        <meta property='og:title' content={siteConfig.title} />
        <link rel='icon' href={siteConfig.favicon} type='image/x-icon' />
      </Head>
      {/* <AnnouncementBar /> */}
      <NavBar />
      
      <div>
        <section id={styles.section_first} className={styles.width}>
          <Primary />
        </section>

        <section id={styles.section_second} className={styles.width}>
          <Communitydata />
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
            <Rainstore />
          </div>
        </section>

        <section className={styles.width}>
          <Xinchuang />
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

        <section className={styles.width}>
            <JoinCommunity />
        </section>
      </div>
      <Footer/>
    </LayoutProviders>
  );
}
