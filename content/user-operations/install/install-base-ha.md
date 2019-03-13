---
title: "高可用部署"
weight: 1003
---

### 一、集群高可用说明

在生产环境下，可以调整Rainbond的部署结构，来提高其高可用性。Rainbond高可用性可以从以下几个层面提升：

- 存储高可用：选择合适的分布式存储系统作为集群的共享存储。

- 网络高可用：为集群选择合适的SDN网络。

- 管理节点集群： 部署多个管理节点，实现Rainbond管理功能高可用。

- 计算节点集群： 分布式部署多个计算节点，实现计算资源高可用。

- 网关节点集群： 部署多个网关节点，提供多个应用访问入口。

### 二、机器资源准备

#### 2.1 机器资源要求与规划

> 操作系统要求

|操作系统|版本|
|---|---|
|CentOS|[7.4.1708](http://goodrain-pkg.oss-cn-shanghai.aliyuncs.com/system/CentOS/CentOS-7-x86_64-Minimal-1708.iso)(建议安装此版本)|

{{% notice warning %}}
当前版本不推荐选用CentOS 7.5/7.6版本，如果必须使用上述版本，请将内核版本升级到4.x,具体可以参考[社区方案](https://t.goodrain.com/t/centos-check-unpack/628)
{{% /notice %}}

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

> 网络节点网络配置

如对于应用网络有较高要求，请对应提高网络节点网络配置：提高带宽并升级网卡。

#### 2.2 节点规划

根据用户具体要求，可以参见本节规划集群的节点配置。

- 管理节点：

管理节点为常规部署项，必然存在于集群之中。部署数量从1开始，按奇数递增（即可以部署 1、3、5···台），推荐3台。

- 计算节点：

计算节点为常规部署项，必然存在于集群之中。部署数量2至100台，并在集群资源不足时按需扩容。

- 存储节点：

特指在选择glusterfs作为集群共享存储解决方案时部署的存储节点。部署数量至少2台，并根据节点数量选择复制集数量。

- 网关节点：

网关节点特指具备Rainbond应用访问负载均衡组件rbd-gateway的节点，为常规部署项，必然存在于集群之中。默认部署于所有的管理节点，可以根据需要单独部署。部署数量参照管理节点，并配置VIP保证高可用。

更多关于软硬件要求请参考 [软件和硬件环境要求](../../op-guide/recommendation/)

### 三、存储节点选择

准备存储是安装高可用集群的第一步。在这一步将解决集群共享目录 `/grdata` 的配置。

#### 3.1 支持的存储说明

Rainbond需要为管理节点与计算节点的 `/grdata` 目录配置共享存储。

> Rainbond支持多种共享存储解决方案，请根据如下场景进行选择：

- NAS：

基于阿里云等IaaS设施部署Rainbond的情况下，可以选择其提供的NAS存储服务。

- GlusterFS：

基于用户自备的服务器或虚拟机部署Rainbond的情况下，推荐部署GlusterFS作为共享存储解决方案。

- 其它兼容NFS协议的共享存储

如果用户拥有可使用的兼容NFS协议的共享存储，可以直接使用。使 /grdata 目录在集群管理节点与计算节点间共享即可。

#### 3.2 存储节点部署方案

> 推荐节点先行部署或对接存储节点，确定所有节点都已经正常挂载/grdata

##### GlusterFS

部署GlusterFS存储节点，请参见 [GlusterFS双机复制集群安装](/docs/v5.0/operation-manual/storage/GlusterFS/install.html)

##### NAS

对接阿里云文件存储NAS，请参见[对接文件存储NAS](/docs/v5.0/operation-manual/storage/nas/alinas-install.html)

### 四、网络方案选择

#### 支持的网络方案

当前版本Rainbond支持三种网络类型，开源版本默认为 `calico` 可选项为 `flannel` 。需要在数据中心初始化时(执行 grctl init)，通过 `--network` 参数指定。
下面简单对比两种解决方案的优缺点：
* calico
优点：通过网络路由实现容器间通信，性能损耗较小。 缺点： 对宿主机网络要求较高，且只能支持 TCP,UDP和ICMP协议，其他特殊通信协议不支持，此方案适用于网络拓扑简单的中小规模集群，不适用于大型集群。
* flannel
flannel常用两种工作模式，hostgateway 和 overlay,使用hostgateway模式工作原理与calico类似但是其没有实现calico基于BGP协议共享路由的机制，限制性更大。overlay模式对于用户来说比较简单，但是其通过打包、解包过程，性能损耗较大。 该方案目前适用于需要安装Windows节点的集群和机器网络较为复杂的集群。

如果你选择`flannel`网络，你在安装Rainbond时需要指定如下参数:
```
grctl init --network flannel 其他参数
```

> Rainbond默认推荐使用calico网络

### 五、数据中心初始化

#### 5.1 命令

这一步将初始化Rainbond数据中心，即安装首个管理节点。这一步非常重要，会配置访问应用所使用的IP、集群网络解决方案等信息。

```bash
wget https://pkg.rainbond.com/releases/common/v5.0/grctl
```

```bash
chmod +x ./grctl
```

> 更多初始化参数，请执行 ./grctl init -h 获取

```bash
./grctl init --role master --iip <内网ip> --eip <访问应用使用的公网IP/网关节点IP> 
```

#### 5.2 手动校验

安装完成后，在当前节点执行：

```bash
grctl cluster
```

若返回集群信息正常，则进行下一步；若返回不正常，请重新审查本节操作。

> 扩容前，请检查是否配置了共享存储，如果是，请先行挂载 `/grdata`

### 六、管理节点扩容

管理节点的扩容，实现了集群管理功能的高可用。考虑到 etcd 集群选举机制，应至少扩容到3个管理节点。

#### 6.1 扩容命令

按下列场景选择扩容命令

- 未做ssh免密操作时，需要知悉节点root密码

```bash
grctl node add --host manage02 --iip <管理节点ip> -p <root密码> --role manage

```

```bash
grctl node install <Uid>
```

- 配置好ssh免密后

```bash
grctl node add --host manage03 --iip <管理节点ip> --key /root/.ssh/id_rsa.pub --role manage
```

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

#### 6.2 手动校验

安装完成后，在当前节点执行：

```bash
grctl cluster
```

若返回集群列表中显示出扩容节点且服务状态正常，则进行下一步；若返回不正常，请重新审查本节操作。

### 七、网关节点扩容

如无特殊设置，网关节点将默认安装在所有的管理节点，故而会随管理节点同步扩容。扩容完成后，需要配置VIP实现高可用。

> VIP要保证和当前机器ip在同一网段内。

#### 7.1 vip配置

借助 `keepalived` 完成VIP配置

- 安装

`yum install -y keepalived`

- 编辑配置文件

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

```bash
systemctl start keepalived
systemctl enable keepalived
```

- 其他需要调整的配置

在第一个管理节点执行

```bash
din rbd-db
mysql
use console;
UPDATE region_info set tcpdomain="<VIP>";
```

调整所有节点rbd-dns关于goodrain.me的解析(100.100.100.16为示例VIP,根据实际情况调整)

```bash
# 编辑/opt/rainbond/conf/dns.yaml,将recoders修改为vip地址
    --recoders=goodrain.me=100.100.100.16,*.goodrain.me=100.100.100.16

# 更新服务
node service update
# 编辑 /etc/hosts
100.100.100.16  kubeapi.goodrain.me goodrain.me repo.goodrain.me lang.goodrain.me maven.goodrain.me region.goodrain.me
```

### 7.2 手动校验

在主节点执行如下命令：

```bash
systemctl stop keepalived
ip a
```

如果在关闭服务后，vip成功在某一台备用节点上启动，则进入下一步；如果vip没有成功漂移，请重新审查本节操作。

### 八、计算节点扩容

> 扩容前，请检查是否配置了共享存储，如果是，请先行挂载 `/grdata`

#### 8.1 扩容命令

按下列场景选择扩容命令

- 未做ssh免密操作时，需要知悉节点root密码

```bash
grctl node add --host compute01 --iip <计算节点ip> -p <root密码> --role compute
```

```bash
grctl node install  <Uid>
```

- 配置好ssh免密后

```bash
grctl node add --host compute01 --iip <计算节点ip> --key /root/.ssh/id_rsa.pub --role compute
```

```bash
grctl node install <Uid>
```

#### 8.2 手动校验

安装完成后，在当前节点执行：

```bash
grctl cluster
```

若返回集群列表中显示扩容节点且状态正常，则表示扩容成功；若返回不正常，请重新审查本节操作。