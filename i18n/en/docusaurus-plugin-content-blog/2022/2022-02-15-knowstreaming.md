---
title: Deployment of KnowStreaming on Rainbond
description: KnowStreaming is a cloud-born Kafka control platform, born of many years of experience in running Kafka within the internet.
slug: Known
image: /img/partners/knowstreaming.png
keywords:
  - Kafka Admin Platform
  - Knowledge Streaming
---

[KnowStreaming](https://github.com/didi/KnowStreaming) is a cloud control platform that is born of many years of experience in the operation of Kafka within the internet, focusing on the core scenarios of Kafka traffic control, warning monitoring, resource management and disaster preparedness.The platform, visualization and intelligent construction of user experience, monitoring, and control of transport provide a range of features that greatly facilitate the daily use of users and those who transport them, making them specialists in Kafka.

<!--truncate-->

## Rapid deployment KnowStreaming

Search for `KnowStreaming` and install it on the **Platform Manager -> Marketplace -> Open Source Store**.

![](https://static.goodrain.com/wechat/KnowStreaming/KnowStreaming-install.png)

Once the installation is complete, access `KnowStreaming-UI` via the domain name provided by Rainbond, default password：**admin/admin**.

![](https://static.goodrain.com/wechat/KnowStreaming/Topology.png)

## Install the Kafka cluster and manage it via KnowStreaming

### Install Kafka cluster

Search for `kafka` and install it on the \*\*Platform Manager -> Marketplace -> Open Source Store \*\*.Install for the same app as `KnowStreaming`.

![](https://static.goodrain.com/wechat/KnowStreaming/kafka.png)

### Create Dependencies

Go to the `KnowStreaming` application view, switch to the `layout mode`, connecting the `Manager-KnowStreaming` component to `kafka` and `zookeper`.

![](https://static.goodrain.com/wechat/KnowStreaming/ks-kafka.png)

### Manage Kafka clusters

Visit `KnowStreaming-UI` and use Kafka cluster：

- Bootstrap Servers: Enter -> Port inside Kafka component, copy access address.
- Zookeper: Enter the --> port in the zookeeper component, copy access address.

![](https://static.goodrain.com/wechat/KnowStreaming/docking-cluster.png)

The following effects after hitting complete：

![](https://static.goodrain.com/wechat/KnowStreaming/ks-overview.png)
