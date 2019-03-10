---
title: 服务存储设置
description: Rainbond服务存储的管理文档
weight: 5011
hidden: true
---

## 1. 服务为什么需要存储?

服务是 Rianbond 的抽象概念，底层是通过容器封装运行，容器磁盘文件是短暂的，也就是说，在容器中的程序在运行过程中的日志、生成或处理的文件，一旦容器关闭或重启，之前生成或存储的文件就丢失了。因此需要给容器挂载一个存储, 用于保存程序运行产生的数据。

## 2. 存储的类型

Rainbond 默认支持以下几种存储类型:

- 共享存储
- 本地存储
- 配置文件
- 内存文件存储

### 2.1 共享存储

共享存储是一个分布式文件系统, 默认使用的是 NFS, 你也可以自行对接其它的分布式文件系统(比如: [GlusterFS](../../../operation-manual/storage/GlusterFS/introduce.html), NAS 等). 共享存储具有非常高的可靠性和扩展性; 与此同时, 它还具有非常高的灵活性, 可以共享给其它的服务组件，基于租户、服务两级进行存储空间分配和隔离。
共享存储针对无状态服务和有状态服务呈现的工作模式不同：
* 无状态服务
    * 共享存储没有实例差别，多个实例数据一致。
    * 可以被其他服务依赖以实现服务间数据共享。
* 有状态服务
    * 每个实例具有独立的存储空间
    * 不能被其他服务共享

### 2.2 本地存储
本地存储使用的是当前服务对应的运行实例所在宿主机的一块本地磁盘（通常可以是SSD磁盘），其不具备跨宿主机可用的属性。本地存储只支持`有状态服务`类型。本地存储通常服务于对存储性能要求非常高的服务，比如数据库类服务。它们可以从应用层面来处理数据在多个实例间的同步，比如Mysql使用主从同步，TiDB基于raft协议的等价集群等。这些服务通常不需要存储层面进行数据同步。

### 2.3 配置文件

配置文件是一种特殊的存储类型，此类型允许用户直接定义文件内容，通常是指配置文件。
Rainbond支持配置文件有两大特性：
* 动态渲染
动态渲染配置文件解析环境变量的语法:

```
${环境变量名}
${环境变量名:默认值}
```

下面是 MySQL 配置文件的一个片段:

```
[mysqld]
port = ${MYSQL_PORT:3306}
socket = /tmp/mysql.sock
```

如果服务中存在环境变量 MYSQL_PORT, 那么 Rainbond 会将 MYSQL_PORT 的值解析到配置文件中; 如果服务中不存在环境变量 MYSQL_PORT, 那么 Rainbond 会将 3306 解析到配置文件中。

{{% notice note %}}
如果指定的环境变量不存在, 且没有设置默认值, 那么 Rainbond 不会进行解析
{{% /notice %}}

* 配置文件共享
可以通过存储共享的机制来共享配置文件，如果你有多个服务使用同一个配置文件的场景，可以直接共享，无需多次编辑设置。

### 2.4 内存文件存储

内存文件存储的本质是一块 tmpfs (RAM-backed filesystem), 它是`临时`的, 会随服务的创建而创建, 随服务的停止而销毁. 虽然 tmpfs 非常快, 但请注意, 你编写的任何文件都将计入服务的内存限制.

## 3. 如何为服务添加存储

为服务添加存储有两种方式：

- <b>(1) 新增服务存储</b>

找到 【存储】页面

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage01.png" width="100%" />

点击 【添加持久化】按钮

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage02.png" width="60%" />

存储添加完成

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage03.png" width="100%" />

- <b>(2) 挂载其他服务的存储</b>

在【存储】页面找到 【挂载目录】
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage04.png" width="100%" />

点击【挂载目录】按钮后，勾选需要挂载其他服务的名称，并填写挂载到本服务的目录
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage05.png" width="90%" />

完成挂载其他服务存储

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage06.png" width="100%" />

{{% notice info %}}

- 新增或挂载其他服务的存储后，需要重启服务，挂载其他服务的存储不支持挂载到有状态的服务。
- 新增或挂载其他服务存储时，本服务的路径不能使用 Linux 系统保留目录，如：/dev、/usr、/bin、/sys、/proc 等

{{% /notice %}}

## 4. 存储挂载路径查看方式

可以通过grctl命令来查看应用存储挂载路径查看方式 `grctl service get <应用别名> -t <租户id>`。

示例如下: 源码构建python程序，挂载日志目录,应用控制台URL <b>http://172.20.0.101:7070/#/team/lsqbjv5e/region/rainbond/app/grbc2de8/overview</b>

```bash
grctl service get grbc2de8 -t lsqbjv5e
# 存储部分
PodVolumePath:	/grdata/tenant/b03170a64738460e894f7288fe54c3d6/service/1f1efa8fcaf32156989142e93ebc2de8/logs:/logs:/logs
              	/grdata/build/tenant/b03170a64738460e894f7288fe54c3d6/slug/1f1efa8fcaf32156989142e93ebc2de8/20190213191750.tgz:/tmp/slug/slug.tgz:/tmp/slug/slug.tgz
```

PodVolumePath 结构说明：`<本地存储/分布式存储><存储路径>:<应用存储路径>:<插件存储路径(仅启用插件后显示)>`

其中slug.tgz为源码构建生成物,源码构建应用必须挂载。
