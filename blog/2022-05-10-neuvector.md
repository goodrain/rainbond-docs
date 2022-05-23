---
title: Rainbond结合 NeuVector 实践容器安全管理
description: Rainbond结合 NeuVector 实践容器安全管理
slug: neuvector
# authors: QiZhang
---

:::info
本文主要表述，基于 Rainbond 安装部署 NeuVector 容器安全平台的步骤，以及配合 Rainbond 实现生产环境中的最佳实践。
:::

<!--truncate-->

## 前言

Rainbond 是一个云原生应用管理平台，使用简单，不需要懂容器、Kubernetes和底层复杂技术，支持管理多个Kubernetes集群，和管理企业应用全生命周期。但是随着云原生时代的一点点进步，层出不穷的网络容器安全事件的出现，也是让大家对于容器安全，网络安全的重要性，有了更进一步的想法，Rainbond 为了保证用户在使用的过程中不出现类似的容器安全事件，特别适配整合了 NeuVector。

NeuVector 是业界首个端到端的开源容器安全平台，为容器化工作负载提供企业级零信任安全的解决方案。NeuVector 可以提供实时深入的容器网络可视化、东西向容器网络监控、主动隔离和保护、容器主机安全以及容器内部安全，容器管理平台无缝集成并且实现应用级容器安全的自动化，适用于各种云环境、跨云或者本地部署等容器生产环境。

本文主要表述，基于 Rainbond 安装部署 NeuVector 容器安全平台的步骤，以及配合 Rainbond 实现生产环境中的最佳实践。

## 部署 NeuVector

NeuVector 有多种部署安装形式，为了更加简化安装，选用 helm 的形式进行安装，Rainbond 也是支持 helm 商店的形式，只需要在应用市场，添加一个新的商店，把 helm商店的URL 填写上即可。

### 准备工作

**创建团队**

NeuVector  通常是安装在 neuvector 命名空间里面的，而在 Rainbond ，团队的概念则是对应 kubernetes 里命名空间，所以通过 helm 安装的时候，首先需要创建出来对应的团队，团队的英文名对应的则是该团队在集群中的命名空间，此处填写 neuvector，选择对应集群即可。

<img src="https://static.goodrain.com/wechat/neuvector/1.png" width="70%;" />



**对接 helm 商店**

Rainbond支持基于helm直接部署应用，所以接下来对接 neuvector 官方helm仓库，后续基于Helm商店部署 neuvector 即可， 在应用市场页面，点击添加商店，选择helm商店，输入相关信息即可完成对接。

helm 商店地址：https://neuvector.github.io/neuvector-helm/

![](https://static.goodrain.com/wechat/neuvector/2.png)

### 安装

在 helm 仓库找到 core 点击安装到 neuvector 团队里即可

![](https://static.goodrain.com/wechat/neuvector/3.png)

修改默认的 key 以及 value 

![](https://static.goodrain.com/wechat/neuvector/4.png)

values 配置项：

| 键                           | 值                           |
| ---------------------------- | ---------------------------- |
| registry                     | docker.io                    |
| tag                          | 5.0.0-preview.1              |
| controller.image.repository  | neuvector/controller.preview |
| enforcer.image.repository    | neuvector/enforcer.preview   |
| manager.image.repository     | neuvector/manager.preview    |
| cve.scanner.image.repository | neuvector/scanner.preview    |
| cve.updater.image.repository | neuvector/updater.preview    |
| manager.svc.type             | ClusterIP                    |

安装完成以后，确认 pod 的状态为 Running 

<img src="https://static.goodrain.com/wechat/neuvector/5.png" />

neuvector 提供了可视化操作的界面，安装过程将自动创建Service，通过Rainbond平台第三方组件的形式可将 neuvector  的访问端口暴露出来。

<img src="https://static.goodrain.com/wechat/neuvector/6.png" />

以下为需要进行配置的选项

| 组件名称     | neuvector-web           |
| ------------ | ----------------------- |
| 组件英文名称 | neuvector               |
| 组件注册方式 | kubernetes              |
| Namespace    | neuvector               |
| Service      | neuvector-service-webui |

添加完成以后，需要添加并打开对外访问的端口（8443），默认用户名以及密码均为 `admin/admin`

![](https://static.goodrain.com/wechat/neuvector/7.png)

注意：访问的时候，需要通过 https 的形式进行访问，至此 neuvector  安装完毕

<img src="https://static.goodrain.com/wechat/neuvector/8.png" />



## NeuVector 最佳实践

### 网络流量监视治理

NeuVector 提供的网络活动，可以清楚的查看每一个 pod 之间的网络流量动向。以及对应的端口，规则，更加清晰明了的查看走向。

蓝色线代表正常的流向是记录在学习模式里的。

黄色的流向则是记录在监视模式下，需要我们手动进行审阅规则，决定是否通过这个流量。

红色则代表是记录在保护模式下，被拒绝的动向，也可通过规则进行避免。

![](https://static.goodrain.com/wechat/neuvector/9.png)



### 学习模式，监视模式，保护模式的使用

NeuVector 的组支持 3 种模式：学习模式、监控模式和保护模式；各个模式实现作用如下：

**学习模式**

学习和记录容器、主机间网络连接情况和进程执行信息。

自动构建网络规则白名单，保护应用网络正常行为。

为每个服务的容器中运行的进程设定安全基线，并创建进程配置文件规则白名单。

**监控模式**

NeuVector 监视容器和主机的网络和进程运行情况，遇到非学习模式下记录的行为将在 NeuVector 安全事件中进行告警。

**保护模式**

NeuVector 监视容器和主机的网络和进程运行情况，遇到非学习模式下记录的行为直接拒绝。

针对于以上三种模式，可以总结出来适于生产环境的最佳实践，当新的业务准备上线的时候，可以先默认是学习模式，经过一段时间的学习，记录容器的以及主机的规则，然后转换成监控模式，运行一段时间，监控是否有特殊的网络流量以及主机进程，帮助我们把特殊的网络动向记录下来，并进行告警确认是否放行，最后转换成监控模式，避免一些恶意的操作对我们的环境造成不必要的危险。



### 基于集群的镜像仓库做漏洞检查

kubernetes 集群部署业务的最小单元是 pod 但是pod 的组成部分最重要的其实是镜像， NeuVector 也是可以基于镜像进行漏洞检查，避免在镜像被注入特殊的漏洞机制

对接 Rainbond 时，在不使用外部的镜像仓库的情况下，Rainbond 会提供一个默认的用于存储镜像的仓库 goodrain.me ，它是用来存储通过 Rainbond 构建的所有业务的镜像，所以通过检查里面的镜像，可以清楚的看出业务所依赖的镜像都存在那些漏洞，已避免因为镜像漏洞问题所造成的影响。

如果在对接 Rainbond 时使用了外部的镜像仓库，且域名可以被解析到的情况，可以直接填写域名即可，因为 goodrain.me 本身是不能被 NeuVector 解析的，所以需要通过集群的 coredns 手动添加对应的解析，来确保 NeuVector 可以连接上。

编辑coredns

```shell
kubectl edit cm coredns -n kube-system  
```

<img src="https://static.goodrain.com/wechat/neuvector/10.png" width="70%;" />

获取 goodrain.me 解析的 IP

```shell
kubectl get rainbondcluster -n rbd-system -oyaml | egrep -v [A-Za-z{}]
```

在指定位置添加以下内容，注意修改 IP

```shell
hosts {
  192.168.0.1 goodrain.me
  fallthrough
}
```

在 NeuVector  web界面左侧选择 资产 >  镜像库 添加仓库

![](https://static.goodrain.com/wechat/neuvector/11.png)

goodrain.me 默认用户为 admin，密码通过以下命令获取

```shell
 kubectl get rainbondcluster -n rbd-system -oyaml | grep password | sed "1d"
```

镜像扫描结束以后，镜像的信息会在下面进行呈现，点击想要查看的镜像名称，即可查看详细信息，以下供参考

![](https://static.goodrain.com/wechat/neuvector/12.png)

## 写在最后

通过本文，希望大家可以基于 Rainbond 成功把 NeuVector 容器安全平台部署起来，并且可以根据最佳实践，做好相对应的操作，当然NeuVector 的功能远远不止于此，还是需要大家不断的探索，不断的实践。

