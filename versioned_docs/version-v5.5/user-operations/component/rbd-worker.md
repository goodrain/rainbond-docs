---
title: rbd-worker组件说明
description: "rbd-worker组件参数说明"
hidden: true
---


### 运行方式
 
运行于Kubernetes集群内部，POD运行,由Kubernetes和Rainbond-Operator共同维护和管理


### 常用参数说明

```shell
    - --log-level   日志级别
    - --host-ip     此工作进程的ip，必须是全局连接的ip
    - --node-name   此工作进程的名称，必须是全局唯一名称
    - --mysql       数据库连接信息
    - --etcd-endpoints  etcd v3集群连接信息
```
