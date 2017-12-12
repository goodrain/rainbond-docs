---
title: rbd-event-log
summary: rbd-event-log,消息推送，应用日志处理能力
toc: false
asciicast: true
---

<div id="toc"></div>

## 简述

该组件完成异步操作进度跟踪，应用日志分区收集与处理，消息推送等服务。其可多点部署，一是保证高可用，二是提高应用日志处理能力。

##组件信息

| 类型   | 属性                                       |
| :--- | :--------------------------------------- |
| 镜像名  | rainbond/rbd-event-log                   |
| 容器名  | rbd-event-log                            |
| 环境变量 | MYSQL_HOST: 127.0.0.1<br>MYSQL_PORT: 3306<br>MYSQL_USER: writer1<br>MYSQL_PASSWORD: bhvYmHYJ45<br>MYSQL_DATABASE: region<br>K8S_MASTER: http://127.0.0.1:8181<br>CLUSTER_BIND_IP: 10.211.55.13 |

##持久化目录

| 组主机                    | 容器内            |
| :--------------------- | :------------- |
| /var/log/event-log/    | /var/log/      |
| /etc/goodrain/         | /etc/goodrain/ |
| /grdata/downloads/log/ | /grdata/logs/  |

##维护命令

```bash
##启动rbd-event_log：
dc-compose up -d rbd-event_log
##停止|重启rbd-event_log:
dc-compose stop|restart rbd-event_log

##查看日志：
dc-compose logs rbd-event_log

```