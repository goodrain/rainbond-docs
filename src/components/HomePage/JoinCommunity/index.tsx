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
import { Popover, Tag } from '@douyinfe/semi-ui';
import Signal from "/img/homepage/svg/signal.svg";
import Wechat from "/img/homepage/svg/wechat.svg";
import Dingtalk from "/img/homepage/svg/dingtalk.svg";
import Github from "/img/homepage/svg/github.svg";
import Forum from "/img/homepage/svg/forum.svg";

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
                <h3 className={styles.title}>加入开源社群</h3>
              </div>
              <div className="card__body">
                <p>
                  Rainbond 是一个开源项目，欢迎大家加入我们的开源社区群组进行讨论，你可以在 GitHub 上提交 issue，也可以在微信或钉钉群组中提问，我们会尽快回复你。
                </p>
              </div>
              <div className="card__footer">
                <Link to="https://github.com/goodrain/rainbond/issues" className={styles.icon}>
                  <Github fill="#191717"/>
                </Link>
                <Popover showArrow
                    content={
                        <img width="200px" height="200px" src="/wechat/wechat-public.jpg" />
                    }>
                  <Link className={styles.icon}>
                    <Wechat />
                  </Link>
                </Popover>
                <Popover showArrow
                    content={
                      <article>
                        搜索钉钉群号 <b>31096419</b> 加入 Rainbond 钉钉技术交流群
                      </article>
                    }>
                  <Link className={styles.icon}>
                    <Dingtalk />
                  </Link>
                </Popover>
                <Link to="https://t.goodrain.com" className={styles.icon}>
                  <Forum />
                </Link>
              </div>
            </div>
          </div>
          <div className="col col--6">
            <div className={clsx("card", styles.cardRight)}>
              <div className="card__header">
                <Github width={60} height={76} fill="#FFFFFF"/>
                <h3 className={styles.titleRight}>参与开源贡献</h3>
              </div>
              <div className="card__body">
                <p>
                  欢迎大家参与 Rainbond 开源项目的贡献，贡献不仅限于代码，还包括文档、测试、反馈、建议等，Rainbond 社区欢迎你的加入。
                </p>
              </div>
              <div className="card__footer">
                <Link className="button button--lg button--secondary" to="/community/contribution/">现在开始</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </animated.div>
  );
}