---
title: "平台组件架构"
date: 2020-02-17T15:15:54+08:00
draft: false
weight: 801
---

本文主要介绍完整部署Rainbond所需要的所有服务组件，帮助用户了解Rainbond技术栈与组件架构。

目前版本，系统组件生命周期由`Kubernetes`和`Rainbond-Operator`共同维护和管理。

### 一、服务组件概述

#### 以下是通过一键部署方式将会在服务器安装的Rainbond各服务组件及其版本信息。

|组件|版本|说明|
|---|-----|---------------|
|[rainbond-operator](/docs/user-operations/component/rainbond-operator/)|v0.01|维护rainbond组件的配置与运行状态|
|[rbd-api](/docs/user-operations/component/rbd-api/)|5.x|rainbond区域中心API服务，提供底层服务接口|
|[rbd-app-ui](/docs/user-operations/component/rbd-app-ui/)|5.x|应用控制台web服务|
|[rbd-chaos](/docs/user-operations/component/rbd-chaos/)|5.x|应用构建服务，提供源码，Docker镜像等方式创建应用|
|[rbd-db](/docs/user-operations/component/rbd-db/)|5.x|云帮数据库服务，支持MySQL`5.6``5.7``8.0`|
|[rbd-dns](/docs/user-operations/component/rbd-dns/)|5.x|rainbond内部dns服务，可作为集群dns服务使用|
|[etcd](/docs/user-operations/component/etcd/)|v3.3.18|`etcd`存储集群的元数据信息，集群状态和网络配置|
|[rbd-eventlog](/docs/user-operations/component/rbd-eventlog/)|5.x|rainbond事件处理与日志汇聚服务|
|[rbd-gateway](/docs/user-operations/component/rbd-gateway/)|5.x|通向应用的全局网关，提供A/B测试、灰度发布等高级功能|
|[rbd-hub](/docs/user-operations/component/rbd-hub/)|v2.6.2|基于[Docker Registry](https://docs.docker.com/registry/)封装，提供docker镜像存储服务|
|[rbd-mq](/docs/user-operations/component/rbd-mq/)|5.x|消息队列服务|
|[rbd-nfs](/docs/user-operations/component/rbd-mq/)|v2.2.1|存储服务|
|[rbd-node](/docs/user-operations/component/rbd-node/)|5.x|集群监控与控制，docker证书分发|
|[rbd-repo](/docs/user-operations/component/rbd-repo/)|v6.16.0|源码构建仓库服务，基于[Artifactory OSS](https://jfrog.com/open-source/)封装|
|[rbd-webcli](/docs/user-operations/component/rbd-webcli/)|5.x|提供应用web方式进入容器命令行的服务|
|[rbd-worker](/docs/user-operations/component/rbd-worker/)|5.x|云帮应用操作与处理服务|


#### 以下是通过rainbond官方推荐的 [easzup](https://github.com/easzlab) 快速部署Kubernetes安装的各组件及版本信息

|组件|版本|说明|
|---|-----|---------------|
|[docker](/docs/user-operations/component/docker/)|v18.09|应用容器引擎|
|[kubelet](/docs/user-operations/component/kubelet/)|v1.16.2|是在每个 Node 节点上运行的主要节点代理|
|[kube-apiserver](/docs/user-operations/component/kube-apiserver/)|v1.16.2|为API对象验证和配置数据|
|[kube-controller-manager](/docs/user-operations/component/kube-controller-manager/)|v1.16.2|Kubernetes集群内部的管理控制中心|
|[kube-scheduler](/docs/user-operations/component/kube-scheduler/)|v1.16.2|负责分配调度Pod到集群内的node节点|
|[kube-proxy](/docs/user-operations/component/kube-proxy/)|v1.16.2|Kubernetes的网络代理，在每个node节点上运行|
|[coredns](/docs/user-operations/component/coredns/)|v1.6.2|为Kubernetes集群中的其他 pods 提供域名解析服务|
|[kube-flannel](/docs/user-operations/component/kube-flannel/)|v0.11.0|Flannel是最早应用到k8s集群的网络插件之一|
|[metrics-server](/docs/user-operations/component/metrics-server/)|v0.3.6|Kubernetes 的监控组件，从`Kubelet `公开的`Summary API`采集指标信息|


**组件高级用法可以通过点击组件的链接方式阅读。**


### 二、逻辑架构图


<center><img src="https://static.goodrain.com/images/docs/5.0/operation-manual/deploy-logic.png" style="border:1px solid #eee;width:80%"/></center>


### 三、附录

#### 3.1 服务组件端口说明

> 公网访问: 如部署在公有云环境需要公网访问需要安全组放行

|端口号|说明|公网访问|服务组件|
|--------|--------|------------|--------|
|80/443|全局负载均衡服务|需要安全组放行|rbd-gateway|
|6060|Websocket服务，提供日志、性能监控实时推送|需要安全组放行|rbd-api|
|7070|应用控制台web|需要安全组放行|rbd-app-ui|
|8443|Rainbond API服务|需要安全组放行|rbd-api|
|30008|集群安装运维控制台web|需要安全组放行|rainbond-operator|
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

更多具体端口信息请参考[组件端口](/docs/user-operations/op-guide/required_ports/)

#### 3.2 服务部署类型说明

|部署类型|说明|组件名|
|--------|------------|------------|
|二进制或者deb/rpm部署|通常使用apt或者yum方式安装,由systemd守护，详情查看[easzlab](https://github.com/easzlab/kubeasz)|docker,kubelet|
|容器化部署|在kubernetes中以pod方式运行|其他组件都是容器化部署，`Kubernetes`和`Rainbond-Operator`共同维护|
