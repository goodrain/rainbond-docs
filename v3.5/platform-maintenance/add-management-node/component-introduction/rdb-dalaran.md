---
title: dalaran_service
summary: dalaran_service，日志转发，log，logs
toc: false
asciicast: true
---

<div id="toc"></div>



## 简述

消息接受和转发的中间件。



## 组件信息

| 类型   | 属性                                       |
| :--- | :--------------------------------------- |
| 镜像名  | hub.goodrain.com/dc-deploy/dalaran_service |
| 容器名  | dalaran_service                          |
| 环境变量 | ZMQ_BIND_SUB: tcp://0.0.0.0:9341<br>ZMQ_BIND_PUB: tcp://0.0.0.0:9342 |



## 维护命令

```bash
##启动dalaran_service：
dc-compose up -d dalaran_service
##停止|重启dalaran_service:
dc-compose stop|restart dalaran_service

##查看日志：
dc-compose logs dalaran_service
```