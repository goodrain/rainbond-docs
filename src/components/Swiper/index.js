import React, { useCallback, useEffect, useState } from 'react';
import './caluso.css';
import './swiper-min.css';

export default function swiper() {

  useEffect(() => {
    loadSwiperExample();
  },[])
  // 加载轮播图实例
  const loadSwiperExample = () => {
    // 动态引入swiper.js
    const script = document.createElement('script');
    script.src = 'https://static.goodrain.com/docusaurus/swiper-bundle.js';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(script, s);
    script.onload = script.onreadystatechange = function () {
      const slideW = 300; //一张图300px, 每面四张角度22.5（PI/8），中心角度PI/16
      const radius = (slideW * 0.5) / Math.sin(Math.PI / 16); //半径。圆心并不是视点中心，视点在1200px
      const carouselSwiper = new Swiper('#carousel .swiper', {
        autoplay: true,
        watchSlidesProgress: true,
        slidesPerView: 'auto',
        centeredSlides: false,
        loop: true,
        loopedSlides: 4,
        grabCursor: true,
        // autoplay: true,
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
  };
  return (
    <>
      <div id="carousel">
        <div className="swiper swiper-3d">
          <div className="swiper-wrapper">
            <div className="swiper-slide">
              <a href='https://www.bilibili.com/video/BV1Vq4y1w7FQ' target='_blank'> 
                <img src='/img/video/install.png'/>
              </a>
            </div>
            <div className="swiper-slide">
              <a href='https://www.bilibili.com/video/BV1ou411B7ix' target='_blank'>
                <img src='/img/video/quick.png'/>
              </a>
            </div>
            <div className="swiper-slide">
              <a  href='https://www.bilibili.com/video/BV1vS4y1w7ps' target='_blank'>
                <img src='/img/video/gitlab+rainbond.png'/>
              </a>
            </div>
            <div className="swiper-slide">
              <a  href='https://www.bilibili.com/video/BV1rB4y197X4' target='_blank'>
                <img src='/img/video/enterprise-app-manage.png'/>
              </a>
            </div>
            <div className="swiper-slide">
              <a href='https://www.bilibili.com/video/BV1MZ4y1b7wW' target='_blank'>
                <img src='/img/video/pig.png'/>
              </a>
            </div>
            <div className="swiper-slide">
              <a href='https://www.bilibili.com/video/BV1XY4y1W7ox' target='_blank'>
                <img src='/img/video/rainstore.png'/>
              </a>
            </div>
          </div>
        </div>
        <div className="swiper-pagination"></div>
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </div>
    </>
  )
} 