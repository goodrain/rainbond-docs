---
title: K8S 资源到 Rainbond 应用模型的转换原理
description: 解析 Kubernetes 资源与 Rainbond 应用模型的映射转换逻辑
keywords:
- Kubernetes YAML 转换 Rainbond
- Helm Chart 转换 Rainbond
- Rainbond 应用模型
---

## 核心概念

Rainbond 从 V5.8 版本开始支持直接将原生 Kubernetes 的 YAML 文件或 Helm Chart 部署到平台中。本文档阐述 Rainbond 为何需要进行应用模型转换，以及转换的技术原理和意义。

## 为什么需要模型转换

Rainbond 和 Kubernetes 在设计理念上存在以下关键差异：

1. **应用中心化 vs 资源中心化**：Rainbond 围绕"应用"这一核心概念设计，将相关联的多个服务视为一个整体；而 Kubernetes 采用资源中心化的设计，各类资源（Deployment、Service等）相对独立。

2. **抽象层次不同**：Rainbond 提供了比 Kubernetes 更高层次的抽象，通过扩展 RAM（Rainbond Application Model）模型，在保持易用性的同时提供了必要的灵活性。

3. **管理模式差异**：Kubernetes 注重全面、精细的资源定义能力，而 Rainbond 优化了常用操作的使用体验，将复杂的资源规格定义转化为直观的界面操作。

这些差异决定了在导入 Kubernetes 资源时必须进行模型转换，以确保两种系统的兼容性和功能完整性。

## 转换原理与技术实现

### 资源识别与分类处理

Rainbond 将 Kubernetes 资源分为两类进行处理：

1. **Workload 类资源**：包括 Deployment、StatefulSet、Job 和 CronJob，这些资源被转换为 Rainbond 的组件（Component）。

2. **非 Workload 类资源**：如 Service、ConfigMap、Secret 等，被存储在应用的 `k8s资源` 列表中统一管理。

![](https://static.goodrain.com/wechat/import-exist-resource-to-rainbond/import-exist-resource-to-rainbond-2.png)

### Workload 转换逻辑

Rainbond 在转换 Workload 时采用以下处理流程：

1. **提取核心定义**：从 YAML 或 Helm Chart 中提取 Workload 的规格定义(Spec)。

2. **映射到 RAM 模型**：将提取的定义映射到 Rainbond 应用模型的各个属性：
   - 容器镜像、端口、环境变量等常用配置被映射到对应的 Rainbond 界面元素
   - 特殊或扩展属性被存储在 `其他设置 > Kubernetes属性` 中

3. **自动识别关联**：自动识别资源间的依赖关系，构建应用内组件的连接关系

Rainbond 通过识别 YAML 文件中的资源类型，将其转换为 Rainbond 中的组件类型和相应的抽象层。以下是按照类型划分的详细支持资源清单：

#### 组件类型资源

该类型资源导入完成后会转换成 Rainbond 中的组件：

| k8s资源      | Rainbond模型  |
| ----------- | ------------ |
| Deployment  | 无状态组件      |
| StatefulSet | 有状态组件      |
| CronJob     | 定时任务组件    |
| Job         | 任务组件       |

#### 组件属性资源

组件类型资源自身携带的一些属性值，如Port、ConfigMap、volume等：

| 组件属性                  | Rainbond模型        |
| ------------------------- | ------------------- |
| nodeSelector              | 组件特殊属性         |
| labels                    | 组件特殊属性         |
| tolerations               | 组件特殊属性         |
| volumes                   | 组件特殊属性         |
| serviceAccountName        | 组件特殊属性         |
| affinity                  | 组件特殊属性         |
| volumeMount               | 组件特殊属性/配置文件 |
| privileged                | 组件特殊属性         |
| port                      | 组件端口            |
| HorizontalPodAutoscalers  | 组件伸缩策略         |
| env                       | 环境变量/组件特殊属性 |
| HealthyCheckManagement    | 组件健康检测         |

**特别说明**：
- 如果组件的 volumeMount 挂载了 ConfigMap 类型的 volume，则会转化为组件的配置文件
- 如果 env 是引用类型，则不会被识别到 Rainbond 的环境变量中
- 其他的资源全部放在应用视图下的 k8s 资源当中

### 非 Workload 资源处理

对于 Service、ConfigMap、Secret 等非 Workload 资源：

1. Rainbond 将其转换为内部表示，存储在应用级别的 `k8s资源` 列表中
2. 提供图形化界面供用户查看和编辑这些资源
3. 在应用部署时，这些资源会被自动应用到 Kubernetes 集群中

## 双向转换能力

Rainbond 不仅支持将 Kubernetes 资源导入转换为应用模型，还支持反向操作：

- **导入转换**：YAML/Helm → Rainbond 应用模型
- **导出转换**：Rainbond 应用 → Helm Chart

这种双向转换能力确保了应用可以在 Rainbond 和原生 Kubernetes 环境间自由迁移，无缝对接企业现有的 Kubernetes 生态和工具链。

## 实际应用场景

### 导入 Kubernetes 资源

对于已有 Kubernetes 资源的导入，Rainbond 提供两种主要方式：

- **YAML 文件导入**：适用于单个或少量资源定义的场景 [详细指南](./yaml-example.md)
- **Helm Chart 导入**：适用于完整应用包的场景 [详细指南](./helm-example.md)

### 导出为 Helm Chart

Rainbond 可将平台中的应用导出为标准 Helm Chart 包，便于在其他 Kubernetes 环境中部署或分享：

- [导出 Helm Chart 包指南](./export-chart.md)
