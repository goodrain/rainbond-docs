---
title: 团队内资源管理
description: 了解团队视角下 K8s 原生资源管理页面的组织方式、常见资源与使用方式。
keywords:
- 团队内资源管理
- K8s 原生资源页面
- Namespace 资源管理
---

团队内资源管理用于统一查看当前团队对应 Namespace 下的原生资源。无论资源来自 YAML 创建、Helm 安装，还是对接已有 Namespace 后保留的原生对象，都会在这里按照资源类型进行分类管理。

## 页面定位

团队内页面解决的是“一个团队如何管理自己的 Namespace 内资源”的问题，核心目标包括：

- 统一查看团队下的原生对象
- 按资源类型快速定位问题
- 保持原生语义，不强制转换为平台应用模型

## 常见资源分类

通常会按以下页签组织资源：

- Helm 应用
- 工作负载
- 容器组
- 网络
- 配置
- 存储

## 各资源页签说明

### Helm 应用

用于查看团队下的 Helm Release，包括 Release 名称、Chart、状态、版本、所属 Namespace 和更新时间。适合先确认 Helm 安装、升级和卸载的整体结果。

![Helm 应用视图](/docs/how-to-guides/k8s-native-resource/helm-apps.png)

### 工作负载

用于查看 Deployment、StatefulSet、DaemonSet、Job、CronJob 等工作负载对象。适合确认副本状态、镜像版本和运行是否正常。

![工作负载视图](/docs/how-to-guides/k8s-native-resource/workloads.png)

进入工作负载详情后，通常可以继续查看以下信息：

- 概览
- 容器列表
- 访问方式
- 事件信息
- 日志
- YAML
- Web 终端

![工作负载详情](/docs/how-to-guides/k8s-native-resource/workload-details.png)

### 容器组

用于查看 Pod 级别的运行情况。遇到镜像拉取失败、反复重启、探针异常、调度失败等问题时，通常需要到这里进一步定位。

![容器组视图](/docs/how-to-guides/k8s-native-resource/pods.png)

进入容器组详情后，通常也可以继续查看以下信息：

- 概览
- 容器列表
- 访问方式
- 事件信息
- 日志
- YAML
- Web 终端

![容器组详情](/docs/how-to-guides/k8s-native-resource/pod-logs.png)

在容器组详情中的 Web 终端里，用户可以直接查看容器内的进程、网络、配置文件和挂载情况，适合用于进一步排查运行时问题。

### 网络

用于查看 Service、Ingress、NetworkPolicy 等网络资源。适合排查访问入口、域名路由、服务发现和网络隔离相关问题。

![网络资源视图](/docs/how-to-guides/k8s-native-resource/network.png)

### 配置

用于查看 ConfigMap、Secret、ServiceAccount 等配置类资源。适合核对环境变量、配置文件、密钥和运行身份依赖是否齐全。

![配置资源视图](/docs/how-to-guides/k8s-native-resource/configmap.png)

### 存储

用于查看 PVC 等和业务数据相关的资源。适合确认存储是否已成功申请、是否已经绑定，以及是否满足工作负载启动条件。

![存储资源视图](/docs/how-to-guides/k8s-native-resource/pvc.png)

## 推荐使用方式

建议将团队内资源管理当作一个统一的原生控制台来使用：

1. 先从 Helm 应用或工作负载确认整体状态
2. 需要看实例运行情况时进入容器组
3. 访问异常时检查网络资源
4. 配置错误时检查 ConfigMap、Secret 等配置资源
5. 涉及数据卷时检查 PVC 与存储相关对象

## 与 Rainbond 应用视图的区别

K8s 原生资源管理关注的是 Namespace 内的原生对象，不强调“应用拓扑”或“组件编排”视图。换句话说，这里更像一个面向 Kubernetes 资源本身的工作台。

如果您的目标是使用应用拓扑、组件依赖、应用级治理等能力，请继续使用 Rainbond 应用部署与应用管理相关功能。

## 排查问题的建议顺序

出现故障时，可以按以下顺序检查：

1. Helm 应用是否安装或升级成功
2. 工作负载副本是否达到预期
3. 容器组是否存在调度、拉镜像或重启异常
4. 网络资源是否正确暴露服务
5. 配置资源是否缺失或引用错误
6. 存储资源是否绑定成功

## 使用建议

- 先从团队视图确认目标 Namespace 是否正确
- 优先从 Helm 应用或工作负载确认整体状态，再逐步下钻到容器组
- 发生访问异常时先检查网络资源，发生启动异常时重点检查配置与存储
- 团队内页面主要面向业务资源管理，涉及默认 StorageClass、PV 或其他集群级对象时，建议切换到平台管理下的存储管理视图
