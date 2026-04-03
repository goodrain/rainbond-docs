import React from 'react';
import Layout from '@theme/Layout';
import Background from '@src/components/Background';
import Hero from '@src/components/HomePage/Hero';
import Demo from '@src/components/HomePage/Demo';
import Core from '@src/components/HomePage/Core';
import WhyChoose from '@src/components/HomePage/Whychoose';
import Users from '@src/components/HomePage/Users';
import Painpoint from '@src/components/HomePage/Painpoint';
import DeployCommand from '@src/components/HomePage/DeployCommand';
import Comparison from '@src/components/HomePage/Comparison';
import TopicHub from '@src/components/HomePage/TopicHub';
import Section from '@src/components/Section';
import PageContainer from '@src/components/PageContainer';
import GridDecoration from '@src/components/GridDecoration';
import styles from './styles.module.css';

export default function Home() {

  return (
    <Layout wrapperClassName={styles.homeWrapper}>
      {/* <Background /> */}
      <PageContainer>
        <Section style={{ position: 'relative' }}>
          <GridDecoration />
          <Hero />
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
        <Section>
          <TopicHub />
        </Section>
        <Section noBorder>
          <DeployCommand />
        </Section>
      </PageContainer>
    </Layout>
  );
}
