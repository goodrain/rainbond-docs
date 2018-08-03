---
title: 命令行工具
summary: 命令行工具说明
toc: true
---

## 一、grctl 命令

grctl命令是rainbond自带的集群管理工具，它具备如下主要功能特性：

|功能模块|命令示例|
|-----------|-------------|
|平台应用控制|`grctl service get <url>` 查看应用详情<br>`grctl service stop <团队别名>/<应用别名>` 关闭指定团队内某个应用<br>`grctl service start <团队别名>/<应用别名>` 启动指定团队内某个应用<br>|
|集群节点控制|`grctl node list` 查看集群节点情况<br>`grctl  node down <节点ID>`下线指定节点<br>`grctl  node up <节点ID>`上线指定节点<br>`grctl  node delete <节点ID>`删除指定节点<br>`grctl  node unscheduable <节点ID>`将某个节点设置为不可调度<br>`grctl  node rescheduable <节点ID>`恢复某个节点的调度|

更多信息可通过help命令获取

```bash
grctl -h

NAME:
   grctl - A new cli application

USAGE:
   grctl [global options] command [command options] [arguments...]

VERSION:
   0.0.0

COMMANDS:
     service  服务相关，grctl service -h
     tenant   grctl tenant -h
     node     节点。grctl node
     noderes  获取计算节点资源信息  grctl noderes
     exec     进入容器方法。grctl exec POD_NAME COMMAND
     show     显示region安装完成后访问地址
     domain
     help, h  Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --config FILE, -c FILE  Load configuration from FILE (default: "/etc/goodrain/grctl.json")
   --help, -h              show help
   --version, -v           print the version
```

### 1.1 通过grctl命令查看应用运行详细信息


```bash
# 应用 URL
grctl service get http://dev.rainbond.com/#/team/test/region/private-center2/app/gr114c75/overview
# 租户/应用别名
grctl service get test/gr114c75
```

<img src="https://static.goodrain.com/images/docs/3.6/operation-manual/grctl-service-get.png" width="100%" />


### 1.2 通过grctl命令操作节点

- 列出集群节点信息

```bash
grctl node list
```
<img src="https://static.goodrain.com/images/docs/3.6/operation-manual/grctl-node-list.png" width="100%" />

- 获取某个节点的详细信息

```bash
grctl node list d4ac1bcf-4239-4d55-b1ea-db81e067eb70
```

- 下线与上线某个节点

```bash
# 下线172.16.210.110节点
grctl node down d4ac1bcf-4239-4d55-b1ea-db81e067eb70

# 上线节点
grctl node up d4ac1bcf-4239-4d55-b1ea-db81e067eb70
```

- 禁止/允许调度到某个节点

```bash
# 禁止调度到某个节点
grct node unscheduable d4ac1bcf-4239-4d55-b1ea-db81e067eb70

# 允许调度到某个节点
grctl node rescheduable d4ac1bcf-4239-4d55-b1ea-db81e067eb70
```

### 1.3 通过grctl命令进入应用容器

```bash
grctl exec <PodName> <COMMAND>
```

### 1.4 通过grctl修改泛域名解析
Rainbond默认会申请一个泛解析域名提供给平台HTTP协议的应用使用，如果要修改泛解析地址，可以通过如下命令来设置：

```bash
grctl domain --ip <ip address>
```

## 二、其他命令行工具

### 2.1 din 进入指定容器
该命令是 `docker exec -it $1 bash` 命令的封装，可以进入到给定容器ID的容器内部。

```bash
din <容器ID>
```

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