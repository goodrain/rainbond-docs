import React from 'react';
import Layout from '@theme/Layout';
import Background from '../components/Background';
import CoreCapabilities from '@src/components/HomePage/CoreCapabilities';
import Hero from '@src/components/HomePage/Hero';
import WhyRainbond from '@src/components/HomePage/WhyRainbond';
import PlatformComparison from '@src/components/HomePage/PlatformComparison';
import WhoDesignedFor from '@src/components/HomePage/WhoDesignedFor';
import GettingStarted from '@src/components/HomePage/GettingStarted';

export default function Home() {

  return (
    <Layout>
      <Background />
      <Hero />
      <span style={{ margin: '7rem 0 7rem 0', borderTop: '1px dashed #e5e7eb' }}/>
      <CoreCapabilities />
      <span style={{ margin: '5rem 0 5rem 0', borderTop: '1px dashed #e5e7eb' }}/>
      <WhyRainbond />
      <span style={{ margin: '5rem 0 5rem 0', borderTop: '1px dashed #e5e7eb' }}/>
      <PlatformComparison />
      <span style={{ margin: '5rem 0 5rem 0', borderTop: '1px dashed #e5e7eb' }}/>
      <WhoDesignedFor />
      <span style={{ margin: '5rem 0 5rem 0', borderTop: '1px dashed #e5e7eb' }}/>
      <GettingStarted />
    </Layout>
  );
}
