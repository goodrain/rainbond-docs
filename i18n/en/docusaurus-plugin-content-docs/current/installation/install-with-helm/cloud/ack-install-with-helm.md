---
title: Based on Alibaba Cloud ACK cluster installation
description: Based on Alibaba Cloud ACK cluster, install Rainbond from scratch with helm
---

## Installation prerequisites

Before you start, make sure you have purchased the following Aliyun resources, all of which are required in the same region：

- Buy Ali-Cloud [ACK Trust Group](https://www.aliyun.com/product/kubernetes)
  - ACK Kubernetes Version 1.16+
- Buy [SLB load balancing](https://www.aliyun.com/product/slb)**(option)**
  - Configure port mapping `80443,6060 70,843`
- Buy [File Storage NAS](https://www.aliyun.com/product/nas)**(option)**
  - Provide mount points such as `123456789-var48.cn-shanghai.nas.aliyuncs.com:`
- Buy [RDS MySQL](https://www.aliyun.com/product/rds/mysql) **(option)**
  - Create a `console` database
  - Version 5.7+
- Purchase [ACR container mirror service](https://www.aliun.com/product/acr) **(option)**
- Install [Kubectl](/docs/ops-guide/tools/#kubectl)
- Install [Helm](/docs/ops-guide/tools/#helm)

## Button ACK Cluster

1. Custom Helm Chart parameters, fill in SLB NAS RDS ACR information.

```yaml title="vim values.yaml"

Cluster:
## 是否开启高可用安装
  enableHA: true

## 提供镜像仓库连接信息
  imageHub:
    enable: true
    domain: fdfef-hangzhou.aliyuncs.com
    namespace: sefe
    password: grddgar
    username: zfefee

## 提供阿里云 NAS Server 挂载点，注意一定要加 :/ 与 NAS 挂载命令保持一致
  RWX:
    enable: true
    type: aliyun
    config:
      server: 12345678-bxh32.cn-zhangjiakou.nas.aliyuncs.com:/

## 提供 Region Mysql 数据库连接信息
  regionDatabase:
    enable: true
    host: 4444f-8vbidfd.mysql.zhangbei.rds.aliyuncs.com 
    name: region
    password: gr12dfe
    port: 3306
    username: admin

## 提供 UI Mysql 数据库连接信息
  uiDatabase:
    enable: true
    host: 4444f-8vbidfd.mysql.zhangbei.rds.aliyuncs.com
    name: console
    password: gr12dfe
    port: 3306
    username: admin

## 提供阿里云 SLB 公网 IP
  gatewayIngressIPs: 121.89.194.127

## 选择 Kubernetes 节点作为 Rainbond 的构建服务运行节点
  nodesForChaos:
  - name: cn-zhangjiakou.10.22.197.170
  - name: cn-zhangjiakou.10.22.197.171

## 选择 Kubernetes 节点作为 Rainbond 的网关服务运行节点，要求节点的 80 443 6060 7070 8443 端口未被占用
  nodesForGateway:
  - externalIP: 10.22.197.170
    internalIP: 10.22.197.170
    name: cn-zhangjiakou.10.22.197.170
  - externalIP: 10.22.197.171
    internalIP: 10.22.197.171
    name: cn-zhangjiakou.10.22.197.171
```

2. Create rbd-system namespace

```bash
kubectl create namespace rbd-system
```

3. Add Chart Repository

```bash
help repo add rainbond https://openchart.goodrain.com/goodrain/rainbond
```

4. Install rainbond

```bash
help install rainbond rainbond/rainbond-cluster -f values.yaml -n rbd-system
```

5. Verify Installation

- View pod status

```bash
kubtl get po -n rbd-system | grep rbd-app-ui
```

- Waiting for `rbd-app-ui` pod for Running state to install successfully.
- 安装成功以后，可通过 `$gatewayIngressIPs:7070` 访问rainbond控制台。

## Installation problem sorting

- If the installation process is not completed for a long period of time, please refer to the document [Helm Installation Issues Policy](/docs/troubleshooting/installation/helm) for troubleshooting.Or join [微信群](/community/support#microbelieve),[钉钉群](/community/support#pegs) for help.

## Next step

Use[快速入门](/docs/quick-start/getting-started/) to deploy your first application.
