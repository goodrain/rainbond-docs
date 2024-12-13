---
title: 迁移控制台
description: This document describes the high level of the console available for the experience of the migration console to the high available cluster environment.
keywords:
  - Rainbond Console High Installation Available
---

:::tip
如果你的 Rainbond 集群是通过 Helm Chart 安装的，那么无需迁移控制台，无需进行本文档的操作。
:::

[快速安装](/docs/quick-start/quick-install)的 Rainbond 控制台是由 Docker 启动的，无法实现高可用部署，本文介绍如何将 Docker 启动的控制台迁移到 K8s 集群中以 POD 方式运行。

## Prerequisite

- [快速安装 Rainbond](/docs/quick-start/quick-install) 并对接[主机安装](/docs/installation/install-with-ui/)的集群。

## 启动新控制台

:::warning
快速安装的 Rainbond 控制台默认提供了内置集群，如您在内置集群中创建了应用，请将应用都迁移到对接的集群中。

您可以通过 `应用视图 -> 快速复制` 功能将应用从内置集群迁移到对接的集群中。应用后产生的数据需自行迁移，如数据库等。
:::

在对接的 K8s 集群中启动新的 Rainbond 控制台，请在管理节点上使用 [kubectl](https://docs.rke2.io/reference/cli_tools) 命令行工具执行以下命令。

```yaml title="kubectl apply -f rbd-app-ui.yaml"
apiVersion: rainbond.io/v1alpha1
kind: RbdComponent
metadata:
  labels:
    belongTo: rainbond-operator
    creator: Rainbond
    name: rbd-app-ui
  name: rbd-app-ui
  namespace: rbd-system
spec:
  env:
  - name: DB_TYPE
    value: mysql
  image: registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:<version>-release
  imagePullPolicy: IfNotPresent
  priorityComponent: false
  replicas: 1
```

默认使用 `rbd-db` 数据库，如需使用外部数据库请修改 `rainbondcluster` 资源。

```yaml title="kubectl edit rainbondcluster -n rbd-system"
...
spec:
  ...
  uiDatabase:
    host: 172.20.251.90
    name: console
    password: Root123456
    port: 3306
    username: root
```

## Backup console data

### Backup old console data

在旧控制台的 `平台管理 -> 设置 -> 数据库备份`，增加备份后并下载。

### Import backups to new console

在新控制台的 `平台管理 -> 设置 -> 数据库备份 -> 导入备份`，导入成功后点击 `恢复`。You will need to `exit login` after your recovery and login with your old console.

此时新控制台中已经不存在**内置集群**，您需要在`平台管理 -> 集群` 中删除**内置集群**。
