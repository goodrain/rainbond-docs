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
import K8s from '/img/homepage/svg/k8sblue.svg';
import Servicemesh from '/img/homepage/svg/servicemesh.svg';
import Store from '/img/homepage/svg/store.svg';
import Model from '/img/homepage/svg/model.svg';
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
    <div className={clsx('container',styles.global)}>
      <animated.div style={animatedTexts[0]}>
        <h2 className={styles.title}>
          <Translate id="feature.title">主要功能</Translate>
        </h2>
        {/* devops */}
        <div className="row" style={{ paddingTop: '50px'}}>
          <div className="col col--6">
            <div className={clsx('card', styles.card)}>
              <PhotoProvider>
                <PhotoView src="/img/homepage/feature/devops.png">
                  <img src="/img/homepage/feature/devops.png" width="100%" />
                </PhotoView>
              </PhotoProvider>
            </div>
          </div>
          <div className="col col--6">
            <div className="row">
              <div className={clsx("col col--12", styles.desc_svg)}>
                <Devops style={{ float: 'right' }}/>
              </div>
              <div className="col col--12">
                <h3 className={styles.subtitle} style={{ float: 'right' }}>
                  <Translate id="feature.devops.title">
                    易用的一体化DevOps，不改变开发者使用习惯
                  </Translate>
                </h3>
              </div>
              <div className="col col--12">
                <p className={clsx(styles.content,styles.devops_content)}>
                  <Translate id="feature.devops.description">
                    Rainbond使用“以应用为中心”的设计理念,对开发人员友好,不用学习容器和Kubernetes等底层技术,开发人员对应用开发和应用运维过程自主可控,已有项目和代码不需要改变
                    复杂的系统管理和平台管理由平台管理员负责,兼容各种Kubernetes版本和Kubernetes工具,实现各司其职
                  </Translate>
                </p>
              </div>
              <div className="col col--12">
                <Link to='/feature/devops' style={{ float: 'right'}}>
                  <Translate id="feature.details">详情</Translate> {'>'}
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* Kubernetes multi cluster */}
        <div className="row" style={{ paddingTop: '150px'}}>
          <div className="col col--6">
            <div className="row">
              <div className="col col--12">
                <K8s style={{ float: 'left' }}/>
              </div>
              <div className="col col--12">
                <h3 className={styles.subtitle} style={{ float: 'left' }}>
                  <Translate id="feature.k8s.title">
                    Kubernetes 多集群管理，实现应用级多云管理
                  </Translate>
                </h3>
              </div>
              <div className="col col--12">
                <p className={clsx(styles.content, styles.k8s_content)}>
                  <Translate id="feature.k8s.description">
                    Rainbond控制台支持对接管理多种Kubernetes集群，支持应用级开发和管理体验，不需要写Yaml，通过应用级抽象，应用跨集群部署、安装、迁移、备份
                  </Translate>
                </p>
              </div>
              <div className="col col--12">
                <Link to='/feature/multi-cluster' style={{ float: 'left'}}>
                  <Translate id="feature.details">详情</Translate> {'>'}
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--6">
            <div className={clsx('card', styles.card)}>
              <PhotoProvider>
                <PhotoView src="/img/homepage/feature/k8scluster.png">
                  <img src="/img/homepage/feature/k8scluster.png" width="100%" />
                </PhotoView>
              </PhotoProvider>
            </div>
          </div>
        </div>
        {/* Servier mesh */}
        <div className="row" style={{ paddingTop: '150px'}}>
          <div className="col col--6">
            <div className={clsx('card', styles.card)}>
              <PhotoProvider>
                <PhotoView src="/img/homepage/feature/servicemesh.png">
                  <img src="/img/homepage/feature/servicemesh.png" width="100%" />
                </PhotoView>
              </PhotoProvider>
            </div>
          </div>
          <div className="col col--6">
            <div className="row">
              <div className={clsx("col col--12", styles.desc_svg)}>
                <Servicemesh style={{ float: 'right' }}/>
              </div>
              <div className="col col--12">
                <h3 className={styles.subtitle} style={{ float: 'right' }}>
                  <Translate id="feature.mesh.title">
                    开箱即用的微服务治理，拖拉拽式的微服务编排
                  </Translate>
                </h3>
              </div>
              <div className="col col--12">
                <p className={clsx(styles.content, styles.mesh_content)}>
                  <Translate id="feature.mesh.description">
                    传统应用部署到Rainbond，开启应用级插件就可以支持Service Mesh，并可按需更换Service Mesh框架
                    通过组件级的插件扩展日志管理、性能分析、监控等服务治理工具，并支持Spring Cloud 、Dubbo等常见微服务框架
                  </Translate>
                </p>
              </div>
              <div className="col col--12">
                <Link to='/feature/service-mesh' style={{ float: 'right'}}>
                  <Translate id="feature.details">详情</Translate> {'>'}
                </Link>
              </div>
            </div>
          </div>
        </div>
        {/* App store */}
        <div className="row" style={{ paddingTop: '150px'}}>
          <div className="col col--6">
            <div className="row">
              <div className="col col--12">
                <Store style={{ float: 'left' }}/>
              </div>
              <div className="col col--12">
                <h3 className={styles.subtitle} style={{ float: 'left' }}>
                  <Translate id="feature.appstore.title">
                    云原生应用市场，实现企业应用自动化交付
                  </Translate>
                </h3>
              </div>
              <div className="col col--12">
                <p className={clsx(styles.content, styles.store_content)}>
                  <Translate id="feature.appstore.description">
                    支持应用市场全流程管理（应用构建和拼装、应用发布应用市场、应用市场展示和管理、应用导出和导入、应用一键安装和升级）
                    通过应用模版可以将任何类型的应用发布到应用市场，并实现复杂应用一键交付客户环境
                  </Translate>
                </p>
              </div>
              <div className="col col--12">
                <Link to='/feature/app-market' style={{ float: 'left'}}>
                  <Translate id="feature.details">详情</Translate> {'>'}
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--6">
            <div className={clsx('card', styles.card)}>
              <PhotoProvider>
                <PhotoView src="/img/homepage/feature/appstore.png">
                  <img src="/img/homepage/feature/appstore.png" width="100%" />
                </PhotoView>
              </PhotoProvider>
            </div>
          </div>
        </div>
        {/* Application model */}
        <div className="row" style={{ paddingTop: '150px', paddingBottom: '50px'}}>
          <div className="col col--6">
            <div className={clsx('card', styles.card, styles.app_model_image)}>
              <PhotoProvider>
                <PhotoView src="/img/homepage/feature/appmodel.png">
                  <img src="/img/homepage/feature/appmodel.png" width="100%" />
                </PhotoView>
              </PhotoProvider>
            </div>
          </div>
          <div className="col col--6">
            <div className="row">
              <div className={clsx("col col--12", styles.desc_svg)}>
                <Model style={{ float: 'right' }}/>
              </div>
              <div className="col col--12">
                <h3 className={styles.subtitle} style={{ float: 'right' }}>
                  <Translate id="feature.model.title">
                    通过应用模型抽象，简化应用运维
                  </Translate>
                </h3>
              </div>
              <div className="col col--12">
                <p className={clsx(styles.content, styles.model_content)}>
                  <Translate id="feature.model.description">
                    通过应用模型抽象，让开发人员可以更多的关心业务本身，而不是底层复杂工具的使用问题。最终的效果是降低操作成本和理解难度，让Kubernetes更加容易落地
                  </Translate>
                </p>
              </div>
              <div className="col col--12">
                <Link to='/feature/app-ops' style={{ float: 'right'}}>
                  <Translate id="feature.details">详情</Translate> {'>'}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
}