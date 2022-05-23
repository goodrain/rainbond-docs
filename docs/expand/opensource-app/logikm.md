---
title: 滴滴Logi-KafkaManager
description: 一站式Apache Kafka集群指标监控与运维管控平台
weight: 7005
---

### 简介

[滴滴Logi-KafkaManager](https://github.com/didi/LogiKM)脱胎于滴滴内部多年的Kafka运营实践经验，是面向Kafka用户、Kafka运维人员打造的共享多租户Kafka云平台。专注于Kafka运维管控、监控告警、资源治理等核心场景，经历过大规模集群、海量大数据的考验。

### 快速部署Logikm

首先根据快速安装文档部署 [Rainbond](/docs/quick-start/quick-install/)

LogiKm 已发布至 `开源应用商店` ，用户可搜索 `logikm`，一键安装 Logikm Kafka Manager

![](https://static.goodrain.com/wechat/logikm/install-logikm.png)

安装后，访问 `logikm-front`即可进入，默认密码：admin / admin



### 快速部署Kafka集群

上面我们已经部署了 `Logikm`，接下来我们也可通过 `开源应用商店` 安装Kafka集群并进行对接。

Kafka 已发布至 `开源应用商店` ，用户可搜索 `kafka`，一键安装 Kafka-Zookeeper-Bitnami

![](https://static.goodrain.com/wechat/logikm/install-kafka.png)



安装完成后，我们进入 `kafka1` 和 `kafka2` 的组件 -> 环境变量

修改 `KAFKA_CFG_ADVERTISED_LISTENERS` 环境变量为组件`9092`端口的对外IP + 端口，例如：`PLAINTEXT://192.168.3.162:10000`

修改 `JMX_PORT` 环境变量为TCP对外端口地址供 `Logikm` 获取指标。例如：`JMX_PORT`为9999，组件对应的端口也要为9999，同时tcp对外端口也是9999



### 使用Logikm对接并管理Kafka集群

接下来我们通过 `Logikm` 对接刚刚安装的 `kafka`集群。

访问 `logikm-front`，进入 运维管控 -> 接入集群，根据页面提示填写对应信息。

对接完成后，我们就可通过 `Logikm` 管理 `kafka` 集群啦。

![](https://static.goodrain.com/wechat/logikm/logikm-clusterinfo.png)


