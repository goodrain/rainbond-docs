/**
 * Copyright (c) Goodrain, Inc.
 *
 * This source code is licensed under the LGPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Link from "@docusaurus/Link";
import Translate from "@docusaurus/Translate";
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
        header: "一体化开发测试环境",
        content: "集成化的开发和测试环境，自动识别开发语言和自动构建，提供开箱即用的体验",
        link: "/usescene/IntegrationDev",
      },
      {
        header: "企业级应用统一管理",
        content: "企业应用和计算资源统一管理，自动化运维，像管理手机APP一样管理企业应用",
        link: "/usescene/AppManagement",
      },
      {
        header: "应用级多云管理",
        content: "对接和管理混合云和各种Kubernetes集群，应用透明在多种云上部署和迁移",
        link: "/usescene/MultiCloudManagement",
      },
      {
        header: "离线环境软件交付",
        content: "离线环境应用自动化交付，并支持个性化定制和应用运维",
        link: "/usescene/offlineDelivery",
      },
      {
        header: "业务积木式拼装",
        content: "通过应用模型将业务单元实现模块化，并通过“拖拉拽”的方式实现业务拼装",
        link: "/usescene/componentReuse",
      },
      {
        header: "国产化和信创支撑",
        content: "支持多种国产化平台，x86架构应用自动化向Arm架构转换",
        link: "/usescene/x86ToArm",
      },
      {
        header: "企业应用持续交付",
        content: "企业应用一键交付客户，并支持持续升级迭代",
        link: "/usescene/EnterpriseDeliveryOne",
      },
      {
        header: "模块化个性化交付",
        content: "通过功能模块化，解决2B企业个性化交付的难题",
        link: "/usescene/EnterpriseDeliveryTwo",
      },
    ])

  return (
    <animated.div style={animatedTexts[0]}>
      <h1 style={{textAlign: 'center',marginBottom: '56px',position: 'relative'}}>
        <b style={{ color: '#338bff' }}>Rainbond </b><Translate id='fifth.title'>能做什么?</Translate>
      </h1>
      <div className="row">
        {Cards().map(({header, content, link},index) => (
          <div className={clsx("col col--6", styles.col)}>
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