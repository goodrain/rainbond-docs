---
title: GlusterFS介绍
summary: GlusterFS介绍
toc: false
asciicast: true
---

<div id="toc"></div>


##一、 介绍
 GlusterFS是Scale-Out存储解决方案Gluster的核心，它是一个开源的分布式文件系统，具有强大的横向扩展能力，通过扩展能够支持数PB存储容量和处理数千客户端。GlusterFS借助TCP/IP或InfiniBand RDMA网络将物理分布的存储资源聚集在一起，使用单一全局命名空间来管理数据。GlusterFS基于可堆叠的用户空间设计，可为各种不同的数据负载提供优异的性能。 
 
GlusterFS支持运行在任何标准IP网络上标准应用程序的标准客户端，用户可以在全局统一的命名空间中使用NFS/CIFS等标准协议来访问应用数据。GlusterFS使得用户可摆脱原有的独立、高成本的封闭存储系统，能够利用普通廉价的存储设备来部署可集中管理、横向扩展、虚拟化的存储池，存储容量可扩展至TB/PB级。

###1.1 架构

<img src="https://static.goodrain.com/images/acp/docs/GlusterFS/GlusterFS%E6%9E%B6%E6%9E%84%E5%9B%BE.png"60%" />

###1.2 常见术语
名称|	解释
----|---|
Brick|最基本的存储单元，表示为trusted storage pool中输出的目录，供客户端挂载用
Volume|一个卷，在逻辑上由N个bricks组成
FUSE|Unix-like OS上的可动态加载的模块，允许用户不用修改内核即可创建自己的文件系统
Glusterd|Gluster management daemon，要在trusted storage pool中所有的服务器上运行
POSIX|	一个标准，GlusterFS兼容

###1.3 优势

- 1.无元数据服务设计，弹性HASH
- 2.高性能：PB级容量、GB级吞吐量、数百集群规模
- 3.用户空间模块化堆栈式设计
- 4.高可用性，支持复制和自修复
- 5.适合大文件存储

###1.4 劣势

- 1.大量小文件性能表现不佳
- 2.复制存储利用率低



##二、 与云帮对接


###2.1 GlusterFS在云帮的用途


- 通过GlusterFS实现了容器存储的持久化

- (企业版)支持块设备的挂载 （支持aws块设备、ceph的块设备）


###2.2 云帮使用的卷类型（生产环境推荐的卷类型）

####distribute replica volume 分布式复制卷

<img src="https://static.goodrain.com/images/acp/docs/GlusterFS/GlusterFS%E5%88%86%E5%B8%83%E5%BC%8F%E5%A4%8D%E5%88%B6%E5%8D%B7.png" width="80%" />

Brick server 数量是镜像数的倍数,可以在 2 个或多个节点之间复制数据。分布式的复制卷，volume 中 brick 所包含的存储服务器数必须是 replica 的倍数(>=2倍)，兼顾分布式和复制式的功能。

- 创建语法：gluster volume create [replica ] [transport tcp | rdma | tcp,rdma]
- 例子：`gluster volume create test-volume replica 2 transport tcp server1:/exp1 server2:/exp2 server3:/exp3 server4:/exp4`
 

- 更多卷类型：[详细资料](http://docs.gluster.org/en/latest/Administrator%20Guide/Setting%20Up%20Volumes/)

###2.3 云帮目录结构介绍

- 所有控制节点和计算节点都需要挂载/grdata目录

```bash
# 例如目录：
# /grdata/tenant/5dfda738ae214401bd832a9fe630a793/service/da91fa02f650ea5ac115884fac68fa4e/

## 应用持久化目录
/grdata/tenant

## 团队名唯一标示
5dfda738ae214401bd832a9fe630a793

## 应用标示目录
service

## 应用名唯一标示
da91fa02f650ea5ac115884fac68fa4e
```

