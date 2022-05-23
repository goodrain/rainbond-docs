---
title: Glusterfs分布式存储
description: 对接 Glusterfs 作为集群共享存储
weight: 5015
---

### 通过 Kubernetes 安装 Glusterfs 集群

通过本文内容为用户说明如何通过 Kubernetes 安装一个 Glusterfs 的集群，并为 Rainbond 提供高可用存储

### 前提条件

- 安装好的 Kubernetes 集群，其中三个节点应各挂载一块空间不小于 500G 的 SSD 磁盘

- 将准备好的磁盘格式化并挂载到指定目录

  ```bash
  # 查看可用磁盘
  fdisk -l
  # 分区并格式化
  mkfs.xfs  /dev/vdb1
  mkdir  -p /data
  echo "/dev/vdb1  /data  xfs  defaults 1 2" >>/etc/fstab
  # 挂载
  mount -a
  # 确定/data挂载
  df -h | grep data
  ```

- 在 Kubernetes 所有节点安装对应版本的 Glusterfs 客户端工具并加载所需内核模块

  - Ubuntu 1604/1804
  
  ```bash
  apt install software-properties-common
  add-apt-repository ppa:gluster/glusterfs-7
  apt update
  apt install glusterfs-client -y
  modprobe dm_thin_pool
  ```

  - CentOS 7

  ```bash  
  yum -y install centos-release-gluster
  yum -y install glusterfs-client
  modprobe dm_thin_pool
  ```

### 部署 Glusterfs 集群

以下操作在 Kubernetes 的任一 master 节点执行一次即可

- 获取对应的项目

  ```bash
  git clone https://gitee.com/liu_shuai2573/gfs-k8s.git && cd gfs-k8s
  ```

- 设置节点标签，指定对应节点运行 Glusterfs 组件

  ```bash
  #设置标签，将 Glusterfs1/2/3 更改为对应的 Kubernetes node 节点
  kubectl label node Glusterfs1 Glusterfs2 Glusterfs3 storagenode=glusterfs
  #执行此操作后，对应节点将只运行 Glusterfs 服务，如需复用该节点，请不要执行此操作
  kubectl taint node Glusterfs1 Glusterfs2 Glusterfs3 glusterfs=true:NoSchedule
  ```

- 创建 Glusterfs 服务

  ```bash
  kubectl create -f gluster-daemonset.yaml
  ```

- 检查 Glusterfs 服务是否在指定节点正常运行

  ```bash
  kubectl get pods -o wide --selector=glusterfs-node=daemonset
  NAME              READY   STATUS    RESTARTS   AGE    IP              NODE            NOMINATED NODE   READINESS GATES
  glusterfs-2k5rm   1/1     Running   0          52m    192.168.2.200   192.168.2.200   <none>           <none>
  glusterfs-mc6pg   1/1     Running   0          134m   192.168.2.22    192.168.2.22    <none>           <none>
  glusterfs-tgsn7   1/1     Running   0          134m   192.168.2.224   192.168.2.224   <none>           <none>
  ```

- 将 Glusterfs 服务添加为统一集群

  ```bash
  #通过其中一个 Glusterfs 服务将其他两个 Glusterfs 服务加入集群
  kubectl exec -ti glusterfs-2k5rm gluster peer probe Glusterfs2_IP
  kubectl exec -ti glusterfs-2k5rm gluster peer probe Glusterfs3_IP
  #检测是否添加成功，添加成功会显示其他两个 Glusterfs 服务的状态
  kubectl exec -ti glusterfs-2k5rm gluster peer status
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

完成 Glusterfs 的安装，参考 [初始化Rainbond集群参数说明](../cluster-manage/init-region/) 对接该存储。
