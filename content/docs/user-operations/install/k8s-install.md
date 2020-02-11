---
title: "快速安装Kubernetes"
weight: 1000
description: "借助 Rainbond 推荐的方式快速自动化部署 Kubernetes 集群"
---

这篇文档讲述了如何借助 [easzup](https://github.com/easzlab) 快速部署一个 Kubernetes 集群：
根据您的场景不同，可以选择下面两种部署模式中的一个：

- 单节点的学习测试环境： [kubernetes的all-in-one安装方式](#一、kubernetes的all-in-one安装方式)

- 多节点开发生产环境： [kubernetes的高可用安装](#二、kubernetes的高可用安装)

## kubernetes的all-in-one安装方式

### 下载文件

   - 下载工具脚本easzup，easzup的不同release影响可以安装的kubernetes版本，具体对应信息可查看[easzup版本](https://github.com/easzlab/kubeasz/releases)

```bash
     #选择2.1.0版本的easzup，2.1.0版本的easzup默认安装的kubernetes版本为1.16.2
     export release=2.1.0
     curl -C- -fLO --retry 3 https://github.com/easzlab/kubeasz/releases/download/${release}/easzup
     chmod +x ./easzup
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
   - 建议修改/etc/ansible/roles/cluster-addon/defaults/main.yml文件中下述两项，默认为yes，修改为no不进行安装，以免占用不必要的资源

   ```yaml
   #不安装dashboard,rainbond不依赖dashboard
   dashboard_install: "no"
   #不安装ingress，rainbond自带ingress网关
   ingress_install: "no"
        #
   ```

   - 容器化运行 kubeasz，详见[文档](https://github.com/easzlab/kubeasz/blob/master/docs/setup/docker_kubeasz.md)

   ```bash
        ./easzup -S
   ```

   - 使用默认配置安装 aio 集群

   ```bash
   docker exec -it kubeasz easzctl start-aio
   ```
   - 完成后赋值kubectl工具到/usr/bin/kubectl
   
   > 注意，这一步如果忽略了将导致rbd-webcli组件无法启动，后续将优化实现解除对kubectl的依赖。
   
   ```bash
   cp -a /opt/kube/bin/kubectl /usr/bin/kubectl 
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

- 下载工具脚本easzup，举例使用kubeasz版本2.1.0

```bash
      export release=2.1.0
      curl -C- -fLO --retry 3 https://github.com/easzlab/kubeasz/releases/download/${release}/easzup
      chmod +x ./easzup
```

- 使用脚本工具下载离线镜像等文件，文件保存在/etc/ansible目录中

```bash
      ./easzup -D
```

- 配置集群参数

```bash
      cd /etc/ansible && cp example/hosts.multi-node hosts
```

   将集群配置模版拷贝到指定位置后，按照模版格式，依照自己的节点规划修改内容

- 容器化运行kubeasz

```bash
      ./easzup -S
```

- 使用ansible安装kubernetes集群

```bash
      docker exec -it kubeasz ansible-playbook 90.setup.yml
```

完成Kubernetes的安装，[开始Rainbond的安装](../minimal_install/)
