---
title: GlusterFS安装
summary: GlusterFS安装
toc: false
asciicast: true
---

<div id="toc"></div>


##GlusterFS的安装

- 以下为示例环境

###部署环境

系统 | CentOS 7.3| 
----|------|----
glusterfs版本| 3.12.1 
主机名 | IP  | 
server1 |10.81.29.87   
server2 |10.81.9.115

#### hosts解析
```
[root@server1 ~]# cat /etc/hosts
127.0.0.1 localhost
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
10.81.29.87 server1
10.81.9.115 server2
```
#### 格式化磁盘、创建目录并挂载
```
mkfs.xfs  /dev/vdb
mkdir  -p /data
echo "/dev/vdb  /data  xfs  defaults 1 2" >>/etc/fstab
mount -a
```
#### 查看
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

### 安装

```
yum install centos-release-gluster -y
yum install glusterfs-server -y
```
### 启动GlusterFS服务

```
systemctl  start   glusterd.service
systemctl  enable  glusterd.service
systemctl  status  glusterd.service
```
### 配置信任池(一端添加就行)

```
[root@server1 ~]# gluster peer probe server2
peer probe: success.
[root@server1 ~]# gluster peer status
Number of Peers: 1

Hostname: server2
Uuid: be69468e-94b6-45a6-8a3d-bea86c2702dc
State: Peer in Cluster (Connected)
```

### 创建卷

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

### 查看卷的信息


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
#### 启动卷

```
[root@server1 ~]# gluster volume start data
volume start: data: success
```

### 挂载测试

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


