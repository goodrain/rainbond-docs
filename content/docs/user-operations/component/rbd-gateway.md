---
title: rbd-gateway组件说明
description: "rbd-gateway组件参数说明"
hidden: true
---


### 运行方式
 
运行于Kubernetes集群内部，POD运行,由Kubernetes和Rainbond-Operator共同维护和管理


### 常用参数说明

```shell 
    - --log-level        日志级别
    - --error-log        记录错误日志路径
    - --enable-kubeapi   是否启用kube apiserver的负载平衡
    - --etcd-endpoints   etcd集群连接地址
```

