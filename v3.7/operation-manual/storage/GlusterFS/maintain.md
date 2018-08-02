---
title: GlusterFS维护
summary: GlusterFS维护
toc: false
asciicast: true
---

<div id="toc"></div>


##一、 GlusterFS卷维护

###1.1 GlusterFS的常用操作
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

###1.2 扩容卷

#### 先添主机到主机池中

```
gluster peer  probe server3
gluster peer  probe server4
```
#### 创建目录

在server3和server4上创建目录   

`mkdir /data/glusterfs -p`

#### 扩容节点并增加复制份数

- data是卷名

```
 gluster volume add-brick data replica 2 server3:/data/glusterfs server4:/data/glusterfs
```


#### 查看
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

###1.3 收缩节点

#### 执行缩卷命令

- data是卷名

```
gluster volume remove-brick  data server3:/data/glusterfs server4:/data/glusterfs start
```

#### 查看迁移状态

```
[root@server1 ~]# gluster volume remove-brick data server3:/data/glusterfs server4:/data/glusterfs  status
                                    Node Rebalanced-files          size       scanned      failures       skipped               status  run time in h:m:s
                               ---------      -----------   -----------   -----------   -----------   -----------         ------------     --------------
                                 server3                0        0Bytes             0             0             0            completed        0:00:00
                                 server4                0        0Bytes             0             0             0            completed        0:00:00
                                 
```                                 

- 当status状态显示`completed`时就表示好了   

#### 提交

```
gluster volume remove-brick data server3:/data/glusterfs server4:/data/glusterfs  commit
``` 
#### 查看状态
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
###1.4 GlusterFS目录迁移

#### 创建迁移目录

`mkdir  /data/backup -p`

#### 迁移

`gluster volume replace-brick data server1:/data/glusterfs server1:/data/backup commit force`

#### 查看结果

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

##二、 GlusterFS常用的优化

###2.1 GlusterFS常用优化参数
 
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


