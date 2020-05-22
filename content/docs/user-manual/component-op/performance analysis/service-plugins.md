---
title: 组件插件
description: Rainbond组件插件管理和配置文档
weight: 5015
hidden: true
---

### 组件插件

组件开通插件是对组件治理功能的扩展，插件的定义请查阅文档 [插件管理-插件定义](/docs/user-manual/plugin-manage/plugin-manage/)

当前团队下安装的插件才可以被组件开通，因此插件的使用流程是：

* 团队插件管理安装或添加插件
* 构建构建并设置配置项
* 进入组件管理-插件模块
* 开通已构建完成的插件

目前主要提供了网络治理类和性能分析类的插件。Rainbond默认提供的两个插件配置文档如下：

[1. 性能分析插件](/docs/user-manual/plugin-manage/tcm-plugin/)

[2. 网络治理插件](/docs/user-manual/plugin-manage/mesh-plugin/)

通常情况下组件不能安装重复的同类型插件。

### 插件属性配置

插件的配置根据插件的配置项定义动态渲染而来，比如某个配置项依赖于组件端口，那么在配置面板中组件的每个端口都可以定义配置项的值。

详细说明查阅： [插件配置项说明](/docs/user-manual/plugin-manage/plugin-manage/)
