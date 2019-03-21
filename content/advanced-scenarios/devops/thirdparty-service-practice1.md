---
Title: 第三方服务实践-外网 IP 绑定到 Rainbond 网关
Description: Rainbond应用网关很好用，但是遗留的服务没办法与Rainbond上的服务共享外网端口或域名
Hidden: true
---

你可以使用第三方服务将外网 IP 绑定到 Rainbond 网关节点, 从而复用服务网关占用了80和443端口, 而不需要的网关前面一层nginx服务. 本文将会演示如何使用第三方服务将 Rainbond 外的网站添加到 Rainbond 中.

### 前期准备

- 请确保你已经安装了 [Rainbond V5.1](/user-operations/install/online_install/) 或更高的版本.

- 需要添加的网站, 本文使用的是 Nginx 的默认页面.

### 步骤 1: 填写第三方服务信息

登录 Rainbond 控制台, 进入 `创建应用` -> `添加第三方服务`.

填写 `服务名称`, `应用名称`, `服务注册方式(以静态注册为例)`, `服务地址`等信息.

点击 `创建服务`, 并在检测通过后, 点击 `创建`.

### 步骤 2: 添加端口

创建完成后, 会进入到服务的管理页面. 在导航中选择 `端口`.

点击`添加端口`, 输入端口为 `80`, 选择 `http` 协议.

添加完成后, 打开`对外服务`, 将该服务通过网关暴露出去.

{{% notice note %}}

这里需要注意的是, 内部的服务可以添加多个端口, 而第三方服务只能添加一个端口.

{{%  /notice %}}

### 步骤 3: 确认服务

打开`对外服务`后, 你会得到一个类似`http://80.grf53077.ex05o2yt.2cbcac.grapps.cn/`的域名, 这是 Rainbond 为该服务会分配一个默认的域名, 当然也可以在[网关](/user-manual/gateway/)中为该服务自定义域名.

在浏览器中输入平台分配的默认域名, 以查看服务是否正在运行.

你应该会在浏览器中看到类似下面的网页:

![Minion](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/thirdparty/practice-1/nginx%E9%A1%B5%E9%9D%A2.png)

此时, 你已经将 `Nginx(192.168.1.123:80)` 作为第三方服务添加到了 Rainbond 上.

### 步骤 4: 总览页面

在导航中选择 `总览`, 你可以看到服务的实例的信息, 包括实例的`数量`, `地址`, `健康状态`和`是否上线`等.

除了可以查看服务的实例的信息外, 你还可以在总览页面中对实例进行`新增`, `删除`, `上线`和`下线`等操作.

#### 1. 新增

点击`新增`, 输入实例地址`192.168.1.200`.

新增实例时, 默认会将该实例`上线`.

如下图所示:

![Minion](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/thirdparty/practice-1/%E6%96%B0%E5%A2%9E%E5%AE%9E%E4%BE%8B.png)

{{% notice note %}}

实例地址不能是 127.0.0.1

{{%  /notice %}}

#### 2. 下线

接下来, 将刚才新增的实例`192.168.1.200`下线. 选中实例`192.168.1.200`, 点击`下线`.

然后, 你可以看到下线后的实例`192.168.1.200`, 会没有健康状态(显示为'-'). 如图所示:

![Minion](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/thirdparty/practice-1/%E4%B8%8B%E7%BA%BF%E5%AE%9E%E4%BE%8B.png)

### 总结

本文以 Nginx(`192.168.1.123:80`) 为例, 演示了如何使用第三方服务将 Rainbond 外的网站添加到 Rainbond 中, 并对服务的实例进行操作. 至此, 你应该了解了 Rainbond V5.1 的新特性 `第三方服务` 的基础使用.