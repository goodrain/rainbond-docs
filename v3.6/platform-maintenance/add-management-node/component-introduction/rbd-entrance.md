---
title: rbd-entrance
summary: rbd-entrance，负载均衡器
toc: false
asciicast: true
---

<div id="toc"></div>

## 简述

该组件是应用边缘负载均衡数据抽象层和插件适配器。提供了统一的负载均衡数据发现，应用级选择使用的负载均衡插件并自动配置生效，使用不同的负载均衡器，其可多点高可用部署。

##组件信息

| 类型   | 属性                    |
| :--- | :-------------------- |
| 镜像名  | rainbond/rbd-entrance |
| 容器名  | rbd-entrance          |

##维护命令

```bash
##启动rbd-entrance：
dc-compose up -d rbd-entrance
##停止|重启rbd-entrance:
dc-compose stop|restart rbd-entrance

##查看日志：
dc-compose logs rbd-entrance

```