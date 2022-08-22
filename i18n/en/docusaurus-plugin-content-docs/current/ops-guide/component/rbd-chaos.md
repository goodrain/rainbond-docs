---
title: rbd-chaos
description: "rbd-chaos(builder) component parameter description"
---

## rbd-chaos (builder) component description

The building of components is all handled by rbd-chaos.

### Operation mode

Running inside the Kubernetes cluster, POD running, jointly maintained and managed by Kubernetes and Rainbond-Operator


### Common parameter description

```yaml title="kubectl edit rbdcomponents.rainbond.io rbd-chaos -n rbd-system"
spec:
  args:
  - --mysql database connection information
  - --hostIP # current node intranet IP
  - --log-level=debug # log level (default "info")
  - --etcd-endpoints= list # etcd connection information, multiple separated by comma
  - --etcd-ca=/run/ssl/etcd/ca.pem # etcd certificate
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


