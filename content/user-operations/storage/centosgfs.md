---
title: "CentOS对接GlusterFS"
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 1402
description: 存储对接GlusterFS
hidden: true
---



存储节点部署示例环境，仅供参考

| 主机名     | IP         | 系统                    |
| :------- | :----------- | :----------------------- |
|gfs01 |10.10.10.13|CentOS 7.4.1708|
|gfs02 |10.10.10.14|CentOS 7.4.1708|

### 一、GlusterFS的安装


#### 1.1 格式化磁盘、创建目录并挂载

```
# 查看可用磁盘
fdisk -l
# 分区并格式化
mkfs.xfs  /dev/vdb1
mkdir  -p /data
echo "/dev/vdb1  /data  xfs  defaults 1 2" >>/etc/fstab
# 挂载
mount -a
```

存储节点都需要执行如上操作。

```
# 确定/data挂载
df -h | grep data
```

#### 1.3 安装启动glusterfs服务

```bash
yum -y install centos-release-gluster 
yum -y install glusterfs-server 
systemctl start glusterd.service
systemctl enable glusterd.service
systemctl status glusterd.service
```

#### 1.4 配置信任池

仅在其中1个节点执行操作即可

```bash
[root@gfs01 ~]# gluster peer probe 10.10.10.14
peer probe: success.
```

在gfs02上验证

```bash
[root@gfs02 ~]# gluster peer status
Number of Peers: 1

Hostname: 10.10.10.13
Uuid: f88992e2-4a3f-4cbd-b79b-a5b7e28881dd
State: Peer in Cluster (Connected)
```

#### 1.5 创建卷

```bash
# 存储节点都需执行  
mkdir  -p /data/glusterfs

# 在第一个节点执行创建卷操作
gluster volume create data replica 2 10.10.10.14:/data/glusterfs 10.10.10.13:/data/glusterfs

Replica 2 volumes are prone to split-brain. Use Arbiter or Replica 3 to avoid this. See: http://docs.gluster.org/en/latest/Administrator%20Guide/Split%20brain%20and%20ways%20to%20deal%20with%20it/.
Do you still want to continue?
 (y/n) y
volume create: data: success: please start the volume to access data

# 在gfs02 查看卷信息
[root@gfs02 ~]# gluster volume info

Volume Name: data
Type: Replicate
Volume ID: 1c27e490-af0c-4794-af45-60e960c6eb47
Status: Created
Snapshot Count: 0
Number of Bricks: 1 x 2 = 2
Transport-type: tcp
Bricks:
Brick1: 10.10.10.14:/data/glusterfs
Brick2: 10.10.10.13:/data/glusterfs
Options Reconfigured:
transport.address-family: inet
nfs.disable: on
performance.client-io-threads: off

# 启动卷
gluster volume start data
```

#### 1.6 简单挂载测试

```
# 挂载
[root@gfs01 ~]# mount -t glusterfs 10.10.10.14:/data /mnt
[root@gfs02 ~]# mount -t glusterfs 10.10.10.13:/data /mnt

# gfs02 写文件
touch /mnt/{1..10}.txt

# gfs01 验证是否生成{1..10}.txt
ls /mnt/ | wc -l
```

> 到此完成GlusterFS的部署

### 二、GlusterFS存储迁移

如果是已经安装好集群想切换到GlusterFS上,请参考如下流程:

```
1. 先切换计算节点，后切换管理节点
2. 计算节点将默认的nfs存储摘掉，编辑fstab文件，切换到GlusterFS,重新挂载
3. 管理节点需要先停服务
systemctl stop node
systemctl stop rbd-repo
systemctl stop rbd-hub
systemctl stop rbd-app-ui
systemctl stop rbd-gateway

systemctl stop rbd-eventlog
systemctl stop rbd-worker
systemctl stop rbd-chaos
systemctl stop rbd-api
cclear
4. 确定服务都停了之后,第一个管理节点操作
mv /grdata /backup
5. 编辑/etc/fstab
mkdir /grdata
mount -a 
6. 同步数据
rsync -azvt /backup/* /grdata/
7. 其他管理节点，修改/etc/fstab重新挂载/grdata(如果有)
8. 迁移完成确定集群状态: grctl cluster
9. 第一个管理节点关闭nfs服务
systemctl stop nfs-server
systemctl disable nfs-server
```

### 三、通过ansible安装GlusterFS


```
# 下载源码
git clone https://github.com/goodrain/rainbond-glusterfs.git
cd rainbond-glusterfs
# 编辑 inventory/hosts 文件
all下为所有节点信息
gfscluster下为gfscluster server端(存储节点)
rainbondcluster下为gfscluster client端(即管理节点，计算节点)
# 执行安装
./setup.sh
```

> 需要注意disk_volume_device_1值为实际GlusterFS存储使用的磁盘(fdisk -l)