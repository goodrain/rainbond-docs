/**
 * Copyright (c) Goodrain, Inc.
 *
 * This source code is licensed under the LGPL-3.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from "react";
import { Card } from "@douyinfe/semi-ui";
import styles from "./styles.module.css";

export default function Painpoint() {
  const painpoints = [
    {
      role: "初学者 / 个人开发者",
      description: "只会基础的 Linux 命令，面对 Kubernetes 庞大晦涩的概念体系宛如看天书。想部署个复杂的开源项目或 AI 大模型，跟着教程折腾几天连环境都跑不起来。",
    },
    {
      role: "开发工程师",
      description: "天天被迫手写 Dockerfile 和 CI/CD 部署脚本。明明在本地跑得好好的，一上测试环境就报错，大半的宝贵时间都浪费在联调和配环境上。",
    },
    {
      role: "运维工程师",
      description: "硬生生被逼成了 YAML 配置工程师。微服务一多就乱成一锅粥，还要时刻盯着底层集群的状态，每次版本更新都心惊胆战，排查故障宛如大海捞针。",
    },
    {
      role: "团队负责人",
      description: "高薪招来的研发天天在干运维的杂活，底层技术壁垒严重拖累了业务交付效率。去客户现场做私有化部署动辄耗时一两周，交付成本居高不下。",
    },
  ];

  return (
    <div className={styles.painpointSection}>
      <div className={styles.bgSection} aria-hidden="true">
        <div className={styles.lf}></div>
        <div className={styles.mid}></div>
        <div className={styles.rt}></div>
      </div>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            您需要
            <br />
            以应用为中心的现代化交付
            <br />
            <span className={styles.subtitle}>而不是</span>
          </h2>
          <p className={styles.description}>
            让整个团队的创造力，在繁琐的环境搭建、
            <br />
            割裂的工具链与错综复杂的架构黑盒中被严重内耗。
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {painpoints.map((item, index) => (
            <Card
              key={index}
              className={styles.card}
              bodyStyle={{ padding: "24px" }}
            >
              <div className={styles.cardContent}>
                <div className={styles.icon}>!</div>
                <div className={styles.cardText}>
                  <h3 className={styles.role}>{item.role}：</h3>
                  <p className={styles.cardDescription}>{item.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
