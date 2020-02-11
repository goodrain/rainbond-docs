---
title: 组件存储设置
description: Rainbond组件存储的管理文档
weight: 5011
hidden: true
---

### 组件为什么需要存储

组件是 Rianbond 的抽象概念，底层是通过容器封装运行，容器磁盘文件是短暂的，也就是说，在容器中的程序在运行过程中的日志、生成或处理的文件，一旦容器关闭或重启，之前生成或存储的文件就丢失了。因此需要给组件容器挂载一个持久化的存储空间, 用于保存程序运行产生的各类数据。

### 存储的类型

Rainbond 默认支持以下几种存储类型:

- 共享存储(宿主机路径/grdata)
- 本地存储(宿主机路径/grlocaldata)
- 配置文件
- 内存文件存储

#### 共享存储

共享存储是一个分布式文件系统, 默认使用的是 NFS, 你也可以自行对接其它的分布式文件系统(比如: [GlusterFS](../../../operation-manual/storage/GlusterFS/introduce.html), NAS 等). 共享存储具有非常高的可靠性和扩展性; 与此同时, 它还具有非常高的灵活性, 可以共享给其它的组件，基于租户、组件两级进行存储空间分配和隔离。
共享存储针对无状态组件和有状态组件呈现的工作模式不同：

* 无状态组件
    * 共享存储没有实例差别，多个实例数据一致。
    * 可以被其他组件依赖以实现组件间数据共享。
* 有状态组件
    * 每个实例具有独立的存储空间
    * 不能被其他组件共享

#### 本地存储

本地存储使用的是当前组件对应的运行实例所在宿主机的一块本地磁盘（通常可以是SSD磁盘），其不具备跨宿主机可用的属性。本地存储只支持`有状态组件`类型。本地存储通常组件于对存储性能要求非常高的组件，比如数据库类组件。它们可以从应用层面来处理数据在多个实例间的同步，比如Mysql使用主从同步，TiDB基于raft协议的等价集群等。这些组件通常不需要存储层面进行数据同步。

配置了本地存储的组件调度将跟随存储所在宿主机，是一种受限的调度机制。对于集群类的数据库组件，从应用层处理存储数据的多节点同步，使用本地存储将是一种较优的选择。

#### 配置文件

配置文件是一种特殊的存储类型，此类型允许用户直接定义文件内容，通常是指配置文件。
Rainbond支持配置文件有两大特性：

* 动态渲染
动态渲染配置文件解析环境变量的语法:

```
${环境变量名}
${环境变量名:默认值}
```

下面是 MySQL 配置文件的一个片段:

```
[mysqld]
port = ${PORT:3306}
socket = /tmp/mysql.sock
```

如果组件中存在环境变量 PORT, 那么 Rainbond 会将PORT 的值解析到配置文件中; 如果组件中不存在环境变量 PORT, 那么 Rainbond 会将 3306 解析到配置文件中。


如果指定的环境变量不存在, 且没有设置默认值, 那么 Rainbond 不会进行解析


* 配置文件共享

可以通过存储共享的机制来共享配置文件，如果你有多个组件使用同一个配置文件的场景，可以直接共享，无需多次编辑设置。



配置文件存储支持编辑功能，即添加后可以根据需要修改配置文件内容，修改完成后需更新组件才能生效。



#### 内存文件存储

内存文件存储的本质是一块 tmpfs (RAM-backed filesystem), 它是`临时`的, 会随组件的创建而创建, 随组件的停止而销毁. 虽然 tmpfs 非常快, 但请注意, 你编写的任何文件都将计入组件的内存限制.

### 如何为组件添加存储

为组件添加存储有两种方式：

- <b>新增组件存储</b>

找到 【存储】页面

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage01.png" width="100%" />

点击 【添加持久化】按钮

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage02.png" width="60%" />

存储添加完成

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage03.png" width="100%" />

- <b>挂载其他组件的存储</b>

在【存储】页面找到 【挂载目录】
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage04.png" width="100%" />

点击【挂载目录】按钮后，勾选需要挂载其他组件的名称，并填写挂载到本组件的目录
<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage05.png" width="90%" />

完成挂载其他组件存储

<img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/app-storage06.png" width="100%" />

{{% notice info %}}

- 新增或挂载其他组件的存储后，需要更新或重启组件，挂载其他组件的存储不支持挂载到有状态的组件。
- 新增或挂载其他组件存储时，本组件的路径不能使用 Linux 系统保留目录，如：/dev、/usr、/bin、/sys、/proc 等



### 存储挂载路径查看方式

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



### 其他持久化存储的支持

上诉提到的存储类型主要以文件系统类为主，对于块设备的支持也将是我们的终点方向，特别是在公有云环境下，高性能磁盘的存储挂载也是支持高性能组件的重点。目前在企业版本中我们支持对存储类型支持的定制开发，比如私有存储ceph、阿里云的共享块设备和高性能磁盘设备等。


### 已有本地docker运行组件持久化数据迁移到Rainbond

示例gogs:

* step 1 本地通过docker run 方式将gogs运行启动，并且持久化了相关目录。

```
docker run -d --net=host -v /var/gogs:/data gogs/gogs
```

* step 2 Rainbond平台通过docker run方式同样运行如上命令即可,应用部署完成后可以通过grctl命令获取存储路径

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/service-volume/gogs.png)


* step 3 把需要迁移的gogs数据(data1)备份，然后把平台上的gogs停了，然后用备份的data1数据替换了平台上运行的gogs的数据，启动平台上的gogs

### v5.2 新增存储类型

出于对高性能存储的需求，从v5.2版本开始，rainbond拥有了支持更多存储类型的能力，用户可以通过在rainbond平台上使用性能较高的存储构建组件。

> 经测试通过的存储有阿里云盘和ceph-rbd块存储，其他存储后期会逐步增加相应的支持

#### 实现原理

为了更好的管理存储，k8s通过`StorageClass`、`PersistentVolumeClaims`、`PersistentVolume`三种资源类型实现了动态提供存储的能力，在配置有合适的 `StorageClass`且 `PersistentVolumeClaim` 关联了该 `StorageClass` 的情况下，kubernetes 集群可以为应用程序动态创建 `PersistentVolume`。

- `PersistentVolume`
  
    简称pv，表示kubernetes集群中的一块存储空间，由集群的管理员手动管理或者`StorageClass`自动管理，pv与node一样，是集群的全局资源，不属于任何的命名空间，

- `PersistentVolumeClaims`

    简称pvc，kubernetes中Volume的一种，代表了用户使用存储的需求。Pod实例消耗节点node的计算资源，pvc存储需求消耗pv存储资源。

- `StorageClass`

    简称sc，表示kubernetes集群中可以提供的存储的类型。代表着kubernetes的一种能力，一种可以使用该种类型存储的能力。

通过`PersistentVolumeClaims`、`PersistentVolume`两种资源类型定义，kubernetes将存储的管理进行合理的抽象，让用户把关注点放在如何提供存储，和如何使用存储两个方面。
pv描述了如何提供存储的具体信息，如存储的远程服务器地址，所需要的参数等。pvc描述了用户想要一种什么类型的存储，用户想要的存储指明某个`StorageClass`，意味着用户的此需求交由该`StorageClass`提供，由`StorageClass`背后的存储驱动动态的提供支持。

#### rainbond使用新增存储

* 安装驱动
  
拿ceph-rbd块存储举例，需要在集群的每个节点安装ceph客户端，由该客户端支持存储的动态创建。

```
yum install -y ceph-common 
```

使用阿里云盘需要在kubernetes集群中安装阿里云盘驱动，详情可了解[alicloud-storage-provisioner](https://github.com/AliyunContainerService/alicloud-storage-provisioner)

* 创建`StorageClass`
  
驱动安装成功之后，即可创建相应的`StorageClass`来提供相应的能力。此时可通过手动创建pvc执行`StorageClass`的方式测试驱动是否安装成功

* 使用

rainbond控制台添加组件，设置为有状态组件，添加存储，选择阿里云盘或者ceph块存储，设定大小，开始使用



#### 最优存储的选择

所谓最优存储的选择，是在集群中没有想要的存储时默认选择的存储。

从应用市场安装应用、应用的迁移都有可能发生存储类型不存在的情况。在需要的存储类型不存在时，提供最优的存储类型就显得特别的重要。rainbond会针对存储的特性选择最适合组件的存储类型来支持组件的创建，避免阻碍组件的正常运行

> 最优存储的选择会在后期进行更细致的优化迭代，会综合考虑存储的读写特性、共享特性以及备份恢复策略等相关特性共同决定如何正确且最快的存储类型

#### 新增存储的限制

新增的存储类型在使用上有读写上的限制，和数据备份上的限制。

只允许有状态组件使用是为了解决部分存储类型只能单读单写的限制。所以，新增存储类型不可共享，不可供其他组件共同使用。
数据备份方面，rainbond针对新增存储类型，会选择跳过备份，仅备份存储类型，在恢复或迁移时尽可能使用相同类型的存储类型。