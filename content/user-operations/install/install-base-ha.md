---
title: "高可用部署"
weight: 1001
description: "此方式将首先引导你进行相关资源的规划和准备，以完成生产级高可用集群的快速安装。"
hidden: true
---

### 一、原理解读

在生产环境下，可以通过调整Rainbond的部署结构，来提高其高可用性。在开始部署一个生产级的高可用Rainbond集群之前，强烈建议阅读 [Rainbond集群安装和运维原理解读](/user-operations/install/install-d/)

### 二、资源准备与集群规划

#### 2.1 机器资源要求与规划


> 操作系统要求

| 系统     | 版本         | 说明                     |
| :------- | :----------- | :----------------------- |
| CentOS   | 7.3及以上（推荐CentOS7.4） | 64位，[ISO下载](http://goodrain-pkg.oss-cn-shanghai.aliyuncs.com/system/CentOS/CentOS-7-x86_64-Minimal-1708.iso)  |
| Ubuntu   | 16.04（推荐）| 64位，[ISO下载](https://goodrain-pkg.oss-cn-shanghai.aliyuncs.com/system/CentOS/ubuntu-16.04.6-server-amd64.iso)             |

> 单台服务器计算资源配置推荐

|服务器角色|CPU|内存|
|------|-----|-----|
|管理节点| 16核|32G|
|计算节点| 16核|64G|
|存储节点|4核|8G|
|网关节点|4核|8G|

> 磁盘分区

- 管理节点磁盘分区

|挂载点|磁盘大小|说明|
|---|---|---|
| / |100G|系统根分区，本地磁盘，最低要求40G，推荐100G|
| /var/lib/docker |100G|docker镜像存储分区，本地磁盘|
| /opt/rainbond |50G|存储rainbond程序以及产生的日志、数据，本地磁盘|
| /cache | 50G | 存储应用构建使用的缓存，可以使用共享存储在管理节点间共享|

- 计算节点磁盘分区

|挂载点|磁盘大小|说明|
|---|---|---|
| / |100G|系统根分区，本地磁盘，最低要求40G，推荐100G|
| /var/lib/docker |100G|docker镜像存储分区，本地磁盘|
| /grlocaldata |100G|应用本地持久化存储，本地磁盘|

- 存储节点磁盘分区

|挂载点|磁盘大小|说明|
|---|---|---|
| / |40G|系统根分区，本地磁盘|
| /data |500G+|用于搭建集群共享存储，本地单独挂载磁盘|

#### 2.2 系统环境要求


* CentOS系统在安装前请升级内核版本
* 确保机器重启，服务器IP地址和nameserver不发生改变，推荐配置静态ip
* 确定系统时间与时区(Asia/Shanghai)同步,节点间时间要同步
* 确定系统可以正常`yum/apt-get install`相关软件包，需要提前配置系统相关软件源

#### 2.3 节点规划

一个完整的 Rainbond 集群中必须包含以下属性的节点，所有属性可以部署在同一个节点上组成单节点的Rainbond 集群。也可以为不同的服务器分配不同的属性来实现节点间功能的分离。安装 Rainbond 之前需要根据企业自身需求合理的规划计算资源。

- 角色属性规划


| 节点属性 | 节点介绍 |
| :----: | :--- |
|  管理节点      | 基于etcd的特性，部署数量从1开始，按奇数递增（即可以部署 1、3、5···台），高可用环境至少3台。 | 
| 网关节点      | 网关节点特指具备Rainbond应用访问负载均衡组件rbd-gateway的节点，默认部署于首个管理节点，可根据需要单独部署。部署数量参照管理节点，并配置VIP或SLB保证高可用。 | 
| 计算节点      | 部署数量2至100台，并在集群资源不足时按需扩容。 | 
| 存储节点      | 特指在选择GlusterFS作为集群共享存储解决方案时部署的存储节点。部署数量至少2台，并根据节点数量选择复制集数量 | 
| 数据库        | 推荐双主+VIP的高可用方案 | 

> 分配节点属性

根据用户实际服务器数量，结合不同角色属性的规划。用户可以自己定义集群的部署方式

- 可以将所有的角色分配给不同的服务器，实现一个完全拆分，各自功能专一的架构：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-operations/install/innstall-base-ha-1.png" width="70%">

- 可以将角色属性复用，用少量的服务器搭建一个复用式的集群：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-operations/install/innstall-base-ha-2.png" width="60%">

### 三、安装前准备

#### 3.1 外部数据库Mysql

Rainbond数据库组件rbd-db默认部署在首个管理节点，在集群扩容过程中并不会随着集群扩容而扩容这个组件，所以无法构成数据库的高可用，在首个管理节点宕机后集群管理功能将失效，所以在<font color="#dd0000">高可用安装中务必使用外部数据库</font><br />

Rainbond目前支持的数据库版本为 `Mysql5.6，Mysql5.7`; 后续我们将开放更多Mysql版本的支持。

> 初始化对接数据库参数说明 [初始化对接数据库](/user-operations/tools/grctl/#初始化对接外部数据库)


#### 3.2 集群存储说明及部署方案

Rainbond集群需要为管理节点与计算节点的 `/grdata` 目录配置共享存储

> 支持多种共享存储解决方案，请根据如下场景进行选择：

- NAS：

  基于阿里云等IaaS设施部署Rainbond的情况下，可以选择其提供的NAS存储服务。

- GlusterFS：

 基于用户自备的服务器或虚拟机部署Rainbond的情况下，推荐自行部署GlusterFS作为共享存储解决方案。
  
  部署GlusterFS存储节点，请参见:

 [CentOS GlusterFS双机复制集群安装](/user-operations/storage/centosgfs/)
  
 [Ubuntu GlusterFS双机复制集群安装](/user-operations/storage/ubuntugfs/)

- 其它兼容NFS协议的共享存储

如果用户拥有可使用的兼容NFS协议的共享存储，可以直接使用。使 /grdata 目录在集群管理节点与计算节点间共享即可。

> Rainbond初始化对接存储参数说明 [初始化对接存储](/user-operations/tools/grctl/#初始化对接存储)

### 四、数据中心初始化

#### 4.1 安装命令

{{% notice note %}}
安装说明：
- 安装时必须使用root用户执行安装操作;
- 在线安装确定网络没有限制，如有请加如下域名添加到白名单 `repo.goodrain.com, api.goodrain.com, hub.goodrain.com, docker.io, domain.grapps.cn, aliyun.com,aliyuncs.com`
- 默认情况下网关节点和管理节点复用;需开放 [相关组件端口](/user-operations/op-guide/required_ports/)
{{% /notice %}}

这一步将初始化Rainbond数据中心，即安装首个管理节点。这一步非常重要，会配置访问应用所使用的IP、集群网络解决方案等信息。


```bash
# 建议使用root执行安装操作
wget https://pkg.rainbond.com/releases/common/v5.1/grctl && chmod +x ./grctl

# 安装首个节点
./grctl init \
--role manage,gateway <节点属性> \
--iip <内网ip>  \
--eip <访问应用使用的公网IP/网关节点IP> \
--vip <为网关节点集群预置的虚拟IP>  \
--enable-exdb true <默认禁用使用外部数据库，启动值为true> \
--exdb-host <数据库VIP地址> \
--exdb-port <数据库端口号>  \
--exdb-user <数据库用户名>   \
--exdb-passwd  <数据库密码>   \
--storage  gfs  <存储类型>     \  
--storage-args  "10.10.10.13:/data /grdata glusterfs backupvolfile-server=10.10.10.14,use-readdirp=no,log-level=WARNING,log-file=/var/log/gluster.log 0 0"   <挂载已搭建好的gfs集群> 

```

具体初始化参数，请阅读[节点初始化重要参数说明](/user-operations/tools/grctl/#节点初始化重要参数说明) 或者通过 `grctl init -h` 获取。

> 安装过程需要下载和处理大约2G的文件，需要一定时间，请耐心等待。安装过程如有报错，请参照[安装问题排查](/troubleshoot/install-problem/)，排查问题；若遇到无法解决的错误请于[Rainbond社区](https://t.goodrain.com)留言。

### 五、管理节点扩容

> 管理节点的扩容，实现了集群管理功能的高可用；考虑到 etcd 集群选举机制，需至少扩容到3个管理节点

在此安装过程中，我们将管理节点与网关节点复用，所以在扩容时同步扩容网关节点，用户在部署高可用集群时也可将网关节点与管理节点分离，网关节点部署数量参照管理节点数量。

#### 5.1 扩容命令

```bash
方法一 适用于知悉节点root密码
grctl node add --iip <管理节点ip> -p <root密码> --role manage,gateway --install
方法二 适用于已经配置好ssh免密
grctl node add --iip <管理节点ip> --key /root/.ssh/id_rsa.pub --role manage,gateway --install
```

#### 5.2 实现网关节点高可用

> 阿里云slb配置请参见 [阿里云slb配置](/user-operations/gha/alislb)

> 在此次部署中管理节点和网关节点部署在同一台服务器，所以在管理节点操作即可;网关节点配置Keepalived具体配置请参见 
[CentOS系统 vip配置](/user-operations/gha/centos_keepalived/)
[Ubuntu系统 vip配置](/user-operations/gha/ubuntu_keepalived)

### 六、计算节点扩容

> 高可用集群中至少需要两个计算节点

#### 扩容命令

```bash
方法一 适用于知悉节点root密码
grctl node add --iip <计算节点ip> -p <root密码> --role compute --install
方法二 适用于已经配置好ssh免密
grctl node add --iip <计算节点ip> --key /root/.ssh/id_rsa  --role compute --install
```


### 七、手动调整过程

> 高可用集群搭建到了这里，还有些细节，要手动调整，在调整之前确保使用`grctl cluster`命令查看集群状态正常。

{{% notice note %}}
如果将管理节点集群和网关节点集群分开部署，则需要分别为两个集群配置虚拟IP；如果管理节点集群和网关节点混合部署，则两个虚拟IP统一。
{{% /notice %}}

#### 7.1 调整数据库

```SQL
update console.region_info set url="https://<VIP_OF_MANAGE>:8443",wsurl="ws://<VIP_OF_MANAGE>:6060",tcpdomain="<VIP_OF_GATEWAY>";
```

#### 7.2 调整 /etc/hosts

在所有节点调整 /etc/hosts

```
< VIP >  kubeapi.goodrain.me goodrain.me repo.goodrain.me lang.goodrain.me maven.goodrain.me region.goodrain.me
```

#### 7.3 调整网络组件配置

以calico网络为例，在管理节点修改配置文件中指向etcd的地址

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

#### 7.4 调整node配置

在管理节点调整node配置

```
vi /opt/rainbond/scripts/start-node.sh
#!/bin/bash

NODE_OPTS="--log-level=info --auto-scheduler=true --kube-conf=/opt/rainbond/etc/kubernetes/kubecfg/admin.kubeconfig --etcd="http://<管理节点1IP>:2379,http://<管理节点2IP>:2379,http://<管理节点3IP>:2379"   --hostIP=192.168.2.169 --run-mode master --noderule manage,compute,gateway"

exec /usr/local/bin/node $NODE_OPTS

```

#### 7.5 重启服务

管理节点重启以下服务

```bash
systemctl restart node.service
systemctl restart calico
systemctl restart rbd-dns
```

计算节点重启以下服务

```bash
systemctl restart node.service
systemctl restart calico
systemctl restart rbd-dns
systemctl restart kubelet
```

#### 查看集群状态

```
grctl cluster
```
确保集群状态正常后登录应用控制台

> 所有服务和节点皆处于健康状态时平台即可正常使用；如果集群状态不健康，参考[集群问题排查](/troubleshoot/cluster-problem/)文档解决故障；若遇到无法解决的错误请于[Rainbond社区](https://t.goodrain.com)留言。

### 八、应用控制台高可用

> rbd-app-ui服务（应用控制台Web服务）默认只在第一个管理节点安装。对于控制台组件的高可用，我们推荐将其以应用的形式运行在平台上。利用平台对无状态服务可以动态伸缩的特性，来保证其高可用性。

详细请参阅[应用控制台高可用部署](/user-operations/component/app-ui/)

{{% button href="/user-manual/" %}}安装完成，开启Rainbond云端之旅{{% /button %}}