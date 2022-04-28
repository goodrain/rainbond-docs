import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import LayoutProviders from '@theme/LayoutProviders';
import 'animate.css';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import styles from './index.module.scss';
import Cswiper from '../components/Cswiper'
export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  const [mask_config, setMask_config] = useState(false);
  const [hover_img, setHover_Img] = useState(false);
  // 菜单开关
  const [menu_Config, setMenu_Config] = useState(true);
  useEffect(() => {
    // loadSwiperExample(); // 轮播图实例
    setTimeout(() => {
      const img_animate_right = document.querySelector('.right_kid_img'); // 右边图片
      const img_animate_left = document.querySelector('.left_kid_img'); // 左边图片
      const docs_animate = document.querySelector('.docs_container'); // 文档
      const carousel_animate = document.querySelector('.carousel_container'); // 视频教程
      // 移除类
      img_animate_right.classList.remove(
        'animate__animated',
        'animate__fadeInLeftBig'
      );
      docs_animate.classList.remove(
        'animate__animated',
        'animate__fadeInLeftBig'
      );
      img_animate_left.classList.remove(
        'animate__animated',
        'animate__fadeInLeftBig'
      );
      carousel_animate.classList.remove(
        'animate__animated',
        'animate__fadeInRightBig'
      );
    }, 1500);
  }, []);
  useEffect(() => {
    // 注册页面滚动事件
    window.addEventListener('scroll', handleScrollPage);
    return () => {
      window.removeEventListener('scroll', handleScrollPage);
    };
  }, []);
  const handleScrollPage = () => {
    const img_animate_right = document.querySelector('.right_kid_img'); // 右边图片
    const img_animate_left = document.querySelector('.left_kid_img'); // 左边图片
    const docs_animate = document.querySelector('.docs_container'); // 文档
    const carousel_animate = document.querySelector('.carousel_container'); // 视频教程
    const partner_animate = document.querySelector('.partner'); // 合作伙伴
    let scrollTop = document.documentElement.scrollTop;
    // 右侧logo
    if (img_animate_right.offsetTop >= window.innerHeight) {
      const isScrollTop = img_animate_right.offsetTop - window.innerHeight;
      if (scrollTop >= isScrollTop) {
        img_animate_right.classList.add(
          'animate__animated',
          'animate__fadeInRightBig'
        );
      }
    }
    // 文档
    if (docs_animate.offsetTop >= window.innerHeight) {
      const isScrollTop = docs_animate.offsetTop - window.innerHeight;
      if (scrollTop >= isScrollTop) {
        docs_animate.classList.add('animate__animated');
        docs_animate.classList.add('animate__fadeInLeftBig');
      }
    }
    // 左侧logo
    if (img_animate_left.offsetTop >= window.innerHeight) {
      const isScrollTop = img_animate_left.offsetTop - window.innerHeight;
      if (scrollTop >= isScrollTop) {
        img_animate_left.classList.add(
          'animate__animated',
          'animate__fadeInLeftBig'
        );
      }
    }
    // 视频学习Rainbond
    if (carousel_animate.offsetTop >= window.innerHeight) {
      const isScrollTop = carousel_animate.offsetTop - window.innerHeight;
      if (scrollTop >= isScrollTop) {
        carousel_animate.classList.add(
          'animate__animated',
          'animate__fadeInRightBig'
        );
      }
    }
  };
  // 加载轮播图实例
  const loadSwiperExample = () => {
    const slideW = 300; //一张图300px, 每面四张角度22.5（PI/8），中心角度PI/16
    const radius = (slideW * 0.5) / Math.sin(Math.PI / 16); //半径。圆心并不是视点中心，视点在1200px
    const carouselSwiper = new Swiper('#carousel .swiper', {
      watchSlidesProgress: true,
      slidesPerView: 'auto',
      centeredSlides: false,
      loop: true,
      loopedSlides: 4,
      grabCursor: true,
      //	autoplay: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      },
      on: {
        progress: function (swiper, progress) {
          for (var i = 0; i < this.slides.length; i++) {
            var slide = this.slides.eq(i);
            var slideProgress = this.slides[i].progress;
            var translateX =
              (slideProgress + 1.5) *
                (slideW / 3 -
                  (Math.cos((slideProgress + 1.5) * 0.125 * Math.PI) *
                    slideW *
                    1.1) /
                    3) +
              'px'; //调整图片间距，根据图片宽度改变数值实现自适应
            var rotateY = (slideProgress + 1.5) * 22.5; //图片角度
            var translateZ =
              radius -
              Math.cos((slideProgress + 1.5) * 0.125 * Math.PI) * radius -
              150 +
              'px'; //调整图片远近，刚好4个在画框内
            slide.transform(
              'translateX(' +
                translateX +
                ') translateZ(' +
                translateZ +
                ') rotateY(' +
                rotateY +
                'deg)'
            );
          }
        },
        setTransition: function (swiper, transition) {
          for (var i = 0; i < this.slides.length; i++) {
            var slide = this.slides.eq(i);
            slide.transition(transition);
          }
        }
      }
    });
  };
  const handleJumpDemo = e => {
    axios('https://cloud.goodrain.com/enterprise-server/onlineTrial');
  };
  return (
    <LayoutProviders>
      <Head>
        <title>{siteConfig.title}</title>
        <meta property='og:title' content={siteConfig.title} />
        <link rel='icon' href={siteConfig.favicon} type='image/x-icon' />}
      </Head>
      {/* 导航栏 */}
      <NavBar />
      {/* 主体区域 */}
      <div>
        {/* 第一屏 */}
        <section id={styles.section_first} className={styles.width}>
          <div className={styles.rainbond_desc}>
            <h2
              className='animate__animated animate__fadeInDown'
              style={{ fontSize: '48px' }}
            >
              云原生多云应用管理平台
            </h2>
            <div
              style={{
                margin: '24px 0px 48px',
                color: '#637792',
                fontSize: '16px',
                maxWidth: '360px'
              }}
              className='animate__animated animate__fadeInDown'
            >
              Rainbond
              核心100%开源，使用简单，不需要懂容器和Kubernetes，支持管理多种Kubernetes集群，提供企业级应用的全生命周期管理。
            </div>
            <div>
              <a
                className={`${styles.btns} animate__animated animate__fadeInDown`}
                href='docs/quick-start/quick-install/'
                style={{ marginRight: '16px' }}
              >
                安装使用
              </a>
              <a
                className={`${styles.btns} animate__animated animate__fadeInDown`}
                href='http://demo.c9f961.grapps.cn/'
                target='_blank'
                onClick={handleJumpDemo}
              >
                在线体验
              </a>
            </div>
          </div>
          <div
            className={`${styles.know_rainbond_video} animate__animated animate__slideInRight`}
            style={{ cursor: 'pointer' }}
          >
            <div
              className='mask_video'
              style={{ position: 'relative' }}
              onClick={() => {
                setMask_config(true);
              }}
            >
              <img src='/img/video/video-rainbond.png' alt='' />
            </div>
          </div>
        </section>
        {/* 第二屏 */}
        <section id={styles.section_second} className={styles.width}>
          <div
            className={`${styles.community_case} animate__animated animate__fadeInUpBig `}
          >
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/boe.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container} style={{ width: '160px' }}>
              <a href='#'>
                <img src='/img/users/mky.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/zhx.jpeg' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/yumchina.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/lvzhiyun.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container} style={{ width: '150px' }}>
              <a href='#'>
                <img src='/img/users/lyyl.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/zggk.jpg' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/bkrj.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container} style={{ width: '150px' }}>
              <a href='#'>
                <img src='/img/users/xinanmingzu.png' alt='' />
              </a>
            </div>
          </div>
        </section>
        {/* 第三屏 */}
        <section id={styles.section_third} className={styles.width}>
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
            &nbsp;能做什么?
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
              className='right_kid_img animate__animated animate__fadeInRightBig'
            />
          </h1>

          <div
            className={`${styles.docs} docs_container animate__animated  animate__fadeInLeftBig`}
          >
            <a href='usescene/IntegrationDev'>
              <div className={styles.left_logo}>
                {/* <img src='/img/rainbond.png' alt='' /> */}
              </div>
              <div className={styles.desc}>
                <div className={styles.desc_title}>
                  <h4>
                    <a href='usescene/IntegrationDev'>一体化开发测试环境</a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>
                    集成化的开发和测试环境，自动识别开发语言和自动构建，提供开箱即用的体验
                  </p>
                </div>
              </div>
            </a>
            <a href='usescene/AppManagement'>
              <div className={styles.left_logo}>
                {/* <img src='/img/rainbond.png' alt='' /> */}
              </div>
              <div className={styles.desc}>
                <div className={styles.desc_title}>
                  <h4>
                    <a href='usescene/AppManagement'>企业级应用统一管理</a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>
                    企业应用和计算资源统一管理，自动化运维，像管理手机APP一样管理企业应用
                  </p>
                </div>
              </div>
            </a>
            <a href='usescene/MultiCloudManagement'>
              <div className={styles.left_logo}>
                {/* <img src='/img/rainbond.png' alt='' /> */}
              </div>
              <div className={styles.desc}>
                <div className={styles.desc_title}>
                  <h4>
                    <a href='usescene/MultiCloudManagement'>应用级多云管理</a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>
                    对接和管理混合云和各种Kubernetes集群，应用透明在多种云上部署和迁移
                  </p>
                </div>
              </div>
            </a>
            <a href='usescene/offlineDelivery'>
              <div className={styles.left_logo}>
                {/* <img src='/img/rainbond.png' alt='' /> */}
              </div>
              <div className={styles.desc}>
                <div className={styles.desc_title}>
                  <h4>
                    <a href='usescene/offlineDelivery'>离线环境软件交付</a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>离线环境应用自动化交付，并支持个性化定制和应用运维</p>
                </div>
              </div>
            </a>
            <a href='usescene/componentReuse'>
              <div className={styles.left_logo}>
                {/* <img src='/img/rainbond.png' alt='' /> */}
              </div>
              <div className={styles.desc}>
                <div className={styles.desc_title}>
                  <h4>
                    <a href='usescene/componentReuse'>业务积木式拼装</a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>
                    通过应用模型将业务单元实现模块化，并通过“拖拉拽”的方式实现业务拼装
                  </p>
                </div>
              </div>
            </a>
            <a href='usescene/x86ToArm'>
              <div className={styles.left_logo}>
                {/* <img src='/img/rainbond.png' alt='' /> */}
              </div>
              <div className={styles.desc}>
                <div className={styles.desc_title}>
                  <h4>
                    <a href='usescene/x86ToArm'>国产化和信创支撑</a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>支持多种国产化平台，x86架构应用自动化向Arm架构转换</p>
                </div>
              </div>
            </a>
            <a href='/usescene/EnterpriseDeliveryOne'>
              <div className={styles.left_logo}>
                {/* < img src='/img/rainbond.png' alt='' /> */}
              </div>
              <div className={styles.desc}>
                <div className={styles.desc_title}>
                  <h4>
                    <a href='/usescene/EnterpriseDeliveryOne'>
                      企业应用持续交付
                    </a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>企业应用一键交付客户，并支持持续升级迭代</p>
                </div>
              </div>
            </a>
            <a href='/usescene/EnterpriseDeliveryTwo'>
              <div className={styles.left_logo}>
                {/* < img src='/img/rainbond.png' alt='' /> */}
              </div>
              <div className={styles.desc}>
                <div className={styles.desc_title}>
                  <h4>
                    <a href='/usescene/EnterpriseDeliveryTwo'>
                      模块化个性化交付
                    </a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>通过功能模块化，解决2B企业个性化交付的难题</p>
                </div>
              </div>
            </a>
            <a
              href='https://store.goodrain.com/'
              target='_blank'
              style={{ position: 'relative' }}
            >
              <div className={styles.left_logo}>
                {/* < img src='/img/rainbond.png' alt='' /> */}
              </div>
              <div className={styles.desc}>
                <div className={styles.desc_title}>
                  <h4>
                    <a href='https://store.goodrain.com/' target='_blank'>
                      云原生应用商店
                    </a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>
                    通过云原生技术驱动的企业级应用商店，实现商店的全流程管理，并支持企业应用的各种交付流程
                  </p>
                </div>
              </div>
              {/* <div>
                <img
                  src='/img/Background(2).png'
                  alt=''
                  className={styles.enterprise_logo}
                />
              </div> */}
            </a>
          </div>
        </section>
        {/* 第四屏 */}
        <section id={styles.section_fouth} className={styles.width}>
          <h1 className={styles.dosc_logo} style={{ marginTop: '56px' }}>
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
            观看视频学习 &nbsp;
            <span className={styles.how_rainbond}>Rainbond</span>
          </h1>
          {/* <div
            className={`${styles.carousel_container} carousel_container animate__animated animate__fadeInRightBig`}
          >
            <a
              href='https://www.bilibili.com/video/BV1Vq4y1w7FQ'
              target='_blank'
            >
              <img src='/img/video/install.png' alt='' />
            </a>
            <a
              href='https://www.bilibili.com/video/BV1ou411B7ix'
              target='_blank'
              style={{ padding: 0 }}
            >
              <img src='/img/video/quick.png' alt='' />
            </a>
          </div> */}
          <Cswiper />
        </section>
      </div>
      {/* 底部 */}
      <footer className={`${styles.footer_container} `}>
        <h1>参与其中</h1>
        <div className={`${styles.join_type} ${styles.width}`}>
          <a href='https://t.goodrain.com' target='_blank'>
            <div className={styles.join_logo}>
              <img src='/img/discourse.png' alt='' />
            </div>
            <div className={styles.join_detali}>
              <h4 style={{ fontSize: '20px' }}>社区</h4>
              <p>参考社区,学习或贡献更多Rainbond用例用法</p>
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
              <p>添加微信助手,加入微信技术交流群 (18800156151)</p>
            </div>
          </a>
          <a href='#'>
            <div className={styles.join_logo}>
              <img src='/img/dingding.png' alt='' />
            </div>
            <div className={styles.join_detali}>
              <h4 style={{ fontSize: '20px' }}>钉钉群</h4>
              <p>搜索钉钉群号进群(31096419)</p>
            </div>
          </a>
          <a href='docs/contributing'>
            <div className={styles.join_logo}>
              <img src='/img/GitHub.png' alt='' />
            </div>
            <div className={styles.join_detali}>
              <h4 style={{ fontSize: '20px' }}>贡献</h4>
              <p>欢迎参与贡献,你可以提出Issues和解决Issues开始</p>
            </div>
          </a>
        </div>
      </footer>
      <div className={`${styles.copyright} footer footer--dark`}>
        Copyright © 2022 北京好雨科技有限公司, Inc. All Rights Reserved.
        京ICP备15028663号-4
      </div>
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
              controls='controls'
            ></video>
          </div>
        </div>
      )}
    </LayoutProviders>
  );
}
