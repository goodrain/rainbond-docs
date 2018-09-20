---
title: 五节点高可用部署方案
summary: 介绍五节点的高可用部署方案，达到第三级高可用
toc: true
toc_not_nested: true
asciicast: true
---

<div class="filters filters-big clearfix">
    <a href="five-nodes-deployment.html"><button class="filter-button current"><strong>方案概述</strong></button></a>
    <a href="deploy-five-nodes.html"><button class="filter-button">操作流程</button></a>
</div>

<div id="toc"></div>

##一、高可用分级

我们以用户应用不受影响为标准，将云帮的高可用分为三个等级：

- **第一级**： 随机计算节点宕机，用户的应用不受影响，或只受到一小段时间的影响。
- **第二级**： 管理节点全部宕机，用户的应用不受影响。
- **第三级**： 云帮平台各组件自身实现高可用。

## 二、设计初衷

- 生产级别的高可用要求平台本身也支持高可用。
- 为了了解云帮平台更精确的高可用特性；以客户的实际生产需要为出发点，我们设计了此方案，用合适数量的节点，部署出符合 **第三级** 高可用等级的Rainbond平台。
- 此架构的设计已经面向了实际生产场景。

## 三、高可用升级思路

相较[三节点高可用部署方案](three-nodes-deployment.html)，当前方案有了如下升级：

- 管理节点分布式部署，同时满足了kubernetes、ETCD的集群化部署。
- 利用rbd-lb组件，实现平台控制台和api对外提供服务时的负载均衡。
- 平台数据库，即rbd-db组件通过[CockroachDB](http://www.cockroachdb.cn/)分布式数据库实现。

##四、服务层级的划分

Rainbond所依赖的服务，按照其功能可以做出如下的划分：

|    层级    |                    服务                     |
| :--------: | :-----------------------------------------: |
| 负载均衡层 |          rbd-lb、calico（midonet）          |
|   管理层   |     Rainbond管理组件、etcd集群、k8s集群     |
|   计算层   | docker、kubelet、calico（midonet）、rbd-dns |
|   存储层   |       glusterfs（NAS、其它共享存储）        |

- 各层之间可以相互复用，当前架构复用了负载均衡层、计算层、存储层。
- 各层背后对应的服务，可以有其它选择来代替。
  - 负载均衡层与计算层所使用的网络组件，默认安装calico，也可以使用midonet代替；
  - 如果是在阿里云上部署的Rainbond，可以直接使用阿里云官方提供的SLB负载均衡直接对接Rainbond；
  - 如果是在阿里云上部署的Rainbond，可以使用阿里云官方的NAS存储，代替glusterfs。

## 五、架构图

<img src="https://static.goodrain.com/images/docs/3.7/operation-manual/5newHAdeploy.png" width="100%"/>

## 六、架构优缺点

- **优势**：管理节点部署了3节点的集群，满足了Rainbond自身的高可用。
- **劣势**：受限于docker化的分布式数据库Cockroachdb并不稳定，当前部署方案需要内测一段时间。
- **适用人群**：对于Rainbond有了深入了解，想要探究其生产性的高可用的客户群体。
- **适用场景**：POC测试、小规模生产环境。
