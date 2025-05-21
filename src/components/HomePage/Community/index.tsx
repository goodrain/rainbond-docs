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
import Douyin from "/img/homepage/svg/douyin.svg";
import Bilibili from "/img/homepage/svg/bilibili.svg";
import Gitee from "/img/homepage/svg/gitee.svg";

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
              <Link to="https://space.bilibili.com/489538724" className={styles.icon}>
                <Bilibili width={40} height={50}/>
              </Link>
              <Link to="https://github.com/goodrain/rainbond/issues" className={styles.icon}>
                <Github fill="#191717"/>
              </Link>
              <Link to="https://gitee.com/rainbond/Rainbond" className={styles.icon}>
                <Gitee width={40} height={50}/>
              </Link>
              <Link to="https://gitcode.com/goodrain/rainbond" className={styles.icon}>
                <svg width="160" height="50" viewBox="0 0 121 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M18.059 5.8064C18.2234 5.71437 18.3973 5.61708 18.585 5.51049C18.6076 5.63339 18.6297 5.7407 18.6497 5.83796C18.685 6.00955 18.714 6.15071 18.728 6.29018C18.8392 7.50137 19.448 8.39234 20.3108 8.59298C21.5726 8.88595 22.7623 8.40171 23.4033 7.33331C24.1733 6.05135 23.839 4.48132 22.5279 3.5363C18.8826 0.907171 14.8777 0.182032 10.5636 1.44831C1.2616 4.19282 -1.92121 15.62 4.68062 22.6275C7.50507 25.625 11.0914 26.9184 15.1624 26.8205C20.3774 26.698 24.1333 24.0992 26.5309 19.5948C28.2308 16.3989 26.3829 12.9057 22.8439 12.1797C20.8227 11.7727 18.7559 11.6407 16.6993 11.787C16.0151 11.8527 15.3509 12.0548 14.7459 12.3812C14.0691 12.7325 13.8734 13.4615 13.9493 14.184C14.02 14.8422 14.5247 15.237 15.1258 15.3363C16.3361 15.5258 17.5609 15.6358 18.7833 15.7362C19.1371 15.766 19.4942 15.7696 19.8507 15.7731C20.3623 15.7783 20.873 15.7834 21.3718 15.8658C22.7949 16.101 23.2836 17.2558 22.5517 18.4912C22.3724 18.7883 22.1633 19.0663 21.9277 19.321C20.9703 20.374 19.7183 21.1146 18.3344 21.4466C15.8084 22.065 13.2798 22.0997 10.7655 21.3055C7.90238 20.4022 6.19549 18.2993 6.13552 15.4683C6.1131 13.7224 6.55634 12.0021 7.41963 10.4844C7.80967 9.77698 8.02376 9.04839 7.96359 8.24676C7.93826 7.905 7.92423 7.56286 7.90915 7.19518C7.90113 6.99951 7.89281 6.7966 7.88233 6.58266C8.17231 6.64352 8.45871 6.72035 8.74022 6.81283C9.83531 7.25242 10.9132 7.45296 12.0986 7.13031C12.7728 6.96907 13.4697 6.92445 14.159 6.99841C15.269 7.0889 16.3785 6.81771 17.3215 6.22534C17.5569 6.08737 17.7963 5.95342 18.059 5.8064Z" fill="#DA203E"/>
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}