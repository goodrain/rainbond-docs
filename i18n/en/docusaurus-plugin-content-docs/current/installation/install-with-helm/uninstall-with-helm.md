---
title: 'helm installation and uninstallation guide'
weight: 205
description: 'Introduce how to uninstall a cluster installed based on helm'
---

#### helm installation and uninstallation guide

- Uninstall rainbond components

```
helm uninstall rainbond -n rbd-system 
```

- Delete rainbond corresponding PVC

```
kubectl get pvc -n rbd-system | grep -v NAME | awk '{print $1}' | xargs kubectl delete pvc -n rbd-system
```

- Delete rainbond corresponding PV

```
kubectl get pv | grep rbd-system | awk '{print $1}' | xargs kubectl delete pv
```

- remove the rbd-system namespace

```
kubectl delete ns rbd-system
```

- delete rainbond data directory


 ```
 rm -rf /opt/rainbond
 ```





