---
title: grctl CLI
description: Rainbond CLI
weight: 1005
hidden: false
---

### Install command line tools

The command line tool `grctl` provides some tool commands that are convenient for Rainbond operation and maintenance. In version `5.2.0` , the tool is no longer built-in. If you use it, you need to install this command in advance; the user needs to enter the cluster management node, on the node Do the following.

The node must have the following conditions：

1. Has the kubectl command and is available.Please refer to[kubectl](./kubectl)for installation
2. There is a ~/.kube/conf file that accesses the Kubernetes cluster.

Installation method：

```shell
docker run -it --rm -v /:/rootfs registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-grctl:v5.8.1-release copy
mv /usr/local/bin/rainbond-grctl /usr/ local/bin/grctl && grctl install
```

If `Install success` is output, the installation is successful.

### Features

The grctl command is a cluster management tool independently developed by rainbond. It has the following main features:：

| functional module            | Command example                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Platform application control | `grctl service get <application alias> -t <team alias>` view application details<br />`grctl service list -t <team alias>` list application information<br />`grctl tenant list`list all teams<br />`grctl tenant get <Team alias>`List all applications of the team<br />`grctl tenant res <Team alias>`The team uses resources<br />`grctl build test`Pull the source code to the local for build test<br />`grctl build list`List the current Build task<br />`grctl build log <Task name>`View the corresponding build task log<br />`grctl gateway endpoints http`List the HTTP policy of the gateway proxy<br />`grctl gateway endpoints staeam`List the TCP policy of the gateway proxy<br />`grctl envoy endpoints --node`list all endpoints of the specified envoy node |
| Cluster Node Control         | `grctl cluster` View cluster status<br />`grctl config`View cluster region information, which is used to connect to the public cloud<br />`grctl node list` View cluster node list<br />`grctl node get <UID>`View node status<br />`grctl node cordon <UID>`Will A node is set to be unschedulable<br />`grctl node uncordon <UID>`Resume the scheduling of a node<br />`grctl node resource`View cluster resource usage<br />`grctl node condition`Node condition<br/>                                                                                                                                                                                                                                                                                                                                       |
|                              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

> More information can be obtained by `grctl -h` command

### Cluster management

- View cluster information

```bash
grctl cluster
```

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/tools/grctl/grctl-cluster.png" width="100%" />

- List cluster node information

```bash
grctl node list
```

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/tools/grctl/grctl-node-list.png" width="100%" />

- Get details of a node

```bash
grctl node get <UID>
```

- Disable/Allow scheduling to a node

```bash
# Disable scheduling to a node
grctl node cordon <UID>

# Allow scheduling to a node
grctl node uncordon <UID>
```

### Application management

- Get the detailed information of the application on the command line, copy the `query command` on the `scaling` interface of the application, and paste it on the server master node to view the detailed information of the current application

```bash
grctl service get grf2ebfd -t b40hkf9y
```

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/tools/grctl/grctl-server-get.png" width="100%" />

If you need to view the real-time log of the application, use the `PodName/Namespace` information obtained by the above command to view the real-time log of the application running

```bash
root@ubuntu:~# kubectl logs -f fa0a524589beabdc4503acd253f2ebfd-deployment-56dd54844d-m978r -n 1f732b0aadc94bd0ba288deff3a08c3f
Launching nginx
```

> Note: If there are multiple containers in a pod, you need to specify the name of the container to be queried after `PodName`
