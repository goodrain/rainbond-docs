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
  //  淡入淡出效果
  const handleFadeIn = (elemt, speed) => {
    if (elemt.style.opacity == 0 && elemt.style.opacity != '') {
      var speed = speed || 16.6; //默认速度为16.6ms
      var num = 0; //累加器
      var timer = setInterval(function () {
        num++;
        elemt.style.opacity = num / 20;
        if (num >= 20) {
          clearInterval(timer);
        }
      }, speed);
    }
  };
  const handleJumpDemo = e => {
    e.preventDefault();
    fetch('https://cloud.goodrain.com/enterprise-server/onlineTrial').finally(
      () => {
        window.open('http://demo.c9f961.grapps.cn/');
      }
    );
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
            <div
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
            </div>
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
                href='http://demo.c9f961.grapps.cn/'
                onClick={handleJumpDemo}
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
                <img src='/img/users/5suo.jpg' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/bkrj.jpg' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/boe.jpg' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/bumu.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/didi.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/dipu.jpeg' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/guangxitizhuan.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/hongya.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/jianbo.jpg' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/jilian.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/luneng.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/meike.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/pingan.jpeg' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/qinghehulian.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/qingnenghulian.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='https://www.yuexin.cn/_nuxt/img/da3a284.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/rongze.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/sdzk.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/sumeida.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/wanjiang.png' alt='' />
              </a>
            </div>
          </div>
        </section>
        {/* 第三屏 */}
        <section id={styles.section_third} className={styles.width}>
          <h1 className={styles.dosc_logo}>
            <img src='/img/how_rainbond.png' alt='' />
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
              src='/img/kid.jpg'
              alt=''
              style={{
                width: '100px',
                height: '100px',
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
                    <a href='#' target='_blank'>
                      Algolia Docsearch
                    </a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>
                    The best search experience for docs, integrates in minutes,
                    for free
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
                    <a href='#' target='_blank'>
                      Algolia Docsearch
                    </a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>
                    The best search experience for docs, integrates in minutes,
                    for free
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
                    <a href='#' target='_blank'>
                      Algolia Docsearch
                    </a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>
                    The best search experience for docs, integrates in minutes,
                    for free
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
                    <a href='#' target='_blank'>
                      Algolia Docsearch
                    </a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>
                    The best search experience for docs, integrates in minutes,
                    for free
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
                    <a href='#' target='_blank'>
                      Algolia Docsearch
                    </a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>
                    The best search experience for docs, integrates in minutes,
                    for free
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
                    <a href='#' target='_blank'>
                      Algolia Docsearch
                    </a>
                  </h4>
                </div>
                <div className={styles.desc_detail}>
                  <p>
                    The best search experience for docs, integrates in minutes,
                    for free
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </section>
        {/* 第四屏 */}
        <section id={styles.section_fouth} className={styles.width}>
          <h1 className={styles.dosc_logo}>
            <img src='/img/study_rainbond.png' alt='' />
          </h1>
          <h1
            style={{
              textAlign: 'center',
              marginBottom: '24px',
              position: 'relative'
            }}
          >
            <img
              src='/img/kid.jpeg'
              alt=''
              style={{
                width: '100px',
                height: '100px',
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
                    <img src='/img/1.jpg' />
                    <p>自古逢秋悲寂寥</p>
                  </div>
                  <div className='swiper-slide'>
                    <img src='/img/2.jpg' />
                    <p>我言秋日胜春朝</p>
                  </div>
                  <div className='swiper-slide'>
                    <img src='/img/3.jpg' />
                    <p>晴空一鹤排云上</p>
                  </div>
                  <div className='swiper-slide'>
                    <img src='/img/11.jpg' />
                    <p>便引诗情到碧霄</p>
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
            <img src='/img/partner.jpeg' alt='' />
          </h1>
          <h1
            style={{
              textAlign: 'center',
              marginBottom: '24px'
            }}
          >
            战略合作伙伴
          </h1>
          <div className={`${styles.community_case} partner`}>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/5suo.jpg' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/bkrj.jpg' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/boe.jpg' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/bumu.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/didi.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/dipu.jpeg' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/guangxitizhuan.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/hongya.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/jianbo.jpg' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/jilian.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/luneng.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/meike.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/pingan.jpeg' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/qinghehulian.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/qingnenghulian.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='https://www.yuexin.cn/_nuxt/img/da3a284.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/rongze.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/sdzk.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/sumeida.png' alt='' />
              </a>
            </div>
            <div className={styles.img_container}>
              <a href='#'>
                <img src='/img/users/wanjiang.png' alt='' />
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
