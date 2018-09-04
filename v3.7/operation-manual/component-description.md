---
title: 平台组件说明
summary: 平台组件说明
toc: true
---

本文主要介绍管理节点和计算节点服务的管理方式与服务的功能，同时也列出了管理节点服务的端口、集群DNS解析地址等内容。


从3.7版本开始，所有服务都通过[Systemd](https://zh.wikipedia.org/wiki/Systemd)进行管理。

## 一、组件概述

|组件|版本|说明|
|-----------|-------|------------|
|Docker|1.12.6|容器引擎服务(定制开发) [源码](https://github.com/goodrain/moby)|
|Kubernetes|1.6.4|容器的编排和管理(定制开发) [源码](https://github.com/goodrain/kubernetes)|
|Rainbond|3.7.1|Rainbond组件 [源码](https://github.com/goodrain/rainbond)|
|etcd/etcd-proxy|3.2.13|存储配置信息与实现服务发现机制|
|Calico|2.4.1|网络服务，负责维护容器内部网络与跨主机通讯|

## 二、组件列表

目前Rainbond节点属性主要分为3种类型:

```bash
Master节点(管理节点)
Worker节点(计算节点)
Storage节点(存储节点)
```

默认所有节点都会安装docker,node,kubernetes(计算节点仅安装kubelet),calico,etcd(计算节点安装etcd-proxy)

以下是通过一键部署方式将会在服务器安装的Rainbond各服务组件及其版本信息。

|组件|版本|安装属性|说明|
|---|-----|-----|---------------|
|docker|1.12.6|Master/Worker|应用容器引擎|
|node|3.7.1|Master/Worker|集群监控与控制服务|
|kubelet|1.6.4|Master/Worker|管理节点默认仅manage01节点启用|
|kube-controller-manager|1.6.4|Master||
|kube-apiserver|1.6.4|Master||
|kube-scheduler|1.6.4|Master||
|etcd|3.2.13|Master||
|etcd-proxy|3.2.13|worker|管理节点etcd服务的代理|
|rbd-dns|3.7|Master|Rainbond内部dns服务，可作为集群dns服务使用 [源码](https://github.com/goodrain/dns)|
|rbd-db|3.7|Master|云帮数据库服务，支持MySQL，[Tidb](https://pingcap.com/docs-cn/)与[CockroachDB](https://www.cockroachlabs.com/)|
|rbd-mq|3.7.1|Master|消息队列服务|
|rbd-hub|3.7|Master|基于[Docker Registry](https://docs.docker.com/registry/)封装，提供docker镜像存储服务|
|rbb-repo|3.7|Master|源码构建仓库服务，基于[Artifactory OSS](https://jfrog.com/open-source/)封装|
|rbd-eventlog|3.7.1|Master|云帮事件处理与日志汇聚服务|
|rbd-worker|3.7.1|Master|云帮应用操作与处理服务|
|rbd-webcli|3.7.1|Master|提供应用web方式进入容器命令行的服务|
|rbd-entrance|3.7.1|Master|负载均衡控制器，负责负载均衡规则与节点维护|
|rbd-chaos|3.7.1|Master|应用构建服务，提供源码，Docker镜像等方式创建应用|
|rbd-monitor|3.7.1|Master|云帮服务监控组件，基于[Prometheus](https://prometheus.io/)封装|
|rbd-api|3.7.1|Master|云帮区域中心API服务，提供底层服务接口|
|rbd-app-ui|3.7.1|Master|应用控制台web服务|
|rbd-lb|3.7|Master/Worker|全局负载均衡，基于Openresty实现，[源码](https://github.com/goodrain/lb-openresty)|


## 三、附录

### 3.1 DNS服务说明

rbd-dns服务，除提供平台用户应用的域名解析之外，还提供内部组件互相访问的域名解析。

|域名|说明|
|----------|-------------|
|goodrain.me|rainbond内部docker镜像仓库地址，rbd-hub提供服务|
|kubeapi.goodrain.me|kube-apisever服务|
|lang.goodrain.me|源码构建依赖包下载地址，rbd-repo提供服务|
|maven.goodrain.me|maven仓库地址，rbd-repo提供服务|
|repo.goodrain.me|本地软件源,rbd-lb提供服务,仅离线环境|

### 3.2 部分服务端口说明

|端口号|说明|访问控制|
|--------|--------|------------|
|7070|应用控制台web|对外|
|6060|Websocket服务，提供日志、性能监控实时推送|对外|
|2379,4001|etcd服务|对内|
|8181,6443|kube-apiserver服务|对内|
|8443,8888|Rainbond API服务|对内/对外|
|53| rbd-dns提供的集群内部dns服务|对内|
|80,443,20001~60000|rbd-lb 提供的全局负载均衡服务|对内/对外|

{{site.data.alerts.callout_info}}
- etcd的4001为非安全端口，2379为安全端口
- kube-apiserver的8181为非安全端口，6443为安全端口
- rainbond API端口当只有一个数据中心时不需要对外开放，当多数据中心，且在不同网络时需要对外开放,8888非安全端口,8443为安全端口
- rbd-lb提供的80与443端口是为HTTP协议应用提供，20001~60000是为TCP协议的应用提供。
{{site.data.alerts.end}}