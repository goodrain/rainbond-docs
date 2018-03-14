---
title: rbd-web
summary: rbd-web,rbd-web,控制台，修改应用配置
toc: false
asciicast: true
---

<div id="toc"></div>

## 简述

云帮应用的控制台，在浏览器可以操作应用的一些配置。

##组件信息

| 类型   | 属性                                       |
| :--- | :--------------------------------------- |
| 镜像名  | rainbond/rbd-web                         |
| 容器名  | rbd-web                                  |
| 环境变量 | REGION_TAG: cloudbang                    |
| 依赖组件 | rbd-api,dalaran_service,rbd-registry,rbd-repo |

##持久化目录

| 宿主机                      | 容器内                      |
| :----------------------- | :----------------------- |
| /etc/goodrain/console.py | /etc/goodrain/console.py |
| /grdata/services/console | /data                    |

##维护命令

```bash
##启动rbd-web：
dc-compose up -d rbd-web
##停止|重启rbd-web:
dc-compose stop|restart rbd-web

##查看日志：
dc-compose logs rbd-web

```