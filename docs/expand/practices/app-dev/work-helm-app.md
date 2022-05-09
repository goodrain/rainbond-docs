---
title: 基于 Helm 应用部署 Wordpress
Description: 在 Rainbond 5.3.1 版本中基于 Helm 应用安装方式部署 Wordpress 参考文档
---

Helm 是 Kubernetes 中的一个开源软件包管理工具，Rainbond 从 5.3.1 版本开始支持部署 Helm 应用。实现 Helm 应用的便捷部署，访问控制。使 Rainbond 用户可以使用 Kubernetes 生态定义的应用，其主要场景是安装使用中间件应用。

本文将介绍 Rainbond 平台对接 Helm 进行应用的安装及管理，通过一个具体的示例学习如何对接 Helm 仓库，安装及管理 Helm 仓库中的应用。

### 前提条件

1. 已部署完成的 `v5.3.1-release` 及以上版本 Rainbond 平台。
2. 拥有一个可对接使用的 Helm 仓库，示例 https://charts.bitnami.com/bitnami 仓库。

### 操作步骤

#### Rainbond 对接 Helm 仓库

使用 **企业管理员账号** 在 **企业视图** 点击 **应用市场**，点击 `+` 号对接新的应用市场，选择 Helm 商店，输入以下信息，点击创建即可对接，如果是私有商店则选择私有商店输入 **商店用户名** 及 **商店密码**。

商店名称：自定义  
商店地址：Helm 仓库地址

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/dockinghelmstore.jpg" title="对接helm仓库" width="100%" />

对接完成后将自动获取并展示当前 Helm 仓库中的应用

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/dockingcomplete.jpg" title="对接完成" width="100%" />

#### 基于 Helm 应用商店在 Rainbond 中部署应用

**以部署 Wordpress 应用为例**

在企业视图 Helm 应用市场中选择 Wordpress，点击应用后面的 **安装** 按钮，选择需要安装到的 **团队**，定义 **应用名称**，点击 **确定** 即会自动开始安装。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/Install_helm_app.jpg" title="安装helm商店中的应用" width="100%" />

#### 安装流程

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/Installationprocess.png" title="安装流程" width="100%" />

安装流程分为以下四个步骤：

- 初始化

自动创建应用部署所需的 CR 资源

- 检测

检测应用是否可以被正常部署，如因 K8s apiVersion 问题或其他错误引发无法正常部署时此处会展示错误信息

- 配置

提供应用部署配置功能，提供图形化方式修改 `values.yaml` 文件配置，可选择部署时使用的 `values.yaml` 文件，配置修改方式参见 [Helm 应用管理](/docs/use-manual/component-create/helm-support/manage-helm-app/)，需要注意的是 **有状态应用** 需要挂载存储时必须指定使用的`storageClass`，指定方式如下:

_No.1_

在 `values.yaml` 文件中指定或图形化方式指定，图形化方式指定参考[Helm 应用管理](/docs/use-manual/component-create/helm-support/manage-helm-app/)

_No.2_

将 Rainbond 部署时自动创建的 `rainbondvolumerwx` 设置为集群默认 `storageClass` ，则部署 Helm 应用时默认将会使用该 `storageClass`， 设置命令如下

```bash
kubectl patch storageclass rainbondvolumerwx  -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

- 安装

经过以上步骤后进入安装流程，应用安装完毕即可使用。

#### 应用使用

应用安装完毕后平台会将组件自动创建为 [k8s 类型的第三方组件](/docs/use-manual/component-create/thirdparty-service/thirdparty-create) ；在应用界面 **服务实例** 中会展示该应用下包含的所有组件，点击对应的组件名称，点击 **组件详情** 即可进入组件网络设置页面，在端口页面打开 **对外服务**，根据生成的 **访问策略** 即可访问到该应用，如果你部署的是 **中间件类** 服务，在此处打开 **对内服务** 即可被平台中的其他服务依赖使用。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/component_details.jpg" title="组件详情" width="100%" />

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/access.jpg" title="访问" width="100%" />

点击 **访问策略** 中生成的域名即可访问 Wordpress web 页面。
