---
title: 升级
Description: 介绍通过主机安装和通过 Helm 安装的 Rainbond 升级版本
keywords:
- Rainbond 版本升级
---

:::info
v5 版本无法直接升级到 v6 版本，请全新安装 v6 版本，再将 v5 版本中的应用迁移到新环境。
1. 在 v5 版本中，通过 `应用视图 -> 应用发布 -> 发布到本地组件库`，将应用发布到本地组件库，然后在 `平台管理 -> 应用市场` 中将应用导出。
2. 在 v6 版本中，通过 `平台管理 -> 应用市场 -> 导入应用`，将应用导入到 v6 版本中。
3. 如部署了数据库类应用，则需要手动迁移数据库。
:::

## 概述

Rainbond 支持界面化的在线升级，通过界面化的在线升级可以快速升级 Rainbond 版本。所有安装方式都支持在线升级。

## 在线升级

:::tip
如存在多个集群，将会全部都升级。
:::

在 **平台管理 -> 企业设置 -> 版本升级** 中，可以查看到当前 Rainbond 版本和最新版本，点击 **去更新** 按钮即可开始升级。

升级过程中 Rainbond 会做如下操作：
1. 滚动升级 Rainbond 组件镜像
2. 如有 SQL 变更，会自动执行 SQL 变更

## 离线升级

:::info
仅适用于离线安装环境。
:::

1. 在有网络的环境下提前准备好 Rainbond 新版本镜像，替换 `<version>` 为要升级的版本号。

```bash
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:<version>-release
registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-api:<version>-release
registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-chaos:<version>-release
registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-mq:<version>-release
registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-worker:<version>-release
```

2. 编辑 `rbdcomponent` CRD资源，将 `spec.image` 字段的镜像地址替换为离线镜像地址。

```yaml
$ kubectl edit rbdcomponent -n rbd-system rbd-app-ui
spec:
  image: registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:<version>-release
```

3. `rbd-api`、`rbd-chaos`、`rbd-mq`、`rbd-worker` 等组件同样替换镜像地址，重复上述步骤。
4. 登录 Rainbond 检查首页版本号是否已经更新至新版本。

## 版本变更日志

您可以在 [历史版本变更日志](https://github.com/goodrain/rainbond/releases) 中查看每个版本的具体变更内容。

