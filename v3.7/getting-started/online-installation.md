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

## 一、版本选择

| 版本|说明|
|--------|---------|
|Stable v3.7.0|当前稳定版本|


## 二、一键部署

一键部署Rainbond是为了简化Rainbond安装步骤，通过shell脚本将Rainbond及其所需要的组件，统一进行安装及配置。用户仅需要简单的配置相关参数，运行shell命令即可。一键部署Rainbond适合仅简单了解Rainbond架构，想迅速搭建Rainbond的人群。

```bash
# 方法一
wget https://pkg.rainbond.com/releases/common/v3.7.0/grctl
chmod +x ./grctl
./grctl init

# 方法二
mkdir -p /opt/rainbond
git clone --depth 1 -b v3.7 https://github.com/goodrain/rainbond-install.git /opt/rainbond/install
cd /opt/rainbond/install
./setup.sh
```
安装完成后检查,当所有项目都是健康状态时平台即可正常使用。

```
# 集群整体状态
grctl cluster

# 集群节点状态
grctl node list
```

## 三、离线部署

离线安装具体流程请参考[离线部署](../operation-manual/install/offline/setup.html)

<!--
## 四、分步部署

分步部署Rainbond是分组件一步一步的安装Rainbond及所需组件，用户可以定制相关的安装。分步部署Rainbond适合非常了解Rainbond架构，需要定制部署Rainbond的人群。

具体安装流程请参考[分步部署](../operation-manual/install/step/part-salt.html)


## 五、源码部署

从源码安装具体流程请参考[源码部署](../operation-manual/install/source/setup.html)
-->

{{site.data.alerts.callout_danger}}
3.7版本安装有所调整,将镜像拉取集中到一步，导致这步耗时比较长, 正常情况下大概需要8-20分钟。如果这步出现报错，请重新执行安装命令，如有其他报错，请与我们反馈 [Github](https://github.com/goodrain/rainbond-install/issues/new?template=install-error-report.md)。
{{site.data.alerts.end}}

{{site.data.alerts.callout_success}}
云帮安装程序通过 shell脚本+SaltStack 实现，包括后续集群的扩容、升级及管理。相关源码参见：[rainbond-install](https://github.com/goodrain/rainbond-install)  
节点扩容, 请参照 [运维手册, 节点扩容](../operation-manual/cluster-management/add-compute-node.html)  
安装问题, 请参照 [运维手册，安装部署-集群安装问题排查](../operation-manual/trouble-shooting/install-issue.html)   
使用问题, 请参照 [运维手册，平台维护-集群故障排查](../operation-manual/trouble-shooting/issue.html)  
{{site.data.alerts.end}}
