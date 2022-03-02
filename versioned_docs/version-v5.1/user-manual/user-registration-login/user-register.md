---
title: 用户、管理员注册
description: Rainbond 用户、管理员管理和注册文档说明
wight: 1001
---

### 功能描述
如果您第一次使用rainbond平台，首先得注册一个账户，以方便您访问rainbond应用控制平台。用户在Rainbond平台中只作为操作身份的标识，不具备给类资源所属权，Rainbond的服务、应用、网关策略、插件等资源只属于团队,用户只能从团队中获取操作权。
每一个用户可以加入多个团队，主动加入团队时需要团队管理员审核。

### 平台管理员注册
Rainbond注册的第一个用户是（平台）企业管理员，拥有管理员所拥有的权限，能够对平台的一些基础功能进行设置管理，同时具备对团队的管理权，后续再注册的用户为普通用户。企业管理员用户可以查看当前企业下所有团队的资源信息。

* 企业版中企业管理员可以登录管理后台
* 企业版中可以通过管理后台添加更多的企业管理员用户。

### 普通用户注册

在开启用户注册功能的情况下，注册流程由用户完成，过程如下：

1. 从用户登录页面点击注册入口进入用户注册页面

2. 填写用户名，邮箱，密码，验证码等信息提交注册

3. 成功后进入团队管理页面，选择其中一个团队加入，等待团队管理员审核

4. 审核通过可进入团队视图参与相关应用和其他资源的管理

>提示: 进入到某一个团队才能拥有团队所拥有的资源的操作权限

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/register/register_1.png" width="100%" />

> 用户登录页面演示

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/register/register_6.png" width="100%" />

> 用户注册页面演示

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/register/register_4.png" width="100%" />

> 非管理员用户注册完成后必须加入到某个团队才能进入系统。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/register/register_5.png" width="100%" />

> 等待团队管理员审核通过


### 关闭注册功能

为了适应企业账号管理方式，管理员可以通过 企业管理 页面关闭用户注册功能，采用人工添加用户的方式。

### 用户管理

用户作为平台重要的资源，其批量添加，密码等信息修改，查询等管理功能在资源管理后台中呈现。

### 与第三方用户体系集成

Rainbond支持Auth2.0等标准规范的第三方平台用户登录，参考 [Auth2.0相关支持文档](../oauth2.0/oauth-conf/)


















