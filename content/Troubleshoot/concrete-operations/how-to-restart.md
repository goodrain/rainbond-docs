---
title: 重启策略
weight: 30011
Description: "当docker服务乃至整个集群服务器需要重启时，所要遵循的策略"
hidden: true
---

### docker服务重启策略

当我们遇到问题，需要通过重启docker服务来解决的时候，请遵循如下规则。

#### 管理节点docker重启策略

管理节点在集群中的地位特殊，生产环境中，务必安装高可用架构。否则，docker服务一旦重启，将不可避免的导致集群管理功能中断。

如果确定需要重启，则执行如下操作：

```bash
systemctl stop node 
systemctl stop rbd*
systemctl stop kube*
systemctl stop calico 
systemctl stop etcd
systemctl restart docker
systemctl start node
```

#### 计算节点docker重启策略

计算节点重启docker服务前，应先将运行在其上的实例迁移，再执行重启操作。

```bash
# 管理节点执行以下命令，云上实例会自动迁移，等待迁移完毕后继续
grctl node down <指定计算节点Uid>

# 计算节点执行
systemctl restart docker

# 重启完毕后，在管理节点重新上线这个节点
grctl node up <指定计算节点Uid>
```

#### 网关节点docker服务可以直接重启

直接执行：

```bash
systemctl restart docker
```

### 集群服务器重启策略

#### 优雅重启策略

{{% notice note %}}

当Rainbond集群采用了[高可用安装方式](/user-operations/install/install-base-ha/)时，整个集群可以按照如下顺序优雅重启。

{{% /notice %}}

##### 重启前准备

如果业务允许中断，请先关闭平台上运行中的所有组件。
如果业务不允许中断，需要注意的是：

- 多实例无状态组件，有状态集群版多实例组件在集群重启过程中服务不会中断
- 单实例组件会在短暂业务中断后自动迁移

##### 存储节点优雅重启

此时集群存储节点应为分布式多节点部署，重启策略如下：

- 观察集群所有节点当前挂载信息，确认当前被挂载存储节点
- 逐个重启**非**当前被挂载存储节点。确保每次重启后，被重启的存储节点恢复正常，再重启下一个节点
- 最后重启**当前被挂载存储节点**

##### 管理节点优雅重启

此时集群管理节点应以 3.5.7··· 等奇数数量部署，重启策略如下：

- 查询当前etcd集群leader节点 `etcdctl member list`，下面示例中，leader节点为 `192.168.195.1`:

```bash 
1cd2685eb4460830: name=etcd1 peerURLs=http://192.168.195.1:2380 clientURLs=http://192.168.195.1:2379,http://192.168.195.1:4001 isLeader=true
1cd2685e123450830: name=etcd2 peerURLs=http://192.168.195.2:2380 clientURLs=http://192.168.195.2:2379,http://192.168.195.2:4001 isLeader=false
13412385eb4460830: name=etcd3 peerURLs=http://192.168.195.3:2380 clientURLs=http://192.168.195.3:2379,http://192.168.195.3:4001 isLeader=false
```

- 逐个重启**非**etcd leader属性的管理节点。确保每次重启后，被重启的管理节点恢复正常，再重启下一个节点
- 最后重启**etcd leader属性的管理节点**

##### 计算节点优雅重启

此时集群计算节点应为分布式多节点部署，重启策略如下：

- 计算节点应逐个重启
- 在管理节点下线即将被重启的计算节点 `grctl node down <计算节点Uid> `
- 在即将被重启的计算节点观察所剩容器实例 `dps`  直至仅剩余 `rbd-dns calico etcd-proxy` 三个容器
- 重启计算节点
- 确认启动后的计算节点服务正常 (上述三个容器运行中)
- 在管理节点上线计算节点 `grctl node up <计算节点Uid>`
- 重启下个计算节点，重复上述操作

##### 网关节点优雅重启

此时集群网关节点应为分布式多节点部署，重启策略如下：

- 网关节点应逐个重启
- 确认节点重启后运行正常，容器 `rbd-gateway etcd-proxy calico` 运行中
- 重启下个网关节点

#### 节点复用情况下重启策略


{{% notice note %}}

当Rainbond集群采用了节点复用的方式部署时，重启策略以 **存储节点优雅重启** 判断标准优先。

{{% /notice %}}

#### 机房断电重启策略

某些环境下（比如机房断电），Rainbond集群所有服务器集体重启，这个流程需要注意的点如下：

- 启动顺序为： 存储节点优先重启，启动后其他节点启动顺序随意
    - 如果没有存储节点，使用了默认提供的NFS，则先启动首个管理节点，然后启动其他节点
- 时间同步： 服务器启动后，需确认所有节点之间时间同步