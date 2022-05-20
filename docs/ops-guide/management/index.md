---
title: 'Rainbond 组件运维'
descrition: 该章节文档适用于运维人员了解Rainbond集群运维等相关知识
---

本章主要讲述Rainbond系统组件的常见运维方式，以帮助用户更快速，高效的运维Rainbond。


## 集群信息

查看当前集群的所有节点信息，ready状态为正常状态

```bash
$ kubectl get node
NAME             STATUS   ROLES    AGE     VERSION
192.168.31.157   Ready    master   2d23h   v1.16.2
192.168.31.239   Ready    node     13m     v1.16.2
```

查看当前集群资源使用信息

```bash
$ kubectl top node
NAME             CPU(cores)   CPU%   MEMORY(bytes)   MEMORY%
192.168.31.157   1584m        41%    5048Mi          69%
192.168.31.239   94m          5%     162Mi           2%
```

## 组件信息

各个组件介绍请参见 [Rainbond组件概述](/docs/ops-guide/component/)

查看Rainbond所有组件的pod信息

```bash
kubectl get pod -n rbd-system
```

查看rainbond所有组件的pod信息，并且查看都在哪些节点上运行

```bash
kubectl get pods -o wide -n rbd-system
```

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/component-op/wasnode.png" width="100%" />

### 查看组件详细信息

这里以 `rbd-api` 组件为例,查看详细信息

```bash
kubectl describe pod -l name=rbd-api   -n rbd-system
```

### 日志查看

#### 集群端日志查看

**对于以pod方式运行的组件，可以使用以下方式查看日志**

- 实时查看日志

```bash
kubectl logs -fl name=rbd-api -n rbd-system
```

选项解释:

  -f, --follow  持续输出日志     
  -l, --label  标签
    

- 查看最近20行日志

```bash
kubectl logs --tail=20 -l name=rbd-api  -n rbd-system
```

- 查看过去1个小时的日志

```bash
kubectl logs --since=1h -l name=rbd-api  -n rbd-system
```

要查看其他组件日志，只需将name后的组件名称替换为想要查看日志的组件即可

#### 控制台日志查看

控制台日志在容器内的，`/app/logs/goodrain.log`

```shell
# Allinone 部署的控制台
docker exec -it rainbond-allinone bash
tail -f /app/logs/goodrain.log

# 部署在集群中
# 进入 rainbond-console 的 Web 终端中，执行：
tail -f /app/logs/goodrain.log

# Helm 部署
kubectl exec -it rbd-app-ui-xxx -n rbd-system bash
tail -f /app/logs/goodrain.log
```



#### k8s日志查看

以下 Kubernetes(RKE) 服务组件均是有 docker 托管，查看其日志则通过 `docker logs` 查看。

以 `kubelet` 为例：

```shell
docker logs -f kubelet
```

|服务名称|
|---|
|docker.service|
| kubelet |
| etcd |
|kube-apiserver|
| kube-controller-manager |
| kube-proxy |
| kube-scheduler |

#### docker日志查看

docker 服务由 systemd 托管。

查看运行状态

```bash
systemctl status docker.service
```
查询日志

```bash
journalctl -fu docker.service
```

## 调整集群端组件配置

这里以不同控制器类型的组件为例，修改其他组件配置时将名称及控制器类型替换即可

```bash
kubectl edit rbdcomponents rbd-api -n rbd-system
kubectl edit rbdcomponents rbd-db -n rbd-system
kubectl edit rbdcomponents rbd-node -n rbd-system
```

配置修改完成之后，保存退出，pod将自动重启更新配置

### 给集群端组件添加 Volume

以 `rbd-api` 为例，给 `rbd-api` 添加 `Volume`

```yaml title="kubectl edit rbdcomponents.rainbond.io rbd-api -n rbd-system"
spec:
  volumeMounts:
  - mountPath: /etc/goodrain/goodrain.com/
    name: region-ws-ssl
  volumes:
  - name: region-ws-ssl
    secret:
      defaultMode: 420
      secretName: region-ws-ssl
```

### 给集群端组件添加 Env

以 `rbd-api` 为例，给 `rbd-api` 添加 `env`

```yaml title="kubectl edit rbdcomponents.rainbond.io rbd-api -n rbd-system"
spec:
  env:
  - name: DEMO_GREETING
    value: "Hello from the environment"
  - name: DEMO_FAREWELL
    value: "Such a sweet sorrow"
```

关于更多组件配置介绍请查看 [平台组件架构](/docs/ops-guide/component/)


## 在pod中的容器环境内执行shell命令

**进入容器执行命令**

以 `rbd-gateway` 组件为例，进入pod查看nginx配置

```bash
# 首先查看gateway组件的PodName
root@ubuntu:~# kubectl get pods -l name=rbd-gateway -n rbd-system
NAME                READY   STATUS    RESTARTS   AGE
rbd-gateway-bcjjg   1/1     Running   4          2d4h
# 进入pod
kubectl exec -it rbd-gateway-bcjjg -n rbd-system bash
# 在pod内部执行shell命令查看nginx配置
bash-5.0#  cat /run/nginx/conf/nginx.conf
```

**直接在命令行使用 `kubectl` 执行容器内命令**

示例：

查看`rbd-app-ui`的控制台日志

```bash
kubectl exec -it -n rbd-system rbd-app-ui-684d67d8f5-8k4bb -- tail -f /app/logs/goodrain.log
```

## 查看PV

```bash
$ kubectl get pv -A
NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM                STORAGECLASS   REASON   AGE
pvc-63476356-df1f-4057-80c2-897741887b96   1Mi        RWX            Delete           Bound    rbd-system/grdata    rbd-nfs                 3d
pvc-a78e2c32-2fa0-4869-82e7-59a0a9c2689b   1Mi        RWX            Delete           Bound    rbd-system/cache     rbd-nfs                 3d
pvc-b0ec90e1-2201-44d1-891b-f2e10127d7cc   1Mi        RWX            Delete           Bound    rbd-system/hubdata   rbd-nfs                 3d
```

## 命令行更换镜像

将由deployment控制权管理的 `rbd-api` 容器镜像滚动更新为 `goodrain.me/rbd-api:V5.2.0-release`

```bash
kubectl set image rbdcomponents rbd-api  rbd-api=goodrain.me/rbd-api:V5.2.0-release -n rbd-system
```



## 更多运维指南

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```