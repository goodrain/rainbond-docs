---
title: rbd-gateway
description: "rbd-gateway component parameter description"
---

## rbd-gateway component description

A global gateway to applications, providing advanced functions such as A/B testing and grayscale publishing

### Operation mode

Running inside the Kubernetes cluster, POD running, jointly maintained and managed by Kubernetes and Rainbond-Operator


### Common parameter description

```yaml title="kubectl edit rbdcomponents.rainbond.io rbd-gateway -n rbd-system"

spec:
  args:
  - --enable-kubeapi # Whether to enable load balancing for kube apiserver
  - --log-level debug # Log level
  - --etcd-endpoints= # etcd cluster connection address
  - --etcd- ca=/run/ssl/etcd/ca.pem # etcd certificate
  - --etcd-cert=/run/ssl/etcd/server.pem
  - --etcd-key=/run/ssl/etcd/server- key.pem
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

