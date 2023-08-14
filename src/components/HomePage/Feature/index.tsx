/**
 * Copyright (c) Goodrain, Inc.
 *
 * This source code is licensed under the LGPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */


import React from "react";
import { animated, useTrail } from "react-spring";
import styles from "./styles.module.css";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import Devops from '/img/homepage/svg/devops.svg';
import Monitor from '/img/homepage/svg/monitor.svg';
import Maintenance from '/img/homepage/svg/maintenance.svg';
import Store from '/img/homepage/svg/store.svg';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import Translate from "@docusaurus/Translate";

export default function Feature() {

  const animatedTexts = useTrail(5, {
    from: { opacity: 0, transform: 'translateY(3em)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: {
      mass: 3,
      friction: 45,
      tension: 460,
    },
  })


  return (
    <div className={clsx('container', styles.global)}>
      <animated.div style={animatedTexts[0]}>
        <h2 className={styles.title}>
          <Translate id="feature.title">零学习成本，图形界面，鼠标点击就能完成所有操作</Translate>
        </h2>


        {/* devops */}
        <div className="row" style={{ paddingTop: '50px' }}>
          <div className="col col--8" style={{ paddingRight: 20 }}>
            <ul className={clsx('newlopo', styles.newlopo)}>
              <li>
                <PhotoProvider>
                  <PhotoView src="/img/homepage/sourcecode/kaifayuyan.png">
                    <img src="/img/homepage/sourcecode/kaifayuyan.png" title="点击查看完整图片"/>
                  </PhotoView>
                </PhotoProvider>
                <span>开发语言自动识别</span>
              </li>
              <li>
                <PhotoProvider>
                  <PhotoView src="/img/homepage/sourcecode/goujiancanshu.png">
                    <img src="/img/homepage/sourcecode/goujiancanshu.png" title="点击查看完整图片"/>
                  </PhotoView>
                </PhotoProvider>
                <span>构建参数自动填充</span>
              </li>
              <li>
                <PhotoProvider>
                  <PhotoView src="/img/homepage/sourcecode/gaojipeizhi.png">
                    <img src="/img/homepage/sourcecode/gaojipeizhi.png" title="点击查看完整图片"/>
                  </PhotoView>
                </PhotoProvider>
                <span>自定义高级配置</span>
              </li>
              <li>
                <PhotoProvider>
                  <PhotoView src="/img/homepage/sourcecode/yunxingzhuangtai.png">
                    <img src="/img/homepage/sourcecode/yunxingzhuangtai.png" title="点击查看完整图片"/>
                  </PhotoView>
                </PhotoProvider>
                <span>运行状态一目了然</span>
              </li>
            </ul>
          </div>
          <div className="col col--4" style={{ padding: 20 }}>
            <div className="row">
              <div className={clsx("col col--12", styles.desc_svg)}>
                <Devops style={{ float: 'right' }} />
              </div>
              <div className="col col--12">
                <h3 className={styles.subtitle} style={{ float: 'right' }}>
                  <Translate id="feature.devops.title">
                    源码自动识别和部署
                  </Translate>
                </h3>
              </div>
              <div className="col col--12">
                <p className={clsx(styles.content, styles.devops_content)}>
                  <Translate id="feature.devops.description">
                  Rainbond 支持自动识别各类开发语言，如Java、Python、Golang、NodeJS、Dockerfile、Php、.NetCore等，通过简单的向导式流程，无需配置或少量配置，即可将你的业务快速部署到 K8s 集群中进行高效管理。
                  </Translate>
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* Kubernetes multi cluster */}
        <div className="row" style={{ paddingTop: '150px' }}>
          <div className="col col--4">
            <div className="row">
              <div className="col col--12">
                <Store style={{ float: 'left' }} />
              </div>
              <div className="col col--12">
                <h3 className={styles.subtitle} style={{ float: 'left' }}>
                  <Translate id="feature.k8s.title">
                    模块化拼装
                  </Translate>
                </h3>
              </div>
              <div className="col col--12">
                <p className={clsx(styles.content, styles.k8s_content)}>
                  <Translate id="feature.k8s.description">
                  Rainbond 提供强大的模块化拼装能力，让各业务程序间可以通过简单连线的方式快速编排。无论是前端项目依赖后端，还是其他组件之间的协作，只需进入编排模式，将它们连接在一起，即可迅速建立关联并启用。你的业务可以灵活沉淀为独立的应用模块，这些模块可以随意组合、无限拼装，最终构建出多样化的应用系统。
                  </Translate>
                </p>
              </div>
            </div>
          </div>
          <div className="col col--8">
            <div className={clsx('card', styles.card)}>
              <ul className={clsx('newlopo', styles.newlopo)}>
                <li>
                  <PhotoProvider>
                    <PhotoView src="/img/homepage/modularization/lianjiefangshi.png">
                      <img src="/img/homepage/modularization/lianjiefangshi.png" title="点击查看完整图片"/>
                    </PhotoView>
                  </PhotoProvider>
                  <span>连线方式快速编排</span>
                </li>
                <li>
                  <PhotoProvider>
                    <PhotoView src="/img/homepage/modularization/kuaisubushu.png">
                      <img src="/img/homepage/modularization/kuaisubushu.png" title="点击查看完整图片"/>
                    </PhotoView>
                  </PhotoProvider>
                  <span>快速部署其他模块</span>
                </li>
                <li>
                  <PhotoProvider>
                    <PhotoView src="/img/homepage/modularization/jimu.png">
                      <img src="/img/homepage/modularization/jimu.png" title="点击查看完整图片"/>
                    </PhotoView>
                  </PhotoProvider>
                  <span>积木式拼装</span>
                </li>
                <li>
                  <PhotoProvider>
                    <PhotoView src="/img/homepage/modularization/tuoputu.png">
                      <img src="/img/homepage/modularization/tuoputu.png" title="点击查看完整图片"/>
                    </PhotoView>
                  </PhotoProvider>
                  <span>应用级拓扑图管理</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Servier mesh */}
        <div className="row" style={{ paddingTop: '150px' }}>
          <div className="col col--8">
            <div className={clsx('card', styles.card)}>
              <ul className={clsx('newlopo', styles.newlopo)}>
                <li>
                  <PhotoProvider>
                    <PhotoView src="/img/homepage/jiankong/xinneng.png">
                      <img src="/img/homepage/jiankong/xinneng.png" title="点击查看完整图片"/>
                    </PhotoView>
                  </PhotoProvider>
                  <span>组件性能监控</span>
                </li>
                <li>
                  <PhotoProvider>
                    <PhotoView src="/img/homepage/jiankong/log.png">
                      <img src="/img/homepage/jiankong/log.png" title="点击查看完整图片"/>
                    </PhotoView>
                  </PhotoProvider>
                  <span>组件日志</span>
                </li>
                <li>
                  <PhotoProvider>
                    <PhotoView src="/img/homepage/jiankong/shiyong.png">
                      <img src="/img/homepage/jiankong/shiyong.png" title="点击查看完整图片"/>
                    </PhotoView>
                  </PhotoProvider>
                  <span>资源使用监控</span>
                </li>
                <li>
                  <PhotoProvider>
                    <PhotoView src="/img/homepage/jiankong/jiankang.png">
                      <img src="/img/homepage/jiankong/jiankang.png" title="点击查看完整图片"/>
                    </PhotoView>
                  </PhotoProvider>
                  <span>容器健康状态</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="col col--4">
            <div className="row">
              <div className={clsx("col col--12", styles.desc_svg)}>
                <Monitor style={{ float: 'right' }} />
              </div>
              <div className="col col--12">
                <h3 className={styles.subtitle} style={{ float: 'right' }}>
                  <Translate id="feature.mesh.title">
                    丰富的监控
                  </Translate>
                </h3>
              </div>
              <div className="col col--12">
                <p className={clsx(styles.content, styles.mesh_content)}>
                  <Translate id="feature.mesh.description">
                  Rainbond 提供全方位的监控能力，涵盖组件性能、组件日志、资源使用、容器健康状态等多个维度。可以轻松地了解系统各部分的运行情况，确保应用的可靠性和稳定性。
                  </Translate>
                </p>
              </div>
            </div>
          </div>
        </div>


        {/* App store */}
        <div className="row" style={{ paddingTop: '150px' }}>
          <div className="col col--4">
            <div className="row">
              <div className="col col--12">
                <Maintenance style={{ float: 'left' }} />
              </div>
              <div className="col col--12">
                <h3 className={styles.subtitle} style={{ float: 'left' }}>
                  <Translate id="feature.appstore.title">
                  应用快速运维
                  </Translate>
                </h3>
              </div>
              <div className="col col--12">
                <p className={clsx(styles.content, styles.store_content)}>
                  <Translate id="feature.appstore.description">
                  Rainbond 提供了面向应用的全生命周期管理运维，支持一键管理应用内组件的批量启动、关闭、构建、更新、回滚等关键操作。同时还支持应用网关策略管理和证书管理，支持应用故障时自动恢复，以及应用自动伸缩等功能。
                  </Translate>
                </p>
              </div>
            </div>
          </div>
          <div className="col col--8">
            <div className={clsx('card', styles.card)}>
              <ul className={clsx('newlopo', styles.newlopo)}>
                <li>
                  <PhotoProvider>
                    <PhotoView src="/img/homepage/yunwei/shengmingzhouqj.png">
                      <img src="/img/homepage/yunwei/shengmingzhouqj.png" title="点击查看完整图片"/>
                    </PhotoView>
                  </PhotoProvider>
                  <span>应用全生命周期管理</span>
                </li>
                <li>
                  <PhotoProvider>
                    <PhotoView src="/img/homepage/yunwei/wangguan.png">
                      <img src="/img/homepage/yunwei/wangguan.png" title="点击查看完整图片"/>
                    </PhotoView>
                  </PhotoProvider>
                  <span>应用网关策略管理</span>
                </li>
                <li>
                  <PhotoProvider>
                    <PhotoView src="/img/homepage/yunwei/zhengshu.png">
                      <img src="/img/homepage/yunwei/zhengshu.png" title="点击查看完整图片"/>
                    </PhotoView>
                  </PhotoProvider>
                  <span>应用证书管理</span>
                </li>
                <li>
                  <PhotoProvider>
                    <PhotoView src="/img/homepage/yunwei/shensuo.png">
                      <img src="/img/homepage/yunwei/shensuo.png" title="点击查看完整图片"/>
                    </PhotoView>
                  </PhotoProvider>
                  <span>应用自动伸缩配置</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
}