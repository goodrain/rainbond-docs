---
title: rbd-eventlog
description: "rbd-eventlog组件参数说明"
---

## rbd-eventlog组件说明

rainbond事件处理与日志汇聚服务

### 运行方式
 
运行于Kubernetes集群内部，POD运行,由Kubernetes和Rainbond-Operator共同维护和管理


### 常用参数说明

```yaml title="kubectl edit rbdcomponents.rainbond.io rbd-eventlog -n rbd-system"
    
spec:
  args:
  - --cluster.bind.ip    # 集群通信监听IP
  - --cluster.instance   # 群集中的当前实例通信IP
  - --websocket.bind.ip  # 推送事件消息的websocket绑定ip
  - --db.url             # 数据库连接信息
  - --discover.etcd.addr # 为消息提示自动发现群集中的etcd服务器地址
  - --discover.etcd.ca=/run/ssl/etcd/ca.pem
  - --discover.etcd.cert=/run/ssl/etcd/server.pem
  - --discover.etcd.key=/run/ssl/etcd/server-key.pem
  image: rbd-eventlog:v5.6.0-release
  imagePullPolicy: IfNotPresent
  priorityComponent: false
  replicas: 1
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