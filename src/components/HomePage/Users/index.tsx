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
import { Button } from '@douyinfe/semi-ui';
import Case from '/img/homepage/svg/case.svg';
import { Typography } from '@douyinfe/semi-ui';
import Translate from "@docusaurus/Translate";

export default function Users() {

  const { Text } = Typography;
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
        image: "/img/users/boe.png",
      },
      {
        image: "/img/users/ccteg.png",
      },
      {
        image: "/img/users/benz.jpeg",
      },
      {
        image: "/img/users/talkweb.png",
      },
      {
        image: "/img/users/zhx.png",
      },
      {
        image: "/img/users/zggk.png",
      },
      {
        image: "/img/users/xinanminzu.png",
      },
      {
        image: "/img/users/haijun.png",
      },
      {
        image: "/img/users/ligong.png",
      },
      {
        image: "/img/users/guofang.png",
      },
      {
        image: "/img/users/renminjc.png",
      },
      {
        image: "/img/users/guangxitizhuan.png",
      },
      {
        image: "/img/users/penghai.png",
      },
      {
        image: "/img/users/bkrj.png",
      },
      {
        image: "/img/users/linewell.png",
      },
      {
        image: "/img/users/gitee.png",
      },
      {
        image: "/img/users/ugreen.png",
      },
      {
        image: "/img/users/xyqy.png",
      },
      {
        image: "/img/users/jingyun.png",
      },
      {
        image: "/img/users/lyyl.png",
      },
      {
        image: "/img/users/ann.png",
      },
      {
        image: "/img/users/hanguang.png",
      },
      {
        image: "/img/users/fzsc.png",
      },
      {
        image: "/img/users/novastar.png",
      },
      {
        image: "/img/users/zjzn.png",
      },
      {
        image: "/img/users/qingneng.png",
      },
      {
        image: "/img/users/dianxinwusuo.png",
      },
      {
        image: "/img/users/gillion.png",
      },
      {
        image: "/img/users/csg.png",
      },
      {
        image: "/img/users/sdbj.png",
      },
    ])

  return (
    <animated.div style={animatedTexts[0]}>
      <h2 className={ styles.title }>
        <Translate id="users.title">我们的用户</Translate>
      </h2>
      <div className={clsx("row", styles.row)}>
        {Cards().map(({image},index) => (
          <div className={clsx("col col--2", styles.col)} key={index}>
              <div className={clsx("card", styles.card)}>
                <div className={clsx("card__image", styles.card_image)}>
                  <img src={image} className={styles.image}/>
                </div>
              </div>
          </div>
        ))}
      </div>
      <div className={clsx("row",styles.case)}>
        <div className={clsx("col col--12", styles.case_col)}>
          <Text link={{ href: '/case' }}>
            <Button icon={<Case />} theme="solid" className={styles.button} size='large'>
              <Translate id="users.case">用户案例</Translate>
            </Button>
          </Text>
        </div>
        <div className={clsx("col col--12", styles.case_col)}>
          <Text underline link={{ href: 'https://github.com/goodrain/rainbond/issues/1273', target: '_blank'}} className={styles.text} >
            <Translate id="users.case.contribute">如果你想贡献使用案例并在 Rainbond 官网上展示你的 Logo，请在 Github 上登记或联系我们。</Translate>
          </Text>
        </div>
      </div>
    </animated.div>
  );
}