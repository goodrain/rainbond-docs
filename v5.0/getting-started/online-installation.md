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

## 二、单节点一键部署

一键部署 Rainbond 是为了简化 Rainbond 安装步骤，通过 shell 脚本将 Rainbond 及其所需要的组件，统一进行安装及配置。用户仅需要简单的配置相关参数，运行 shell 命令即可。一键部署 Rainbond 适合仅简单了解 Rainbond 架构，想迅速搭建 Rainbond 的人群。

安装前请阅读[grctl参数相关说明](https://github.com/goodrain/rainbond-ansible/tree/devel/docs/guide)  

```bash
wget https://pkg.rainbond.com/releases/common/v5.0/grctl
chmod +x ./grctl
./grctl init 
```

安装完成后检查,当所有项目都是健康状态时平台即可正常使用。

```bash
# 集群整体状态
grctl cluster

# 集群节点状态
grctl node list

# 控制台访问地址
<管理节点>:7070
```

## 三、源码部署


安装前请阅读[源码安装相关说明](https://github.com/goodrain/rainbond-ansible/tree/devel/docs/guide)  

通过执行ansible相关命令来执行安装

```
# 更新 /opt/rainbond/rainbond-ansible/scripts/installer/global.sh，示例如下，除INSTALL_TYPE和DEPLOY_TYPE外其他都可以更改

INSTALL_TYPE="online"
POD_NETWORK_CIDR=""
DEPLOY_TYPE="onenode"
NETWORK_TYPE="calico"
IIP="192.168.56.5"
DOMAIN=""
```

安装操作

```
# 项目需要git clone到/opt/rainbond目录下
mkdir -pv /opt/rainbond
cd /opt/rainbond
git clone -b 5.0 --depth 1 https://github.com/goodrain/rainbond-ansible.git 
cd rainbond-ansible
# 更新global.sh后执行安装
./setup.sh
```

<!--
## 三、离线部署
离线安装具体流程请参考[离线部署](../operation-manual/install/offline/setup.html)

## 四、分步部署

分步部署Rainbond是分组件一步一步的安装Rainbond及所需组件，用户可以定制相关的安装。分步部署Rainbond适合非常了解Rainbond架构，需要定制部署Rainbond的人群。

具体安装流程请参考[分步部署](../operation-manual/install/step/part-salt.html)


## 五、源码部署

从源码安装具体流程请参考[源码部署](../operation-manual/install/source/setup.html)

-->

{{site.data.alerts.callout_danger}}
5.0 版本安装有所调整,如果安装过程中有报错且提示ignore,可忽略此报错。如有报错，请与我们反馈 [Github](https://github.com/goodrain/rainbond-ansible/issues)。
{{site.data.alerts.end}}


{{site.data.alerts.callout_success}}
云帮安装程序通过 shell 脚本 + ansible 实现，包括后续集群的扩容、升级及管理。相关源码参见：[rainbond-ansible](https://github.com/goodrain/rainbond-ansible)  
节点扩容, 请参照 [运维手册, 节点扩容](../operation-manual/cluster-management/add-node.html) 
{{site.data.alerts.end}}

## 四、部署完成后的引导

平台部署完成后，下面的文章可以引导你快速上手Rainbond。

<div class="step">
<a href="./quick-learning.html" class="btn">开始部署管理你的应用</a>
</div>
