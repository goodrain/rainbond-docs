---
title: '基于应用市场部署 Helm 应用'
description: '根据文档完成 Helm 应用在 Rainbond 中的部署'
---

跟随本文档使开发者或运维人员能够基于 Helm 仓库在 Rainbond 中部署应用。

### 前提条件

开始之前，你需要满足以下条件：

1.已对接[Helm 应用商店](./docking_helm_store)  
2.拥有一个可用的团队

### 操作流程

应用安装有三个入口：

**No.1** 在企业视图应用市场中直接安装

点击 **Helm 商店** 中应用后面的 **安装** 按钮，选择需要安装到的 **团队**，定义 **应用名称**，点击 **确定** 即会自动开始安装。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/appstore_helm_app_install.jpg" title="安装 Helm 商店中的应用" width="100%"/>

**No.2** 在团队视图 **基于应用市场创建组件** 中选择应用进行安装

在团队视图点击 **新增** --> **基于应用市场创建组件**，选择对接的 Helm 应用商店中的应用，点击 **安装** 即会自动开始安装。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/tenant_helm_app_install.jpg" title="安装 Helm 商店中的应用" width="100%"/>

**No.3** 在应用视图 **从应用市场安装** 中选择应用进行安装

在应用视图点击 **添加组件** --> **从应用市场安装**，选择对接的 Helm 应用商店中的应用，点击 **安装** 即会自动开始安装。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/app_helm_app_install.jpg" title="安装 Helm 商店中的应用" width="100%"/>

#### 安装流程

安装流程分为以下三个步骤：

- 检测

检测应用是否可以被正常部署，如因 K8s apiVersion 问题或其他错误引发无法正常部署时此处会展示错误信息

- 配置

提供应用部署配置功能，提供图形化方式修改 `values.yaml` 文件配置，可选择部署时使用的 `values.yaml` 文件，配置修改方式参见 [Helm 应用管理](./manage-helm-app)，需要注意的是 **有状态应用** 需要挂载存储时必须指定使用的`storageClass`，指定方式如下:

_No.1_

在 `values.yaml` 文件中指定或图形化方式指定，图形化方式指定参考[Helm 应用管理](./manage-helm-app)

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/helm_values_yaml.jpg" title="配置 Helm 应用" width="100%"/>

_No.2_

将 Rainbond 部署时自动创建的 `rainbondvolumerwx` 设置为集群默认 `storageClass` ，则部署 Helm 应用时默认将会使用该 `storageClass`， 设置命令如下

```bash
kubectl patch storageclass rainbondvolumerwx  -p '{"metadata": {"annotations":{"storageclass.kubernetes.io/is-default-class":"true"}}}'
```

- 安装

经过以上步骤后进入安装流程，应用安装完毕即可使用。

#### 应用使用

应用安装完毕后平台会将组件自动转换为 Rainbond 模型,会将 Helm 资源对应转换为平台资源。
