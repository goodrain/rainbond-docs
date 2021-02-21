---
title: '基于阿里云 ACK创建并对接 Rainbond Cloud'
weight: 1
description: '基于阿里云 Kubernetes 托管集群安装 Rainbond。'
draft: true
---

本文将会介绍如何基于 [Rainbond Cloud](../../../quick-start/rainbond-cloud/) 自动地 **对接** 或 **创建** 阿里云 Kubernetes 托管集群，并此基础上安装处高可用的 Rainbond 集群。

## 前提条件

开始之前，请检查以下前提条件：

1. 了解 [Rainbond Cloud](../../../quick-start/rainbond-cloud/) ，并进行[注册](https://cloud.goodrain.com/enterprise-server/registered)和[登陆](https://cloud.goodrain.com/enterprise-server/login)。
1. 确保你的阿里云账户支持按需购买资源，比如账户余额大于 100 元并通过实名认证。
1. 确保以下服务已开通并授权：[创建容器服务默认角色](https://ram.console.aliyun.com/#/role/authorize?request=%7B%22ReturnUrl%22:%22https://cs.console.aliyun.com/%22,%22Service%22:%22CS%22,%22Requests%22:%7B%22request1%22:%7B%22RoleName%22:%22AliyunCSManagedLogRole%22,%22TemplateId%22:%22AliyunCSManagedLogRole%22%7D,%22request2%22:%7B%22RoleName%22:%22AliyunCSManagedCmsRole%22,%22TemplateId%22:%22AliyunCSManagedCmsRole%22%7D,%22request3%22:%7B%22RoleName%22:%22AliyunCSManagedCsiRole%22,%22TemplateId%22:%22AliyunCSManagedCsiRole%22%7D,%22request4%22:%7B%22RoleName%22:%22AliyunCSManagedVKRole%22,%22TemplateId%22:%22AliyunCSManagedVKRole%22%7D,%22request5%22:%7B%22RoleName%22:%22AliyunCSClusterRole%22,%22TemplateId%22:%22Cluster%22%7D,%22request6%22:%7B%22RoleName%22:%22AliyunCSServerlessKubernetesRole%22,%22TemplateId%22:%22ServerlessKubernetes%22%7D,%22request7%22:%7B%22RoleName%22:%22AliyunCSKubernetesAuditRole%22,%22TemplateId%22:%22KubernetesAudit%22%7D,%22request8%22:%7B%22RoleName%22:%22AliyunCSManagedNetworkRole%22,%22TemplateId%22:%22AliyunCSManagedNetworkRole%22%7D,%22request9%22:%7B%22RoleName%22:%22AliyunCSDefaultRole%22,%22TemplateId%22:%22Default%22%7D,%22request10%22:%7B%22RoleName%22:%22AliyunCSManagedKubernetesRole%22,%22TemplateId%22:%22ManagedKubernetes%22%7D,%22request11%22:%7B%22RoleName%22:%22AliyunCSManagedArmsRole%22,%22TemplateId%22:%22AliyunCSManagedArmsRole%22%7D%7D%7D)，[开通 ESS 弹性伸缩服务](https://ram.console.aliyun.com/#/role/authorize?request=%7B%22Requests%22:%20%7B%22request1%22:%20%7B%22RoleName%22:%20%22AliyunESSDefaultRole%22,%20%22TemplateId%22:%20%22DefaultRole%22%7D%7D,%20%22ReturnUrl%22:%20%22https:%2F%2Fessnew.console.aliyun.com%2F%22,%20%22Service%22:%20%22ESS%22%7D)，[授权 ESS 弹性伸缩服务](https://ram.console.aliyun.com/#/role/authorize?request=%7B%22Requests%22:%20%7B%22request1%22:%20%7B%22RoleName%22:%20%22AliyunESSDefaultRole%22,%20%22TemplateId%22:%20%22DefaultRole%22%7D%7D,%20%22ReturnUrl%22:%20%22https:%2F%2Fessnew.console.aliyun.com%2F%22,%20%22Service%22:%20%22ESS%22%7D)，[开通 NAS 服务](https://common-buy.aliyun.com/?commodityCode=naspost)
1. 在阿里云控制台企业 RAM 访问控制页面中创建独立的 RAM 用户，创建该用户的 `Access Key`，并获取相应的 `Secret Key`，详情请参考[这里](https://help.aliyun.com/document_detail/43640.html)。
1. 为 RAM 用户赋予：**AliyunCSFullAccess**、**AliyunECSFullAccess**、**AliyunVPCFullAccess**、**AliyunRDSFullAccess**、**AliyunNASFullAccess**、**AliyunSLBFullAccess** 权限。

> 注意：我们将严格保护 AccessKey 安全，若你有安全顾虑，可以在集群对接完成后删除账号收回权限。

## 安装步骤

基于阿里云的 Kubernetes 托管集群安装 Rainbond，有 4 个步骤，分别是 `选择供应商`, `选择(创建) Kubernetes 集群`，`初始化 Rainbond 集群`，`完成对接`。

1. 选择供应商：

   目前只支持对接阿里云，本文的主题也是围绕阿里云进行的。陆续会开放对华为云，腾讯云等供应商的支持。

1. 选择或自动创建 Kubernetes 托管集群：

   你可以选择一个已存在的 ACK 集群来安装 Rainbond。在这种情况下，Rainbond 的安装不会影响集群中已有服务的运行。

   当然，如果你还没有 ACK 集群，也可以让 Rainbond Cloud 去调用阿里云的 API 去购买一个。在购买前，你需要选择想要的配置：

   - 区域：机器所在的区域，比如：华东 1（杭州）。
   - 名称：集群名称，请确保其唯一性。
   - 资源配置：

     默认有 3 种配置：

     - 最小配置：单节点 `2Core/8GB RAM`, 按需预计 `2 元/小时`。
     - 普通配置：单节点 `4Core/16GB RAM`, 按需预计 `4 元/小时`。
     - 生产配置：单节点 `4Core/32GB RAM`, 按需预计 `8 元/小时`。

     当然，你也可以根据实际需求选择自定义规格，这时提供一个 `阿里云 ECS 规格` 即可。ECS 实例规格参考[实例规格族](https://help.aliyun.com/document_detail/25378.html?spm=a2c4g.11186623.2.143.88676f0fNQG23P#section-e9r-xkf-z15)。

   - 实例数量：

     Kubernetes 集群节点的数量，最小需要两个节点。

1. 初始化 Rainbond 集群：

   在初始化 Rainbond 集群前，Rainbond Cloud 会调用阿里云的 API 购买 `RDS(1个)`，`NAS(1个)`，`SLB(1个)`，预计每小时费用 0.5 元。

   - RDS：数据库类型为 `MySQL`，用于存储 Rainbond 的元数据。
   - NAS：Rainbond 会利用该 NAS 创建出 [Storage Classes](https://kubernetes.io/docs/concepts/storage/storage-classes/)，为整个 Rainbond 集群提供数据的持久化能力。
   - SLB：SLB 的作用则是为 `rbd-gateway` 提供负载均衡能力。

   随后，Rainbond Cloud 会调用 kube-apiserver 的 API，创建出 [rainbond operator](https://github.com/goodrain/rainbond-operator) 和 Rainbond 相应的 k8s 资源。

1. 完成对接

   初始化 Rainbond 集群完成后，还需要配置该 `集群 ID` 和 `集群名称`。

   - 集群 ID：集群在 Rainbond Cloud 中的唯一标识，一旦确认不可以再修改，比如：`rainbond`。
   - 集群名称：集群在 Rainbond Cloud 中的名称，可以随意修改，比如：`开发测试集群`。

## 验证安装

进入 `集群管理` 页面，检查集群的状态，如下图所示：

![集群状态](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.2/Rainbond%20Cloud%20%E8%87%AA%E5%8A%A8%E5%AF%B9%E6%8E%A5%E9%98%BF%E9%87%8C%E4%BA%91%20ACK/%E9%9B%86%E7%BE%A4%E7%8A%B6%E6%80%81.png)

请留意，`开发测试集群` 的状态是 `运行中`，说明 Rainbond 安装成功。

> 在安装对接过程中有任何疑惑请联系`18501030060`（曾庆国）获取技术支持

## 演示视频

最后，附上一个 `阿里云 ACK 安装对接视频`：

{{<video title="Rainbond Cloud对接阿里云ACK集群演示视频" src="https://grstatic.oss-cn-shanghai.aliyuncs.com/videos/rainbond-cloud-init-cluster.mp4">}}
