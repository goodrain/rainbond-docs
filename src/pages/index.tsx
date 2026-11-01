import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import ScenarioShowcase from '@src/components/HomePage/ScenarioShowcase';
import EntryPaths from '@src/components/HomePage/EntryPaths';
import UniqueValue from '@src/components/HomePage/UniqueValue';
import LandingHero from '@src/components/HomePage/ModernHome/LandingHero';
import PlatformSection from '@src/components/HomePage/ModernHome/PlatformSection';
import DeepValueSection from '@src/components/HomePage/ModernHome/DeepValueSection';
import JourneySection from '@src/components/HomePage/ModernHome/JourneySection';
import ProofSection from '@src/components/HomePage/ModernHome/ProofSection';
import StartFaqSection from '@src/components/HomePage/ModernHome/StartFaqSection';
import FinalCta from '@src/components/HomePage/ModernHome/FinalCta';
import styles from './styles.module.css';

export default function Home() {
  const homeTitle = 'Rainbond - AI 驱动的开源应用交付平台';
  const homeDescription =
    'Rainbond 是 AI 驱动的开源应用交付平台，把代码、开源软件和复杂应用持续交付到自己的服务器、Kubernetes 与信创环境。';
  const homeKeywords =
    'Rainbond, AI 应用交付, 开源容器平台, Kubernetes 应用管理, 软件交付, 私有化部署, 信创';

  return (
    <Layout wrapperClassName={styles.homeWrapper}>
      <Head>
        <title>{homeTitle}</title>
        <meta
          name="description"
          content={homeDescription}
        />
        <meta name="keywords" content={homeKeywords} />
        <meta
          property="og:title"
          content={homeTitle}
        />
        <meta
          property="og:description"
          content={homeDescription}
        />
      </Head>
      <div className={styles.homePage}>
        <LandingHero />
        <ScenarioShowcase />
        <EntryPaths />
        <UniqueValue />
        <PlatformSection />
        <DeepValueSection />
        <JourneySection />
        <ProofSection />
        <StartFaqSection />
        <FinalCta />
      </div>
    </Layout>
  );
}
