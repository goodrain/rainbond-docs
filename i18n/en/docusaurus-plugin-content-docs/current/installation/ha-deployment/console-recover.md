---
title: Console high availability
description: This document describes console high availability and is suitable for migrating the console from an experience environment to a high availability cluster environment.
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
* 确保集群内资源大于 2GB
* 已安装 [grctl](/docs/ops-guide/tools/grctl) 工具

## 集群中部署控制台

### 背景

基于主机安装的控制台，是由 docker 启动，无法实现高可用部署，故需要将 docker 启动的控制台迁移到集群中，这篇文档便详细的介绍了如何将 docker 启动的控制台迁移到集群中。
### 实现介绍

:::tip
1. 生成一个rbdcomponent 资源类型的 rbd-app-ui 的模版。
2. 解析命令所携带的参数并渲染到 rbdcomponent 资源类型的 rbd-app-ui 的模版上，并在集群中创建该资源。
3. rainbond-operator 会检测到 rbdcomponent 资源类型的 rbd-app-ui 的创建，从 rbdcomponent 资源类型的 rbd-app-ui 中获取信息( env 、label 、arg ...)
4. 创建 service 、ingress资源实现对外暴露端口。如果你在命令中制定了 `-p` 来选择对外暴露的端口，则会在创建的 service 和 ingress 资源中生效。
5. 启动一个 job 类型资源，job 会完成初始化数据库以及创建 deployment 资源类型的 rbd-app-ui 等一系列工作。rbd-app-ui 默认使用的是 rbd-db 作为 console 数据库，如果在通过 `-e` 指定了外部数据库的连接方式，则会切换至外部数据库。
:::

### grctl migrate 支持参数

| 参数                      |        用途         | 默认值                                                                          |
| ------------------------ | --------------------|------------------------------------------------------------------------------|
| port/p                   |     外部访问端口       | 7070                                                                         |
| env/e                   |        环境变量        |                                                                              |
| arg/a                   |         参数           |                                                                              |
| replicas/r              |         实例数         | 1                                                                            |
| image/i                 |       控制台镜像       | registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.17.1-release-allinone |

### 使用 grctl 迁移命令

```bash
grctl migrate -i registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.17.1-release-allinone -p 7071 -r 1

```
:::info
迁移完成后会在 `rbd-system` 命名空间下启动 `rbd-app-ui` 的 POD，等待 Running 后通过 网关IP:7071 访问新控制台。
:::

### 指定外部数据库

如不指定外部数据库则默认使用 `rbd-db`，如需为控制台指定外部数据库，通过 `-e MYSQL_HOST`... 指定。

```bash
grctl migrate -p 7071 -r 1 \
-i registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.17.1-release-allinone \
-e MYSQL_HOST=127.0.0.1 \
-e MYSQL_PORT=3306 \
-e MYSQL_USER=root \
-e MYSQL_PASS=123456 \
-e MYSQL_DB=console
```
### grctl migrate 参数说明

| 参数                      |        用途         | 默认值                                                                          |
| ------------------------ | --------------------|------------------------------------------------------------------------------|
| -p，port                  |     外部访问端口       | 7070                                                                         |
| -e，env                   |        环境变量        |                                                                              |
| -a，arg               |         参数           |                                                                              |
| -r，replicas              |         实例数         | 1                                                                            |
| -i，image               |       控制台镜像       | registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.17.1-release-allinone |


## 备份恢复控制台数据

### 备份旧控制台数据

在旧控制台的 **平台管理 -> 设置 -> 数据库备份**，增加备份后并下载。

### 导入备份到新控制台

在新控制台的 **平台管理 -> 设置 -> 数据库备份 -> 导入备份**，导入成功后点击 `恢复`。恢复成功后需要`退出登录`，使用旧控制台的账号信息登录。

## 已知问题

迁移控制台后，恢复备份时从主机安装的 Kubernetes 集群信息不会被恢复，需手动拷贝集群安装信息。

```bash
export APP_UI=`kubectl get pod -n rbd-system |grep rbd-app-ui|grep Running|awk '{print $1}'`
kubectl cp ~/rainbonddata/cloudadaptor/enterprise $APP_UI:/app/data/cloudadaptor -n rbd-system
```

进入企业视图  > 集群 > 节点配置，节点信息存在则成功。