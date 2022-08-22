---
title: rbd-eventlog
description: "rbd-eventlog component parameter description"
---

## rbd-eventlog component description

rainbond event processing and log aggregation service

### Operation mode

Running inside the Kubernetes cluster, POD running, jointly maintained and managed by Kubernetes and Rainbond-Operator


### Common parameter description

```yaml title="kubectl edit rbdcomponents.rainbond.io rbd-eventlog -n rbd-system"

spec:
  args:
  - --cluster.bind.ip # Cluster communication listening IP
  - --cluster.instance # Current instance communication IP in the cluster
  - --websocket.bind.ip # Websocket binding for pushing event messages Set ip
  - --db.url # database connection information
  - --discover.etcd.addr # automatically discover the etcd server address in the cluster for the message prompt
  - --discover.etcd.ca=/run/ssl/etcd /ca.pem
  - --discover.etcd.cert=/run/ssl/etcd/server.pem
  - --discover.etcd.key=/run/ssl/etcd/server-key.pem
  image: rbd -eventlog:v5.6.0-release
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