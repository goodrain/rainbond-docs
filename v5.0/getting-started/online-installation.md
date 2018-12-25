---
title: 安装
summary: 快速在线安装云帮.
toc: true
toc_not_nested: true
asciicast: true
---

<div class="filters filters-big clearfix">
    <a href="before-installation.html"><button class="filter-button ">安装前准备</button></a>
    <a href="online-installation.html"><button class="filter-button current"><strong>安装</strong></button></a>
</div>

{{site.data.alerts.callout_danger}}

- 安装前请务必阅读[安装前准备](before-installation.html)，在确定符合安装相关条件后执行安装操作。

{{site.data.alerts.end}}

## 一、版本信息

| 版本          | 说明         |
| ------------- | ------------ |
| Dev v5.0 | 最新版本 |

## 二、一键初始化数据中心

一键部署 Rainbond 是为了简化 Rainbond 安装步骤，通过 shell 脚本将 Rainbond 及其所需要的组件，统一进行安装及配置。用户仅需要简单的配置相关参数，运行 shell 命令即可。一键部署 Rainbond 适合仅简单了解 Rainbond 架构，想迅速搭建 Rainbond 的人群,默认会初始化一个单节点的数据中心。

安装前请阅读[grctl参数相关说明](https://github.com/goodrain/rainbond-ansible/tree/devel/docs/guide)  

```bash
wget https://pkg.rainbond.com/releases/common/v5.0/grctl
chmod +x ./grctl
./grctl init --iip 内网ip --eip 公网ip # 参数可选， iip多网卡时需要手动指定, eip云服务商部署时可以指定公网ip,其他参数可以grctl init --help
```

安装完成后检查,当所有服务都是健康状态时平台即可正常使用。

```bash
# 集群整体状态
grctl cluster

# 集群节点状态
grctl node list

# 控制台访问地址
<管理节点>:7070
```

## 三、数据中心添加节点

为当前数据中心添加计算资源节点,增强应用负载能力,相关操作命令如下：

```bash
grctl node add --host <主机名> --iip <计算资源节点ip> -p <root用户密码> --role compute
# 获取新添加节点的uid
grctl node list 
grctl node install <新计算资源节点的uid>
```

更多细节可以参考 [运维手册, 添加节点](../operation-manual/cluster-management/add-node.html) 

## 四、其他部署方式

从源码安装具体流程请参考[源码部署](../operation-manual/install/source/setup.html)

{{site.data.alerts.callout_danger}}
云帮安装程序通过 shell 脚本 + ansible 实现，包括后续集群的扩容、升级及管理。如在安装使用中遇到问题，请与我们反馈 [Github](https://github.com/goodrain/rainbond-ansible/issues)。
{{site.data.alerts.end}}

## 五、部署完成后的引导

平台部署完成后，下面的文章可以引导你快速上手Rainbond。

<div class="btn-group btn-group-justified">
  <a href="./quick-learning.html" class="btn" style="background-color:#F0FFE8;border:1px solid #28cb75">开始部署管理你的应用</a>
  <a href="../operation-manual/cluster-management/ha-cluster.html" class="btn" style="background-color:#F0FFE8;border:1px solid #28cb75">高可用部署调整</a>
</div>