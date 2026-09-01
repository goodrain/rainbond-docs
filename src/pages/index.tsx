import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Hero from '@src/components/HomePage/Hero';
import WhyRainbond from '@src/components/HomePage/WhyRainbond';
import ChoosePath from '@src/components/HomePage/ChoosePath';
import Demo from '@src/components/HomePage/Demo';
import Users from '@src/components/HomePage/Users';
import DeployCommand from '@src/components/HomePage/DeployCommand';
import Section from '@src/components/Section';
import PageContainer from '@src/components/PageContainer';
import GridDecoration from '@src/components/GridDecoration';
import styles from './styles.module.css';

export default function Home() {
  const homeTitle = 'Rainbond - 开源 AI 应用运行平台';
  const homeDescription =
    'Rainbond 是一个开源的 AI 应用运行平台，将 AI 生成的项目、AI 开源软件和业务应用，以容器方式运行在自己的服务器或 Kubernetes 上，并持续完成部署、运维、升级与交付。';
  const homeKeywords =
    'Rainbond, AI 应用运行平台, AI 应用部署, AI 开源软件, Kubernetes 应用交付, 私有化部署, 开源应用平台';

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
        <WhyRainbond />
        <Demo />
        <Section>
          <ChoosePath />
        </Section>
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
