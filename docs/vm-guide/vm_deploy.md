---
title: 虚拟机部署
description: Rainbond 虚拟机部署
keywords: 
- Rainbond
- 虚拟机
- kubevirt部署
---

:::caution
**注意:** 快速安装的 Rainbond 不可使用虚拟机。
:::

## 概述

本章节主要介绍虚拟机的基础环境搭建以及虚拟机插件部署，为在 Rainbond 中使用虚拟机功能作铺垫。


## 环境要求

* 服务器内核必须 > 5.x，[Centos内核升级参阅](https://t.goodrain.com/d/9-centos)
* Docker 版本必须 > 24.x
* 服务器必须支持虚拟化，使用以下命令检查是否支持虚拟化
  ```bash
  egrep -c '(vmx|svm)' /proc/cpuinfo
  # 输出不为 0 则支持虚拟化
  ```
* 安装虚拟机所需依赖
  ```bash
  yum install -y qemu-kvm python-virtinst libvirt libvirt-python virt-manager libguestfs-tools bridge-utils virt-install
  ```

## 部署虚拟机

如果没有安装 Rainbond 需要参考 [安装文档](/docs/installation/)进行部署，不可使用快速安装部署 Rainbond 。


平台管理视图 --> 应用市场视图 --> 开源应用商店 --> 对接开源应用商店 --> 开源应用商店搜索 `Rainbond-VM-beta` 点击安装即可。

<img src="https://static.goodrain.com/docs/5.16.0/vm1.pic.jpg" title="下载虚拟机插件"/>


## 完成部署

至此，虚拟机功能在 Rainbond 平台部署完成。
