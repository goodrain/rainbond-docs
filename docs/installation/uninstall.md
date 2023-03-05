---
title: 卸载 Kubernetes 和 Rainbond
description: 介绍如何卸载 Kubernetes 和 Rainbond 集群
keywords:
- 卸载 Kubernetes 集群
- 卸载 Rainbond 集群
---

本文档介绍如何 Rainbond 集群和卸载通过 Rainbond 安装的 Kubernetes 集群。

## 卸载 Rainbond 集群

### 基于主机安装的 Rainbond 集群

如果您使用基于主机安装的 Rainbond 集群，您可以在 **平台管理 -> 集群 -> 点击要卸载的集群的节点配置 -> 进入节点配置页面 -> 卸载集群**

### 基于 Kubernetes 安装的 Rainbond 集群

使用 Helm 卸载 Rainbond 

```bash
helm uninstall rainbond -n rbd-system 
```

删除 Rainbond 所创建的 `PVC` `PV` `CRD` `NAMESPACE` 

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

## 卸载 Kubernetes 集群

### 基于主机安装的 Kubernetes 集群

使用脚本清理 Kubernetes 集群

```bash
curl -sfL https://get.rainbond.com/clean-rke | bash
```
