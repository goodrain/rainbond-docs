---
title: 服务构建源设置
description: Rainbond服务的构建源设置和各语言编译参数配置文档
weight: 5017
hidden: true
---

### 服务构建源

Rainbond内置服务创建有三种模式：[源码](/user-manual/app-creation/service_create/#从源码创建)、[镜像](/user-manual/app-creation/service_create/#从docker镜像创建)和[应用市场](/user-manual/app-creation/service_create/#从应用市场安装)，它们分别具有不同的属性提供配置。

* 源码
> 源码的构建源配置参数将是最为丰富的，包括基础的代码仓库信息包括（仓库地址，分支，Tag, 授权信息等)
>
> 还有各语言的编译环境参数

* 镜像
> 镜像的可配置参数主要是镜像地址，仓库信息和镜像启动命令等

* 应用市场
> 从应用市场安装的服务不提供更多的参数配置，主要展示来源于哪个云市应用。

### 构建源检测

服务创建时对构建源进行语言检测，在后续的持续开发中，如果源码更改了语言类型，比如从Java-Maven类型更改为Dockerfile类型，需用执行重新检测源码操作，让Rainbond重新设定服务的编译方式才能生效。

> Rainbond在源码编译过程中不会重新识别语言类型、

### 自动构建设置

自动构建即通过一种方式自动触发Rainbond服务版本构建的操作，详细文档见[服务自动构建](/user-manual/app-service-manage/auto-deploy/)

### 构建参数设置

#### JAVA语言类型

| 参数名称 | 默认值 | 可选值 | 说明 |
| -------- | ------ | ------ | ---- |
| JDK版本  | 1.8    |        |      |
|          |        |        |      |
|          |        |        |      |



#### Dockerfile语言类型

支持ARG参数设置

