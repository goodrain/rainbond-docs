import React from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import LayoutProviders from '@theme/Layout/Provider';
import NavBar from '../../components/NavBar';

// Import English homepage components
import Hero from '../../components/HomePageEn/Hero';
import CoreCapabilities from '../../components/HomePageEn/CoreCapabilities';
import WhyRainbond from '../../components/HomePageEn/WhyRainbond';
import TargetUsers from '../../components/HomePageEn/TargetUsers';
import GettingStarted from '../../components/HomePageEn/GettingStarted';
import FooterEn from '../../components/HomePageEn/Footer';

// Sample data - in production, this should come from a CMS or configuration file
const heroData = {
  title: 'Build Enterprise Applications Like Mobile Apps',
  subtitle: 'Rainbond = Heroku-like Experience + Native Kubernetes Support + Enterprise-grade Private Deployment',
  description: 'Rainbond is 100% open-source, offers a serverless experience, and allows you to easily manage containerized applications without needing to understand Kubernetes.',
  ctaButtons: {
    primary: {
      text: 'Get Started',
      link: '#get-started',
    },
    secondary: {
      text: 'Documentation',
      link: 'https://www.rainbond.com/en/docs/installation/',
    },
  },
};

const coreCapabilitiesData = {
  title: 'Core Capabilities',
  features: [
    {
      icon: 'install',
      title: 'Install Enterprise Software Like Mobile Apps',
      description: 'Through the built-in application marketplace, various published microservice application templates support one-click installation and upgrades.',
    },
    {
      icon: 'container',
      title: 'Containerization Without Dockerfile and YAML',
      description: 'The platform automatically recognizes multiple development languages and completes build and deployment through a wizard-like process.',
    },
    {
      icon: 'lifecycle',
      title: 'Full Application Lifecycle Management',
      description: 'Serverless experience where regular developers can manage and maintain applications without learning complex technologies.',
    },
    {
      icon: 'microservice',
      title: 'Microservice Modular Assembly',
      description: 'Business components support modular dependency orchestration and one-click publishing as reusable application templates.',
    },
  ],
};

const whyRainbondData = {
  title: 'Why Rainbond?',
  tabs: {
    developer: {
      title: 'Developer Pain Points Solved',
      painPoints: [
        'I need to deploy a system with 20 microservices, but don\'t want to study K8s configs for each component',
        'The configuration differences between production and test environments make every deployment risky',
        'How to quickly deliver complex systems in customer\'s offline environment?',
      ],
      benefits: [
        'Zero YAML experience required',
        'Consistent environment configuration',
        'One-click offline deployment',
      ],
    },
    ops: {
      title: 'Ops/Platform Admin Pain Points Solved',
      painPoints: [
        'Need to give developers autonomy while ensuring cluster stability',
        'Traditional application cloud-native transformation costs too much',
        'Unified application management across multi/hybrid cloud environments',
      ],
      benefits: [
        'Fine-grained access control',
        'Low-cost transformation path',
        'Unified management interface',
      ],
    },
  },
  comparison: [
    {
      platformType: 'Developer-friendly PaaS',
      products: ['Heroku, Vercel'],
      differentiation: ['Private Deployment Support', 'Full K8s Compatibility'],
    },
    {
      platformType: 'K8s Native Tools',
      products: ['Rancher, Devtron'],
      differentiation: ['Application-level Abstraction', 'Zero YAML Experience', 'Complex Application Topology', 'Offline Environment Support'],
    },
    {
      platformType: 'Self-hosted Solutions',
      products: ['CapRover, Coolify'],
      differentiation: ['Enterprise Multi-tenancy', 'Hybrid Cloud Management'],
    },
  ],
};

const targetUsersData = {
  title: 'Who Is It Designed For?',
  personas: [
    {
      title: '👩‍💻 Developer Users',
      icon: 'developer',
      needs: [
        'Need URL access within 5 minutes from code',
        'Want cloud-native capabilities without learning K8s',
        'Zero configuration differences between dev and prod environments',
      ],
      useCases: [
        'Rapid application deployment',
        'Microservice architecture adoption',
        'Development environment standardization',
      ],
    },
    {
      title: '👨‍💼 Platform Managers',
      icon: 'manager',
      needs: [
        'Traditional application cloud-native transformation',
        'Building internal PaaS platforms',
        'Achieving unified hybrid cloud management',
      ],
      useCases: [
        'Legacy system modernization',
        'Internal developer platform',
        'Multi-cloud management',
      ],
    },
  ],
};

const gettingStartedData = {
  title: 'Getting Started',
  requirements: [
    {
      label: 'Operating System',
      value: 'Linux OS (CentOS 7+/Ubuntu 18.04+)',
    },
    {
      label: 'Hardware Requirements',
      value: '2 CPU cores / 8GB RAM / 50GB disk space',
    },
  ],
  installCommand: 'curl -o install.sh https://get.rainbond.com && IMGHUB_MIRROR=rainbond bash ./install.sh',
  accessUrl: 'http://<IP>:7070',
};

const footerData = {
  copyright: '© 2025 Rainbond. All rights reserved.',
  links: [
    {
      text: 'GitHub',
      url: 'https://github.com/goodrain/rainbond',
    },
    {
      text: 'Documentation',
      url: 'https://www.rainbond.com/en/docs/installation/',
    },
  ],
  socialLinks: [
    {
      platform: 'GitHub',
      url: 'https://github.com/goodrain/rainbond',
      icon: 'github',
    },
  ],
};

export default function EnHome() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <LayoutProviders>
      <Head>
        <title>{siteConfig.title}</title>
        <meta property="og:title" content={siteConfig.title} />
        <link rel="icon" href={siteConfig.favicon} type="image/x-icon" />
      </Head>
      <NavBar />
      
      <main>
        <Hero {...heroData} />
        <CoreCapabilities {...coreCapabilitiesData} />
        <WhyRainbond {...whyRainbondData} />
        <TargetUsers {...targetUsersData} />
        <GettingStarted {...gettingStartedData} />
      </main>
      
      <FooterEn {...footerData} />
    </LayoutProviders>
  );
} 