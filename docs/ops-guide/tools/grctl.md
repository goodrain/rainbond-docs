---
title: grctl CLI
description: Rainbond CLI
weight: 1005
hidden: false
---

### 安装命令行工具

命令行工具 `grctl` 提供一些便于 Rainbond 运维的工具命令，在 `5.2.0` 版本该工具不再内置，如有使用，需提前安装安装此命令；用户需进入集群管理节点，在该节点进行以下操作。

该节点必须具备以下条件：

1. 具有 kubectl 命令，且可用。安装请参考[kubectl](./index#kubectl)。
2. 存在访问 Kubernetes 集群的 ~/.kube/conf 文件。

安装方式：

```bash
docker run -it --rm -v /:/rootfs  registry.cn-hangzhou.aliyuncs.com/goodrain/rbd-grctl:v5.17.1-release copy
```

```bash
mv /usr/local/bin/rainbond-grctl /usr/local/bin/grctl && grctl install
```

若输出 `Install success` 则安装成功。

### 功能特性

grctl 命令是 rainbond 自主开发的集群管理工具，它具备如下主要功能特性：

| 功能模块     | 命令示例                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| ------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 平台应用控制 | `grctl service get <应用别名> -t <团队别名>` 查看应用详情<br />`grctl service list -t <团队别名>` 列出应用信息<br />`grctl tenant list`列出所有团队<br />`grctl tenant get <团队别名>`列出该团队所有应用<br />`grctl tenant res <团队别名>`该团队使用资源<br />`grctl build test`将源码拉取到本地后进行构建测试<br />`grctl build list`列出当前的构建任务<br />`grctl build log <任务名称>`查看对应构建任务日志<br />`grctl gateway endpoints http`列出 gateway 代理的 HTTP 策略<br />`grctl gateway endpoints staeam`列出 gateway 代理的 TCP 策略<br />`grctl envoy endpoints --node`列出指定 envoy 节点的所有 endpoints |
| 集群节点控制 | `grctl cluster` 查看集群情况<br />`grctl config`查看集群 region 信息，用于对接公有云<br />`grctl node list` 查看集群节点列表<br />`grctl node get <UID>`查看节点状态<br />`grctl node cordon <UID>`将某个节点设置为不可调度<br />`grctl node uncordon <UID>`恢复某个节点的调度<br />`grctl node resource`查看集群资源使用情况<br />`grctl node condition`节点 condition<br/>                                                                                                                                                                                                                                                   |
|              |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |

> 更多信息可通过 `grctl -h` 命令获取

### 集群管理

- 查看集群信息

```bash
grctl  cluster
```

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/tools/grctl/grctl-cluster.png" width="100%" />

- 列出集群节点信息

```bash
grctl node list
```

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/tools/grctl/grctl-node-list.png" width="100%" />

- 获取某个节点的详细信息

```bash
grctl node get <UID>
```

- 禁止/允许调度到某个节点

```bash
# 禁止调度到某个节点
grctl node cordon <UID>

# 允许调度到某个节点
grctl node uncordon <UID>
```

### 应用管理

- 在命令行获取应用的详细信息，在应用的 `伸缩` 界面复制 `查询命令` ，在服务器主节点上粘贴，即可查看当前应用的详细信息

```bash
grctl service get grf2ebfd -t b40hkf9y
```

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/tools/grctl/grctl-server-get.png" width="100%" />

如果需要查看该应用的实时日志，使用上述命令得到的 `PodName/Namespace` 信息，即可查看该应用运行的实时日志

```bash
root@ubuntu:~# kubectl logs -f fa0a524589beabdc4503acd253f2ebfd-deployment-56dd54844d-m978r -n 1f732b0aadc94bd0ba288deff3a08c3f
Launching nginx
```

> 注: 如果在一个 pod 中有多个容器，需在 `PodName` 后指定要查询的容器名字
