---
title: "对接阿里云NAS"
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 1403
description: 存储对接阿里云NAS
hidden: true
---

阿里云文件存储（Network Attached Storage，简称 NAS）是面向阿里云 ECS 实例、HPC 和 Docker 等节点的文件存储服务，提供标准的文件访问协议，即可使用具备无限容量及性能扩展、单一命名空间、多共享、高可靠和高可用等特性的分布式文件系统。

本文默认已创建了文件系统，如果未创建，请参考[阿里云NAS文档](https://help.aliyun.com/document_detail/27526.html)

#### 快速配置指南

提前准备好NAS，安装时指定存储类型为`nas`,具体示例如下：

```
./grctl init --storage nas --storage-args "82b554a292-rvg38.cn-huhehaote.nas.aliyuncs.com:/ /grdata nfs vers=3,nolock,noatime 0 0"
```

#### 手动对接NAS

##### 安装配置NFS客户端程序

```bash
# Debian/Ubuntu
apt-get update
apt-get install nfs-common
# CentOS
yum install nfs-utils
```

##### 配置NFS请求数量

```
cat /proc/sys/sunrpc/tcp_slot_table_entries
```


Linux NFS 客户端对于同时发起的NFS请求数量进行了控制，若该参数配置较小，会降低 IO 性能。默认编译的内核中该参数最大值为256。您可以使用root用户执行以下命令来提高该参数的值，取得较好的性能。


```
echo "options sunrpc tcp_slot_table_entries=128" >> /etc/modprobe.d/sunrpc.conf
echo "options sunrpc tcp_max_slot_table_entries=128" >>  /etc/modprobe.d/sunrpc.conf
sysctl -w sunrpc.tcp_slot_table_entries=128
```

参数修改完成后，请重启系统。

##### 节点挂载NFS文件系统

> 推荐使用NFS v3协议

```bash
mkdir /grdata
# 编辑/etc/fstab
file-system-id-xxxx.region.nas.aliyuncs.com:/  /grdata  nfs vers=3,nolock,noatime,proto=tcp,rsize=1048576,wsize=1048576,hard,timeo=600,retrans=2,noresvport   0 0
# 挂载
mount -a
# 查看挂载
mount -l
```

##### 其他说明注意事项

- 如果安装前所有节点挂载/grdata,则默认会跳过存储操作

- 如果安装后切换/grdata存储操作

```
# 计算节点
umout /grdata
# 修改/etc/fstab部分，由NFS调整为阿里云NAS，重新挂载
# 多管理节点，所有节点都需要停服务
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
# 确定服务都停了之后,第一个管理节点操作
mv /grdata /backup
# 编辑/etc/fstab
mkdir /grdata
mount -a 
# 同步数据
cp -a /backup/. /grdata/
# 其他管理节点，修改/etc/fstab重新挂载/grdata
```

迁移完成确定集群状态: `grctl cluster`