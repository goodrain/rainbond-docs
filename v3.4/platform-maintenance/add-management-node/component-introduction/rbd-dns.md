---
title: rbd-dns
summary: DNS,dns,Dns,dns服务,基础服务
toc: false
asciicast: true
---

<div id="toc"></div>

##简述

云帮DNS组件，为云帮平台的基础服务和运行的应用提供DNS服务。

##组件信息

| 类型   | 属性                                       |
| :--- | :--------------------------------------- |
| 镜像名  | rainbond/rbd-dns                         |
| 容器名  | rbd-dns                                  |
| 环境变量 | KUBEURL=http://127.0.0.1:8181<br>SKYDNS_DOMAIN=goodrain.me<br>RECORD_1=goodrain.me:172.30.42.1<br>RECORD_2=lang.goodrain.me:172.30.42.1<br>RECORD_3=maven.goodrain.me:172.30.42.1<br>RECORD_4=config.goodrain.me:172.30.42.1<br>RECORD_5=console.goodrain.me:172.30.42.1<br>RECORD_6=region.goodrain.me:172.30.42.1<br>RECORD_7=kubeapi.goodrain.me:172.30.42.1<br>RECORD_8=download.goodrain.me:172.30.42.1 |

##维护命令

```bash
##启动rbd-dns：
dc-compose up -d rbd-dns
##停止|重启rbd-dns:
dc-compose stop|restart rbd-dns

##查看日志：
dc-compose logs rbd-dns

```


{{site.data.alerts.callout_info}}

如果rbd-dns默认上级dns服务器(114.114.114.114)无法解析公共域名，可以在`/etc/goodrain/docker-compose.yaml`文件中定义变量FORWARD的值为其他dns服务器。

{{site.data.alerts.callout_end}}