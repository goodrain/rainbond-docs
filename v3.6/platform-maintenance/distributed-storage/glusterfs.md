---
title: GlusterFS维护
summary: 分布式存储GlusterFS的维护
toc: false
asciicast: true
---

<div id="toc"></div>

## GlusterFS介绍
 GlusterFS是Scale-Out存储解决方案Gluster的核心，它是一个开源的分布式文件系统，具有强大的横向扩展能力，通过扩展能够支持数PB存储容量和处理数千客户端。GlusterFS借助TCP/IP或InfiniBand RDMA网络将物理分布的存储资源聚集在一起，使用单一全局命名空间来管理数据。GlusterFS基于可堆叠的用户空间设计，可为各种不同的数据负载提供优异的性能。 
 
GlusterFS支持运行在任何标准IP网络上标准应用程序的标准客户端，用户可以在全局统一的命名空间中使用NFS/CIFS等标准协议来访问应用数据。GlusterFS使得用户可摆脱原有的独立、高成本的封闭存储系统，能够利用普通廉价的存储设备来部署可集中管理、横向扩展、虚拟化的存储池，存储容量可扩展至TB/PB级。

### GlusterFS 架构

<img src="https://www.ibm.com/developerworks/cn/opensource/os-cn-glusterfs-docker-volume/image001.png"width="80%" />

### GlusterFS 常见术语
名称|	解释
----|---|
Brick|最基本的存储单元，表示为trusted storage pool中输出的目录，供客户端挂载用
Volume|一个卷，在逻辑上由N个bricks组成
FUSE|Unix-like OS上的可动态加载的模块，允许用户不用修改内核即可创建自己的文件系统
Glusterd|Gluster management daemon，要在trusted storage pool中所有的服务器上运行
POSIX|	一个标准，GlusterFS兼容

### GlusterFS 优势

- 1.无元数据服务设计，弹性HASH
- 2.高性能：PB级容量、GB级吞吐量、数百集群规模
- 3.用户空间模块化堆栈式设计
- 4.高可用性，支持复制和自修复
- 5.适合大文件存储

### GlusterFS 劣势

- 1.小文件性能表现差
- 2.系统OPS表现差
- 3.复制存储利用率低



## 与云帮对接


###云帮GlusterFS总体架构

<img src="http://hi.csdn.net/attachment/201103/25/44164_1301048808y1RY.png" width="80%" />


###GlusterFS在云帮的用途


- 通过GlusterFS实现了容器存储的持久化

- (企业版)支持块设备的挂载 （支持aws块设备、ceph的块设备）


###云帮使用的卷类型（生产环境推荐的卷类型）

####distribute replica volume 分布式复制卷

<img src="https://cloud.githubusercontent.com/assets/10970993/7412402/23a17eae-ef60-11e4-8813-a40a2384c5c2.png" width="80%" />

Brick server 数量是镜像数的倍数,可以在 2 个或多个节点之间复制数据。分布式的复制卷，volume 中 brick 所包含的存储服务器数必须是 replica 的倍数(>=2倍)，兼顾分布式和复制式的功能。

- 创建语法：gluster volume create [replica ] [transport tcp | rdma | tcp,rdma]
- 例子：`gluster volume create test-volume replica 2 transport tcp server1:/exp1 server2:/exp2 server3:/exp3 server4:/exp4`
 

- 更多卷类型：[详细资料](http://docs.gluster.org/en/latest/Administrator%20Guide/Setting%20Up%20Volumes/)

###云帮目录结构介绍

- 所有控制节点和计算节点都需要挂载/grdata目录

```
例如:/grdata/tenant/5dfda738ae214401bd832a9fe630a793/service/da91fa02f650ea5ac115884fac68fa4e/

/grdata/tenant
##存放所有用户的目录

5dfda738ae214401bd832a9fe630a793
##表示一个用户

service
##所有服务存放的目录

da91fa02f650ea5ac115884fac68fa4e
##表示一个服务
```



##GlusterFS的安装与测试

- 以下为示例环境

###1.部署环境

系统 | CentOS 7.3| 
----|------|----
glusterfs版本| 3.12.1 
主机名 | IP  | 
server1 |10.81.29.87   
server2 |10.81.9.115

####hosts解析
```
[root@server1 ~]# cat /etc/hosts
127.0.0.1 localhost
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
10.81.29.87 server1
10.81.9.115 server2
```
####格式化磁盘、创建目录并挂载
```
mkfs.xfs  /dev/vdb
mkdir  -p /data
echo "/dev/vdb  /data  xfs  defaults 1 2" >>/etc/fstab
mount -a
```
####查看
```
[root@server1 ~]# df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/vda1        40G  1.9G   36G   5% /
devtmpfs        1.9G     0  1.9G   0% /dev
tmpfs           1.9G     0  1.9G   0% /dev/shm
tmpfs           1.9G  332K  1.9G   1% /run
tmpfs           1.9G     0  1.9G   0% /sys/fs/cgroup
tmpfs           380M     0  380M   0% /run/user/0
/dev/vdb         20G   33M   20G   1% /data
```
```
[root@server2 ~]# df -h
Filesystem      Size  Used Avail Use% Mounted on
/dev/vda1        40G  1.9G   36G   5% /
devtmpfs        1.9G     0  1.9G   0% /dev
tmpfs           1.9G     0  1.9G   0% /dev/shm
tmpfs           1.9G  344K  1.9G   1% /run
tmpfs           1.9G     0  1.9G   0% /sys/fs/cgroup
tmpfs           380M     0  380M   0% /run/user/0
/dev/vdb         20G   33M   20G   1% /data
```

###2.安装

```
yum install centos-release-gluster -y
yum install glusterfs-server -y
```
###3.启动GlusterFS服务

```
systemctl  start   glusterd.service
systemctl  enable  glusterd.service
systemctl  status  glusterd.service
```
###4. 配置信任池(一端添加就行)

```
[root@server1 ~]# gluster peer probe server2
peer probe: success.
[root@server1 ~]# gluster peer status
Number of Peers: 1

Hostname: server2
Uuid: be69468e-94b6-45a6-8a3d-bea86c2702dc
State: Peer in Cluster (Connected)
```

###5.创建卷

```bash
# 所有节点都需执行  
mkdir  -p /data/glusterfs

# 创建一个卷
gluster volume create data replica 2 server1:/data/
glusterfs server2:/data/glusterfs

Replica 2 volumes are prone to split-brain. Use Arbiter or Replica 3 to avoid this. See: http://docs.gluster.org/en/latest/Administrator%20Guide/Split%20brain%20and%20ways%20to%20deal%20with%20it/.
Do you still want to continue?
 (y/n) y
volume create: data: success: please start the volume to access data
```

###6.查看卷的信息


```
[root@server1 ~]# gluster volume info

Volume Name: data
Type: Replicate
Volume ID: 8c16603c-2fab-4117-8020-2310b0041b35
Status: Created
Snapshot Count: 0
Number of Bricks: 1 x 2 = 2
Transport-type: tcp
Bricks:
Brick1: server1:/data/glusterfs
Brick2: server2:/data/glusterfs
Options Reconfigured:
transport.address-family: inet
nfs.disable: on
```
####启动卷

```
[root@server1 ~]# gluster volume start data
volume start: data: success
```

###7.挂载测试

```
#server1 挂载
[root@server1 ~]# mount -t glusterfs server1:/data /mnt

#server2 挂载
[root@server2 ~]# mount -t glusterfs server2:/data /mnt

#在server2上创建文件
[root@server2 ~]# touch /mnt/{1..10}test.txt

#在server1上查看
[root@server1 ~]# ls /mnt/
10test.txt  2test.txt  4test.txt  6test.txt  8test.txt
1test.txt   3test.txt  5test.txt  7test.txt  9test.txt
```



##GlusterFS卷维护

###1.GlusterFS的常用操作
 卷的常用操作|命令|
 ----|------|
创建卷|gluster volume create |
启动卷|gluster volume start 
停止卷|gluster volume stop 
删除卷| gluster volume delete | 
添加节点| gluster peer probe |
删除节点| gluster peer detach | 
列出集群中的所有卷|gluster volume list             
查看集群中的卷信息|gluster volume info   
查看集群中的卷状态|gluster volume statu

###2.扩容卷

####1.先添主机到主机池中

```
gluster peer  probe server3
gluster peer  probe server4
```
####2.创建目录

在server3和server4上创建目录   

`mkdir /data/glusterfs -p`

####3.扩容节点并增加复制份数

- data是卷名

```
 gluster volume add-brick data replica 2 server3:/data/glusterfs server4:/data/glusterfs
```


####4.查看
```
[root@server1 ~]# gluster volume info data

Volume Name: data
Type: Distributed-Replicate
Volume ID: a99e0ecc-132d-4778-8cc8-36b9a2c04ac4
Status: Started
Snapshot Count: 0
Number of Bricks: 2 x 2 = 4
Transport-type: tcp
Bricks:
Brick1: server1:/data/glusterfs
Brick2: server2:/data/glusterfs
Brick3: server3:/data/glusterfs
Brick4: server4:/data/glusterfs
Options Reconfigured:
transport.address-family: inet
nfs.disable: on
```

###3.收缩节点

####1.执行缩卷命令

- data是卷名

```
gluster volume remove-brick  data server3:/data/glusterfs server4:/data/glusterfs start
```

####2.查看迁移状态

```
[root@server1 ~]# gluster volume remove-brick data server3:/data/glusterfs server4:/data/glusterfs  status
                                    Node Rebalanced-files          size       scanned      failures       skipped               status  run time in h:m:s
                               ---------      -----------   -----------   -----------   -----------   -----------         ------------     --------------
                                 server3                0        0Bytes             0             0             0            completed        0:00:00
                                 server4                0        0Bytes             0             0             0            completed        0:00:00
                                 
```                                 

- 当status状态显示`completed`时就表示好了   

####3.提交

```
gluster volume remove-brick data server3:/data/glusterfs server4:/data/glusterfs  commit
``` 
####4.查看状态
```
[root@server1 ~]# gluster volume info

Volume Name: data
Type: Replicate
Volume ID: a99e0ecc-132d-4778-8cc8-36b9a2c04ac4
Status: Started
Snapshot Count: 0
Number of Bricks: 1 x 2 = 2
Transport-type: tcp
Bricks:
Brick1: server1:/data/glusterfs
Brick2: server2:/data/glusterfs
Options Reconfigured:
transport.address-family: inet
nfs.disable: on
```
###4.GlusterFS目录迁移

####1 创建迁移目录

`mkdir  /data/backup -p`

####2 迁移

`gluster volume replace-brick data server1:/data/glusterfs server1:/data/backup commit force`

####3 查看结果

```
[root@server1 ~]# gluster volume  info

Volume Name: data
Type: Distributed-Replicate
Volume ID: a99e0ecc-132d-4778-8cc8-36b9a2c04ac4
Status: Started
Snapshot Count: 0
Number of Bricks: 2 x 2 = 4
Transport-type: tcp
Bricks:
Brick1: server1:/data/backup
Brick2: server2:/data/glusterfs
Brick3: server3:/data/glusterfs
Brick4: server4:/data/glusterfs
Options Reconfigured:
nfs.disable: on
transport.address-family: inet
```

##GlusterFS常用的优化

###GlusterFS常用优化参数
 
配置选项|用途 | 默认值|合法值
----|------|----|---
network.ping-timeout    | 客户端等待检查服务器是否响应的持续时间，节点挂了数据不能写入  | 42|0-42
Performance.cache-refresh-timeout| 缓存校验周期  | 1s|0-61
auth.allow | 允许访问卷的客户端ip| 
auth.reject | 拒接访问卷的客户端ip|
performance.cache-size |读取缓存的大小|32 MB
performance.write-behind-window-size |能提高写性能单个文件后写缓冲区的大小|1MB
performance.io-thread-count|IO操作的最大线程 |16|0-65

[官方参数](http://docs.gluster.org/en/latest/Administrator%20Guide/Managing%20Volumes/)

- 修改语句的命令格式 `gluster volume set <VOLNAME>`

- 例如

GlusterFS集群会有一个检测时间默认是42s，如果一个节点挂了或网络不通了，整个集群都会在这42秒内无法写入数据，所以通常会修改这个检测时间。

- 把它改成10s

```
[root@server1 ~]# gluster volume set data  network.ping-timeout 10
volume set: success
```


