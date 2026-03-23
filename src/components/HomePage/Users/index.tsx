/**
 * Copyright (c) Goodrain, Inc.
 *
 * This source code is licensed under the LGPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { motion } from "framer-motion";
import styles from "./styles.module.css";

export default function Users() {
  const logos = [
    {
      image: "/img/users/boe.png",
      name: "Boe",
    },
    {
      image: "/img/users/ccteg.png",
      name: "CCTEG",
    },
    {
      image: "/img/users/benz.jpeg",
      name: "Benz",
    },
    {
      image: "/img/users/talkweb.png",
      name: "Talkweb",
    },
    {
      image: "/img/users/zhx.png",
      name: "ZHX",
    },
    {
      image: "/img/users/zggk.png",
      name: "ZGGK",
    },
    {
      image: "/img/users/xinanminzu.png",
      name: "Xinanminzu",
    },
    {
      image: "/img/users/haijun.png",
      name: "Haijun",
    },
    {
      image: "/img/users/ligong.png",
      name: "Ligong",
    },
    {
      image: "/img/users/guofang.png",
      name: "Guofang",
    },
    {
      image: "/img/users/renminjc.png",
      name: "Renminjc",
    },
    {
      image: "/img/users/guangxitizhuan.png",
      name: "Guangxitizhuan",
    },
    {
      image: "/img/users/kaaosi.png",
      name: "Kaaosi",
    },
    {
      image: "/img/users/ghh.jpeg",
      name: "Ghh",
    },
    {
      image: "/img/users/xjny.png",
      name: "Xjny",
    },
    {
      image: "/img/users/bkrj.png",
      name: "Bkrj",
    },
    {
      image: "/img/users/bjcj.png",
      name: "Bjcj",
    },
    {
      image: "/img/users/gitee.png",
      name: "Gitee",
    },
    {
      image: "/img/users/xndl.png",
      name: "Xndl",
    },
    {
      image: "/img/users/dianxinwusuo.png",
      name: "Dianxinwusuo",
    },
    {
      image: "/img/users/28s.jpg",
      name: "28s",
    },
    {
      image: "/img/users/ann.png",
      name: "Ann",
    },
    {
      image: "/img/users/lyyl.png",
      name: "Lyyl",
    },
    {
      image: "/img/users/fzsc.png",
      name: "Fzsc",
    },
  ];

  // Duplicate logos for seamless loop
  const allLogos = [...logos, ...logos];

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <div className={styles.usersSection}>
      {/* 背景分割区域 */}
      <div className={styles.bgSection}>
        {/* <div className={styles.lf}></div> */}
        <div className={styles.mid}>
          <img src="/img/split-bg.png" alt="" />

          {/* 标题居中在背景分割区域 */}
          <motion.div 
            className={styles.titleWrapper}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={itemVariants}
          >
            <h2 className={styles.title}>
              受到上千家生产用户的信赖
            </h2>
          </motion.div>
        </div>
        {/* <div className={styles.rt}></div> */}
      </div>

      {/* Logo Carousel - Full Width */}
      <div className={styles.logoCarousel}>
        <div className={styles.logoTrack}>
          {allLogos.map((logo, index) => (
            <div key={index} className={styles.logoItem}>
              <img
                src={logo.image}
                alt={logo.name}
                className={styles.logoImage}
              />
            </div>
          ))}
        </div>
      </div>

      <motion.div 
        className={styles.container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={itemVariants}
      >
        {/* Testimonial */}
        <div className={styles.testimonial}>
          <p className={styles.quote}>
            "Rainbond 让我们的技术团队从繁琐的 K8s 配置中解放出来，应用交付效率提升了 <span className={styles.highlight}>300%</span> "
          </p>
          <div className={styles.author}>
            <div className={styles.authorTitle}>某公司技术总监</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}