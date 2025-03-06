---
title: 使用 Helm Chart 部署
description: 如何通过 Helm 仓库部署 Wordpress 示例，详细指导在 Rainbond 平台上使用不同 Helm 部署方式的完整流程
keywords:
  - Wordpress Helm
  - Rainbond Helm
  - Kubernetes Helm Chart
  - Helm 仓库部署
---

本文档将详细指导您如何利用 Rainbond 的 Helm 功能部署 Wordpress 应用。Rainbond 支持多种 Helm 部署方式，您可以根据实际需求选择最适合的方式。

## 准备工作

在开始部署之前，请确保满足以下条件：

- 已了解 [Kubernetes 资源到 Rainbond 应用模型的转换原理](./yaml-convert-ram.md)
- 拥有平台管理权限
- 可用的 Helm 仓库（本文以 Rainbond 官方仓库为例）

## Helm 仓库对接与部署

### 1. 对接 Helm 仓库

1. 进入**平台管理 → 应用市场 → 添加 Helm 商店**
2. 填写以下信息：
   - 商店名称：`rainbond`
   - 商店地址：`https://chart.rainbond.com`
3. 点击**确认**完成仓库添加

![Helm 仓库配置](/docs/how-to-guides/deploy-using-yaml-helm/helm-repo.png)

### 2. 通过 Helm 商店部署应用

#### 2.1 访问 Helm 商店

您可以通过两种途径访问已添加的 Helm 商店：

- 途径一：**平台管理 → 应用市场 → Helm 商店**
- 途径二：在目标团队中选择**新建应用 → 外部应用市场 → Helm 商店**

![Helm 商店](/docs/how-to-guides/deploy-using-yaml-helm/deploy-helmchart.png)

#### 2.2 部署 Wordpress 应用

1. 在 Helm 商店中搜索 `Wordpress`
2. 点击**安装**按钮开始部署流程

#### 2.3 应用包校验

Rainbond会自动进行以下校验：

- 下载 Helm 仓库中的应用包
- 检查应用包版本兼容性
- 分析资源并转换为 Rainbond 应用模型

#### 2.4 配置 Value 参数

在 Values 配置页面，您可以：

- 修改默认参数，如 `image.repository=wordpress`、`image.tag=latest`

### 3. 通过 Helm 命令部署应用

如果您熟悉 Helm CLI 操作，可以选择此方式：

1. 进入目标团队，选择**新建应用 → Kubernetes YAML/Helm → Helm**，选择**命令**方式
2. 在命令输入框中，输入以下 Helm 命令：

      helm install wordpress rainbond/wordpress-example
   - `wordpress`：指定安装后的应用名称
   - `rainbond/wordpress-example`：指定 Helm 仓库中的 Chart
3. 点击**提交**开始部署

<!-- ![Helm 命令部署](/docs/how-to-guides/deploy-using-yaml-helm/deploy-helm-command.png) -->

### 4. 通过上传 Helm 包部署应用

如果您有自定义的 Helm 包或需要使用未在 Helm 仓库中的 Chart，可以选择上传方式：

1. 在目标团队中选择**新建应用 → Kubernetes YAML/Helm → Helm**，选择**上传**方式
2. 点击**确认创建**

![Helm 上传部署](/docs/how-to-guides/deploy-using-yaml-helm/upload-chart.png)

## 应用配置优化

### 持久化存储配置

Helm Chart 中定义的存储资源（如 EmptyDir）在 Rainbond 中可以进行优化处理：

1. 导入后，原 Helm Chart 中的 `volumeMounts` 和 `volumes` 配置会被保存在组件的 **其他设置** > **Kubernetes属性** 中
2. 对于需要持久化的数据（如 WordPress 内容和 MySQL 数据），推荐使用 Rainbond 的存储功能：
   - 删除 Kubernetes 属性中相应的 `volumeMounts`/`volumes` 条目
   - 进入组件的 **存储** > **存储设置** > **添加存储**
   - 添加相应的持久化路径
      - 例如 MySQL 的 `/bitnami/mysql/data`。
      - 例如 WordPress 的 `/bitnami/wordpress`。

### 网关配置

部署完成后，需要为 WordPress 配置访问入口：

1. 进入 WordPress 组件详情页面。
2. 切换到**端口**选项卡。
3. 为 WordPress 的 HTTP 端口开启**对外服务**。

## 故障排除

以下是部署 WordPress 应用时可能遇到的常见问题及解决方法：

- **镜像拉取失败**：检查镜像仓库地址是否正确，确认网络连接是否畅通
- **数据库连接错误**：验证 WordPress 的数据库连接环境变量是否正确配置
- **资源不足**：检查集群资源是否充足，适当调整资源限制
