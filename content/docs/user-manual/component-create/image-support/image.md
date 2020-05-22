---
title: "Docker镜像支持规范"
description: "本章节将带你认识Rainbond基于Docker镜像创建组件的支持规范"
weight: 3200
hidden: true
---

本章节将带你认识Rainbond基于Docker镜像创建组件的支持规范。

### 镜像支持规范

Rainbond基于已有标准制作镜像创建组件的方式是最快，兼容性最强的途径。这里我们将从以下几个方面描述什么镜像可以在Rainbond运行：

#### 不能运行的镜像

这里我们首先来说明哪些镜像不能运行，这个非常重要。

* 基础系统环境类

以`alpine` `centos` `debian` 为代表的基础系统镜像是我们制作组件镜像必然会用到的，但是它们是不能直接在Rainbond上运行，为什么？ 因为它们启动进程默认是非前台运行的，即容器启动则会退出。只能在本地运行时打开stdin进行TTL交互式运行。

* 基础语言&工具类

目前有比较多的开发者使用Docker镜像的方式来分发命令行工具，比如golang编译环境、docker编译环境、maven编译环境等等。它们不能运行的原因与第一类相同。

### 可运行镜像

除了上述描述的镜像类型外，如下类型的组件我们推荐基于镜像创建：

* 中间件类

比如`Mysql Mongo Redis Tomcat nginx `等经常使用的中间价组件。

* web工具类

比如`phpmyadmin`等

* 基础组件类

比如`sFTP`组件、`minio`对象存储组件等

* 其他提供TCP或UDP协议组件的各类组件镜像

### 镜像检测规范

* 镜像是可以被Rainbond集群服务器正常获取的
  * 提供的镜像名称准确，且存在于对应的镜像仓库中

  * 私有仓库镜像请务必提供账号密码
  * 自建仓库请配置HTTPs或为Rainbond集群节点配置Docker信任

* Rainbond将从镜像中获取以下属性信息：
  * 端口，dockerfile中配置的Expose端口信息将被获取。
  * 环境变量，环境变量是云原生下推荐的自定义配置方式，也是Docker镜像自定义配置的推荐用户。
  * 存储挂载，dockerfile中配置的volume信息将被获取

  > Docker compose创建的组件只从compose配置中获取，docker run创建从创建命令和镜像中获取。

* 组件内存分配的设定：

  以镜像创建的组件默认使用512M内存分配，通过dockerrun或者docker compose创建的组件如果显示设置了内存参数的，将以设定的为准。

* 组件部署类型的设定：

  以镜像创建的组件默认设定为`无状态部署类型`，5.1.3版本以后，镜像名称为以下值时默认设置为`有状态部署类型` :
  
  * mysql
  * mariadb
  * mongo
  * redis
  * tidb
  * zookeeper
  * kafka
  * mysqldb
  * mongodb
  * memcached
  * cockroachdb
  * cockroach
  * etcd
  * postgres
  * postgresql
  * elasticsearch
  * consul
  * percona
  * mysql-server
  * mysql-cluster

  例如以下镜像将部署为有状态类型：

  * mysql:latest
  * hub.example.com/xxx/mysql:5.5
  * xxx/mysql:5.7
