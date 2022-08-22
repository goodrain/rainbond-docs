---
title: rbd-worker
description: "rbd-worker component parameter description"
---

## rbd-worker component description

Rainbond Application Operations and Processing Services

### Operation mode

Running inside the Kubernetes cluster, POD running, jointly maintained and managed by Kubernetes and Rainbond-Operator


### Common parameter description

```yaml title="kubectl edit rbdcomponents.rainbond.io rbd-webcli -n rbd-system"
spec:
  args:
    - --log-level # log level
    - --host-ip # the ip of this worker process, must be the ip of the global connection
    - --node-name # the name of this worker process, must be is a globally unique
    - --mysql # database connection information5
  --etcd-endpoints= # etcd v3 cluster connection information6
  --etcd-ca=/run/ssl/etcd/ca.pem # etcd certificate7
  --etcd-cert=/run/ssl/etcd/server.pem
  - --etcd-key=/run/ssl/etcd/server-key.pem
  image: rbd-webcli:v5.6.0-release
  imagePullPolicy : IfNotPresent
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
