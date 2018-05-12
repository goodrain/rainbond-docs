---
title: rbd-slogger
summary: rbd-slogger，应用日志，日志输出
toc: false
asciicast: true
---

<div id="toc"></div>

## 简述

提供云帮应用日志的输出服务

##组件信息

| 类型   | 属性                                       |
| :--- | :--------------------------------------- |
| 镜像名  | rainbond/rbd-slogger                     |
| 容器名  | rbd-slogger                              |
| 环境变量 | REGION_TAG: cloudbang                    |
| 依赖组件 | rbd-mq,rbd-dns,dalaran_service,rbd-proxy,rbd-lb |

##持久化目录

| 宿主机                       | 容器内                                 |
| :------------------------ | :---------------------------------- |
| /etc/goodrain/labor.py    | /app/labor/etc/regions/cloudbang.py |
| /logs/                    | /logs/                              |
| /grdata/                  | /grdata/                            |
| /data/docker_logs/        | /data/docker_logs/                  |
| /cache/                   | /cache/                             |
| /var/run/                 | /var/run/                           |
| /root/.docker/config.json | /root/.docker/config.json           |
| /etc/goodrain/ssh/        | /home/rain/.ssh/                    |

##维护命令

```bash
##启动rbd-slogger：
dc-compose up -d rbd-slogger
##停止|重启rbd-slogger:
dc-compose stop|restart rbd-slogger

##查看日志：
dc-compose logs rbd-slogger

```