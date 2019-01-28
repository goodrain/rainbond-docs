---
title: 通过应用市场做应用交付与升级
summary: 基于Rainbond做应用交付与升级
toc: true
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

## 一、 概述

在企业选定Rainbond作为生产交付平台后，如何将开发好的应用交付到最终用户的生产环境中去，就变成了一个非常重要的课题。本文通过实际的测试流程，讲解了如何通过Rainbond应用市场做应用的交付，以及在原始应用有升级后，如何将升级内容同步到其他已经通过原始版本的应用市场部署的应用。

## 二、 基于Rainbond应用市场交付的流程

### 2.1 事先准备

完成这个操作需要两套Rainbond环境。一套作为应用的发布平台，用于应用的发布与升级；另一套作为部署平台，我们将会通过离线导出/导入市场应用的方式，实现应用的交付与升级操作。

本文在写作的时候搭建了两套Rainbond v3.7.2 作为测试环境，来演示与验证通过应用市场做应用交付与升级。

### 2.2 应用的发布与导出

本次测试挑选了一个基于Maven构建的 [spring boot](https://github.com/dazuimao1990/spring-boot-mysql-demo) 项目。搭配了 mysql 组成了一个完整的应用。接下来，将其发布为一个应用市场的应用,并将其导出为包。这里提供本次导出的[测试应用包](http://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/releases/offline/resource/test_app-v1.0.zip)，以供用户进行测试。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/advanced-scenarios/app-delivery-1.gif" width="100%">

### 2.3 应用包的导入

接下来，我们会在一个新的环境导入刚刚导出的应用包。此过程对应了离线环境下，基于Rainbond应用市场的交付场景。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/advanced-scenarios/app-delivery-2.gif" width="100%">

导入完成后，即可以使用[从应用市场构建](/docs/v5.0/user-manual/app-creation/way-of-creation.html#3)，来将导入的包构建为应用。基于Rainbond应用市场的应用交付就完成了。

## 三、 应用市场升级操作

### 3.1 应用的重新发布

对于已发布到应用市场的应用，该如何才能升级呢？这涉及到同一个应用的重复发布。在这里指出很重要的一点：

> 将应用发布到应用市场后，不要将原始应用删除。未来的升级将以原始应用为基础，进行调整。在调整完成后，重新发布到应用市场，即可完成应用市场中应用的升级。

接下来，依然以spring boot为基础，完整的实现一次升级操作。在开始之前，通过未升级的应用市场部署一个应用  `app_delivery`作为测试用例；并为应用的源码仓库添加了一个标示文件 `new_file_for_test` 模拟应用源码发生变更。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/advanced-scenarios/app-delivery-3.png" width="100%">

重新构建来升级原始应用

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/advanced-scenarios/app-delivery-4.gif" width="100%">

重新发布来升级应用市场中的应用

> 需要注意的是，重新发布同一个应用的时候，`版本` 应与原应用保持一致，方视为对原应用的升级；否则，会发布出一个新的应用。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/advanced-scenarios/app-delivery-5.gif" width="100%">

### 3.2 同Rainbond下应用市场部署应用的升级

对于使用了应用市场中应用的首个版本部署的应用 `app_delivery` 。在重新发布应用后，就可以进行升级操作了。Rainbond会自动检测应用市场应用的版本，并体现 `应用升级 `按钮。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/advanced-scenarios/app-delivery-6.gif" width="100%">

### 3.3 不同Rainbond下应用市场应用的升级

对于已交付的其他Rainbond环境，我们在升级了应用后，如何在交付环境中升级呢？我们需要将应用重新导出，再导入到交付环境中去。导出的方式以及介绍过了，这里提供本次导出的[测试应用升级包](http://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/releases/offline/resource/test_app-v1.0%20(1).zip)，以供用户进行测试。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/advanced-scenarios/app-delivery-7.gif" width="100%">

成功将应用市场应用升级后，就可以对已通过原始版本的应用进行升级操作了。