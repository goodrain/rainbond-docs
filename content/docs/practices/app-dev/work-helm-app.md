---
title: 在Rainbond上部署并使用helm应用
Description: 如何在Rainbond上快速部署helm应用，并可被Rainbond服务调用
weight: 22005
aliases:
  - /docs/practices/app-dev/work-helm-app/
---

Helm 是 Kubernetes 中的一个开源软件包管理工具。通过软件打包的形式，支持软件包的版本管理和控制，很大程度上简化了 Kubernetes 应用部署和管理的复杂性，类似于 Ubuntu 的 APT 和 CentOS 中的 YUM。

本文将介绍 Rainbond 平台对接 Helm 进行应用的安装及管理，通过一个具体的示例学习如何对接 Helm 仓库，安装及管理 Helm 仓库中的应用。

### 前提条件

1.已部署完成的 `v5.3.1-release` 版本 Rainbond 平台    
2.拥有一个可对接使用的Helm仓库，示例 https://charts.bitnami.com/bitnami 仓库    


### 操作步骤

#### Rainbond对接Helm仓库

使用 **企业管理员账号** 在 **企业视图** 点击 **应用市场**，点击 `+` 号对接新的应用市场，选择Helm商店，输入以下信息，点击创建即可对接，如果是私有商店则选择私有商店输入 **商店用户名** 及 **商店密码**。

商店名称：自定义  
商店地址：Helm仓库地址

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/dockinghelmstore.jpg" title="对接helm仓库" width="100%">}}

对接完成后将自动获取并展示当前 Helm 仓库中的应用

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/dockingcomplete.jpg" title="对接完成" width="100%">}}

#### 基于Helm应用商店在Rainbond中部署应用

**以部署Wordpress应用为例**

在企业视图Helm应用市场中选择Wordpress，点击应用后面的 **安装** 按钮，选择需要安装到的 **团队**，定义 **应用名称**，点击 **确定** 即会自动开始安装。

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/Install_helm_app.jpg" title="安装helm商店中的应用" width="100%">}}


#### 安装流程

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/Installationprocess.png" title="安装流程" width="100%">}}

安装流程分为以下四个步骤：

- 初始化

自动创建应用部署所需的CR资源

- 检测 

检测应用是否可以被正常部署，如因K8s apiVersion问题或其他错误引发无法正常部署时此处会展示错误信息

- 配置 

提供应用部署配置功能，提供图形化方式修改 `values.yaml` 文件配置，可选择部署时使用的 `values.yaml` 文件，配置修改方式参见 [Helm应用管理](/docs/component-create/helm-support/manage-helm-app/)，需要注意的是 **有状态应用** 需要挂载存储时必须指定使用的`storageClass`，指定方式如下:

*No.1*

在 `values.yaml` 文件中指定或图形化方式指定，图形化方式指定参考[Helm应用管理](/docs/component-create/helm-support/manage-helm-app/)    

*No.2*

将Rainbond部署时自动创建的 `rainbondvolumerwx` 设置为集群默认 `storageClass` ，则部署Helm应用时默认将会使用该 `storageClass`，  设置命令如下

```bash
kubectl patch storageclass rainbondvolumerwx  -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```


- 安装

经过以上步骤后进入安装流程，应用安装完毕即可使用。

#### 应用使用

应用安装完毕后平台会将组件自动创建为 [k8s类型的第三方组件](/docs/component-create/thirdparty-service/thirdparty-create.md) ；在应用界面 **服务实例** 中会展示该应用下包含的所有组件，点击对应的组件名称，点击 **组件详情** 即可进入组件网络设置页面，在端口页面打开 **对外服务**，根据生成的 **访问策略** 即可访问到该应用，如果你部署的是 **中间件类** 服务，在此处打开 **对内服务** 即可被平台中的其他服务依赖使用。


{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/component_details.jpg" title="组件详情" width="100%">}}

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.3/user-operations/component-create/creation-process/access.jpg" title="访问" width="100%">}}

点击 **访问策略** 中生成的域名即可访问 Wordpress web页面。
