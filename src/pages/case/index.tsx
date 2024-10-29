import Layout from '@theme/Layout';
import React from 'react';
import { CardList } from '../../components/CardList';
import { FeatureHeader } from '@site/src/components/FeatureList';
import { animated, useTrail } from 'react-spring';

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
    title: "用户案例",
    description: "Rainbond 深受数千家企业的信任，在企业的生产环境中落地。"
  };

  const CardContentList = [
    {
      img: "/img/case/boe.jpeg",
      title: "京东方",
      description: "京东方使用 Rainbond 打造物联网生态产品云",
      link: "/case/boe"
    },
    {
      img: "/img/case/szsd.png",
      title: "山西数智时代",
      description: "山西数智时代基于 Rainbond 实现智慧景区",
      link: "/case/szsd"
    },
    {
      img: "/img/case/talkweb.png",
      title: "拓维信息",
      description: "拓维信息使用 Rainbond 的云原生落地实践",
      link: "/case/talkweb"
    },
    {
      img: "/img/case/penghai.png",
      title: "鹏海软件",
      description: "鹏海软件使用 Rainbond 打造工业互联网平台",
      link: "/case/penghai"
    },
    {
      img: "/img/case/zhjl.png",
      title: "智慧巨鹿",
      description: "智慧巨鹿使用 Rainbond 落地实践",
      link: "/case/zhjl"
    },
    {
      img: "/img/case/xybigdata.jpeg",
      title: "咸阳市大数据管理局",
      description: "咸阳市大数据管理局使用 Rainbond 作为智慧城市底座",
      link: "/case/xybigdata"
    },
    {
      img: "/img/case/csgapp.jpeg",
      title: "正观易知科技",
      description: "藏书馆App基于 Rainbond 实现云原生DevOps的实践",
      link: "/case/csgApp"
    },
    {
      img: "https://static.goodrain.com/wechat/yumchina/2.png",
      title: "某餐饮企业",
      description: "某餐饮企业使用Rainbond实现云原生落地的实践",
      link: "/case/diningroom"
    },
    {
      img: "/img/case/kgdata.jpeg",
      title: "柯基数据",
      description: "通过Rainbond完成云原生改造，实现离线持续交付客户",
      link: "/case/kgdata"
    },
    {
      img: "/img/case/cjzk.png",
      title: "城建智控",
      description: "Rainbond 助力城建智控，从传统开发到敏捷开发转型",
      link: "/case/cjzk"
    },
  ];
  
  return (
    <Layout title={Header.title} description={Header.description}>
      <animated.div style={animatedTexts[1]}>
        <FeatureHeader props={{...Header}} />
      </animated.div>
      <CardList props={{CardContentList}}/>
    </Layout>
  );
}