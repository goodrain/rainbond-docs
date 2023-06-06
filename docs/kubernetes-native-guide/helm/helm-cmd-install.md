---
title: '基于 Helm 命令部署 Helm 应用'
description: '通过 Helm 命令安装应用'
---

跟随本文档使开发者或运维人员能够基于 Helm 命令在 Rainbond 中部署应用。

### 前提条件

开始之前，你需要满足以下条件：

1.拥有一条helm的可执行命令（该功能只支持 helm install ...）  

2.拥有一个可用的团队

### 操作流程

Helm 命令执行有两个入口：

**No.1** 团队视图

在团队视图点击 **新增** --> 然后点击 **Kubernetes YAML Helm** --> 选择 **Helm 命令**安装 --> 选择**应用**输入 **Helm 命令** 安装 --> **确认创建**则会跳转到Helm应用配置界面。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/tenant_helm_cmd_install.jpg" title="基于 Helm 命令安装" width="100%"/>

**No.2** 应用视图

在应用视图点击 **添加组件** --> **从应用市场安装**，选择对接的 Helm 应用商店中的应用，点击 **安装** 即会自动开始安装。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.10/app_helm_cmd_install.jpg" title="基于 Helm 命令安装" width="100%"/>

### 安装流程

根据 Helm 官网给出的两种安装方式进行划分，安装流程分为两种，分别是 tgz 包安装和仓库地址安装。

#### 1.tgz 包安装

**前提条件** 拥有一个可以下载并使用的 Helm tgz 包。

示例

```bash
helm install mynginx https://example.com/charts/nginx-1.2.3.tgz
```

具体如何生成 Helm tgz 包请参考 [Helm](https://helm.sh/zh/docs/helm/helm_install/) 官网。

tgz 包点击确认创建后会先检查命令是否正确且可以使用，检查通过后会转换为 Rainbond 模型并跳转到应用视图，届时你就能看到你所安装的应用。

#### 2.仓库地址包安装

**前提条件** 拥有一个可以下载并使用的 Helm 仓库地址，并且仓库内存在你即将安装的应用。

示例

```bash
helm install --repo https://example.com/charts/ mynginx nginx
```

仓库安装点击确认创建后会检查命令是否正确且可以使用，然后会解析仓库地址并自动对接到 Helm 应用商店，然后跳转到 Helm 应用安装的配置界面。


