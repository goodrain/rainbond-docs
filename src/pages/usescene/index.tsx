import Layout from '@theme/Layout';
import React from 'react';
import { CardList } from '../../components/CardList';
import { FeatureHeader } from '@src/components/FeatureList';
import { animated, useTrail } from 'react-spring';
import Background from "@src/components/Background";

export default function usescene() {

  const animatedTexts = useTrail(5, {
    from: { opacity: 0, transform: 'translateY(3em)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: {
      mass: 3,
      friction: 45,
      tension: 460,
    },
  })
  
  const Header = {
    title: "使用场景",
    description: "Rainbond 在不同的场景下，可以帮助企业快速开发、交付应用，从开发到生产到交付，Rainbond 提供了一站式的解决方案。"
  };

  const CardContentList = [
    {
      img: "/img/usescene/EnterpriseDeliveryTwo.png",
      title: "模块化个性化交付",
      description: "在 ToB 的软件交付场景，如何通过 Rainbond 来提高个性化需求的软件交付效率？",
      link: "/usescene/EnterpriseDeliveryTwo"
    },
    {
      img: "/img/usescene/oneclickinstall.png",
      title: "企业应用持续交付",
      description: "通过 Rainbond 应用模型抽象，实现高度自动化的交付体验，提升企业应用交付效率，降低交付成本",
      link: "/usescene/EnterpriseDeliveryOne"
    },
    {
      img: "/img/usescene/componentReuse.jpeg",
      title: "业务积木式拼装",
      description: "本文将讲解 Rainbond 在解决微服务应用架构解耦和微服务模块化的一些新思路",
      link: "/usescene/componentReuse"
    },
    {
      img: "/img/usescene/x86ToArm.png",
      title: "国产化和信创支撑",
      description: "Rainbond 支持在多种国产芯片以及国产操作系统中稳定运行，可达到生产可用的标准",
      link: "/usescene/x86ToArm"
    },
    {
      img: "/img/usescene/AppManagement.jpeg",
      title: "企业级应用统一管理",
      description: "像使用手机 APP 一样管理你的企业应用，易于安装、即点即用，新版本一键升级",
      link: "/usescene/AppManagement"
    },
    {
      img: "/img/usescene/MultiCloudManagement.png",
      title: "应用级多云管理",
      description: "当前云计算有多种形态公有云、私有云、边缘云、虚拟机等，如何高效管理多云是当前面临的问题",
      link: "/usescene/MultiCloudManagement"
    },
    {
      img: "/img/usescene/offlineDelivery.jpeg",
      title: "离线环境软件交付",
      description: "接着用户案例“柯基数据离线持续交付客户”的离线环境软件交付实践",
      link: "/usescene/offlineDelivery"
    },
    {
      img: "/img/usescene/IntegrationDev.png",
      title: "一体化开发测试环境",
      description: "GitLab 擅长源代码管理，Rainbond 擅长应用自动化管理，整合 Gitlab 和 Rainbond 实现一体化开发测试环境",
      link: "/usescene/IntegrationDev"
    },
  ];
  
  return (
    <Layout title={Header.title} description={Header.description}>
      <Background />
      <animated.div style={animatedTexts[1]}>
        <FeatureHeader props={{...Header}} />
      </animated.div>
      <CardList props={{CardContentList}}/>
    </Layout>
  );
}