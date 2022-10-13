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
import Slack from "/img/homepage/svg/slack.svg";
import Forum from "/img/homepage/svg/forum.svg";
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Translate from "@docusaurus/Translate";

export default function JoinCommunity() {

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
    <animated.div style={animatedTexts[0]}>
      <div className={clsx("container", styles.container)}>
        <div className="row">
          <div className="col col--6">
            <div className={clsx("card", styles.card)}>
              <div className="card__header">
                <Signal />
                <h3 className={styles.title}>
                  <Translate id="community.group.title">加入开源社群</Translate>
                </h3>
              </div>
              <div className="card__body">
                <p>
                  <Translate id="community.group.description">
                    Rainbond 是一个开源项目，欢迎大家加入我们的开源社区群组进行讨论，你可以在 GitHub 上提交 issue，也可以在微信或钉钉群组中提问，我们有专职的工程师解答你的问题。
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
                <OverlayTrigger placement="bottom" overlay={
                  <div className="card">
                    <div className="card__body">
                      搜索钉钉群号 <b>31096419</b> 加入 Rainbond 钉钉技术交流群
                    </div>
                  </div>
                }>
                  <span className={styles.icon}>
                    <Dingtalk />
                  </span>
                </OverlayTrigger>
                <Link to="https://join.slack.com/t/rainbond-slack/shared_invite/zt-1ft4g75pg-KJ0h_IAtvG9DMgeE_BNjZQ" className={styles.icon}>
                  <Slack />
                </Link>
                <Link to="https://t.goodrain.com">
                  <Forum />
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--6">
            <div className={clsx("card", styles.cardRight)}>
              <div className="card__header">
                <Github width={60} height={76} fill="#FFFFFF"/>
                <h3 className={styles.titleRight}>
                  <Translate id="community.contribute.title">参与开源贡献</Translate>
                </h3>
              </div>
              <div className="card__body">
                <p>
                  <Translate id="community.contribute.description">
                    欢迎大家参与 Rainbond 开源项目的贡献，贡献不仅限于代码，还包括文档、测试、反馈、建议等，Rainbond 社区欢迎你的加入。
                  </Translate>
                </p>
              </div>
              <div className="card__footer">
                <Link className="button button--lg button--secondary" to="/community/contribution/">
                  <Translate id="community.contribute.button">
                    现在开始
                  </Translate>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  );
}