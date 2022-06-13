import React, { useEffect, useState } from 'react';
import { Navigation, A11y, Autoplay} from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import styles from './index.module.scss';

export default function Index() {
    return (
      <>
        <Swiper
            modules={[Navigation, A11y, Autoplay]}
            spaceBetween={50}
            slidesPerView={2}
            navigation
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
            }}
            className={styles.swiperDisplay}
        >
            <SwiperSlide>
                <a href='https://www.bilibili.com/video/BV1Vq4y1w7FQ' target='_blank'>
                    <img src='/img/video/install.png' alt='' />
                </a>
            </SwiperSlide>
            <SwiperSlide>
                <a href='https://www.bilibili.com/video/BV1ou411B7ix' target='_blank'>
                    <img src='/img/video/quick.png' alt='' />
                </a>
            </SwiperSlide>
            <SwiperSlide>
                <a href='https://www.bilibili.com/video/BV1vS4y1w7ps' target='_blank'>
                    <img src='/img/video/gitlab+rainbond.png' alt='' />
                </a>
            </SwiperSlide>
            <SwiperSlide>
                <a href='https://www.bilibili.com/video/BV1rB4y197X4' target='_blank'>
                    <img src='/img/video/enterprise-app-manage.png' alt='' />
                </a>
            </SwiperSlide>
            <SwiperSlide>
                <a href='https://www.bilibili.com/video/BV1MZ4y1b7wW' target='_blank'>
                    <img src='/img/video/pig.png' alt='' />
                </a>
            </SwiperSlide>
            <SwiperSlide>
                <a href='https://www.bilibili.com/video/BV1XY4y1W7ox' target='_blank'>
                    <img src='/img/video/rainstore.png' alt='' />
                </a>
            </SwiperSlide>
        </Swiper>
      </>
    );
}