---
title: 使用 Helm 部署
description: 在团队中以原生 Helm Release 的方式部署和管理应用。
keywords:
- Helm 部署
- Helm Release
- K8s 原生 Helm
---

K8s 原生资源管理支持直接在团队下安装和管理 Helm Release。与将 Helm Chart 转换为 Rainbond 应用模型不同，这种方式会保留 Helm Chart 的原生安装、升级和卸载流程。

## 什么时候使用

以下场景优先建议使用 Helm：

- 目标应用本身就是标准 Helm Chart
- 希望保留 Chart、Version 和 Values 的原生管理方式
- 不希望再做模板适配或字段转换
- 需要后续继续使用 Helm 的升级、回滚和卸载习惯

## 支持的 Helm 来源

安装 Helm 应用时，Rainbond 支持以下三种 Chart 来源：

| 来源 | 说明 | 适用场景 |
| --- | --- | --- |
| Helm 商店 | 从平台中已配置的 Helm 仓库选择 Chart | 团队复用统一维护的仓库 |
| 第三方仓库 / OCI | 直接填写第三方 Helm Repo 或 OCI 中的 Chart 地址 | 临时安装外部 Chart，或使用未预先接入的平台仓库 |
| 上传 Chart 包 | 上传本地 `.tgz` Chart 包后直接安装 | 手头已有离线 Chart 包，或需要安装自定义打包内容 |

## 基本流程

1. 进入目标团队的 `K8s 原生资源管理`
2. 打开 `Helm 应用` 页签
3. 点击安装入口，选择 Chart 来源
4. 填写 Chart 地址或上传 Chart 包
5. 系统自动检测 Chart，并进入安装信息填写页
6. 确认 Release 名称、版本、Values 和目标 Namespace
7. 提交安装
8. 在 Helm 应用列表中查看 Release 状态、版本和更新时间

## 来源一：Helm 商店

`Helm 商店` 适合从平台中已经配置好的 Helm 仓库直接选择 Chart。

![Helm 商店选择 Chart](/docs/how-to-guides/k8s-native-resource/helm-store.png)

### 适用场景

- 平台已经统一接入 Helm 仓库
- 团队希望直接从现成仓库选择 Chart
- 需要复用平台侧统一维护的版本来源

### 使用说明

1. 在安装 Helm 应用时选择 `Helm 商店`
2. 从已配置仓库中选择目标 Chart
3. 系统进入下一步，继续填写安装信息

如果页面提示暂无 Helm 仓库，说明平台侧尚未配置可用仓库。此时需要先进入 `平台管理 -> 应用市场 -> 添加 Helm 商店`，完成仓库配置后，再返回团队继续安装。

## 来源二：第三方仓库 / OCI

`第三方仓库 / OCI` 适合直接使用外部 Chart 地址，不依赖平台预先接入 Helm 商店。

### 支持范围

- Helm 官方仓库中的 Chart 包地址
- 自建 Helm Repo 中的 Chart 包地址
- OCI 格式的制品仓库地址

### 页面填写项

在该模式下，通常需要填写以下信息：

- `Chart 地址`
- `鉴权方式`

### Chart 地址

Chart 地址支持直接填写完整地址。页面会根据地址类型自动解析 Chart。

![第三方仓库填写 Chart 地址](/docs/how-to-guides/k8s-native-resource/third-party-repo.png)

常见示例包括：

- `https://charts.bitnami.com/bitnami/nginx-15.9.0.tgz`
- 其他自建 Helm Repo 中的 `.tgz` 包地址
- OCI 仓库中的 Chart 地址

填写完成后，点击下一步，系统会自动检测 Chart 并进入安装信息填写页。

### 鉴权方式

当前页面支持两种鉴权方式：

- `None`
- `Basic`

如果目标仓库是公开地址，通常选择 `None` 即可。  
如果仓库启用了基础认证，请选择 `Basic` 并填写相应账号密码。

### 适用场景

- 平台未预先维护该仓库，但团队需要立即安装
- Chart 来自外部官方地址或临时测试仓库
- 需要直接使用 OCI 制品仓库中的 Chart

## 来源三：上传 Chart 包

`上传 Chart 包` 适合直接上传本地的 Helm Chart 压缩包进行安装。

![上传 Chart 包](/docs/how-to-guides/k8s-native-resource/upload-chart.png)

### 文件要求

- 上传文件格式为 `.tgz`
- Chart 包应为标准 Helm 打包产物

### 使用说明

1. 在安装 Helm 应用时选择 `上传 Chart 包`
2. 点击 `选择 Chart 包`
3. 上传本地 `.tgz` 文件
4. 点击下一步

上传完成后，系统会自动解析 Chart 的版本和默认 `values`，然后进入安装信息填写页，继续完成 Release 安装。

### 适用场景

- 离线或半离线环境中安装应用
- 安装团队内部自定义打包的 Helm Chart
- 临时验证某个本地构建的 Chart 包

## 安装前建议确认

- 平台已配置可用的 Helm 仓库，或具备可用的 Chart 来源
- 所选 Chart 与当前集群版本兼容
- 如 Chart 依赖 StorageClass、IngressClass 或 CRD，请提前准备
- Values 中涉及镜像仓库、域名、存储和凭据的配置已完成校验
- 如使用第三方私有仓库，请提前确认鉴权方式与凭据正确
- 如使用上传方式，请确认本地 `.tgz` 包可被正常解析

## 安装后可以做什么

在 Helm 应用视图中，通常可以持续查看和维护以下信息：

- Release 名称
- Chart 名称
- 运行状态
- 版本
- 所属 Namespace
- 更新时间

同时也适合在这里处理 Helm Release 的日常运维，例如：

- 升级 Chart 版本
- 调整 Values
- 卸载 Release
- 排查安装后的运行状态

## Helm 与原生 YAML 的选择建议

| 场景 | 推荐方式 |
| --- | --- |
| 已有成熟 Helm Chart | Helm |
| 只有一组原生 Manifest | 原生 YAML |
| 需要长期维护版本与 Values | Helm |
| 需要精细控制单个对象定义 | 原生 YAML |

## 常见问题

### Helm 安装后为什么没有出现在 Rainbond 应用拓扑中

因为这是原生 Helm 管理路径，资源仍以 Kubernetes 原生对象形式存在，不会自动转换为 Rainbond 应用模型。

### 第三方仓库地址已经填写，为什么仍然无法下一步

建议检查以下内容：

1. Chart 地址是否为完整可访问地址
2. 选择的鉴权方式是否与仓库实际配置一致
3. 仓库是否允许当前网络环境访问
4. 目标地址是否确实为可解析的 Helm Chart 或 OCI Chart

### 上传 Chart 包后系统没有解析出版本或默认 values

通常表示上传的文件不是标准 Helm Chart 打包产物，或包内容不完整。建议重新检查 Chart 目录结构并重新打包后再上传。
