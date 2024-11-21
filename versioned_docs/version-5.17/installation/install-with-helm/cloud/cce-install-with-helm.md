---
title: '基于华为云 CCE 集群安装'
description: '基于华为云 CCE 集群，使用 helm 从零开始安装 Rainbond'
---

## 安装前提

开始之前，请确定已经购买了以下华为云资源，所有资源要求在同一区域：

### 华为云 CCE 托管集群

- CCE Kubernetes 版本不低于1.19
- 集群内至少 2 节点，并配置好 `kubectl` 命令
- 节点具备公网访问能力
- 配置要求 8核CPU 32G内存 
- 磁盘空间： 根分区 200G 数据分区（docker分区）300G
- 安全组规则合理配置

### ELB负载均衡

- 具备一个 **公网IP地址**
- 将 CCE 集群中的节点纳入后端服务器组
- 配置以下端口映射：80 443 6060 7070 8443

### SFS 存储服务

- 提供一个挂载点，格式类似 `121.89.94.122：/`
- 选择与云服务器同一VPC

### RDS 数据库服务

- 预先生成两个数据库实例： `console` `region`
- 生成数据库账户密码，对上述数据库赋予全部权限
- 安全组规则可以访问对应端口

### 容器镜像服务

- 创建好命名空间、用户名、密码

### helm 版本

- helm3 以上版本

## 对接CCE集群

### 安装 Kubectl 命令行工具

- 下载 kubectl

```
wget https://grstatic.oss-cn-shanghai.aliyuncs.com/binary/kubectl -O /usr/bin/kubectl
chmod +x /usr/bin/kubectl
```

- 配置 config 文件

登录云容器引擎控制台，进入“资源管理 > 集群管理”，单击集群名称，进入集群详情页。单击kubectl页签 > 下载 kubectl配置文件 。

复制 kubectl 配置文件的内容到 config 文件，并在终端命令行执行以下命令

```bash
mkdir ~/.kube/
vi ~/.kube/config
```

### 安装helm

```bash
wget https://pkg.goodrain.com/pkg/helm && chmod +x helm && mv helm /usr/local/bin/
```

### 创建values.yaml 文件

- 通过自定义的形式，选择rainbond 集群的配置以及是否对接已有的华为云的SFS，RDS，镜像仓库等。

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

### 使用 Helm 安装 Rainbond

- 创建rbd-system 命名空间

```bash
kubectl create namespace rbd-system
```

- 添加chart仓库

```bash
helm repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
```

- 安装rainbond

```bash
helm install rainbond rainbond/rainbond-cluster -f values.yaml -n rbd-system
```

### 验证安装

- 查看pod状态

```bash
kubectl get po -n rbd-system | grep rbd-app-ui
```

- 等待 `rbd-app-ui` pod为 Running 状态即安装成功。
- 安装成功以后，可通过 `$gatewayIngressIPs:7070` 访问rainbond控制台。

### 安装问题排查

- 安装过程中如果长时间未完成，那么请参考文档[helm 安装问题排查指南](../../../troubleshooting/installation/helm)，进行故障排查。或加入 [微信群](/community/support#微信群)、[钉钉群](/community/support#钉钉群) 寻求帮助。

## 下一步

参考[快速入门](/docs/quick-start/getting-started/)部署你的第一个应用。
