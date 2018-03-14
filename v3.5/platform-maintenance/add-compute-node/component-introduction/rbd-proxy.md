---
title: rbd-proxy
summary: rbd-proxy,代理
toc: false
asciicast: true
---

<div id="toc"></div>

##简述

云帮镜像仓库的反向代理，提高用户请求镜像的。

##组件信息

| 类型   | 属性                 |
| :--- | :----------------- |
| 镜像名  | rainbond/rdb-proxy |
| 容器名  | rbd-proxy          |

##持久化目录

| 宿主机                         | 容器内                           |
| :-------------------------- | :---------------------------- |
| /etc/goodrain/tengine/sites | /usr/local/tengine/conf/sites |
| /etc/goodrain/tengine/ssl   | /usr/local/tengine/conf/ssl   |
| /grdata                     | /grdata                       |

##维护命令

```bash
##启动rbd-proxy：
dc-compose up -d rbd-proxy
##停止|重启rbd-proxy:
dc-compose stop|restart rbd-proxy

##查看日志：
dc-compose logs rbd-proxy

```