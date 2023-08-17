/**
 * Copyright (c) Goodrain, Inc.
 *
 * This source code is licensed under the LGPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */


import React from "react";
import { animated, useTrail } from "react-spring";
import styles from "./styles.module.css";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import Translate from "@docusaurus/Translate";

export default function Rainstore() {

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
        <div className={clsx('container', styles.global)}>
            <animated.div style={animatedTexts[0]}>
                <h2 className={styles.title}>
                    <Translate id="feature.title">500+ 开源应用一键部署和升级</Translate>
                </h2>
                <div>
                    <PhotoProvider>
                        <PhotoView src="/img/homepage/storelopo/lopo.png">
                            <img src="/img/homepage/storelopo/lopo.png" />
                        </PhotoView>
                    </PhotoProvider>
                </div>
                <div className="col col--12">
                    <Link to="https://hub.grapps.cn" className={styles.button}>
                    <Translate id="appstore.link">访问应用市场</Translate> {'>'}
                    </Link>
                </div>
            </animated.div>
        </div>
    );
}