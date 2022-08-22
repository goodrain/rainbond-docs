---
title: rbd-node
description: "Rainbond Node component parameter description"
---

## rbd-node component description

Cluster monitoring and control, docker certificate distribution

### Operation mode

Running inside the Kubernetes cluster, POD running, jointly maintained and managed by Kubernetes and Rainbond-Operator, running on each node

### Modify the Docker directory to collect logs

Logs are collected from`/var/lib/docker`by default, if you change the default storage directory, you need to modify`rbd-node`components.

Add the following under `spec:` , where **path**,**mountPath** fill in the actual docker directory

```yaml title="kubectl edit -n rbd-system rbdcomponents.rainbond.io rbd-node"
spec:
  volumes:
  - hostPath:
      path: /var/lib/docker
      type: DirectoryOrCreate
    name: docker
  volumeMounts:
  - mountPath: /home/docker
    name: docker
```


### Common parameter description

Only common startup parameters are listed, other parameters that are not listed can be defaulted

```yaml title="kubectl edit rbdcomponents.rainbond.io rbd-node -n rbd-system"
spec:
  args:
  - --log-level # log level, default info
  - --etcd # etcd address, default [http://127.0.0.1:2379]
  - --etcd-ca=/run/ ssl/etcd/ca.pem # etcd certificate
  - --etcd-cert=/run/ssl/etcd/server.pem
  - --etcd-key=/run/ssl/etcd/server-key.pem
  - --hostIP # The current node ip, if not specified, get eth0 ip
  - --run-mode # node attribute, the default is manage
  - --noderule # node attribute, the default is compute 
  - --nodeid # this node is unique ID, just specify, do not modify
  - --image-repo-host # Mirror repository host
  - --hostsfile # /etc/hosts map path
  in the container image: rbd-node:v.5.6.0-release
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

