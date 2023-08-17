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
import Link from '@docusaurus/Link';
import 'react-photo-view/dist/react-photo-view.css';
import Translate from "@docusaurus/Translate";
import Use from '/img/homepage/svg/user.svg';
import Foundationsetup from '/img/homepage/svg/foundationsetup.svg';
import Install from '/img/homepage/svg/install.svg';

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
                    <Translate id="feature.title">三步完成信创环境迁移</Translate>
                </h2>
                <div className={styles.stepbox}>
                    <div>
                        <p><Install style={{ float: 'left' }} /></p>
                        <h3>第一步:安装</h3>
                        <p>在国产信创环境安装Rainbond（Rainbond支持常见国产化CPU和操作系统）。</p>
                    </div>
                    <div>
                        <p><Foundationsetup style={{ float: 'left' }} /></p>
                        <h3>第二步:识别与部署</h3>
                        <p>传统应用自动识别和部署到信创环境（自动编译兼容国产CPU，自动部署到兼容的服务器）。</p>
                    </div>
                    <div>
                        <p><Use style={{ float: 'left' }} /></p>
                        <h3>第三步:管理</h3>
                        <p>使用Rainbond管理信创应用的全生命周期，如启动、构建、更新、关闭、回滚等。</p>
                    </div>
                </div>
                <div className={clsx("col col--12", styles.LearnMore)}>
                    <Link to="/xinchuang" className={styles.button} target="_blank">
                        <Translate id="feature.details">了解更多</Translate> {'>'}
                    </Link>
                </div>
            </animated.div>
        </div>
    );
}