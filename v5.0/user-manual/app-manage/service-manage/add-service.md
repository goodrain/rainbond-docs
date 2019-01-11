---
title: 服务存储
summary: 服务存储
toc: true
asciicast: true
---

## 1. 服务为什么需要存储?

服务是 Rianbond 的抽象概念，底层是通过容器封装运行起来的，容器磁盘文件是短暂的，也就是说，在容器中的程序在运行过程中的日志、生成或处理的文件，一旦容器关闭或重启，之前生成或存储的文件就丢失了。因此需要给容器挂载一个存储, 用于保存程序运行中的文件.

## 2. 存储的类型

Rainbond 支持的几种存储的类型:

- 共享存储
- 配置文件
- 本地存储
- 内存文件存储

### 2.1 共享存储

共享存储是一个分布式文件系统, 默认使用的是 NFS, 你也可以自行对接其它的分布式文件系统(比如: [Gluster](../../../operation-manual/storage/GlusterFS/introduce.html), Ceph 等). 共享存储具有非常高的可靠性和扩展性; 与此同时, 它还具有非常高的灵活性, 可以共享给其它的服务组件.

### 2.2 本地存储

本地存储是当前服务对应的 Pod 所在宿主机的一块本地存储. 只有`有状态服务`才可以使用本地存储, Rainbond 会根据 Pod 的名字(`无状态服务`的 Pod 没有唯一名字)将 Pod 与本地存储绑定在一起, 也就是说, 同一个 Pod 都会调度到同一个节点上. 与共享存储相比, 本地存储`速度更快`, 比较适合类似 MySQL 这种在上层做数据同步, 而无需在存储上做数据同步的服务.

### 2.3 配置文件

Rainbond 允许你给服务指定一个配置文件, 然后你就可以在程序中使用这个配置文件. 这个配置文件有两个特点: 可以解析当前服务的环境变量; 可以共享给其它的服务.

当一个服务使用其它服务共享的配置文件时, 这个配置文件解析的是当前服务的环境变量, 而不是原服务的环境变量.

配置文件解析环境变量的语法:

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

如果服务中存在环境变量 MYSQL_PORT, 那么 Rainbond 会将 MYSQL_PORT 的值解析到配置文件中; 如果服务中不存在环境变量 MYSQL_PORT, 那么 Rainbond 会将 3306 解析到配置文件中.

{{site.data.alerts.callout_success}}
如果指定的环境变量不存在, 且没有设置默认值, 那么 Rainbond 不会进行解析
{{site.data.alerts.end}}

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

{{site.data.alerts.callout_danger}}

- 新增或挂载其他服务的存储后，需要重启服务，挂载其他服务的存储不支持挂载到有状态的服务。
- 新增或挂载其他服务存储时，本服务的路径不能使用 Linux 系统保留目录，如：/dev、/usr、/bin、/sys、/proc 等

{{site.data.alerts.end}}
