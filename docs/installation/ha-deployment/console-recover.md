---
title: 控制台高可用
description: 该文档描述控制台高可用，适用于从体验环境迁移控制台到高可用集群环境。
keywords:
- Rainbond 控制台高可用安装
---

:::tip
如果你的 Rainbond 集群是通过 Helm Chart 安装的，那么控制台已经高可用，无需进行本文档的操作。
:::

基于主机安装的控制台，是由 Docker 启动，无法实现高可用部署，故需要将 Docker 启动的控制台迁移到集群中，这篇文档便详细的介绍了如何将 Docker 启动的控制台迁移到集群中以 POD 方式运行。
## 前提

* Rainbond 控制台是通过 Allinone 部署的
* 已经安装好的高可用 Rainbond 集群
* [grctl](/docs/ops-guide/tools/grctl) >= 5.10.1
## 使用 grctl 迁移控制台

```bash
grctl migrate -p 7071 -r 1 \
-i registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.10.1-release-allinone
```
:::info
迁移完成后会在 `rbd-system` 命名空间下启动 `rbd-app-ui` 的 POD，等待 Running 后通过 网关IP:7071 访问新控制台。
:::

### 指定外部数据库

如不指定外部数据库则默认使用 `rbd-db`，如需为控制台指定外部数据库，通过 `-e MYSQL_HOST`... 指定。

```bash
grctl migrate -p 7071 -r 1 \
-i registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.10.1-release-allinone \
-e MYSQL_HOST=127.0.0.1 \
-e MYSQL_PORT=3306 \
-e MYSQL_PASS=123456 \
-e MYSQL_DB=console
```
### grctl migrate 参数说明

| 参数                      |        用途         |       默认值        |
| ------------------------ | --------------------|-------------------|
| -p，port                  |     外部访问端口       |       7070        |
| -e，env                   |        环境变量        |                  |
| -a，arg               |         参数           |                  |
| -r，replicas              |         实例数         |        1         |
| -i，image               |       控制台镜像       |   registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.10.1-release-allinone          |


## 备份恢复控制台数据

### 备份旧控制台数据

在旧控制台的 **平台管理 -> 设置 -> 数据库备份**，增加备份后并下载。

### 导入备份到新控制台

在新控制台的 **平台管理 -> 设置 -> 数据库备份 -> 导入备份**，导入成功后点击 `恢复`。恢复成功后需要`退出登录`，使用旧控制台的账号信息登录。

## 已知问题

迁移控制台后，恢复备份时从主机安装的 Kubernetes 集群信息不会被恢复，需手动拷贝集群安装信息。

```bash
export APP_UI=`kubectl get pod -n rbd-system |grep rbd-app-ui|grep Running|awk '{print $1}'`
kubectl cp ~/rainbonddata/cloudadaptor/enterprise $APP_UI:/app/data/cloudadaptor -nrbd-system
```

进入企业视图  > 集群 > 节点配置，节点信息存在则成功。