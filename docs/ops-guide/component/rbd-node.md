---
title: rbd-node
description: "Rainbond Node组件参数说明"
---

## rbd-node组件说明

集群监控与控制，docker证书分发

### 运行方式

运行于Kubernetes集群内部，POD运行,由Kubernetes和Rainbond-Operator共同维护和管理，运行在每一个节点上

### 修改Docker目录收集日志

默认从`/var/lib/docker`收集日志，如果您更改了默认存储目录，则需要修改`rbd-node`组件。

在 `spec:` 下添加以下内容，其中 **path**、**mountPath** 填写实际的docker目录

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


### 常用参数说明

仅列出启动常用参数，其他未列出参数默认即可

```yaml title="kubectl edit rbdcomponents.rainbond.io rbd-node -n rbd-system"
spec:
  args:
  - --log-level   # 日志级别，默认info
  - --etcd        # etcd地址,默认 [http://127.0.0.1:2379]
  - --etcd-ca=/run/ssl/etcd/ca.pem # etcd 证书
  - --etcd-cert=/run/ssl/etcd/server.pem
  - --etcd-key=/run/ssl/etcd/server-key.pem
  - --hostIP      # 当前节点ip,未指定时获取eth0 ip
  - --run-mode    # node属性,默认是manage
  - --noderule    # 节点属性，默认是compute 
  - --nodeid      # 此节点的唯一ID，只需指定，不要修改
  - --image-repo-host  # 镜像仓库主机
  - --hostsfile   # /etc/hosts映射容器中的路径
  image: rbd-node:v.5.6.0-release
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

