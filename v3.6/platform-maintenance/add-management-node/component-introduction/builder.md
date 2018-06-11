---
title: builder
summary: builder组件介绍
toc: false
asciicast: true
---

<div id="toc"></div>

##简述

平台源码构建的基础组件，根据不同的开发语言构建语言运行环境，最终将环境与源码打包成tgz文件。

##组件信息 

| 类型   | 属性                                |
| :--- | :-------------------------------- |
| 镜像名  | hub.goodrain.com/goodrain/builder |
| 容器名  | builder                           |

{{site.data.alerts.callout_info}}
builder的镜像地址会在安装云帮过程中改为goodrain.me/builder
{{site.data.alerts.end}}

##维护命令

```bash
##启动builder：
dc-compose up -d builder
##停止|重启builder:
dc-compose stop|restart builder

##查看日志：
dc-compose logs builder
```