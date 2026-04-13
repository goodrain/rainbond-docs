---
title: 应用部署
description: 汇总 Rainbond 应用部署章节的主要路径、适用场景与文档入口。
keywords:
- Rainbond 应用部署
- Rainbond 部署导航
- Rainbond 源码部署
- Rainbond 镜像部署
- Rainbond YAML 部署
---

Rainbond 提供源码、容器镜像、YAML 等多种应用部署方式，也支持通过 K8s 原生资源管理直接使用原生 YAML 和 Helm。本页汇总整个“应用部署”章节，帮助你快速找到最合适的入口。

## 如何选择部署方式

| 场景 | 推荐方式 | 入口文档 |
| --- | --- | --- |
| 应用代码已经托管在 Git 仓库，希望平台自动构建发布 | 使用源代码部署 | [使用源代码部署](./source-code/index.md) |
| 本地已有源码 ZIP、JAR、WAR 或静态资源包，希望直接上传部署 | 上传本地源码包或软件包 | [本地源码包或软件包部署](./source-code/upload-package.md) |
| 已经有可直接运行的容器镜像 | 使用容器镜像部署 | [容器镜像支持规范](./image/image-example.md) |
| 已有 Kubernetes YAML，希望转换为 Rainbond 应用模型进行治理 | YAML 转换为应用模型 | [K8S 资源到 Rainbond 应用模型的转换原理](./deploy-using-yaml-helm/yaml-convert-ram.md) |
| 已有 Kubernetes YAML，希望保留原生对象结构直接使用 | K8s 原生资源管理 | [使用原生 YAML 创建资源](../k8s-native-resource/yaml-native-create.md) |
| 已有 Helm Chart，希望按 Helm Release 原生方式安装和维护 | K8s 原生资源管理 | [使用 Helm 部署](../k8s-native-resource/helm-native-deploy.md) |
| 需要执行一次性任务或周期性任务 | 部署 Job / CronJob 类型组件 | [部署 Job CronJob 类型组件](./deploy-job.md) |
| 希望通过代码仓库事件实现自动构建与持续交付 | GitOps 自动部署 | [GitOps 自动部署](./gitops.md) |
