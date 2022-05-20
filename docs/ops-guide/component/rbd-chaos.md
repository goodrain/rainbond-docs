---
title: rbd-chaos
description: "rbd-chaos(builder)组件参数说明"
---

## rbd-chaos(builder)组件说明

组件的构建均由 rbd-chaos 处理。

### 运行方式
 
运行于Kubernetes集群内部，POD运行,由Kubernetes和Rainbond-Operator共同维护和管理


### 常用参数说明

```yaml title="kubectl edit rbdcomponents.rainbond.io rbd-chaos -n rbd-system"
spec:
  args:
  - --mysql     数据库连接信息
  - --hostIP                        # 当前节点内网IP
  - --log-level=debug       # 日志级别（默认“info”)
  - --etcd-endpoints=list   # etcd 连接信息，多个以逗号分隔
  - --etcd-ca=/run/ssl/etcd/ca.pem # etcd 证书
  - --etcd-cert=/run/ssl/etcd/server.pem
  - --etcd-key=/run/ssl/etcd/server-key.pem
  image: rbd-chaos:v5.6.0-release
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


