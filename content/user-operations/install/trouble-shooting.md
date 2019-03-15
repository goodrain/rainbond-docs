---
title: "集群安装诊断FAQ"
weight: 1006
description: 当安装升级 Rainbond 遇到问题时，请先参考本篇文档。如果问题未解决，请按要求收集必要的信息通过社区反馈给Rainbond开发者。
hidden: true
---

当安装升级 Rainbond 遇到问题时，请先参考本篇文档快速索引部分。如果问题未解决，请按要求收集必要的信息通过[社区(用户帮助)](https://t.goodrain.com/) 提供给Rainbond开发者。

#### 如何给Rainbond开发者报告错误

```yaml

Rainbond版本:
操作系统:
内核版本:
环境:(云服务商,实体机,虚拟机等，是否为全新环境，如果不是，部署了其他什么服务)
节点配置(CPU核数,内存大小,硬盘类型(SSD/机械硬盘),网络类型,网络拓扑):
安装类型:
如何复现:
尝试解决: 
相关截图:

```

#### 快速索引

##### 安装时如下自定义SSH

```
export INSTALL_SSH_PORT=12306
./grctl init
```

