---
title: 集群管理
description: Rainbond集群概念讲解和集群对接说明
weight: 2002
---

集群管理功能适用范围为Rainbond公有云及企业版用户

### 什么是Rainbond集群

Rainbond运行的所有服务组件其本质都是运行在Rainbond集群中，关于Rainbond集群的安装及扩容参考[集群管理](/docs/user-operations/install/)。

在Rainbond公有云中，可对接多个集群。

### 添加集群

在Rainbond公有云中，Rainbond平台搭建完成以后即可对接集群，具体对接方式如下，在已注册的企业中企业视图`集群`界面点击添加集群，填写以下相关信息

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/cluster-management/cluster-management/add%20button.png" width="100%"/>

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/cluster-management/cluster-management/add%20cluster.jpg" width="100%"/>

> 相关配置说明：

**集群ID：** 自定义，集群添加后不可修改;

**集群名称：** 当前添加的集群名称, 自定义，添加后可修改；

**备注：** 当前集群备注信息，自定义即可；

**Region Config：**  `Region Config`文件定义了当前集群配置信息，包括集群`API地址`，`Web Socket通信地址`，`HTTP应用默认域名后缀`，`TCP应用默认访问IP`等，在添加集群时添加Region Config文件后，将会自动读取以上信息，关于`Region Config`文件获取方式，参考如下：


在Rainbond集群安装成功以后，[安装grctl命令行工具](/docs/user-operations/tools/grctl/)，安装完成以后执行`grctl config`命令，将命令的输出在本地写入文件格式为`yml`或`yaml`格式文件，在添加集群界面点击`上传Region Config文件`，上传文件即可。

到此集群添加成功，即可在集群界面看到已添加的集群，在企业视图总览界面查看该集群的资源，并使用该集群资源构建应用组件。

### 如何使用该集群

在[创建团队](/docs/user-manual/enterprise/teams/create-team/)时选择该集群，创建属于该集群的团队，自此在该团队下创建组件时将会使用该集群的资源。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/cluster-management/cluster-management/Create%20team.png" width="100%"/>

### 进阶场景

在公有云环境中，支持多集群、多团队共用共享库，最终达成的效果是在不同集群中发布的应用，在其他集群可直接从共享库一键安装使用，其前提条件是两个集群需要使用相同的镜像仓库，包括 `地址、命名空间、用户名、密码`。



