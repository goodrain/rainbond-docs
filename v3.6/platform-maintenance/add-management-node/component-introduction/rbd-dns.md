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

##v3.6新功能——自定义域名解析

在v3.6版本中，rbd-dns组件添加了自定义域名解析功能，rbd-dns组件的配置文件也发生了变化。

{{site.data.alerts.callout_info}}

配置文件路径产生了变化：<br>
可以在`/opt/rainbond/docker-compose.yaml`文件中对rbd-dns组件进行调整

{{site.data.alerts.end}}

配置详情如下：

```bash

#in manage01
vi /opt/rainbond/docker-compose.yaml

services:
  rbd-dns:
    image: rainbond/rbd-dns:3.6
    container_name: rbd-dns
    mem_limit: 1024M
    environment:
      - VERBOSE=true
    command:
      - --kubecfg-file=/etc/goodrain/kubernetes/admin.kubeconfig
      - --v=3
      - --healthz-port=8089
      - --nameservers=100.100.2.136,114.114.114.114
      - --recoders=goodrain.me=172.30.42.1,*.goodrain.me=172.30.42.1,abc.c6312bf4b22c439aa18fee7fbb698425.svc.cluster.local=192.168.1.24
    volumes:
      - /opt/rainbond/kubernetes:/etc/goodrain/kubernetes
    logging:
      driver: json-file
      options:
        max-size: 50m
        max-file: '3'
    network_mode: host
    restart: always
```

{{site.data.alerts.callout_info}}

在上述的配置文件更改中：<br>
`abc.c6312bf4b22c439aa18fee7fbb698425.svc.cluster.local=192.168.1.2` 这一记录可以将`abc`这一自定义域名，解析到`192.168.1.2`。<br>
自定义域名解析记录的格式为：`<自定义域名>.<应用所在命名空间，即租户ID>.svc.cluster.local=<IP>`  <br>
其中`应用所在命名空间，即租户ID`可以通过命令`grctl service get <应用地址>`获取。

{{site.data.alerts.end}}

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

