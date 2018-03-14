---
title: rbd-db
summary: mysql,数据库,存储rbd-api,rbd-web
toc: false
asciicast: true
---

<div id="toc"></div>

##简述

云帮后端的MySQL数据库。存储了 rbd-api,rbd-web组件的数据。

##组件信息

| 类型   | 属性              |
| :--- | :-------------- |
| 镜像名  | rainbond/rbd-db |
| 容器名  | rbd-db          |

## 持久化目录

| 宿主机          | 容器内   |
| :----------- | :---- |
| /data/rbd-db | /data |

##维护命令

```bash
##启动rbd-db：
dc-compose up -d rbd-db
##停止|重启rbd-db:
dc-compose stop|restart rbd-db

##查看日志：
dc-compose logs rbd-db

```