---
title: 添加服务组件
description: 讲解为应用便捷的添加服务组件说明文档
hidden: true
Weight: 4003
---

#### 添加服务组件说明

应用由一个或多个服务组件组成，一般在[创建第一个服务组件](/user-manual/app-creation/)的过程中创建了应用。后续的应用组装过程中，直接为应用添加组件将是最便捷的途径。添加服务组件分为两类：

* 添加内置组件

添加组件的流程与[组件创建流程](/user-manual/app-creation/creation-process/)完全一致，同样支持基于源代码、Docker镜像和云市应用三种途径。唯一的不同是不提供基于DockerCompose创建多个服务的方式。

* 添加第三方组件

添加[第三方组件](/user-manual/app-creation/thirdparty-service/) 便捷的添加运行于集群外的服务，同样支持添加静态组件和动态组件。



<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/team-operation5.gif" width="100%">

<center>流程演示</center>

#### 处理依赖关系

添加的组件一般需要被其组件务依赖或依赖其他组件，只需要进入[拓扑图](/user-manual/app-manage/app-topology/)的[编辑模式](/user-manual/app-manage/app-topology/#编辑模式) ，将服务直接单向连线即可快捷建立依赖关系。

关于为什么需要建立依赖关系，查看文档 [组件依赖关系](/user-manual/app-service-manage/service-rely/)

#### 开启外网访问

如果添加的组件需要被外网访问，添加成功后有两种方式，第一种是通过 拓扑图的编辑模式将外网云朵模型与组件建立连线即可。第二种是通过应用网关 [访问策略管理](/user-manual/gateway/traffic-control/) 添加访问策略。

