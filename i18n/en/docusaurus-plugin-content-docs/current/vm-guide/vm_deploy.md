---
title: 虚拟机部署
description: Rainbond 虚拟机部署
keywords:
  - Rainbond
  - 虚拟机
  - kubevirt部署
---

:::caution
**注意:** 快速安装的 Rainbond 不可使用虚拟机功能。
:::

## 概述

本章节主要介绍虚拟机的基础环境搭建以及虚拟机插件部署，为在 Rainbond 中使用虚拟机功能作铺垫。

## 环境要求

- 服务器内核必须 > 5.x，[Centos内核升级参阅](https://t.goodrain.com/d/9-centos)
- Docker 版本必须 > 24.x
- 服务器必须支持虚拟化，使用以下命令检查是否支持虚拟化
  ```bash
  egrep -c '(vmx|svm)' /proc/cpuinfo
  # 输出不为 0 则支持虚拟化
  ```

## 部署虚拟机

如果没有安装 Rainbond 需要参考 [安装文档](/docs/installation/)进行部署，不可使用快速安装部署 Rainbond 。

平台管理视图 --> 应用市场视图 --> 开源应用商店 --> 对接开源应用商店 --> 开源应用商店搜索 `Rainbond-VM` 点击安装即可。

<img src="https://static.goodrain.com/docs/5.16.0/vm1.jpg" title="下载虚拟机插件"/>

## 配置虚拟机web终端地址

1. 部署完成后，需要配置所有虚拟机跳转的 web 终端地址，我们需要找到从应用市场中部署的 Rainbond-VM 应用，在其中找到 virtvnc 组件，进入组件视图找到端口一栏获取访问策略地址。

<img src="https://static.goodrain.com/docs/5.16.0/vm_vnc.jpg" title="虚拟机web终端"/>

2. 将获取到的地址，按照下图指引，找到虚拟机插件的配置文件，配置并替换其中的 `access_urls` 属性字段后点击保存即可。

<img src="https://static.goodrain.com/docs/5.16.0/vm_vnc2.jpg" title="web 终端配置"/>

3. 添加虚拟机配置文件。

依然在虚拟机应用下的 k8s资源视图中，点击添加按钮，将下方内容进行粘贴并确定创建。

```bash
apiVersion: kubevirt.io/v1
kind: KubeVirt
metadata:
  annotations:
    kubevirt.io/latest-observed-api-version: v1
    kubevirt.io/storage-observed-api-version: v1
  finalizers:
  - foregroundDeleteKubeVirt
  name: kubevirt
spec:
  certificateRotateStrategy: {}
  configuration:
    developerConfiguration: {}
  customizeComponents: {}
  imagePullPolicy: IfNotPresent
  imagePullSecrets:
  - name: rbd-hub-credentials
  workloadUpdateStrategy: {}
```

## 完成部署

至此，虚拟机功能在 Rainbond 平台部署完成。
