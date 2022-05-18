---
title: "平台组件架构"
description: 本文主要介绍完整部署Rainbond所需要的所有服务组件，帮助用户了解Rainbond技术栈与组件架构。
---

本文主要介绍完整部署Rainbond所需要的所有服务组件，帮助用户了解Rainbond技术栈与组件架构。

目前版本，系统组件生命周期由 `Kubernetes` 和 `Rainbond-Operator` 共同维护和管理。

Rainbond 由 Console(控制台) + Region(集群端) + Kubernetes(RKE) 组成。

## Console控制台组件概述

控制台部署目前分为三种：

1. Allinone 
2. 高可用控制台，部署在 Rainbond 中（基于应用商店安装）
3. Helm 部署，以POD运行在 Kubernetes 中。

## Region集群端组件概述

:::tip

Region集群端组件高级用法可以通过点击组件的链接方式阅读

:::

以下是通过一键部署方式将会在服务器安装的Rainbond各服务组件及其版本信息。

|组件|版本|说明|控制器类型|
|---|-----|---------------|---|
|[rainbond-operator](./rainbond-operator)|v2.3.0|维护rainbond组件的配置与运行状态|Deployment|
|[rbd-api](./rbd-api)|5.x|rainbond区域中心API服务，提供底层服务接口|Deployment|
|[rbd-chaos](./rbd-chaos)|5.x|应用构建服务，提供源码，Docker镜像等方式创建应用|Daemonset|
|[rbd-db](./rbd-db)|5.x|云帮数据库服务，支持MySQL`5.6``5.7``8.0`|Statefulset|
|[rbd-etcd](./etcd)|v3.3.18|`etcd`存储集群的元数据信息，集群状态和网络配置|Statefulset|
|[rbd-eventlog](./rbd-eventlog)|5.x|rainbond事件处理与日志汇聚服务|Statefulset|
|[rbd-gateway](./rbd-gateway)|5.x|通向应用的全局网关，提供A/B测试、灰度发布等高级功能|Daemonset|
|[rbd-hub](./rbd-hub)|v2.6.2|基于[Docker Registry](https://docs.docker.com/registry/)封装，提供docker镜像存储服务|Deployment|
|[rbd-mq](./rbd-mq)|5.x|消息队列服务|Deployment|
|[nfs-provisioner](./rbd-nfs)|v2.2.1|存储服务|Statefulset|
|[rbd-node](./rbd-node)|5.x|集群监控与控制，docker证书分发|Daemonset|
|[rbd-resource-proxy](./rbd-resource-proxy)|1.19|源码构建仓库服务|Deployment|
|[rbd-webcli](./rbd-webcli)|5.x|提供应用web方式进入容器命令行的服务|Deployment|
|[rbd-worker](./rbd-worker)|5.x|云帮应用操作与处理服务|Deployment|


## Kubernetes (RKE)
以下 Kubernetes 组件均是通过 RKE 安装，具体配置请参考 [RKE](https://docs.rancher.cn/rke/) 文档。

|组件|版本|说明|
|---|-----|---------------|
|kubelet|v1.19.6|是在每个 Node 节点上运行的主要节点代理|
|kube-apiserver|v1.19.6|为API对象验证和配置数据|
|kube-controller-manager|v1.19.6|Kubernetes集群内部的管理控制中心|
|kube-scheduler|v1.19.6|负责分配调度Pod到集群内的node节点|
|kube-proxy|v1.19.6|Kubernetes的网络代理，在每个node节点上运行|

## Docker

| 组件               | 版本    | 说明         |
| ------------------ | ------- | ------------ |
| [docker](./docker) | 19.03.5 | 应用容器引擎 |


## 组件端口说明

> 公网访问: 如部署在公有云环境需要公网访问需要安全组放行

|端口号|说明|公网访问|服务组件|
|--------|--------|------------|--------|
|80/443|全局负载均衡服务|需要安全组放行|rbd-gateway|
|6060|Websocket服务，提供日志、性能监控实时推送|需要安全组放行|rbd-api|
|7070|应用控制台web|需要安全组放行|rbd-app-ui|
|8443|Rainbond API服务|需要安全组放行|rbd-api|
|30008|集群安装运维控制台web|需要安全组放行，集群安装后关闭|rainbond-operator|
|10248/10250/10255/42645|kubelet服务||kubelet|
|10251|kube-scheduler服务||kube-scheduler|
|6443/8080|kube-apiserver服务||kube-apiserver|
|2379,2380,4001|etcd服务||etcd/etcd-proxy|
|10252/10257|kube-controller服务||kube-controller|
|53| 集群内部dns服务 ||rbd-dns|
|8089|集群域名解析服务监听端口||kube-dns|
|6362/6363/6365/6366|集群事件服务||rbd-eventlog|
|8443|Rainbond API服务||rbd-api|
|6100/6101/6102/9125|rbd-node服务||rainbond-node|
|10254/18080/18081|集群负载均衡监听端口||rbd-gateway|
|10249/10256/30008|kube-proxy服务||kube-proxy|
|10259|kube-scheduler服务||kube-scheduler|
|53| 集群内部dns服务 ||rbd-dns|
|8089|集群域名解析服务监听端口||kube-dns|
|9999|集群监控||rbd-monitor|
|3306|集群数据库||rbd-db|


- etcd的4001为非安全端口，2379为安全端口
- rainbond API端口当只有一个数据中心时不需要对外开放，当多数据中心，且在不同网络时需要对外开放,8888非安全端口,8443为安全端口
- rbd-gateway提供的80与443端口是为HTTP协议应用提供，10001~65535是为TCP协议的应用提供。

更多具体端口信息请参考 [组件端口](./required_ports)
