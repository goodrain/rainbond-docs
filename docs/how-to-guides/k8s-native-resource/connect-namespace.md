---
title: 对接已有 Namespace
description: 将已有 Kubernetes Namespace 对接到团队，以便继续按原生方式管理资源。
keywords:
- 对接已有 Namespace
- 团队绑定 Namespace
- Namespace 管理
---

对接已有 Namespace 的作用，是将一个已经存在的 Kubernetes Namespace 直接交给某个团队管理。完成对接后，团队可以在 `K8s 原生资源管理` 中查看和维护该 Namespace 下的原生资源。

## 什么时候使用

以下场景建议使用对接已有 Namespace：

- 集群中已经存在一个业务 Namespace，希望在 Rainbond 中继续管理
- 团队原本就通过 Helm 或 YAML 管理资源，希望迁入 Rainbond 后仍保持原生方式
- 希望先建立团队与 Namespace 的管理边界，再逐步梳理资源

## 与其他入口的区别

| 功能 | 适用场景 | 是否转换为 Rainbond 模型 |
| --- | --- | --- |
| 新建团队 | 创建新的团队空间 | 否 |
| 对接已有 Namespace | 将现有 Namespace 绑定给团队 | 否 |

## 前提条件

- 目标 Namespace 已存在于集群中
- 该 Namespace 尚未被其他团队接管
- 当前账号具备创建团队或管理团队的权限
- 集群侧允许 Rainbond 访问并管理该 Namespace 下的资源

## 操作步骤

1. 进入创建团队页面
2. 选择 `对接已有 Namespace`
3. 填写团队名称
4. 选择目标集群
5. 从可选列表中选择要对接的 Namespace
6. 确认创建

创建完成后，团队与该 Namespace 将建立映射关系，后续在团队中的 `K8s 原生资源管理` 页面即可查看和维护该 Namespace 下的资源。

![对接已有 Namespace](/docs/how-to-guides/k8s-native-resource/docking-ns.png)

## 对接后的行为

- Rainbond 不会将该 Namespace 下的资源自动转换为应用或组件
- 已存在的 Deployment、Service、Ingress、PVC 等资源仍保持原生对象形态
- 后续新建的 YAML、Helm Release 和其他原生资源，也默认落在该团队对应的 Namespace 中

## 建议做法

- 对接完成后，优先检查工作负载、网络、配置和存储资源是否齐全
- 如果 Namespace 中已经存在 Helm Release，建议先从 Helm 应用视图核对状态
- 如果 Namespace 中依赖了特定 StorageClass，先确认平台侧默认存储策略是否符合预期

## 注意事项

- 不建议将同一个 Namespace 交给多个团队重复管理
- 对接 Namespace 解决的是“管理边界”问题，不等于“资源模型转换”
