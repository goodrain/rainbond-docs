---
title: 应用管理
summary: 应用发布与安装
toc: true
asciicast: true
---

## 应用分享

应用市场定义了支持大型分布式的数字化业务系统的标准云原生应用模型、它可以包含1-N个服务组件，模型包含其中每个服务组件资源及配置，插件资源及配置，拓扑关系、部署关系等。精心制作完成即可一键发布、一键安装。
在Rainbond中，服务是Rainbond可管理的最小服务单元，用户可以将多个服务组成一个复杂的业务系统，这套业务系统可以对外提供服务，也可以分享给其他组织独立部署，你可以将整套业务系统打包成一个`云市应用`，并选择将该应用发布到`团队`、`公司`、`好雨公有云市`。分享后的应用可供团队、公司或云市的用户一键安装部署完整的服务体系，实现标准化得一键交付部署。分享到不同的范围，可见性也有所不同，具体可见范围如下：

* 团队：只有当前团队下的成员可见
* 公司：当前企业下的所有成员可见
* 好雨云市：连接好雨公有云市的所有企业及用户可见

我们将一个`应用`内完整的业务解决方案集成体整体打包成一个`云市应用`，发布成功后，其他用户在创建应用时可以选择`从应用市场安装`的方式`一键安装部署`完整的服务体系，实现标准化得一键交付部署。

####  1.1 应用发布流程

**选择要分享的应用，点击`发布到市场`。**

> 提示：发布应用时，应用内所有服务的状态必须为运行中

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1544492992679.jpg" width='100%' />

**完善应用信息**

> 填写应用基本信息

* 应用名：要发布的应用名称
* 版本：应用发布版本  (当同一应用组多次发布时，如果版本号相同，则会覆盖已发布的该版本应用)
* 分享范围：发布的可见范围
* 应用说明：应用的简单描述
* 图标：应用LOGO

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/share-2.jpg" width='100%' />

> 填写每个服务的配置信息

* 环境变量：编辑该服务默认的环境变量，勾选`可修改`，则其他用户安装此应用后可编辑这个环境的值，反之不可编辑。
* 伸缩规则：定义该服务可伸缩的最大最小节点数，及节点伸缩步长，最小安装内存限制。

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/share-3.jpg" width='100%' />

**提交发布任务**

完善应用信息后，点击`提交`，向数据中心发起同步任务。由数据中心的`rbd-chaos`组件对应用中的每一个服务进行数据同步。如果是发布到`好雨公有云市`，数据中心会将应用所需的镜像或源码包同步到好雨公有仓库及FTP服务器存储，并将应用的模版数据保存到Console数据库并发送到好雨云市保存。如果是发布到`团队`或`公司`，则应用所需的镜像或源码包同步到本数据中心，并将应用的模版数据保存在Console数据库。

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/share-4.jpg" width='100%' />

**确认发布**

当应用中的所有服务及插件全部完成同步后，点击`确认发布`，即可完成应用发布。发布成功后可在`创建应用`下的`从应用市场安装`中对应的范围下看到你发布的应用。

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/share-5.jpg" width='100%' />



<img src="https://static.goodrain.com/images/docs/3.7/user-manual/share-6.jpg" width='100%' />


**上架应用**

如果想要可以在公有云市中找到发布的应用，那么需要在云市中上架该应用。上架后的应用可以被连接好雨公有云市的所有企业及用户看到。

- 登录[Goodrain](https://www.goodrain.com/)官网,进入 企业中心 > 应用市场 > 自有市场 > 分享应用管理。
> 登录的时候需要用该企业管理员的Rainbond账号登陆。

- 信息编辑。使用Markdown编写应用的详细介绍，完善应用`README`，让用户可以更好地去了解使用应用。

<img src="https://static.goodrain.com/images/docs/3.7/user-manual/market.gif" width='100%' />

- 设置价格。

<img src='/uploads/default/original/2X/3/3e0aa3de5b0b0970a171680fc624fe4c6e3377d6.jpg'>

- 上架。

<img src='/uploads/default/original/2X/5/5cdfffcd677910f5fea98215efeaeb8af7e2b935.gif'>
 
完成上架之后，我们就可以在云端中找到你上架的应用。