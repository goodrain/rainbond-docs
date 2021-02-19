---
title: 集群添加
description: 该章节文档介绍Rainbond添加集群相关操作。
weight: 102
---

企业管理员具有添加集群的权限。集群添加大致分为 2 步：

1、是安装 Kubernetes 集群。

2、是在 Kubernetes 集群之上初始化 Rainbond 集群 Region 服务，然后对接到控制台管理。

![image-20210219131838603](https://static.goodrain.com/images/5.3/add-cluster-index.png)

如上图所示，在企业视图集群页面下点击添加集群进入 Rainbond 集群添加页面。

![](https://static.goodrain.com/images/5.3/add-cluster.png)

### Kubernetes 集群的准备

#### 从裸机开始安装

Rainbond 采用 RKE 集群安装方案进行 Kubernetes 集群的自动化安装。用户选择`从主机开始安装`进入该类型的集群列表页面，若第一次安装则自动弹出配置窗口。

![image-20210219132826379](https://static.goodrain.com/images/5.3/rke-cluster-config.png)

在配置页面中填写集群名称和规划节点属性。集群名称需要保持唯一。节点属性根据需要进行设定，所有节点属性必需包括 `ETCD` `管理` `计算`，其中`ETCD`必须是奇数。节点的 IP 地址是指可以通过控制台所在主机访问的地址，内网 IP 地址是节点间服务通信的地址。SSH 端口根据节点的真实端口进行设定，默认为`22`。

> 通过主机安装的集群安装完成后可以继续增加节点，因此初次体验时不一定需要准备完全部节点。可以后期根据需要扩容`ETCD` `管理`和`计算`节点。

节点规划完成后需要根据配置页面的提示在所有节点运行节点初始化命令，该命令主要完成操作系统检查、免密登录配置、Docker 服务的检测和安装、相关系统工具的安装。

节点准备就绪后点击`开始安装`按钮，进入 Kubernetes 集群的安装流程。

> 请注意，安装过程中控制台不能关闭，否则将导致安装进入不可继续状态。

![image-20210219133807675](https://static.goodrain.com/images/5.3/rke-cluster-install.png)

如上图所示代表集群正在安装过程中。如果你希望查看更详细的日志，可以关闭该窗口，点击集群列表中的`查看日志`功能选项。将查询出集群安装日志。如果出现异常情况，请根据日志提示进行相关的节点相关的调整后`重新安装`即可。

集群安装成功后集群将是运行中状态。运行状态的集群支持查询 Kubeconfig、节点扩容、删除等操作。该状态即可进入下一步[集群初始化](#rainbond-集群的初始化)

![image-20210219134301992](https://static.goodrain.com/images/5.3/rke-cluster-list.png)

#### 接入 Kubernetes 集群

#### 使用阿里云 ACK 集群

### Rainbond 集群的初始化
