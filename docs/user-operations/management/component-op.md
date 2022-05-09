---
title: Rainbond组件运维
weight: 1005
description: Rainbond组件运维
---

本章主要讲述Rainbond系统组件的常见运维方式，以帮助用户更快速，高效的运维Rainbond。


### 集群信息

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

### 组件信息

Rainbond所有组件都位于 `rbd-system` 同一名称空间下，由不同控制器管理

| 控制器类型  | 组件名称                   | 所属部署类型                 |
| ----------- | -------------------------- | ---------------------------- |
| statefulset | aliyun-csi-nas-provisioner | 使用阿里云NAS提供存储支持    |
| statefulset | rainbond-operator          | 所有版本                     |
| statefulset | rbd-db                     | 开源版、企业版               |
| statefulset | rbd-etcd                   | 所有版本                     |
| statefulset | rbd-monitor                | 所有版本                     |
| statefulset | rbd-repo                   | 所有版本                      |
| statefulset  | rbd-eventlog               | 所有版本                     |
| deployment  | rbd-api                    | 所有版本                     |
| deployment  | rbd-app-ui                 | 开源版、企业版               |
| deployment  | rbd-hub                    | 所有版本                     |
| deployment  | rbd-mq                     | 所有版本                     |
| deployment  | rbd-webcli                 | 所有版本                     |
| deployment  | rbd-worker                 | 所有版本                     |
| daemonset   | aliyun-csi-nas-plugin      | 使用阿里云NAS提供存储支持    |
| daemonset   | rbd-chaos                  | 所有版本                     |
| daemonset   | rbd-gateway                | 所有版本                     |
| daemonset   | rbd-node                   | 所有版本                     |


- 查看Rainbond所有组件的pod信息

```bash
kubectl get pod -n rbd-system
```

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/management/component-op/pod.png" width="100%" />


- 查看rainbond所有组件的pod信息，并且查看都在哪些节点上运行

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

`rbd-app-ui` 组件的日志持久化目录为 `/opt/rainbond/logs/rbd-app-ui` ，查看 `goodrain.log` 即可以看到相关日志信息。

源码构建过程相关日志查看，请参考 [grctl命令行工具](/docs/user-operations/tools/grctl)

**以下组件由systemd托管，可使用以下方式查看组件日志**

|服务名称|
|---|
|docker.service|
| kubelet.service|
| etcd.service|
|kube-apiserver.service|
| kube-controller-manager.service|
| kube-proxy.service|
| kube-scheduler.service|

#### 以docker服务为例

查看运行状态

```bash
systemctl status docker.service
```
查询日志

```bash
journalctl -fu docker.service
```

### 调整组件配置

这里以不同控制器类型的组件为例，修改其他组件配置时将名称及控制器类型替换即可

```bash
kubectl edit rbdcomponents rbd-api -n rbd-system
kubectl edit rbdcomponents rbd-db -n rbd-system
kubectl edit rbdcomponents rbd-node -n rbd-system
```

配置修改完成之后，保存退出，pod将自动重启更新配置

如果未自动重启请手动删除pod

```bash
kubectl delete pod <podName> -n rbd-system
```

关于更多组件配置介绍请查看 [平台组件架构](/docs/user-operations/op-guide/component-description)


### 在pod中的容器环境内执行shell命令

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

### 查看PV

```bash
$ kubectl get pv -A
NAME                                       CAPACITY   ACCESS MODES   RECLAIM POLICY   STATUS   CLAIM                STORAGECLASS   REASON   AGE
pvc-63476356-df1f-4057-80c2-897741887b96   1Mi        RWX            Delete           Bound    rbd-system/grdata    rbd-nfs                 3d
pvc-a78e2c32-2fa0-4869-82e7-59a0a9c2689b   1Mi        RWX            Delete           Bound    rbd-system/cache     rbd-nfs                 3d
pvc-b0ec90e1-2201-44d1-891b-f2e10127d7cc   1Mi        RWX            Delete           Bound    rbd-system/hubdata   rbd-nfs                 3d
```

### 命令行更换镜像

将由deployment控制权管理的 `rbd-api` 容器镜像滚动更新为 `goodrain.me/rbd-api:V5.2.0-release`

```bash
kubectl set image rbdcomponents rbd-api  rbd-api=goodrain.me/rbd-api:V5.2.0-release -n rbd-system
```