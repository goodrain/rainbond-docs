---
title: 应用持续构建与部署
description: Rainbond组件进行持续构建与部署（自动CI/CD）文档
hidden: true
weight: 5015
---

### 组件自动构建

通过自动构建的功能，可以实现代码提交后应用的自动构建，平台提供了基于代码仓库Webhooks、镜像仓库Webhooks和API等方式触发自动应用部署。方便的对接第三方自动化流程。只需要通过简单的设置，就可以帮您完成重新部署的工作。

### 代码仓库自动化构建说明

开启源码自动构建，需要应用具备如下条件：

- 应用是由源码创建(官方demo除外)，目前支持的代码仓库为`GitHub`、`GitLab`、`Gitee` 与 `Gogs`
- 确定应用已经 `开启` 了此功能
- 需要在代码仓库的项目中配置正确的 `webhooks`
- 目前仅支持项目的`push`事件
- 提交信息中包含触发关键字 默认为`@deploy`，用户可设置
- 应用状态必须是`运行中`或`运行异常`状态

#### 开启自动构建

  在组件管理-[构建源管理](../service-source/) 中请打开Git-Webhook 自动构建功能，并复制我们平台提供的URL前往你使用的Git server 配置Webhook。

<center><img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1548428389742.jpg" style="border:1px solid #eee;width:80%"/></center>

#### 配置代码仓库

* 配置GitHub

如果您的项目存放在`Github`中，请参考如下截图：

<center><img src="https://static.goodrain.com/images/docs/3.6/basic-operation/webhooks/github.jpg" style="border:1px solid #eee;width:80%"/></center>

* 配置GitLab

如果您的项目存放在`GITLAB`中，请参考如下截图:

<center><img src="https://static.goodrain.com/images/docs/3.6/basic-operation/webhooks/gitlab.jpg" style="border:1px solid     #eee;width:80%"/></center>

{{% notice info %}}

- 开启自动构建后，每次提交代码的Commit信息中必须包含触发自动构建关键字、例如：  `@deploy` 才能触发自动构建, 触发自动构建关键字可自定义设置，设置的仅为关键字，提交信息中在关键字前需加上`@`符号

{{% /notice %}}  


<center><img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1548428724539.jpg" style="border:1px solid     #eee;width:80%"/></center>

### 镜像仓库自动化构建说明

镜像仓库自动构建可以实现推送镜像后应用的自动构建，方便的对接第三方自动化流程。当镜像更新事件到达时判断以下条件，都满足时触发自动构建。

- 应用是由镜像创建，镜像仓库为`Docker Hub`， 5.1.2版本及以后支持阿里云镜像仓库。
- 默认更新的镜像名称和tag是否与当前组件构建源镜像名称一致（判断时不包含镜像仓库域名）, 5.1.3版本及以后支持配置Tag触发正则策略，动态匹配和改变组件的镜像Tag。
- 组件已经 `开启` 了镜像仓库Webhook功能。
- 应用状态不是`未部署`和`已关闭`

#### 开启镜像仓库Webhook自动构建

需要在应用中启用自动构建功能，并且需要将应用的webhooks url配置到目标镜像仓库的webhooks中。

<center><img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1548422517293.jpg" style="border:1px solid #eee;width:80%"/></center>

##### Tag触发策略

默认情况下Webhook更新事件的镜像名称和Tag必须与组件当前构建源的镜像名称和Tag配置一致才能触发构建和部署。配置了Tag触发策略以后，根据配置的正则表达式，如果接收到的push事件的镜像tag能够正确匹配正则表达式，则认为此次更新事件有效，根据更新的Tag信息来升级当前组件的构建源信息并进行自动构建。

比如设置 Tag策略为： `v5.*`  当Tag为 `v5.1` ` v5.2` ` v5.9`等都将被允许。

#### 配置镜像仓库

* 配置Docker Hub

请参考如下截图:
<center><img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1548411288653.jpg" style="border:1px solid #eee;width:80%"/></center>

<center><img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1548411371103.jpg" style="border:1px solid #eee;width:80%"/></center>

### API触发自动构建

通过开启API自动构建返回的url，POST方法调用API，携带秘钥即可触发API自动构建，秘钥可以自定义设置

<center><img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1548429560105.jpg" style="border:1px solid #eee;width:80%"/></center>

API使用用例：

```
curl -d '{"secret_key":"<秘钥>"}' -H "Content-type: application/json" -X POST <API地址>
```

基于API触发自动构建是最灵活的方式之一，主要用于与第三方CI系统集成。