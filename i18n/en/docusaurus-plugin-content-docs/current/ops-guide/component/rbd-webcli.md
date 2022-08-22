---
title: rbd-webcli
description: "rbd-webcli component parameter description"
---

## rbd-webcli component description

Provides a service for entering the container command line in the web mode

### Operation mode

Running inside the Kubernetes cluster, POD running, jointly maintained and managed by Kubernetes and Rainbond-Operator


### Common parameter description

```yaml title="kubectl edit rbdcomponents.rainbond.io rbd-webcli -n rbd-system"
spec:
  args:
  - --hostIP # local ip
  - --log-level # log level
  - --etcd-endpoints= # etcd address
  - --etcd-ca=/run/ssl/etcd/ ca.pem # etcd certificate
  - --etcd-cert=/run/ssl/etcd/server.pem
  - --etcd-key=/run/ssl/etcd/server-key.pem
  image: rbd-webcli :v5.6.0-release
  imagePullPolicy: IfNotPresent
  priorityComponent: false
  replicas: 2
  resources: {}
  volumeMounts:
  - mountPath: /run/ssl/etcd
    name: etcdssl
  volumes:
  - name: etcdssl
    secret :
      defaultMode: 420
      secretName: my-etcd
```
