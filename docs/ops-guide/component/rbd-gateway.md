---
title: rbd-gateway
description: "rbd-gateway组件参数说明"
---

## rbd-gateway组件说明

通向应用的全局网关，提供A/B测试、灰度发布等高级功能

### 运行方式
 
运行于Kubernetes集群内部，POD运行,由Kubernetes和Rainbond-Operator共同维护和管理


### 常用参数说明

```yaml title="kubectl edit rbdcomponents.rainbond.io rbd-gateway -n rbd-system"
    
spec:
  args:
  - --enable-kubeapi                        # 是否启用kube apiserver的负载平衡
  - --log-level debug                       # 日志级别
  - --etcd-endpoints=                       # etcd集群连接地址
  - --etcd-ca=/run/ssl/etcd/ca.pem          # etcd证书
  - --etcd-cert=/run/ssl/etcd/server.pem
  - --etcd-key=/run/ssl/etcd/server-key.pem
  image: rbd-gateway:v5.6.0-release
  imagePullPolicy: IfNotPresent
  priorityComponent: true
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

