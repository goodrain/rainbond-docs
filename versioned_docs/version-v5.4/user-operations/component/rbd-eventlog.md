---
title: rbd-eventlog组件说明
description: "rbd-eventlog组件参数说明"
hidden: true
---


### 运行方式
 
运行于Kubernetes集群内部，POD运行,由Kubernetes和Rainbond-Operator共同维护和管理


### 常用参数说明

```shell
    - --cluster.bind.ip    集群通信监听IP
    - --cluster.instance   群集中的当前实例通信IP
    - --websocket.bind.ip  推送事件消息的websocket绑定ip
    - --db.url             数据库连接信息
    - --discover.etcd.addr 为消息提示自动发现群集中的etcd服务器地址
```