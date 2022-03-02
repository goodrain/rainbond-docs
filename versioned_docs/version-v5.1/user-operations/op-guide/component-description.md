---
title: "平台组件架构"
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 801
---

本文主要介绍完整部署Rainbond所需要的所有服务组件，帮助用户了解Rainbond技术栈与组件架构。

目前版本，所有服务都通过[Systemd](https://baike.baidu.com/item/systemd/18473007)进行管理。

### 一、服务组件概述

以下是通过一键部署方式将会在服务器安装的Rainbond各服务组件及其版本信息。

|组件|版本|安装属性|说明|
|---|-----|-----|---------------|
|[docker](/docs/user-operations/component/docker/)|18.06|manage/compute|应用容器引擎|
|[node](/docs/user-operations/component/node/)|5.x|manage/compute|集群监控与控制服务|
|[kube-apiserver/kube-controller-manager/kube-scheduler](/docs/user-operations/component/k8s/)|v1.10.13|manage|应用编排和管理|
|[kubelet](/docs/user-operations/component/kubelet/)|v1.10.13|manage/compute|节点复用时仅第一个管理节点启用|
|[etcd/etcd-proxy](/docs/user-operations/component/etcd/)|3.2.25|manage/compute|管理节点etcd/计算节点etcd-proxy|
|[calico](/docs/user-operations/component/calico/)|v3.3.1|manage/compute|集群SDN服务，为应用提供网络支持|
|[rbd-dns](/docs/user-operations/component/rbd-dns/)|5.x|manage|compute内部dns服务，可作为集群dns服务使用 [源码](https://github.com/goodrain/dns)|
|[rbd-db](/docs/user-operations/component/rbd-db/)|5.x|manage|云帮数据库服务，支持MySQL，[Tidb](https://pingcap.com/docs-cn/)与[CockroachDB](https://www.cockroachlabs.com/)|
|[rbd-mq](/docs/user-operations/component/rbd-mq/)|5.x|manage|消息队列服务|
|[rbd-hub](/docs/user-operations/component/rbd-hub/)|2.6.2|manage|基于[Docker Registry](https://docs.docker.com/registry/)封装，提供docker镜像存储服务|
|[rbd-repo](/docs/user-operations/component/rbd-repo/)|6.5.9|manage|源码构建仓库服务，基于[Artifactory OSS](https://jfrog.com/open-source/)封装|
|[rbd-eventlog](/docs/user-operations/component/rbd-eventlog/)|5.x|manage|云帮事件处理与日志汇聚服务|
|[rbd-worker](/docs/user-operations/component/rbd-worker/)|5.x|manage|云帮应用操作与处理服务|
|[rbd-webcli](/docs/user-operations/component/rbd-webcli/)|5.x|manage|提供应用web方式进入容器命令行的服务|
|[rbd-chaos](/docs/user-operations/component/rbd-chaos/)|5.x|manage|应用构建服务，提供源码，Docker镜像等方式创建应用|
|[rbd-monitor](/docs/user-operations/component/rbd-monitor/)|5.x|manage|云帮服务监控组件，基于[Prometheus](https://prometheus.io/)封装|
|[rbd-api](/docs/user-operations/component/rbd-api/)|5.x|manage|云帮区域中心API服务，提供底层服务接口|
|[rbd-app-ui](/docs/user-operations/component/rbd-app-ui/)|5.x|manage|应用控制台web服务|
|[rbd-gateway](/docs/user-operations/component/rbd-gateway/)|5.x|manage/gateway|通向应用的全局网关，提供A/B测试、灰度发布等高级功能|

组件高级用法可以通过点击组件的链接方式阅读。


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

#### 3.2 服务组件端口说明

> 公网访问: 如部署在公有云环境需要公网访问需要安全组放行

|端口号|说明|公网访问|服务组件|
|--------|--------|------------|--------|
|7070|应用控制台web|需要安全组放行|rbd-app-ui|
|6060|Websocket服务，提供日志、性能监控实时推送|需要安全组放行|rbd-api|
|2379,2380,4001|etcd服务||etcd/etcd-proxy|
|8181,6442|kube-apiserver服务||kube-apiserver|
|8443,8888|Rainbond API服务||rbd-api|
|53| 集群内部dns服务 ||rbd-dns|
|80,443|全局负载均衡服务|需要安全组放行|rbd-gateway|
|6363,6365,6366,6362|集群事件服务||rbd-eventlog|
|6535,6369|集群操作k8s的组件||rbd-worker|
|3228|服务构建组件||rbd-chaos|
|6300,6301|集群消息队列||rbd-mq|
|3329,9999|集群监控||rbd-montior|
|7171|容器命令行界面入口||rbd-webcli|
|10254|集群负载均衡监听端口||rbd-gateway|
|8089|集群域名解析服务监听端口||rbd-dns|
|10251|kube-scheduler服务||kube-scheduler|
|10252|kube-controller服务||kube-controller|
|3306|集群数据库||rbd-db|
|10250|kubelet服务||10250|


- etcd的4001为非安全端口，2379为安全端口
- kube-apiserver的8181为非安全端口，6442为安全端口, 6443为gateway代理端口
- rainbond API端口当只有一个数据中心时不需要对外开放，当多数据中心，且在不同网络时需要对外开放,8888非安全端口,8443为安全端口
- rbd-gateway提供的80与443端口是为HTTP协议应用提供，10001~65535是为TCP协议的应用提供。


更多具体端口信息请参考[组件端口](/docs/user-operations/op-guide/required_ports/)

#### 3.3 服务部署类型说明

|部署类型|说明|组件名|
|--------|------------|------------|
|二进制或者deb/rpm部署|通常使用apt或者yum方式安装,由systemd守护|node,docker,kubelet|
|容器化部署|通过docker run方式部署,由node生成systemd进行守护|其他组件都是容器化部署|
