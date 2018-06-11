---
title: rbd-chaos
summary: 构建应用,docker镜像,源代码应用，git，dockerfile，好雨云市
toc: false
asciicast: true
---

<div id="toc"></div>

##简述

该组件完成应用的构建功能，目前支持从Git源码，Docker镜像或Dockerfile，好雨云市等途径构建应用。并可插件化扩展到更多的构建方式。其可多点高可用部署。

##组件信息

| 类型   | 属性                 |
| :--- | :----------------- |
| 镜像名  | rainbond/rbd-chaos |
| 容器名  | rbd-chaos          |

## 持久化目录

| 宿主机                                 | 容器内                       |
| :---------------------------------- | :------------------------ |
| /logs                               | /logs                     |
| /grdata                             | /grdata                   |
| /cache                              | /cache                    |
| /var/run                            | /var/run                  |
| /root/.docker/config.json           | /root/.docker/config.json |
| /etc/goodrain/ssh                   | /home/rain/.ssh           |
| /etc/goodrain/etc/chaos/config.json | /run/plugins/config.json  |

##维护命令

```bash
##启动rbd-chaos：
dc-compose up -d rbd-chaos
##停止|重启rbd-chaos:
dc-compose stop|restart rbd-chaos

##查看日志：
dc-compose logs rbd-chaos

```