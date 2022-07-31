---
title: 组件插件
description: Rainbond组件插件管理和配置文档
---

## 组件插件管理

组件开通插件是对组件治理功能的扩展，插件的定义请查阅文档 [概念-插件](/docs/use-manual/get-start/concept/plugin)

当前团队下安装的插件才可以被组件开通，因此插件的使用流程是：

- 团队插件管理中新增或安装插件（从应用市场中安装应用会自动添加其中的插件到团队中）
- 自研插件需要构建并设置配置项
- 进入组件管理-插件页面，选择需要的插件开通
- 设置插件的内存分配
- 进入插件配置，根据需要进行合理的配置

目前 Rainbond 默认提供了网络治理类和性能分析类的插件。Rainbond 默认提供的两个插件参考文档：

[1. 性能分析插件](/docs/use-manual/team-manage/plugin-manage/tcm-plugin)

[2. 网络治理插件](/docs/use-manual/team-manage/plugin-manage/mesh-plugin)

通常情况下组件不能安装重复的同类型插件。

## 插件属性配置

插件的配置根据插件的配置项定义动态渲染而来，比如某个配置项依赖于组件端口，那么在配置面板中组件的每个端口都可以定义配置项的值。

详细说明查阅： [插件配置项说明](/docs/use-manual/get-start/concept/plugin#插件配置项)
