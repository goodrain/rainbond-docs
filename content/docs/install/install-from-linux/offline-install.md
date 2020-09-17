---
title: '基于 Linux 最小化离线安装'
weight: 1
description: '在单节点的 Linux 服务器上离线安装 Kubernetes 和 Rainbond。'
---

## 前提条件

- 如果开启了防火墙，确保其满足[端口要求](/docs/install/requirements)。
- 硬件：2 核 CPU，8G 内存，50G 磁盘。
- 设置服务器时区为`shanghai`，并同步时间
- 操作系统：
  - `CentOS 7` [升级内核到最新稳定版](https://t.goodrain.com/t/topic/1305)
  - `Ubuntu 1604/1804`
  - `Debian 9/10`

## 安装步骤

### 配置免密钥登录
**`$IP`为所有节点地址包括自身，按照提示输入 yes 和 root 密码**

```bash
ssh-keygen -t rsa -b 2048 -N '' -f ~/.ssh/id_rsa
ssh-copy-id $IP
```

### 下载安装包
1. 在有网环境获取离线包
	
	```bash
	wget https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/offline/5.2/Rainbond-5.2.1-release-offline.tgz
	```
	
2. 解压至需安装节点的`/etc/ansible`目录中
	
	```bash
	mkdir /etc/ansible && tar xvf Rainbond-5.2.1-release-offline.tgz -C /etc/ansible
	```
	
3. 验证安装包完整性
	
	```bash
	cd /etc/ansible/tools && ./easzup -D
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
{{<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/install/install-from-linux/install-success.jpg" title="安装验证" width="100%">}}

显示以上页面说明已经安装完成。点击 **访问地址**，注册并开始使用 Rainbond。
