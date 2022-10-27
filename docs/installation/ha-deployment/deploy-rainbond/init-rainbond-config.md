---
title: Rainbond 集群初始化配置
description: 介绍 Rainbond 集群初始化配置，包括 Web 界面初始化配置以及 Helm 参数说明
keywords:
- 介绍 Rainbond 集群初始化配置，包括 Web 界面初始化配置以及 Helm 参数说明
---

本文介绍 Rainbond 集群初始化配置，包括 Web 界面初始化配置以及 Helm 参数说明。

## Web 界面初始化配置

Rainbond 集群端是通过 `rainbond-operator` 进行安装的，通过配置 CRD `rainbondcluster` 来安装 Rainbond 集群。在安装 Rainbond 集群之前，需要先配置 `rainbondcluster` CRD，配置完成后，rainbond-operator 会根据配置信息安装 Rainbond 集群。

```yaml title="集群配置参数示例"
apiVersion: rainbond.io/v1alpha1
kind: RainbondCluster
metadata:
  name: rainbondcluster
  namespace: rbd-system
spec:
  enableHA: true
  etcdConfig:
    endpoints:
    - 192.168.3.103:2379
    - 192.168.3.102:2379
    - 192.168.3.101:2379
    secretName: rbd-etcd-secret
  gatewayIngressIPs:
  - 192.168.3.104
  nodesForGateway:
  - name: node1
    internalIP: 192.168.3.101
    externalIP: 192.168.3.101
  - name: node2
    internalIP: 192.168.3.102
    externalIP: 192.168.3.102
  - name: node3
    internalIP: 192.168.3.103
    externalIP: 192.168.3.103
  nodesForChaos:
  - name: node1
  - name: node2
  - name: node3
  imageHub:
    domain: image.xxxxx.com
    namespace: test
    password: xxxxx!
    username: root
  rainbondVolumeSpecRWO:
    storageClassName: glusterfs-simple
  rainbondVolumeSpecRWX:
    storageClassName: glusterfs-simple
  regionDatabase:
    host: 172.20.251.91
    name: rbdregion
    password: password
    port: 3306
    username: root
  suffixHTTPHost: 5-3-0.goodrain.org
```

配置参数说明如下：

| 参数(类型)                | 二级参数(类型)           | 说明                                                         |
| ------------------------- | ------------------------ | ------------------------------------------------------------ |
| enableHA(Bool)            |                          | 是否高可用部署，所有POD都会运行多副本                        |
| etcdConfig (Struct)       | endpoints(Array)         | 填写 Kubernetes ETCD 的实例列表。不填写则默认安装ETCD        |
|                           | secretName(String)       | ETCD 的 SSL 证书 secret name                                 |
| gatewayIngressIPs (Array) |                          | 网关外网 IP 地址，一般是指 SLB 或 VIP                        |
| nodesForGateway(Array)    |                          | 指定网关节点列表                                             |
|                           | name(String)             | 节点名称                                                     |
|                           | internalIP(String)       | 节点内网 IP                                                  |
|                           | externalIP(String)       | 节点外网 IP                                                  |
| nodesForChaos(Array)      |                          | 指定构建节点列表                                             |
|                           | name(String)             | 节点名称                                                     |
| imageHub(Struct)          |                          | 配置镜像仓库连接信息                                         |
|                           | domain (String)          | 镜像仓库域名，需要可正常访问                                 |
|                           | namespace(String)        | 镜像仓库命名空间                                             |
|                           | username(String)         | 用户名                                                       |
|                           | password(String)         | 密码                                                         |
| regionDatabase(Struct)    |                          | 配置集群端数据连接信息                                       |
|                           | host(String)             | 集群数据库 IP 地址                                           |
|                           | port(int)                | 集群数据库端口                                               |
|                           | username(String)         | 集群账号                                                     |
|                           | password(String)         | 集群密码                                                     |
|                           | name(String)             | 集群数据库名称                                               |
| rainbondVolumeSpecRWO     |                          | 单读单写存储，一般是指块存储设备。如果提供则有状态服务默认将使用。<br />留空则使用RWX提供动态存储 |
|                           | storageClassName(string) | 指定集群中的storageclassname                                 |
| rainbondVolumeSpecRWX     |                          | 共享存储配置，留空则使用默认存储                             |
|                           | storageClassName(string) | 集群中存在的storageclass名称，非必填                         |
| suffixHTTPHost(String)    |                          | 集群 HTTP 默认域名后缀，留空则自动分配                       |


### 对接阿里云 NAS 存储

* 首先需在阿里云创建NAS，可参考阿里云[文件存储NAS](https://help.aliyun.com/product/27516.html)文档

:::tip
通过填写以下信息，Rainbond 会自动创建阿里云 NAS 存储的 CSI 插件，并自动对接，无需用户手动创建 CSI 对接。
:::

在阿里云NAS页面获取server地址，替换下面 NAS_SERVER_ADDR。

```yaml
spec:
  rainbondVolumeSpecRWX:
    csiPlugin: 
      aliyunNas: {}
    storageClassParameters:
      mountOptions: 
      - "nolock,tcp,noresvport"
      - "vers=4"
      - "minorversion=0"
      - "rsize=1048576"
      - "wsize=1048576"
      - "timeo=600"
      - "retrans=2"
      - "hard"
      parameters: 
        volumeAs: subpath
        archiveOnDelete: "true"
        server: <NAS_SERVER_ADDR>
```

