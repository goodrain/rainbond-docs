/**
 * Copyright (c) Goodrain, Inc.
 *
 * This source code is licensed under the LGPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Link from "@docusaurus/Link";
import Translate, { translate } from "@docusaurus/Translate";
import clsx from "clsx";
import React, { useState } from "react";
import { animated, useTrail } from "react-spring";
import styles from "./styles.module.css";

export default function HowRainbond() {

  const animatedTexts = useTrail(5, {
    from: { opacity: 0, transform: 'translateY(3em)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: {
      mass: 3,
      friction: 45,
      tension: 460,
    },
  })

  const Cards = () => (
    [
      {
        header: <Translate id="howrainbond.integratedDev.title">一体化开发测试环境</Translate>,
        content: <Translate id="howrainbond.integratedDev.description">集成化的开发和测试环境，自动识别开发语言和自动构建，提供开箱即用的体验</Translate>,
        link: "/usescene/IntegrationDev",
      },
      {
        header: <Translate id="howrainbond.appUnifiedManage.title">企业级应用统一管理</Translate>,
        content: <Translate id="howrainbond.appUnifiedManage.description">企业应用和计算资源统一管理，自动化运维，像管理手机APP一样管理企业应用</Translate>,
        link: "/usescene/AppManagement",
      },
      {
        header: <Translate id="howrainbond.multiCloud.title">应用级多云管理</Translate>,
        content: <Translate id="howrainbond.multiCloud.description">对接和管理混合云和各种Kubernetes集群，应用透明在多种云上部署和迁移</Translate>,
        link: "/usescene/MultiCloudManagement",
      },
      {
        header: <Translate id="howrainbond.offlineDelivery.title">离线环境软件交付</Translate>,
        content: <Translate id="howrainbond.offlineDelivery.description">离线环境应用自动化交付，并支持个性化定制和应用运维</Translate>,
        link: "/usescene/offlineDelivery",
      },
      {
        header: <Translate id="howrainbond.assemble.title">业务积木式拼装</Translate>,
        content: <Translate id="howrainbond.assemble.description">通过应用模型将业务单元实现模块化，并通过“拖拉拽”的方式实现业务拼装</Translate>,
        link: "/usescene/componentReuse",
      },
      {
        header: <Translate id="howrainbond.localization.title">国产化和信创支撑</Translate>,
        content: <Translate id="howrainbond.localization.description">支持多种国产化平台，x86架构应用自动化向Arm架构转换</Translate>,
        link: "/usescene/x86ToArm",
      },
      {
        header: <Translate id="howrainbond.continuousDelivery.title">企业应用持续交付</Translate>,
        content: <Translate id="howrainbond.continuousDelivery.description">企业应用一键交付客户，并支持持续升级迭代</Translate>,
        link: "/usescene/EnterpriseDeliveryOne",
      },
      {
        header: <Translate id="howrainbond.personalizedDelivery.title">模块化个性化交付</Translate>,
        content: <Translate id="howrainbond.personalizedDelivery.description">通过功能模块化，解决2B企业个性化交付的难题</Translate>,
        link: "/usescene/EnterpriseDeliveryTwo",
      },
    ])

  return (
    <animated.div style={animatedTexts[0]}>
      <h1 style={{textAlign: 'center',marginBottom: '56px',position: 'relative'}}>
        <Translate id='howrainbond.title'>能做什么?</Translate>
      </h1>
      <div className="row">
        {Cards().map(({header, content, link},index) => (
          <div className={clsx("col col--6", styles.col)} key={index}>
            <Link to={link} className={ styles.link }>
              <div className={clsx("card", styles.card)}>
                <div className={clsx("card__header", styles.header)}>
                  <h3>{header}</h3>
                </div>
                <div className={clsx("card__body", styles.content)}>
                  <p>{content}</p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </animated.div>
  );
}