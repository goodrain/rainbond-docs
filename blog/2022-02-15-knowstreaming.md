---
title: 在 Rainbond 上部署 KnowStreaming
description: 一站式Apache Kafka集群指标监控与运维管控平台
slug: knowstreaming
---

### 简介

[KnowStreaming](https://github.com/didi/KnowStreaming) 是一套云原生的Kafka管控平台，脱胎于众多互联网内部多年的Kafka运营实践经验，专注于Kafka运维管控、监控告警、资源治理、多活容灾等核心场景。在用户体验、监控、运维管控上进行了平台化、可视化、智能化的建设，提供一系列特色的功能，极大地方便了用户和运维人员的日常使用，让普通运维人员都能成为Kafka专家。

### 快速部署 KnowStreaming

首先根据快速安装文档部署 [Rainbond](/docs/quick-start/quick-install/)

KnowStreaming 已发布至 `开源应用商店` ，用户可搜索 `KnowStreaming`，一键安装 KnowStreaming

![](https://static.goodrain.com/wechat/logikm/1.png)

安装后，访问 `KnowStreaming-UI` 进入控制台，默认密码：admin / admin

![](https://static.goodrain.com/wechat/logikm/2.png)

### 快速部署 Kafka 集群

上面我们已经部署了 `KnowStreaming`，接下来我们也可通过 `开源应用商店` 安装Kafka集群并进行对接。

Kafka 已发布至 `开源应用商店` ，用户可搜索 `kafka`，一键安装 Kafka-Zookeeper-Bitnami

![](https://static.goodrain.com/wechat/logikm/install-kafka.png)



安装完成后，我们进入 `kafka1` 和 `kafka2` 的组件 -> 环境变量

修改 `KAFKA_CFG_ADVERTISED_LISTENERS` 环境变量为组件`9092`端口的对外IP + 端口，例如：`PLAINTEXT://192.168.3.162:10000`

修改 `JMX_PORT` 环境变量为TCP对外端口地址供 `Logikm` 获取指标。例如：`JMX_PORT`为9999，组件对应的端口也要为9999，同时tcp对外端口也是9999



### 使用 KnowStreaming 对接并管理 Kafka 集群

接下来我们通过 `KnowStreaming` 对接刚刚安装的 `kafka`集群。

访问 `KnowStreaming`，接入集群，根据页面提示填写对应信息。

对接完成后，我们就可通过 `KnowStreaming` 管理 `kafka` 集群啦。