---
title: ITest Work(测试工具)
description: 本文介绍开源应用ITest Work
weight: 7001
---

### 1.ITest Work简介

[ITest Work](http://www.itest.work/) (爱测试) 一站式工作站让测试变得简单、敏捷,“好用、好看，好敏捷” ,是ITest Work 追求的目标。ITest Work 包含极简的任务管理，测试管理，缺陷管理，测试环境管理，接口测试，接口Mock 6合1，又有丰富的统计分析。可按测试包分配测试用例执行，也可建测试迭代(含任务，测试包，BUG，接口)来组织测试工作，也有测试环境管理，还有很常用的测试度量；对于发版频繁，需求常变，ITest还可导出用例，线下修改、执行，新增后再导入（同步）到线上；且可根据测试策略来设置测试流程，并可实时调整；在测试看板中，能查看迭代报告，测试包执行情况，测试任务进展，也可以在看板上直接执行用包用例，也支持在线web 思维导图写用例。

### 2.通过Rainbond应用商店快速安装ITest Work

* 在开源应用商店中搜索 `itest`，点击安装

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.4/opensource-app/itest/itest-install.png)

* 应用安装后存在两个服务访问地址，其中`itest`组件为主服务，`jmeter`是子服务，需要在应用配置组中配置`jmeter`服务的访问地址。
* 进入安装`ITest Work`应用中，点击左侧配置进入应用配置组，找到名称为`dbconnection` 的配置组，编辑修改`JMETER_URL` 值为 `jmeter` 服务的URL，保存并更新。

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/docs/5.4/opensource-app/itest/itest-config.png)

* 应用安装成功后，默认账号密码为：
  * 账号：admin
  * 密码：admin


