---
Title: 第三方服务实践-通过Rainbond应用网关访问企业内网应用
Description: 使用Rainbond第三方组件管理, 让应用网关访问企业内网的其他组件
Hidden: true
---

企业基于Rainbond建设自己的私有云，管理企业所有的应用的过程中，会遇到这样一个问题，有一些应用需要被公网访问，但是由于各种原因，应用尚未迁移到 Rainbond 中。但是 公司只有一个公网 IP。用户为了能够使Rainbond集群内外的应用可以同时对外网提供服务，不得不单独部署一个nginx服务来作为最外层的应用负载。这样带来的问题就是没办法直接方便的使用Rainbond网关，每开放一个应用都需要手动配置nginx的规则，如果不了解Rainbond网关的工作原理，这个过程将更加复杂。

为了解决这个问题，结合其他方面的需求，Rainbond第三方组件管理集成功能应运而生。参考[第三方服务定义](/docs/user-manual/app-creation/thirdparty-service/thirdparty-define/)

本文将会实践如何使用第三方组件, 让未迁移到Rainbond集群的应用也能够直接动态注册到Rainbond网关，从而实现基于Rainbond网关来管理企业所有的对外提供服务的应用。

### 前期准备

- 请确保你已经安装了 [Rainbond V5.1](/docs/user-operations/install/online_install/) 或更高的版本。

- 企业内网的其他组件, 本文使用一个Nginx应用来说明。

### 步骤 1: 填写第三方组件信息

登录 Rainbond 控制台, 进入 `创建应用` -> `添加第三方组件`.

填写 `组件名称`, `应用名称`, `组件注册方式(以静态注册为例)`, `组件地址`等信息.

点击 `创建组件`, 并在检测通过后, 点击 `创建`.

### 步骤 2: 添加端口

创建完成后, 会进入到组件的管理页面. 在导航中选择 `端口`.

点击`添加端口`, 输入端口为 `80`, 选择 `http` 协议.

添加完成后, 打开`对外服务`, 让应用网关代理该服务.



> 这里需要注意的是, 内部的服务可以添加多个端口, 而第三方服务只能添加一个端口.

### 步骤 3: 确认服务

打开`对外服务`后, 你会得到一个类似`http://80.grf53077.ex05o2yt.2cbcac.grapps.cn/`的域名, 这是 Rainbond 为该服务会分配一个默认的域名, 最关键的是这时候你可以在[网关](/docs/user-manual/gateway/)中为该服务自定义域名和设置需要的访问策略参数。

参考文档 [网关访问策略管理](/docs/user-manual/gateway/traffic-control/)

如果需要设置Https证书，参考文档 [证书管理](/docs/user-manual/gateway/cert-management/)

在浏览器中输入平台分配的默认域名, 以查看组件是否正在运行.

你应该会在浏览器中看到类似下面的网页:

![Minion](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/thirdparty/practice-1/nginx%E9%A1%B5%E9%9D%A2.png)

此时, 你已经将 `Nginx(192.168.1.123:80)` 作为第三方组件添加到了 Rainbond 上, 并使用网关成功地代理了 Nginx 默认页面.

### 步骤 4: 总览页面

在导航中选择 `总览`, 你可以看到组件的实例的信息, 包括实例的`数量`, `地址`, `健康状态`和`是否上线`等.

除了可以查看组件的实例的信息外, 你还可以在总览页面中对实例进行`新增`, `删除`, `上线`和`下线`等操作.

#### 1. 新增

点击`新增`, 输入实例地址`192.168.1.200`.

新增实例时, 默认会将该实例`上线`.

如下图所示:

![Minion](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/thirdparty/practice-1/%E6%96%B0%E5%A2%9E%E5%AE%9E%E4%BE%8B.png)

> 实例地址不能是 127.0.0.1 等本地环回地址

#### 2. 下线

接下来, 将刚才新增的实例`192.168.1.200`下线. 选中实例`192.168.1.200`, 点击`下线`.

然后, 你可以看到下线后的实例`192.168.1.200`, 会没有健康状态(显示为'-'). 如图所示:

![Minion](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/thirdparty/practice-1/%E4%B8%8B%E7%BA%BF%E5%AE%9E%E4%BE%8B.png)

### 总结

至此, 你应该了解了 Rainbond V5.1 的新特性 `第三方服务` 的基础使用. 并了解了通过网关访问集群内的其他组件.