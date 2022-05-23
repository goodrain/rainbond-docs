---
title: rbd-mq
description: "rbd-mq组件参数说明"
---

## rbd-mq组件说明

消息队列服务

### 运行方式
 
运行于Kubernetes集群内部，POD运行,由Kubernetes和Rainbond-Operator共同维护和管理


### 常用参数说明

```yaml title="kubectl edit rbdcomponents.rainbond.io rbd-mq -n rbd-system"
spec:
  args:
  - --hostIP           # 本机ip
  - --log-level        # 日志级别
  - --etcd-endpoints=  # 集群etcd连接地址
  - --etcd-ca=/run/ssl/etcd/ca.pem # etcd 证书
  - --etcd-cert=/run/ssl/etcd/server.pem
  - --etcd-key=/run/ssl/etcd/server-key.pem
  image: rbd-mq:v5.6.0-release
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
