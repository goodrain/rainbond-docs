---
title: 安装
summary: 快速在线安装云帮.
toc: true
toc_not_nested: true
asciicast: true
---

## 一、版本选择

| 版本          | 说明         |
| ------------- | ------------ |
| Dev v5.0.0 | 当前测试版本 |
| Stable v3.7.2 | 最新稳定版本 |

## 二、一键部署

一键部署 Rainbond 是为了简化 Rainbond 安装步骤，通过 shell 脚本将 Rainbond 及其所需要的组件，统一进行安装及配置。用户仅需要简单的配置相关参数，运行 shell 命令即可。一键部署 Rainbond 适合仅简单了解 Rainbond 架构，想迅速搭建 Rainbond 的人群。

```bash
wget https://pkg.rainbond.com/releases/common/v5.0/grctl
chmod +x ./grctl
./grctl init --iip <管理节点内网ip>
```

安装完成后检查,当所有项目都是健康状态时平台即可正常使用。

```
# 集群整体状态
grctl cluster

# 集群节点状态
grctl node list

# 控制台访问地址
<管理节点>:7070
```

## 三、手动部署

通过执行ansible相关命令来执行安装

```
# 默认配置在目录下 rainbond-ansible/scripts/installer/global.sh
## 自定义项
IIP="" #内网ip
DOMAIN="" #域名，如果需要指定自定义域名
NETWORK_TYPE="calico" #支持calico和flannel

## 默认项，也需定义
INSTALL_TYPE="online"
DEPLOY_TYPE="onenode"

# 节点信息 rainbond-ansible/inventory/hosts
```

安装操作

```
# 项目需要git clone到/opt/rainbond目录下
cd /opt/rainbond/rainbond-ansible
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

<!--
{{site.data.alerts.callout_success}}
云帮安装程序通过 shell 脚本 + ansible 实现，包括后续集群的扩容、升级及管理。相关源码参见：[rainbond-install](https://github.com/goodrain/rainbond-install)  
节点扩容, 请参照 [运维手册, 节点扩容](../operation-manual/cluster-management/add-compute-node.html)  
安装问题, 请参照 [运维手册，安装部署-集群安装问题排查](../operation-manual/trouble-shooting/install-issue.html)  
使用问题, 请参照 [运维手册，平台维护-集群故障排查](../operation-manual/trouble-shooting/issue.html)  
{{site.data.alerts.end}}

-->

## 四、部署完成后的引导

平台部署完成后，下面的文章可以引导你快速上手Rainbond。

<div class="btn-group btn-group-justified">
<a href="./quick-learning.html" class="btn" style="background-color:#F0FFE8;border:1px solid #28cb75">快速上手</a>
</div>
