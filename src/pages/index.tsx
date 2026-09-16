import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Hero from '@src/components/HomePage/Hero';
import ChoosePath from '@src/components/HomePage/ChoosePath';
import Demo from '@src/components/HomePage/Demo';
import Users from '@src/components/HomePage/Users';
import DeployCommand from '@src/components/HomePage/DeployCommand';
import Section from '@src/components/Section';
import PageContainer from '@src/components/PageContainer';
import GridDecoration from '@src/components/GridDecoration';
import styles from './styles.module.css';

export default function Home() {
  const homeTitle = 'Rainbond - 不用懂 Kubernetes 的开源容器平台';
  const homeDescription =
    'Rainbond 是基于 Kubernetes 的开源容器平台，屏蔽底层技术复杂性，统一部署和管理业务应用、AI 应用与大模型服务，让 AI 帮助团队完成部署和运维。';
  const homeKeywords =
    'Rainbond, 不用懂 Kubernetes 的开源容器平台, Kubernetes 应用交付, Kubernetes 管理平台, 应用交付与管理, 私有化部署, 云原生平台';

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
      <PageContainer>
        <Section style={{ position: 'relative' }}>
          <GridDecoration />
          <Hero />
        </Section>
        <Section>
          <ChoosePath />
        </Section>
        <Demo />
        <Section>
          <Users />
        </Section>
        <Section noBorder>
          <DeployCommand />
        </Section>
      </PageContainer>
    </Layout>
  );
}
