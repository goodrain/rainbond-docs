---
title: 基于阿里云IaaS资源安装Rainbond
summary: 此方式适用于你使用阿里云服务资源，此方式我们将使用阿里云 ECS+NAS+专有网络(弹性IP)等资源。
toc: true
toc_not_nested: true
asciicast: true
---

<div id="toc"></div>

通过阿里云相关产品快速部署Rainbond。

## 一. 部署结构



## 二. 部署流程

在阿里云同一个区域内开通ECS,NAS服务, 服务器内部网络未限制。

创建ECS 参考[ECS入门](https://help.aliyun.com/document_detail/58282.html?spm=a2c4g.11186623.6.611.3a183002dRnSqd)
创建NAS 参考[NAS](https://help.aliyun.com/document_detail/27526.html?spm=a2c4g.11186623.3.2.53a67a66p9mopj)

### 2.1 配置NAS

{{site.data.alerts.callout_danger}}
阿里云推荐使用NAS,经过我们大量的生产测试环境使用，挂载NAS需要使用v3版本，切勿使用v4版本，否则会存在文件锁。
{{site.data.alerts.end}}

要在 Linux 系统中将 NAS 的 NFS 文件系统挂载至 ECS 实例，您需要安装 NFS 客户端。
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
```

### 2.2 初始化数据中心

```bash
wget https://pkg.rainbond.com/releases/common/v5.0/grctl
chmod +x ./grctl
./grctl init --iip <内网ip> --eip <弹性ip/lb所在公网ip>
```

### 2.3 添加节点

```
# 添加管理节点
grctl node add --host manage01 --iip <管理节点ip> -p <root密码> --role master 
## 法2默认已经配置ssh信任登陆
grctl node add --host manage01 --iip <管理节点ip> --key /root/.ssh/id_rsa.pub --role master

# 添加计算节点
grctl node add --host compute01 --iip <计算节点ip> -p <root密码> --role worker
## 法2默认已经配置ssh信任登陆
grctl node add --host compute01 --iip <计算节点ip> --key /root/.ssh/id_rsa.pub --role worker


# 安装节点，节点uid可以通过grctl node list获取
grctl node install <新增节点uid> 

# 节点安装日志在/grdata/downloads/log/目录下
```

### 2.4 安全组配置

默认情况下,只需要开放80,6060,7070端口即可。




