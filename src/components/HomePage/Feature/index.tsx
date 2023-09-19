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
import { useLocation } from '@docusaurus/router';
import Link from "@docusaurus/Link";
import LazyLoad from 'react-lazyload';
import Devops from '/img/homepage/svg/devops.svg';
import Monitor from '/img/homepage/svg/monitor.svg';
import Maintenance from '/img/homepage/svg/maintenance.svg';
import Store from '/img/homepage/svg/store.svg';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import Translate from "@docusaurus/Translate";

export default function Feature() {

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


  return (
    <div className={clsx('container', styles.global)}>
      <animated.div style={animatedTexts[0]}>
        <h2 className={styles.title}>
          <Translate id="feature.use.title">零学习成本，图形界面，鼠标点击就能完成所有操作</Translate>
        </h2>


        {/* devops */}
        <div className="row" style={{ paddingTop: '50px' }}>
          <div className="col col--8" style={{ paddingRight: 20 }}>
            <ul className={clsx('newlopo', styles.newlopo)}>
              <li>
                <LazyLoad height={200} offset={100}>
                  <PhotoProvider>
                    <PhotoView src="/img/homepage/sourcecode/source_code_check.png">
                      {!LocalUrlEn? <img src="/img/homepage/sourcecode/source_code_check.png" title="点击查看完整图片" /> : <img src="/img/homepage/sourcecode/source_code_check_en.png" title="Click to view full image" />}
                    </PhotoView>
                  </PhotoProvider>
                </LazyLoad>
                <span>
                  <Translate id="feature.source_code_check">源码类型自动识别</Translate>
                </span>
              </li>
              <li>
                <LazyLoad height={200} offset={100}>
                  <PhotoProvider>
                    <PhotoView src="/img/homepage/sourcecode/custom_build_env.png">
                      {!LocalUrlEn? <img src="/img/homepage/sourcecode/custom_build_env.png" title="点击查看完整图片" /> : <img src="/img/homepage/sourcecode/custom_build_env_en.png" title="Click to view full image" />}
                    </PhotoView>
                  </PhotoProvider>
                </LazyLoad>
                <span>
                  <Translate id="feature.custom_build_env">自定义构建环境</Translate>
                </span>
              </li>
              <li>
                <LazyLoad height={200} offset={100}>
                  <PhotoProvider>
                    <PhotoView src="/img/homepage/sourcecode/running_parameter_config.png">
                      {!LocalUrlEn? <img src="/img/homepage/sourcecode/running_parameter_config.png" title="点击查看完整图片" /> : <img src="/img/homepage/sourcecode/running_parameter_config_en.png" title="Click to view full image" />}
                    </PhotoView>
                  </PhotoProvider>
                </LazyLoad>
                <span>
                  <Translate id="feature.running_parameter_config">运行参数配置</Translate>
                </span>
              </li>
              <li>
                <LazyLoad height={200} offset={100}>
                  <PhotoProvider>
                    <PhotoView src="/img/homepage/sourcecode/auto_build_run.png">
                      {!LocalUrlEn? <img src="/img/homepage/sourcecode/auto_build_run.png" title="点击查看完整图片" /> : <img src="/img/homepage/sourcecode/auto_build_run_en.png" title="Click to view full image" />}
                    </PhotoView>
                  </PhotoProvider>
                </LazyLoad>
                <span>
                  <Translate id="feature.auto_build_run">自动构建和运行</Translate>
                </span>
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
                  <Translate id="feature.source_deploy.title">
                    源码自动识别和部署
                  </Translate>
                </h3>
              </div>
              <div className="col col--12">
                <p className={clsx(styles.content, styles.devops_content)}>
                  <Translate id="feature.source_deploy.description">
                    自动识别多种开发语言，如 Java、Python、Golang、NodeJS、Dockerfile、Php、.NetCore 等，通过向导式流程完成构建和部署，不用写 Dockerfile 和 Yaml 。
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
                  <Translate id="feature.modular.title">
                    业务模块化拼装
                  </Translate>
                </h3>
              </div>
              <div className="col col--12">
                <p className={clsx(styles.content, styles.k8s_content)}>
                  <Translate id="feature.modular.description">
                    可复用的业务组件一键发布，统一的组件库存储，通过业务组件积木式拼装，实现业务组件的积累和复用。
                  </Translate>
                </p>
              </div>
              <div className="col col--12">
                <Link to='/feature/service-mesh' target="_blank" style={{ float: 'right' }}>
                  <Translate id="feature.details">了解更多</Translate> {'>'}
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--8">
            <div className={clsx('card', styles.card)}>
              <ul className={clsx('newlopo', styles.newlopo)}>
                <li>
                  <LazyLoad height={200} offset={100}>
                    <PhotoProvider>
                      <PhotoView src="/img/homepage/modularization/component_publish.png">
                        {!LocalUrlEn? <img src="/img/homepage/modularization/component_publish.png" title="点击查看完整图片" /> : <img src="/img/homepage/modularization/component_publish_en.png" title="Click to view full image" />}
                      </PhotoView>
                    </PhotoProvider>
                  </LazyLoad>
                  <span>
                    <Translate id="feature.component_publish">业务组件模版发布</Translate>
                  </span>
                </li>
                <li>
                  <LazyLoad height={200} offset={100}>
                    <PhotoProvider>
                      <PhotoView src="/img/homepage/modularization/component_markets.png">
                        {!LocalUrlEn? <img src="/img/homepage/modularization/component_markets.png" title="点击查看完整图片" /> : <img src="/img/homepage/modularization/component_markets_en.png" title="Click to view full image" />}
                      </PhotoView>
                    </PhotoProvider>
                  </LazyLoad>
                  <span>
                    <Translate id="feature.component_markets">组件库管理</Translate>
                  </span>
                </li>
                <li>
                  <LazyLoad height={200} offset={100}>
                    <PhotoProvider>
                      <PhotoView src="/img/homepage/modularization/add_component.png">
                        {!LocalUrlEn? <img src="/img/homepage/modularization/add_component.png" title="点击查看完整图片" /> : <img src="/img/homepage/modularization/add_component_en.png" title="Click to view full image" />}
                      </PhotoView>
                    </PhotoProvider>
                  </LazyLoad>
                  <span>
                    <Translate id="feature.add_component">添加业务组件</Translate>
                  </span>
                </li>
                <li>
                  <LazyLoad height={200} offset={100}>
                    <PhotoProvider>
                      <PhotoView src="/img/homepage/modularization/component_assembly.png">
                        {!LocalUrlEn? <img src="/img/homepage/modularization/component_assembly.png" title="点击查看完整图片" /> : <img src="/img/homepage/modularization/component_assembly_en.png" title="Click to view full image" />}
                      </PhotoView>
                    </PhotoProvider>
                  </LazyLoad>
                  <span>业务组件拼装</span>
                  <span>
                    <Translate id="feature.component_assembly">业务组件拼装</Translate>
                  </span>
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
                    <PhotoView src="/img/homepage/monitor/cluster_monitor.png">
                      <LazyLoad height={200} offset={100}>
                        {!LocalUrlEn? <img src="/img/homepage/monitor/cluster_monitor.png" title="点击查看完整图片" /> : <img src="/img/homepage/monitor/cluster_monitor_en.png" title="Click to view full image" />}
                      </LazyLoad>
                    </PhotoView>
                  </PhotoProvider>
                  <span>
                    <Translate id="feature.cluster_monitor">集群监控</Translate>
                  </span>
                </li>
                <li>
                  <PhotoProvider>
                    <PhotoView src="/img/homepage/monitor/node_monitor.png">
                      <LazyLoad height={200} offset={100}>
                        {!LocalUrlEn? <img src="/img/homepage/monitor/node_monitor.png" title="点击查看完整图片" /> : <img src="/img/homepage/monitor/node_monitor_en.png" title="Click to view full image" />}
                      </LazyLoad>
                    </PhotoView>
                  </PhotoProvider>
                  <span>
                    <Translate id="feature.node_monitor">节点监控</Translate>
                  </span>
                </li>
                <li>
                  <PhotoProvider>
                    <PhotoView src="/img/homepage/monitor/app_topology.png">
                      <LazyLoad height={200} offset={100}>
                        {!LocalUrlEn? <img src="/img/homepage/monitor/app_topology.png" title="点击查看完整图片" /> : <img src="/img/homepage/monitor/app_topology_en.png" title="Click to view full image" />}
                      </LazyLoad>
                    </PhotoView>
                  </PhotoProvider>
                  <span>
                    <Translate id="feature.app_topology">应用拓扑</Translate>
                  </span>
                </li>
                <li>
                  <PhotoProvider>
                    <PhotoView src="/img/homepage/monitor/component_performance_monitor.png">
                      <LazyLoad height={200} offset={100}>
                        {!LocalUrlEn? <img src="/img/homepage/monitor/component_performance_monitor.png" title="点击查看完整图片" /> : <img src="/img/homepage/monitor/component_performance_monitor_en.png" title="Click to view full image" />}
                      </LazyLoad>
                    </PhotoView>
                  </PhotoProvider>
                  <span>
                    <Translate id="feature.component_performance_monitor">组件性能监控</Translate>
                  </span>
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
                  <Translate id="feature.observability.title">
                    丰富的可观测能力
                  </Translate>
                </h3>
              </div>
              <div className="col col--12">
                <p className={clsx(styles.content, styles.mesh_content)}>
                  <Translate id="feature.observability.description">
                    Rainbond 提供全面的可观测性，涵盖集群监控、节点监控、应用监控、组件监控。
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
                  <Translate id="feature.lifecycle.title">
                    应用全生命周期管理
                  </Translate>
                </h3>
              </div>
              <div className="col col--12">
                <p className={clsx(styles.content, styles.store_content)}>
                  <Translate id="feature.lifecycle.description">
                    Serverless体验，应用管理和运维，组件管理和运维，无侵入微服务架构。
                  </Translate>
                </p>
              </div>
            </div>
          </div>
          <div className="col col--8">
            <div className={clsx('card', styles.card)}>
              <ul className={clsx('newlopo', styles.newlopo)}>
                <li>
                  <LazyLoad >
                    <PhotoProvider>
                      <PhotoView src="/img/homepage/app_lifecycle_manage/app_manage.png">
                        {!LocalUrlEn? <img src="/img/homepage/app_lifecycle_manage/app_manage.png" title="点击查看完整图片" /> : <img src="/img/homepage/app_lifecycle_manage/app_manage_en.png" title="Click to view full image" />}
                      </PhotoView>
                    </PhotoProvider>
                  </LazyLoad>
                  <span>
                    <Translate id="feature.app_manage">应用级管理</Translate>
                  </span>
                </li>
                <li>
                  <LazyLoad >
                    <PhotoProvider>
                      <PhotoView src="/img/homepage/app_lifecycle_manage/component_manage.png">
                        {!LocalUrlEn? <img src="/img/homepage/app_lifecycle_manage/component_manage.png" title="点击查看完整图片" /> : <img src="/img/homepage/app_lifecycle_manage/component_manage_en.png" title="Click to view full image" />}
                      </PhotoView>
                    </PhotoProvider>
                  </LazyLoad>
                  <span>
                    <Translate id="feature.component_manage">组件级管理</Translate>
                  </span>
                </li>
                <li>
                  <LazyLoad >
                    <PhotoProvider>
                      <PhotoView src="/img/homepage/app_lifecycle_manage/gateway_manage.png">
                        {!LocalUrlEn? <img src="/img/homepage/app_lifecycle_manage/gateway_manage.png" title="点击查看完整图片" /> : <img src="/img/homepage/app_lifecycle_manage/gateway_manage_en.png" title="Click to view full image" />}
                      </PhotoView>
                    </PhotoProvider>
                  </LazyLoad>
                  <span>
                    <Translate id="feature.gateway_manage">应用网关管理</Translate>
                  </span>
                </li>
                <li>
                  <LazyLoad>
                    <PhotoProvider>
                      <PhotoView src="/img/homepage/app_lifecycle_manage/servicemesh_manage.png">
                        {!LocalUrlEn? <img src="/img/homepage/app_lifecycle_manage/servicemesh_manage.png" title="点击查看完整图片" /> : <img src="/img/homepage/app_lifecycle_manage/servicemesh_manage_en.png" title="Click to view full image" />}
                      </PhotoView>
                    </PhotoProvider>
                  </LazyLoad>
                  <span>
                    <Translate id="feature.servicemesh_manage">Service Mesh</Translate>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
}