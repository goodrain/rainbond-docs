---
title: '基于阿里云 ACK 集群安装'
description: '基于阿里云 ACK 集群，使用 helm 从零开始安装 Rainbond'
---

## 安装前提

开始之前，请确定已经购买了以下阿里云资源，所有资源要求在同一区域：

### 阿里云 ACK 托管集群

- ACK Kubernetes 版本不低于1.16
- 集群内至少 2 节点，并配置好 `kubectl` 命令
- 节点具备公网访问能力
- 配置要求 8核CPU 32G内存 
- 磁盘空间： 根分区 200G 数据分区（docker分区）300G

### SLB负载均衡

- 具备一个 **公网IP地址**
- 将 ACK 集群中的节点纳入后端服务器组
- 配置以下端口映射：80 443 6060 7070 8443

### NAS 存储服务

- 提供一个挂载点，格式类似 `123456789-var48.cn-shanghai.nas.aliyuncs.com:/`
- 关闭访问控制（黑白名单），或针对所有 ACK 节点开启访问权限

### RDS 数据库服务

- 预先生成两个数据库实例： `console` `region`
- 生成数据库账户密码，对上述数据库赋予全部权限
- 关闭访问控制（黑白名单），或针对所有 ACK 节点开启访问权限
- 数据库版本选择 8.0
- 数据库磁盘空间不少于 5 G

### 容器镜像服务

- 创建好命名空间、用户名、密码

### helm 版本

- helm3 以上版本

## 对接ACK集群

### 安装 Kubectl 命令行工具

安装 [Kubectl](/docs/ops-guide/tools/kubectl) 命令行工具


### 获取 kubeconfig 信息

- 在阿里云ACK集群首页，点击进入集群，点击连接信息，复制下面的 config 文件

![](https://pic.imgdb.cn/item/6217362f2ab3f51d91f511aa.png)

如上图所示， 复制 kubeconfig 文件写到 `~/.kube/config` 文件里。

```bash
mkdir ~/.kube/
vi ~/.kube/config
```

### 安装helm

```bash
wget https://pkg.goodrain.com/pkg/helm && chmod +x helm && mv helm /usr/local/bin/
```

### 创建values.yaml 文件

- 通过自定义的形式，选择rainbond 集群的配置以及是否对接已有的阿里云RDS，NAS，镜像仓库等。

```yaml
$ vi values.yaml

##Rainbondcluster
Cluster:
## 定义是否开启高可用，true为开，false为关,高可用下默认副本集为2
  enableHA: false

## 定义是否使用外部镜像镜像仓库，true为开，false为关，需要用户提供已存在的镜像仓库的 域名、空间名称、用户名以及密码
  imageHub:
    enable: false
    domain: fdfef-hangzhou.aliyuncs.com
    namespace: sefe
    password: grddgar
    username: zfefee

## 外部ETCD，对应填写IP，证书，true为开，false为关，如有阿里云ETCD直接填写IP即可
  etcd:
    enable: false
    endpoints: 
    - 192.168.0.1:2379 
    - 192.168.0.2:2379
    - 192.168.0.3:2379
    secretName: "rbd-etcd-secret"

## 外部存储，true为开，false为关,如需对接阿里云NAS存储，如需修改挂载参数，可按照格式修改mountOptions下面的参数，挂载点直接修改server地址
  RWX:
    enable: false
    config:
      csiPlugin:
        aliyunNas:
          accessKeyID: ""
          accessKeySecret: ""
      storageClassParameters:
##        mountOptions:
##        - "nolock,tcp,noresvport"
##        - "vers=4"
        parameters:
          volumeAs: subpath
          archiveOnDelete: "true"
          server: NAS_SERVER_ADDR
      
## 外部存储，直接填写storageClassName，true为开，false为关
  RWO:
    enable: false
    storageClassName: glusterfs-simple

## region数据库，true为开，false为关，阿里云用户务必提供外接高可用的 RDS Mysql 8.0 数据库，该数据库中需要提前创建 region 数据库，需要提供内网可访问的 RDS 域名、用户名、密码
  regionDatabase:
    enable: false
    host: 4444f-8vbidfd.mysql.zhangbei.rds.aliyuncs.com 
    name: region
    password: gr12dfe
    port: 3306
    username: admin

## ui数据库，true为开，false为关，阿里云用户务必提供外接高可用的 RDS Mysql 8.0 数据库，该数据库中需要提前创建 console 数据库，需要提供内网可访问的 RDS 域名、用户名、密码
  uiDatabase:
    enable: false
    host: 4444f-8vbidfd.mysql.zhangbei.rds.aliyuncs.com
    name: console
    password: gr12dfe
    port: 3306
    username: admin

## 对外网关，填写SLB公网IP
  gatewayIngressIPs: 121.89.194.127

## chaos对应配置，高可用环境中，至少选择 2 个节点作为集群 构建服务运行节点,name为后端服务器节点的 node名称
  nodesForChaos:
  - name: cn-zhangjiakou.10.22.197.170
  - name: cn-zhangjiakou.10.22.197.171

## 网关节点对应配置，高可用环境中，至少选择 2 个节点作为集群 网关节点 ，推荐将所有节点作为网关节点使用，要求节点的 80、443、6060、7070、8443、 端口没有被占用。name 填写node节点的name即可
  nodesForGateway:
  - externalIP: 10.22.197.170
    internalIP: 10.22.197.170
    name: cn-zhangjiakou.10.22.197.170
  - externalIP: 10.22.197.171
    internalIP: 10.22.197.171
    name: cn-zhangjiakou.10.22.197.171
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

- 安装过程中如果长时间未完成，那么请参考文档[helm 安装问题排查指南](/docs/installation/install-troubleshoot/helm-install-troubleshoot)，进行故障排查。

## 下一步

参考[快速入门](/docs/quick-start/getting-started/)部署你的第一个应用。
