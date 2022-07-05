<!-- ---
title: "高可用安装Rainbond集群"
description: "高可用安装Rainbond集群"
---


本文描述如何部署高可用的 Rainbond 集群，适用于生产环境。

### 前提条件

- 根据 [软件和硬件环境要求](../user-operations/deploy/ha-deployment/resource-prepare/) 准备相关资源； 
- 如果您使用 CentOS 7.* 操作系统，请务必提前 [升级内核版本](https://t.goodrain.com/t/topic/1305)；
- 确保服务器 `80、443、6060、6443、7070、8443` 端口能够访问；
- 服务器需配置静态IP；
- 确定系统时间与时区(Asia/Shanghai)同步,节点间时间同步；
- 多节点时，机器间网络访问没有限制；
- 服务器能够正常连接互联网，安装过程将从互联网下载所需资源；
- 高可用的外部数据库，如 MySQL 8.0 数据库集群 或 RDS 数据库服务，需提前创建 `console`、`region` 两个数据库，数据库字符编码为`utf8mb4`。



### 一. 服务器配置

本文使用了高可用安装所需的最小服务器数量，将角色属性进行复用，以搭建一个高可用性的Rainbond集群。

集群架构如图：

![avatar](https://static.goodrain.com/docs/5.4/user-operations/install/ha-deployment/ha-installation/architecture.png)


### 二. 部署Docker

在已准备的所有服务器上执行安装Docker操作：

```bash
curl sh.rainbond.com/install_docker | bash
```

### 三. 部署MySQL数据库

Rainbond需要使用MySQL存储控制台及集群端数据，若用户已有高可用数据库则可直接使用，需满足以下条件：

- 数据库版本为`MySQL5.7/8.0`；
- 提前创建 `console`、`region` 库；
- 数据库字符编码为`utf8mb4`；
- 推荐数据库与Rainbond集群**网络**在同一内网范围内。


若还没有高可用数据库可根据[参考文档](../user-operations/install-extension/mysql-ha/)部署MySQL主从复制。

### 四. 部署 Rainbond 控制台

#### 启动 All-In-One 控制台

```bash
docker run -d -p 7070:7070  \
--name=rainbond-allinone --restart=always \
-v ~/.ssh:/root/.ssh \
-v ~/rainbonddata:/app/data \
-e DB_TYPE=mysql \
-e MYSQL_DB=console \
-e MYSQL_PORT=3306 \
-e MYSQL_HOST=** \
-e MYSQL_USER=** \
-e MYSQL_PASS=** \
registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.7.1-release-allinone
```

`备注：`

- 请将 **数据库连接信息** 替换为自己的实际连接信息；
- 控制台将产生**持久化数据**，存储于您部署节点的 `~/rainbonddata` 目录中；
- 当前版本支持控制台**数据迁移**，最终部署完成后需将控制台迁移至平台上部署以确保高可用性。

待容器启动成功后，稍等片刻即可在浏览器中访问服务器 `7070` 端口，打开 Rainbond 控制台 **注册页面**。


<image src="https://static.goodrain.com/images/5.3/regist.png" title="控制台注册页面" width="100%"/>

到此，恭喜您已经完成了第一步，你还需要继续完成集群的部署。
 


### 五. 部署Kubernetes


1.在左侧导航栏选择 **集群->添加集群->从主机开始安装**，填写相关信息

- 当前使用的为阿里云服务器，拥有外网IP，在私有部署时服务器没有外网IP的情况下 IP地址和内网IP地址 **统一填写服务器IP地址** 即可；
- 当前演示集群为3个节点，Kubernetes属性 ETCD、管理、计算属性 复用，在自行部署时**根据自身规划**选择节点属性即可。

<image src="https://static.goodrain.com/docs/5.4/user-operations/install/ha-deployment/ha-installation/add-host.png" title="控制台注册页面" width="100%"/>


2.节点信息填写完毕后，根据页面提示复制节点初始化命令在集群内所有服务器上执行

<image src="https://static.goodrain.com/docs/5.4/user-operations/install/ha-deployment/ha-installation/init.jpg" title="节点初始化" width="100%"/>


3.初始化完成后，点击 **下一步**，等待 Kubernetes 集群安装成功即可，待状态为 **运行中** 状态时进行下一步操作

<image src="https://static.goodrain.com/docs/5.4/user-operations/install/ha-deployment/ha-installation/installed-successfully.png" title="Kubernetes集群状态" width="100%"/>


4.安装`kubectl`命令。

后续操作过程中需要使用`kubectl`命令创建高可用存储等资源，请参考文档[kubectl命令行工具](../user-operations/tools/kubectl/)安装命令。


### 六. 对接存储

Rainbond支持多种共享存储解决方案，请根据如下场景进行选择：

- GlusterFS：

基于用户自备的服务器或虚拟机部署Rainbond的情况下，推荐自行部署GlusterFS作为共享存储解决方案。

部署请参考文档 [GlusterFS分布式存储](../user-operations/storage/deploy-glusterfs/) 。

-  其它兼容NFS协议的共享存储

如果用户拥有可使用的其他兼容NFS协议的共享存储，例如阿里云NAS存储，NFS存储(高可用环境不推荐)，Rainbond也可对接使用。

具体请参考文档  [对接阿里云NAS](../user-operations/cluster-manage/init-region-storage/#对接阿里云NAS) 。


### 七. 准备 负载均衡 或 Keepalived 

Rainbond网关节点需要 VIP 或 负载均衡 保证高可用性。

- 负载均衡

若已有负载均衡则可直接使用负载均衡服务，负载均衡服务需要代理网关节点的`80、443、6060、6443、7070、8443` 端口；然后在后续操作步骤 **自定义集群初始化参数** 时填写负载均衡地址即可。

- Keepalived

若还没有负载均衡服务则可通过在网关节点部署Keepalived服务来确保网关的高可用性，通过该种方式网关节点为主备关系， Keepalived部署请参考：

[CentOS keepalived配置](../user-operations/install-extension/centos_keepalived/) 或 [Ubuntu keepalived配置](../user-operations/install-extension/ubuntu_keepalived/)。

### 八. 部署Rainbond

外部数据库和GlusterFS存储就绪后，回到控制台继续Rainbond安装流程

1.创建ETCD的`secret`证书文件

- Rainbond集群需要使用ETCD用来存储集群的元数据信息，集群状态和网络配置，通常情况下复用Kubernetes集群ETCD即可；
- ETCD对磁盘性能要求较高，所以请务必按照 [软件和硬件环境要求](../user-operations/deploy/ha-deployment/resource-prepare/) 准备相关资源，以免后续使用过程中出现不稳定情况；如果ETCD节点与其他属性节点复用，强烈建议存储使用SSD磁盘；
- 采用默认方式安装的 Kubernetes 集群，ETCD证书文件位于`/etc/kubernetes/ssl` 目录下，分别为`kube-ca.pem、kube-node.pen、kube-node-key.pem`；使用以下命令创建secret，方便在Rainbond安装时直接使用:

```bash
$ kubectl create ns rbd-system
$ kubectl create secret generic rbd-etcd-secret -n rbd-system \
--from-file=ca-file=/etc/kubernetes/ssl/kube-ca.pem \
--from-file=cert-file=/etc/kubernetes/ssl/kube-node.pem \
--from-file=key-file=/etc/kubernetes/ssl/kube-node-key.pem
```
      
2.初始化平台集群

执行完以上操作后在控制台页面选中当前集群，点击进行下一步

<image src="https://static.goodrain.com/docs/5.4/user-operations/install/ha-deployment/ha-installation/init-rainbond.jpg" title="初始化Rainbond集群" width="100%"/>

**自定义集群初始化参数**

高可用安装需要自定义集群初始化参数，在初始化平台集群界面进行配置，具体参数参考文档 [初始化Rainbond集群参数说明](../user-operations/cluster-manage/init-region/)。

<image src="https://static.goodrain.com/docs/5.4/user-operations/install/ha-deployment/ha-installation/custom-parameters.jpg" title="自定义集群参数" width="100%"/>

当前演示集群参数如下：

```yaml
apiVersion: rainbond.io/v1alpha1
kind: RainbondCluster
metadata:
 name: rainbondcluster
 namespace: rbd-system
spec:
#安装高可用集群
  enableHA: true
#定义ETCD节点信息
  etcdConfig:
    endpoints:
    #服务器内网IP:2379
      - 192.168.0.58:2379
      - 192.168.0.65:2379
      - 192.168.0.66:2379
    secretName: rbd-etcd-secret
#定义VIP或负载均衡服务的IP地址
  gatewayIngressIPs:
    - 47.104.140.37
#定义源码构建服务的服务器地址
  nodesForChaos:
    #填写服务器外网IP地址
    - externalIP: 47.104.110.22
    #填写服务器内网IP地址
      internalIP: 192.168.0.58
    #填写通过kubectl get node命令查询到的节点NAME
      name: 47.104.110.22
    - externalIP: 47.104.139.60
      internalIP: 192.168.0.65
      name: 47.104.139.60
    - externalIP: 47.104.80.93
      internalIP: 192.168.0.66
      name: 47.104.80.93
#定义网关服务的服务器地址
  nodesForGateway:
    #填写服务器外网IP地址
    - externalIP: 47.104.110.22
    #填写服务器内网IP地址
      internalIP: 192.168.0.58
    #填写通过kubectl get node命令查询到的节点NAME
      name: 47.104.110.22
    - externalIP: 47.104.139.60
      internalIP: 192.168.0.65
      name: 47.104.139.60
    - externalIP: 47.104.80.93
      internalIP: 192.168.0.66
      name: 47.104.80.93
  rainbondVolumeSpecRWX:
#定义GFS共享存储的storageClass名称
    storageClassName: glusterfs-simple
#定义集群端数据库(region库)的连接信息
  regionDatabase:
    host: 192.168.0.58
    name: region
    password: Gz1ea3.G
    port: 3306
    username: rainbond
```
 
集群参数定义完毕后，点击  **开始初始化** 按钮，此过程会在 Kubernetes 集群中部署 Rainbond 组件，待部署完毕后进入对接集群界面。

3.对接集群

填写 **集群ID** 及 **集群名称** ，点击对接按钮即可完成对接；对接完成后平台即部署完毕，建议参考后续文档将 All-In-One 模式部署的控制台迁移至 Rainbond 平台。

<image src="https://static.goodrain.com/docs/5.4/user-operations/install/ha-deployment/ha-installation/docking-cluster.png" title="对接集群" width="100%"/>


### 九. 迁移控制台

部署完成后将 All-In-One 模式部署的控制台迁移至 Rainbond 中管理，使其具有高可用特性  参考文档[控制台迁移](../install-with-ui/console-recover)。

-->