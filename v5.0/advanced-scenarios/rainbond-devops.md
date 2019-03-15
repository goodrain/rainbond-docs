---
title: 基于Rainbond实现源码自动部署
summary: 基于Rainbond做DevOps
toc: true
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

## 一、 概述

对于从Github、Gitlab、Gogs、Gitee仓库源码构建的应用， `Rainbond` 提供基于WEBHOOKS的自动部署功能。

## 二、 应用实例

### 2.1 场景

Rainbond官方文档系统部署在我们的公有云环境中。现在以此场景为例，演示如何实现源码的自动部署。

- 项目源码地址： [rainbond-docs](https://github.com/goodrain/rainbond-docs)

- 部署情况

<img src="https://static.goodrain.com/images/docs/5.0/operation-manual/rainbond-docs1.png" style="border:1px solid #eee;width:85%">

> 部署完成后，按照以下步骤配置webhooks

- 构建源与自动部署配置

<img src="https://static.goodrain.com/images/docs/5.0/operation-manual/rainbond-docs2.png" style="border:1px solid #eee;width:85%">

> 配置完成后，前往Github继续配置

- 配置Github的Webhooks

<img src="https://static.goodrain.com/images/docs/5.0/operation-manual/rainbond-docs3.png" style="border:1px solid #eee;width:85%">

值得注意的是：
`Content type` 选项务必选择 `application/json`

> 配置完成

### 2.2 触发方式

> webhook配置完成后，再次提交代码，当Commmit信息包含“@deploy”时将自动触发应用自动部署

### 2.3 触发测试

- 提交信息

<img src="https://static.goodrain.com/images/docs/5.0/operation-manual/rainbond-docs4.png" style="border:1px solid #eee;width:85%">

- 成果

这篇文档在提交代码后无需任何其他操作即可上线，即是触发自动部署的成果。