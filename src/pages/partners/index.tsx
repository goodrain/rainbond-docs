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

import Layout from '@theme/Layout';
import styles from "./styles.module.css";
import clsx from "clsx";
import React from "react";
import Translate, { translate } from '@docusaurus/Translate';
import { Typography } from '@douyinfe/semi-ui';

export default function Partners() {

  const { Text } = Typography;

  const PartnerHeaderList = [
    {
      title: translate ({
        id: "partners.appsTitle",
        message: "应用程序",
      }),
      description: translate ({
        id: "partners.appsDescription",
        message: "Rainbond 基于 RAM 应用模型之上建立了云原生开源应用商店，Rainbond 云原生应用商店给企业、开发者和用户提供了一站式的服务，都可以很简单的对应用进行发布、上架、下架等。您可将应用程序发布到 Rainbond 云原生开源应用商店，让更多的用户一键部署并使用您的应用程序",
      }),
      tags: "apps",
    },
    {
      title: translate ({
        id: "partners.pluginsTitle",
        message: "应用插件",
      }),
      description: translate ({
        id: "partners.pluginsDescription",
        message: "Rainbond 基于应用商店体系扩展了插件应用，通过插件应用可以对 Rainbond 平台功能进行扩展，实现即插即用。插件应用实际也是一个应用程序，也可以通过应用商店对其应用进行发布、上架、下架等。您可以将插件应用发布到应用商店，让更多的用户一键部署并使用您的插件应用",
      }),
      tags: "plugins",
    },
  ];

  const PartnersList = [
    {
      image: "/img/partners/apollo.png",
      title: "Apollo",
      githubURL: "https://github.com/apolloconfig/apollo/",
      description: translate ({
        id: "partners.apollo.description",
        message: "Apollo（阿波罗）是一款可靠的分布式配置管理中心",
      }),
      deployURL: "/blog/apollo",
      tags: "Application"
    },
    {
      image: "/img/partners/bytebase.png",
      title: "Bytebase",
      githubURL: "https://github.com/bytebase/bytebase",
      description: translate ({
        id: "partners.btyebase.description",
        message: "Bytebase是一个开源 Database DevOps 工具",
      }),
      deployURL: "/blog/bytebase",
      tags: "Application"
    },
    {
      image: "/img/partners/curve.png",
      title: "Curve",
      githubURL: "https://github.com/opencurve/curve",
      description: translate ({
        id: "partners.curve.description",
        message: "Curve 是网易主导自研的现代化存储系统, 目前支持文件存储和块存储",
      }),
      deployURL: "/blog/curve",
      tags: "Application"
    },
    {
      image: "/img/partners/dolphinscheduler.png",
      title: "Dolphinscheduler",
      githubURL: "https://github.com/apache/dolphinscheduler",
      description: translate ({
        id: "partners.dolphinscheduler.description",
        message: "Apache DolphinScheduler 是一个分布式易扩展的可视化DAG工作流任务调度开源系统",
      }),
      deployURL: "/blog/dolphinscheduler",
      tags: "Application"
    },
    {
      image: "/img/partners/datacap.png",
      title: "DataCap",
      githubURL: "https://github.com/EdurtIO/datacap",
      description: translate ({
        id: "partners.datacap.description",
        message: "DataCap 是用于数据转换、集成和可视化的集成软件",
      }),
      deployURL: "/blog/datacap",
      tags: "Application"
    },
    {
      image: "/img/partners/hertzbeat.png",
      title: "HertzBeat",
      githubURL: "https://github.com/dromara/hertzbeat",
      description: translate ({
        id: "partners.hertzbeat.description",
        message: "易用友好的实时监控系统，无需Agent，强大自定义监控能力",
      }),
      deployURL: "/blog/hertzbeat",
      tags: "Application"
    },
    {
      image: "/img/partners/jianmu.png",
      title: "jianmu",
      githubURL: "https://gitee.com/jianmu-dev/jianmu",
      description: translate ({
        id: "partners.jianmu.description",
        message: "面向 DevOps 领域的极易扩展的开源无代码(图形化)/低代码(GitOps)工具",
      }),
      deployURL: "/blog/jianmu",
      tags: "Plugin"
    },
    {
      image: "/img/partners/jpom.png",
      title: "Jpom",
      githubURL: "https://gitee.com/dromara/Jpom",
      description: translate ({
        id: "partners.Jpom.description",
        message: "简而轻的低侵入式在线构建、自动部署、日常运维、项目运维监控软件",
      }),
      deployURL: "/blog/jpom",
      tags: "Application"
    },
    {
      image: "/img/partners/knowstreaming.png",
      title: "KnowStreaming",
      githubURL: "https://github.com/didi/KnowStreaming",
      description: translate ({
        id: "partners.knowstreaming.description",
        message: "一站式云原生流数据管控平台，通过0侵入、插件化构建企业级Kafka服务",
      }),
      deployURL: "/blog/knowstreaming",
      tags: "Application"
    },
    {
      image: "/img/partners/maxkey.png",
      title: "MaxKey",
      githubURL: "https://gitee.com/dromara/MaxKey",
      description: translate ({
        id: "partners.maxkey.description",
        message: "MaxKey单点登录认证系统是业界领先的IAM-IDaas身份管理和认证产品",
      }),
      deployURL: "/blog/maxkey",
      tags: "Application"
    },
    {
      image: "/img/partners/blade.png",
      title: "Spring Blade",
      githubURL: "https://gitee.com/smallc/SpringBlade",
      description: translate ({
        id: "partners.blade.description",
        message: "SpringBlade 是一个由商业级项目升级优化而来的企业级的SaaS多租户微服务平台",
      }),
      deployURL: "/docs/micro-service/example/blade/",
      tags: "Application"
    },
    {
      image: "/img/partners/pig.png",
      title: "Spring Cloud Pig",
      githubURL: "https://gitee.com/log4j/pig",
      description: translate ({
        id: "partners.pig.description",
        message: "基于Spring Boot 3.0,Spring Cloud Alibaba 的微服务 RBAC 权限管理系统",
      }),
      deployURL: "/docs/micro-service/example/pig/",
      tags: "Application"
    },
    {
      image: "/img/partners/talkweb.png",
      title: "Talkweb",
      githubURL: "https://www.talkweb.com.cn",
      description: translate ({
        id: "partners.talkweb.description",
        message: "拓维信息是中国领先的软硬一体化产品及解决方案提供商",
      }),
      deployURL: "/docs/devops/pipeline/",
      tags: "Plugin"
    },
    {
      image: "/img/partners/zyplayer-doc.png",
      title: "zyplayer-doc",
      githubURL: "https://gitee.com/dromara/zyplayer-doc",
      description: translate ({
        id: "partners.zyplayer-doc.description",
        message: "适合企业和个人使用的可私有化部署的在线知识库管理系统",
      }),
      deployURL: "/blog/zyplayer-doc",
      tags: "Application"
    },
    {
      image: "/img/partners/topiam.svg",
      title: "TopIAM",
      githubURL: "https://github.com/topiam/eiam",
      description: translate ({
        id: "partners.topiam.description",
        message: "TOPIAM 是一个以开源为核心的 IAM/IDaaS 身份管理平台",
      }),
      deployURL: "/blog/topiam",
      tags: "Application"
    },
  ];

  PartnersList.sort((a, b) => a.title.localeCompare(b.title));

  return (
    <Layout>
      <div className={styles.background}>
        <div className={clsx(styles.container, "container")}>
          <div className={clsx(styles.rowHeader, "row")}>
            <div className="col col--12">
              <h1>
                <Translate id="partners.title">
                  成为 Rainbond 合作伙伴
                </Translate>
              </h1>
            </div>
            <div className="col col--12">
              <p className={styles.font}>
                <Translate id="partners.description1">
                  我们非常期待优秀的开源项目能够成为 Rainbond 合作伙伴，与 Rainbond 结合形成最佳的解决方案。同时，还给合作伙伴提供了相关的权益和资源。
                </Translate>
                <br />
                <Translate id="partners.description2">
                Rainbond 提供了多种成为合作伙伴的路径，如下：
                </Translate>
              </p>
            </div>
          </div>
          <div className={clsx(styles.rowHeaderCard, "row")}>
            {PartnerHeaderList.map(({ title, description, tags}, index) => (
            <div className="col col--6" key={index}>
              <div className={clsx(styles.cardHeader, "card", "shadow--md")} style={{ float: ( tags === "apps") ? "right" : "none"}}>
                <div className="card__header">
                  <h2>{title}</h2>
                </div>
                <div className={clsx(styles.cardHeaderBody, "card__body")}>
                  <p className={styles.cardHeaderFont}>
                    {description}
                  </p>
                </div>
                {/* <div className="card__footer">
                  <a className="button button--outline button--primary button--block" href={url}>
                    {buttonDescription}
                  </a>
                </div> */}
              </div>
            </div>
            ))}
          </div>
        </div>
      </div>
      <div className={clsx(styles.containerPartnersList, "container")}>
        <div className={clsx(styles.rowHeader, "row")}>
          <div className="col col--12">
            <h1>合作伙伴</h1>
          </div>
          <div className="col col--12">
            <Text underline link={{ href: 'https://rainbond.feishu.cn/share/base/form/shrcnywQpD9yBvs21AAbXMCfXWb', target: '_blank'}} className={styles.text} >
              <Translate id="">如果您想在合作伙伴列表展示您的应用程序信息，请申请成为 Rainbond 合作伙伴或直接联系我们。</Translate>
            </Text>
          </div>
        </div>
        <div className="row" style={{ marginBottom: "40px" }}>
        {PartnersList.map(({ image, title, githubURL, description, deployURL, tags}, index) => (
          <div className={clsx(styles.colPartnersList, "col col--3")} key={index}>
            <div className="card shadow--md">
              <div className={clsx(styles.cardImagePartnersList, "card__image")}>
                  <img src={image} className={styles.cardImage}/>
              </div>
              <div className="card__body">
                <div className={styles.cardBodyPartnersList}>
                  <h4 className={styles.cardBodyH4PartnersList}>
                    <a href={githubURL} target="_blank">{title}</a>
                  </h4>
                  <a className={clsx(styles.button, "button button--sm button--secondary")} href={deployURL} target="_blank">deploy</a>
                </div>
                <p className={styles.cardBodyFoot}>{description}</p>
              </div>
              <div className="card__footer">
                <div className={styles.cardFooterPartnersList}>
                  <span className={styles.cardFooterSpanPartnersList}>{tags}</span>
                  <span className={styles.cardFooterSpanStylePartnersList} style={{ backgroundColor: ( tags === "Application") ? "rgb(57, 202, 48)" : ( tags === "Plugin") ? "rgb(223, 213, 69)" : "none" }}></span>
                </div>
              </div>
            </div>
          </div>
        ))}
        </div>
      </div>
    </Layout>
  );
 }