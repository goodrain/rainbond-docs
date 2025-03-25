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
              </div>
            </div>
          </div>
          <div className="col col--6">
            <div className={clsx("card", styles.cardRight)}>
              <div className="card__header">
                <Partner width={60} height={76} fill="#FFFFFF"/>
                <h3 className={styles.titleRight}>
                  <Translate id="community.partner.title">成为合作伙伴</Translate>
                </h3>
              </div>
              <div className="card__body">
                <p>
                  <Translate id="community.partner.description">
                    我们非常欢迎优秀的开源项目加入 Rainbond 开源社区，成为 Rainbond 合作伙伴，与 Rainbond 结合形成最佳的解决方案，共同建设开源生态。
                  </Translate>
                </p>
              </div>
              <div className="card__footer">
                <Link className="button button--lg button--secondary" to="/partners">
                  <Translate id="community.partner.button">
                    现在加入
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