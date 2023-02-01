---
title: 自动部署
description: 介绍 Rainbond 自动部署组件
keywords:
- 自动部署
- Rainbond 自动部署
---

import Bvideo from '/src/components/Bvideo';

<Bvideo src="//player.bilibili.com/player.html?aid=820892498&bvid=BV1334y1f76U&cid=983036584&page=8" />

通过自动构建的功能，可以实现代码或镜像提交后组件自动触发构建和部署，Rainbond 提供了基于代码仓库 Webhooks、镜像仓库 Webhooks 和自定义 API 三种方式触发组件自动部署。自动构建的功能可以辅助开发者便捷的实现敏捷开发。

## 前提条件

- 组件是由源码创建，可支持代码仓库 Webhooks，目前支持的代码仓库为`GitHub` `GitLab` `Gitee`。
- 组件是由镜像创建，可支持镜像仓库 Webhooks，目前支持 Docker 官方仓库，阿里云镜像仓库。

## 基于源代码操作流程

### 开启 Rainbond Git Webhook
开启组件 Git Webhook 在 **组件 -> 构建源** 中打开 Git-Webhook 自动构建功能，复制生成的 hook 地址。

:::info
一般情况下开发者不希望每一次代码提交都进行部署动作，因此 Rainbond hook 自动触发设置了前提，在 Commit 信息中包含 `@关键字` 时才触发动作。这个关键字可以由用户进行设置。
:::

### 配置 Git 仓库 Webhooks

#### GitHub 配置

进入 GitHub 项目内，**Settings -> Webhooks -> Add webhooks**

|                     | 说明                            |
| ------------------- | ------------------------------- |
| Payload URL         | 复制 Rainbond 中的 Webhook 地址 |
| Content type        | application/json                |
| Just the push event | 选择 push 触发事件              |
| Active              | 勾选 Active                     |

#### GitLab 配置

|         | 说明                            |
| ------- | ------------------------------- |
| URL     | 复制 Rainbond 中的 Webhook 地址 |
| Trigger | 勾选 **Push events**            |

其他代码仓库配置方式类似，需要说明的是目前 Rainbond hook 触发暂不支持安全请求校验。

## 基于镜像仓库操作流程

镜像仓库自动构建可以实现推送镜像后应用的自动构建，方便的对接第三方自动化流程。当镜像更新事件到达时判断以下条件，都满足时触发自动构建。

- 应用是由镜像创建，镜像仓库为`Docker Hub`, 5.1.2 版本及以后支持阿里云镜像仓库。

- 默认更新的镜像名称和 tag 是否与当前组件构建源镜像名称一致（判断时不包含镜像仓库域名）, 5.1.3 版本及以后支持配置 Tag 触发正则策略，动态匹配和改变组件的镜像 Tag。


### 开启 Rainbond 镜像 Webhook

开启镜像仓库 Webhook 自动构建，**组件 -> 构建源 -> 开启自动构建**。

**Tag 触发自动修改策略**

默认情况下 Webhook 更新事件的镜像名称和 Tag 必须与组件当前构建源的镜像名称和 Tag 配置一致才能触发构建和部署。配置了 Tag 触发策略以后，根据配置的正则表达式，如果接收到的 push 事件的镜像 tag 能够正确匹配正则表达式，则认为此次更新事件有效，根据更新的 Tag 信息来升级当前组件的构建源信息并进行自动构建。

比如设置 Tag 策略为： `v5.*` 当 Tag 为 `v5.1` `v5.2` `v5.9`等都将被允许。

### 配置 DockerHub 镜像仓库

进入 DockerHub 仓库 -> Webhooks

| New Webhook  | 说明                            |
| ------------ | ------------------------------- |
| Webhook name | 自定义                          |
| Webhook URL  | 复制 Rainbond 中的 Webhook 地址 |



## API 触发自动构建

通过开启 API 自动构建返回的 URL，POST 方法调用 API，携带秘钥即可触发 API 自动构建，秘钥可以自定义设置。

进入 **组件 -> 构建源 -> 开启自动构建 -> 自定义 API**。

**API 使用方式如下：**

```bash
curl -d '{"secret_key":"<秘钥>"}' -H "Content-type: application/json" -X POST <API地址>
```

基于 API 触发自动构建是最灵活的方式之一，主要用于与第三方 CI 系统集成。