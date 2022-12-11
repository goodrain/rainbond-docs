/**
 * Copyright (c) Goodrain, Inc.
 *
 * This source code is licensed under the LGPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
**/

/**
 * Copyright (c) Goodrain, Inc.
 *
 * This source code is licensed under the LGPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

 import Translate from "@docusaurus/Translate";
 import clsx from "clsx";
 import React, { useEffect, useState } from "react";
 import { animated, useTrail } from "react-spring";
 import styles from "./styles.module.css";
 import Layout from '../Layout';
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { calcLength } from "framer-motion";
import { useLocation } from "@docusaurus/router";
import { Button, Typography } from "@douyinfe/semi-ui";
import Iconlinux from '/img/homepage/svg/linux.svg';
import Iconk8s from '/img/homepage/svg/k8s.svg';

export function FeatureHeader(item): JSX.Element {
  const { title, description} = item.props
  return (
    <div className={styles.header}>
      <div className={clsx('container',styles.container_header)}>
        <div className="row">
          <div className="col col--12">
            <h2 className={styles.title}>{title}</h2>
          </div>
          <div className="col col--12">
            <p className={styles.content}>{description}</p>
          </div>
        </div>
        <FeatureButton/>
      </div>
    </div>
  );
 }

export function FeatureContentImage(item): JSX.Element {
  const { imageURL } = item.props.FeatureHeaderImage;
  return (
    <div className={styles.global_content}>
      <div className={clsx('card', styles.card)}>
        <img src={imageURL} width="100%" />
      </div>
    </div>
  );
}

export function FeatureContent(item): JSX.Element {
  const ContentList = item.props.FeatureContentList;

  return (
    <>
    
      {ContentList.map(({ imageRight, titleRight, imageLeft, titleLeft, descListLeft, descListRight },index) => (
        <div key={index}>
          <div style={{ backgroundColor: '#f0f1f5' }}>
            <div className={styles.global_content}>
              <div className={clsx("row", styles.row)}>
                <div className="col col--6">
                  <div className={clsx('card', styles.card)}>
                    <PhotoProvider>
                      <PhotoView src={imageRight}>
                        <img src={imageRight} width="100%" />
                      </PhotoView>
                    </PhotoProvider>
                  </div>
                </div>
                <div className={clsx("col col--6", styles.col_right)}>
                  <h3 className={styles.subtitle}>{titleRight}</h3>
                  <ul className={styles.ul}>
                  {descListRight.map(( description ,index) => (
                    description === "" ? "" : <li key={index}>{description}</li>
                  ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.global_content} style={{ display: ( titleLeft === "") ? "none" : ""}}>
            <div className={clsx("row", styles.row)}>
              <div className={clsx("col col--6",styles.col_left)}>
                <h3 className={styles.subtitle}>{titleLeft}</h3>
                <ul className={styles.ul}>
                {descListLeft.map(( description ,index) => (
                  description === "" ? "" : <li key={index}>{description}</li>
                ))}
                </ul>
              </div>
              <div className="col col--6">
                <div className={clsx('card', styles.card)}>
                  <PhotoProvider>
                    <PhotoView src={imageLeft}>
                      <img src={imageLeft} width="100%" />
                    </PhotoView>
                  </PhotoProvider>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    
    </>
  );
}

export function FeatureButton(): JSX.Element {
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

  const EN_URL = useLocation().pathname.includes('/en/');
  const [language, setLanguage] = useState('/en');
  useEffect(() => {
    if (EN_URL) {
      setLanguage('/en/');
    }else{
      setLanguage('/');
    }
  });
  
  return (
    <animated.div style={animatedTexts[1]} className={styles.btnBox}>
      <Text link={{ href: language + 'docs/quick-start/quick-install' }}>
        <Button icon={<Iconlinux />} theme="solid" className={styles.buttonLeft} size='large'>
          <Translate id='primary.install-dind'>在单机安装</Translate>
        </Button>
      </Text>
      <Text link={{ href: language + 'docs/installation/install-with-helm/' }}>
        <Button icon={<Iconk8s />} theme="solid" className={styles.buttonRight} size='large'>
          <Translate id='primary.install-helm'>在 Kubernetes 安装</Translate>
        </Button>
      </Text>
    </animated.div>
  );
}