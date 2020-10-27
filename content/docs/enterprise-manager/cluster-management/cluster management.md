---
title: 集群管理
description: Rainbond集群概念讲解和集群对接说明
weight: 2002
---

集群管理功能适用范围为Rainbond公有云及企业版用户

### 什么是Rainbond集群

Rainbond运行的所有服务组件其本质都是运行在Rainbond集群中，Rainbond集群为运行在平台上的组件提供了计算资源，关于Rainbond集群的安装及扩容参考 [集群管理](/docs/user-operations/install/)。

在Rainbond公有云中，可对接已安装的Kubernetes集群，也可在注册企业后通过 `阿里云ACK` 自助安装集群。


### 企业注册

在添加集群之前需要首先注册企业，以下为注册企业流程

企业注册地址：https://cloud.goodrain.com/enterprise-server/registered

- 填写相关信息，登录地址即企业注册完成后应用控制台的登录地址

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/cluster-management/cluster-management/enterprise%20registration.png" title="企业注册" width="100%">}} 

- 注册成功

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/cluster-management/cluster-management/registration%20complete.png" title="注册成功" width="100%">}} 

注册成功即可通过浏览器输入 `访问地址` 进入应用控制台页面，默认用户为 `admin` 用户，密码为自定义填写的 `登陆密码`。

### 添加集群

推荐在Rainbond技术人员指导下添加集群。

在Rainbond公有云中，企业注册完成以后即可添加集群，添加集群有以下几种方式：

1. 无Kubernetes集群，需要首先安装Kubernetes集群及Rainbond后才能添加集群 ，推荐使用 [从云服务商托管Kubernetes集群添加](#从云服务商托管Kubernetes集群添加)方式自助安装集群
2. 拥有已安装完成的Kubernetes集群，但还没有安装Rainbond，请参考[从云服务商托管Kubernetes集群添加](#从云服务商托管Kubernetes集群添加)文档
3. 拥有已安装完成的Kubernetes集群及Rainbond集群，可直接对接集群，参照[对接集群](#对接集群)

> 集群管理及运维请参考[运维手册](/docs/user-operations/management/)

### 对接集群

具体对接方式如下，在已注册的企业中企业视图`集群`界面添加集群；流程如下

- 点击添加集群

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/cluster-management/cluster-management/add%20button.png" title="添加集群" width="100%">}}

- 选择导入

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/cluster-management/cluster-management/registration%20completed.png" title="选择导入" width="100%">}}

- 填写相关信息

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/cluster-management/cluster-management/add%20cluster.jpg" title="填写相关信息" width="100%">}}

> 相关配置说明：

**集群ID：** 自定义，集群添加后不可修改;

**集群名称：** 当前添加的集群名称, 自定义，添加后可修改；

**备注：** 当前集群备注信息，自定义即可；

**Region Config：**  `Region Config`文件定义了当前集群配置信息，包括集群`API地址`，`Web Socket通信地址`，`HTTP应用默认域名后缀`，`TCP应用默认访问IP`等，在添加集群时添加Region Config文件后，将会自动读取以上信息，关于`Region Config`文件获取方式，参考如下：


在Rainbond集群安装成功以后，需要 [安装grctl命令行工具](/docs/user-operations/tools/grctl/)，安装以后执行`grctl config`命令，将命令的输出完整复制到此处的代码框中，将会自动识别，或者将内容在本地写入文件格式为`yml`或`yaml`格式文件，在添加集群界面点击`上传Region Config文件`，上传文件即可。

到此集群添加成功，即可在集群界面看到已添加的集群，在企业视图总览界面查看该集群的资源，并使用该集群资源构建应用组件。

<!-- **添加集群后需要为`websocket`绑定https证书，具体添加请参考 [添加Websocket证书](/docs/user-operations/management/wss/)** -->

### 从云服务商托管Kubernetes集群添加

目前支持使用`阿里云ACK`自助添加，将逐步支持使用`Amazon EKS，华为云 CCE，腾讯云 EKS`等方式添加。

在安装过程中会创建相关阿里云资源，故需要提供完整的`AccessKey`及`Secret Key`权限，获取方式请参考 [阿里云官方文档](https://help.aliyun.com/document_detail/154851.html?spm=5176.2020520101.0.0.5a454df5FMWZNS)。

**具体创建的资源类型及添加方式详细说明请参考添加集群时的操作说明。**

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/cluster-management/cluster-management/ali%20cloud%20ack.png" title="对接云服务商" width="100%">}}


添加时分为以下两种情况：

1. 已有Kubernetes集群，还没有安装Rainbond；
2. 从零开始安装Kubernetes集群及Rainbond。

分别描述两种情况的使用方式

第一种

在安装时会自动读取云服务商已拥有的Kubernetes集群，在第二步选择已有的Kubernetes集群即可

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/cluster-management/cluster-management/select%20cluster.png" title="选择已有kubernetes" width="100%">}}

第二种 

按照操作说明添加即可

<!-- **添加集群后需要为`websocket`绑定https证书，具体添加请参考[添加Websocket证书](/docs/user-operations/management/wss/)** -->

### 如何使用该集群

在 [创建团队](/docs/enterprise-manager/enterprise/teams/create-team/) 时选择该集群，创建属于该集群的团队，自此在该团队下创建组件时将会使用该集群的资源。

{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/enterprise/cluster-management/cluster-management/Create%20team.png" title="选择已有kubernetes" width="100%">}}

### 进阶场景

在公有云环境中，支持多集群、多团队共用共享库，最终达成的效果是在不同集群中发布的应用，在其他集群可直接从共享库一键安装使用，其前提条件是两个集群需要使用相同的镜像仓库，包括 `地址、命名空间、用户名、密码`。



