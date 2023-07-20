/**
 * Copyright (c) Goodrain, Inc.
 *
 * This source code is licensed under the LGPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from "react";
import { animated, useTrail } from "react-spring";
import styles from "./styles.module.css";
import clsx from "clsx";
import Translate from "@docusaurus/Translate";

export default function Communitydata() {

  const animatedTexts = useTrail(5, {
    from: { opacity: 0, transform: 'translateY(3em)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: {
      mass: 3,
      friction: 45,
      tension: 460,
    },
  })

  const ContentList = [
    {
      number: "4,100+",
      desc: "GitHub Stars"
    },
    {
      number: "1M+",
      desc: <Translate id="platform.data.imageDownloads">镜像下载</Translate>
    },
    {
      number: "5,000+",
      desc: <Translate id="platform.data.productionUsers">生产用户</Translate>
    },
  ];

  return (
    <animated.div style={animatedTexts[0]}>
      <div className={clsx("row", styles.row)}>
      {ContentList.map(({ number,desc },index) => (
        <div className="col col--3" key={index}>
          <div className="card shadow--tl">
            <div className={clsx("card__body", styles.card_body)}>
              <p className={ styles.card_num }>{number}</p>
              <p className={ styles.card_desc }>{desc}</p>
              <p className={ styles.card_border } />
            </div>
          </div>
        </div>
        ))}
      </div>
    </animated.div>
  );
}