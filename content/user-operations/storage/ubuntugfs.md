---
title: "Ubuntu对接GlusterFS"
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 1402
description: 存储对接GlusterFS
hidden: true
---



存储节点部署示例环境，仅供参考

| 主机名     | IP         | 系统                    |
| :------- | :----------- | :----------------------- |
|gfs01 |10.10.10.13|Ubuntu 16.04.3 LTS|
|gfs02 |10.10.10.14|Ubuntu 16.04.3 LTS|

### 一、GlusterFS的安装

#### 1.1 存储节点配置hostname解析

**所有节点都需要配置存储节点hostname解析**

```
# gfs01节点更新hostname
hostname gfs01
echo "gfs01" > /etc/hostname
# gfs02节点更新hostname
hostname gfs02
echo "gfs02" > /etc/hostname
# gfs01/gfs02配置hosts解析
[root@gfs01 ~]# cat /etc/hosts
10.10.10.13 gfs02
10.10.10.14 gfs01
```

配置完成后确定存储节点可以正常ping通gfs01和gfs02

#### 1.2 格式化磁盘、创建目录并挂载

```
# 查看可用磁盘
fdisk -l
# 分区并格式化
mkfs.xfs  /dev/vdb
mkdir  -p /data
echo "/dev/vdb1  /data  xfs  defaults 1 2" >>/etc/fstab
# 挂载
mount -a
```

gfs01和gfs02节点都需要执行如上操作。

```
# 确定/data挂载
df -h | grep data
```

#### 1.3 安装启动glusterfs服务

```bash
apt-get -y install glusterfs-server
systemctl start glusterfs-server
systemctl enable glusterfs-server
systemctl status glusterfs-server
```

#### 1.4 配置信任池

仅在其中1个节点执行操作即可

```bash
[root@gfs01 ~]# gluster peer probe gfs02
peer probe: success.
```

在gfs02上验证

```bash
[root@gfs02 ~]# gluster peer status
Number of Peers: 1

Hostname: gfs01
Uuid: ba10c6e2-2266-40a4-aaa2-0d26ea2d8786
State: Peer in Cluster (Connected)
```

#### 1.5 创建卷

```bash
# 节点gfs01,gfs02都需执行  
mkdir  -p /data/glusterfs

# 在gfs01执行创建卷操作
[root@gfs01 ~]# gluster volume create data replica 2 gfs02:/data/glusterfs gfs01:/data/glusterfs

volume create: data: success: please start the volume to access data

# 在gfs02 查看卷信息
[root@gfs02 ~]# gluster volume info
Volume Name: data
Type: Replicate
Volume ID: 25ba3181-6a7e-412f-98b3-2f3aa317281c
Status: Created
Number of Bricks: 1 x 2 = 2
Transport-type: tcp
Bricks:
Brick1: gfs02:/data/glusterfs
Brick2: gfs01:/data/glusterfs
Options Reconfigured:
performance.readdir-ahead: on

# 启动卷
[root@gfs02 ~]# gluster volume start data
volume start: data: success
```

#### 1.6 简单挂载测试

```
# 挂载
[root@gfs01 ~]# mount -t glusterfs gfs02:/data /mnt
[root@gfs02 ~]# mount -t glusterfs gfs01:/data /mnt

# gfs02 写文件
touch /mnt/{1..10}.txt

# gfs01 验证是否生成{1..10}.txt
ls /mnt/ | wc -l
```

### 二、 对接存储GlusterFS

**此步骤应该在执行安装前操作，避免安装完成后切换存储不正确导致集群不可用，下述步骤集群所属节点都需要执行。**

#### 2.1 所有节点配置存储节点hostname解析

所有节点(管理，计算，网关)都更新配置hosts文件

```bash
10.10.10.13 gfs01
10.10.10.14 gfs02
```

> 验证方式： 任意集群中节点都可以正常ping通gfs01和gfs02

#### 2.2 安装GlusterFS客户端程序

```bash
apt-get install glusterfs-server -y

```

#### 2.3 挂载GlusterFS数据卷

```
# 创建挂载点
mkdir /grdata
# 开机挂载,将以下配置写入/etc/fstab
gfs01:/data /grdata glusterfs   backupvolfile-server=gfs02,use-readdirp=no,log-level=WARNING,log-file=/var/log/gluster.log 0 0
# 挂载
mount -a
# 验证,应该存有安装时的验证文件
ls /grdata/
rm -rf /grdata/*.txt
```

#### 2.4 其他事项说明

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
cp -a /backup/. /grdata/
7. 其他管理节点，修改/etc/fstab重新挂载/grdata(如果有)
8. 迁移完成确定集群状态: grctl cluster
9. 第一个管理节点关闭nfs服务
systemctl stop nfs-server
systemctl disable nfs-server
```

### 三、 通过ansible安装GlusterFS


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