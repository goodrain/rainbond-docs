---
title: "高可用部署"
weight: 1001
description: "此方式将首先引导你进行相关资源的规划和准备，以完成高可用集群的快速安装。"
hidden: true
---

### 一、原理解读

在生产环境下，可以通过调整Rainbond的部署结构，来提高其高可用性。在开始部署一个具备高可用的Rainbond集群之前，强烈建议阅读[RAINBOND集群安装和运维原理解读](/user-operations/install/install-d/)

### 二、资源准备与集群规划

#### 2.1 机器资源要求与规划


> 操作系统要求

|操作系统|版本|
|---|---|
|CentOS|[7.4.1708](http://goodrain-pkg.oss-cn-shanghai.aliyuncs.com/system/CentOS/CentOS-7-x86_64-Minimal-1708.iso)|
|Ubuntu|[16.04](https://goodrain-pkg.oss-cn-shanghai.aliyuncs.com/system/CentOS/ubuntu-16.04.6-server-amd64.iso) (建议安装此版本)|
单台服务器计算资源配置推荐

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

#### 2.2 外部数据库Mysql

{{% notice warning %}}

Rainbond在高可用集群部署过程当中务必使用外部数据库

{{% /notice %}}

> 为何使用外部数据库：

Rainbond默认提供 rbd-db 组件作为平台数据库使用。这个组件只会安装在首个管理节点，其他管理节点扩容后，并不会同时扩容该组件。这导致管理节点集群对于首个管理节点依然具有强依赖的特性，并不能称其实现了真正的高可用。首个管理节点宕机，就会直接导致管理集群失效。为了避免这一点，我们选择将平台数据库部署在集群之外。这样就实现了所有管理节点之间身份等价，无论哪台宕机，集群管理功能不会受到影响。

> 如何使用外部数据库：

通过 `grctl init` 初始化集群时，可以通过指定一组参数来指定外部数据库。

```bash 
--enable-exdb value            default disable external database
--exdb-type value              external database type(mysql,postgresql)
--exdb-host value              external database host
--exdb-port value              external database port (default: "3306")
--exdb-user value              external database user
--exdb-passwd value            external database password
```

详细说明，参见[初始化时对接外部数据库](/user-operations/tools/grctl/#初始化时对接外部数据库)

{{% notice note %}}
对于 Mysql 数据库，我们建议用户独立安装 Mysql 数据库并提供给 Rainbond 安装脚本，Mysql主从配置请参阅[官方文档](https://dev.mysql.com/doc/refman/5.6/en/replication-howto.html)
{{% /notice %}}

#### 2.3 节点规划

一个完整的 Rainbond 集群中必须包含 manage、gateway、compute 角色的节点和暂不作为 Rainbond 安装支持的存储节点，所有属性可以部署在同一个节点上组成单节点的Rainbond 集群。也可以为不同的服务器分配不同的属性来实现节点间功能的分离。安装 Rainbond 之前需要根据企业自身需求合理的规划计算资源。

> 角色属性规划

- 管理节点：

管理节点为常规部署项，必然存在于集群之中。基于etcd的特性，部署数量从1开始，按奇数递增（即可以部署 1、3、5···台），推荐3台。

- 计算节点：

计算节点为常规部署项，必然存在于集群之中。部署数量2至100台，并在集群资源不足时按需扩容。

- 存储节点：

特指在选择glusterfs作为集群共享存储解决方案时部署的存储节点。部署数量至少2台，并根据节点数量选择复制集数量。

- 网关节点：

网关节点特指具备Rainbond应用访问负载均衡组件rbd-gateway的节点，为常规部署项，必然存在于集群之中。默认部署于首个管理节点，可以根据需要单独部署。部署数量参照管理节点，并配置VIP或SLB保证高可用。

- 外部数据库：根据具体情况选择合适的方案。

> 分配节点属性

根据用户实际服务器数量，结合不同角色属性的规划。用户可以自己定义集群的部署方式

- 可以将所有的角色分配给不同的服务器，实现一个完全拆分，各自功能专一的架构：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-operations/install/innstall-base-ha-1.png" width="100%">

- 可以将角色属性复用，用少量的服务器搭建一个复用式的集群：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-operations/install/innstall-base-ha-2.png" width="100%">

### 三、存储节点选择

#### 3.1 支持的存储说明及部署方案

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

#### 3.2 初始化对接存储

Rainbond在执行集群初始化的时候，可以通过指定参数对接已存在的存储（glusterfs/NAS）

执行 `grctl init` 时指定如下参数：

```bash
--storage value                Storage type, default:NFS (default: "nfs")
--storage-args value           Stores mount parameters (default: "/grdata nfs rw 0 0")
```
一个对接NAS的[命令实例](/user-operations/tools/grctl/#初始化时对接外部存储)

### 四、数据中心初始化

{{% notice warning %}}
在这篇文档中，会多次出现对 grctl init 命令参数的讲解。用户需要根据自己的情况，叠加这些参数，最终组成整条集群初始化的命令。
{{% /notice %}}

在新的发行版本中，我们支持对数据中心初始化时指定一些参数可以使首个管理节点具有多种节点类型。

执行 `grctl init` 时指定如下参数：

```bash
# 首个管理节点，至少具备 manage、gateway 属性
./grctl init --role manage,gateway
# 默认情况下，如果不指定这个参数，则管理节点，计算节点和网关节点复用
```

{{% notice note %}}
初始化数据中心时，首个管理节点默认一定会包含 gateway 角色属性，该属性可以去除，参见 [角色属性如何去除](/troubleshoot/concrete-operations/delete-roles/)
{{% /notice %}}

具体初始化参数，请阅读[节点初始化重要参数说明](/user-operations/tools/grctl/#节点初始化重要参数说明) 或者通过 `grctl init -h` 获取。

#### 4.1 安装命令

这一步将初始化Rainbond数据中心，即安装首个管理节点。这一步非常重要，会配置访问应用所使用的IP、集群网络解决方案等信息。

> 安装前，请检查是否配置了共享存储，如果是，请先行挂载 `/grdata`，并在安装时**指定共享存储类型及挂载地址**

```bash
# 建议使用root执行安装操作
wget https://pkg.rainbond.com/releases/common/v5.1/grctl
chmod +x ./grctl

# 此示例表示, 数据中心数据库和控制台数据库都使用外部数据库(不分离)
./grctl init --role manage --iip <内网ip> --eip <访问应用使用的公网IP/网关节点IP> --vip <为网关节点集群预置的虚拟IP>  --enable-exdb true <默认禁用使用外部数据库，启动值为true> --exdb-host <数据库IP地址> --exdb-port <数据库端口号> --exdb-user <数据库用户名>   --exdb-passwd  <数据库密码>

# 此示例表示, 数据中心数据库使用本地数据库(rbd-db), 控制台数据库都使用外部数据库
./grctl init --role manage --iip <内网ip> --eip <访问应用使用的公网IP/网关节点IP>  --vip <为网关节点集群预置的虚拟IP> --enable-exdb true <默认禁用使用外部数据库，启动值为true> --enable-excsdb-only true <控制台数据库使用外部数据库> --excsdb-host <数据库IP地址> --excsdb-port <数据库端口号> --excsdb-user <数据库用户名>   --excsdb-passwd  <数据库密码>

# 此示例表示, 数据中心数据库和控制台数据库都使用外部数据库(分离)
./grctl init --role manage --iip <内网ip> --eip <访问应用使用的公网IP/网关节点IP>  --vip <为网关节点集群预置的虚拟IP> --enable-exdb true <默认禁用使用外部数据库，启动值为true> -exdb-host <数据中心数据库IP地址> --exdb-port <数据中心数据库端口号> --exdb-user <数据中心数据库用户名>    --exdb-passwd <数据中心数据库密码> --enable-excsdb-only true <控制台数据库使用外部数据库>-excsdb-host <控制台数据库IP地址> --excsdb-port <控制台数据库端口号> --excsdb-user <控制台数据库用户名>   --excsdb-passwd  <控制台数据库密码>

```


### 五、管理节点扩容

管理节点的扩容，实现了集群管理功能的高可用；考虑到 etcd 集群选举机制，应至少扩容到3个管理节点。

> 扩容前，请检查是否配置了共享存储，如果是，请先行挂载 `/grdata`

#### 5.1 扩容命令

Rainbond支持在扩容时，灵活指定被扩容节点的角色灵活搭配，例：

```bash
# 扩容全属性节点
grctl node add --role manage,compute,gateway ···
# 单独扩容网关节点
grctl node add --role gateway ···
# 扩容网关计算节点
grctl node add --role gateway,compute ···
```

更多扩容参数，请执行 `grctl node add -h` 获取

按下列场景选择扩容命令

- 未做ssh免密操作时，需要知悉节点root密码

```bash
#单独扩容管理节点
grctl node add  --iip <管理节点ip> -p <root密码> --role manage  --install

```

- 配置好ssh免密后

```bash
grctl node add --iip <管理节点ip> --key /root/.ssh/id_rsa.pub --role manage --install
```

> 更多扩容参数，请执行 `grctl node add -h` 获取

### 六、网关节点扩容

- 如需要单独扩容网关节点，则执行以下命令

```bash
grctl node add --iip <网关节点ip> --eip <访问应用使用的公网IP/网关节点IP> -p <root密码> --role gateway --install

```

#### 6.1 实现网关节点高可用

> 阿里云slb配置请参见 [阿里云slb配置](/user-operations/gha/alislb)

> 网关节点配置Keepalived具体配置请参见 
[CentOS系统 vip配置](/user-operations/gha/centos_keepalived/)
[Ubuntu系统 vip配置](/user-operations/gha/ubuntu_keepalived)

### 七、计算节点扩容

> 扩容前，请检查是否配置了共享存储，如果是，请先行挂载 `/grdata`

#### 7.1 扩容命令

按下列场景选择扩容命令

- 未做ssh免密操作时，需要知悉节点root密码

```bash
#单独扩容计算节点
grctl node add --iip <计算节点ip> -p <root密码> --role compute --install
```

- 配置好ssh免密后

```bash
grctl node add --iip <计算节点ip> --key /root/.ssh/id_rsa.pub --role compute --install
```

### 八、应用控制台高可用

> rbd-app-ui服务（应用控制台Web服务）默认只在第一个管理节点安装。对于控制台组件的高可用，我们推荐将其以应用的形式运行在平台上。利用平台对无状态服务可以动态伸缩的特性，来保证其高可用性。

详细请参阅[应用控制台高可用部署](/user-operations/component/app-ui/)


### 九、手动调整过程

高可用集群搭建到了这里，还有些细节，要手动调整。

{{% notice note %}}
如果将管理节点集群和网关节点集群分开部署，则需要分别为两个集群配置虚拟IP；如果管理节点集群和网关节点混合部署，则两个虚拟IP统一。
{{% /notice %}}

> 调整数据库

```SQL
update console.region_info set url="https://<VIP_OF_MANAGE>:8443",wsurl="ws://<VIP_OF_MANAGE>:6060",tcpdomain="<VIP_OF_GATEWAY>";
```

> 调整/etc/hosts

```Bash
# Rainbond hosts BEGIN
<VIP_OF_GATEWAY> kubeapi.goodrain.me goodrain.me repo.goodrain.me lang.goodrain.me maven.goodrain.me 
<VIP_OF_MANAGE> region.goodrain.me
```

> 调整网络组件配置

以calico网络为例，修改配置文件中指向etcd的地址

```json
vi /opt/rainbond/etc/cni/10-calico.conf

{
    "name": "calico-k8s-network",
    "cniVersion": "0.1.0",
    "type": "calico",
    "etcd_endpoints": "http://<管理节点1IP>:2379,<管理节点2IP>:2379,<管理节点3IP>:2379",
    "log_level": "info",
    "ipam": {
        "type": "calico-ipam"
    },
    "kubernetes": {
        "kubeconfig": "/opt/rainbond/etc/kubernetes/kubecfg/admin.kubeconfig"
    }
}
```

重启服务

```bash
systemctl restart calico
systemctl restart kubelet
```

{{% button href="/user-manual/" %}}安装完成，开启Rainbond云端之旅{{% /button %}}