---
title: 配置端口
summary: 配置端口
toc: false
---

<div id="toc"></div>

- **端口** 是设备与外界通讯交流的出口。云帮为您的应用提供了 **端口** 功能，您可以自定义当前应用的端口设置。

## 添加端口

- 点击 **添加端口** 即可以为您的应用添加一个可以自定义的端口。

<center><img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/V3.5/myapp-port3.png" style="border:1px solid #eee;width:60%" /></center>

- 图中元素的意义
  - **端口** 自定义的端口号。端口号的取值范围从0到65535。
  - **协议** 自定义协议类型，提供了 **http** 、**TCP** 、**UDP** 、**mysql** 几种类型的协议。
- 大多数应用在构建完成后都会设定好所需要的端口和协议类型。为了方便区分用途，我们将端口的类型分为 **对外服务** 和 **对内服务** 两种。

## 对外服务

### 作用与机制

- **对外服务** 的端口，通过将应用的端口暴露在公网上，允许公网通过 **访问地址** 访问该应用。

<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/V3.5/myapp-port1.png" style="border:1px solid #eee;width:100%" />

- 图中元素的意义

  - **端口号** 当前端口的端口号。

  - **端口协议** 指定了该端口所遵循的协议类型，您可以点击右侧的按钮修改当前协议类型。**http** 即超文本传输协议，将超文本从WEB服务器传送到本地浏览器的传输协议，默认端口号80.

  - **服务信息** 在这里开启此端口对外服务的开关，通过 **访问地址** 中的URL即可访问当前应用的此端口。这个URL在当前设置下可被公网访问。

  - **绑定域名** 点击 **新增域名** 可以将一个合法的域名与 **访问地址** 绑定，绑定后，您不需要输入复杂的URL，只需要搜索对应的域名即可访问应用。详情参见[[如何为应用设置一个自己的域名](https://t.goodrain.com/t/topic/251)](http://t.goodrain.com/t/topic/251)

  - **操作** 在这里可以删除该端口。

## 对内服务

### 作用与机制

- **对内服务** 的端口，只会将当前端口暴露给平台内部的其他应用，这种端口对配置应用间[依赖](http://www.rainbond.com/docs/dev/user-app-docs/myapps/myapp-platform-reliance.html)至关重要。

<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/V3.5/myapp-port2.png" style="border:1px solid #eee;width:100%" />

- 图中元素的意义
  - **端口号** 当前端口的端口号。
  - **端口协议** 指定了该端口所遵循的协议类型，您可以点击右侧的按钮修改当前协议类型。**stream** 其他非http协议，MySQL使用的TCP协议就是其中一种。
  - **服务信息** 在这里打开对内服务的开关。其他应用就可以通过 **访问地址** 访问当前应用，如果当前应用为其他应用的依赖，那么[连接信息](http://www.rainbond.com/docs/dev/user-app-docs/myapps/myapp-platform-reliance.html#part-99dc644194fc63b3)应参照这里填写。这个 **访问地址** 在被引用的时候，也可以 **使用别名** 来代替。
  - **绑定域名** 由于对内服务的端口不会被公网所访问，所以不能（也没有必要）绑定域名。
  - **操作** 在这里可以删除该端口。

{{site.data.alerts.callout_success}}如果安装的应用使用第三方的rpc调用(如dubbo），它本身实现了服务发现机制，则不需要开启对内服务。{{site.data.alerts.end}}