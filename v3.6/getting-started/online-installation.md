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

## 一、版本选择

| 版本|说明|
|--------|---------|
|Mainline v3.6|主力开发的版本，包含最新功能。推荐开发测试环境使用|
|Stable v3.5.2|当前稳定版本，只修复Bug，不做功能更新，生产环境推荐使用|

## 二、一键部署Rainbond

一键部署Rainbond是为了简化Rainbond安装步骤，通过shell脚本将Rainbond及其所需要的组件，统一进行安装及配置。用户仅需要简单的配置相关参数，运行shell命令即可。一键部署Rainbond适合仅简单了解Rainbond架构，想迅速搭建Rainbond的人群。

```bash
# git clone
git clone --depth 1 -b v3.6 https://github.com/goodrain/rainbond-install.git
# 或者下载压缩包
wget https://github.com/goodrain/rainbond-install/archive/v3.6.zip
unzip v3.6.zip
# 克隆或解压后，切换到云帮安装目录
cd rainbond-install*
# 执行安装命令
./setup.sh install
# 完成安装后可通过访问管理控制台,默认第一个注册用户为平台管理员
http://<your ip>:7070
```

{{site.data.alerts.callout_success}}
云帮安装程序通过 shell脚本+SaltStack 实现，包括后续集群的扩容、升级及管理。相关源码参见：[rainbond-install](https://github.com/goodrain/rainbond-install)
{{site.data.alerts.end}}


## 三、分步部署Rainbond

分步部署Rainbond是分组件一步一步的安装Rainbond及所需组件，用户可以定制相关的安装。分步部署Rainbond适合非常了解Rainbond架构，需要定制部署Rainbond的人群。

具体安装流程请参考[分步部署](../operation-manual/cluster-management/installation-configuration.html)

## 四、安装使用问题FAQ

- 通过rainbond-install安装请参照[WIKI](https://github.com/goodrain/rainbond-install/wiki)
- 安装使用问题，请参照 [平台安装，维护-常见问题](../FAQs/install-maintenance-faqs.html)

## 五、安装使用问题反馈

- [Github Issue](https://github.com/goodrain/rainbond/issues/new)
- [Github Install Issue](https://github.com/goodrain/rainbond-install/issues/new)
- 支持邮箱: rainbond@goodrain.com
