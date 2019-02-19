---
title: 基于阿里云IaaS资源安装Rainbond
summary: 此方式适用于你使用阿里云服务资源，此方式我们将使用阿里云 ECS+NAS+专有网络(弹性IP)等资源。
toc: true
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

## 一、部署说明

通过阿里云相关产品快速部署Rainbond,主要使用阿里云ECS和NAS,弹性IP,NAT网关可以选用。

### 机器资源准备

我们在阿里云有大量生产实践经验，如下配置为推荐配置，建议参考

> 操作系统推荐,经过我们验证推荐

|操作系统|版本|
|--|--|
|CentOS|7.4|
|Debian|9.6|
|Ubuntu|16.04|

> 单台服务器配置要求

|服务器角色|CPU|内存|            
|------|-----|-----|
|管理节点| 4核|16G|
|计算节点| 16核|64G|

> 单台服务器磁盘配置

```
管理节点:
/ 100G
/cache 50G-100G #源码构建cache
/opt/rainbond/data 100G #etcd,数据库等相关数据持久化目录
/var/lib/docker 100G+ (至少100G起)

计算节点:
/ 100G
/var/lib/docker 100G+ /var/lib/docker
```

磁盘推荐使用`SSD云盘`,根分区可以考虑高效云盘。

> NAS选型

NAS默认选择 `SSD性能型`即可,推荐，满足Rainbond使用。也可以根据需求选用NASPlus等产品

> 网络选项

专有网络,确保管理节点和计算节点,NAS在同一地域,且所有节点在同一个ip段下.可以考虑NAT网关.

> 安全方面限制

如果需要公网访问，安全组需要对外放行80,6060,7070端口，以及ssh端口,内部网络不限制。

## 二、 部署流程

在阿里云同一个区域内开通ECS,NAS服务, 服务器内部网络未限制。

创建ECS 参考[ECS入门](https://help.aliyun.com/document_detail/58282.html?spm=a2c4g.11186623.6.611.3a183002dRnSqd)  
创建NAS 参考[NAS](https://help.aliyun.com/document_detail/27526.html?spm=a2c4g.11186623.3.2.53a67a66p9mopj)  

### 2.1 节点规划

根据需求具体规划节点数目。  
管理节点：主要运行k8s组件和rainbond相关组件，推荐1或3节点，奇数节点；  
计算节点：主要运行应用节点，不作限制,在计算资源不足时可以方便扩容；  
网关节点：默认情况下是和管理节点复用，要求弹性ip需要绑定到网关节点所在机器，必要时可单独部署rbd-gateway服务。  

### 2.2 配置NAS

{{site.data.alerts.callout_danger}}
阿里云推荐使用NAS,经过我们大量的生产测试环境使用，挂载NAS需要使用v3版本，切勿使用v4版本，否则会存在文件锁问题。
{{site.data.alerts.end}}

要在 Linux 系统中将 NAS 的 NFS 文件系统挂载至 ECS 实例，您需要安装 NFS 客户端，目前所有节点都需要提前挂载好NAS。
操作步骤：

```bash
# 登陆ECS实例
# 安装NFS客户端
## CentOS系统
sudo yum install nfs-utils
## Debian/Ubuntu系统
sudo apt-get install nfs-common
## 创建NAS挂载点
mkdir /grdata
## 更新/etc/fstab示例,挂载点域名需要替换成在创建文件系统时自动生成的挂载点域名
rainbond-test.cn-shanghai.nas.aliyuncs.com:/   /grdata    nfs vers=3,nolock,noatime   0 0
## 挂载
mount -a
# 查看挂载信息
mount -l | grep grdata
```

### 2.3 初始化数据中心

在第一个管理节点执行初始化数据中心命令,默认情况下第一个节点管理节点和计算节点复用

```bash
wget https://pkg.rainbond.com/releases/common/v5.0/grctl
chmod +x ./grctl
./grctl init --iip <内网ip> --eip <弹性ip/lb所在公网ip>
```

### 2.4 添加节点

```
# 添加管理节点
grctl node add --host <managexx> --iip <管理节点内网ip> -p <root密码> --role master 
## 法2默认已经配置ssh信任登陆
grctl node add --host  <managexx>  --iip <管理节点内网ip> --key /root/.ssh/id_rsa.pub --role master

# 添加计算节点
grctl node add --host <computexx> --iip <计算节点内网ip> -p <root密码> --role worker
## 法2默认已经配置ssh信任登陆
grctl node add --host <computexx> --iip <计算节点内网ip> --key /root/.ssh/id_rsa.pub --role worker

# 安装节点，节点uid可以通过grctl node list获取
grctl node install <新增节点uid> 

# 确定计算节点处于非unhealth状态下，可以上线节点
grctl node up <新增节点uid>
```

节点安装日志在/grdata/downloads/log/目录下

### 2.5 确定集群状态

安装完成后，在当前节点执行：

```bash
grctl cluster
```
如果有节点处于unhealth,通过`grctl node get <unhealth节点uid>`确定哪个服务异常，来排查哪个服务异常。
