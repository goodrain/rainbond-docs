---
title: 离线安装
description: 使用 Rainbond ROI 工具进行离线安装的快速指南
keywords:
- Rainbond ROI 离线安装
- 离线 Kubernetes 安装
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::tip 专题入口
如果你不是只想照着命令安装，而是想先判断自己更适合“纯离线安装、离线交付、鲲鹏 / 麒麟部署”还是“信创迁移”，建议先进入 [离线 / 信创 / 国产化专题](/offline-and-xinchuang)，完全离线环境可直接看 [纯离线环境安装](/offline-and-xinchuang/pure-offline-install)。
:::

## 前提

- 准备至少 3 台及以上的 Linux 主机
- 配置建议：
  - CPU: 8 核（最低 4 核）
  - 内存: 16GB（最低 8GB）
  - 磁盘: 200GB 可用空间（最低 100GB）
- 网络: 所有节点之间内网网络互通
- 端口：对外访问开放 7070、80、443、6060 端口
- 操作系统: 支持常见的主流的 Linux 发行版

:::tip
支持 X86(amd64) 和 ARM(arm64) 架构的服务器，支持在国产化信创环境中安装部署。
:::

## 步骤一：下载离线安装包

以下操作均需在有外网访问权限的环境中进行。

1. 执行以下命令下载安装工具：

<Tabs groupId="install">
  <TabItem value="X86(amd64)" label="X86(amd64)" default>

```bash
curl -o roi https://get.rainbond.com/roi/roi-amd64 && chmod +x roi
```

  </TabItem>

  <TabItem value="ARM(arm64)" label="ARM(arm64)" default>

```bash
curl -o roi https://get.rainbond.com/roi/roi-arm64 && chmod +x roi
```

  </TabItem>
</Tabs>


2. 使用以下命令下载离线包:

```bash
./roi download
```

3. 下载完成后应该看到以下文件:

```bash
roi                                             # 安装工具
offline-packages/
├── install.sh                                  # RKE2 安装脚本
├── rke2.linux-amd64.tar.gz                     # RKE2 二进制包
├── rke2-images.linux-amd64.tar.zst             # RKE2 镜像包
├── nfs-subdir-external-provisioner-4.0.18.tgz  # NFS Provisioner Helm Chart
├── mysql-14.0.3.tgz                            # MySQL Helm Chart
├── rainbond-images-amd64.tar.zst               # Rainbond 镜像包
├── rainbond.tgz                                # Rainbond Helm Chart
├── rainbond-images-sourcebuild-amd64.tar.zst   # Rainbond 源码构建镜像包
└── sha256sum-amd64.txt                         # 校验和文件
```

4. 将 `offline-packages/` 目录复制到目标离线环境的服务器上。

## 开始离线安装

:::info
集群安装时必须在集群内的某个节点上执行该命令，同时该节点上还要有 `offline-packages/` 目录。
```bash
./
├── roi
├── cluster.yaml
└── offline-packages/
```
:::

### 步骤一：创建配置文件

创建[集群 cluster.yaml 配置文件](../ops-guides/roi-reference/configuration.md)，指定集群节点信息和角色分配。以下是一个最小化的配置文件示例：

```yaml title="vim cluster.yaml"
# 主机配置
hosts:
  - name: node-1                   # 主机名或节点名
    address: 192.168.1.10          # 公网 IP，没有公网 IP 可使用内网 IP
    internalAddress: 192.168.1.10  # 内网 IP
    user: root                     # SSH 用户
    password: "your-password"      # SSH 密码

  - name: node-2
    address: 192.168.1.11
    internalAddress: 192.168.1.11
    user: root
    password: "your-password"

  - name: node-3
    address: 192.168.1.12
    internalAddress: 192.168.1.12
    user: root
    password: "your-password"

# 角色分配
roleGroups:
  # etcd 节点
  etcd:
    - node-1
  # master 节点(控制平面)
  master: 
    - node-1
  # worker 节点(运行业务负载)
  worker: 
    - node-1
    - node-2
    - node-3
  # Rainbond 网关节点
  rbd-gateway: 
    - node-1
  # Rainbond 构建节点
  rbd-chaos: 
    - node-1
```

:::warning 注意
如果您启用了 NFS 存储，那么需要您手动安装 `nfs-common` 包:

```bash
apt-get update && apt-get install -y nfs-common
```
:::

### 步骤二：执行安装

执行以下命令开始安装:

```bash
# 使用配置文件安装，默认读取 cluster.yaml
./roi up
```

## 访问 Rainbond

安装完成后，日志中会显示访问入口:

```bash
✅ Installation completed successfully!

📝 Next Steps:
  1. Access Rainbond console:
     http://172.16.0.135:7070

  2. Check cluster status:
     kubectl get nodes
     kubectl get pods -n rbd-system
```

```bash
# 在管理节点使用 kubectl
export KUBECONFIG=/etc/rancher/rke2/rke2.yaml
/var/lib/rancher/rke2/bin/kubectl get pods -A
```

## 离线环境下使用源码构建（可选）

如果您想要在离线环境下使用源码构建功能，请执行以下命令加载源码构建镜像:

```bash
./roi addon sourcebuild
```

注意：`offline-packages` 目录必须要存在源码构建离线镜像包

```bash
offline-packages/
└── rainbond-images-sourcebuild-amd64.tar.zst
```

否则，则需要通过 `--components sourcebuild` 参数单独下载源码构建离线包:

```bash
./roi download --components sourcebuild
```

## 常见问题

### 安装失败如何重试？

ROI 支持阶段性重试，可以只执行失败的阶段：

```bash
# 只执行 Rainbond 安装阶段
./roi up -f cluster.yaml --rainbond

# 只执行 RKE2 安装阶段
./roi up -f cluster.yaml --rke2
```

### 如何启用调试日志？

```bash
./roi up -f cluster.yaml -d
```

### 如何跳过环境检查？

仅用于测试环境：

```bash
./roi up -f cluster.yaml --skip-production-check
```

## 下一步

- 跟随[快速入门](../quick-start/getting-started.md)教程，部署你的第一个应用
- 阅读[使用教程](../tutorial/via-rainbond-deploy-sourceandmiddleware.md)，学习和了解更多 Rainbond 功能

## 相关文档

- [配置文件详解](../ops-guides/roi-reference/configuration) - 了解完整的配置文件选项
- [命令参考](../ops-guides/roi-reference/command-reference) - 查看所有 ROI 命令，例如添加节点、删除节点等
