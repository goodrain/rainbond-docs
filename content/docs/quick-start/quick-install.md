---
title: '快速安装'
weight: 104
description: '使用最简单，方便的方式安装 Rainbond。'
aliases:
    - /docs/quick-start/rainbond_install
---

本指南会使用最简单，最方便的方式安装 Rainbond。帮助你快速地评估 Rainbond。

如果你已经熟悉 Rainbond 或想了解其他更高级的安装方式，请查阅[安装 Rainbond](/docs/install/overview/)。

## 前提条件

- 如果开启了防火墙，确保其满足[端口要求](/docs/install/requirements)。
- 硬件：2 核 CPU，8G 内存，50G 磁盘。
- 操作系统：`64 bit CentOS 7`, `64 bit Ubuntu 1604/1804`, `64 bit Debian 9/10`
- NFS 客户端。如果没有安装，可以参考：
    ```bash
    # CentOS 系统
    yum install -y nfs-utils
    # Ubuntu/Debian 系统
    apt install -y nfs-common
    ```

## 安装步骤

### 配置免密钥登录

```bash
ssh-keygen -t rsa -b 2048 -N '' -f ~/.ssh/id_rsa
ssh-copy-id $IP  # $IP 为所有节点地址包括自身，按照提示输入 yes 和 root 密码
```

### 下载安装包

```bash
wget https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/offline/5.2/easzup && chmod +x easzup && ./easzup -D
```

### 开始安装

1. 使用默认配置安装最小化 Rainbond 集群
	```bash
	./easzup -S && docker exec -it kubeasz easzctl start-aio
	```
	
1. 执行完成后，出现以下提示：
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
	
1. 根据提示访问对应地址`http://$IP:30008`，查看 Rainbond 平台安装进度：
		![image-20200611114421212](https://tva1.sinaimg.cn/large/007S8ZIlly1gfo7bjpmjxj31rw0u00wd.jpg)显示以上页面说明已经安装完成。点击 **访问地址**，注册并开始使用 Rainbond。
