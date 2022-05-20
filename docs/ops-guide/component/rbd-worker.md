---
title: rbd-worker
description: "rbd-worker组件参数说明"
---

## rbd-worker组件说明

Rainbond 应用操作与处理服务

### 运行方式
 
运行于Kubernetes集群内部，POD运行,由Kubernetes和Rainbond-Operator共同维护和管理


### 常用参数说明

```yaml title="kubectl edit rbdcomponents.rainbond.io rbd-webcli -n rbd-system"
spec:
  args:
    - --log-level                   # 日志级别
    - --host-ip                     # 此工作进程的ip，必须是全局连接的ip
    - --node-name                   # 此工作进程的名称，必须是全局唯一名称
    - --mysql                       # 数据库连接信息
  - --etcd-endpoints=               # etcd v3集群连接信息
  - --etcd-ca=/run/ssl/etcd/ca.pem  # etcd 证书
  - --etcd-cert=/run/ssl/etcd/server.pem
  - --etcd-key=/run/ssl/etcd/server-key.pem
  image: rbd-webcli:v5.6.0-release
  imagePullPolicy: IfNotPresent
  priorityComponent: false
  replicas: 2
  resources: {}
  volumeMounts:
  - mountPath: /run/ssl/etcd
    name: etcdssl
  volumes:
  - name: etcdssl
    secret:
      defaultMode: 420
      secretName: my-etcd
```
