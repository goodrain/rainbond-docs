---
title: 基于Rancher安装
description: 本文适用于正在使用 Rancher 或对 Rancher 有所了解的用户, 参考如何在 Rancher 中安装 Rainbond 
---



### 安装前提：

- 推荐[helm版本](https://helm.sh/docs/intro/install/)：3.0+
- 推荐[k8s版本](https://kubernetes.io/)：1.19+
- 根分区磁盘保证50G+
- 确保服务器 `80、443、6060、6443、7070、8443` 端口能够访问且没占用
- 服务器已经安装了 NFS 客户端

:::caution

注意：基于 Rancher 安装 Rainbond 时，一定要关闭当前安装集群的 Nginx Ingress ，因为 Rainbond 的网关节点会使用其端口

:::

<img src="https://pic.imgdb.cn/item/6232cf0a5baa1a80ab9bd96c.png" />

### 开始安装：

#### 安装 NFS 客户端

如果服务器上有 NFS 客户端，则无需重复进行安装
```bash
yum -y install nfs-utils    # Cenots系统
apt-get install nfs-common  # ubuntu系统
```

#### 添加 Rainbond 到应用商店

- 首先要切换到安装 Rainbond 的集群 例：集群test
- 点击 Apps & Marketplace > Repositories > Create
- 编辑当前应用的名字，填写商店 GIT 地址的 URL `` https://github.com/goodrain/rainbond-chart.git  ``，分支默认填写 master , 然后点击 Create 

<img src="https://pic.imgdb.cn/item/6232cf0a5baa1a80ab9bd964.png" />

- 添加完成以后点击 Repositories 回到首页，查看 商店状态为 Active 即为成功



#### 添加 Rainbond 应用到集群

- 点击 Apps & Marketplace > Charts
- 只选中添加的商店名字，选中 Rainbond 应用，然后点击 install 
- 选择 rbd-system 命名空间（需要提前进行创建），然后点击 next

<img src="https://pic.imgdb.cn/item/6233e1235baa1a80abca3fc8.png" />

<img src="https://pic.imgdb.cn/item/6233e1235baa1a80abca3fe0.png" />

- 进入自定义 Values.yaml 的阶段，文件的详细信息可以参考 [values.yaml 文档](../install-with-helm/vaules-config) 进行编辑，修改完配置点击 install 

:::danger

警告：如果有公网 IP 一定要修改 Values.yaml 文件里面 gatewayIngressIPs 这一项，保证部署的应用可以正常访问。

:::

<img src="https://pic.imgdb.cn/item/6233e1235baa1a80abca3fc2.png" />



​                               

### 验证安装

- Rancher ui 界面上方 kubectl shell 按键可以进入终端命令行，查看 pod 的状态，成功状态如下

<img src="https://pic.imgdb.cn/item/6233e1235baa1a80abca3fd3.png" />

- 安装成功以后可以通过 `$gatewayIngressIPs:7070` 访问 Rainbond 控制台，若没有公网 IP 则为内网 IP ：7070  。

### 安装问题排查

- 安装过程中如果长时间未完成，那么请参考文档 [Helm 安装问题排查指南](/docs/installation/install-troubleshoot/helm-install-troubleshoot)，进行故障排查。

## 下一步

参考[快速入门](/docs/quick-start/getting-started/)部署你的第一个应用。
