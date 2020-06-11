---
title: '快速安装'
weight: 104
description: '使用最简单，方便的方式安装 Rainbond。'
aliases:
    - /docs/quick-start/rainbond_install
---

本指南会使用最简单，最方便的方式部署 Rainbond。帮助你快速地评估 Rainbond。

如果你已经熟悉 Rainbond 或想了解其他更高级的安装方式，请查阅[安装 Rainbond](/docs/install/overview/)。

## 前提条件

- 如果开启了防火墙，确保其满足[端口要求](/docs/install/requirements/#port-requirements)。
- 硬件：2 核 CPU，8G 内存，50G 磁盘。
- 操作系统：`64 bit CentOS 7`, `64 bit Ubuntu 1604/1804`, `64 bit Debian 9/10`

详情请参考[安装要求](/docs/install/requirements/)。

## 安装步骤

### 下载文件

1. 获取二进制命令 easzup ，通过此命令完成后续安装操作

```bash
wget https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/offline/5.2/easzup && chmod +x easzup
```

### 配置免密钥登录

```bash
ssh-keygen -t rsa -b 2048 -N '' -f ~/.ssh/id_rsa
ssh-copy-id $IP  # $IP 为所有节点地址包括自身，按照提示输入 yes 和 root 密码
```

### 开始快速安装

1. 下载或检测离线镜像，二进制文件等，保存在`/etc/ansible`目录中

   ```bash
   ./easzup -D
   ```

2. 容器化运行 kubeasz

   ```bash
   ./easzup -S
   ```

3. 使用默认配置安装最小化 Rainbond 集群

   ```bash
   docker exec -it kubeasz easzctl start-aio
   ```

4. 执行完成后，出现以下提示：

   ```bash
   [INFO] save context: aio
   [INFO] save aio roles' configration
   [INFO] save aio ansible hosts
   [INFO] save aio kubeconfig
   [INFO] save aio kube-proxy.kubeconfig
   [INFO] save aio certs
   [INFO] Action successed : start-aio
   [INFO] Visit http://$IP:30008 to view the installation progress
   ```

5. 根据提示访问对应地址`http://$IP:30008`，查看 Rainbond 平台安装进度：

   ![image-20200611114421212](https://tva1.sinaimg.cn/large/007S8ZIlly1gfo7bjpmjxj31rw0u00wd.jpg)显示以上页面说明已经安装完成。点击 **访问地址**，注册并开始使用 Rainbond。

## 安装命令行工具

为了方便运维管理集群请参照[文档](/docs/user-operations/tools/grctl/)安装 `grctl` 命令行工具。

## 卸载

卸载程序将删除 RBAC 权限，rbd-system 命名空间和所有相关资源。

### 卸载 Rainbond

访问 Rainbond Operator 的 UI 界面，单击 **卸载** 即可。

### 卸载 Rainbond Operator

```bash
helm delete rainbond-operator -n rbd-system
```

### 清理相关文件

```bash
rm -rf /opt/rainbond
rm -rf /opt/kube/rainbond
```