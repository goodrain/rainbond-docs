---
title: 'helm 安装卸载指南'
weight: 205
description: '介绍基于 helm 安装的集群如何卸载'
---
#### helm 安装卸载指南

- 卸载rainbond组件

```
helm uninstall rainbond -n rbd-system 
```

- 删除rainbond对应PVC

```
kubectl get pvc -n rbd-system | grep -v NAME | awk '{print $1}' | xargs kubectl delete pvc -n rbd-system
```

- 删除rainbond对应PV

```
kubectl get pv | grep rbd-system  | awk '{print $1}' | xargs kubectl delete pv
```

- 删除rbd-system命名空间

```
kubectl delete ns rbd-system
```

- 删除rainbond数据目录


 ```
 rm -rf /opt/rainbond
 ```





