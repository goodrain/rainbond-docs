---
title: '基于 Linux 最小化安装'
weight: 1
description: '在单节点的 Linux 服务器上安装 Kubernetes 和 Rainbond。'
---

最小化安装会把 Kubernetes 和 Rainbond 全安装在一个 Linux 节点上，可以帮助你节省资源。但是对生产环境确实不友好的，如果你需要安装一个生产集群，请产考[在 Linux 上安装高可用的 Rainbond](/docs/install/install-from-linux/high-availability/)。

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

```bash
wget https://rainbond-pkg.oss-cn-shanghai.aliyuncs.com/offline/5.2/easzup && chmod +x easzup && ./easzup -D
```

### 开始安装

1. **可选项**，在需要设置公网IP为 Rainbond 集群的访问地址时，请执行以下命令
	
	```bash
	export EIP=公网IP
	```
	
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

## 常见问题排查

1. 若服务器的 `sshd` 服务不使用默认 22 端口安装时，在执行安装步骤 2 前按如下格式修改 `/etc/ansible/example/hosts.allinone` 文件，其中`$PORT`为 `sshd` 服务端口

   ```bash
   [etcd]
   192.168.1.1 NODE_NAME=etcd1 ansible_ssh_port=$PORT
   [kube-master]
   192.168.1.1 ansible_ssh_port=$PORT
   [kube-node]
   192.168.1.1 ansible_ssh_port=$PORT
   ```

2. `http://$IP:30008`或`http://$IP:7070`无法访问：

   导致此问题的原因可能是访问地址所提示的 IP 地址或端口无法访问，建议检查从客户端到访问地址 IP 的网络是否正常，网络正常时检查防火墙安全组策略等是否开发对应端口的访问权限，如果使用的是阿里云的 ECS 资源，确定显示的 IP 地址是否为外网 IP

3. 访问控制台后无法注册用户：

   导致此问题的原因可能是 console 数据库初始化失败，通过以下操作重新初始化 console 数据库后再次注册

   - 进入 rbd-db 的 pod 

     ```bash
     kubectl exec -it -n rbd-system rbd-db-0 bash
     ```

   - 登录数据库

     ```bash
     mysql -p$MYSQL_ROOT_PASSWORD
     ```

   - 删除 console 库

     ```mysql
     drop database console;
     ```

   - 删除数据库初始化 job ，使其再次运行

     ```bash
     kubectl delete job -n rbd-system rbd-app-ui-migrations
     ```

   - 等待数据库初始化完成，完成后 STATUS 为 Completed

     ```bash
     kubectl get po -n rbd-system -l name=rbd-app-ui-migrations
     ```

在安装和使用过程中出现的其他问题请参考[安装过程故障排除文档](/docs/user-operations/install/troubleshooting)和[集群问题诊断文档](/docs/user-operations/troubleshoot/cluster_troubleshooting)

