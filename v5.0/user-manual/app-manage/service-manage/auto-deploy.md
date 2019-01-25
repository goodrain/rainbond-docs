---
title: 应用持续构建与部署
summary: 持续构建与部署
toc: true
toc_not_nested: true
asciicast: true

---

## 一、自动构建

通过自动构建的功能，可以实现代码提交后应用的自动构建，平台提供了基于Git-Webhooks、API(Url)和镜像仓库Webhooks三种方式触发自动应用部署。方便的对接第三方自动化流程。只需要通过简单的设置，就可以帮您完成重新部署的工作。

## 二、源码仓库webhooks使用说明

开启源码自动构建，需要应用具备如下条件：

- 应用是由源码创建(官方demo除外)，目前支持的代码仓库为`GitHub`、`GitLab`、`Gitee` 与 `Gogs`
- 确定应用已经 `开启` 了此功能
- 需要在代码仓库的项目中配置正确的 `webhooks`
- 目前仅支持项目的`push`事件
- 提交信息中包含触发关键字 `@deploy`
- 应用状态必须是`运行中`或`运行异常`

### 2.1 开启自动构建

  在您的应用中请打开自动构建功能，并复制我们给您的URL粘贴到您的webhooks设置中

<center><img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1548428389742.jpg" style="border:1px solid #eee;width:80%"/></center>


### 2.2 配置Git Server

* 配置GitHub

如果您的项目存放在`Github`中，请参考如下截图：

<center><img src="https://static.goodrain.com/images/docs/3.6/basic-operation/webhooks/github.jpg" style="border:1px solid #eee;width:80%"/></center>

* 配置GitLab

如果您的项目存放在`GITLAB`中，请参考如下截图:

<center><img src="https://static.goodrain.com/images/docs/3.6/basic-operation/webhooks/gitlab.jpg" style="border:1px solid     #eee;width:80%"/></center>

{{site.data.alerts.callout_danger}}

- 开启自动构建后，每次提交代码的Commit信息中必须包含触发自动构建关键字、例如：  `@deploy` 才能触发自动构建, 触发自动构建关键字可自定义设置，设置的仅为关键字，提交信息中在关键字前需加上`@`符号

{{site.data.alerts.end}}  


<center><img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1548428724539.jpg" style="border:1px solid     #eee;width:80%"/></center>

 
## 三、镜像仓库webhooks使用说明

镜像仓库自动构建目前仅支持Docker官方仓库，可以实现推送镜像后应用的自动构建，方便的对接第三方自动化流程。只需要通过简单的设置，就可以持续构建应用。

开启镜像自动构建，需要应用具备如下条件：

- 应用是由镜像创建，目前支持的代码仓库为`Docker Hub`
- 确定应用已经 `开启` 了此功能
- 需要在代码仓库的项目中配置正确的 `webhooks`
- 应用状态必须是`运行中`或`运行异常`

### 3.1 开启自动构建

  在您的应用中请打开自动构建功能，并复制我们给您的URL粘贴到您的webhooks设置中

  <center><img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1548422517293.jpg" style="border:1px solid #eee;width:80%"/></center>

### 3.2 配置Docker Server

* 配置Docker Hub

请参考如下截图:
<center><img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1548411288653.jpg" style="border:1px solid #eee;width:80%"/></center>

<center><img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1548411371103.jpg" style="border:1px solid #eee;width:80%"/></center>


## 四、API触发自动构建
 
通过开启API自动构建返回的url，调用API，携带秘钥即可触发API自动构建，秘钥可以自定义设置

<center><img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1548429560105.jpg" style="border:1px solid #eee;width:80%"/></center>
