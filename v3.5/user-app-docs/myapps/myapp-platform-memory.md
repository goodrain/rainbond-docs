---
title: 存储
summary: 您在容器中操作的数据是会随着容器的重启或停止而丢失的，所以需要将数据持久化存储到分布式存储中。
toc: false
---
<div id="toc"></div>

&emsp;&emsp;您在容器中操作的数据是会随着容器的重启或停止而**丢失**的，所以需要将数据持久化存储到分布式存储中（云帮公有云内置分布式存储，如果是私有化安装需要自行部署）。数据持久化就是将我们希望保存的数据保存到硬件存储中。云帮根据不同的构建方式，数据持久化的策略也有所不同。

## 通过源码构建

[源码构建](/docs/stable/user-app-docs/addapp/addapp-code.html)的应用默认持久化目录为`/data`，当然也支持自定义持久化目录，如图所示：

<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/myapp-platform-memory1.png" style="border:1px solid #eee;max-width:100%" />

您通过点击 **新增持久化设置** 来自定义您的持久化目录。您自定义的目录都会放在`/app`目录下，如：您自定义目录为`/upload`，最终您添加后的自定义持久化目录为`/app/upload`。

## 通过dockerfile构建

**dockerfile构建**的应用，持久化目录为自定义绝对路径，平台不会在自定义目录前追加目录。

{{site.data.alerts.callout_danger}}持久化目录不能是系统目录，因为挂载后该目录下以前的内容将不可用。{{site.data.alerts.end}}

{{site.data.alerts.callout_success}}挂载是指将一个设备（通常是存储设备）挂接到一个已存在的目录上。 我们要访问存储设备中的文件，必须将文件所在的分区挂载到一个已存在的目录上， 然后通过访问这个目录来访问存储设备。{{site.data.alerts.end}}

### 文件存储

<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/myapp-platform-memory2.png" style="border:1px solid #eee;max-width:100%" />

文件存储模块列表显示您在云帮的其它应用，该列表显示应用名称以及共享目录地址。您可以选择应用 **挂载** 到当前应用服务器下的根目录，挂载后的目录为根目录下对应的共享目录地址。