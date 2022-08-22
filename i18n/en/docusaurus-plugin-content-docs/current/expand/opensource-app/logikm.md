---
title: Didi Logi-KafkaManager
description: One-stop Apache Kafka cluster indicator monitoring and operation and maintenance management and control platform
weight: 7005
---

### Introduction

[Logi-KafkaManager](https://github.com/didi/LogiKM)is a shared multi-tenant Kafka cloud platform built for Kafka users and Kafka operation and maintenance personnel.Focus on core scenarios such as Kafka operation and maintenance control, monitoring and alarming, resource governance, etc., and has experienced the test of large-scale clusters and massive big data.

### Quickly deploy Logikm

First deploy [Rainbond](/docs/quick-start/quick-install/)according to the quick install documentation

LogiKm has been released to `open source app store` , users can search `logikm`, install Logikm Kafka Manager with one click

![](https://static.goodrain.com/wechat/logikm/install-logikm.png)

After installation, access `logikm-front`to enter, default password：admin/admin



### Quickly deploy a Kafka cluster

We have deployed `Logikm`above, and then we can also install Kafka clusters through `open source application stores` and connect them.

Kafka has been released to `open source application store` , users can search `kafka`, install Kafka-Zookeeper-Bitnami with one click

![](https://static.goodrain.com/wechat/logikm/install-kafka.png)



After the installation is complete, we enter the components of `kafka1` and `kafka2` -> environment variables

Modify the `KAFKA_CFG_ADVERTISED_LISTENERS` environment variable to the external IP + port of the component`9092`port, such as：`PLAINTEXT://192.168.3.162:10000`

Modify the `JMX_PORT` environment variable to the TCP external port address for `Logikm` to obtain indicators.For example,：`JMX_PORT`is 9999, the port corresponding to the component should also be 9999, and the tcp external port is also 9999



### Use Logikm to connect and manage Kafka clusters

Next, we connect the `kafka`clusters just installed through `Logikm`.

Access `logikm-front`, enter the operation and maintenance control-> access cluster, and fill in the corresponding information according to the page prompts.

After the connection is completed, we can manage `kafka` clusters through `Logikm`.

![](https://static.goodrain.com/wechat/logikm/logikm-clusterinfo.png)


