---
title: 配置管理介绍
summary: 配置管理最要是对云帮的一些配置，包括云帮的logo,云帮title等
toc: false
--- 

## 配置管理

### 个性表现

个性表现中您可以配置您自己的云帮logo和标题。

<img src="https://static.goodrain.com/images/acp/docs/back-manager/v3.5/self_define_logo.png" width="100%"/>

### 环境对接

环境对接主要是对云帮的相关配置。目前支持`github`,`gitlab`,`FTP服务器`,`Dockerhub配置信息`

#### github配置

github配置需要您的云帮与外网可以互联。否则无法使用。

配置github需要您先在github上创建授权应用，详情可以参考[github创建授权app](https://developer.github.com/apps/building-oauth-apps/creating-an-oauth-app/) 您也可以参考下图。

<img src="https://static.goodrain.com/images/acp/docs/back-manager/v3.5/github_auth_app.gif" width="100%" />

> 注意 其中填写github相关信息时，在`Authorization callback URL`一栏中应该填写您的云帮控制台地址加 `/github/callback`

<img src="https://static.goodrain.com/images/acp/docs/back-manager/v3.5/regist_auth_app_config.png" width="70%" />


授权完成以后，GitHub会生成client_id 和 client_screct 。如图所示

<img src="https://static.goodrain.com/images/acp/docs/back-manager/v3.5/github_auth_success.png" width="100%" />

配置github信息时，客户端id即 `client_id`
客户端密钥即`client screct`

<img src="https://static.goodrain.com/images/acp/docs/back-manager/v3.5/github_detail.png" width="75%"/>

配置成功以后您在云帮创建应用时即可看到您的GitHub上的应用信息。如图

<img src="https://static.goodrain.com/images/acp/docs/back-manager/v3.5/cloudbang_github.png" width="100%"/>

#### gitlab配置

如果您安装了好雨提供的[gitlab](https://www.goodrain.com/app/detail/14)应用，您可以直接进行如下配置。

<img src="https://static.goodrain.com/images/acp/docs/back-manager/v3.5/gitlab_config.png" width="70%"/>

各项参数的含义已经比较明确，这里就不再赘述
其中`Hook地址`目前没有特别功能，您可以填写您的云帮访问地址即可。后续我们会增加相应的功能，请您持续关注好雨。


#### FTP 配置
FTP配置主要使用在您对应用的分享上。
如果您安装了好雨提供的[sFTP](https://www.goodrain.com/app/detail/120)服务器，你可以配置如下参数。

<img src="https://static.goodrain.com/images/acp/docs/back-manager/v3.5/ftp_config.png" width="70%" />


#### 云市场仓库信息配置

如果您拥有自己的docker镜像仓库，您可以通过如下配置来配置自己的仓库信息，这样，您可以将应用分享到自己的云市场。

<img src="https://static.goodrain.com/images/acp/docs/back-manager/v3.5/hub_config.png" width="70%"/>




