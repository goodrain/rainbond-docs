---
title: rbd-api
summary: websocket，8888，6060，入口，API
toc: false
asciicast: true
---

<div id="toc"></div>



## 简述

该组件是数据中心对外提供服务的入口，提供应用和资源操作的API服务(8888端口)，和Websocket消息推送服务(6060端口)。它除了本身实现的API以外还自动发现并负载均衡了其他组件需要对外提供的API。其可以多点高可用部署接入边缘负载均衡器

##组件信息

| 类型   | 属性                                       |
| :--- | :--------------------------------------- |
| 镜像名  | rainbond/rbd-api                         |
| 容器名  | rbd-api                                  |
| 环境变量 | REGION_TAG: cloudbang<br>EX_DOMAIN: k9xvi.goodrain.org<br>LicenseSwitch: 'off' |

## 持久化目录

| 宿主机                         | 容器内                               |
| :-------------------------- | :-------------------------------- |
| /etc/goodrain/region_api.py | /app/region_api/conf/cloudbang.py |
| /etc/goodrain/kubernetes    | /etc/goodrain/kubernetes          |
| /grdata                     | /grdata                           |
| /data/docker_logs           | /data/docker_logs                 |

##维护命令

```bash
##启动rbd-api：
dc-compose up -d rbd-api
##停止|重启rbd-api:
dc-compose stop|restart rbd-api

##查看日志：
dc-compose logs rbd-api

```