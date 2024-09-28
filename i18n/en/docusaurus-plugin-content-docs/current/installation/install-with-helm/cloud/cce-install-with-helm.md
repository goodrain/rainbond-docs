---
title: The installation is based on Huawei Cloud CCE cluster
description: Based on Huawei Cloud CCE cluster, install Rainbond from scratch with helm
---

## Installation prerequisites

Before you start, make sure you have purchased the following as a cloud resource, all the resources required in the same region：

### Huawei CCE Hosting Cluster

- CCE Kubernetes version no less than 1.19
- At least 2 nodes in the cluster and a `kubectl` command is configured
- Nodes have public access
- Configure requirements for 8 nuclear CPU 32G memory
- Disk space： root partition 200G data partition (docker partition) 300G
- Security group rules are properly configured

### ELB Load Balancer

- Has a **Public Web IP Address**
- Include node from the CCE cluster in the backend server group
- Configure the following port mapping：80 443 6060 7070 8443

### SFS Storage Service

- Provides a mount point in format like `121.89.94.122：/`
- Select the same VPC as the cloud server

### RDS Database Service

- Precreate two database instance： `console` `region`
- Generate database account password, grant all permissions for the above database
- Security group rules can access corresponding ports

### Container Image Service

- Create a good namespace, username, password

### helm version

- Helm3 above

## Match CCE cluster

### Install Kubectl command line tool

- Download kubectl

```
wget https://grstatic.oss-cn-shanghai.aliyuncs.com/binary/kubtl -O /usr/bin/kubectl
chmod +x /usr/bin/kubectl
```

- Configure config file

Log in to the cloud container engine console, enter 'Resource Management > Cluster Management', click on cluster name to enter cluster details page.Click on the kubectl tab > Download kubectl profile.

Copy the contents of the kubtl configuration file to the config file and execute the following command on the terminal command line

```bash
mkdir ~/.kube/
vi ~/.kube/config
```

### Install helm

```bash
wget https://pkg.goodrain.com/pkg/helm && chmod +x help && mv helm /usr/local/bin/
```

### Create values.yaml file

- Select the configuration of the rainbond cluster in a custom format and whether to take over the existing cloud SFS, RDS, mirror warehouses, etc.

```yaml
$ vi values.yaml

##Rainbondcluster
Cluster:
## 定义是否开启高可用，true为开，false为关,高可用下默认副本集为2
  enableHA: false

## 定义是否使用外部镜像镜像仓库，true为开，false为关，需要用户提供已存在的镜像仓库的 域名、空间名称、用户名以及密码
  imageHub:
    enable: false
    domain: fdfef-bejing.huaweiyun.com
    namespace: sefe
    password: grddgar
    username: zfefee

## 外部ETCD，对应填写IP，证书，true为开，false为关
  etcd:
    enable: false
    endpoints: 
    - 192.168.0.1:2379 
    - 192.168.0.2:2379
    - 192.168.0.3:2379
    secretName: "rbd-etcd-secret"

## region数据库，true为开，false为关，华为云用户务必提供外接高可用的 RDS Mysql 数据库，该数据库中需要提前创建 region 数据库，需要提供内网可访问的 RDS 域名、用户名、密码
  regionDatabase:
    enable: false
    host: 121.89.194.124
    name: region
    password: gr12dfe
    port: 3306
    username: admin

## ui数据库，true为开，false为关，h华为云用户务必提供外接高可用的 RDS Mysql 数据库，该数据库中需要提前创建 console 数据库，需要提供内网可访问的 RDS host、用户名、密码
  uiDatabase:
    enable: false
    host: 121.89.194.124
    name: console
    password: gr12dfe
    port: 3306
    username: admin

## 对外网关，填写ELB公网IP
  gatewayIngressIPs: 121.89.194.127

## chaos对应配置，高可用环境中，至少选择 2 个节点作为集群 构建服务运行节点,name为后端服务器节点的 node名称
  nodesForChaos:
  - name: 10.22.197.170
  - name: 10.22.197.171

## 网关节点对应配置，高可用环境中，至少选择 2 个节点作为集群 网关节点 ，推荐将所有节点作为网关节点使用，要求节点的 80、443、6060、7070、8443、 端口没有被占用。name 填写node节点的name即可
  nodesForGateway:
  - externalIP: 10.22.197.170
    internalIP: 10.22.197.170
    name: 10.22.197.170
  - externalIP: 10.22.197.171
    internalIP: 10.22.197.171
    name: 10.22.197.171
  
  ## 对接华为云 SFS 存储，需开启 nfs-client-provisioner，storageClassName 是默认值
  RWX:
    enable: true
    config:
      storageClassName: nfs-client
  RWO:
    enable: true
    storageClassName: nfs-client

## 对接华为云 SFS 存储，填写 Server 和 Path
nfs-client-provisioner:
  childChart:
    enable: true
  nfs:
    server: <IP>
    path: <PATH>
```

### Install Rainbond with Helm

- Create rbd-system namespace

```bash
kubectl create namespace rbd-system
```

- Add Chart Repository

```bash
help repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
```

- Install rainbond

```bash
help install rainbond rainbond/rainbond-cluster -f values.yaml -n rbd-system
```

### Verify Installation

- View pod status

```bash
kubtl get po -n rbd-system | grep rbd-app-ui
```

- Waiting for `rbd-app-ui` pod for Running state to install successfully.
- 安装成功以后，可通过 `$gatewayIngressIPs:7070` 访问rainbond控制台。

### Installation problem sorting

- If the installation process is not completed for a long time, please refer to the document [helm installation troubleshooting/installation/helm) for troubleshooting.Or join [微信群](/community/support#microbelieve),[钉钉群](/community/support#pegs) for help.

## Next step

Use[快速入门](/docs/quick-start/getting-started/) to deploy your first application.
