---
title: 组件特性管理
description: 组件高级特性管理的说明与使用
---

组件运行环境的高级需求在 Rainbond 中需要在组件特性中进行定义。特性的可选项与 Rainbond 集群端的 API Feature 配置直接关联，目前支持以下特性：

- privileged

  > 特权容器，标记了此标签后组件的业务容器采用特权模式运行。

- Windows

  > Windows 容器，标记了此标签后组件运行实例将调度到 Windows 节点运行。
