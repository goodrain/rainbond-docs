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

### 2.1 挂载NAS

{{site.data.alerts.callout_danger}}
注意：挂载NAS需要使用v3版本，切勿使用v4版本，否则会存在文件锁。
{{site.data.alerts.end}}

```bash
mkdir /grdata
# 编辑/etc/fstab
rainbond-test.cn-shanghai.nas.aliyuncs.com:/   /grdata    nfs vers=3,nolock,noatime   0 0
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




