---
title: Jar、War包部署组件
description: 本文讲述Jar、War包部署组件的要点，适用于开发者和运维人员。
---

### 概述

本节主要介绍通过上传jar、war包创建组件.

目的在于项目打包成jar、war后，可以方便、快速的部署到Rainbond上.

### 先决条件

本地打包好的并且可以正常运行的 Jar、war 包.

### 使用流程

功能入口
<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-create/package-support/Pasted%20Graphic.png" title="功能入口"/>

1、填写组件信息，点击上传文件
<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-create/package-support/Pasted%20Graphic%201.png" title="上传文件"/>
<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-create/package-support/Pasted%20Graphic%202.png" title="上传文件"/>

2、检测构建方式和语言类型
<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-create/package-support/Pasted%20Graphic%203.png" title="检测构建方式和语言类型"/>

3、创建、构建、启动成功
<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-create/package-support/Pasted%20Graphic%204.png" title="创建、构建、启动成功"/>

4、点击访问策略
<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-create/package-support/Pasted%20Graphic%205.png" title="访问端口"/>
5、访问成功
<img src="https://static.goodrain.com/docs/5.8/docs/use-manual/component-create/package-support/Pasted%20Graphic%206.png" title="访问成功"/>


详细了解Rainbond是怎么处理Jar、War包的参考源码构建中的[基于源代码Java Jar包部署组件](../language-support/java/java-jar)