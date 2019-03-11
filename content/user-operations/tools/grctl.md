---
title: grctl
description: Rainbond CLI工具集
hidden: true
---

> grctl命令是rainbond自带的集群管理工具，它具备如下主要功能特性：

|功能模块|命令示例|
|-----------|-------------|
|平台应用控制|`grctl service get <应用别名> -t <团队别名>` 查看应用详情<br>`grctl service stop <团队别名>/<应用别名>` 关闭指定团队内某个应用<br>`grctl service start <团队别名>/<应用别名>` 启动指定团队内某个应用<br>|
|集群节点控制|`grctl cluster` 查看集群情况<br>`grctl node list` 查看集群节点列表<br>`grctl  node down <节点ID>`下线指定节点<br>`grctl  node up <节点ID>`上线指定节点<br>`grctl  node delete <节点ID>`删除指定节点<br>`grctl  node cordon <节点ID>`将某个节点设置为不可调度<br>`grctl  node uncordon <节点ID>`恢复某个节点的调度|

> 如何得知当前应用的 <团队别名> <应用别名>？

<img src="https://static.goodrain.com/images/docs/5.0/operation-manual/team-service-alias.png" width="100%" />

更多信息可通过help命令获取

```bash
[root@node1 ~]# grctl -h
NAME:
   grctl - A new cli application

USAGE:
   grctl [global options] command [command options] [arguments...]

VERSION:
   5.1.0-021799b-2019-03-11-01

COMMANDS:
     alerting   alerting rule manage
     buildtest  build test source code, If it can be build, you can build in rainbond
     cluster    show curren cluster datacenter info
     conf       Cluster and service configuration manage cmd
     domain     
     exec       open pod ttl console。grctl exec POD_NAME COMMAND
     init       grctl init cluster
     msg        manage exception notification events。grctl msg
     node       rainbond node manage cmd
     reset      reset current node
     service    about  application service operation，grctl service -h
     show       Display region api address after installation
     tenant     grctl tenant -h
     help, h    Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --config value, -c value          default <USER_HOME>/.rbd/grctl.yaml
   --kubeconfig value, --kube value  default <USER_HOME>/.kube/config
   --help, -h                        show help
   --version, -v                     print the version
```

### 应用级别

```bash

# 获取应用详情
grctl service get grac5e3c -t 4ur5male

```

<img src="https://static.goodrain.com/images/docs/5.0/operation-manual/grctl-service-get.png" width="100%" />

### 集群级别

- 查看集群信息

```bash
grctl  cluster
```

<img src="https://static.goodrain.com/images/docs/5.0/operation-manual/grctl-cluster.png" width="100%" />

- 列出集群节点信息

```bash
grctl node list
```

<img src="https://static.goodrain.com/images/docs/3.7/operation-manual/grctl_node_list.png" width="100%" />

- 获取某个节点的详细信息

```bash
# 可以获取这个节点集群服务的健康状态
grctl node get dfbb29b0d7b8b340120b4bb81a49efff
```

<img src="https://static.goodrain.com/images/docs/5.0/operation-manual/grctl-node-get.png" width="100%" />

- 下线与上线某个节点

```bash
# 下线节点
grctl node down dfbb29b0d7b8b340120b4bb81a49efff

# 上线节点
grctl node up dfbb29b0d7b8b340120b4bb81a49efff
```

- 禁止/允许调度到某个节点

```bash
# 禁止调度到某个节点
grct node cordon dfbb29b0d7b8b340120b4bb81a49efff

# 允许调度到某个节点
grctl node uncordon dfbb29b0d7b8b340120b4bb81a49efff
```

#### 节点初始化

```bash
USAGE:
   grctl init [command options] [arguments...]

OPTIONS:
   --role value                   Node identity property (default: "manage,compute") 
   --iip value                    Internal IP
   --eip value                    External IP
   --vip value                    Virtual IP
   --rainbond-version value       Rainbond Install Version. default 5.1 (default: "5.1")
   --rainbond-repo value          Rainbond install repo (default: "https://github.com/goodrain/rainbond-ansible.git")
   --install-type value           Install Type: online/offline (default: "online")
   --deploy-type value            Deploy Type: onenode/multinode/thirdparty,默认onenode (default: "onenode")
   --domain value                 Application domain
   --pod-cidr value               Configuration pod-cidr
   --enable-feature value         New feature，disabled by default. default: windows
   --enable-online-images value   Get image online. default: offline
   --storage value                Storage type, default:NFS (default: "nfs")
   --network value                Network type, support calico/flannel/midonet,default: calico (default: "calico")
   --enable-check value           enable check cpu/mem. default: enable/disable (default: "enable")
   --storage-args value           Stores mount parameters (default: "/grdata nfs rw 0 0")
   --config-file value, -f value  Global Config Path, default (default: "/opt/rainbond/rainbond-ansible/scripts/installer/global.sh")
```

### 1.3 进入应用容器

```bash
grctl exec <PodName> bash
```

### 1.4 修改泛域名解析

Rainbond默认会申请一个泛解析域名提供给平台HTTP协议的应用使用，如果要修改泛解析地址，可以通过如下命令来设置：

```bash
grctl domain --ip <ip address>
```