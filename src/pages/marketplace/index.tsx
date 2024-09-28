import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import LayoutProviders from '@theme/LayoutProviders';
import React from 'react';
import NavBar from '../../components/NavBar';
import styles from '../index.module.scss';
import AnnouncementBar from '@theme/AnnouncementBar';
import Footer from '@theme/Footer';

import Primary from '../../components/MarketPlace/Primary';
import AppType from '../../components/MarketPlace/AppType';
import Feature from '../../components/MarketPlace/Feature';
import Num500App from '../../components/MarketPlace/Num500App';
import Scene from '../../components/MarketPlace/Scene';
import Case from '../../components/MarketPlace/Case';
import Contact from '../../components/MarketPlace/Contact';
export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const RainstoreHeaderTitle = {
    title: "云原生应用市场，实现企业应用自动化交付",
    description: "支持应用市场全流程管理（应用构建和拼装、应用发布应用市场、应用市场展示和管理、应用导出和导入、应用一键安装和升级），通过应用模版可以将任何类型的应用发布到应用市场，并实现复杂应用一键交付客户环境。"
  };
  return (
    <LayoutProviders>
      <Head>
        <meta name={RainstoreHeaderTitle.title} content={RainstoreHeaderTitle.description} />
      </Head>
      <NavBar />
      <div>
        <section id={styles.section_first} className={styles.width}>
          <Primary />
        </section>
        <section id={styles.app_type} className={styles.fifthscreen}>
          <div id={styles.section_fifth} className={styles.width}>
            <AppType />
          </div>
        </section>
        <section className={styles.width}>
          <Feature />
        </section>
        <section className={styles.fifthscreen}>
          <div id={styles.section_fifth} className={styles.width}>
            <Num500App />
          </div>
        </section>
        <section className={styles.width}>
          <Scene />
        </section>
        <section className={styles.fifthscreen}>
          <div id={styles.section_fifth} className={styles.width}>
          <Case />
          </div>
        </section>
        <section className={styles.width}>
          <Contact />
        </section>
      </div>
      <Footer/>
    </LayoutProviders>
  );
}
