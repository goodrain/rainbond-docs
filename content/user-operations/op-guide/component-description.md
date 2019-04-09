---
title: "平台组件架构"
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 801
---

本文主要介绍完整部署Rainbond所需要的所有服务组件，帮助用户了解Rainbond技术栈与组件架构。

目前版本，所有服务都通过[Systemd](https://baike.baidu.com/item/systemd/18473007)进行管理。

### 一、服务组件概述

|组件|版本|说明|
|-----------|-------|------------|
|Docker|18.06|容器引擎服务，支持社区版|
|Kubernetes|v1.10.13|容器的编排和管理，支持社区版|
|Rainbond|5.1.0|Rainbond组件 [源码](https://github.com/goodrain/rainbond)|
|etcd/etcd-proxy|3.2.25|存储配置信息与实现服务发现机制|
|Calico|v3.3.1|网络服务，负责维护容器内部网络与跨主机通讯|

以下是通过一键部署方式将会在服务器安装的Rainbond各服务组件及其版本信息。

|组件|版本|安装属性|说明|
|---|-----|-----|---------------|
|docker|18.06|Master/Worker|应用容器引擎|
|[node](/user-operations/component/node/)|5.x|Master/Worker|集群监控与控制服务|
|[kubelet](/user-operations/component/kubelet/)|v1.10.13|Master/Worker|管理节点默认仅manage01节点启用|
|kube-controller-manager|v1.10.13|Master||
|kube-apiserver|v1.10.13|Master||
|kube-scheduler|v1.10.13|Master||
|[etcd](/user-operations/component/etcd/)|3.2.25|Master||
|[etcd-proxy](/user-operations/component/etcd/)|3.2.25|worker|管理节点etcd服务的代理|
|[calico](/user-operations/component/calico/)|v3.3.1|Master/Worker|集群SDN服务，为应用提供网络支持|
|[rbd-dns](/user-operations/component/rbd-dns/)|5.x|Master|Rainbond内部dns服务，可作为集群dns服务使用 [源码](https://github.com/goodrain/dns)|
|[rbd-db](/user-operations/component/rbd-db/)|5.x|Master|云帮数据库服务，支持MySQL，[Tidb](https://pingcap.com/docs-cn/)与[CockroachDB](https://www.cockroachlabs.com/)|
|[rbd-mq](/user-operations/component/rbd-mq/)|5.x|Master|消息队列服务|
|[rbd-hub](/user-operations/component/rbd-hub/)|2.6.2|Master|基于[Docker Registry](https://docs.docker.com/registry/)封装，提供docker镜像存储服务|
|[rbd-repo](/user-operations/component/rbd-repo/)|6.5.9|Master|源码构建仓库服务，基于[Artifactory OSS](https://jfrog.com/open-source/)封装|
|[rbd-eventlog](/user-operations/component/rbd-eventlog/)|5.x|Master|云帮事件处理与日志汇聚服务|
|[rbd-worker](/user-operations/component/rbd-worker/)|5.x|Master|云帮应用操作与处理服务|
|[rbd-webcli](/user-operations/component/rbd-webcli/)|5.x|Master|提供应用web方式进入容器命令行的服务|
|[rbd-chaos](/user-operations/component/rbd-chaos/)|5.x|Master|应用构建服务，提供源码，Docker镜像等方式创建应用|
|[rbd-monitor](/user-operations/component/rbd-monitor/)|5.x|Master|云帮服务监控组件，基于[Prometheus](https://prometheus.io/)封装|
|[rbd-api](/user-operations/component/rbd-api/)|5.x|Master|云帮区域中心API服务，提供底层服务接口|
|[rbd-app-ui](/user-operations/component/rbd-app-ui/)|5.x|Master|应用控制台web服务|
|[rbd-gateway](/user-operations/component/rbd-gateway/)|5.x|Master/Lb|通向应用的全局网关，提供A/B测试、灰度发布等高级功能|

### 二、逻辑架构图

<a href="https://static.goodrain.com/images/docs/5.0/operation-manual/deploy-logic.png" target="_blank"><img src="https://static.goodrain.com/images/docs/5.0/operation-manual/deploy-logic.png" width="100%"  /></a>

### 三、附录

#### 3.1 DNS服务说明

rbd-dns服务，除提供平台用户应用的域名解析之外，还提供内部组件互相访问的域名解析。

|域名|说明|
|----------|-------------|
|goodrain.me|rainbond内部docker镜像仓库地址，rbd-hub提供服务|
|kubeapi.goodrain.me|kube-apisever服务|
|region.goodrain.me|数据中心API服务|
|lang.goodrain.me|源码构建依赖包下载地址，rbd-repo提供服务|
|maven.goodrain.me|maven仓库地址，rbd-repo提供服务|
|repo.goodrain.me|本地软件源,rbd-gateway提供服务,仅离线环境|

#### 3.2 部分服务端口说明

> 公网访问: 如部署在公有云环境需要公网访问需要安全组放行

|端口号|说明|公网访问|
|--------|--------|------------|
|7070|应用控制台web|需要安全组放行|
|6060|Websocket服务，提供日志、性能监控实时推送|需要安全组放行|
|2379,2380,4001|etcd服务||
|8181,6443|kube-apiserver服务||
|8443,8888|Rainbond API服务||
|53| rbd-dns提供的集群内部dns服务||
|80,443|rbd-gateway 提供的全局负载均衡服务|需要安全组放行|

{{% notice info %}}
- etcd的4001为非安全端口，2379为安全端口
- kube-apiserver的8181为非安全端口，6442为安全端口, 6443为gateway代理端口
- rainbond API端口当只有一个数据中心时不需要对外开放，当多数据中心，且在不同网络时需要对外开放,8888非安全端口,8443为安全端口
- rbd-gateway提供的80与443端口是为HTTP协议应用提供，20001~60000是为TCP协议的应用提供。
{{% /notice %}}

更多具体端口信息请参考[组件端口](/user-operations/op-guide/required_ports/)

#### 3.3 服务部署类型说明

|部署类型|说明|组件名|
|--------|------------|------------|
|二进制或者deb/rpm部署|通常使用apt或者yum方式安装,由systemd守护|node,docker,kubelet|
|容器化部署|通过docker run方式部署,由node生成systemd进行守护|其他组件都是容器化部署|
