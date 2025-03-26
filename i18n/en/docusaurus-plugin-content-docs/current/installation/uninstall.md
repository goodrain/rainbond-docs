---
title: Uninstall
description: Introduces how to uninstall Rainbond standalone version and Rainbond cluster as well as the Kubernetes cluster installed via Rainbond
keywords:
  - Uninstall Kubernetes cluster
  - Uninstall Rainbond cluster
---

:::warning
Uninstalling Rainbond will delete cluster data. Please back up your data before proceeding.
:::

## Uninstall quickly installed Rainbond

If you used the quick installation method for Rainbond, you can uninstall it in the following ways:

1. Delete the `rainbond` container.

```bash
docker stop rainbond && docker rm rainbond
```

2. Delete the Rainbond data directory.

```bash
# Linux
rm -rf /opt/rainbond

# MacOS & Windows
docker volume rm rainbond-opt
```

## Uninstall Rainbond cluster installed based on hosts

If you installed the cluster based on hosts, you can go to **Platform Management -> Cluster -> Delete Cluster**.And execute the following command on each node:

```bash
/usr/local/bin/rke2-uninstall.sh
```

Delete the Rainbond data directory

```bash
rm -rf /opt/rainbond
```

## Uninstall Rainbond cluster installed based on Helm

Use Helm to uninstall Rainbond

```bash
helm uninstall rainbond -n rbd-system 
```

Delete `PVC, PV, CRD, NAMESPACE` created by Rainbond

```bash
# Delete PVC
kubectl get pvc -n rbd-system | grep -v NAME | awk '{print $1}' | xargs kubectl delete pvc -n rbd-system

# Delete PV
kubectl get pv | grep rbd-system | grep -v NAME | awk '{print $1}' | xargs kubectl delete pv

# Delete CRD
kubectl delete crd componentdefinitions.rainbond.io \
helmapps.rainbond.io \
rainbondclusters.rainbond.io \
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

Delete the Rainbond data directory

```bash
rm -rf /opt/rainbond
```
