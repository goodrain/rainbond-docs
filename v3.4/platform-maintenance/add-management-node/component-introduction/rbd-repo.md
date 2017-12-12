---
title: rbd-repo
summary: Artifactory，应用构建控制器，构建云帮应用的组件
toc: false
asciicast: true
---

<div id="toc"></div>

##简述

基于Artifactory开源版本的应用构建控制器，构建云帮应用的组件。

##组件信息

| 类型   | 属性                              |
| :--- | :------------------------------ |
| 镜像名  | rainbond/rbd-repo               |
| 容器名  | rbd-repo                        |
| 环境变量 | INSTANCE_LOCK_NAME: artifactory |

##持久化目录

| 宿主机                           | 容器内                        |
| :---------------------------- | :------------------------- |
| /grdata/services/artifactory5 | /var/opt/jfrog/artifactory |

##维护命令

```bash
##启动rbd-repo：
dc-compose up -d rbd-repo
##停止|重启rbd-repo:
dc-compose stop|restart rbd-repo

##查看日志：
dc-compose logs rbd-repo

```