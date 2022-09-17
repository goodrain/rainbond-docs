import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import LayoutProviders from '@theme/LayoutProviders';
import 'animate.css';
import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import Swiper from '../components/Swiper';
import Cswiper from '../components/Cswiper';
import NavBar from '../components/NavBar';
import styles from './index.module.scss';
import AnnouncementBar from '@theme/AnnouncementBar';
import Footer from '@theme/Footer';
import { motion } from "framer-motion";
import { OverPack } from 'rc-scroll-anim';
import Texty from 'rc-texty';
import { useTrail, animated } from 'react-spring';
import Translate from '@docusaurus/Translate';
import { useLocation } from '@docusaurus/router';
import clsx from 'clsx';
import Link from '@docusaurus/Link';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [mask_config, setMask_config] = useState(false);
  const [hover_img, setHover_Img] = useState(false);
  const [hoverImg, setHoverImg] = useState(false);
  const [open, setOpen] = useState('first');
  const LocalUrlEn = useLocation().pathname.includes('/en');
  
  const animatedTexts = useTrail(5, {
    from: { opacity: 0, transform: 'translateY(3em)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: {
      mass: 3,
      friction: 45,
      tension: 460,
    },
  })

  const handleJumpDemo = e => {
    axios('https://cloud.goodrain.com/enterprise-server/onlineTrial');
  };
  const handleWhyRainbondFirst = useCallback(() => {
    setOpen('first');
  }, []);
  const handleWhyRainbondSecond = useCallback(() => {
    setOpen('second');
  }, []);
  const handleWhyRainbondThird = useCallback(() => {
    setOpen('third');
  }, []);
  const handleWhyRainbondFourth = useCallback(() => {
    setOpen('fourth');
  }, []);

  return (
    <LayoutProviders>
      <Head>
        <title>{siteConfig.title}</title>
        <meta property='og:title' content={siteConfig.title} />
        <link rel='icon' href={siteConfig.favicon} type='image/x-icon' />
      </Head>
      {/* 导航栏 */}
      <AnnouncementBar />
      <NavBar />
      {/* 主体区域 */}
      <div>
        {/* 第一屏 */}
        <section id={styles.section_first} className={styles.width}>
          <div className={styles.rainbond_desc}>
            <animated.h2
              className={clsx({
                [styles.rainbond_title]: ! LocalUrlEn,
                [styles.rainbond_title_en]: LocalUrlEn,
              })}
              style={animatedTexts[0]}
            >
              <Translate id='first.title'>云原生多云应用管理平台</Translate>
            </animated.h2>
            <animated.div style={animatedTexts[0]} className={styles.rainbond_description}>
              <Translate id='first.description'>
                Rainbond
                核心100%开源，使用简单，不需要懂容器和Kubernetes，支持管理多种Kubernetes集群，提供企业级应用的全生命周期管理。
              </Translate>
            </animated.div>
            <animated.div style={animatedTexts[1]} className={styles.btnBox}>
              <a
                className={styles.btns}
                href='docs/quick-start/quick-install/'
                style={{ marginRight: '16px' }}
              >
                <Translate id='first.install'>安装使用</Translate>
              </a>
              {/* <a
                className={`${styles.btns} animate__animated animate__fadeInDown`}
                href='http://demo.c9f961.grapps.cn/'
                target='_blank'
                onClick={handleJumpDemo}
              >
                在线体验
              </a>} */}
              { <a
                className={styles.right_btns}
                href='#'
                onMouseMove={() => {
                  setHoverImg(true);
                }}
                onMouseLeave={() => {
                  setHoverImg(false);
                }}
              >
                <Translate id='first.follow'>关注 Rainbond</Translate>
              </a> }
              {hoverImg && (
                <div className={styles.join_logos}>
                  <span style={{ fontSize:'12px' }} >微信扫一扫</span>  
                  <img
                    src='/wechat/wechat-public.jpg'
                    alt='WeChat 979885495'
                    className={styles.hover_imgs}
                  />
                </div>
              )}
            </animated.div>
          </div>
          <animated.div
            className={styles.know_rainbond_video}
            style={animatedTexts[1]}
          >
            <div
              className={clsx('mask_video', styles.know_rainbond_video_div)}
              onClick={() => {
                setMask_config(true);
              }}
            >
              <img src='/img/video/video-rainbond.png' alt='' className={styles.know_rainbond_video_div_img}/>
            </div>
          </animated.div>
        </section>
        {/* 第二屏 */}
        <section id={styles.section_second} className={styles.width}>
          <animated.div
            className={styles.community_case}
            style={animatedTexts[1]}
          >
            <div className={styles.img_container}>
              <a href='#' style={{ cursor: 'default' }}>
                <img src='/img/users/boe.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container} style={{ width: '160px' }}>
              <a href='#' style={{ cursor: 'default' }}>
                <img src='/img/users/mky.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#' style={{ cursor: 'default' }}>
                <img src='/img/users/zhx.jpeg' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#' style={{ cursor: 'default' }}>
                <img src='/img/users/lvzhiyun.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container} style={{ width: '150px' }}>
              <a href='#' style={{ cursor: 'default' }}>
                <img src='/img/users/lyyl.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#' style={{ cursor: 'default' }}>
                <img src='/img/users/zggk.jpg' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#' style={{ cursor: 'default' }}>
                <img src='/img/users/bkrj.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container} style={{ width: '150px' }}>
              <a href='#' style={{ cursor: 'default' }}>
                <img src='/img/users/xinanmingzu.png' alt='' />
              </a>
            </div>
          </animated.div>
        </section>
        {/* 第二屏 */}
        <section className={styles.second}>
          <animated.div id={styles.section_experience} className={styles.width} style={animatedTexts[1]}>
            <h1 className={styles.dosc_logo}>
              <img src='/img/kuberneteslanding/kuberneteslanding.png' alt='' />
            </h1>
            {/* 标题 */}
            <h1
              style={{
                textAlign: 'center',
                marginBottom: '56px',
                position: 'relative'
              }}
            >
              <Translate id='second.title1'>云原生体验，</Translate>
              <span className={styles.how_rainbond}>Kubernetes</span>
              &nbsp; <Translate id='second.title2'>快速落地</Translate>
            </h1>
            {/* 分类 */}
            <div className={styles.experience_sort}>
              <div>
                {/* 图片 */}
                <div className={styles.imgContainer}>
                  <img src='/img/kuberneteslanding/java.svg' />
                </div>
                {/* 标题 */}
                <p className={styles.experience_sort_title}>
                  <Translate id='second.sourceCode'>源码一键部署</Translate>
                </p>
                {/* 描述 */}
                <div className={styles.experience_sort_desc}>
                  <ul>
                    <li>
                      <b> 
                        {'>'}
                      </b>
                      &nbsp;<Translate id='second.sourceCode1'>支持6种常见的开发语言</Translate>
                    </li>
                    <li>
                      <b> 
                        {'>'}
                      </b>
                      &nbsp;<Translate id='second.sourceCode2'>无需编写Dockerfile</Translate>
                    </li>
                    <li>
                      <b> 
                        {'>'}
                      </b>
                      &nbsp;<Translate id='second.sourceCode3'>集成Git仓库</Translate>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                {/* 图片 */}
                <div className={styles.imgContainer}>
                  <img src='/img/kuberneteslanding/manage.svg' />
                </div>
                {/* 标题 */}
                <p className={styles.experience_sort_title}>
                  <Translate id='second.kubernetes'>Kubernetes管理面板</Translate>
                </p>
                {/* 描述 */}
                <div className={styles.experience_sort_desc}>
                  <ul>
                    <li>
                      <b> 
                        {'>'}
                      </b>
                      &nbsp;<Translate id='second.kubernetes1'>零门槛落地Kubernetes</Translate>
                    </li>
                    <li>
                      <b> 
                        {'>'}
                      </b>
                      &nbsp;<Translate id='second.kubernetes2'>无需编写YAML</Translate>
                    </li>
                    <li>
                      <b> 
                        {'>'}
                      </b>
                      &nbsp;<Translate id='second.kubernetes3'>管理多个集群</Translate>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                {/* 图片 */}
                <div className={styles.imgContainer}>
                  <img src='/img/kuberneteslanding/service.svg' />
                </div>
                {/* 标题 */}
                <p className={styles.experience_sort_title}>
                  <Translate id='second.microservice'>微服务实战</Translate>
                </p>
                {/* 描述 */}
                <div className={styles.experience_sort_desc}>
                  <ul>
                    <li>
                      <b> 
                        {'>'}
                      </b>
                      &nbsp;<Translate id='second.microservice1'>Spring Cloud项目一步构建</Translate>
                    </li>
                    <li>
                      <b> 
                        {'>'}
                      </b>
                      &nbsp;<Translate id='second.microservice2'>服务编排和拓扑图展示</Translate>
                    </li>
                    <li>
                      <b> 
                        {'>'}
                      </b>
                      &nbsp;<Translate id='second.microservice3'>支持Service Mesh</Translate>
                    </li>
                  </ul>
                </div>
              </div>
              <div>
                {/* 图片 */}
                <div className={styles.imgContainer}>
                  <img src='/img/kuberneteslanding/store.svg' />
                </div>
                {/* 标题 */}
                <p className={styles.experience_sort_title}>
                  <Link to="/opensourceApps">
                    <Translate id='second.openapp'>
                      80款开源软件即点即用
                    </Translate>
                  </Link>
                </p>
                {/* 描述 */}
                <div className={styles.experience_sort_desc}>
                  <ul>
                    <li>
                      <b> 
                        {'>'}
                      </b>
                      &nbsp;<Translate id='second.openapp1'>一键安装和升级</Translate>
                    </li>
                    <li>
                      <b> 
                        {'>'}
                      </b>
                      &nbsp;<Translate id='second.openapp2'>建立自己的应用市场</Translate>
                    </li>
                    <li>
                      <b> 
                        {'>'}
                      </b>
                      &nbsp;<Translate id='second.openapp3'>对接Helm应用市场</Translate>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </animated.div>
        </section>
        {/* 为什么选择Rainbond */}
        <OverPack style={{ overflow: 'hidden'}} playScale={0.15}>
        <section id={styles.section_why_rainbond} className={styles.width}>
          <h1 className={styles.dosc_logo}>
            <img src='/img/choicerainbond/choicerainbond.png' style={{ height: '150px' }}/>
          </h1>
          <h1
            style={{
              textAlign: 'center',
              marginBottom: '70px',
              position: 'relative'
            }}
          >
            <Translate id='third.chooseRainbond.title1'>为什么选择</Translate>
            <span className={styles.how_rainbond}> 
            <Translate id='third.chooseRainbond.title2'>Rainbond ？</Translate>
            </span>
          </h1>
          <div className={styles.how_rainbond_desc_container} key="why_rainbond_desc">
            <div className={styles.how_rainbond_btn}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={
                  (open === 'first' && styles.active_btn) || styles.default_btn
                }
                onClick={handleWhyRainbondFirst}
              >
                <Translate id='third.chooseRainbond.useEasy'>使用简单</Translate>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={
                  (open === 'second' && styles.active_btn) || styles.default_btn
                }
                onClick={handleWhyRainbondSecond}
              >
                <Translate id='third.chooseRainbond.appDelivery'>应用一键交付</Translate>
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={
                  (open === 'third' && styles.active_btn) || styles.default_btn
                }
                onClick={handleWhyRainbondThird}
              >
                <Translate id='third.chooseRainbond.cloudNative'>云原生转型</Translate>
              </motion.button>
              {/* <button
                className={
                  (open === 'fourth' && styles.active_btn) || styles.default_btn
                }
                onClick={handleWhyRainbondFourth}
              >
                开源社区支持
              </button> */}
            </div>
            {open === 'first' && (
              <div className={styles.how_rainbond_desc}>
                <div>
                  <img src='/img/pass.svg' alt='' />
                  <span>&nbsp;&nbsp;
                    <Translate id='third.chooseRainbond.useEasy1'>只需一个命令安装体验</Translate>
                  </span>
                </div>
                <div>
                  <img src='/img/pass.svg' alt='' />
                  <span>&nbsp;&nbsp;
                    <Translate id='third.chooseRainbond.useEasy2'>兼顾 “简单易用” 和 “功能强大”</Translate>
                  </span>
                </div>
                <div>
                  <img src='/img/pass.svg' alt='' />
                  <span>&nbsp;&nbsp;
                    <Translate id='third.chooseRainbond.useEasy3'>无需编写Dockerfile和YAML</Translate>
                  </span>
                </div>
                <div>
                  <img src='/img/pass.svg' alt='' />
                  <span>&nbsp;&nbsp;
                    <Translate id='third.chooseRainbond.useEasy4'>“以应用为中心”的设计理念</Translate>
                  </span>
                </div>
              </div>
            )}
            {open === 'second' && (
              <div className={styles.how_rainbond_desc}>
                <div>
                  <img src='/img/pass.svg' alt='' />
                  <span>&nbsp;&nbsp;
                    <Translate id='third.chooseRainbond.appDelivery1'>企业应用一键安装和升级</Translate>
                  </span>
                </div>
                <div>
                  <img src='/img/pass.svg' alt='' />
                  <span>&nbsp;&nbsp;
                    <Translate id='third.chooseRainbond.appDelivery2'>提升数十倍私有交付和个性化交付效率</Translate>
                  </span>
                </div>
                <div>
                  <img src='/img/pass.svg' alt='' />
                  <span>&nbsp;&nbsp;
                    <Translate id='third.chooseRainbond.appDelivery3'>功能完备的企业级应用商店</Translate>
                  </span>
                </div>
                <div>
                  <img src='/img/pass.svg' alt='' />
                  <span>&nbsp;&nbsp;
                    <Translate id='third.chooseRainbond.appDelivery4'>构建行业应用生态</Translate>
                  </span>
                </div>
              </div>
            )}
            {open === 'third' && (
              <div className={styles.how_rainbond_desc}>
                <div>
                  <img src='/img/pass.svg' alt='' />
                  <span>&nbsp;&nbsp;
                    <Translate id='third.chooseRainbond.cloudNative1'>开箱即用的一体化云原生平台</Translate>
                  </span>
                </div>
                <div>
                  <img src='/img/pass.svg' alt='' />
                  <span>&nbsp;&nbsp;
                    <Translate id='third.chooseRainbond.cloudNative2'>传统应用一步变成云原生应用</Translate>
                  </span>
                </div>
                <div>
                  <img src='/img/pass.svg' alt='' />
                  <span>&nbsp;&nbsp;
                    <Translate id='third.chooseRainbond.cloudNative3'>拥有完整的云原生特性</Translate>
                  </span>
                </div>
                <div>
                  <img src='/img/pass.svg' alt='' />
                  <span>&nbsp;&nbsp;
                    <Translate id='third.chooseRainbond.cloudNative4'>实现各种数字化能力积累和复用</Translate>
                  </span>
                </div>
              </div>
            )}
            
            {/* {open === 'fourth' && (
              <div className={styles.how_rainbond_desc}>
                <div>
                  <img src='/img/pass.svg' alt='' />
                  <span>用户无需学习KubernetesFourth</span>
                </div>
                <div>
                  <img src='/img/pass.svg' alt='' />
                  <span>用户无需学习KubernetesFourth</span>
                </div>
                <div>
                  <img src='/img/pass.svg' alt='' />
                  <span>用户无需学习KubernetesFourth</span>
                </div>
                <div>
                  <img src='/img/pass.svg' alt='' />
                  <span>用户无需学习KubernetesFourth</span>
                </div>
              </div>
            )}*/}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className={`${styles.how_rainbond_desc_container_start} ${styles.active_btn}`}
            >
              <a href='/docs/quick-start/getting-started'>
                <Translate id='third.chooseRainbond.quickstart'>快速开始 </Translate>
                &nbsp; {'>'} 
              </a> 
            </motion.button>
          </div>
        </section>
        </OverPack>
        {/* 第四屏 */}
        <section className={styles.fouthBg}>
          <div id={styles.section_fouth} className={styles.width}>
            <h1 className={styles.dosc_logo}>
              <img src='/img/smallimages/RainbondStudy.png' alt='' />
            </h1>
            <h1
              style={{
                textAlign: 'center',
                marginBottom: '56px',
                position: 'relative'
              }}
            >
              <img
                src='/img/smallimages/R.png'
                alt=''
                style={{
                  width: '20px',
                  height: '20px',
                  position: 'absolute',
                  left: '12px',
                  bottom: '-36px'
                }}
                className='left_kid_img animate__animated animate__fadeInLeftBig'
              />
              <Translate id='fourth.video'>观看视频学习</Translate> &nbsp;
              <span className={styles.how_rainbond}>Rainbond</span>
            </h1>
            <Cswiper/>
            <Swiper/>
          </div>
        </section>
        {/* 第三屏 */}
        <section className={styles.third}>
          <div id={styles.section_third} className={styles.width}>
            <h1 className={styles.dosc_logo}>
              <img src='/img/smallimages/RainbondDoWhat.png' alt='' />
            </h1>
            <h1
              style={{
                textAlign: 'center',
                marginBottom: '56px',
                position: 'relative'
              }}
            >
              <span className={styles.how_rainbond}>Rainbond</span>
              &nbsp;
                <Translate id='fifth.title'>能做什么?</Translate>
              <img
                src='/img/smallimages/R.png'
                alt=''
                style={{
                  width: '20px',
                  height: '20px',
                  position: 'absolute',
                  right: '12px',
                  bottom: '-36px'
                }}
              />
            </h1>

            <div
              className={`${styles.docs} docs_container`}
            >
              <a href='usescene/IntegrationDev' style={{ position: 'relative' }}>
                <div className={styles.left_logo}>
                  {/* <img src='/img/cursor.svg' /> */}
                  <Translate id='fifth.details'>详情</Translate>
                </div>
                <div className={styles.desc}>
                  <div className={styles.desc_title}>
                    <h4>
                      {/* <a href='usescene/IntegrationDev'>一体化开发测试环境</a> */}
                      <Translate id='fifth.integratedDev.title'>一体化开发测试环境</Translate>
                    </h4>
                  </div>
                  <div className={styles.desc_detail}>
                    <p>
                      <Translate id='fifth.integratedDev.description'>集成化的开发和测试环境，自动识别开发语言和自动构建，提供开箱即用的体验</Translate>
                    </p>
                  </div>
                  {/* <i className={styles.angle}></i> */}
                </div>
              </a>
              <a href='usescene/AppManagement' style={{ position: 'relative' }}>
                <div className={styles.left_logo}>
                  {/* <img src='/img/cursor.svg' /> */}
                  <Translate id='fifth.details'>详情</Translate>
                </div>
                <div className={styles.desc}>
                  <div className={styles.desc_title}>
                    <h4>
                      {/* <a href='usescene/AppManagement'>企业级应用统一管理</a> */}
                      <Translate id='fifth.appUnifiedManage.title'>企业级应用统一管理</Translate>
                    </h4>
                  </div>
                  <div className={styles.desc_detail}>
                    <p>
                      <Translate id='fifth.appUnifiedManage.description'>企业应用和计算资源统一管理，自动化运维，像管理手机APP一样管理企业应用</Translate>
                    </p>
                  </div>
                </div>
                {/* <i className={styles.angle}></i> */}
              </a>
              <a href='usescene/MultiCloudManagement' style={{ position: 'relative' }}>
                <div className={styles.left_logo}>
                  {/* <img src='/img/cursor.svg' /> */}
                  <Translate id='fifth.details'>详情</Translate>
                </div>
                <div className={styles.desc}>
                  <div className={styles.desc_title}>
                    <h4>
                      {/* <a href='usescene/MultiCloudManagement'>应用级多云管理</a> */}
                      <Translate id='fifth.multiCloud.title'>应用级多云管理</Translate>
                    </h4>
                  </div>
                  <div className={styles.desc_detail}>
                    <p>
                      <Translate id='fifth.multiCloud.description'>对接和管理混合云和各种Kubernetes集群，应用透明在多种云上部署和迁移</Translate>
                    </p>
                  </div>
                </div>
                {/* <i className={styles.angle}></i> */}
              </a>
              <a href='usescene/offlineDelivery' style={{ position: 'relative' }}>
                <div className={styles.left_logo}>
                  {/* <img src='/img/cursor.svg' /> */}
                  <Translate id='fifth.details'>详情</Translate>
                </div>
                <div className={styles.desc}>
                  <div className={styles.desc_title}>
                    <h4>
                      {/* <a href='usescene/offlineDelivery'>离线环境软件交付</a> */}
                      <Translate id='fifth.offlineDelivery.title'>离线环境软件交付</Translate>
                    </h4>
                  </div>
                  <div className={styles.desc_detail}>
                    <p>
                      <Translate id='fifth.offlineDelivery.description'>离线环境应用自动化交付，并支持个性化定制和应用运维</Translate>
                    </p>
                  </div>
                </div>
                {/* <i className={styles.angle}></i> */}
              </a>
              <a href='usescene/componentReuse' style={{ position: 'relative' }}>
                <div className={styles.left_logo}>
                  {/* <img src='/img/cursor.svg' /> */}
                  <Translate id='fifth.details'>详情</Translate>
                </div>
                <div className={styles.desc}>
                  <div className={styles.desc_title}>
                    <h4>
                      {/* <a href='usescene/componentReuse'>业务积木式拼装</a> */}
                      <Translate id='fifth.assemble.title'>业务积木式拼装</Translate>
                    </h4>
                  </div>
                  <div className={styles.desc_detail}>
                    <p>
                      <Translate id='fifth.assemble.description'>通过应用模型将业务单元实现模块化，并通过“拖拉拽”的方式实现业务拼装</Translate>
                    </p>
                  </div>
                </div>
                {/* <i className={styles.angle}></i> */}
              </a>
              <a href='usescene/x86ToArm' style={{ position: 'relative' }}>
                <div className={styles.left_logo}>
                  {/* <img src='/img/cursor.svg' /> */}
                  <Translate id='fifth.details'>详情</Translate>
                </div>
                <div className={styles.desc}>
                  <div className={styles.desc_title}>
                    <h4>
                      {/* <a href='usescene/x86ToArm'>国产化和信创支撑</a> */}
                      <Translate id='fifth.localization.title'>国产化和信创支撑</Translate>
                    </h4>
                  </div>
                  <div className={styles.desc_detail}>
                    <p>
                      <Translate id='fifth.localization.description'>支持多种国产化平台，x86架构应用自动化向Arm架构转换</Translate>
                    </p>
                  </div>
                </div>
                {/* <i className={styles.angle}></i> */}
              </a>
              <a href='/usescene/EnterpriseDeliveryOne' style={{ position: 'relative' }}>
                <div className={styles.left_logo}>
                  {/* <img src='/img/cursor.svg' /> */}
                  <Translate id='fifth.details'>详情</Translate>
                </div>
                <div className={styles.desc}>
                  <div className={styles.desc_title}>
                    <h4>
                      {/* <a href='/usescene/EnterpriseDeliveryOne'> */}
                      <Translate id='fifth.continuousDelivery.title'>企业应用持续交付</Translate>
                      {/* </a> */}
                    </h4>
                  </div>
                  <div className={styles.desc_detail}>
                    <p>
                      <Translate id='fifth.continuousDelivery.description'>企业应用一键交付客户，并支持持续升级迭代</Translate>
                    </p>
                  </div>
                </div>
                {/* <i className={styles.angle}></i> */}
              </a>
              <a href='/usescene/EnterpriseDeliveryTwo' style={{ position: 'relative' }}>
                <div className={styles.left_logo}>
                  {/* <img src='/img/cursor.svg' /> */}
                  <Translate id='fifth.details'>详情</Translate>
                </div>
                <div className={styles.desc}>
                  <div className={styles.desc_title}>
                    <h4>
                      {/* <a href='/usescene/EnterpriseDeliveryTwo'> */}
                      <Translate id='fifth.personalizedDelivery.title'>模块化个性化交付</Translate>
                      {/* </a> */}
                    </h4>
                  </div>
                  <div className={styles.desc_detail}>
                    <p>
                      <Translate id='fifth.personalizedDelivery.description'>通过功能模块化，解决2B企业个性化交付的难题</Translate>
                    </p>
                  </div>
                </div>
                {/* <i className={styles.angle}></i> */}
              </a>
              <a
                href='https://store.goodrain.com/'
                target='_blank'
                style={{ position: 'relative' }}
              >
                <div className={styles.left_logo}>
                  {/* <img src='/img/cursor.svg' /> */}
                  <Translate id='fifth.details'>详情</Translate>
                </div>
                <div className={styles.desc}>
                  <div className={styles.desc_title}>
                    <h4>
                      {/* <a href='https://store.goodrain.com/' target='_blank'> */}
                      <Translate id='fifth.rainstore.title'>云原生应用商店</Translate>
                      {/* </a> */}
                    </h4>
                  </div>
                  <div className={styles.desc_detail}>
                    <p>
                      <Translate id='fifth.rainstore.description'>通过云原生技术驱动的企业级应用商店，实现商店的全流程管理，并支持企业应用的各种交付流程</Translate>
                    </p>
                  </div>
                </div>
                {/* <i className={styles.angle}></i> */}
                {/* <div>
                  <img
                    src='/img/Background(2).png'
                    alt=''
                    className={styles.enterprise_logo}
                  />
                </div> */}
              </a>
            </div>
          </div>
        </section>
        
      </div>
      {/* 底部 */}
      <footer className={`${styles.footer_container} `}>
        <h1><Translate id='participate'>参与其中</Translate></h1>
        <div className={`${styles.join_type} ${styles.width}`}>
          <a href='https://t.goodrain.com' target='_blank'>
            <div className={styles.join_logo}>
              <img src='/img/discourse.png' alt='' />
            </div>
            <div className={styles.join_detali}>
              <h4 style={{ fontSize: '20px' }}>
                <Translate id='participate.community.title'>社区</Translate>
              </h4>
              <p>
                <Translate id='participate.community.description'>参考社区,学习或贡献更多Rainbond用例用法</Translate>
              </p>
            </div>
          </a>
          <a
            href='#'
            onMouseMove={() => {
              setHover_Img(true);
            }}
            onMouseLeave={() => {
              setHover_Img(false);
            }}
          >
            <div className={styles.join_logo}>
              {hover_img && (
                <img
                  src='/img/wechart.jpeg'
                  alt='WeChat 979885495'
                  className={styles.hover_img}
                />
              )}
              <img src='/img/we-chat.png' alt='' />
            </div>
            <div className={styles.join_detali}>
              <h4 style={{ fontSize: '20px' }}>WeChat</h4>
              <p>
                <Translate id='participate.wechat'>添加微信助手,加入微信技术交流群 (18800156151)</Translate>
              </p>
            </div>
          </a>
          <a href='#'>
            <div className={styles.join_logo}>
              <img src='/img/dingding.png' alt='' />
            </div>
            <div className={styles.join_detali}>
              <h4 style={{ fontSize: '20px' }}>
                <Translate id='participate.dingtalk.title'>钉钉群</Translate>
              </h4>
              <p>
                <Translate id='participate.dingtalk.description'>搜索钉钉群号进群(31096419)</Translate>
              </p>
            </div>
          </a>
          <a href='/community/contribution/'>
            <div className={styles.join_logo}>
              <img src='/img/GitHub.png' alt='' />
            </div>
            <div className={styles.join_detali}>
              <h4 style={{ fontSize: '20px' }}>
                <Translate id='participate.contribution.title'>贡献</Translate>
              </h4>
              <p>
                <Translate id='participate.contribution.description'>欢迎参与贡献,你可以提出Issues和解决Issues开始</Translate>
              </p>
            </div>
          </a>
        </div>
      </footer>
      <Footer/>
      {/* 遮罩层 */}
      {mask_config && (
        <div
          className={styles.mask_div}
          onClick={() => {
            setMask_config(false);
          }}
        >
          <div className={styles.bili_video}>
            <video
              onClick={e => {
                e.stopPropagation();
              }}
              style={{ width: '100%' }}
              src='https://static.goodrain.com/mp4/HomePageVideo/%E9%A6%96%E9%A1%B5%E8%A7%86%E9%A2%91.mp4'
              controls={true}
              autoPlay
            ></video>
          </div>
        </div>
      )}
    </LayoutProviders>
  );
}
