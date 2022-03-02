---
title: grctl
description: Rainbond CLI工具集
hidden: true
---

> grctl命令是rainbond自带的集群管理工具，它具备如下主要功能特性：

|功能模块|命令示例|
|-----------|-------------|
|平台应用控制|`grctl service get <应用别名> -t <团队别名>` 查看应用详情<br />`grctl service stop <团队别名>/<应用别名>` 关闭指定团队内某个应用<br />`grctl service start <团队别名>/<应用别名>` 启动指定团队内某个应用<br />`grctl service list -t <团队别名>` 列出应用信息<br />`grctl tenant list`列出所有团队<br />`grctl tenant get <团队别名>`列出该团队所有应用<br />`grctl tenant res <团队别名>`该团队使用资源`grctl tenant batchstop <团队别名>`批量停团队应用<br />`grctl exec <PODNAME> <CMD>`<br />`grctl msg`应用异常处理|
|集群节点控制|`grctl init`初始化数据中心<br />`grctl cluster` 查看集群情况<br />`grctl node list` 查看集群节点列表<br />`grctl node get <节点ID>`查看节点状态<br />`grctl  node down <节点ID>`下线指定节点<br />`grctl  node up <节点ID>`上线指定节点<br />`grctl  node delete <节点ID>`删除指定节点<br />`grctl  node cordon <节点ID>`将某个节点设置为不可调度<br />`grctl  node uncordon <节点ID>`恢复某个节点的调度<br />`grctl node resource`查看集群资源使用情况<br />`grctl node rule`节点身份属性<br />`grctl node label`节点label标签<br />`grctl node condition`节点condition<br />|
|集群运维控制|`grctl node add`节点扩容<br />`grctl reset`重置当前节点<br />`grclt domain`调整集群默认解析`grctl msg/alerting`集群报警功能|

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
   5.1.1-5cb66ee-2019-03-21-10

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

#### 应用异常处理

使用`grctl msg get`默认获取三天内未处理的应用异常事件，如果你需要查询某时间段的异常事件，可以使用`--st`和`--et`分别指定开始时间戳与结束时间戳，如果只有开始时间并不指定结束时间，则结束时间默认为当前时间。

```bash
# 获取异常信息
grctl msg get --st 1539267839 --et 1544538239
# 处理异常
grctl msg handle -n gr9c80c9 -m '应用已处理'
```

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
   --enable-exdb value            default disable external database
   --exdb-type value              external database type(mysql,postgresql)
   --exdb-host value              external database host
   --exdb-port value              external database port (default: "3306")
   --exdb-user value              external database user
   --exdb-passwd value            external database password
   --excsdb-host value            external console database host
   --excsdb-port value            external console database port (default: "3306")
   --excsdb-user value            external console database user
   --excsdb-passwd value          external console database password
   --enable-excsdb-only value     Additional support for the console to configure the database separately
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

#### 初始化对接存储

Rainbond在执行集群初始化的时候，可以通过指定参数对接已存在的存储（NAS/GlusterFS）

|参数|说明|
|-----------|-------------|
|--storage| 存储类型|
|--storage-args| 存储挂载参数|

```bash
# 示例初始化集群，使用阿里云NAS
./grctl init --storage nas --storage-args "82b554a292-rvg38.cn-huhehaote.nas.aliyuncs.com:/ /grdata nfs vers=3,nolock,noatime 0 0"
# 示例初始化集群，使用GlusterFS
./grctl init  --storage gfs --storage-args "10.10.10.13:rbdgluster /grdata glusterfs backupvolfile-server=10.10.10.14,use-readdirp=no,log-level=WARNING,log-file=/var/log/gluster.log 0 0"
```

#### 初始化对接外部数据库

|参数|说明|
|-----------|-------------|
| ---enable-exdb | 默认禁用使用外部数据库，启动值为true|
|--exdb-type| 默认数据库类型，目前只支持mysql|
|--exdb-host/--exdb-port/--exdb-user/--exdb-passwd| 外部数据库连接信息|
|--enable-excsdb-only| console使用外部数据库|
|--excsdb-host/--excsdb-port/--excsdb-user/--excsdb-passwd| 外部数据库(console)连接信息|


当启用外部数据库时,其他配置项才生效


```bash
#  此示例表示, 数据中心数据库和控制台数据库都使用外部数据库(不分离)
./grctl init --enable-exdb true --exdb-host 139.196.72.60 --exdb-port 21355 --exdb-user admin   --exdb-passwd  c13dc213
# 此示例表示, 数据中心数据库使用本地数据库(rbd-db), 控制台数据库都使用外部数据库
./grctl init --enable-exdb true --enable-excsdb-only true --excsdb-host 139.196.72.60 --excsdb-port 21355 --excsdb-user admin   --excsdb-passwd  c13dc213
# 此示例表示, 数据中心数据库和控制台数据库都使用外部数据库(分离)
./grctl init --enable-exdb true --exdb-host 139.196.72.60 --exdb-port 21356 --exdb-user admin   --exdb-passwd c13dc213 --enable-excsdb-only true --excsdb-host 139.196.72.60 --excsdb-port 21355 --excsdb-user admin   --excsdb-passwd  c13dc213
```