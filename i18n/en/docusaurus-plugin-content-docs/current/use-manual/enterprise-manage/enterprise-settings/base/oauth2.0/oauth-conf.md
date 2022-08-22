---
title: OAuth2.0 configuration and authentication
description: OAuth2.0 creation and precautions
---

Currently, Rainbond supports Github, Gitlab, Gitee, three Oauth types that support Git repository docking, and Dingding and Alibaba Cloud, two Oauth types that only support the login function.If you need more types, you need to refer to the use case to expand or contribute code.[reference implementation](https://github.com/goodrain/rainbond-console/tree/master/console/utils/oauth)

All Oauth types supported by Rainbond require normal configuration permissions for normal use. For example, Github Gitlab Gitee needs to be granted permissions to obtain the list of code repositories, and Dingding and Alibaba Cloud need to be granted permissions to obtain user information.For details, please refer to the following document description：

### Github configuration instructions

**Go to Settings→Developer settings→OAuth Apps→New OAuth App**

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-manual/oauth2.0/d9e1d8d00dd71cf75406b5a2081bef6a.png" width="50%" title="Github configuration" />


- **Application name:** Client name, user can define by himself
- **Homepage URI:** Rainbond service home page, such as https://goodrain.me
- **Authorization callback URL:** Return path, which is used to receive the credentials returned by the third-party platform,`homepage+/console/oauth/redirect`, such as https://goodrain.me/console/oauth/redirect
- **permission setting:** github's permission setting is specified by the scope parameter in the authentication url, and does not need to be specified when registering the client.


### Gitlab configuration instructions

**Go to User Settings→Applications**

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-manual/oauth2.0/WechatIMG63.png" width="50%" title="Gitlab configuration" />


- **Name:** client name, user can define by himself
- **Redirect URI:** The back-hop path is used to receive the credentials returned by the third-party platform **homepage+/console/oauth/redirect** Such as https://goodrain.me/console/oauth/redirect
- **permission settings:** gitlab permission settings need to specify**api**,**read_user**,**read_repository**


### Gitee configuration instructions

Go to Settings → Third Party Apps → Create App

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.1/user-manual/oauth2.0/WechatIMG64.png" width="50%" title="Gitee configuration" />


- **application name:** client name, users can define by themselves
- **application homepage:** Rainbond service homepage such as https://goodrain.me
- **Application callback address:** Back-hop path This path is used to receive the credentials returned by the third-party platform **homepage+/console/oauth/redirect** Such as https://goodrain.me/console/oauth/redirect
- **permission settings:** gitee permission settings need to specify**user_info**,**projects**,**hook**


### Certified on the Rainbond platform

> Only enterprise administrator can operate

Enter the Rainbond Homepage Enterprise View`Settings -->Enable OAuth Interconnection Service`

![Rainbond configuration](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/user-registration-login/oauth2.0/oauth-conf/oauth.jpg)

Fill in the registered`Client ID`and`Client Secret`, select the corresponding OAuth type, and click OK. At this time, users under the enterprise can log in using the OAuth2.0 protocol (custom oauth authentication service). Need to fill in**authentication api**,**scope**,**token api**,**user information api**and other information)


### OAuth service authentication

After configuring the Oauth service, you can perform OAuth service authentication in the user information in the upper right corner of the platform to connect with third-party platforms

![Service Certification](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/oauth-authorization/Authentication.jpg)

