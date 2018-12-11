---
title: 应用异常事件监控
summary: 应用异常事件监控
toc: true
---

## 一、 简介

应用异常事件监控是捕捉并记录在RainBond中部署应用的OOM，运行异常情况等事件。便于发现并调整存在异常的应用，避免由于应用的持续异常影响资源及各服务的正常工作。

## 二、 实现机制

Rainbond实现的worker组件中，对应用实例出的pod进行状态观察，当pod发生异常退出时触发事件来处理pod的退出信息，并将错误类型、错误原因、触发次数、最后出现时间等信息记录在数据库中供我们查询。

## 三、 grctl中查询未处理的应用异常事件

你可以使用Rainbond的命令行工具`grctl` 来查询未处理应用的异常事件。

使用 `grctl msg get` 默认获取`三天内`未处理的应用异常事件，如果你需要查询某时间段的异常事件，可以使用`--st`和`--et` 分别指定开始时间戳与结束时间戳，如果只有开始时间并不指定结束时间，则结束时间默认为当前时间。

> 示例 `grctl msg get --st 1539267839 --et 1544538239`

<img src="https://static.goodrain.com/images/docs/5.0/operation-manual/grctl-msg.png" width="100%" />

## 四、 处理应用异常

当把出现异常事件的应用处理完毕后，可将该应用相关的异常事件修改为`已处理`状态。

在grctl命令行工具中使用命令`grctl msg handle -n [ServiceName] -m [HandleMessage]`  将某应用的异常事件标记为已处理。使用`-- ServiceName`或`- n`指定要处理应用的应用别名，使用`-- HandleMessage`或`- m `指定处理信息，次参数为可选项。

> 示例 `grctl msg handle -n gr9c80c9 -m '应用已处理'`
