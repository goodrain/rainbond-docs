---
title: 问题定位
weight: 30001
Description: "定位当前问题，并引导向指定的问题诊断文档"
hidden: false
pre: "<b>7.1 </b>"
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

#### 集群状态确认

安装完成后，通过命令 `grctl cluster` 确认集群状态。

在返回结果列表中发现有任意 **红色字体**，请参考 [集群问题排查](/troubleshoot/cluster-problem/)