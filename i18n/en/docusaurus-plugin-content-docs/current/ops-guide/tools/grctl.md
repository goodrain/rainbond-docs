---
title: grctl CLI
description: Rainbond CLI
weight: 1005
hidden: false
---

### Install Command Line Tool

The command line tool `grctl` provides some of the tools command that can be used by a member of the party Rainbond Caravan and is no longer built-in in version 5.2.0\`. If used, the command needs to be installed in advance; the user needs to enter the cluster management node and perform the following actions at that node.

The node must have the following conditions：

1. has kubectl commands and is available.安装请参考[kubectl](./index.md#kubectl)。
2. A ~/.kube/conf file exists to access the Kubernetes cluster.

Installation Method：

```bash
docker run -it --rm -v //rootfs registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-grctl:v5.17.3-release copy
```

```bash
mv /usr/local/bin/rainbond-grctl /usr/local/bin/grctl && grctl install
```

Installed after output \`Installing success'.

### Feature Features

grctl command is a cluster management tool developed by rainbond autonomy. It has the following main feature：

| Function Module       | Sample Command                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Platform App Controls | `grctl service get <应用别名> -t <团队别名>` 查看应用详情<br />`grctl service list -t <团队别名>` 列出应用信息<br />`grctl tenant list`列出所有团队<br />`grctl tenant get <团队别名>`列出该团队所有应用<br />`grctl tenant res <团队别名>`该团队使用资源<br />`grctl build test`将源码拉取到本地后进行构建测试<br />`grctl build list`列出当前的构建任务<br />`grctl build log <任务名称>`查看对应构建任务日志<br />`grctl gateway endpoints http`列出 gateway 代理的 HTTP 策略<br />`grctl gateway endpoints staeam`列出 gateway 代理的 TCP 策略<br />`grctl envoy endpoints --node`列出指定 envoy 节点的所有 endpoints |
| Cluster Node Control  | `grctl cluster` 查看集群情况<br />`grctl config`查看集群 region 信息，用于对接公有云<br />`grctl node list` 查看集群节点列表<br />`grctl node get <UID>`查看节点状态<br />`grctl node cordon <UID>`将某个节点设置为不可调度<br />`grctl node uncordon <UID>`恢复某个节点的调度<br />`grctl node resource`查看集群资源使用情况<br />`grctl node condition`节点 condition<br/>                                                                                                                                                                                              |
|                       |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

> More information can be obtained through the `grctl -h` command

### Cluster management

- View cluster information

```bash
grctl cluster
```

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/tools/grctl/grctl-cluster.png" width="100%" />

- List cluster node information

```bash
grctl list
```

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/tools/grctl/grctl-node-list.png" width="100%" />

- Get details about a node

```bash
grctl node get <UID>
```

- Disable/allow scheduling to a node

```bash
# Disallow scheduling to a node
grctl node according to <UID>

# Allow scheduling to a node
grctl node uncordon <UID>
```

### App management

- Get the app details at the command line, copy the `query command` on the app `scale` interface, paste them on the server main node to see the details of the current app

```bash
grctl service get grf2ebfd -t b40hkf9y
```

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/tools/grctl/grctl-server-get.png" width="100%" />

If you want to view the application's real-time log, the `PodName/Namespace` information obtained with the above command, you can see the live logs that the app is running

```bash
root@ubuntu:~# kubectl logs-f faa524589beabdc4503acd253f2ebfd-employment-56dd54d-m978r -n 1f732b0aadc94bd0ba 288deff3a08c3f
Launching nginx
```

> Note: If there are more than one container in a pod, the name of the container to search after `PodName` is specified
