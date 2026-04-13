---
title: 迁移控制台
description: 该文档描述控制台高可用，适用于从体验环境迁移控制台到高可用集群环境。
keywords:
- Rainbond 控制台高可用安装
---

本文档针对通过[快速安装](/docs/quick-start/quick-install)的 Rainbond 在通过[主机安装](/docs/installation/install-with-ui)对接了多集群后，想把迁移控制台到 K8s 集群中以 POD 方式运行的场景。

## 启动新控制台
:::warning
快速安装的 Rainbond 控制台默认提供了内置集群，如您在内置集群中创建了应用，请将应用都迁移到对接的集群中。

您可以通过 `应用视图 -> 快速复制` 功能将应用从内置集群迁移到对接的集群中。应用后产生的数据需自行迁移，如数据库等。
:::

在对接的 K8s 集群中启动新的 Rainbond 控制台，请在管理节点上使用 [kubectl](https://docs.rke2.io/reference/cli_tools) 命令行工具执行以下命令。`<version>` 在 [Rainbond Release](https://github.com/goodrain/rainbond/releases) 中查看。

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
  - name: IS_STANDALONE
    value: "false"
  image: registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:<version>
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

## 备份恢复控制台数据

### 备份旧控制台数据

在旧控制台的 `平台管理 -> 设置 -> 数据库备份`，增加备份后并下载。

### 导入备份到新控制台

在新控制台的 `平台管理 -> 设置 -> 数据库备份 -> 导入备份`，导入成功后点击 `恢复`。恢复成功后需要`退出登录`，使用旧控制台的账号信息登录。

此时新控制台中已经不存在**内置集群**，您需要在`平台管理 -> 集群` 中删除**内置集群**。

:::danger
控制台迁移后，内置集群将不再可用，请确保恢复备份后的控制台中存在正常进入的团队，否则登录时将匹配不到对应的团队，导致登录失败。
:::