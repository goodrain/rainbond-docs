---
title: '平台组件架构'
date: 2020-02-17T15:15:54+08:00
draft: false
weight: 801
---

本文主要介绍完整部署 Rainbond 所需要的所有服务组件，帮助用户了解 Rainbond 技术栈与组件架构。

目前版本，系统组件生命周期由 `Kubernetes` 和 `Rainbond-Operator` 共同维护和管理。

### 服务组件概述

#### 以下是通过一键部署方式将会在服务器安装的 Rainbond 各服务组件及其版本信息。

| 组件                                                 | 版本    | 说明                                                                                   |
| ---------------------------------------------------- | ------- | -------------------------------------------------------------------------------------- |
| [rainbond-operator](../component/rainbond-operator/) | v0.01   | 维护 rainbond 组件的配置与运行状态                                                     |
| [rbd-api](../component/rbd-api/)                     | 5.x     | rainbond 区域中心 API 服务，提供底层服务接口                                           |
| [rbd-app-ui](../component/rbd-app-ui/)               | 5.x     | 应用控制台 web 服务                                                                    |
| [rbd-chaos](../component/rbd-chaos/)                 | 5.x     | 应用构建服务，提供源码，Docker 镜像等方式创建应用                                      |
| [rbd-db](../component/rbd-db/)                       | 5.x     | 云帮数据库服务，支持 MySQL` 5.6``5.7``8.0 `                                            |
| [rbd-dns](../component/rbd-dns/)                     | 5.x     | rainbond 内部 dns 服务，可作为集群 dns 服务使用                                        |
| [etcd](../component/etcd/)                           | v3.3.18 | `etcd`存储集群的元数据信息，集群状态和网络配置                                         |
| [rbd-eventlog](../component/rbd-eventlog/)           | 5.x     | rainbond 事件处理与日志汇聚服务                                                        |
| [rbd-gateway](../component/rbd-gateway/)             | 5.x     | 通向应用的全局网关，提供 A/B 测试、灰度发布等高级功能                                  |
| [rbd-hub](../component/rbd-hub/)                     | v2.6.2  | 基于[Docker Registry](https://docs.docker.com/registry/)封装，提供 docker 镜像存储服务 |
| [rbd-mq](../component/rbd-mq/)                       | 5.x     | 消息队列服务                                                                           |
| [rbd-nfs](../component/rbd-mq/)                      | v2.2.1  | 存储服务                                                                               |
| [rbd-node](../component/rbd-node/)                   | 5.x     | 集群监控与控制，docker 证书分发                                                        |
| [rbd-repo](../component/rbd-repo/)                   | v6.16.0 | 源码构建仓库服务，基于[Artifactory OSS](https://jfrog.com/open-source/)封装            |
| [rbd-webcli](../component/rbd-webcli/)               | 5.x     | 提供应用 web 方式进入容器命令行的服务                                                  |
| [rbd-worker](../component/rbd-worker/)               | 5.x     | 云帮应用操作与处理服务                                                                 |

#### 以下是通过 rainbond 官方推荐的 [easzup](https://github.com/easzlab) 快速部署 Kubernetes 安装的各组件及版本信息

| 组件                                                             | 版本    | 说明                                                               |
| ---------------------------------------------------------------- | ------- | ------------------------------------------------------------------ |
| [docker](../component/docker/)                                   | v18.09  | 应用容器引擎                                                       |
| [kubelet](../component/kubelet/)                                 | v1.16.2 | 是在每个 Node 节点上运行的主要节点代理                             |
| [kube-apiserver](../component/kube-apiserver/)                   | v1.16.2 | 为 API 对象验证和配置数据                                          |
| [kube-controller-manager](../component/kube-controller-manager/) | v1.16.2 | Kubernetes 集群内部的管理控制中心                                  |
| [kube-scheduler](../component/kube-scheduler/)                   | v1.16.2 | 负责分配调度 Pod 到集群内的 node 节点                              |
| [kube-proxy](../component/kube-proxy/)                           | v1.16.2 | Kubernetes 的网络代理，在每个 node 节点上运行                      |
| [coredns](../component/coredns/)                                 | v1.6.2  | 为 Kubernetes 集群中的其他 pods 提供域名解析服务                   |
| [kube-flannel](../component/kube-flannel/)                       | v0.11.0 | Flannel 是最早应用到 k8s 集群的网络插件之一                        |
| [metrics-server](../component/metrics-server/)                   | v0.3.6  | Kubernetes 的监控组件，从`Kubelet `公开的`Summary API`采集指标信息 |

**组件高级用法可以通过点击组件的链接方式阅读。**

### 附录

#### 服务组件端口说明

> 公网访问: 如部署在公有云环境需要公网访问需要安全组放行

| 端口号                  | 说明                                       | 公网访问                       | 服务组件          |
| ----------------------- | ------------------------------------------ | ------------------------------ | ----------------- |
| 80/443                  | 全局负载均衡服务                           | 需要安全组放行                 | rbd-gateway       |
| 6060                    | Websocket 服务，提供日志、性能监控实时推送 | 需要安全组放行                 | rbd-api           |
| 7070                    | 应用控制台 web                             | 需要安全组放行                 | rbd-app-ui        |
| 8443                    | Rainbond API 服务                          | 需要安全组放行                 | rbd-api           |
| 30008                   | 集群安装运维控制台 web                     | 需要安全组放行，集群安装后关闭 | rainbond-operator |
| 10248/10250/10255/42645 | kubelet 服务                               |                                | kubelet           |
| 10251                   | kube-scheduler 服务                        |                                | kube-scheduler    |
| 6443/8080               | kube-apiserver 服务                        |                                | kube-apiserver    |
| 2379,2380,4001          | etcd 服务                                  |                                | etcd/etcd-proxy   |
| 10252/10257             | kube-controller 服务                       |                                | kube-controller   |
| 53                      | 集群内部 dns 服务                          |                                | rbd-dns           |
| 8089                    | 集群域名解析服务监听端口                   |                                | kube-dns          |
| 6362/6363/6365/6366     | 集群事件服务                               |                                | rbd-eventlog      |
| 8443                    | Rainbond API 服务                          |                                | rbd-api           |
| 6100/6101/6102/9125     | rbd-node 服务                              |                                | rainbond-node     |
| 10254/18080/18081       | 集群负载均衡监听端口                       |                                | rbd-gateway       |
| 10249/10256/30008       | kube-proxy 服务                            |                                | kube-proxy        |
| 10259                   | kube-scheduler 服务                        |                                | kube-scheduler    |
| 53                      | 集群内部 dns 服务                          |                                | rbd-dns           |
| 8089                    | 集群域名解析服务监听端口                   |                                | kube-dns          |
| 9999                    | 集群监控                                   |                                | rbd-monitor       |
| 3306                    | 集群数据库                                 |                                | rbd-db            |

- etcd 的 4001 为非安全端口，2379 为安全端口
- rainbond API 端口当只有一个数据中心时不需要对外开放，当多数据中心，且在不同网络时需要对外开放,8888 非安全端口,8443 为安全端口
- rbd-gateway 提供的 80 与 443 端口是为 HTTP 协议应用提供，10001~65535 是为 TCP 协议的应用提供。

更多具体端口信息请参考 [组件端口](../op-guide/required_ports)

#### 服务部署类型说明

| 部署类型                | 说明                                                                                                   | 组件名                                                              |
| ----------------------- | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| 二进制或者 deb/rpm 部署 | 通常使用 apt 或者 yum 方式安装,由 systemd 守护，详情查看 [easzlab](https://github.com/easzlab/kubeasz) | docker,kubelet                                                      |
| 容器化部署              | 在 kubernetes 中以 pod 方式运行                                                                        | 其他组件都是容器化部署，`Kubernetes` 和 `Rainbond-Operator`共同维护 |
