---
title: 虚拟机部署
description: Rainbond 虚拟机部署
---

### 概述

本章节主要介绍虚拟机的基础环境搭建以及虚拟机插件部署，为在 Rainbond 中使用虚拟机功能作铺垫。

### 环境要求

1. 服务器内核大于 5.x
2. docker 版本大于 24.x
3. 服务器支持嵌套虚拟化。

**注意：** 快速安装的 Rainbond 平台不可使用。


### 基础检测

如果对自己的环境不太清楚上述要求该如何检查，则可以直接执行如下检测脚本。

```bash
wget https://pkg.rainbond.com/vm_check.sh && bash ./vm_check.sh
```

<details>
  <summary>执行脚本后正确输出</summary>
  <div>

```bash
1. 检测服务器内核是否大于5.x
 内核版本大于或等于5.x。正在进行...

 2. 检测是否支持嵌套虚拟化
 支持嵌套虚拟化。正在进行...

 3. 检测 Docker 版本是否是 24.x
[INFO] Docker 服务已经安装在主机上.
 Docker版本大于或等于24.x。正在进行...

 4. 安装虚拟化依赖
 正在安装虚拟化依赖项... 

已加载插件：fastestmirror
Loading mirror speeds from cached hostfile
 * elrepo: mirrors.tuna.tsinghua.edu.cn
软件包 10:qemu-kvm-1.5.3-175.el7_9.6.x86_64 已安装并且是最新版本
没有可用软件包 python-virtinst。
软件包 libvirt-4.5.0-36.el7_9.5.x86_64 已安装并且是最新版本
软件包 libvirt-python-4.5.0-1.el7.x86_64 已安装并且是最新版本
软件包 virt-manager-1.5.0-7.el7.noarch 已安装并且是最新版本
软件包 1:libguestfs-tools-1.40.2-10.el7.noarch 已安装并且是最新版本
软件包 bridge-utils-1.5-9.el7.x86_64 已安装并且是最新版本
软件包 virt-install-1.5.0-7.el7.noarch 已安装并且是最新版本
无须任何处理
 虚拟化环境设置完成。

################################################
 当前服务器内核版本: 5.4.260-1.el7.elrepo.x86_64
 当前docker版本: 24.0.7
################################################
```
  </div>
</details>

#### 问题处理

1. 内核版本低

```bash
wget https://pkg.rainbond.com/ker.sh && bash ./ker.sh
```

2. docker 版本低

```bash
wget https://minio.offends.cn:9000/offends/Binary-file/docker-install-man.sh && ./docker-install-man.sh latest
```

3. 不支持嵌套虚拟化

这个需要更换服务器，例如阿里云服务器可以选择裸金属服务器。

### 部署虚拟机

如果没有安装 Rainbond 需要参考 [安装文档](/docs/installation/)进行部署，不可使用快速安装部署 Rainbond 。


平台管理视图 --> 应用市场视图 --> 开源应用商店 --> 对接开源应用商店 --> 开源应用商店搜索 `Rainbond-VM-beta` 点击安装即可。

<img src="https://static.goodrain.com/docs/5.16.0/vm1.pic.jpg" title="下载虚拟机插件"/>


### 完成部署

至此，虚拟机功能在 Rainbond 平台部署完成。
