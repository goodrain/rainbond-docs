---
title: 日常维护工具集
summary: 命令行工具说明
toc: true
---

## 一、 grctl 

grctl命令是rainbond自带的集群管理工具，它具备如下主要功能特性：

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
   5.0-748241a-2018-12-09-08

COMMANDS:
     service    about  application service operation，grctl service -h
     tenant     grctl tenant -h
     node       节点管理相关操作
     cluster    show curren cluster datacenter info
     exec       进入容器方法。grctl exec POD_NAME COMMAND
     init       初始化集群。grctl init cluster
     show       显示region安装完成后访问地址
     alerting   监控报警。grctl alerting
     msg        应用异常通知事件。grctl msg
     reset      重置当前节点grctl reset
     conf       集群和服务配置相关工具
     domain
     buildtest  build test source code, If it can be build, you can build in rainbond
     help, h    Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --config value, -c value          default <USER_HOME>/.rbd/grctl.yaml
   --kubeconfig value, --kube value  default <USER_HOME>/.kube/config
   --help, -h                        show help
   --version, -v                     print the version
```

### 1.1 查看应用详情

```bash

# 获取应用详情
grctl service get grac5e3c -t 4ur5male

```

<img src="https://static.goodrain.com/images/docs/5.0/operation-manual/grctl-service-get.png" width="100%" />

- 查看应用容器真实使用内存

通过上面的操作可以获取应用所在的宿主机IP（10.0.4.12）和容器的ID(`342d8b28b86e`)，接下来就可以通过 `docker stats` 命令来查看容器真实使用的内存：

```bash
# 登录到应用所在的宿主机，如果是本机的话可以省略这一步
ssh 10.0.4.12

# 查看容器状态
docker stats 342d8b28b86e
```

<img src="https://static.goodrain.com/images/docs/3.6/operation-manual/get-container-memory.png" width="100%" />

### 1.2 操作节点

- 列出集群节点信息

```bash
grctl node list
```

<img src="https://static.goodrain.com/images/docs/3.7/operation-manual/grctl_node_list.png" width="100%" />

- 查看集群信息

```bash
grctl  cluster
```

<img src="https://static.goodrain.com/images/docs/5.0/operation-manual/grctl-cluster.png" width="100%" />

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

### 1.3 进入应用容器

```bash
grctl exec <PodName> bash
```

### 1.4 修改泛域名解析

Rainbond默认会申请一个泛解析域名提供给平台HTTP协议的应用使用，如果要修改泛解析地址，可以通过如下命令来设置：

```bash
grctl domain --ip <ip address>
```

## 二、其他命令行工具

### 2.1 din 进入指定容器

该命令是 `docker exec -it $1 ${2:-bash}` 命令的封装，可以进入到给定容器ID的容器内部。

```bash
din <容器ID>
```

> 如报错容器中没有bash，则在命令后加 `sh`

### 2.2 dps 查看运行与停止的容器

该命令是 `docker ps -a`  命令的封装，列出所有容器，包括运行与非运行状态。

### 2.3 cclear清理已经退出的容器

该命令是我们封装的脚本，可以清理已经退出的容器，脚本内容如下：

```bash
#!/bin/bash
rm_ctns=$(docker ps -a -q --filter 'status=exited')
if [ -z "$rm_ctns" ];then
	echo "no exited containers need to delete"
else
	docker rm $rm_ctns
fi
```

### 2.4 iclear 清理处于dangling状态的镜像

该命令是我们封装的脚本，可以清理处于 [dangling](https://stackoverflow.com/questions/45142528/docker-what-is-a-dangling-image-and-what-is-an-unused-image) 状态的镜像，脚本内容如下：

```bash
#!/bin/bash

#=============================
# <none> images cleanup script
#=============================

cclear

ilist=`docker images --filter "dangling=true" -q`

if [ "$ilist" != "" ];then

docker rmi $ilist

else
  echo -e "\nThere is no images of <none>"
fi
```

### 2.5 igrep 快速搜索镜像

快速定位指定关键词的镜像，该命令是我们封装的脚本，示例如下：

```bash
[root@manage01 ~]# igrep  api
34dd66d1e6bb        2 weeks             63.76 MB            rainbond/rbd-api:3.6
c71664913ade        11 days             63.77 MB            rainbond/rbd-api:cloud
d4e43a94f3e3        4 months            310.3 MB            rainbond/kube-apiserver:v1.6.4
```

### 2.6 ctop 查看容器资源使用情况

以top的形式查看容器运行状态。

<img src="https://static.goodrain.com/images/docs/3.6/operation-manual/ctop.gif" width="100%" />
