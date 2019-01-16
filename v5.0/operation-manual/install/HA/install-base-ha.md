---
title: 搭建生产可用的高可用Rainbond集群
summary: 此方式将首先引导你进行相关资源的规划和准备，以完成高可用Rainbond集群的快速安装。
toc: true
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>


## 一、集群高可用说明

在生产环境下，可以调整Rainbond的部署结构，来提高其高可用性。Rainbond高可用性可以从以下几个层面提升：

- 存储高可用：选择合适的分布式存储系统作为集群的共享存储。

- 网络高可用：为集群选择合适的SDN网络。

- 管理节点集群： 部署多个管理节点，实现Rainbond管理功能高可用。

- 计算节点集群： 分布式部署多个计算节点，实现计算资源高可用。

- 网关节点集群： 部署多个网关节点，提供多个应用访问入口。

## 二、机器资源准备

###  2.1 机器资源要求与规划

> 操作系统要求

|操作系统|版本|
|--|--|
|CentOS|7.4|

> 单台服务器计算资源配置要求

|服务器角色|CPU|内存|              
|------|-----|-----|
|管理节点| 16核|32G|
|计算节点| 16核|64G|
|网络节点|8核|16G|
|存储节点|4核|8G|
|网关节点|4核|8G|

> 管理节点磁盘分区

|挂载点|磁盘大小|说明|
|---|---|---|
| / |40G|系统根分区，本地磁盘|
| /var/lib/docker |100G|docker镜像存储分区，本地磁盘|
| /opt/rainbond |50G|存储rainbond程序以及产生的日志、数据，本地磁盘|
| /cache | 50G | 存储应用构建使用的缓存，可以使用共享存储在管理节点间共享|

> 计算节点磁盘分区

|挂载点|磁盘大小|说明|
|---|---|---|
| / |40G|系统根分区，本地磁盘|
| /var/lib/docker |100G|docker镜像存储分区，本地磁盘|
| /grlocaldata |100G|应用本地持久化存储，本地磁盘|

> 存储节点磁盘分区

|挂载点|磁盘大小|说明|
|---|---|---|
| / |40G|系统根分区，本地磁盘|
| /data |500G+|用于搭建集群共享存储，本地单独挂载磁盘|

> 网络节点网络配置

如对于应用网络有较高要求，请对应提高网络节点网络配置：提高带宽并升级网卡。

###  2.2 节点规划

根据用户具体要求，可以参见本节规划集群的节点配置。

- 管理节点：

管理节点为常规部署项，必然存在于集群之中。部署数量从1开始，按奇数递增（即可以部署 1、3、5···台），推荐3台。

- 计算节点：

计算节点为常规部署项，必然存在于集群之中。部署数量2至100台，并在集群资源不足时按需扩容。

- 网络节点：

特指在选择midonet作为集群网络解决方案时部署的网络出口节点。部署数量推荐2台，并可以在必要时进行切换保证高可用。

- 存储节点：

特指在选择glusterfs作为集群共享存储解决方案时部署的存储节点。部署数量至少2台，并根据节点数量选择复制集数量。

- 网关节点：

网关节点特指具备Rainbond应用访问负载均衡组件rbd-gateway的节点，为常规部署项，必然存在于集群之中。默认部署于所有的管理节点，可以根据需要单独部署。部署数量参照管理节点，并配置VIP保证高可用。

## 三、存储集群选择与安装

准备存储是安装高可用集群的第一步。在这一步将解决集群共享目录 `/grdata` 的配置。

### 3.1 支持的存储集群说明

Rainbond需要为管理节点与计算节点的 `/grdata` 目录配置共享存储。

> Rainbond支持多种共享存储解决方案，请根据如下场景进行选择：

- NAS：

基于阿里云等IaaS设施部署Rainbond的情况下，可以选择其提供的 [NAS](/docs/v5.0/operation-manual/install/alicloud/install-base-alicloud.html#2-1-nas) 存储服务。

- GlusterFS：

基于用户自备的服务器或虚拟机部署Rainbond的情况下，推荐部署 [GlusterFS](/docs/v5.0/operation-manual/storage/GlusterFS/introduce.html) 作为共享存储解决方案。

- 其它兼容NFS协议的共享存储

如果用户拥有可使用的兼容NFS协议的共享存储，可以直接使用。使 /grdata 目录在集群管理节点与计算节点间共享即可。

### 3.2 安装GlusterFS集群

安装GlusterFS集群，请参见 [GlusterFS双机复制集群安装](/docs/v5.0/operation-manual/storage/GlusterFS/install.html)

安装完成后，可以获得数据卷 `data`，接下来将其挂载到对应节点的 `/grdata`：

在所有的管理节点和计算节点执行：

- 安装glustefs挂载包

{% include copy-clipboard.html %}

```bash
yum install -y glusterfs-fuse
```

- 增加挂载记录

{% include copy-clipboard.html %}

```bash
echo 'server1:/data /grdata glusterfs   backupvolfile-server=server2,use-readdirp=no,log-level=WARNING,log-file=/var/log/gluster.log 0 0' >> /etc/fstab
```

- 创建挂载点

{% include copy-clipboard.html %}

```bash
mkdir /grdata
```

- 执行挂载

{% include copy-clipboard.html %}

```bash
mount -a
```

### 3.3 为已安装的Rainbond切换存储

> 场景描述： 用户已经拥有Rainbond集群，现在希望将共享存储切换到新搭建好的GlusterFS

思路引导：Rainbond数据中心初始化默认使用manage01节点作为NFS-server，对所有集群其他成员共享其 `/grdata` 目录。如果需要切换，则先摘除集群其他节点的共享存储，然后停止manage01的nfs-server服务，最后将数据同步到GlusterFS，所有节点重新挂载。

具体操作如下：

- 摘除集群其他节点的共享存储

在集群中除manage01节点外的其他节点执行

{% include copy-clipboard.html %}

```bash
umount /grdata
```

- 停止manage01的nfs-server服务

在manage01节点执行

{% include copy-clipboard.html %}

```bash
systemctl stop nfs-server
systemctl disable nfs-server
```

- 将数据同步到GlusterFS

以在server01 server02两个存储节点制作存储卷 data 为例,在manage01节点执行

{% include copy-clipboard.html %}

```bash
mount -t glusterfs server01:data /mnt
```

{% include copy-clipboard.html %}

```bash
cp -arp /grdata/. /mnt
```

- 所有节点重新挂载

所有节点编辑 `/etc/fstab` 注释或者删除指向原manage01节点的NFS挂载记录，添加如下记录：

{% include copy-clipboard.html %}

```bash
server1:/data /grdata glusterfs   backupvolfile-server=server2,use-readdirp=no,log-level=WARNING,log-file=/var/log/gluster.log 0 0
```

在所有节点执行

{% include copy-clipboard.html %}

```bash
mount -a
```

### 3.4 手动校验存储

在所有节点执行

{% include copy-clipboard.html %}

```bash
mount | grep /grdata
```

若返回结果已挂载，则校验成功，进行下一步。如不成功，请重新审查本节操作。

## 四、网络解决方案选择

### 支持的网络方案

当前版本Rainbond支持三种网络类型，默认为 `calico` 可选项为 `flannel` `midonet`。需要在数据中心初始化时，通过 `--network` 参数指定。

## 五、Rainbond数据中心初始化

### 5.1 命令

这一步将初始化Rainbond数据中心，即安装首个管理节点。这一步非常重要，会配置访问应用所使用的IP、集群网络解决方案等信息。

{% include copy-clipboard.html %}

```bash
wget https://pkg.rainbond.com/releases/common/v5.0/grctl
```

{% include copy-clipboard.html %}

```bash
chmod +x ./grctl
```

{% include copy-clipboard.html %}

```bash
./grctl init --iip <内网ip> --eip <访问应用使用的公网IP/网关节点IP> \
--network <选择网络解决方案，可选择calico/flannel/midonet，默认calico> \
--vip <指定VIP，具体配置见下节> --install-type offline <此项必须填写>

```

> 更多初始化参数，请执行 ./grctl init -h 获取

### 5.2 手动校验

安装完成后，在当前节点执行：

{% include copy-clipboard.html %}

```bash
grctl cluster
```

若返回集群信息正常，则进行下一步；若返回不正常，请重新审查本节操作。

## 六、管理节点扩容

管理节点的扩容，实现了集群管理功能的高可用。考虑到 etcd 集群选举机制，应至少扩容到3个管理节点。

> 扩容前，请检查是否配置了共享存储，如果是，请先行挂载 `/grdata`

### 6.1 扩容命令

按下列场景选择扩容命令

- 未做ssh免密操作时，需要知悉节点root密码

{% include copy-clipboard.html %}

```bash
grctl node add --host manage02 --iip <管理节点ip> -p <root密码> --role manage

```

{% include copy-clipboard.html %}

```bash
grctl node install <Uid>
```


- 配置好ssh免密后

{% include copy-clipboard.html %}

```bash
grctl node add --host manage03 --iip <管理节点ip> --key /root/.ssh/id_rsa.pub --role manage
```

{% include copy-clipboard.html %}

```bash
grctl node install <Uid>
```

> 更多扩容参数，请执行 grctl node add -h 获取

<!-- ### 6.2 调整集群内部服务

> 集群内部服务由rbd-gateway进行负载均衡，在多管理节点部署时，需要进行端口调整。

- 调整kube-apiserver

kube-apiserver默认监听6443端口，为了不与rbd-gateway监听端口冲突，需要将监听端口修改至其它值，下面以6442为例，修改这个端口

在所有管理节点均执行

```bash
vi /opt/rainbond/conf/k8s-master.yaml

version: '2.1'
services:
- name: kube-apiserver
  disable: false
  endpoints:
  - name: APISERVER_ENDPOINTS
    protocol: http
    #修改健康检测端口
    port: 6442
  health:
    name: kube-apiserver
    model: http
    address: http://127.0.0.1:8181/version
    time_interval: 5
    max_errors_num: 3
  after:
    - docker
  type: simple
  pre_start: docker rm kube-apiserver
  start: >-
    /usr/bin/docker
    run
    --privileged
    --restart=always
    --net=host
    --name kube-apiserver
    --volume=/opt/rainbond/etc/kubernetes:/opt/rainbond/etc/kubernetes
    goodrain.me/kube-apiserver:v1.10.11
    #添加一行，指定监听端口 6442
    --secure-port=6442
    --insecure-bind-address=127.0.0.1
    --insecure-port=8181
    --advertise-address=10.10.10.221 --bind-address=10.10.10.221
    --etcd-servers=${ETCD_ENDPOINTS}
    --enable-admission-plugins=ServiceAccount,NamespaceLifecycle,LimitRanger,DefaultStorageClass,DefaultTolerationSeconds,MutatingAdmissionWebhook,ValidatingAdmissionWebhook,ResourceQuota
    --authorization-mode=Node,RBAC
    --runtime-config=rbac.authorization.k8s.io/v1beta1
    --enable-bootstrap-token-auth
    --token-auth-file=/opt/rainbond/etc/kubernetes/kubecfg/token.csv
    --tls-cert-file=/opt/rainbond/etc/kubernetes/ssl/kubernetes.pem
    --tls-private-key-file=/opt/rainbond/etc/kubernetes/ssl/kubernetes-key.pem
    --client-ca-file=/opt/rainbond/etc/kubernetes/ssl/ca.pem
    --service-account-key-file=/opt/rainbond/etc/kubernetes/ssl/ca-key.pem
    --logtostderr=true
    --service-cluster-ip-range=11.1.0.1/12
  stop: docker stop kube-apiserver
  restart_policy: always
  restart_sec: 10
```

重启服务

{% include copy-clipboard.html %}

```bash
systemctl restart node
systemctl restart kube-apiserver
``` -->

### 6.2 手动校验

安装完成后，在当前节点执行：

{% include copy-clipboard.html %}

```bash
grctl cluster
```

若返回集群列表中显示出扩容节点且服务状态正常，则进行下一步；若返回不正常，请重新审查本节操作。

## 七、网关节点扩容

如无特殊设置，网关节点将默认安装在所有的管理节点，故而会随管理节点同步扩容。扩容完成后，需要配置VIP实现高可用,该VIP在 **Rainbond数据中心初始化** 时由 `--vip` 参数指定。

### 7.1 vip配置

借助 `keepalived` 完成VIP配置

- 安装

`yum install -y keepalived`

- 编辑配置文件

{% include copy-clipboard.html %}

```bash
##备份原有配置文件
cp /etc/keepalived/keepalived.conf /etc/keepalived/keepalived.conf.bak
##编辑配置文件如下
##manage01
! Configuration File for keepalived

global_defs {
   router_id LVS_DEVEL
}

vrrp_instance VI_1 {
    #角色，当前为主节点
    state MASTER
    #网卡设备名，通过 ifconfig 命令确定
    interface ens6f0
    virtual_router_id 51
    #优先级，主节点大于备节点
    priority 100
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        <VIP>
    }
}

##其他管理节点
! Configuration File for keepalived

global_defs {
   router_id LVS_DEVEL
}

vrrp_instance VI_1 {
    #角色，当前为备节点
    state BACKUP
    #网卡设备名，通过 ifconfig 命令确定
    interface ens6f0
    virtual_router_id 51
    #优先级，主节点大于备节点
    priority 50
    advert_int 1
    authentication {
        auth_type PASS
        auth_pass 1111
    }
    virtual_ipaddress {
        <VIP>
    }
}

```

- 启动服务

启动服务，设置开机自启动

{% include copy-clipboard.html %}

```bash
systemctl start keepalived
systemctl enable keepalived
```

- 其他需要调整的配置

在manage01节点执行

{% include copy-clipboard.html %}

```bash
din rbd-db
mysql
use console;
UPDATE region_info set tcpdomain="<VIP>";
```

### 7.2 手动校验

在主节点执行如下命令：

{% include copy-clipboard.html %}

```bash
systemctl stop keepalived
ip a
```

如果在关闭服务后，vip成功在某一台备用节点上启动，则进入下一步；如果vip没有成功漂移，请重新审查本节操作。

## 八、计算节点扩容

> 扩容前，请检查是否配置了共享存储，如果是，请先行挂载 `/grdata`

### 8.1 扩容命令

按下列场景选择扩容命令

- 未做ssh免密操作时，需要知悉节点root密码

{% include copy-clipboard.html %}

```bash
grctl node add --host compute01 --iip <计算节点ip> -p <root密码> --role compute
```

{% include copy-clipboard.html %}

```bash
grctl node install  <Uid>
```

- 配置好ssh免密后

{% include copy-clipboard.html %}

```bash
grctl node add --host compute01 --iip <计算节点ip> --key /root/.ssh/id_rsa.pub --role compute
```

{% include copy-clipboard.html %}

```bash
grctl node install <Uid>
```

### 8.2 手动校验

安装完成后，在当前节点执行：

{% include copy-clipboard.html %}

```bash
grctl cluster
```

若返回集群列表中显示扩容节点且状态正常，则表示扩容成功；若返回不正常，请重新审查本节操作。