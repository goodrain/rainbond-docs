---
title: rbd-registry
summary: 镜像仓库，存储镜像，存储基础应用的镜像
toc: false
asciicast: true
---

<div id="toc"></div>

##简述

是云帮集群应用的镜像仓库，存储着云帮基础应用的镜像。

##组件信息

| 类型   | 属性                              |
| :--- | :------------------------------ |
| 镜像名  | rainbond/rbd-registry           |
| 容器名  | rbd_registry                    |
| 环境变量 | INSTANCE_LOCK_NAME: artifactory |

##持久化目录

| 宿主机                        | 容器内                |
| :------------------------- | :----------------- |
| /grdata/services/registry/ | /var/lib/registry/ |

##维护命令

```bash
##启动rbd-registry：
dc-compose up -d rbd-registry
##停止|重启rbd-registry:
dc-compose stop|restart rbd-registry

##查看日志：
dc-compose logs rbd-registry

```