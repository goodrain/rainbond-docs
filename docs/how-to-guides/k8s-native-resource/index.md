---
title: K8s 原生资源管理
description: 了解 Rainbond 中 K8s 原生资源管理的定位、适用场景与核心能力。
keywords:
- K8s 原生资源管理
- Kubernetes 原生资源
- Helm Release 管理
- YAML 原生创建
- Namespace 对接
---

K8s 原生资源管理用于在 Rainbond 中直接管理 Kubernetes 原生对象，而不是先将资源转换为 Rainbond 应用模型。它适合需要保留原生 YAML、Helm Chart、已有 Namespace 和集群级资源管理习惯的场景。

通过这一组功能，您可以在团队内管理 Helm Release、工作负载、容器组、网络、配置和存储资源，也可以在平台管理侧集中管理 StorageClass、PV、PVC 以及其他集群级资源。

:::info 版本说明
K8s 原生资源管理为 Rainbond `v6.7.0` 引入的新功能。`v6.7.0` 以前的版本不包含这组能力，也看不到对应的页面入口。
:::

## 适用场景

以下场景优先建议使用 K8s 原生资源管理：

- 已有标准 Kubernetes YAML，希望按原生对象直接创建和维护
- 需要直接部署或升级 Helm Chart，不希望再做模板适配
- 团队已经在使用原生 Namespace、Helm、kubectl 的管理方式
- 需要保留 CRD、CR、RBAC、StorageClass 等原生对象结构
- 希望将已有 Namespace 直接对接到团队，再按原生方式继续管理

## 不适用场景

以下场景更适合继续使用 Rainbond 的应用部署能力：

- 希望将资源转换为 Rainbond 应用、组件和拓扑进行治理
- 希望使用 Rainbond 的应用模型能力来统一管理生命周期

如需上述能力，请参考现有文档：

- [K8s 资源到 Rainbond 模型转换](../app-deploy/deploy-using-yaml-helm/yaml-convert-ram.md)
- [使用 YAML 文件部署](../app-deploy/deploy-using-yaml-helm/yaml-example.md)

## 与 Rainbond 应用部署的区别

| 目标 | 推荐方式 | 结果 |
| --- | --- | --- |
| 将资源纳入 Rainbond 应用模型 | Rainbond 应用部署 | 资源会转换为应用、组件等平台模型 |
| 保持 YAML / Helm 的原生结构 | K8s 原生资源管理 | 资源仍以 Kubernetes 原生对象形式存在 |
| 接管已有 Namespace 并继续按原生方式管理 | 对接已有 Namespace | Namespace 与团队建立映射，不做模型转换 |
| 管理平台级存储与其他集群资源 | 存储管理 | 直接维护 StorageClass、PV、PVC、CRD、RBAC 等资源 |

原生 Helm 或 YAML 创建的资源不会自动出现在 Rainbond 应用拓扑中，因为这条路径管理的是 Kubernetes 原生对象，而不是 Rainbond 应用模型。

## 能管理哪些资源

### 团队内资源

团队视角下的 K8s 原生资源管理主要围绕团队绑定的 Namespace 展开，通常包括：

- Helm 应用
- 工作负载
- 容器组
- 网络资源
- 配置资源
- 存储资源

### 平台级资源

平台管理视角下主要维护跨团队、跨 Namespace 的全局资源，包括：

- StorageClass
- PersistentVolume
- PersistentVolumeClaim
- 默认 StorageClass 配置
- 其他集群级资源，例如 CRD、CR、RBAC 等

## 推荐使用路径

1. 如果团队需要使用一个已有 Namespace，先完成[对接已有 Namespace](./connect-namespace.md)
2. 需要通过 YAML 创建资源时，参考[使用原生 YAML 创建资源](./yaml-native-create.md)
3. 需要通过 Helm 安装或管理应用时，参考[使用 Helm 部署](./helm-native-deploy.md)
4. 创建完成后，在团队下统一查看和管理各类原生资源，参考[团队内资源管理](./team-native-resources.md)
5. 涉及 StorageClass、PV、PVC 或其他全局资源时，进入平台管理侧处理，参考[存储管理](./platform-storage.md)

## 文档导航

- [对接已有 Namespace](./connect-namespace.md)
- [使用原生 YAML 创建资源](./yaml-native-create.md)
- [使用 Helm 部署](./helm-native-deploy.md)
- [团队内资源管理](./team-native-resources.md)
- [存储管理](./platform-storage.md)
