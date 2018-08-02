---
title: rbd-mq
summary: 消息队列，etcd，消息转发，消息一致
toc: false
asciicast: true
---

<div id="toc"></div>

##简述

该组件完成应用操作异步任务的消息转发，基于ETCD(v3)实现的简单消息队列。其可多点高可用部署，全局消息一致。

##组件信息

| 类型   | 属性              |
| :--- | :-------------- |
| 镜像名  | rainbond/rbd-mq |
| 容器名  | rbd-mq          |

##维护命令

```bash
##启动rbd-mq：
dc-compose up -d rbd-mq
##停止|重启rbd-mq:
dc-compose stop|restart rbd-mq

##查看日志：
dc-compose logs rbd-mq

```