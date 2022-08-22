---
title: rbd-mq
description: "rbd-mq component parameter description"
---

## rbd-mq component description

message queue service

### Operation mode

Running inside the Kubernetes cluster, POD running, jointly maintained and managed by Kubernetes and Rainbond-Operator


### Common parameter description

```yaml title="kubectl edit rbdcomponents.rainbond.io rbd-mq -n rbd-system"
spec:
  args:
  - --hostIP # local ip
  - --log-level # log level
  - --etcd-endpoints= # cluster etcd connection address
  - --etcd-ca=/run/ssl/ etcd/ca.pem # etcd certificate
  - --etcd-cert=/run/ssl/etcd/server.pem
  - --etcd-key=/run/ssl/etcd/server-key.pem
  image: rbd -mq:v5.6.0-release
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
