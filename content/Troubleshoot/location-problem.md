---
title: 问题定位
weight: 30001
Description: "定位当前问题，并引导向指定的问题诊断文档"
hidden: false
pre: "<b>6.1 </b>"
---

<div id="toc"></div>

### 问题如何定位

我们可以将Rainbond的使用分为若干个阶段，并将用户使用时遇到的问题按阶段进行分配。

#### 安装报错了

该阶段用户正在安装一个Rainbond集群，你可能正在执行如下的命令时报错了：

```bash 
./grctl init ···
```
或者
```bash 
grctl node add ···
```
或者
```bash
grctl node install ···
```

这类情况请参考 [安装问题排查](/troubleshoot/install-problem/)

一旦安装过程正常完成，没有任何报错，则进入下一阶段。

#### 集群状态确认

安装完成后，通过命令 `grctl cluster` 确认集群状态。

在返回结果列表中发现有任意 **红色字体**，请参考 [集群问题排查](/troubleshoot/cluster-problem/)

集群状态如果确认为正常，则进入下一阶段。

#### 组件构建问题排查

当我们确认集群已经运行正常，接下来，就该进入构建自己组件的阶段。在构建过程中如果遇到任何报错，请参考 [组件构建排查](/troubleshoot/location-problem-copy/) 。

一旦所构建的组件总览页面中的操作日志，显示 **构建完成** ，则进入下一阶段。

#### 组件运行问题排查

当一个组件的操作日志显示 **构建完成** ，但是组件运行状态却显示 **运行异常** 或者 **部分实例运行异常**。请参考 [组件运行排查](/troubleshoot/app-run-problem/) 。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/Troubleshoot/location-problem-1.png" width="100%">

#### 控制台问题排查

当在控制台执行一项操作，但是操作执行失败并提示 **请求错误**。请参考 [控制台问题排查](/troubleshoot/app-ui-problem/)。
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/Troubleshoot/app-ui-problem-1.png" width="100%">

