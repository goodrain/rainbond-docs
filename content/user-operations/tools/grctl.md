---
title: grctl
description: Rainbond CLI工具集
hidden: true
---

> grctl命令是rainbond自带的集群管理工具，它具备如下主要功能特性：

|功能模块|命令示例|
|-----------|-------------|
|平台应用控制|`grctl service get <应用别名> -t <团队别名>` 查看应用详情<br>`grctl service stop <团队别名>/<应用别名>` 关闭指定团队内某个应用<br>`grctl service start <团队别名>/<应用别名>` 启动指定团队内某个应用<br>`grctl service list -t <团队别名>` 列出应用信息<br>`grctl tenant list`列出所有团队<br>`grctl tenant get <团队别名>`列出该团队所有应用<br>`grctl tenant res <团队别名>`该团队使用资源`grctl tenant batchstop <团队别名>`批量停团队应用<br>`grctl exec <PODNAME> <CMD>`|
|集群节点控制|`grctl init`初始化数据中心<br>`grctl cluster` 查看集群情况<br>`grctl node list` 查看集群节点列表<br>`grctl node get <节点ID>`查看节点状态<br>`grctl  node down <节点ID>`下线指定节点<br>`grctl  node up <节点ID>`上线指定节点<br>`grctl  node delete <节点ID>`删除指定节点<br>`grctl  node cordon <节点ID>`将某个节点设置为不可调度<br>`grctl  node uncordon <节点ID>`恢复某个节点的调度<br>`grctl node resource`查看集群资源使用情况<br>`grctl node rule`节点身份属性<br>`grctl node label`节点label标签<br>`grctl node condition`节点condition<br>|
|集群运维控制|`grctl node add`节点扩容<br>`grctl reset`重置当前节点<br>`grclt domain`调整集群默认解析`grctl msg/alerting`集群报警功能|

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
   5.1.0-742a75d-2019-03-11-08

COMMANDS:
     alerting   alerting rule manage
     buildtest  build test source code, If it can be build, you can build in rainbond
     cluster    show curren cluster datacenter info
     conf       Cluster and service configuration manage cmd
     domain     Default *.grapps.cn domain resolution
     exec       open pod ttl console。grctl exec POD_NAME COMMAND
     init       grctl init cluster
     msg        manage exception notification events。grctl msg
     node       rainbond node manage cmd
     reset      reset the current node
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

- 进行容器内部

```bash
grctl exec <PodName> bash
```

- 修改域名解析

```bash
grctl domain --ip <ip address>
```

### 节点初始化重要参数说明

```bash
USAGE:
   grctl init [command options] [arguments...]

OPTIONS:
   --role value                   Node identity property (default: "manage,compute") 
   --iip value                    Internal IP
   --eip value                    External IP
   --rainbond-version value       Rainbond Install Version. default 5.1 (default: "5.1")
   --rainbond-repo value          Rainbond install repo (default: "https://github.com/goodrain/rainbond-ansible.git")
   --install-type value           Install Type: online/offline (default: "online")
   --deploy-type value            Deploy Type: onenode/multinode/thirdparty,默认onenode (default: "onenode")
   --domain value                 Application domain
   --pod-cidr value               Configuration pod-cidr
   --storage value                Storage type, default:NFS (default: "nfs")
   --network value                Network type, support calico/flannel/midonet,default: calico (default: "calico")
   --enable-check value           enable check cpu/mem. default: enable/disable (default: "enable")
   --storage-args value           Stores mount parameters (default: "/grdata nfs rw 0 0")
```

|参数|默认值|可选值|说明|
|-----------|-------------|-----------|-------------|
|role|`manage,compute`|`manage,compute`,`manage`|节点身份属性,默认是管理节点计算节点复用|
|iip|||当前节点内网ip,未指定内网ip，当多网卡时会随机选择一个内网地址(多网卡建议指定)|
|eip|||当前节点公网ip(SLB或者弹性ip等),如果指定公网ip,则默认域名(grapps.cn)会解析到此公网ip|
|rainbond-version|5.1|5.0,devel(测试分支)|默认是当前稳定版本|
|rainbond-repo|https://github.com/goodrain/rainbond-ansible.git||rainbond-ansible仓库地址|
|install-type |online|offline|安装类型:在线安装/离线安装|
|deploy-type|onenode|thirdparty|部署类型:内置k8s/对接k8s|
|domain|||应用默认分配域名,在线未指定域名，则会生成grapps.cn默认域名;离线未指定会生成`pass.example.com`或`pass.grapps.cn`|
|pod-cidr|||应用的ip|
|storage|nfs|nas,gfs|存储类型|
|storage-args|||存储参数,示例nas: "82b554a292-rvg38.cn-huhehaote.nas.aliyuncs.com:/ /grdata nfs vers=3,nolock,noatime 0 0"|
|network|calico|flannel|应用网络类型|
|enable-check|enable|disable|默认开启系统检查|

```bash
# 示例初始化集群，使用阿里云NAS
./grctl init --iip 172.24.202.225 --eip 39.104.75.32 --rainbond-version devel --rainbond-repo https://github.com/ysicing/rainbond-ansible.git --storage nas --storage-args "82b554a292-rvg38.cn-huhehaote.nas.aliyuncs.com:/ /grdata nfs vers=3,nolock,noatime 0 0"
```