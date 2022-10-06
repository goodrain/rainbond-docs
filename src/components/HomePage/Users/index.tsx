/**
 * Copyright (c) Goodrain, Inc.
 *
 * This source code is licensed under the LGPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import clsx from "clsx";
import React, { useState } from "react";
import { animated, useTrail } from "react-spring";
import styles from "./styles.module.css";

export default function Users() {

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
        image: "/img/users/bkrj.png",
      },
      {
        image: "/img/users/lyyl.png",
      },
      {
        image: "/img/users/mky.png",
      },
      {
        image: "/img/users/xnmz.png",
      },
      {
        image: "/img/users/zggk.png",
      },
      {
        image: "/img/users/zhx.png",
      },
      {
        image: "/img/users/penghai.png",
      },
      {
        image: "/img/users/csg.png",
      },
      {
        image: "/img/users/ugreen.png",
      },
      {
        image: "/img/users/xyqy.png",
      },
      {
        image: "/img/users/sdbj.png",
      },
      {
        image: "/img/users/ypjt.png",
      },
    ])

  return (
    <animated.div style={animatedTexts[0]}>
      <h2 className={ styles.title }>我们的用户</h2>
      <div className={clsx("row", styles.row)}>
        {Cards().map(({image}) => (
          <div className={clsx("col col--2", styles.col)}>
              <div className={clsx("card", styles.card)}>
                <div className={clsx("card__image", styles.card_image)}>
                  <img src={image} className={styles.image}/>
                </div>
              </div>
          </div>
        ))}
      </div>
    </animated.div>
  );
}