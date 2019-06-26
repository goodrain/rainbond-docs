---
title: rbd-dns组件说明
description: "rbd-dns组件参数说明"
hidden: true
---


### 守护运行方式
 
> node会生成rbd-dns的systemd配置文件,并通过systemd守护运行,可以通过`systemctl cat rbd-dns`获取rbd-dns的systemd配置文件  
> rbd-dns服务是通过镜像运行  

rbd-dns默认配置文件`/opt/rainbond/conf/dns.yaml`

### 常用参数说明

```
--nameservers 上游dns
--recoders 解析记录
```

如果需要通过rbd-dns解析某个域名

```
--recoders=goodrain.me=192.168.195.1,*.goodrain.me=192.168.195.1,buhuibaidu.me=172.20.0.101,*.buhuigoogle.me=172.20.0.102
```
