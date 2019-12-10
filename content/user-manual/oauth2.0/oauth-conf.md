---
title: OAuth2.0配置
description: OAuth2.0创建及注意事项
hidden: true
weight: 6004
---


### 1. Github配置 
----

   **进入 Settings→Developer settings→OAuth Apps→New OAuth App**

   ![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-manual/oauth2.0/d9e1d8d00dd71cf75406b5a2081bef6a.png)
     
   - **Application name:** 客户端名称，用户可自己定义
   - **Homepage URI:** Rainbond服务首页 如https://goodrain.me
   - **Authorization callback URL:** 回跳路径 该路径用于接收第三方平台返回的凭证 **homepage+/console/oauth/redirect** 如https://goodrain.me/console/oauth/redirect
   

### 2. Gitlab配置 
----
   **进入 User Settings→Applications**
   ![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-manual/oauth2.0/WechatIMG63.png)
   
   - **Name:** 客户端名称，用户可自己定义
   - **Redirect URI:** 回跳路径 该路径用于接收第三方平台返回的凭证 **homepage+/console/oauth/redirect** 如https://goodrain.me/console/oauth/redirect


### 3. Gitee配置
----
   **进入 设置→第三方应用→创建应用
   ![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-manual/oauth2.0/WechatIMG64.png)
   
   - **应用名称:** 客户端名称，用户可自己定义
   - **应用主页:** Rainbond服务首页 如https://goodrain.me
   - **应用回调地址:** 回跳路径 该路径用于接收第三方平台返回的凭证 **homepage+/console/oauth/redirect** 如https://goodrain.me/console/oauth/redirect


### 4. oauth认证扩展，正在实现中

### 4.在Rainbond平台认证
----
   > (管理员才能操作)

   1. 进入Rainbond首页→企业中心→开启OAuth2.0认证服务
![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-manual/oauth2.0/99339336043703041730.png)
   2. 将注册好的客户端id和Secret Key填入，选择对应的OAuth类型,点击确定，此时在该企业下的用户就可以使用OAuth2.0协议进行登录了(自定义的oauth认证服务需要填入**认证api**，**scope**，**令牌api**，**用户信息api**等信息)
    
    

