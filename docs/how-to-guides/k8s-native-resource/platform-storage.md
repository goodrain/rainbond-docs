---
title: 平台级资源管理
description: 在平台管理中统一维护全局存储、默认存储策略及其他全局 Kubernetes 资源。
keywords:
- 存储管理
- 全局存储
- StorageClass
- PV
- PVC
- 默认 StorageClass
- CRD
- RBAC
---

`存储管理` 是平台管理视图下的全局资源入口，用于集中维护集群范围内的存储能力以及其他 Kubernetes 全局资源。与团队内页面只关注单个 Namespace 下的业务资源不同，这里更强调跨团队共享、集群级生效和平台统一治理。

## 适用场景

- 查看集群中有哪些可用 StorageClass
- 设置平台默认 StorageClass
- 观察 PV 和 PVC 的整体使用情况
- 统一梳理存储供应器、绑定模式和回收策略
- 查看和维护其他平台级资源，例如 CRD、CR、RBAC 等

## 页面结构

`存储管理` 页面通常分为两个一级页签：

- 全局存储
- 其他资源

其中 `全局存储` 下通常再分为以下几个子页签：

- 存储类
- 存储卷
- 存储配置

## 全局存储

`全局存储` 用于集中查看和维护平台可用的存储能力，适合从平台角度统一梳理 StorageClass、PV 以及默认存储策略。

### 存储类

存储类对应 Kubernetes 的 StorageClass，用于定义动态供给存储卷的能力，建议重点关注：

- Provisioner
- 回收策略
- 绑定模式
- 是否为默认 StorageClass

存储类通常决定了应用后续申请存储时的可用能力，是平台侧最需要优先维护的对象之一。

![存储类视图](/docs/how-to-guides/k8s-native-resource/sc.png)

### 默认 StorageClass 的作用

平台默认 StorageClass 会影响未显式指定存储类的资源申请。对于通过应用市场默认部署、且未单独指定存储类的组件，也通常会优先使用该默认值。

因此，设置默认 StorageClass 前，建议确认：

- 是否满足大多数业务的性能和容量需求
- 是否适用于常见中间件和应用模板
- 回收策略是否符合平台规范

换句话说，默认 StorageClass 主要会影响两类资源：

- 未显式指定存储类的 PVC 申请
- 通过应用市场安装且未单独指定存储类的应用

### 存储卷

- PV 代表集群中实际可用的存储卷
- PVC 代表业务对存储卷的申请

平台侧适合从全局角度关注：

- 是否存在大量未绑定 PVC
- 是否存在空闲或回收异常的 PV
- 某个 StorageClass 是否被过度使用

![存储卷视图](/docs/how-to-guides/k8s-native-resource/pv.png)

### 存储配置

`存储配置` 主要用于设置应用市场安装应用时默认使用的 StorageClass，用于保持平台安装体验一致。

这里的默认配置会影响后续从应用市场新安装的应用，但不会回写修改已经安装完成的应用存储设置。

因此，调整存储配置时建议注意：

- 是否会影响后续通过应用市场安装的新应用
- 默认 StorageClass 是否符合平台当前的统一策略
- 已安装应用如需调整存储，应在应用自身的配置页面单独处理

![存储配置视图](/docs/how-to-guides/k8s-native-resource/default-sc.png)

## 其他资源

除存储相关对象外，平台侧还可能统一维护其他全局 Kubernetes 资源，例如：

- CRD
- CR
- Role / RoleBinding
- ClusterRole / ClusterRoleBinding

这些资源通常与 Operator、权限治理或平台级扩展能力有关，适合由平台管理员统一维护。

![其他资源视图](/docs/how-to-guides/k8s-native-resource/other-resources.png)

## 使用建议

- 在上线新的存储供应器前，先验证 Provisioner、回收策略和绑定模式
- 默认 StorageClass 变更属于平台级行为，建议评估对现有业务的影响
- 团队业务侧遇到 PVC Pending 时，优先回到平台侧确认存储供应能力是否正常
- 平台级资源变更前，先确认影响范围是否跨团队
- 涉及默认 StorageClass、ClusterRole 或 CRD 的调整时，建议做好变更评估
- 原生资源和 Rainbond 应用可以在同一集群中并存，但不建议让同一个工作负载同时被两套模型重复管理
