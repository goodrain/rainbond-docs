import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import LayoutProviders from '@theme/Layout/Provider';
import React from 'react';
import NavBar from '../components/NavBar';
import styles from './index.module.scss';
import AnnouncementBar from '@theme/AnnouncementBar';
import Footer from '@theme/Footer';

import Primary from '../components/HomePage/Primary';
import Communitydata from '../components/HomePage/Communitydata';
import Platform from '../components/HomePage/Platform';
import Feature from '../components/HomePage/Feature';
import Rainstore from '../components/HomePage/Rainstore';
import Xinchuang from '../components/HomePage/Xinchuang';
import VideoLearn from '../components/HomePage/VideoLearn';
import HowRainbond from '../components/HomePage/HowRainbond';
import Users from '../components/HomePage/Users';
import JoinCommunity from '../components/HomePage/JoinCommunity';
  
export default function ZhHome() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <LayoutProviders>
      <Head>
        <title>{siteConfig.title}</title>
        <meta property='og:title' content={siteConfig.title} />
        <link rel='icon' href={siteConfig.favicon} type='image/x-icon' />
      </Head>
      123
      <Footer/>
    </LayoutProviders>
  );
}
