import React from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Hero from '@src/components/HomePage/Hero';
import ChoosePath from '@src/components/HomePage/ChoosePath';
import Demo from '@src/components/HomePage/Demo';
import WhyChoose from '@src/components/HomePage/Whychoose';
import Users from '@src/components/HomePage/Users';
import Painpoint from '@src/components/HomePage/Painpoint';
import DeployCommand from '@src/components/HomePage/DeployCommand';
import Comparison from '@src/components/HomePage/Comparison';
import Section from '@src/components/Section';
import PageContainer from '@src/components/PageContainer';
import GridDecoration from '@src/components/GridDecoration';
import styles from './styles.module.css';

export default function Home() {
  const homeTitle = 'Rainbond - 不用懂 Kubernetes 的开源容器平台';
  const homeDescription =
    'Rainbond 是不用懂 Kubernetes 的开源容器平台，帮助团队在不深入学习 Kubernetes 的前提下完成应用构建、部署、升级、运维与私有化交付。';
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
        <Painpoint />
        <Section>
          <WhyChoose />
        </Section>
        <Section>
          <Users />
        </Section>
        <Section>
          <Comparison/>
        </Section>
        <Section noBorder>
          <DeployCommand />
        </Section>
      </PageContainer>
    </Layout>
  );
}
