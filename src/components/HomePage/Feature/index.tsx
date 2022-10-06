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
import { Image } from '@douyinfe/semi-ui';
import Devops from '/img/homepage/svg/devops.svg';
import K8s from '/img/homepage/svg/k8sblue.svg';
import Servicemesh from '/img/homepage/svg/servicemesh.svg';
import Store from '/img/homepage/svg/store.svg';
import Model from '/img/homepage/svg/model.svg';

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
        <h2 className={styles.title}>主要功能</h2>
        {/* devops */}
        <div className="row" style={{ paddingTop: '50px'}}>
          <div className="col col--6">
            <div className={clsx('card', styles.card)}>
              <Image width={'100%'} src="/img/homepage/feature/devops.png" />
            </div>
          </div>
          <div className="col col--6">
            <div className="row">
              <div className="col col--12">
                <Devops style={{ float: 'right' }}/>
              </div>
              <div className="col col--12">
                <h3 className={styles.subtitle} style={{ float: 'right' }}>
                  易用的一体化DevOps，不改变开发者使用习惯
                </h3>
              </div>
              <div className="col col--12">
                <p className={styles.content} style={{ float: 'right', width: '455px', textAlign: 'left'}}>
                  Rainbond使用“以应用为中心”的设计理念,对开发人员友好,不用学习容器和Kubernetes等底层技术,开发人员对应用开发和应用运维过程自主可控,已有项目和代码不需要改变
                  复杂的系统管理和平台管理由平台管理员负责,兼容各种Kubernetes版本和Kubernetes工具,实现各司其职
                </p>
              </div>
              <div className="col col--12">
                <Link to='/feature/devops' style={{ float: 'right'}}>详情 {'>'}</Link>
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
                  Kubernetes 多集群管理，实现应用级多云管理
                </h3>
              </div>
              <div className="col col--12">
                <p className={styles.content} style={{ float: 'left', width: '455px', textAlign: 'left'}}>
                  Rainbond控制台支持对接管理多种Kubernetes集群，支持应用级开发和管理体验，不需要写Yaml，通过应用级抽象，应用跨集群部署、安装、迁移、备份
                </p>
              </div>
              <div className="col col--12">
                <Link to='/feature/k8scluster' style={{ float: 'left'}}>详情 {'>'}</Link>
              </div>
            </div>
          </div>
          <div className="col col--6">
            <div className={clsx('card', styles.card)}>
              <Image src="/img/homepage/feature/k8scluster.png" />
            </div>
          </div>
        </div>
        {/* Servier mesh */}
        <div className="row" style={{ paddingTop: '150px'}}>
          <div className="col col--6">
            <div className={clsx('card', styles.card)}>
              <Image src="/img/homepage/feature/servicemesh.png" />
            </div>
          </div>
          <div className="col col--6">
            <div className="row">
              <div className="col col--12">
                <Servicemesh style={{ float: 'right' }}/>
              </div>
              <div className="col col--12">
                <h3 className={styles.subtitle} style={{ float: 'right' }}>
                  开箱即用的微服务治理，<b style={{ color: '#338bff'}}>拖拉拽</b>式的微服务编排
                </h3>
              </div>
              <div className="col col--12">
                <p className={styles.content} style={{ float: 'right', width: '460px', textAlign: 'left'}}>
                  传统应用部署到Rainbond，开启应用级插件就可以支持Service Mesh，并可按需更换Service Mesh框架
                  通过组件级的插件扩展日志管理、性能分析、监控等服务治理工具，并支持Spring Cloud 、Dubbo等常见微服务框架
                </p>
              </div>
              <div className="col col--12">
                <Link to='/feature/servicemesh' style={{ float: 'right'}}>详情 {'>'}</Link>
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
                  云原生应用市场，实现企业应用自动化交付
                </h3>
              </div>
              <div className="col col--12">
                <p className={styles.content} style={{ float: 'left', width: '460px', textAlign: 'left'}}>
                  支持应用市场全流程管理（应用构建和拼装、应用发布应用市场、应用市场展示和管理、应用导出和导入、应用一键安装和升级）
                  通过应用模版可以将任何类型的应用发布到应用市场，并实现复杂应用一键交付客户环境
                </p>
              </div>
              <div className="col col--12">
                <Link to='/feature/appstore' style={{ float: 'left'}}>详情 {'>'}</Link>
              </div>
            </div>
          </div>
          <div className="col col--6">
            <div className={clsx('card', styles.card)}>
              <Image src="/img/homepage/feature/appstore.png" />
            </div>
          </div>
        </div>
        {/* Application model */}
        <div className="row" style={{ paddingTop: '150px', paddingBottom: '50px'}}>
          <div className="col col--6">
            <div className={clsx('card', styles.card)} style={{ width: '500px' }}>
              <Image src="/img/homepage/feature/appmodel.png" />
            </div>
          </div>
          <div className="col col--6">
            <div className="row">
              <div className="col col--12">
                <Model style={{ float: 'right' }}/>
              </div>
              <div className="col col--12">
                <h3 className={styles.subtitle} style={{ float: 'right' }}>
                  通过应用模型抽象，简化应用运维
                </h3>
              </div>
              <div className="col col--12">
                <p className={styles.content} style={{ float: 'right', width: '330px', textAlign: 'left'}}>
                  通过应用模型抽象，让开发人员可以更多的关心业务本身，而不是底层复杂工具的使用问题。最终的效果是降低操作成本和理解难度，让Kubernetes更加容易落地
                </p>
              </div>
              <div className="col col--12">
                <Link to='/feature/model' style={{ float: 'right'}}>详情 {'>'}</Link>
              </div>
            </div>
          </div>
        </div>
      </animated.div>
    </div>
  );
}