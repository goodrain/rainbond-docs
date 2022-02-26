---
title: 基于Dashboard界面的运维
weight: 1005
description: 基于Dashboard界面查看集群资源，快速运维
---

### 概述

本章主要讲述 集群Dashboard 相关功能，查看集群资源，帮助用户基于 Dashboard 更快速，高效的运维 Rainbond。


Dashboard图形面板具有以下功能：

- 查看各种资源
 - 集群级别的资源，如ClusterRole，命名空间，节点，PV，StorageClass等；
 - 工作负载，包含Cron Jobs，DaemonSets，Deployments，Stateful Sets，Jobs，Replica Sets，RC等；
 - 服务发现和负载均衡，包含Ingresses和Services；
 - 配置和存储包含Config Maps，PVC和Secrets；
 - 定义自定义资源。
- 资源监控：集群节点，工作负载，存储等资源的监控
- 管理资源对象：创建资源，编辑组件配置，查看与编辑服务发现负载均衡策略等


### 访问方式

在集群安装阶段已经安装了Dashboard组件，用户在集群安装后在 企业视图 -->集群 点击 `集群名称` 即可访问使用Dashboard。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/ds.jpg" width="100%" />


<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/overview.jpg" title="界面总览" width="100%" />


### 查看资源

#### 查看node节点信息

- 资源使用及节点健康情况


<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/node.jpg" title="集群节点" width="100%" />

相关解释：   
 
 准备就绪：true为就绪状态    
 CPU 最低需求：cpu最低使用量    
 CPU 最高需求：cpu最高使用量    
 Memory 最低需求：内存最小使用量    
 Memory 最高需求：内存最大使用量    
 创建时间：节点创建时间  

- 点击 Node名字 查看某一个Node具体信息

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/nodespecific.jpg" title="资源使用情况" width="100%" />

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/resource.jpg" title="资源分配情况" width="100%" />

####  组件信息

Rainbond 的所有组件都位于 rbd-system 名称空间下，根据组件部署类型可查看各组件信息。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/information.jpg" title="Component information" width="100%" />

#### 存储

示例:

查看 rbd-db组件 存储挂载路径

找到名称为 rbd-db 的PV，点击查看详情，即可获取到组件存储详情

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/storage.jpg"  width="100%" />

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/view.jpg" title="存储详情页" width="100%" />


###  管理资源对象

#### 远程登录容器

示例:

进入 rbd-app-ui 容器查看控制台报错日志

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/entercontainer.jpg" title="进入容器" width="100%" />

进入容器执行 shell命令

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/Insidecontainer.jpg" title="容器命令行" width="100%" />

#### 查看容器运行日志

示例:

查看 rbd-chaos 容器运行日志

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/logs.jpg" title="容器运行日志" width="100%" />

#### 修改组件配置

示例：

以更新 node组件 镜像为例

点击左侧 **定义自定义资源** -->选择 **RbdComponent** -->在 **Objects** 中找到需要修改配置的组件，点击 **编辑** 即可对组件进行配置的修改，修改完成之后点击更新即可。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/component.jpg" title="编辑资源" width="100%" />

修改 image 字段后点击更新

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/dashboard-op/image.jpg" title="更新生效" width="100%" />
