---
title: Example Modify a cluster mirror vault
descrition: How do I change the default mirror warehouse of the cluster
keywords:
  - Rainbond Cluster Mirror Repository Modification
---

:::tip
If there are no mirror repositories configured at the time of installation, Rainbond will install a private mirror repository rbd-hub to store building images.If mirror repository information is configured at the time of installation, Rainbond will use the configured mirror repository.
:::

This will describe two scenes that modify mirror repository： after installing clusters

1. Clusters installed, using rbd-hub mirror repository by default. Want to switch to external mirror repository
2. ClusterIntegration|Installed using external mirror repository, want to switch to the default rbd-hub repository

## Switch to external mirror repository

If the default rbd-hub mirror repository is used when installing clusters, switching to external mirror repositories can be done with the following commands to switch：

1. Edit the `rainbondcluster` resource and modify the `imageHub` field.

```yaml
$ kubectl edit rainbondcluster-n rbd-system
spec:
  imagHeb: # modify this field
    domain: 172.31.112.97:500000
    namespace: rainbond
    password: admin
    username: admin Admin 
 username: admin admin
```

2. Remove `rbd-hub` CRD resource.

```yaml
kubtl delete rbdcomponent rbd-hub -n rbd-system 
```

3. Restart the `rainbond-operator` component.

```bash
kubtl delete pod -l release=rainbond-operator, n rbd-system
```

4. Restart the `rbd-chaos` and `rbd-node` components.

```bash
kubtl delete pod -l name=rbd-chaos -n rbd-system
kubectl delete pod -l name=rbd-node -n rbd-system
```

## Switch to Default Mirror Repository

If an external mirror repository is used when installing a cluster, it does not want to use an external mirror repository at this time, it will switch to the default rbd-hub mirror repository with the following commands to switch：

1. Edit the `rainbondcluster` resource to delete the custom `imageHub` field.

```yaml
$ kubectl edit rainbondcluster -n rbd-system

spec:
  imageHub: # delete this field
    domain: 172.31.112.97:500000
    password: admin
    username: admin admin admin username: admin admin
```

2. Restart the `rainbond-operator` component.

```bash
kubtl delete pod -l release=rainbond-operator, n rbd-system
```

3. Create a `rbd-hub` CRD resource.

```yaml
$ kubectl apple-f rbd-hub.yaml

apiVersion: rainbod. o/v1alpha1
ind: RbdComponent
metadata:
  name: rbd-hub
  namespace: rbd-system
  labels:
    belongTo: rainbond-operator
    creator: Rainbond
    name: rbd-hub
    priorityComponent: "true"
    persententVolumeClaimAccesses: ReadWriteOnce
spec:
  replas: 1
  image: registry. n-hangzhou.aliyuncs.com/goodrain/registry:2.6.2
  imagePullPolicy: IfNotPresent
  priorityComposition: true
```

4. Restart the `rbd-chaos` and `rbd-node` components.

```bash
kubtl delete pod -l name=rbd-chaos -n rbd-system
kubectl delete pod -l name=rbd-node -n rbd-system
```
