---
title: "自定义节点Pod CIDR"
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 1311
description: 自定义节点Pod CIDR
hidden: true
---

> 主要是针对calico网络而言

### 安装前自定义

```
grctl init --pod-cidr 192.168.0.0/16
```

{{% notice info %}}
如果不自定义的话,默认会根据宿主机ip段选择对应的pod的cidr.  
calico 宿主机(`192.168.0.0/16`)则pod的cidr为`10.0.0.0/16`,否则pod的cidr为`192.168.0.0/16`  
flannel 默认pod cidr为`10.244.0.0/16`
{{% /notice %}}

### 安装后自定义

这里以调整为 172.16.0.0/16为例，请注意，此调整将重启所有应用：

* 1. 调整所有节点的calico启动参数

```yaml
vi /opt/rainbond/conf/network.yaml
将：
-e CALICO_IPV4POOL_CIDR=192.168.0.0/16
更改为：
-e CALICO_IPV4POOL_CIDR=172.16.0.0/16
```

* 2. 调整所有节点的calico启动参数

```
ETCDCTL_API=3 etcdctl del /calico --prefix
```

* 3. 重启calico服务

```
node service update
```

* 4. 重启所有应用分配ip



