---
title: 调整 Docker 容器日志收集
descrition: 该章节介绍调整了 Docker 的默认数据目录后，如何调整 Rainbond 组件的参数收集日志。
keywords:
- Rainbond 调整 Docker 容器日志收集
- 调整 Docker 容器日志收集
---

`rbd-node` 是负责收集 Docker 容器日志的组件，它默认收集 `/var/lib/docker/containers` 目录下的日志，如果您调整了 Docker 的默认数据目录，需要调整 `rbd-node` 组件的参数。

## 修改 rbd-node 组件参数

添加以下内容，其中 **path、mountPath** 填写实际的 Docker 数据目录

```bash title="kubectl edit rbdcomponent rbd-node -n rbd-system"
apiVersion: rainbond.io/v1alpha1
kind: RbdComponent
metadata:
  name: rbd-node
  namespace: rbd-system
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