---
title: OAuth2.0配置及认证
description: OAuth2.0创建及注意事项
weight: 6004
hidden: false
---

目前 Rainbond 支持 Github Gitlab Gitee 三种支持 Git 仓库对接的 Oauth 类型和钉钉、阿里云两种仅支持登录功能的 Oauth 类型。若需要更多类型需参考用例进行扩展或贡献代码。[参考实现](https://github.com/goodrain/rainbond-console/tree/master/console/utils/oauth)

Rainbond 所有支持的 Oauth 类型需要正常配置权限才能正常使用，比如 Github Gitlab Gitee 需要授予获取代码仓库列表等权限，钉钉、阿里云需要授予获取用户信息等权限。详情参考下述文档说明：

### Github 配置说明

**进入 Settings→Developer settings→OAuth Apps→New OAuth App**

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-manual/oauth2.0/d9e1d8d00dd71cf75406b5a2081bef6a.png" title="Github配置" width="80%"/>
   
- **Application name:** 客户端名称，用户可自己定义
- **Homepage URI:** Rainbond服务首页,如https://goodrain.me
- **Authorization callback URL:** 回跳路径,该路径用于接收第三方平台返回的凭证，`homepage+/console/oauth/redirect`，如https://goodrain.me/console/oauth/redirect
- **权限设置:** github的权限设置是通过认证url中的scope参数来指定的，不需要在注册客户端的时候指定。

### Gitlab 配置说明

**进入 User Settings→Applications**

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-manual/oauth2.0/WechatIMG63.png" title="Gitlab配置" width="80%"/>

- **Name:** 客户端名称，用户可自己定义
- **Redirect URI:** 回跳路径 该路径用于接收第三方平台返回的凭证 **homepage+/console/oauth/redirect** 如https://goodrain.me/console/oauth/redirect
- **权限设置:** gitlab 的权限设置需要指定**api**、**read_user**、**read_repository**

### Gitee 配置说明

进入 设置 → 第三方应用 → 创建应用

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-manual/oauth2.0/WechatIMG64.png" title="Gitee配置" width="80%"/>

- **应用名称:** 客户端名称，用户可自己定义
- **应用主页:** Rainbond 服务首页 如https://goodrain.me
- **应用回调地址:** 回跳路径 该路径用于接收第三方平台返回的凭证 **homepage+/console/oauth/redirect** 如https://goodrain.me/console/oauth/redirect
- **权限设置:** gitee 的权限设置需要指定**user_info**、**projects**、**hook**

### 在 Rainbond 平台认证

> 企业管理员才能操作

进入 Rainbond 首页企业视图`设置-->开启OAuth互联服务`

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/user-registration-login/oauth2.0/oauth-conf/oauth.jpg" title="Rainbond配置" width="80%"/>

将注册好的`Client ID`和`Client Secret`填入，选择对应的 OAuth 类型,点击确定，此时在该企业下的用户就可以使用 OAuth2.0 协议进行登录了(自定义的 oauth 认证服务需要填入**认证 api**，**scope**，**令牌 api**，**用户信息 api**等信息)

### OAuth 服务认证

在配置 Oauth 服务后在平台右上角的用户信息内可以进行 OAuth 服务认证,与第三方平台互联

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/oauth-authorization/Authentication.jpg" title="服务认证" width="80%"/>
