import React from 'react';
import Layout from '@theme/Layout';
import Background from '@src/components/Background';
import Hero from '@src/components/HomePageNew/Hero';
import Core from '@src/components/HomePageNew/Core';
import WhyChoose from '@src/components/HomePageNew/Whychoose';
import Users from '@src/components/HomePageNew/Users';
import Community from '@src/components/HomePageNew/Community';

export default function Home() {

  return (
    <Layout>
      <Background />
      <Hero />
      <span style={{ margin: '7rem 0 7rem 0', borderTop: '1px dashed #e5e7eb' }}/>
      <Core />
      <span style={{ margin: '7rem 0 7rem 0', borderTop: '1px dashed #e5e7eb' }}/>
      <WhyChoose />
      <span style={{ margin: '7rem 0 7rem 0', borderTop: '1px dashed #e5e7eb' }}/>
      <Users />
      <span style={{ margin: '7rem 0 7rem 0', borderTop: '1px dashed #e5e7eb' }}/>
      <Community />
    </Layout>
  );
}