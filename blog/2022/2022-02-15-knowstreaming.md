---
title: 在 Rainbond 上部署 KnowStreaming
description: KnowStreaming 是一套云原生的Kafka管控平台，脱胎于众多互联网内部多年的Kafka运营实践经验，专注于Kafka运维管控、监控告警、资源治理、多活容灾等核心场景
slug: knowstreaming
image: /img/partners/knowstreaming.png
keywords:
- Kafka 管理平台
- KnowStreaming
---

[KnowStreaming](https://github.com/didi/KnowStreaming) 是一套云原生的Kafka管控平台，脱胎于众多互联网内部多年的Kafka运营实践经验，专注于Kafka运维管控、监控告警、资源治理、多活容灾等核心场景。在用户体验、监控、运维管控上进行了平台化、可视化、智能化的建设，提供一系列特色的功能，极大地方便了用户和运维人员的日常使用，让普通运维人员都能成为Kafka专家。

<!--truncate-->

## 快速部署 KnowStreaming

在 Rainbond 的**平台管理 -> 应用市场 -> 开源应用商店**中搜索 `KnowStreaming` 并一键安装。

![](https://static.goodrain.com/wechat/KnowStreaming/KnowStreaming-install.png)

安装完成后，通过 Rainbond 默认提供的域名访问 `KnowStreaming-UI`，默认密码：**admin/admin**。

![](https://static.goodrain.com/wechat/KnowStreaming/Topology.png)

## 安装 Kafka 集群并通过 KnowStreaming 对接管理
### 安装 Kafka 集群

在 Rainbond 的**平台管理 -> 应用市场 -> 开源应用商店**中搜索 `kafka` 并一键安装。安装到与 `KnowStreaming` 同一个应用下。

![](https://static.goodrain.com/wechat/KnowStreaming/kafka.png)

### 建立依赖关系

进入 `KnowStreaming` 应用视图，切换到 `编排模式`，将 `Manager-KnowStreaming` 组件连接到 `kafka` 和 `zookeeper`。

![](https://static.goodrain.com/wechat/KnowStreaming/ks-kafka.png)

### 管理 Kafka 集群

访问 `KnowStreaming-UI` 并对接 Kafka 集群：
* Bootstrap Servers: 进入 Kafka 组件内 -> 端口，复制访问地址。
* Zookeeper: 进入 zookeeper 组件内 -> 端口，复制访问地址。

![](https://static.goodrain.com/wechat/KnowStreaming/docking-cluster.png)

对接完成后的效果如下：

![](https://static.goodrain.com/wechat/KnowStreaming/ks-overview.png)