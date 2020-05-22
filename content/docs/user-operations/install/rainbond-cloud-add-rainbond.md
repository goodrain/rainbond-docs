---
title: 对接已有 Rainbond 集群
description: 基于 Rainbond Cloud 对接已有的 Rainbond 集群
weight: 2
keywords: ["rainbond cloud", "rainbond"]
---

本文将会介绍如何将已有的 Rainbond 集群，添加到 [Rainbond Cloud](../../../quick-start/rainbond-cloud/) 中。

### 前提条件

开始之前，请检查以下前提条件：

1. 了解 [Rainbond Cloud](../../../quick-start/rainbond-cloud/) ，并进行[注册](https://cloud.goodrain.com/enterprise-server/registered)和[登陆](https://cloud.goodrain.com/enterprise-server/login)。
1. 安装好的 Rainbond 集群，安装请参考[高可用部署 Rainbond](../install-base-ha)或[最小化部署 Rainbond](../minimal_install)。
1. [grctl 命令行工具](/docs/user-operations/tools/grctl/)。

### 开始对接

1. 生成 Region-Config 文件：

    ```bash
    $ grctl config > region-config.yaml && cat region-config.yaml
    apiAddress: https://39.104.148.188:8443
    ca.pem: |
    -----BEGIN CERTIFICATE-----
    xxx
    -----END CERTIFICATE-----
    client.key.pem: |
    -----BEGIN RSA PRIVATE KEY-----
    xxx
    -----END RSA PRIVATE KEY-----
    client.pem: |
    -----BEGIN CERTIFICATE-----
    xxx
    -----END CERTIFICATE-----
    defaultDomainSuffix: xxxxxx.grapps.cn
    defaultTCPHost: 1.1.1.1
    websocketAddress: ws://1.1.1.1:6060
    ```

2. 导入 Region-Config 文件：

    登录 Rainbond Cloud, 进入 `集群` -> `集群管理` -> `添加集群` -> `导入`，然后上传上面生成的 Region-Config 文件。

    添加集群参数说明：

    - 集群 ID：集群在 Rainbond Cloud 中的唯一标识，一旦确认不可以再修改，比如：`rainbond`。
    - 集群名称：集群在 Rainbond Cloud 中的名称，可以随意修改，比如：`开发测试集群`。
    - 备注：对集群的进一步说明。

### 验证结果

进入 `集群管理` 页面，检查集群的状态，如下图所示：

![集群状态](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/Rainbond%20Cloud%20%E8%87%AA%E5%8A%A8%E5%AF%B9%E6%8E%A5%E9%98%BF%E9%87%8C%E4%BA%91%20ACK/%E9%9B%86%E7%BE%A4%E7%8A%B6%E6%80%81.png)

请留意，`开发测试集群` 的状态是 `运行中`，说明 Rainbond 安装成功。
