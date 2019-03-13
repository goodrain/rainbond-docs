---
title: "软件和硬件环境要求"
date: 2019-03-11T12:50:54+08:00
draft: false
weight: 802
---

#### 概述

Rainbond 作为一款开源PaaS平台，可以很好的部署和运行在 Intel 架构服务器环境及主流虚拟化环境，并支持绝大多数的主流硬件网络。

##### Linux 操作系统版本要求

|Linux发行版本|版本|
|--------|------------|
|Red Hat Enterprise Linux|7.4 64位|
|CentOS  | [7.4.1708](http://goodrain-pkg.oss-cn-shanghai.aliyuncs.com/system/CentOS/CentOS-7-x86_64-Minimal-1708.iso) 64位|
|Ubuntu  | 16.04 64位|
|Debian  | 9.x 64位|
|中标麒麟 | 服务器版V7.4 64位|

- Rainbond在CentOS 7.4的环境下进行过大量的测试，因此，建议使用CentOS 7.4的Linux操作系统来部署Rainbond
- 以上 Linux 操作系统可运行在物理服务器以及 VMware、KVM、XEN 主流虚拟化环境上。

#### 服务器要求

Rainbond 支持部署和运行在 Intel x86-64 架构的 64 位通用硬件服务器平台。对于开发测试，及生产环境的服务器硬件配置有以下要求和建议：

##### 开发测试环境

|服务器角色|CPU|内存|本地存储|网络|实例数量|
|--------|------------|------------|------------|------------|------------|
|管理节点| 4核|8G|`/ 100G`<br>`/cache 50G-100G`<br>`/opt/rainbond/data 100G`<br>`/var/lib/docker 100G+`|千兆网卡	|1,3...奇数|
|计算节点| 16核|64G|`/ 100G `  `/var/lib/docker 100G+ `|千兆网卡	|不限制|

- 验证测试环境中的计算节点可以和管理节点复用,复用时需要适当调高管理节点配置

##### 生产环境

|服务器角色|CPU|内存|本地存储|网络|实例数量|
|------|-----|-----|-----|-----|-----|
|管理节点| 8核|32G|`/ 100G`<br>`/cache 50G-100G`<br>`/opt/rainbond/data 100G`<br>`/var/lib/docker 100G+`|千兆网卡|3,5...计数|
|计算节点| 16核|64G|`/ 100G `  `/var/lib/docker 100G+ `|千兆网卡|不限制|
|存储节点|4核|8G|`/ 100G `  `/data 1T+ `|千兆网卡|3,4...|
|网关节点|4核|8G|`/ 100G `  `/var/lib/docker 100G+ `|千兆网卡|推荐至少3节点|

- 生产环境中，建议管理节点，计算节点，网关节点,存储节点单独部署
- 生产环境强烈推荐使用更高的配置

节点类型说明: 

|节点类型|功能说明|备注|
|-------|-------|-----|
|管理节点|Rainbond管理节点，集结平台自身组件，提供应用调度管理等高级功能|标识`manage`或`master`|
|计算节点|Rainbond计算节点，提供计算资源|标识`compute`或`worker`|
|Etcd节点|提供kubernetes所需etcd存储|默认部署于管理节点|
|网关节点|提供通向应用的网关|标识`lb`,默认部署于管理节点|
|存储节点|提供集群共享存储|标识`storage`,默认使用NFS存储，可对接其它存储(`/grdata`)|

#### 系统环境要求

* 确保机器重启，服务器IP地址和nameserver不发生改变，推荐配置静态ip
* 确定系统时间与时区(Asia/Shanghai)同步,节点间时间要同步
* 确定系统可以正常`yum/apt-get install`相关软件包，需要提前配置系统相关软件源
* 确定系统已禁用`NetworkManager`或者[配置NetworkManager](https://t.goodrain.com/t/calico-networkmanager/591)
* 节点资源：推荐要求4核,8G,100GB(2核4G40GB), 默认情况下节点会给系统预留1.5核CPU1.5G内存的资源
* 在线安装确定网络没有限制，如有请加如下域名添加到白名单 `repo.goodrain.com, api.goodrain.com, hub.goodrain.com, docker.io, domain.grapps.cn, aliyun.com,aliyuncs.com`

#### 网络要求

管理员可根据实际环境中部署Rainbond的方案，自行开放相关端口

管理节点和计算节点之间网络无限制
对外访问需要放行

```bash
管理节点 6060,7070
网关节点 80,443,8443,20000-30000(tcp应用端口)
```

{{% notice info %}}
默认情况下网关节点和管理节点复用;更多端口使用请阅读[组件端口](/user-operations/op-guide/required_ports/)
{{% /notice %}}

#### 客户端 Web 浏览器要求

建议用户采用高版本的Google Chrome访问