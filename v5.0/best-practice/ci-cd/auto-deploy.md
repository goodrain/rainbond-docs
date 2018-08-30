---
title: 应用持续构建与部署
summary: 持续构建与部署
toc: true
toc_not_nested: true
asciicast: true

---

## 一、自动部署

通过自动部署的功能，可以实现代码提交后应用的自动构建，平台提供了基于Git-Webhooks和API(Url)两种方式触发自动应用部署。方便的对接第三方自动化流程。只需要通过简单的设置，就可以帮您完成重新部署的工作。

## 二、使用说明

开启自动部署，需要应用具备如下条件：

- 应用是由源码创建(官方demo除外)，目前支持的代码仓库为`GitHub`、`GitLab`、`Gitee` 与 `Gogs`
- 确定应用已经 `开启` 了此功能
- 需要在代码仓库的项目中配置正确的 `webhooks`
- 目前仅支持项目的`push`事件
- 提交信息中包含触发关键字 `@deploy`
- 应用状态必须是`运行中`或`运行异常`

### 2.1 开启自动部署

  在您的应用中请打开自动部署功能，并复制我们给您的URL粘贴到您的webhooks设置中

<center><img src="https://static.goodrain.com/images/docs/3.6/user-manual/manage/auto-deploy.png" style="border:1px solid #eee;width:100%"/></center>

### 2.2 调用API触发

```
curl -d `{"secret_key":"<秘钥>"}` -H "Content-type: application/json" -X POST <API地址>
```



### 2.3 配置Git Server

* 配置GitHub

如果您的项目存放在`Github`中，请参考如下截图：

<center><img src="https://static.goodrain.com/images/docs/3.6/basic-operation/webhooks/github.jpg" style="border:1px solid #eee;width:100%"/></center>

* 配置GitLab

如果您的项目存放在`GITLAB`中，请参考如下截图:

<center><img src="https://static.goodrain.com/images/docs/3.6/basic-operation/webhooks/gitlab.jpg" style="border:1px solid     #eee;width:100%"/></center>

{{site.data.alerts.callout_danger}}

- 开启自动部署后，每次提交代码的Commit信息中必须包含  `@deploy` 才能触发自动构建

{{site.data.alerts.end}}  