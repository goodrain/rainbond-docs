/**
 * Copyright (c) Goodrain, Inc.
 *
 * This source code is licensed under the LGPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import Translate from "@docusaurus/Translate";
import React, { useState } from "react";
import { animated, useTrail } from "react-spring";
import Swiper from '../../Swiper';
import Cswiper from '../../Cswiper';

export default function First() {

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
      <h1 style={{ textAlign: 'center',marginBottom: '56px',position: 'relative'}}>
        <Translate id='fourth.video'>观看视频学习</Translate><b style={{ color: '#338bff' }}> Rainbond</b>
      </h1>
      <Cswiper/>
      <Swiper/>
    </animated.div>
  );
}