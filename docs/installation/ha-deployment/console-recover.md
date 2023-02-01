---
title: 控制台高可用
description: 该文档描述控制台高可用，适用于从体验环境迁移控制台到高可用集群环境。
keywords:
- Rainbond 控制台高可用安装
---

:::tip
如果你的 Rainbond 集群是通过 Helm Chart 安装的，那么控制台已经高可用，无需进行本文档的操作。
:::

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

| 参数                      |        用途         |       默认值        |
| ------------------------ | --------------------|-------------------|
| port/p                   |     外部访问端口       |       7070        |
| env/e                   |        环境变量        |                  |
| arg/a                   |         参数           |                  |
| replicas/r              |         实例数         |        1         |
| image/i                 |       控制台镜像       |   registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.11.0-release-allinone          |

### 使用 grctl 迁移命令

```bash
grctl migrate -i registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.11.0-release-allinone -p 7071 -r 1
```

:::tip
* 迁移安装的控制台默认使用的镜像是最新版本，迁移之前查看自己的控制台镜像是否为最新版，如果是旧版本迁移一定要通过参数 `-i` 指定镜像。
* 迁移控制台所占用的端口通过 `-p` 来设置，默认会使用 7070 端口，如果被占用则需要重新指定。
* 实例数通过 `-r` 来设置。
:::

**注意: ** 如果需要指定外部的 MYSQL 数据库则需要按照以下格式进行配置。

```bash
grctl migrate -p 7071 -e MYSQL_HOST=127.0.0.1 -e MYSQL_PORT=3306 -e MYSQL_PASS=123456 -e MYSQL_DB=console
```

如果未指定外部存储，则会使用 rbd-db 作为 console 的数据库。你需要提前在此数据库中创建 console 数据库。控制台所有的数据都将存入该库。

```bash
 export DBPOD=`kubectl get pod -n rbd-system |grep rbd-db|awk '{print $1}'`
 kubectl exec -ti $DBPOD -n rbd-system bash
 mysql -p$MYSQL_ROOT_PASSWORD
 CREATE DATABASE console  DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 备份老控制台的数据

回到老控制台的企业视图 -> 设置页面，切换到数据备份页面。如下图所示：

![image-20210221110158065](https://static.goodrain.com/images/5.3/data-backup.png)

点击`增加备份`,备份老控制台的最新数据。

![image-20210221110748507](https://static.goodrain.com/images/5.3/down-backup-date.png)

备份成功后如上图所示出现一条备份记录，点击下载将备份数据下载到本地备用。

### 导入数据到新控制台

1. 访问在 Rainbond 中部署的新控制台，同样进入到数据备份页面，点击导入备份，上传上一步下载的备份数据。

2. 上传成功后点击`恢复`，将数据导入到新的控制台中。恢复成功后需要`退出登录`，使用老控制台的账号信息登录。你将会发现数据已经迁移成功。

到此控制台迁移已经完成，你可以使用平台网关策略管理为控制台绑定你自己的域名，或 TCP 策略。[参考文档](/docs/use-manual/team-manage/gateway/rules/domain/)

:::tip
* 若恢复后平台自动退出登录，请重新访问新控制台域名，不要携带 path 路径，使用老控制台的账号进行登录。因为历史数据已经失效。
* 请定期备份平台数据，以方便在紧急情况下异地恢复控制台服务。
:::

### 已知问题

迁移控制台后，恢复备份时从主机安装的 Kubernetes 集群信息不会被恢复，需手动拷贝集群安装信息。

```bash
export APP_UI=`kubectl get pod -n rbd-system |grep rbd-app-ui|grep Running|awk '{print $1}'`
kubectl cp ~/rainbonddata/cloudadaptor/enterprise $APP_UI:/app/data/cloudadaptor -nrbd-system
```

进入企业视图  > 集群 > 节点配置，节点信息存在则成功。