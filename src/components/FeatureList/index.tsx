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
import { IconCloud, IconServer, IconInfoCircle, IconDownload } from '@douyinfe/semi-icons';
import { Tooltip } from '@douyinfe/semi-ui';
import axios from 'axios';

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
  const handleOnClickLinkRainbondCloud = () => {
    axios({
      method: 'get',
      url: 'https://run.rainbond.com/console/user_source',
      params: {
        content: 'visit',
        sms_type: 'rainbond',
      },
    })
    .then((response) => {
      console.log(response.data);
    }
    )
    .catch((error) => {
      console.error(error);
    }
    );
    window.open('https://run.rainbond.com/#/user/login?link=rainbond')
  }

  return (
    <>
      <Link to="/docs/quick-start/quick-install">
        <Button theme='solid' type='primary' icon={<IconDownload size='large'/>} size='large' className={clsx(styles.button_style, styles.button_style_left)}>
          下载安装
        </Button>
      </Link>
      <Tooltip position='topLeft' content='注册即领 SaaS 免费托管，试用 30 天'>
        <Button theme='outline' type='tertiary' icon={<IconCloud size='large'/>} size='large' className={styles.button_style} onClick={handleOnClickLinkRainbondCloud}>
          在线托管
        </Button>
      </Tooltip>
    </>
  );
}

export function CustomButton(item): JSX.Element {
  const { LeftURL, LeftButton, RightURL, RightButton } = item.props
  return (
    <>
      <Link to="/docs/quick-start/quick-install">
        <Button theme='solid' type='primary' icon={<IconDownload size='large'/>} size='large' className={clsx(styles.button_style, styles.button_style_left)}>
          下载安装
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