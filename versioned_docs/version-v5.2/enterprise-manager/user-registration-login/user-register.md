---
title: 用户、管理员注册
description: Rainbond 用户、管理员管理和注册文档说明
wight: 20
---

### 功能描述
如果您第一次使用rainbond平台，首先得注册一个账户，以方便您访问rainbond应用控制平台。用户在Rainbond平台中只作为操作身份的标识，不具备给类资源所属权，Rainbond的服务、应用、网关策略、插件等资源只属于团队,用户只能从团队中获取操作权。
每一个用户可以加入多个团队，主动加入团队时需要团队管理员审核。

### 平台管理员注册
在Rainbond安装完成后，Rainbond注册的第一个用户是（平台）企业管理员，拥有管理员所拥有的权限，能够对平台的一些基础功能进行设置管理，同时具备对团队的管理权，后续再注册的用户为普通用户，企业管理员用户可以查看当前企业下所有团队的资源信息。

* 企业版中企业管理员可以登录管理后台
* 企业版中可以通过管理后台添加更多的企业管理员用户

**添加企业管理员**

（平台）企业管理员可在企业视图`设置`界面`企业管理员管理`添加已有用户为企业管理员


### 普通用户注册

在开启用户注册功能的情况下，注册流程由用户完成，过程如下：

1. 从用户登录页面点击`注册账户`进入用户注册页面

2. 填写`用户名，邮箱，密码，验证码`等信息提交注册

3. 注册结果反馈

4. 成功后进入`企业视图`页面，选择其中一个团队加入，等待团队管理员审核

5. 审核通过可进入`团队视图`参与相关应用和其他资源的管理

提示: 进入到某一个团队才能拥有团队所拥有的资源的操作权限

> 用户注册页面演示

<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/user-registration-login/user-register/register_1.jpg" title="注册页面" width="100%" />

<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/user-registration-login/user-register/register_6.jpg" title="注册页面" width="100%" />

> 注册结果反馈

<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/user-registration-login/user-register/register_4.png" title="注册页面" width="100%" />

> 企业视图申请加入团队


<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/user-registration-login/user-register/register_5.jpg" title="加入团队" width="100%" />

> 非管理员用户注册完成后必须加入到某个团队才能进入系统；需等待团队管理员在团队视图团队管理审核通过。

<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/user-registration-login/user-register/shenhe.png" title="审核" width="100%" />


### 关闭注册功能

为了适应企业账号管理方式，管理员可以通过`企业视图`-->`设置`关闭用户注册功能，在登录界面将不会再有`注册账户`按钮，采用手动添加用户的方式。

<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/user-registration-login/user-register/register_7.jpg" title="关闭注册功能" width="100%" />

### 管理员手动添加用户

通过管理员手动添加用户，可直接选择用户所在团队

在企业视图中，点击`用户-->新增-->填写用户信息-->确定-->完成注册`，即可使用注册的新用户登录Rainbond控制台。

<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/user-registration-login/user-register/adduser.png" title="添加用户" width="100%" />

### 用户管理

* 用户删除与密码修改

（平台）企业管理员在企业视图`用户-->删除`删除对应的用户，点击`用户-->编辑`对普通用户的密码进行修改。

<image src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/user-registration-login/user-register/Change%20Password.png" title="编辑用户" width="100%" />


### 与第三方用户体系集成

Rainbond支持Auth2.0等标准规范的第三方平台用户登录，参考 [Auth2.0相关支持文档](../enterprise-manager/user-registration-login/oauth2.0/)
