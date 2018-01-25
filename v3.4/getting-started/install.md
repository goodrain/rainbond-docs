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

<!--
&emsp;&emsp;通过grctl在线安装云帮。
-->
## 安装前准备

{{site.data.alerts.callout_danger}}

确保第一个节点可以ssh免密登陆其他节点。
安装前请务必确定是否满足前置条件。

{{site.data.alerts.end}}


## 安装

{{site.data.alerts.callout_danger}}
首先确保当前用户是root或者具有root权限。
{{site.data.alerts.end}}

### 快速安装

{% include copy-clipboard.html %}
```bash
# 通过此脚本可快速部署单节点的云帮，后续可以扩容。
bash <(curl -s http://repo.goodrain.com/install/3.4.1/start.sh)
```

<!--
### 拆分安装

- 安装grctl

{% include copy-clipboard.html %}
```bash
bash -c "$(curl -s repo.goodrain.com/install/grctl)"
```
grctl是云帮datacenter controller util,通过此命令初始化集群，扩容节点。更多细节请参考[组件：grctl](http://www.rainbond.com/docs/stable/platform-maintenance/add-management-node/component-introduction/grctl.html)

- 初始化集群

{% include copy-clipboard.html %}
```bash
# 默认会将第一个节点初始化为管理节点&计算节点
grctl init
```

- 安装计算节点服务

```bash
# 获取第一个节点的uid
uuid=$(cat /etc/goodrain/host_uuid.conf | awk -F '=' '{print $2}')
# 安装计算节点服务
grctl install compute --nodes $uuid
```

- 上线计算节点

```
grctl node up $uuid
# ready字段显示为true
grctl node list
```

- 访问web控制台

```
grctl show
<ip>:7070
```



- grctl

grctl是云帮datacenter controller util,通过此命令初始化集群，扩容节点。更多细节请参考[组件：grctl](http://www.rainbond.com/docs/stable/platform-maintenance/add-management-node/component-introduction/grctl.html)

-->

### 安装完成

访问控制台
```bash
grctl show 
<ip>:7070
```

### 扩容节点

- [扩容管理节点](http://www.rainbond.com/docs/stable/platform-maintenance/add-management-node/install-command.html)
- [扩容计算节点](http://www.rainbond.com/docs/stable/platform-maintenance/add-compute-node/install-command.html)

### 安装使用问题FAQ

- 安装使用问题，请参照 [平台安装，维护-常见问题](http://www.rainbond.com/docs/stable/FAQs/install-maintenance-faqs.html)
- [rainbond开源版本安装使用帮助](https://t.goodrain.com/t/rainbond/359)

### 安装使用问题反馈

- [Github Issue](https://github.com/goodrain/rainbond/issues/new)
- 支持邮箱: rainbond@goodrain.com

### 高可用说明

{{site.data.alerts.callout_danger}}
- 首先应安装云帮的主节点(上面的命令即是安装主节点的命令)。
- 主节点具备云帮平台的所有功能，但不支持高可用。
- 高可用特性需要将集群管理节点至少扩容到3个节点。
{{site.data.alerts.end}}
