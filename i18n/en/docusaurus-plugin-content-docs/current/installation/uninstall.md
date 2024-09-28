---
title: Uninstall Kubernetes and Rainbond
description: This section describes how to uninstall the Rainbond standalone version, the Rainbond cluster, and the Kubernetes cluster installed through Rainbond
keywords:
  - Uninstall Kubernetes Cluster
  - Uninstall Rainbond Cluster
---

This document describes how to uninstall Rainbond monolithic and Rainbond clusters and the Kubernetes cluster installed through Rainbond

## Uninstall Rainbond single version

If you use a fast installed version of Rainbond monoliths, you can uninstall： by following

1. Remove the `rainbond-allinone` container.

```bash
docker stop rainbond-allinone && docker rm rainbond-allinone
```

2. Remove Rainbond data directory.

```bash
# Linux
rm -rf ~/rainbonddata /opt/rainbond

# MacOS & Windows
docker volume rm rainbond-data
docker volume rm rainbond-opt
```

## Uninstall Rainbond Cluster

### Rainbond cluster based on host installation

If you use the Rainbond cluster based on host installation, you can manage the **Platforms -> Cluster -> Click on the node configuration -> Access the node configuration page -> Uninstall the cluster**

### Rainbond cluster based on Kubernetes

Uninstall Rainbond with Helm

```bash
help uninstall rainbond -n rbd-system 
```

Delete `PVC` `PV` `CRD` from Rainbond

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

Remove Rainbond data directory

```bash
rm -rf /opt/rainbond
```

## Uninstall Kubernetes Cluster

### Kubernetes cluster based on host installation

Use script to clean the Kubernetes cluster

```bash
curl -sfL https://get.rainbond.com/clean-rke | bash
```
