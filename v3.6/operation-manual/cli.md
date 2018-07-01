---
title: 命令行工具
summary: 命令行工具说明
toc: false
---

<div id="toc"></div>

## 一、grctl 命令

grctl命令是rainbond自带的集群管理工具，它具备如下主要功能特性：

|功能模块|命令示例|
|-----------|-------------|
|平台应用控制|`grctl service get <url>` 查看应用详情<br>`grctl service stop <团队别名>/<应用别名>` 关闭指定团队内某个应用<br>`grctl service start <团队别名>/<应用别名>` 启动指定团队内某个应用<br>|

- 
    - 查看应用的运行状态
    - 启动/关闭平台应用
    - 查看应用日志
    - 查看应用事件
- 集群节点控制
    - 查看集群节点状态
    - 上线/下线节点
    - 添加/删除节点
    - 禁止/允许调度

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

### 1.2 通过grctl命令操作节点


```bash
grctl node <command> <Uid>

# 支持的参数
get #获取节点具体信息,如网络,运行状态
list #列出已经注册到集群的所有节点状态
up/down #上线/下线计算节点
unscheduable/rescheduable #计算节点调度状态
delete #删除节点
```

### 1.3 通过grctl命令进入应用容器

```bash
grctl exec <PodName> <COMMAND>
```

### 1.4 通过grctl修改泛域名解析

```bash
grctl domain --ip 39.106.46.100
```

## 二、其他命令行工具

### 2.1 din 进入指定容器

### 2.2 dps 查看运行与停止的容器

### 2.3 cclear清理已经退出的容器

### 2.4 iclear 清理处于dangling状态的镜像

### 2.5 igrep 快速搜索镜像

### 2.6 ctop 查看容器资源使用情况