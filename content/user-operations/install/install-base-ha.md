---
title: "高可用部署"
weight: 1001
description: "此方式将首先引导你进行相关资源的规划和准备，以完成高可用集群的快速安装。"
hidden: true
---


### 一、集群高可用说明

在生产环境下，可以通过调整Rainbond的部署结构，来提高其高可用性。Rainbond高可用性可以从以下几个层面提升：

- 存储高可用：选择合适的分布式存储系统作为集群的共享存储。

- 外部数据库：将数据库分离，主从复制，数据做到真正的高可用。
<!-- 网络高可用：为集群选择合适的SDN网络。-->
- 管理节点集群： 部署多个管理节点，实现Rainbond管理功能高可用。

- 计算节点集群： 分布式部署多个计算节点，实现计算资源高可用。

- 网关节点集群： 部署多个网关节点，提供多个应用访问入口。


### 二、机器资源准备

#### 2.1 机器资源要求与规划

> 操作系统要求

|操作系统|版本|
|---|---|
|CentOS|[7.4.1708](http://goodrain-pkg.oss-cn-shanghai.aliyuncs.com/system/CentOS/CentOS-7-x86_64-Minimal-1708.iso)(建议安装此版本)|
|Ubuntu|16.04|> 
单台服务器计算资源配置要求

|服务器角色|CPU|内存|
|------|-----|-----|
|管理节点| 16核|32G|
|计算节点| 16核|64G|
|存储节点|4核|8G|
|网关节点|4核|8G|

> 管理节点磁盘分区

|挂载点|磁盘大小|说明|
|---|---|---|
| / |100G|系统根分区，本地磁盘，最低要求40G，推荐100G|
| /var/lib/docker |100G|docker镜像存储分区，本地磁盘|
| /opt/rainbond |50G|存储rainbond程序以及产生的日志、数据，本地磁盘|
| /cache | 50G | 存储应用构建使用的缓存，可以使用共享存储在管理节点间共享|

> 计算节点磁盘分区

|挂载点|磁盘大小|说明|
|---|---|---|
| / |100G|系统根分区，本地磁盘，最低要求40G，推荐100G|
| /var/lib/docker |100G|docker镜像存储分区，本地磁盘|
| /grlocaldata |100G|应用本地持久化存储，本地磁盘|

> 存储节点磁盘分区

|挂载点|磁盘大小|说明|
|---|---|---|
| / |40G|系统根分区，本地磁盘|
| /data |500G+|用于搭建集群共享存储，本地单独挂载磁盘|


<!--网络节点网络配置

如对于应用网络有较高要求，请对应提高网络节点网络配置：提高带宽并升级网卡。
-->

#### 2.2 外部数据库Mysql

  
>Rainbond默认为我们提供了rbd-db数据库服务，但管理节点扩容的同时并不会同步扩容rbd-db数据库服务，所以在高可用集群当中我们推荐您使用外部数据库

使用外部数据库的特性：

1. 灵活性： 可根据业务量不同，灵活选择数据库节点方案；
2. 可扩展性：当数据达到一定量级时，可以更方便的扩容，不受其他节点的影响；
3. 可恢复性：定期对数据进行备份，防止因为意外宕机而导致的数据丢失；
4. 高可用性：推荐使用Mysql主从复制。

 
 Mysql作为世界上最流行的开源数据库，稳定性，连接性，安全性都给予了我们可靠的保障。

>对于 Mysql 数据库，我们建议用户独立安装 Mysql 数据库并提供给 Rainbond 安装脚本，Mysql主从配置请参阅[官方文档](https://dev.mysql.com/doc/refman/5.6/en/replication-howto.html)


#### 2.3 节点规划

一个完整的 Rainbond 集群中必须包含 manage、gateway、compute 角色的节点和暂不作为 Rainbond 安装支持的存储节点，当然三种属性可以在同一个节点上组成单节点的Rainbond 集群。安装 Rainbond 之前需要根据企业自身需求合理的规划计算资源。

**根据用户具体需求，我们推荐两种方式部署，具体可以参见本节规划集群的节点配置。**

>**1. 分布式部署**

- 管理节点：

管理节点为常规部署项，必然存在于集群之中。基于etcd的特性，部署数量从1开始，按奇数递增（即可以部署 1、3、5···台），推荐3台。

- 计算节点：

计算节点为常规部署项，必然存在于集群之中。部署数量2至100台，并在集群资源不足时按需扩容。

- 存储节点：

特指在选择glusterfs作为集群共享存储解决方案时部署的存储节点。部署数量至少2台，并根据节点数量选择复制集数量。

- 网关节点：

网关节点特指具备Rainbond应用访问负载均衡组件rbd-gateway的节点，为常规部署项，必然存在于集群之中。默认部署于所有的管理节点，可以根据需要单独部署。部署数量参照管理节点，并配置VIP保证高可用。

- 外部数据库：根据具体情况选择合适的方案。


>**2. 复合式部署**
 

 对多个不同节点（管理节点，计算节点，存储节点，网关节点）进行节点复用，不种属性可以在同一个节点上组成单节点的 Rainbond 集群。
 
使用GlusterFS作为底层存储，Mysql作为外部存储，上层采用管理节点，计算节点，网关节点并存的方式进行高可用部署；使得同一服务器兼具多种功能,节省资源。


>考虑到 etcd 集群选举机制，所以推荐最少三台主机配置高可用。

|服务器1|服务器2|服务器3|
|------|-----|-----|
|Manage|Manage|Manage| 
|Gateway|Gateway|Gateway|
|Compute|Compute|Compute| 
|GlusterFS|GlusterFS|GlusterFS|


在新的发行版本中，我们支持对单一节点的单独扩容，扩容时指定一些参数可以使该节点具有多种节点类型,例：

```
# 第一个节点仅作为管理节点
./grctl init --iip <内网ip> --eip <访问应用使用的公网IP/网关节点IP> --role master 
# 管理节点，计算节点复用
./grctl init --iip <内网ip> --eip <访问应用使用的公网IP/网关节点IP> --role master,compute
# 管理节点，计算节点和网关节点复用
./grctl init --iip <内网ip> --eip <访问应用使用的公网IP/网关节点IP> --role master,compute，gateway
# 支持多种方式灵活搭配，只需在 --role 后面指定不同的参数
```
具体初始化参数，请阅读[节点初始化重要参数说明](/user-operations/tools/grctl/#节点初始化重要参数说明)

更多扩容参数，请执行 `grctl node add -h` 获取

更多关于软硬件要求请参考 [软件和硬件环境要求](../../op-guide/recommendation/)

### 三、存储节点选择

准备存储是安装高可用集群的第一步。在这一步将解决集群共享目录 `/grdata` 的配置。

> 推荐节点先行部署或对接存储节点，确定**所有节点都已经正常挂载/grdata**

#### 支持的存储说明及部署方案

Rainbond需要为管理节点与计算节点的 `/grdata` 目录配置共享存储。

> Rainbond支持多种共享存储解决方案，请根据如下场景进行选择：

- NAS：

  基于阿里云等IaaS设施部署Rainbond的情况下，可以选择其提供的NAS存储服务。

  对接阿里云文件存储NAS，请参见[对接文件存储NAS](/user-operations/storage/alinas/)

- GlusterFS：

 基于用户自备的服务器或虚拟机部署Rainbond的情况下，推荐部署GlusterFS作为共享存储解决方案。
  
  部署GlusterFS存储节点，请参见:

 [CentOS GlusterFS双机复制集群安装](/user-operations/storage/centosgfs/) 
  
   [Ubuntu GlusterFS双机复制集群安装](/user-operations/storage/ubuntugfs/) 
   
- 其它兼容NFS协议的共享存储

如果用户拥有可使用的兼容NFS协议的共享存储，可以直接使用。使 /grdata 目录在集群管理节点与计算节点间共享即可。


<!--### 四、网络方案选择

>支持的网络方案

当前版本Rainbond支持三种网络类型，开源版本默认为 `calico` 可选项为 `flannel` 。需要在数据中心初始化时(执行 grctl init)，通过 `--network` 参数指定。

下面简单对比两种解决方案的优缺点：

* calico
优点：通过网络路由实现容器间通信，性能损耗较小。

 缺点： 对宿主机网络要求较高，且只能支持 TCP,UDP和ICMP协议，其他特殊通信协议不支持，此方案适用于网络拓扑简单的中小规模集群，不适用于大型集群。
* flannel
常用两种工作模式: hostgateway 和 overlay

 hostgateway模式工作原理与calico类似但是其没有实现calico基于BGP协议共享路由的机制，限制性更大。

 overlay模式对于用户来说比较简单，但是其通过打包、解包过程，性能损耗较大。 该方案目前适用于需要安装Windows节点的集群和机器网络较为复杂的集群。

如果你选择`flannel`网络，你在安装Rainbond时需要指定如下参数:
  
  ```
  grctl init --network flannel 其他参数
  ```

> Rainbond默认推荐使用calico网络

-->
### 四、数据中心初始化

#### 4.1 安装命令

这一步将初始化Rainbond数据中心，即安装首个管理节点。这一步非常重要，会配置访问应用所使用的IP、集群网络解决方案等信息。

> 安装前，请检查是否配置了共享存储，如果是，请先行挂载 `/grdata`，并在安装时**指定共享存储类型及挂载地址**

```bash
# 建议使用root执行安装操作
wget https://pkg.rainbond.com/releases/common/v5.1/grctl
chmod +x ./grctl

# 此示例表示, 数据中心数据库和控制台数据库都使用外部数据库(不分离)
./grctl init --role master --iip <内网ip> --eip <访问应用使用的公网IP/网关节点IP>  --enable-exdb true <默认禁用使用外部数据库，启动值为true> --exdb-host <数据库IP地址> --exdb-port <数据库端口号> --exdb-user <数据库用户名>   --exdb-passwd  <数据库密码>

# 此示例表示, 数据中心数据库使用本地数据库(rbd-db), 控制台数据库都使用外部数据库
./grctl init --role master --iip <内网ip> --eip <访问应用使用的公网IP/网关节点IP>  --enable-exdb true <默认禁用使用外部数据库，启动值为true> --enable-excsdb-only true <控制台数据库使用外部数据库> --excsdb-host <数据库IP地址> --excsdb-port <数据库端口号> --excsdb-user <数据库用户名>   --excsdb-passwd  <数据库密码>

# 此示例表示, 数据中心数据库和控制台数据库都使用外部数据库(分离)
./grctl init --role master --iip <内网ip> --eip <访问应用使用的公网IP/网关节点IP>  --enable-exdb true <默认禁用使用外部数据库，启动值为true> -exdb-host <数据中心数据库IP地址> --exdb-port <数据中心数据库端口号> --exdb-user <数据中心数据库用户名>    --exdb-passwd <数据中心数据库密码> --enable-excsdb-only true <控制台数据库使用外部数据库>-excsdb-host <控制台数据库IP地址> --excsdb-port <控制台数据库端口号> --excsdb-user <控制台数据库用户名>   --excsdb-passwd  <控制台数据库密码>

```

> 具体初始化参数，请阅读[节点初始化重要参数说明](/user-operations/tools/grctl/#节点初始化重要参数说明)

>更多平台组件信息请阅读[rainbond平台集群安装与运维原理解读](/user-operations/install/install-d/)

#### 4.2 手动校验

安装完成后，在当前节点执行：

```bash
grctl cluster
```

若返回集群信息正常，则进行下一步；若返回不正常，请重新审查本节操作。



### 五、管理节点扩容

管理节点的扩容，实现了集群管理功能的高可用；考虑到 etcd 集群选举机制，应至少扩容到3个管理节点。

> 扩容前，请检查是否配置了共享存储，如果是，请先行挂载 `/grdata`

#### 5.1 扩容命令

按下列场景选择扩容命令

- 未做ssh免密操作时，需要知悉节点root密码

```bash
#单独扩容管理节点
grctl node add --host manage02 --iip <管理节点ip> -p <root密码> --role manage  --install

```

- 配置好ssh免密后

```bash
grctl node add --host manage03 --iip <管理节点ip> --key /root/.ssh/id_rsa.pub --role manage --install
```

> 更多扩容参数，请执行 `grctl node add -h` 获取

#### 5.2 手动校验

安装完成后，在当前节点执行：

```bash
grctl cluster
```

若返回集群列表中显示出扩容节点且服务状态正常，则进行下一步；若返回不正常，请重新审查本节操作。


### 六、网关节点扩容



- 如需要单独扩容网关节点，则执行以下命令

```bash
grctl node add --host gateway02 --iip <网关节点ip> --eip <访问应用使用的公网IP/网关节点IP> -p <root密码> --role gateway --install

```


#### 6.1 实现网关节点高可用

1. 阿里云slb配置请参见 [阿里云slb配置](/user-operations/gha/alislb)

2. 网关节点配置Keepalived具体配置请参见 
[CentOS系统 vip配置](/user-operations/gha/centos_keepalived/)
，[Ubuntu系统 vip配置](/user-operations/gha/ubuntu_keepalived)

### 七、计算节点扩容

> 扩容前，请检查是否配置了共享存储，如果是，请先行挂载 `/grdata`

#### 7.1 扩容命令

按下列场景选择扩容命令

- 未做ssh免密操作时，需要知悉节点root密码

```bash
#单独扩容计算节点
grctl node add --host compute01 --iip <计算节点ip> -p <root密码> --role compute --install
```

- 配置好ssh免密后

```bash
grctl node add --host compute01 --iip <计算节点ip> --key /root/.ssh/id_rsa.pub --role compute --install
```

#### 7.2 手动校验

安装完成后，在当前节点执行：

```bash
grctl cluster
```

若返回集群列表中显示扩容节点且状态正常，则表示扩容成功；若返回不正常，请重新审查本节操作。

### 八、应用控制台高可用

- rbd-app-ui服务（应用控制台Web服务）默认只在第一个管理节点安装，我们给您提供了更好的高可用方案

 详细请参阅[应用控制台高可用部署](/user-operations/gha/centos_keepalived/)

{{% button href="/user-manual/" %}}安装完成，开启Rainbond云端之旅{{% /button %}}】