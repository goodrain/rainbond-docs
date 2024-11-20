---
title: 卸载
description: 介绍如何卸载 Rainbond 单机版和 Rainbond 集群以及通过 Rainbond 安装的 Kubernetes 集群
keywords:
- 卸载 Kubernetes 集群
- 卸载 Rainbond 集群
---

:::warning
卸载 Rainbond 会删除集群数据，操作前请做好数据备份。
:::

## 卸载快速安装的 Rainbond

如果您使用快速安装的 Rainbond，可以通过以下方式卸载：

1. 删除 `rainbond` 容器。
```bash
docker stop rainbond && docker rm rainbond
```

2. 删除 Rainbond 数据目录。

```bash
# Linux
rm -rf /opt/rainbond

# MacOS & Windows
docker volume rm rainbond-opt
```

## 卸载基于主机安装的 Rainbond 集群

如果您是基于主机安装的集群，您可以在 **平台管理 -> 集群 -> 删除集群**。并在每个节点上执行以下命令：

```bash
/usr/local/bin/rke2-uninstall.sh
```

## 卸载基于 Helm 安装的 Rainbond 集群

使用 Helm 卸载 Rainbond 

```bash
helm uninstall rainbond -n rbd-system 
```

删除 Rainbond 所创建的 `PVC、PV、CRD、NAMESPACE` 

```bash
# Delete PVC
kubectl get pvc -n rbd-system | grep -v NAME | awk '{print $1}' | xargs kubectl delete pvc -n rbd-system

# Delete PV
kubectl get pv | grep rbd-system | grep -v NAME | awk '{print $1}' | xargs kubectl delete pv

# Delete CRD
kubectl delete crd componentdefinitions.rainbond.io \
helmapps.rainbond.io \
rainbondclusters.rainbond.io \
rainbondpackages.rainbond.io \
rainbondvolumes.rainbond.io \
rbdcomponents.rainbond.io \
servicemonitors.monitoring.coreos.com \
thirdcomponents.rainbond.io \
rbdabilities.rainbond.io \
rbdplugins.rainbond.io \
servicemeshclasses.rainbond.io \
servicemeshes.rainbond.io \
-n rbd-system

# Delete NAMESPACE
kubectl delete ns rbd-system
```

删除 Rainbond 数据目录

```bash
rm -rf /opt/rainbond
```
