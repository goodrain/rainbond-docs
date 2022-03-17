import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import 'animate.css';
import React, { useEffect } from 'react';
import Swiper from '../script/swiper.js';
import './caluso.css';
import styles from './index.module.css';
import './swiper-min.css';

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  useEffect(() => {
    loadSwiperExample(); // 轮播图实例
    handleBiliVideo(); // 加载视频
  }, []);
  useEffect(() => {
    // 注册页面滚动事件
    window.addEventListener('scroll', handleScrollPage);
    return () => {
      window.removeEventListener('scroll', handleScrollPage);
    };
  }, []);
  const handleScrollPage = () => {
    let scrollTop = document.documentElement.scrollTop;
    // 右侧logo
    if (scrollTop >= 15) {
      const img_animate = document.querySelector('.right_kid_img');
      img_animate.classList.add('animate__animated');
      img_animate.classList.add('animate__fadeInRightBig');
    }
    // 文档
    if (scrollTop >= 150) {
      const docs_animate = document.querySelector('.docs_container');
      docs_animate.classList.add('animate__animated');
      docs_animate.classList.add('animate__fadeInLeftBig');
    }
    // 左侧logo
    if (scrollTop >= 805) {
      const img_animate = document.querySelector('.left_kid_img');
      img_animate.classList.add('animate__animated');
      img_animate.classList.add('animate__fadeInLeftBig');
    }
    // 视频学习Rainbond
    if (scrollTop >= 935) {
      const carousel_animate = document.querySelector('.carousel_container');
      carousel_animate.classList.add('animate__animated');
      carousel_animate.classList.add('animate__fadeInRightBig');
    }
    // 战略合作伙伴
    if (scrollTop >= 1560) {
      const partner_animate = document.querySelector('.partner');
      partner_animate.classList.add('animate__animated');
      partner_animate.classList.add('animate__flipInX');
    }
  };
  // BVideo function
  const handleBiliVideo = () => {
    const mask_img = document.querySelector('.mask_video');
    const bili_video = document.querySelector('.bili_video');
    mask_img.onclick = function () {
      this.style.display = 'none';
      bili_video.style.display = 'block';
    };
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

  return (
    <Layout>
      <div>
        {/* 第一屏 */}
        <section id={styles.section_first} className={styles.width}>
          <div className={styles.rainbond_desc}>
            <h1
              className={`${styles.title} animate__animated animate__bounceInLeft`}
              style={{ marginBottom: '24px' }}
            >
              <img src='/img/rainbondlog.png' alt='Rainbond' />
            </h1>
            <h2
              className='animate__animated animate__fadeInDown'
              style={{ fontSize: '48px' }}
            >
              云原生多云应用管理平台
            </h2>
            <p
              style={{
                margin: '24px 0px 48px',
                color: '#637792',
                fontSize: '16px',
                maxWidth: '360px'
              }}
              className='animate__animated animate__fadeInDown'
            >
              <p style={{ lineHeight: '30px' }}>
                Rainbond 核心
                <span className={styles.open_source}>&nbsp;100%&nbsp;</span>
                开源
              </p>
              <p style={{ lineHeight: '30px' }}>
                使用简单，不需要懂容器和Kubernetes，支持管理多种Kubernetes集群，提供企业级应用的全生命周期管理。
              </p>
            </p>
            <div>
              <a
                className={`${styles.btns} animate__animated animate__fadeInDown`}
                href='https://www.rainbond.com/docs/quick-start/quick-install/'
                target='_blank'
                style={{ marginRight: '16px' }}
              >
                安装使用
              </a>
              <a
                className={`${styles.btns} animate__animated animate__fadeInDown`}
                href='http://demo.c9f961.grapps.cn/#/user/login'
                target='_blank'
              >
                在线体验
              </a>
            </div>
          </div>
          <div
            className={`${styles.know_rainbond_video} animate__animated animate__slideInRight`}
          >
            <div className='mask_video' style={{ position: 'relative' }}>
              <img src='/img/mask_video.jpeg' alt='' />
              <img src='/img/video.svg' alt='' className={styles.play_btn} />
            </div>

            <div
              className={`${styles.hide} bili_video`}
              style={{ padding: '0px 16px' }}
            >
              <video
                style={{ maxWidth: '100%', height: 'auto' }}
                src='https://grstatic.oss-cn-shanghai.aliyuncs.com/videos/demo-video-5.2.mp4'
                controls='controls'
              ></video>
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
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/mky.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/bkrj.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/gfkj.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/lvzhiyun.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/xinanmingzu.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/yumchina.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/lyyl.png' alt='' />
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
              marginBottom: '24px',
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
                right: 0,
                bottom: '6px'
              }}
              className='right_kid_img'
            />
          </h1>

          <ul className={`${styles.docs} docs_container`}>
            <li>
              <div className={styles.left_logo}>
                <img src='/img/rainbond.png' alt='' />
              </div>
              <div className={styles.desc}>
                <div className={styles.desc_title}>
                  <h4>
                    <a href='useScene/IntegrationDev'>
                      一体化开发测试环境
                    </a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>
                    集成化的开发和测试环境，自动识别开发语言和自动构建，提供开箱即用的体验
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.left_logo}>
                <img src='/img/rainbond.png' alt='' />
              </div>
              <div className={styles.desc}>
                <div className={styles.desc_title}>
                  <h4>
                    <a href='useScene/AppManagement' >
                      企业级应用统一管理
                    </a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>
                    企业应用和计算资源统一管理，自动化运维，像管理手机APP一样管理企业应用
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.left_logo}>
                <img src='/img/rainbond.png' alt='' />
              </div>
              <div className={styles.desc}>
                <div className={styles.desc_title}>
                  <h4>
                    <a href='useScene/MultiCloudManagement' >
                      应用级多云管理
                    </a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>
                    对接和管理混合云和各种Kubernetes集群，应用透明在多种云上部署和迁移
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.left_logo}>
                <img src='/img/rainbond.png' alt='' />
              </div>
              <div className={styles.desc}>
                <div className={styles.desc_title}>
                  <h4>
                    <a href='useScene/offlineDelivery' >
                      离线环境软件交付
                    </a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>
                    离线环境应用自动化交付，并支持个性化定制和应用运维
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.left_logo}>
                <img src='/img/rainbond.png' alt='' />
              </div>
              <div className={styles.desc}>
                <div className={styles.desc_title}>
                  <h4>
                    <a href='useScene/componentReuse' >
                      业务积木式拼装
                    </a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>
                    通过应用模型将业务单元实现模块化，并通过“拖拉拽”的方式实现业务拼装
                  </p>
                </div>
              </div>
            </li>
            <li>
              <div className={styles.left_logo}>
                <img src='/img/rainbond.png' alt='' />
              </div>
              <div className={styles.desc}>
                <div className={styles.desc_title}>
                  <h4>
                    <a href='useScene/x86ToArm' >
                      国产化和信创支撑
                    </a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>
                    支持多种国产化平台，x86架构应用自动化向Arm架构转换
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </section>
        {/* 第四屏 */}
        <section id={styles.section_fouth} className={styles.width}>
          <h1 className={styles.dosc_logo}>
            <img src='/img/smallimages/RainbondStudy.png' alt='' />
          </h1>
          <h1
            style={{
              textAlign: 'center',
              marginBottom: '24px',
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
                left: 0,
                bottom: '6px'
              }}
              className='left_kid_img'
            />
            观看视频学习 &nbsp;
            <span className={styles.how_rainbond}>Rainbond</span>
          </h1>
          <div className={`${styles.carousel_container} carousel_container`}>
            <div id='carousel'>
              <div className='swiper swiper-3d'>
                <div className='swiper-wrapper'>
                  <div className='swiper-slide'>
                    <img src='/img/video/install.png' />
                    <p> Rainbond 安装系列教程</p>
                  </div>
                  <div className='swiper-slide'>
                  <img src='/img/video/quick.png' />
                    <p>Rainbond 入门系列教程</p>
                  </div>
                </div>
              </div>
              <div className='swiper-pagination'></div>
              <div className='swiper-button-prev'></div>
              <div className='swiper-button-next'></div>
            </div>
          </div>
        </section>
        {/* 第五屏 */}
        <section id={styles.section_second} className={styles.width}>
          <h1 className={styles.dosc_logo}>
            <img src='/img/smallimages/RainbondPartner.png' alt='' />
          </h1>
          <h1
            style={{
              textAlign: 'center',
              marginBottom: '24px'
            }}
          >
            合作伙伴
          </h1>
          <div className={`${styles.community_case} partner`}>
          <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/boe.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/mky.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/bkrj.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/gfkj.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/lvzhiyun.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/xinanmingzu.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/yumchina.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/lyyl.png' alt='' />
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
