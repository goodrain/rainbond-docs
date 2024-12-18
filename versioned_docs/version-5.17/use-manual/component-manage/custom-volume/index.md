---
title: 组件存储
description: Rainbond组件存储的管理文档
---

## 组件为什么需要存储

组件是 Rianbond 的抽象概念，底层是通过容器封装运行，容器磁盘文件是短暂的，也就是说，在容器中的程序在运行过程中的日志、生成或处理的文件，一旦容器关闭或重启，之前生成或存储的文件就丢失了。因此需要给组件容器挂载一个持久化的存储空间, 用于保存程序运行产生的各类数据。

## 存储的类型

Rainbond 默认支持以下几种存储类型:

- 共享存储
- 本地存储(宿主机路径/grlocaldata)
- 配置文件
- 内存文件存储

除 Rainbond 默认支持的上述几种存储类型外，Rainbond 还支持 [自定义存储类型](./service-volume-custom.md) 来根据需要扩充其他存储。

### 共享存储

共享存储是一个分布式文件系统, 默认使用的是 NFS, 你也可以自行对接其它的分布式文件系统(GlusterFS, NAS 等). 共享存储具有非常高的可靠性和扩展性; 与此同时, 它还具有非常高的灵活性, 可以共享给其它的组件，基于租户、组件两级进行存储空间分配和隔离。

共享存储针对无状态组件和有状态组件呈现的工作模式不同：

- 无状态组件
  - 共享存储没有实例差别，多个实例数据一致。
  - 可以被其他组件依赖以实现组件间数据共享。
- 有状态组件
  - 每个实例具有独立的存储空间
  - 不能被其他组件共享

### 本地存储

本地存储使用的是当前组件对应的运行实例所在宿主机的一块本地磁盘（通常可以是 SSD 磁盘），其不具备跨宿主机可用的属性。本地存储只支持 `有状态组件` 类型。本地存储通常组件于对存储性能要求非常高的组件，比如数据库类组件。它们可以从应用层面来处理数据在多个实例间的同步，比如 Mysql 使用主从同步，TiDB 基于 raft 协议的等价集群等。这些组件通常不需要存储层面进行数据同步。

配置了本地存储的组件调度将跟随存储所在宿主机，是一种受限的调度机制。对于集群类的数据库组件，从应用层处理存储数据的多节点同步，使用本地存储将是一种较优的选择。

### 配置文件

配置文件是一种特殊的存储类型，此类型允许用户直接定义文件内容，通常是指配置文件。
Rainbond 支持配置文件有两大特性：

- 动态渲染

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

如果组件中存在环境变量 PORT, 那么 Rainbond 会将 PORT 的值解析到配置文件中; 如果组件中不存在环境变量 PORT, 那么 Rainbond 会  将 3306 解析到配置文件中。

如果指定的环境变量不存在, 且没有设置默认值, 那么 Rainbond 不会进行解析

- 配置文件共享

可以通过存储共享的机制来共享配置文件，如果你有多个组件使用同一个配置文件的场景，可以直接共享，无需多次编辑设置。

配置文件存储支持编辑功能，即添加后可以根据需要修改配置文件内容，修改完成后需更新组件才能生效。

### 内存文件存储

内存文件存储的本质是一块 tmpfs (RAM-backed filesystem), 它是 `临时` 的, 会随组件的启动而创建, 随组件的停止而销毁. 虽然 tmpfs 非常快, 但请注意, 你写入的任何文件都将计入组件的内存限制。因此其一般适用于基于磁盘的临时计算场景。

## 如何为组件添加存储

为组件添加存储有两种方式：

- <b>新增组件存储</b>

在 _管理面板/存储_ 页面点击添加存储，根据表单提示填写存储的相关信息确认即可。

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-service-manage/service-volume/Add%20storage.png)

> 存储添加完成为未挂载状态，需更新或重启组件才能生效。

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-service-manage/service-volume/Add%20finish.png)

- <b>共享其他组件的存储</b>

在 _管理面板/存储_ 页面共享组件存储管理中

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-service-manage/service-volume/Shared%20memory.png)

点击【挂载共享存储】按钮后，勾选需要挂载其他组件的名称，并填写挂载到本组件的目录

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-service-manage/service-volume/Shared%20volum02.png)

完成挂载其他组件存储

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-service-manage/service-volume/Completion%20sharing.png)

- 新增或挂载其他组件的存储后，需要更新或重启组件，挂载其他组件的存储不支持挂载到有状态的组件。
- 新增或挂载其他组件存储时，本组件的路径不能使用 Linux 系统保留目录，如：/dev、/usr、/bin、/sys、/proc 等。

## 已有本地 docker 运行组件持久化数据迁移到 Rainbond

示例 gogs:

- step 1 本地通过 docker run 方式将 gogs 运行启动，并且持久化了相关目录。

```
docker run -d --net=host -v /var/gogs:/data gogs/gogs
```

- step 2 Rainbond 平台通过 docker run 方式同样运行如上命令即可,应用部署完成后可以通过 grctl 命令获取存储路径

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/5.1/service-volume/gogs.png)

- step 3 把需要迁移的 gogs 数据(data1)备份，然后把平台上的 gogs 关闭，然后用备份的 data1 数据替换了平台上运行的 gogs 的数据，启动平台上的 gogs

> 从 Rainbond 5.2 版本开始，由于操作权限原因，宿主机下不再默认挂载/grdata 目录，因此查询到组件存储在分布式文件系统中的实际目录后可在 rbd-chaos 组件中进行操作。

## 常见问题

- 组件间共享存储的意义

> 你是否有这样一个业务场景，一个业务组件产生数据并存储到本地目录，另一个业务组件读取数据进行处理。在传统部署模式中你只能受限的将这两个组件部署到同一个节点下，更别谈多实例高可用部署。使用组件间共享存储，程序不做任何修改。业务运行到任何节点都可以正常共享读取数据。

- Kubernetes 各类存储类型 Rainbond 是否支持

> Rainbond 通过扩展存储的方式对接支持 Kubernetes 已有的存储类型。详情参考 [自定义存储类型](./service-volume-custom.md)

```mdx-code-block
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarCategory} from '@docusaurus/theme-common';

<DocCardList items={useCurrentSidebarCategory().items}/>
```