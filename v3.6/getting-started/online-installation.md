---
title: 安装
summary: 快速在线安装云帮.
toc: false
toc_not_nested: true
asciicast: true
---

<div class="filters filters-big clearfix">
    <a href="before-installation.html"><button class="filter-button ">安装前准备</button></a>
    <a href="online-installation.html"><button class="filter-button current"><strong>安装</strong></button></a>
</div>

{{site.data.alerts.callout_danger}}

- 安装前请阅读[安装前准备](before-installation.html)，在确定符合安装条件后执行安装操作

{{site.data.alerts.end}}

## 一键部署Rainbond

一键部署Rainbond是为了简化Rainbond安装步骤，通过shell脚本将Rainbond及其所需要的组件，统一进行安装及配置。用户仅需要简单的配置相关参数，运行shell命令即可。一键部署Rainbond适合仅简单了解Rainbond架构，想迅速搭建Rainbond的人群。

```bash
# git clone

git clone --depth 1 -b v3.6 https://github.com/goodrain/rainbond-install.git

# 或者

# 克隆或解压后，切换到云帮安装目录
cd rainbond-install*

# 执行安装命令
./setup.sh install
```

或者下载 [安装程序压缩包](https://github.com/goodrain/rainbond-install/archive/v3.6.zip)，解压后

执行 `./setup.sh install` 脚本可快速部署单节点的云帮。

安装程序会检查硬件配置、操作系统是否符合需求。然后安装配置Salt，通过Salt states进行云帮的安装。安装时间取决于机器配置和网速。

完成安装后可通过 `http://<your ip>:7070` 访问应用管理控制台。


{{site.data.alerts.callout_success}}
云帮安装程序通过 shell脚本+SaltStack 实现，包括后续集群的扩容、升级及管理。相关源码参见：[rainbond-install](https://github.com/goodrain/rainbond-install)
{{site.data.alerts.end}}


## 分步部署Rainbond

分步部署Rainbond是分组件一步一步的安装Rainbond及所需组件，用户可以定制相关的安装。分步部署Rainbond适合非常了解Rainbond架构，需要定制部署Rainbond的人群。

具体安装流程请参考[分步部署](../operation-manual/cluster-management/installation-configuration.html)

## 安装使用问题FAQ

- 通过rainbond-install安装请参照[WIKI](https://github.com/goodrain/rainbond-install/wiki)
- 安装使用问题，请参照 [平台安装，维护-常见问题](../FAQs/install-maintenance-faqs.html)

## 安装使用问题反馈

- [Github Issue](https://github.com/goodrain/rainbond/issues/new)
- [Github Install Issue](https://github.com/goodrain/rainbond-install/issues/new)
- 支持邮箱: rainbond@goodrain.com
