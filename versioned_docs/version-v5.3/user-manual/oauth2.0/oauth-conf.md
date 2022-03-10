---
title: OAuth2.0配置
description: OAuth2.0创建及注意事项
weight: 6004
---

目前Rainbond支持 Github Gitlab Gitee 三种支持Git仓库对接的Oauth类型和钉钉、阿里云两种仅支持登录功能的Oauth类型。若需要更多类型需参考用例进行扩展或贡献代码。[参考实现](https://github.com/goodrain/rainbond-console/tree/master/console/utils/oauth)

Rainbond所有支持的Oauth类型需要正常配置权限才能正常使用，比如Github Gitlab Gitee需要授予获取代码仓库列表等权限，钉钉、阿里云需要授予获取用户信息等权限。详情参考下述文档说明：

### Github配置说明 
----

   **进入 Settings→Developer settings→OAuth Apps→New OAuth App**
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-manual/oauth2.0/d9e1d8d00dd71cf75406b5a2081bef6a.png" width = "450"alt=""/>
     
   - **Application name:** 客户端名称，用户可自己定义
   - **Homepage URI:** Rainbond服务首页 如https://goodrain.me
   - **Authorization callback URL:** 回跳路径 该路径用于接收第三方平台返回的凭证 **homepage+/console/oauth/redirect** 如https://goodrain.me/console/oauth/redirect
   - **权限设置** github的权限设置是通过认证url中的scope参数来指定的，不需要在注册客户端的时候指定。
   

### Gitlab配置说明 
----
   **进入 User Settings→Applications**
   <img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-manual/oauth2.0/WechatIMG63.png" width = "450"alt=""/>
   
   - **Name:** 客户端名称，用户可自己定义
   - **Redirect URI:** 回跳路径 该路径用于接收第三方平台返回的凭证 **homepage+/console/oauth/redirect** 如https://goodrain.me/console/oauth/redirect
   - **权限设置** gitlab的权限设置需要指定**api**、**read_user**、**read_repository**


### Gitee配置说明
----
   **进入 设置→第三方应用→创建应用
   <img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-manual/oauth2.0/WechatIMG64.png" width = "450"alt=""/>
   
   - **应用名称:** 客户端名称，用户可自己定义
   - **应用主页:** Rainbond服务首页 如https://goodrain.me
   - **应用回调地址:** 回跳路径 该路径用于接收第三方平台返回的凭证 **homepage+/console/oauth/redirect** 如https://goodrain.me/console/oauth/redirect
   - **权限设置** gitee的权限设置需要指定**user_info**、**projects**、**hook**


### 在Rainbond平台认证
----
   > (管理员才能操作)

   1. 进入Rainbond首页→企业中心→开启OAuth2.0认证服务
<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-manual/oauth2.0/99339336043703041730.png" width = "800"alt=""/>
   2. 将注册好的客户端id和Secret Key填入，选择对应的OAuth类型,点击确定，此时在该企业下的用户就可以使用OAuth2.0协议进行登录了(自定义的oauth认证服务需要填入**认证api**，**scope**，**令牌api**，**用户信息api**等信息)
    
    

