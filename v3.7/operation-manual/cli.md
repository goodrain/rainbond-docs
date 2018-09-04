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
NAME:
   grctl - A new cli application

USAGE:
   grctl [global options] command [command options] [arguments...]

VERSION:
   3.7-e827348-2018-09-02-17

COMMANDS:
     service       about  application service operation，grctl service -h
     tenant        grctl tenant -h
     node          about cluster node manage
     cluster       show curren cluster datacenter info
     exec          exec service container。grctl exec POD_NAME COMMAND
     init          init cluster for install。grctl init cluster
     show          显示region安装完成后访问地址
     alerting      about alterting rule manage。grctl alerting
     notification  应用异常通知事件。grctl notification
     conf          集群和服务配置相关工具
     domain
     buildtest     build test source code, If it can be build, you can build in rainbond
     help, h       Shows a list of commands or help for one command

GLOBAL OPTIONS:
   --config value, -c value  default <USER_HOME>/.rbd/grctl.yaml
   --help, -h                show help
   --version, -v             print the version
```

### 1.1 通过grctl命令查看应用运行详细信息


```bash
# 应用 URL
grctl service get http://dev.rainbond.com/#/team/test/region/private-center2/app/gr114c75/overview
# 租户/应用别名
grctl service get test/gr114c75
```

<img src="https://static.goodrain.com/images/docs/3.6/operation-manual/grctl-service-get.png" width="100%" />

- 查看应用容器真实使用内存

通过上面的操作可以获取应用所在的宿主机IP（10.0.4.12）和容器的ID(`342d8b28b86e`)，接下来就可以通过 `docker stats` 命令来查看容器真实使用的内存：

```bash
# 登录到应用所在的宿主机，如果是本机的话可以省略这一步
ssh 10.0.4.12

# 查看容器状态
docker stats 342d8b28b86e
```

<img src="https://static.goodrain.com/images/docs/3.6/operation-manual/get-container-memory.png" width="100%" />

### 1.2 通过grctl命令操作节点

- 列出集群节点信息

```bash
grctl node list
```

<img src="https://static.goodrain.com/images/docs/3.7/operation-manual/grctl_node_list.png" width="100%" />

- 查看集群信息

```bash
grctl  cluster
```

- 获取某个节点的详细信息

```bash
# 可以获取这个节点集群服务的健康状态
grctl node get 03f2ee6b-3f3e-4353-bbe3-0e49ce1da677
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
NAME:
   grctl domain -

USAGE:
   grctl domain [command options] [arguments...]

OPTIONS:
   --ip value      ip address
   --domain value  domain
```

### 1.5 通过grctl测试源码构建

```
USAGE:
   grctl buildtest [command options] [arguments...]

OPTIONS:
   --dir value    source code dir,default is current dir.
   --lang value   source code lang type, if not specified, will automatic identify
   --image value  builder image name (default: "goodrain.me/builder")
   --env value    Build the required environment variables
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

### 2.7 grclis 关闭服务

快速关闭服务.