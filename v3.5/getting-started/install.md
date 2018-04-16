---
title: 安装
summary: 快速在线安装云帮.
toc: false
toc_not_nested: true
asciicast: true
---

<div class="filters filters-big clearfix">
    <a href="pre-install.html"><button class="filter-button ">安装前准备</button></a>
    <a href="install.html"><button class="filter-button current"><strong>安装</strong></button></a>
</div>

<div id="toc"></div>

{{site.data.alerts.callout_danger}}

- 安装前请阅读[安装前准备](/docs/stable/getting-started/pre-install.html)，在确定符合安装条件后执行安装操作

{{site.data.alerts.end}}

## 快速安装

#### 方案方法一(GAOps)

```
# 通过此脚本可快速部署单节点的云帮
bash <(curl -s http://repo.goodrain.com/install/3.5/start.sh)
```
#### 安装方法二 (Rainbond-install)

```
# 通过此脚本可快速部署单节点的云帮
curl -k -L -o install.sh  https://raw.githubusercontent.com/goodrain/rainbond-install/master/install.sh
chmod +x ./install.sh
./install.sh
```

{{site.data.alerts.callout_info}}
方法二源码地址[rainbond-install](https://github.com/goodrain/rainbond-install)
后续安装升级推荐方法二，方法一下个版本不在维护。
{{site.data.alerts.end}}


## 安装完成

访问控制台

`<your ip>:7070`

## 扩容节点

- [扩容计算节点](/docs/stable/platform-maintenance/add-compute-node/install-command.html)

## 安装使用问题FAQ

- 安装使用问题，请参照 [平台安装，维护-常见问题](/docs/stable/FAQs/install-maintenance-faqs.html)
- [rainbond开源版本安装使用帮助](https://t.goodrain.com/t/rainbond/359)
- 通过rainbond-install安装请参照[WIKI](https://github.com/goodrain/rainbond-install/wiki)

## 安装使用问题反馈

- [Github Issue](https://github.com/goodrain/rainbond/issues/new)
- [Github Install Issue](https://github.com/goodrain/rainbond-install/issues/new)
- 支持邮箱: rainbond@goodrain.com

## Demo install

<iframe allowFullScreen frameborder="0" height="564" mozallowfullscreen src="https://player.vimeo.com/video/253097354" webkitAllowFullScreen width="640"></iframe>
