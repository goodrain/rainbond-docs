---
title: 三节点高可用部署方案
summary: 介绍三节点的高可用部署方案，达到第二级高可用
toc: true
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

##一、高可用分级

我们以用户应用不受影响为标准，将云帮的高可用分为三个等级：

- **第一级**： 随机计算节点宕机，用户的应用不受影响，或只受到一小段时间的影响。
- **第二级**： 管理节点全部宕机，用户的应用不受影响。
- **第三级**： 云帮平台各组件自身实现高可用。

## 二、设计初衷

- 产品用于生产实际的一个重要前提是满足高可用性。[单机部署方案](one-node-deployment.html)显然不能够满足需求。
- 为了了解云帮平台更精确的高可用特性；以更实际、也更利于理解的方式让用户了解云帮平台的高可用。我们设计了此方案，用最少的节点，部署出符合 **第二级** 高可用等级的Rainbond平台。
- 然而在实际生产情景下，依然强烈推荐搭建管理节点高可用集群。当前文章所提出的架构，更多面向的是测试场景。

##三、服务层级的划分

Rainbond所依赖的服务，按照其功能可以做出如下的划分：

|    层级    |                    服务                     |
| :--------: | :-----------------------------------------: |
| 负载均衡层 |          rbd-lb、calico（midonet）          |
|   管理层   |     Rainbond管理组件、etcd集群、k8s集群     |
|   计算层   | docker、kubelet、calico（midonet）、rbd-dns |
|   存储层   |       glusterfs（NAS、其它共享存储）        |

- 各层之间可以相互复用。
- 各层背后对应的服务，可以有其它选择来代替。
  - 负载均衡层与计算层所使用的网络组件，默认安装calico，也可以使用midonet代替；
  - 如果是在阿里云上部署的Rainbond，可以直接使用阿里云官方提供的SLB负载均衡直接对接Rainbond；
  - 如果是在阿里云上部署的Rainbond，可以使用阿里云官方的NAS存储，代替glusterfs。

## 四、部署结构图

<img src="https://static.goodrain.com/images/docs/3.7/operation-manual/3newHAdeploy.png" width="100%"/>

## 五、架构优缺点

- **优势**：使用最少（3个）节点，完成了第二级高可用：保证 **管理节点**、**任一计算节点** 宕机的情况下，用户的应用依然可用。
- **劣势**：**管理节点** 没有实现高可用。
- **适用人群**：对于Rainbond有了一定了解，想要探索其高可用性的客户群体。
- **适用场景**：POC测试。

## 六、操作流程

<div class="btn-group btn-group-justified">
<a href="deploy-three-nodes.html" class="btn" style="background-color:#F0FFE8;border:1px solid #28cb75">操作流程</a>
</div>