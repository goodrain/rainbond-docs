---
title: 离线环境 0 基础 10 分钟部署高可用 K8s？这个工具太强了！
description: 还在手搓 K8s 离线安装包？你该升级装备了！
slug: offline-ha-k8s-in-10-minutes
date: 2025-12-04
tags:
  - 入门教程
  - Kubernetes
  - 离线部署
---

还在手搓 K8s 离线安装包？你该升级装备了！

对于运维和开发工程师来说，**离线环境部署 Kubernetes**往往是一场噩梦。

当你兴致勃勃准备大干一场时，现实通常是这样的：

- 镜像缺失： ImagePullBackOff 成了屏幕上最常见的报错。
- 配置繁琐： 证书、ETCD、网络插件……稍微错一个参数，集群就起不来。
- 不仅是K8s：装好了 K8s 只是第一步，还得装监控、装网关、装管理面板……

**有没有一种工具，能像在线安装一样丝滑，把 K8s 集群和管理平台一次性端进离线机房？**

今天，我们要向大家推荐一款神器 [**ROI (Rainbond Offline Installer)**](https://www.rainbond.com/docs/installation/offline/roi/quickstart)

## 什么是 ROI？

ROI 是 Rainbond 团队专为**完全离线环境**打造的一站式部署工具。

它的目标很简单：**让离线环境下的云原生平台交付，变得像 apt-get install 一样简单。**

无论你是需要在无网的物理机房交付项目，还是在很多安全限制的内网做 POC，ROI 都能让你事半功倍。

### 1. 真正的全栈离线交付

ROI 不止安装 K8s。它提供了一个包含所有依赖的大礼包。

- 自动 OS 调优： 内核参数、防火墙、Swap……ROI 自动帮你按最佳实践配置好。
- 内置 K8s (RKE2)： 基于轻量级、高安全性的 RKE2 发行版，符合生产标准。
- 自动存储配置： 自动配置 LVM 和 NFS，不再为持久化存储头疼。
- 内置MySQL：集群模式下默认部署 MySQL 主从集群，为 Rainbond 集群提供高可用的 MySQL。
- 预加载镜像： 所有需要的容器镜像都已打包，无需配置任何 Registry 代理。

### 2. 极简操作，零门槛上手

忘掉那些几百行的 Ansible 脚本吧。ROI 的操作逻辑简单到令人发指：

1. 下载：一条命令把所有离线包下载到本地。
2. 分发：自动将包分发到集群所有节点。
3. 安装：一个命令 `roi up`，集群就好了。

## 不仅仅是 K8s，更是 Rainbond

很多朋友为了离线装 K8s 费尽周折，但装好 K8s 后，**如何让不懂 K8s 的开发人员也能用起来？** 这才是更大的挑战。

使用 ROI，你在获得一个标准 K8s 集群的同时，还免费获得了一套强大的**不用懂 Kubernetes 的开源容器平台 —— Rainbond**。

**Rainbond 能为你做什么？**

- 应用视角的管理： 不需要写 Yaml，不需要懂 Service/Ingress，直接通过源码或镜像就能部署应用。
- 应用市场： 像手机装 App 一样安装 MySQL、Redis、GitLab 等中间件。
- ......

ROI + Rainbond，不仅解决了**怎么装**的问题，更解决了**怎么用**的问题。

> 如果你想从解决方案角度判断“纯离线安装、离线交付、麒麟 V10 / ARM 部署、x86 到 ARM 迁移”应该先看哪条路径，建议进入 [离线 / 信创 / 国产化专题](/offline-and-xinchuang)，完全离线环境可以直接从 [纯离线环境安装](/offline-and-xinchuang/pure-offline-install) 开始。

## 快速上手演示

眼见为实，让我们看看用 ROI 部署有多简单。

### 第一步：在有网环境下载离线包

```bash
# 下载 ROI 工具
curl -o roi https://get.rainbond.com/roi/roi-amd64 && chmod +x roi

# 一键下载所有离线资源
./roi download
```

### 第二步：将文件拷贝到离线服务器
拿到 offline-packages 目录后，通过 U 盘或光盘拷贝到内网服务器。

### 第三步：单机一键安装（最简模式）

> 单机部署下默认会部署 NFS Server，你需要手动安装，如 yum -y install nfs-utils。
>
> TODO：未来会支持自动部署

```bash
# 无需任何配置，直接起飞
./roi up
```

### 第四步：集群模式安装（生产模式）
只需编写一个简单的 cluster.yaml：

```yaml
hosts:
  - name: node-1
    address: 172.16.0.134
    internalAddress: 172.16.0.134
    user: root
    password: root

  - name: node-2
    address: 172.16.0.135
    internalAddress: 172.16.0.135
    user: root
    password: root

  - name: node-3
    address: 172.16.0.136
    internalAddress: 172.16.0.136
    user: root
    password: root

# Role assignment
roleGroups:
  etcd: [node-1, node-2, node-3]
  master: [node-1, node-2]
  worker: [node-1, node-2, node-3]
  nfs-server: [node-1]
  rbd-gateway: [node-2, node-3]
  rbd-chaos: [node-2, node-3]

# Storage configuration
storage:
  nfs:
    enabled: true
    sharePath: /nfs-data/k8s
    storageClass:
      enabled: true

# Database configuration - MySQL with master-slave replication
database:
  mysql:
    enabled: true
    masterPassword: "RootPassword123!"
    replicationPassword: "ReplPassword123!"

# Rainbond configuration
rainbond:
  version: v6.4.0-release
```

然后执行：

```bash
./roi up -f cluster.yaml
```


**✅ 安装完成！**

终端会直接输出访问地址。打开浏览器，你不仅拥有了一个 Ready 状态的 K8s 集群，更拥有了一个功能完备的 Rainbond 控制台。

> **离线交付不再难，用 ROI 重新定义你的部署效率。**
