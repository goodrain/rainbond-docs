---
title: rbd-dns组件说明
description: "rbd-dns组件参数说明"
hidden: true
---


### 运行方式
 
运行于Kubernetes集群内部，POD运行,由Kubernetes和Rainbond-Operator共同维护和管理


### 常用参数说明

```shell
    - --healthz-port     用于健康监测的端口
    - --dns-bind-address 提供DNS请求的地址
    - --nameservers      上游dns
    - --recoders         解析记录
```

如果需要通过rbd-dns解析某个域名

```
--recoders=goodrain.me=192.168.195.1,*.goodrain.me=192.168.195.1,buhuibaidu.me=172.20.0.101,*.buhuigoogle.me=172.20.0.102
```
Rainbond `rbd-dns`[源码地址](https://github.com/goodrain/dns)