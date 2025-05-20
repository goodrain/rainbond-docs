/**
 * Copyright (c) Goodrain, Inc.
 *
 * This source code is licensed under the LGPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Link from "@docusaurus/Link";
import clsx from "clsx";
import React, { useState } from "react";
import { animated, useTrail } from "react-spring";
import styles from "./styles.module.css";
import Signal from "/img/homepage/svg/signal.svg";
import Wechat from "/img/homepage/svg/wechat.svg";
import Dingtalk from "/img/homepage/svg/dingtalk.svg";
import Github from "/img/homepage/svg/github.svg";
import Partner from "/img/homepage/svg/partner.svg";
import Slack from "/img/homepage/svg/slack.svg";
import Forum from "/img/homepage/svg/forum.svg";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Translate from "@docusaurus/Translate";

export default function Community() {

  return (
    <div className={clsx("container", styles.container)}>
      <div className="row">
        <div className="col col--12">
          <div className={clsx("card", styles.card)}>
            <div className="card__header">
              <Signal />
              <h3 className={styles.title}>
                <Translate id="community.group.title">关注 Rainbond 社区动态</Translate>
              </h3>
            </div>
            <div className="card__body">
              <p>
                <Translate id="community.group.description">
                  可以通过以下社交媒体平台获取 Rainbond 最新资讯、参与讨论和获得技术支持。我们的社区团队会定期分享使用技巧、最佳实践和版本更新，欢迎加入我们的开源社区，一起探讨云原生应用管理的未来。
                </Translate>
              </p>
            </div>
            <div className="card__footer">
              <Link to="https://github.com/goodrain/rainbond/issues" className={styles.icon}>
                <Github fill="#191717"/>
              </Link>
              <OverlayTrigger placement="bottom" overlay={
                <div className="card">
                  <div className="card__body">
                    <img width="200px" height="200px" src="/wechat/wechat.png" />
                  </div>
                </div>
              }>
                <span className={styles.icon}>
                  <Wechat />
                </span>
              </OverlayTrigger>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}