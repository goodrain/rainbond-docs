---
title: rbd-worker
summary: rbd-worker,rbd-worker
toc: false
asciicast: true
---

<div id="toc"></div>

## 简述

应用的生命周期管理器，管理应用的启动、停止、升级、回滚等根据应用存储特性为应用创建存储资源。	

## 组件信息

| 类型   | 属性                                       |
| :--- | :--------------------------------------- |
| 镜像名  | rainbond/rbd-worker                      |
| 容器名  | rbd-worker                               |
| 环境变量 | MYSQL_HOST: 127.0.0.1<br>MYSQL_PORT: 3306<br>MYSQL_USER: writer1<br>MYSQL_PASSWORD: bhvYmHYJ45<br>MYSQL_DATABASE: region<br>K8S_MASTER: http://127.0.0.1:8181<br>CUR_NET: calico<br>EX_DOMAIN: k9xvi.goodrain.org |

##持久化目录

| 宿主机           | 容器内           |
| :------------ | :------------ |
| /etc/goodrain | /etc/goodrain |
| /grdata       | /grdata       |

## 维护命令

```bash
##启动rbd-worker：
dc-compose up -d rbd-worker
##停止|重启rbd-worker:
dc-compose stop|restart rbd-worker

##查看日志：
dc-compose logs rbd-worker
```
