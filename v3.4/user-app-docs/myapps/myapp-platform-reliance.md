---
title: 依赖
summary: 一些应用程序无法独自完成预计实现业务，需要依赖其他应用或服务才可以实现。
toc: false
---

<div id="toc"></div>

&emsp;&emsp;有些应用程序无法独自完成预计实现业务，需要依赖其他应用或服务才可以实现。比如有一个Web应用需要MySQL服务的支持。云帮部署的应用提供一键式关联其他应用的功能，点击 **应用控制台-依赖** 选项为您有需求的应用寻找依赖：

## 连接信息

此处为其它应用依赖当前应用所需要的连接信息。依赖当前应用的应用，在编码过程中可以指定变量来连接当前应用。

<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/myapp-platform-reliance1.png" style="border:1px solid #eee;max-width:100%" />

## 应用连接

应用连接下的应用是您在云帮创建的其他应用，您可以选择其中有相关依赖需求的应用进行关联建立依赖关系。在您完成关联后需重启当前应用生效。

> 应用类型包括：application、mysql、redis、memcached、postgresql、mongodb等

<img src="https://static.goodrain.com/images/acp/docs/user-docs/myapps/myapp-platform-reliance2.png" style="border:1px solid #eee;max-width:100%" />