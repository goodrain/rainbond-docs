---
title: "高可用安装Rainbond集群"
description: "高可用安装Rainbond集群"
weight: 1008
---


本文描述如何部署高可用的 Rainbond 集群，适用于生产环境。

### 前提条件

- 根据 [软件和硬件环境要求](/docs/user-operations/install/ha-installation/resource-prepare/) 准备相关资源； 
- 如果您使用 CentOS 7.* 操作系统，请务必提前 [升级内核版本](https://t.goodrain.com/t/topic/1305)；
- 确保服务器 `80、443、6060、6443、7070、8443` 端口能够访问；
- 服务器能够正常连接互联网，安装过程将从互联网下载所需资源；
- 高可用的外部数据库，如 MySQL 8.0 数据库集群 或 RDS 数据库服务，需提前创建 `console`、`region` 两个数据库，数据库字符编码为`utf8mb4`。

### 一. 服务器配置

本文使用了高可用安装所需的最小服务器数量，将角色属性进行复用，以搭建一个高可用性的Rainbond集群。

集群节点信息如下：

|节点IP地址| 节点属性  | CPU    | 内存  |
| -------- | -------- | ------ | ---- |
|10.193.121.112|管理节点/计算节点/网关节点/构建节点/ETCD节点/存储节点/|16vCPU | 64G |
|10.193.121.113|管理节点/计算节点/网关节点/构建节点/ETCD节点/存储节点/ |16vCPU | 64G |
|10.193.121.114|管理节点/计算节点/网关节点/构建节点/ETCD节点/存储节点/ |16vCPU | 64G |


磁盘信息根据 [软件和硬件环境要求](/docs/user-operations/install/ha-installation/resource-prepare/) 进行配置。


### 二. 部署Docker

在已准备的所有服务器上执行安装Docker操作：

```bash
curl sh.rainbond.com/install_docker | bash
```

### 三. 启动 Rainbond 控制台

#### 启动 All-In-One 控制台

```bash
docker run -d -p 7070:7070 -v ~/.ssh:/root/.ssh -v ~/rainbonddata:/app/data \
      --name=rainbond-allinone --restart=always \
      registry.cn-hangzhou.aliyuncs.com/goodrain/rainbond:v5.4.0-release-allinone
```

`备注：`

- 控制台将产生需要持久化的数据，存储于您部署节点的 `~/rainbonddata` 目录中；
- 当前版本支持控制台数据迁移，最终部署完成后需将控制台迁移至平台上部署以确保高可用性。

待容器启动成功后，稍等片刻即可在浏览器中访问服务器 `7070` 端口，打开 Rainbond 控制台`注册页面`。

![image-20210219110137479](https://static.goodrain.com/images/5.3/regist.png)

到此，恭喜您已经完成了第一步，你还需要继续完成集群的部署。



### 五. Kubernetes部署

- RKE 由Rainbond控制台进行安装安装，版本为`v1.19.6`，集群规划参考上述 服务器配置

- 将离线包`rainbond-offline-v5.3.0.tgz`拷贝到所有节点集群节点上，此离线包包含RKE集群及Rainbond集群所有镜像资源及节点离线初始化脚本

1.拷贝离线包至所有节点后，执行

```bash
tar xvf rainbond-offline-enterprise-2107.tgz && cd offline
```

2.在控制台上选择添加集群>>从主机开始安装，节点配置参考上述服务器配置列表

3.所有节点执行以下节点初始化命令，载入RKE及Rainbond镜像，执行位置为离线包解压后的目录内，`SSH_RSA`的值根据实际提示进行替换

```bash
export SSH_RSA="ssh-rsa xxxxx"&& ./init_node_offline.sh
```

4.初始化完成后，点击下一步，等待 RKE 集群安装成功即可

5.获取`kubectl`命令，证书文件通过控制台获取

```bash
mv kubectl /usr/loval/bin
```


### 六.   部署存储GlusterFS存储


##### 通过 Kubernetes 安装 Glusterfs 集群

gfs节点：

10.193.121.112
10.193.121.113
10.193.121.114

- 将准备好的磁盘格式化并挂载到指定目录`/data`

- 在所有节点安装对应版本的 Glusterfs 客户端工具并加载所需内核模块


```bash  
yum -y install centos-release-gluster
yum -y install glusterfs-client
modprobe dm_thin_pool
```


以下操作在 Kubernetes 的任一 master 节点执行一次即可

- 获取对应的项目

```bash
git clone https://gitee.com/liu_shuai2573/gfs-k8s.git && cd gfs-k8s
```

- 设置节点标签，指定对应节点运行 Glusterfs 组件

```bash
  #设置标签，将 Glusterfs1/2/3 更改为对应的 Kubernetes node 节点
  kubectl label node 10.193.121.112 10.193.121.113 10.193.121.114 storagenode=glusterfs
```

- 创建 Glusterfs 服务

```bash
  kubectl create -f gluster-daemonset.yaml
```

- 检查 Glusterfs 服务是否在指定节点正常运行

```bash
$ kubectl get pods -o wide --selector=glusterfs-node=daemonset
NAME              READY   STATUS    RESTARTS   AGE   IP               NODE             NOMINATED NODE   READINESS GATES
glusterfs-48s9g   1/1     Running   0          47h   10.193.121.112   10.193.121.112   <none>           <none>
glusterfs-jhtsf   1/1     Running   0          47h   10.193.121.114   10.193.121.114   <none>           <none>
glusterfs-jvfw9   1/1     Running   0          47h   10.193.121.113   10.193.121.113   <none>           <none>
```

- 将 Glusterfs 服务添加为统一集群

```bash
  #通过其中一个 Glusterfs 服务将其他两个 Glusterfs 服务加入集群
  kubectl exec -ti glusterfs-48s9g gluster peer probe 10.193.121.113
  kubectl exec -ti glusterfs-48s9ggluster peer probe 10.193.121.114
  #检测是否添加成功，添加成功会显示其他两个 Glusterfs 服务的状态
  kubectl exec -ti glusterfs-48s9g gluster peer status
```

配置 Glusterfs 集群为 Kubernetes 的可使用资源 

- 创建服务账户并进行 RBAC 授权

```bash
  kubectl create -f rbac.yaml
```

- 创建 Glusterfs-provisioner 

```bash
kubectl create -f deployment.yaml
```

- 创建storageclass资源

```bash
#修改 storageclass.yaml 中的 parameters.brickrootPaths 的值，替换为 Glusterfs 节点的IP
kubectl create -f storageclass.yaml
```

- 创建 pvc 验证

```bash
  kubectl create -f pvc.yaml
  kubectl get pvc | grep gluster-simple-claim #创建成功时STATUS为Bound
```

- 创建 pod 验证

```bash
  kubectl create -f pod.yaml
  kubectl get po | grep gluster-simple-pod #运行正常时STATUS为Running
```

- 移除验证 pod
 
```bash
kubectl delete -f pod.yaml
```


### 七.  Rainbond部署方式

- 数据库和存储就绪后，回到控制台继续Rainbond安装流程

1.创建etcd的`secret`证书文件

RKE安装集群，etcd证书文件位于`/etc/kubernetes/ssl`，分别为`kube-ca.pem、kube-node.pen、kube-node-key.pem`

```bash
$ kubectl create ns rbd-system
$ kubectl create secret generic rbd-etcd-secret -n rbd-system \
--from-file=ca-file=/etc/kubernetes/ssl/kube-ca.pem \
--from-file=cert-file=/etc/kubernetes/ssl/kube-node.pem \
--from-file=key-file=/etc/kubernetes/ssl/kube-node-key.pem
```
      
2.点击自定义集群初始化参数
   
```yaml
metadata:
  creationTimestamp: null
  name: rainbondcluster
spec:
  enableHA: true
  etcdConfig:
    endpoints:
      - 10.193.121.112:2379
      - 10.193.121.113:2379
      - 10.193.121.114:2379
    secretName: rbd-etcd-secret
  gatewayIngressIPs:
    - 58.22.5.9
  nodesForChaos:
    - internalIP: 10.193.121.112
      name: 10.193.121.112
    - internalIP: 10.193.121.113
      name: 10.193.121.113
  nodesForGateway:
    - internalIP: 10.193.121.112
      name: 10.193.121.112
    - internalIP: 10.193.121.113
      name: 10.193.121.113
  rainbondVolumeSpecRWX:
    storageClassName: glusterfs-simple
  regionDatabase:
    host: 10.193.121.114
    name: region
    password: rainbond123465!
    port: 3306
    username: rainbond
```
 
3.点击下一步，跟随指引对接集群
   
4.切换至集群版控制台：

   1. 导入离线模版

      - 登录当前控制台

      - 对接企业应用市场后选择安装企业版控制台

   2. 创建团队

      - 点击左侧导航栏团队>>新建团队>>输入团队名称并选择刚才部署的集群

   3. 部署控制台

      - 进入刚创建完成的团队
      - 点击左侧导航栏新建>>基于应用市场创建组件>>本地组件库
      - 选择Rainbond企业版>>点击安装>>选择5.3版本>>选择新建应用>>点击安装
      - 进入控制台-UI，修改对外端口为tcp类型

   4. 对接pxc数据库

      - 进入刚才部署的应用内，点击右侧添加第三方组件
      - 组件名称为mysql，注册方式为静态注册，组件地址为数据库地址
      - 点击新建组件
      - 进入新建组件内，添加依赖信息
        - DB_TYPE=mysql
        - MYSQL_DB=console
        - MYSQL_HOST=127.0.0.1
        - MYSQL_PASS=部署pxc集群时所修改的密码
        - MYSQL_PORT=3306
        - MYSQL_USER=root
      - 返回应用内，点击关闭应用，并删除mysql组件
      - 为集群安装驱动服务和Rainbond控制台添加对mysql的依赖
      - 启动应用



   5. 验证

      - 访问新控制台，查看是否可以看到之前创建的团队及应用
      - 确认新的控制台正常，可以关闭旧控制台，在启动旧控制台的节点执行`docker stop rainbond-allinone`即可

