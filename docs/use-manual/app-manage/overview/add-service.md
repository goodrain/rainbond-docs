---
title: 添加组件
description: 讲解为应用便捷的添加组件说明文档
---

## 添加服务组件说明

应用由一个或多个服务组件组成，一般在 [创建第一个服务组件](/docs/use-manual/component-create/language-support/java/java-maven) 的过程中创建了应用。后续的应用组装过程中，直接为应用添加组件将是最便捷的途径。添加服务组件分为两类：

- 添加内置组件

添加组件的流程与 [组件创建流程](/docs/use-manual/component-create/creation-process) 完全一致，同样支持基于源代码、Docker 镜像和云市应用三种途径。唯一的不同是不提供基于 DockerCompose 创建多个服务的方式。

- 添加第三方组件

添加 [第三方组件](/docs/use-manual/component-create/thirdparty-service/thirdparty-create) 便捷的添加运行于 rainbond 集群外的服务，同样支持添加静态组件和动态组件。

## 处理依赖关系

添加的组件一般需要被其组件务依赖或依赖其他组件，只需要进入 [拓扑图](/docs/use-manual/app-manage/overview/app-topology) 的 [编辑模式](/docs/use-manual/app-manage/overview/app-topology/#编辑模式) ，将服务直接单向连线即可快捷建立依赖关系。

关于为什么需要建立依赖关系，查看文档 [组件间通信](/docs/use-manual/component-manage/component-connection/regist_and_discover)

## 开启外网访问

如果添加的组件需要被外网访问，添加成功后有几种方式，常见的方式第一种是通过拓扑图的编辑模式将外网云朵模型与组件建立连线即可；第二种是通过组件管理界面 `端口` 添加访问策略。
