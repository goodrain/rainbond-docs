---
title: "4. 安装 Kubernetes 集群"
description: "安装高可用 Kubernetes 集群"
keywords:
- 安装高可用 Kubernetes 集群
---

本章节介绍高可用安装 Kubernetes 集群，Rainbond 集群需要使用 Kubernetes 集群作为底层容器编排平台，Rainbond 集群的所有组件都将在 Kubernetes 集群上运行。

## 准备环境

Kubernetes 集群需要满足以下条件：

* 请按照 [安装前概述与要求](/docs/installation/ha-deployment/overview/) 准备相关服务与资源
* Kubernetes 版本为 1.16.0 及以上；

## 自行安装 Kubernetes 集群

Kubernetes 集群可以使用 [Kubeadm](https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/create-cluster-kubeadm/) [Kubespray](https://github.com/kubernetes-sigs/kubespray) 等工具进行安装，也可以自行通过其他方式安装。

## 通过 Web 界面安装 Kubernetes 集群

:::danger
注意，通过 Web 控制台安装 Kubernetes 集群不支持 Containerd 作为容器运行时，所以所有节点的容器运行时必须为 Docker。
:::

Rainbond 控制台安装的 Kubernetes 是 Rancher Kubernetes Engine(RKE)，是 Rancher Labs 开发的 Kubernetes 安装工具，RKE 通过 Docker 容器运行 Kubernetes 组件。默认安装的 Kubernetes 版本为 `1.23.10`

### 部署 Rainbond 控制台

使用 Docker 启动 Allinone 控制台。

```bash
docker run -d -p 7070:7070  \
--name=rainbond-allinone --restart=always \
-v ~/.ssh:/root/.ssh \
-v ~/rainbonddata:/app/data \
-e DB_TYPE=mysql \
-e MYSQL_DB=console \
-e MYSQL_PORT=3306 \
-e MYSQL_HOST=** \
-e MYSQL_USER=** \
-e MYSQL_PASS=** \
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.17.1-release-allinone
```

* 请将 `数据库连接信息` 替换为自己的实际连接信息。

### 部署 Kubernetes 集群

1. 在左侧导航栏选择 **集群 -> 添加集群 -> 从主机开始安装** 填写相关信息:

| IP地址                   | 内网IP地址 | SSH端口 | 节点类型                             |
| ------------------------ | ---------- | ------- | ------------------------------------ |
| 公网IP，如没有填写内网IP | 填写内网IP | 默认 22 | 至少一个ETCD节点、管理、计算，可复用 |

2. 节点信息填写完毕后，根据页面提示复制节点初始化命令在集群内所有服务器上执行。
3. 等待集群部署完毕即可，如遇到问题可参阅 [安装问题排查文档](/docs/troubleshooting/installation/helm)

### 自定义 RKE 集群参数

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```