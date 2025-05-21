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
 import styles from "./styles.module.css";
import { PhotoProvider, PhotoView } from "react-photo-view";
import { Button, Typography } from "@douyinfe/semi-ui";
import Iconlinux from '/img/homepage/svg/linux.svg';
import Iconk8s from '/img/homepage/svg/k8s.svg';
import Link from "@docusaurus/Link";
import { IconHelm, IconServer, IconInfoCircle } from '@douyinfe/semi-icons';


export function FeatureHeader(item): JSX.Element {
  const { title, description, customButton} = item.props
  return (
    <div className={styles.header}>
      <div className={clsx('container',styles.container_header)}>
        <div className="row">
          <div className="col col--12">
            <h2 className={styles.title}>{title}</h2>
          </div>
          <div className="col col--12" style={{ margin: "40px 0 40px 0"}}>
            <p className={styles.content}>{description}</p>
          </div>
        </div>
        { customButton === "true" ? <CustomButton props={item.props} /> : <FeatureButton/> }
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
          <div>
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
  
  return (
    <>
      <Link to='/docs/quick-start/quick-install' className={styles.link}>
        <Button icon={<IconServer/>} theme="solid" type="primary" className={clsx(styles.button_style, styles.button_style_left)} size='large' >
          <Translate id='primary.install-dind'>在单机安装</Translate>
        </Button>
      </Link>
      <Link to='/docs/installation/install-with-helm/' className={styles.link}>
        <Button icon={<IconHelm size="large"/>} theme="outline" type="tertiary" className={styles.button_style} size='large'>
          <Translate id='primary.install-helm'>在 Kubernetes 安装</Translate>
        </Button>
      </Link>
    </>
  );
}

export function CustomButton(item): JSX.Element {
  const { LeftURL, LeftButton, RightURL, RightButton } = item.props
  return (
    <>
      <Link to={LeftURL} className={styles.link}>
        <Button icon={<IconServer/>} theme="solid" type="primary" className={clsx(styles.button_style, styles.button_style_left)} size='large'>
          {LeftButton}
        </Button>
      </Link>
      <Link to={RightURL} className={styles.link}>
        <Button icon={<IconInfoCircle size="large"/>} theme="outline" type="tertiary" className={styles.button_style} size='large'>
          {RightButton}
        </Button>
      </Link>
    </>
  );
}