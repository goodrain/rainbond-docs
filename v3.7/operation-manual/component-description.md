---
title: 平台组件说明
summary: 平台组件说明
toc: true
---

本文主要介绍管理节点和计算节点服务的管理方式与服务的功能，同时也列出了管理节点服务的端口、集群DNS解析地址等内容。

## 一、管理节点服务详情

### 1.1 服务说明

以下是通过docker-compose管理的服务：

|服务名|说明|
|----------|---------------|
|rbd-dns|云帮内部dns服务，可作为集群dns服务使用|
|rbd-db|云帮数据库服务，支持MySQL，[Tidb](https://pingcap.com/docs-cn/)与[CockroachDB](https://www.cockroachlabs.com/)|
|rbd-mq|消息队列服务|
|rbd-hub|基于[Docker Registry](https://docs.docker.com/registry/)封装，提供docker镜像存储服务|
|rbb-repo|源码构建仓库服务，基于[Artifactory OSS](https://jfrog.com/open-source/)封装|
|rbd-eventlog|云帮事件处理与日志汇聚服务|
|rbd-worker|云帮应用操作与处理服务|
|rbd-webcli|提供应用web方式进入容器命令行的服务|
|rbd-entrance|负载均衡控制器，负责负载均衡规则与节点维护|
|rbd-chaos|应用构建服务，提供源码，Docker镜像等方式创建应用|
|rbd-monitor|云帮服务监控组件，基于[Prometheus](https://prometheus.io/)封装|
|rbd-api|云帮区域中心API服务，提供底层服务接口|
|rbd-app-ui|应用控制台web服务|
|rbd-lb|全局负载均衡，基于Openresty实现，[源码地址](https://github.com/goodrain/lb-openresty)|

{{site.data.alerts.callout_info}}
- docker-compose 配置文件默认在 `/opt/rainbond/compose目录中`
- 通过dc-compose命令可以维护这些服务，详情参见: [管理节点服务维护](platform-maintenance/management-node.html)
{{site.data.alerts.end}}

-------------

以下是通过systemd维护的服务

|服务名|版本|说明|
|-----------|-------|------------|
|dockerd|1.12.6|容器引擎服务 (rainbond定制开发)|
|kube-apiserver|1.6.4|kubernetes API服务，提供集群管理的 REST API 接口[官方文档](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-apiserver/) (rainbond定制开发)|
|kube-scheduler|1.6.4|负责分配调度 Pod 到集群内的节点上，详情参见：[官方文档](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-scheduler/) (rainbond定制开发)|
|kube-controller-manager|1.6.4|监控整个集群的状态，并确保集群处于预期的工作状态。[官方文档](https://kubernetes.io/docs/reference/command-line-tools-reference/kube-controller-manager/) (rainbond定制开发)|
|rbd-node|3.6|Rainbond集群监控与控制服务|
|etcd|3.2.13|Rainbond基础服务，kubernetes服务依赖的核心服务，存储配置信息与实现服务发现机制|
|calico-node|2.4.1|可选服务，Calico网络节点服务，负责维护容器内部网络与跨住进通讯。Rainbond单节点部署时，该服务运行，当分开部署计算节点时该服务可关闭。|

{{site.data.alerts.callout_info}}
- 以上服务都是通过[systemd](https://www.freedesktop.org/wiki/Software/systemd/)进行维护，详情参见：[管理节点服务维护](platform-maintenance/management-node.html)
- 除了 `dockerd` 与 `rbd-node` 服务，其余都是通过容器方式运行。
- 配置文件默认保存在 `/opt/rainbond`
- docker,kubernetes 组件与rainbond一起安装，并根据需要做了定制开发，不能替换其他版本。
{{site.data.alerts.end}}

### 1.2 服务端口说明

|端口号|说明|访问控制|
|--------|--------|------------|
|7070|应用控制台web|对外|
|6060|Websocket服务，提供日志、性能监控实时推送|对外|
|2379,4001|etcd服务|对内|
|8181,6443|kube-apiserver服务|对内|
|8888|Rainbond API服务|对内/对外|
|53| rbd-dns提供的集群内部dns服务|对内|
|80,443,20001~60000|rbd-lb 提供的全局负载均衡服务|对内/对外|

{{site.data.alerts.callout_info}}
- etcd的4001为非安全端口，2379为安全端口
- kube-apiserver的8181为非安全端口，6443为安全端口
- rainbond API端口当只有一个数据中心时不需要对外开放，当多数据中心，且在不同网络时需要对外开放
- rbd-lb提供的80与443端口是为HTTP协议应用提供，20001~60000是为TCP协议的应用提供。
{{site.data.alerts.end}}
- rbd-lb的虚IP功能目前处于测试阶段，后续会有相关文档详细说明。

### 1.3 DNS服务说明
rbd-dns服务，除提供平台用户应用的域名解析之外，还提供内部组件互相访问的域名解析。

|域名|说明|
|----------|-------------|
|goodrain.me|rainbond内部docker镜像仓库地址，rbd-hub提供服务|
|kubeapi.goodrain.me|kube-apisever服务|
|lang.goodrain.me|源码构建依赖包下载地址，rbd-repo提供服务|
|maven.goodrain.me|maven仓库地址，rbd-repo提供服务|


## 二、计算节点组件及服务详情

| 服务名| 说明|
|------------|--------------|
| dockerd| 容器引擎服务|
| kubelet| 接收并执行 kube-apiserver 发来的指令，管理 Pod 及 Pod 中的容器，[官方文档](https://kubernetes.io/docs/reference/command-line-tools-reference/kubelet/)|
|rbd-node|Rainbond集群监控与控制服务|
|etcd-proxy|管理节点etcd服务的代理|
|calico-node|Calico网络节点服务，负责维护容器内部网络与跨住进通讯|
