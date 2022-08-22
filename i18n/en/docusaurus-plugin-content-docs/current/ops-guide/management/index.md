---
title: 'Rainbond component operation and maintenance'
descrition: This chapter document is suitable for operation and maintenance personnel to understand Rainbond cluster operation and maintenance and other related knowledge
---

This chapter mainly describes the common operation and maintenance methods of Rainbond system components to help users operate and maintain Rainbond more quickly and efficiently.


## Cluster information

View all node information of the current cluster, the ready state is normal

```bash
$ kubectl get node
NAME STATUS ROLES AGE VERSION
192.168.31.157 Ready master 2d23h v1.16.2
192.168.31.239 Ready node 13m v1.16.2
```

View current cluster resource usage information

```bash
$ kubectl top node
NAME CPU(cores) CPU% MEMORY(bytes) MEMORY%
192.168.31.157 1584m 41% 5048Mi 69%
192.168.31.239 94m 5% 162Mi 2%
```

## Component information

For the introduction of each component, please refer to [Overview of Rainbond Components](/docs/ops-guide/component/)

View pod information for all components of Rainbond

```bash
kubectl get pod -n rbd-system
```

View the pod information of all rainbond components and see which nodes are running on them

```bash
kubectl get pods -o wide -n rbd-system
```

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/component-op/wasnode.png" width="100%" />

### View component details

Here we take the `rbd-api` component as an example to view the details

```bash
kubectl describe pod -l name=rbd-api -n rbd-system
```

### log view

#### Cluster log view

**For components running in pod mode, the logs can be viewed using**

- View logs in real time

```bash
kubectl logs -fl name=rbd-api -n rbd-system
```

Option Explanation:

  -f, --follow keep output log     
-l, --label label


- View the last 20 lines of log

```bash
kubectl logs --tail=20 -l name=rbd-api -n rbd-system
```

- View logs for the past 1 hour

```bash
kubectl logs --since=1h -l name=rbd-api -n rbd-system
```

To view other component logs, just replace the name of the component after name with the component you want to view the logs for

#### console log view

Console logs inside the container,`/app/logs/goodrain.log`

```shell
# Console
deployed by Allinone docker exec -it rainbond-allinone bash
tail -f /app/logs/goodrain.log

# Deployed in the cluster
# Enter the web terminal of rainbond-console and execute：
tail -f /app/logs/goodrain.log

# Helm deployment
kubectl exec -it rbd-app-ui-xxx -n rbd-system bash
tail -f /app/logs/goodrain.log
```



#### k8s log view

The following Kubernetes (RKE) service components are hosted by docker, and the logs can be viewed through `docker logs`.

Take `kubelet` as an example：

```shell
docker logs -f kubelet
```

| service name            |
| ----------------------- |
| docker.service          |
| kubelet                 |
| etcd                    |
| kube-apiserver          |
| kube-controller-manager |
| kube-proxy              |
| kube-scheduler          |

#### docker log view

The docker service is hosted by systemd.

View running status

```bash
systemctl status docker.service
```
query log

```bash
journalctl -fu docker.service
```

## Adjust cluster-side component configuration

Here, components with different controller types are used as an example. When modifying the configuration of other components, replace the name and controller type.

```bash
kubectl edit rbdcomponents rbd-api -n rbd-system
kubectl edit rbdcomponents rbd-db -n rbd-system
kubectl edit rbdcomponents rbd-node -n rbd-system
```

After the configuration modification is completed, save and exit, the pod will automatically restart to update the configuration

### Add Volume to cluster-side components

Take `rbd-api` as an example, add `Volume`to `rbd-api`

```yaml title="kubectl edit rbdcomponents.rainbond.io rbd-api -n rbd-system"
spec:
  volumeMounts:
  - mountPath: /etc/goodrain/goodrain.com/
    name: region-ws-ssl
  volumes:
  - name: region-ws-ssl
    secret:
      defaultMode: 420
      secretName: region- ws-ssl
```

### Add Env to cluster-side components

Take `rbd-api` as an example, add `env`to `rbd-api`

```yaml title="kubectl edit rbdcomponents.rainbond.io rbd-api -n rbd-system"
spec:
  env:
  - name: DEMO_GREETING
    value: "Hello from the environment"
  - name: DEMO_FAREWELL
    value: "Such a sweet sorrow"
```

For more component configuration introduction, please see [Platform Component Architecture](/docs/ops-guide/component/)


## Execute shell command inside container environment in pod

**Enter the container to execute the command**

Take the `rbd-gateway` component as an example, enter the pod to view the nginx configuration

```bash
# First check the PodName of the gateway component
root@ubuntu:~# kubectl get pods -l name=rbd-gateway -n rbd-system
NAME READY STATUS RESTARTS AGE
rbd-gateway-bcjjg 1/1 Running 4 2d4h
# Enter pod
kubectl exec -it rbd-gateway-bcjjg -n rbd-system bash
# Execute shell commands inside pod to view nginx configuration
bash-5.0# cat /run/nginx/conf/nginx.conf
```

**Execute in-container commands directly from the command line using `kubectl`**

Example：

View the console log of`rbd-app-ui`

```bash
kubectl exec -it -n rbd-system rbd-app-ui-684d67d8f5-8k4bb -- tail -f /app/logs/goodrain.log
```

## View PV

```bash
$ kubectl get pv -A
NAME CAPACITY ACCESS MODES RECLAIM POLICY STATUS CLAIM STORAGECLASS REASON AGE
pvc-63476356-df1f-4057-80c2-897741887b96 1Mi RWX Delete Bound rbd-system/grdata rbd-nfs 3d
pvc-a78e2c32 4869-82e7-59a0a9c2689b 1Mi RWX Delete Bound rbd-system/cache rbd-nfs 3d
pvc-b0ec90e1-2201-44d1-891b-f2e10127d7cc 1Mi RWX Delete Bound rbd-system/hubdata rbd-nfs 3d
```

## Replacing mirrors from the command line

Rolling update `rbd-api` container image managed by deployment control to `goodrain.me/rbd-api:V5.2.0-release`

```bash
kubectl set image rbdcomponents rbd-api rbd-api=goodrain.me/rbd-api:V5.2.0-release -n rbd-system
```



## More operation and maintenance guides

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```