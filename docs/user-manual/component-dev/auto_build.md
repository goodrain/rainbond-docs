---
title: 配置组件自动构建部署
description: 本文讲解Rainbond组件与外部平台对接实现自动构建和部署的方式
---

通过自动构建的功能，可以实现代码或镜像提交后组件自动触发构建和部署，Rainbond 提供了基于代码仓库 Webhooks、镜像仓库 Webhooks 和自定义 API 三种方式触发组件自动部署。自动构建的功能可以辅助开发者便捷的实现敏捷开发。

### 前提条件

- 组件是由源码创建(官方 demo 除外)，可支持代码仓库 Webhooks，目前支持的代码仓库为`GitHub`、`GitLab`、`Gitee` 与 `Gogs`。
- 组件是由镜像创建，可支持镜像仓库 Webhooks，目前支持 Docker 官方仓库，阿里云镜像仓库。
- 基于源代码创建组件 A 并使其处于正常运行状态。

### 基于源代码操作流程

1.<b>开启组件 Git-Webhook</b> 在 _组件管理面板/构建源管理_ 中请打开 Git-Webhook 自动构建功能，复制生成的 hook 地址。

![开启Git-Webhook功能](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-service-manage/auto-deploy/webhook.png)

Rainbond 自动构建后默认会进行部署动作，所以一般情况下开发者不希望每一次代码提交都进行部署动作，因此 Rainbond hook 自动触发设置了前提，在 Commit 信息中包含`@关键字`时才触发动作。这个关键字可以由开发者进行设置。

> 请注意，这里生成的域名是根据当前访问平台的域名生成，若不正确可直接使用平台正确的访问域名。

2.<b>配置代码仓库</b>

如果您的项目存放在`Github`中，请参考如下截图：

![Github配置方式](https://static.goodrain.com/images/docs/3.6/basic-operation/webhooks/github.jpg)

如果您的项目存放在`Gitlab`中，请参考如下截图:

![Gitlab配置方式](https://static.goodrain.com/images/docs/3.6/basic-operation/webhooks/gitlab.jpg)

其他代码仓库配置方式类似，需要说明的是目前 Rainbond hook 触发暂不支持安全请求校验。

### 基于镜像仓库操作流程

镜像仓库自动构建可以实现推送镜像后应用的自动构建，方便的对接第三方自动化流程。当镜像更新事件到达时判断以下条件，都满足时触发自动构建。

- 应用是由镜像创建，镜像仓库为`Docker Hub`, 5.1.2 版本及以后支持阿里云镜像仓库。
- 默认更新的镜像名称和 tag 是否与当前组件构建源镜像名称一致（判断时不包含镜像仓库域名）, 5.1.3 版本及以后支持配置 Tag 触发正则策略，动态匹配和改变组件的镜像 Tag。
- 组件已经 `开启` 了镜像仓库 Webhook 功能。
- 应用状态不是`已关闭`状态。

  1.<b>开启镜像仓库 Webhook 自动构建</b>

需要在应用中启用自动构建功能，并且需要将应用的 webhooks url 配置到目标镜像仓库的 webhooks 中。

2.<b>Tag 触发自动修改策略</b>

默认情况下 Webhook 更新事件的镜像名称和 Tag 必须与组件当前构建源的镜像名称和 Tag 配置一致才能触发构建和部署。配置了 Tag 触发策略以后，根据配置的正则表达式，如果接收到的 push 事件的镜像 tag 能够正确匹配正则表达式，则认为此次更新事件有效，根据更新的 Tag 信息来升级当前组件的构建源信息并进行自动构建。

比如设置 Tag 策略为： `v5.*` 当 Tag 为 `v5.1` `v5.2` `v5.9`等都将被允许。

3.<b>配置镜像仓库</b>

- 配置 Docker Hub

配置方式请参考如下截图:

![](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.0/user-manual/1548411288653.jpg)

### API 触发自动构建

通过开启 API 自动构建返回的 url，POST 方法调用 API，携带秘钥即可触发 API 自动构建，秘钥可以自定义设置

![开通自定义API触发自动构建](https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-manual/app-service-manage/auto-deploy/api.png)

API 使用方式如下：

```
curl -d '{"secret_key":"<秘钥>"}' -H "Content-type: application/json" -X POST <API地址>
```

基于 API 触发自动构建是最灵活的方式之一，主要用于与第三方 CI 系统集成。
