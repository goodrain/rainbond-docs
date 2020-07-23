---
title: "快速安装 Kubernetes"
weight: 1000
description: "借助 Rainbond 推荐的方式快速自动化部署 Kubernetes 集群"
---

这篇文档讲述了如何借助 [easzup](https://github.com/easzlab) 快速部署一个 Kubernetes 集群：
根据您的场景不同，可以选择下面两种部署模式中的一个：

- 单节点的学习测试环境： [kubernetes的all-in-one安装方式](#kubernetes的all-in-one安装方式)

- 多节点开发生产环境： [kubernetes的高可用安装](#kubernetes的高可用安装)

## kubernetes的all-in-one安装方式

### 下载文件

   - 通过 Rainbond 加速下载工具脚本 easzup  `2.1.0`版本，easzup 的不同 release 影响可以安装的 kubernetes 版本，具体对应信息可查看[easzup版本](https://github.com/easzlab/kubeasz/releases)

```bash
wget https://goodrain-pkg.oss-cn-shanghai.aliyuncs.com/pkg/easzup && chmod +x easzup
```

   - 使用工具脚本下载其他文件，主要包括离线镜像，二进制文件等，保存在/etc/ansible目录中

```bash
./easzup -D
```

### 配置免密钥登录

```bash
ssh-keygen -t rsa -b 2048 -N '' -f ~/.ssh/id_rsa
ssh-copy-id $IP  # $IP 为所有节点地址包括自身，按照提示输入 yes 和 root 密码
```

### 在ansible控制端编排k8s安装
   - 容器化运行 kubeasz，详见[文档](https://github.com/easzlab/kubeasz/blob/master/docs/setup/docker_kubeasz.md)

   ```bash
./easzup -S
   ```

   - 使用默认配置安装 aio 集群

   ```bash
docker exec -it kubeasz easzctl start-aio
   ```
   - 完成后复制kubectl工具到`/usr/bin/kubectl`
   - 需要扩展node节点时，配置对应节点免密钥登录后执行以下操作添加node节点

```bash
docker exec -it kubeasz easzctl add-node 192.168.1.11
```

### 验证安装结果

   ***如果提示kubectl: command not found，退出重新ssh登录一下，环境变量生效即可***

```bash
$ kubectl version                   # 验证集群版本     
$ kubectl get componentstatus       # 验证 scheduler/controller-manager/etcd等组件状态
$ kubectl get node                  # 验证节点就绪 (Ready) 状态
$ kubectl get pod --all-namespaces  # 验证集群pod状态，默认已安装网络插件、coredns、metrics-server等
$ kubectl get svc --all-namespaces  # 验证集群服务状态
```
   完成Kubernetes的安装，[开始Rainbond的安装](../minimal_install/)

## kubernetes的高可用安装

### 高可用集群所需节点配置如下：


| 角色       | 数量 | 描述                                                         |
| ---------- | ---- | ------------------------------------------------------------ |
| 管理节点   | 1    | 运行ansible/easzctl脚本，可以复用master，建议使用独立节点 |
| etcd节点   | 3    | 注意etcd集群需要1,3,5,7...奇数个节点，一般复用master节点     |
| master节点 | 2    | 高可用集群至少2个master节点                                  |
| node节点   | 3    | 运行应用负载的节点，可根据需要提升机器配置/增加节点数        |


### 在各节点安装依赖工具

- Ubuntu 16.04 请执行以下脚本：

```bash
# 文档中脚本默认均以root用户执行
apt-get update && apt-get upgrade -y && apt-get dist-upgrade -y
# 安装python2
apt-get install python2.7
# Ubuntu16.04可能需要配置以下软连接
ln -s /usr/bin/python2.7 /usr/bin/python
```

- CentOS 7 请执行以下脚本：

```bash
# 文档中脚本默认均以root用户执行
yum update
# 安装python
yum install python -y
```

### 配置免密码登录

```bash
ssh-keygen -t rsa -b 2048 -N '' -f ~/.ssh/id_rsa
ssh-copy-id $IPs #$IPs为所有节点地址包括自身，按照提示输入yes 和root密码
```

### 在ansible控制端编排k8s安装

- 通过 Rainbond 加速下载工具脚本 easzup  `2.1.0`版本

```bash
wget https://goodrain-pkg.oss-cn-shanghai.aliyuncs.com/pkg/easzup && chmod +x easzup
```

- 使用脚本工具下载离线镜像等文件，文件保存在/etc/ansible目录中

```bash
./easzup -D
```

- 配置集群参数

```bash
cd /etc/ansible && cp example/hosts.multi-node hosts
```

**将集群配置模版拷贝到指定位置后，必须按照模版格式，依照自己的节点规划修改/etc/ansible/hosts文件，否则无法安装集群，该文件中包括主机列表及部分集群配置**

```
# etcd集群节点数应为1、3、5...等奇数个，不可设置为偶数
# 变量NODE_NAME为etcd节点在etcd集群中的唯一名称，不可相同
# etcd节点主机列表
[etcd] 
192.168.1.1   NODE_NAME=etcd1
192.168.1.2   NODE_NAME=etcd2
192.168.1.3   NODE_NAME=etcd3

# kubernetes master节点主机列表
[kube-master]
192.168.1.1
192.168.1.2

# kubernetes node节点主机列表
[kube-node]
192.168.1.3
192.168.1.4

# [可选] harbor服务，docker 镜像仓库
# 'NEW_INSTALL':设置为 yes 会安装harbor服务；设置为 no 不安装harbor服务
# 'SELF_SIGNED_CERT':设置为 no 你需要将 harbor.pem 和 harbor-key.pem 文件放在 down 目录下
[harbor]
#192.168.1.8 HARBOR_DOMAIN="harbor.yourdomain.com" NEW_INSTALL=no SELF_SIGNED_CERT=yes

# [可选] 外部负载均衡节点主机列表
[ex-lb]
#192.168.1.6 LB_ROLE=backup EX_APISERVER_VIP=192.168.1.250 EX_APISERVER_PORT=8443
#192.168.1.7 LB_ROLE=master EX_APISERVER_VIP=192.168.1.250 EX_APISERVER_PORT=8443

# [可选] 集群ntp服务器列表
[chrony]
#192.168.1.1

[all:vars]
# --------- Main Variables ---------------
# 可以选择的kubernetes集群运行时: docker, containerd
CONTAINER_RUNTIME="docker"

# kubernetes网络插件: calico, flannel, kube-router, cilium, kube-ovn
CLUSTER_NETWORK="flannel"

# kube-proxy服务代理模式: 'iptables' or 'ipvs'
PROXY_MODE="ipvs"

# K8S Service CIDR, 不可与主机网络重叠
SERVICE_CIDR="10.68.0.0/16"

# Cluster CIDR (Pod CIDR), 不可与主机网络重叠
CLUSTER_CIDR="172.20.0.0/16"

# Node端口范围
NODE_PORT_RANGE="20000-40000"

# 集群DNS域名
CLUSTER_DNS_DOMAIN="cluster.local."

# -------- Additional Variables (don't change the default value right now) ---
# 二进制文件目录
bin_dir="/opt/kube/bin"

# 证书文件目录
ca_dir="/etc/kubernetes/ssl"

# 部署目录 (kubeasz工作空间)
base_dir="/etc/ansible"
```

- 容器化运行kubeasz

```bash
./easzup -S
```

- 使用ansible安装kubernetes集群

```bash
docker exec -it kubeasz ansible-playbook /etc/ansible/90.setup.yml
```

完成Kubernetes的安装，[开始Rainbond的安装](../minimal_install/)
