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

{{site.data.alerts.callout_info}}

云帮3.5开源版上线，我们会采用全新的安装方式。[旧的安装方式](/docs/stable/getting-started/install.html#part-4aae9ca17b67bb1f)支持安装云帮3.5开源版的安装，后续版本将暂停维护，且本提示保留至云帮3.6版本发布。

{{site.data.alerts.end}}

<div id="toc"></div>

{{site.data.alerts.callout_danger}}

- 安装前建议阅读[安装前准备](/docs/stable/getting-started/pre-install.html)，安装时会检查系统环境是否符合安装条件
- 首先确保当前用户是root或者具有root权限。

{{site.data.alerts.end}}

## 快速安装

当前安装是通过git工具克隆安装程序源码到本地开始安装，您需要的操作：

1、 下载安装脚本

   {% include copy-clipboard.html %}

   ```bash
   curl -k -L -o install.sh  https://raw.githubusercontent.com/goodrain/rainbond-install/master/install.sh
   ```

2、 修改权限

   {% include copy-clipboard.html %}

   ```bash
   chmod +x ./install.sh
   ```

3、 执行安装

   {% include copy-clipboard.html %}

   ```bash
   ./install.sh
   ```

   {{site.data.alerts.callout_info}}

安装脚本后可追加参数获取更多

   - args:
     - help   获取帮助信息
     - dev     强制安装，忽略CPU、内存等检查
     - 无参数则默认安装

   - 安装程序源码地址[https://github.com/goodrain/rainbond-install](https://github.com/goodrain/rainbond-install)

   {{site.data.alerts.end}}

<!--

## 拆分安装

- 安装grctl

{% include copy-clipboard.html %}
```bash
bash -c "$(curl -s repo.goodrain.com/install/grctl)"
```
grctl是云帮datacenter controller util,通过此命令初始化集群，扩容节点。更多细节请参考[组件：grctl](https://www.rainbond.com/docs/stable/platform-maintenance/add-management-node/component-introduction/grctl.html)

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

grctl是云帮datacenter controller util,通过此命令初始化集群，扩容节点。更多细节请参考[组件：grctl](https://www.rainbond.com/docs/stable/platform-maintenance/add-management-node/component-introduction/grctl.html)

-->

## 安装完成

访问控制台

`<your ip>:7070`

## 扩容节点

<!-- - [扩容管理节点](https://www.rainbond.com/docs/stable/platform-maintenance/add-management-node/install-command.html)-->
- [扩容计算节点](/docs/stable/platform-maintenance/add-compute-node/install-command.html)

## 安装使用问题FAQ

- 安装使用问题，请参照 [平台安装，维护-常见问题](/docs/stable/FAQs/install-maintenance-faqs.html)
- [rainbond开源版本安装使用帮助](https://t.goodrain.com/t/rainbond/359)

## 安装使用问题反馈

- [Github Issue](https://github.com/goodrain/rainbond/issues/new)
- 支持邮箱: rainbond@goodrain.com

<!--
## 高可用说明

{{site.data.alerts.callout_danger}}
- 首先应安装云帮的主节点(上面的命令即是安装主节点的命令)。
- 主节点具备云帮平台的所有功能，但不支持高可用。
- 高可用特性需要将集群管理节点至少扩容到3个节点。
  {{site.data.alerts.end}}
  -->

## 旧的安装方式

```
# 通过此脚本可快速部署单节点的云帮，后续可以扩容。
bash <(curl -s http://repo.goodrain.com/install/3.5/start.sh)
```

## Demo install

<iframe allowFullScreen frameborder="0" height="564" mozallowfullscreen src="https://player.vimeo.com/video/253097354" webkitAllowFullScreen width="640"></iframe>

##  
