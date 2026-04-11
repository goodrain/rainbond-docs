---
title: 部署你的第一个应用
description: 用最少步骤在 Rainbond 中部署第一个应用，并确认访问成功
keywords:
- Rainbond 入门教程
- 第一个应用部署
- 源码部署
- 应用市场部署
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import PageEntryTracker from '@site/src/components/Analytics/PageEntryTracker';
import TrackedLink from '@site/src/components/Analytics/TrackedLink';

<PageEntryTracker eventName="getting_started_opened" />

这篇文章只保留最短路径。跟着下面 3 步操作，看到组件状态变绿并打开应用页面，就算完成第一次部署。

## 前提条件

- 已完成 [Rainbond 快速安装](/docs/quick-start/quick-install)
- 能登录 Rainbond 控制台

## 选择一种方式部署

<Tabs groupId="deploy-way">
  <TabItem
    value="source"
    label="从示例源码部署"
    default
    attributes={{
      'data-umami-event': 'first_app_mode_selected',
      'data-umami-mode': 'source_code',
    }}>

### 第 1 步：打开源码部署弹窗

1. 登录 Rainbond 控制台，点击 **新建应用**。
2. 在创建组件弹窗中选择 **从源码构建**。

![](/docs/tutorial/via-rainbond-deploy-sourceandmiddleware/source-new.png)

### 第 2 步：使用更多示例直接安装

1. 进入源码地址表单后，点击右上角的 **更多示例**。
2. 选择示例应用后，直接点击 **安装**。

![](/docs/tutorial/via-rainbond-deploy-sourceandmiddleware/source-test.png)

### 第 3 步：打开对外访问并访问应用

1. 进入组件页面，打开 **高级设置**。
2. 在 **端口** 中开启对外访问。
3. 等待组件状态变为绿色。
4. 点击 **访问**，直接打开应用。

你看到应用页面后，这次部署就完成了。

  </TabItem>
  <TabItem
    value="market"
    label="开源软件一键部署"
    attributes={{
      'data-umami-event': 'first_app_mode_selected',
      'data-umami-mode': 'app_market',
    }}>

### 第 1 步：进入应用市场

1. 登录 Rainbond 控制台。
2. 点击顶部导航里的 **应用市场**。

![](/docs/tutorial/via-rainbond-deploy-sourceandmiddleware/app-market.png)

### 第 2 步：直接部署应用

1. 在应用市场中选择一个应用。
2. 点击 **部署**，直接开始安装。

### 第 3 步：等待运行并访问

1. 等待组件状态变为绿色。
2. 点击 **访问**，直接打开应用。

你看到应用页面后，这次部署就完成了。

  </TabItem>
</Tabs>

:::warning 域名无法访问排查说明
如果自动生成的域名打不开，通常是因为域名中的 IP 是内网地址，只能在当前内网环境访问。

可以这样处理：

- 先确认你访问的环境能否直连该 IP
- 如果需要公网访问，为应用配置公网可访问的域名或出口地址
:::

## 探索更多功能

<div className="gettingStartedActions">
  <TrackedLink
    to="/docs/tutorial/via-rainbond-deploy-sourceandmiddleware"
    className="button button--primary button--lg gettingStartedActionButton gettingStartedActionButtonPrimary"
    appendSourcePageParam>
    部署成功，继续深入教程
  </TrackedLink>
  <TrackedLink
    to="/docs/troubleshooting"
    className="button button--secondary button--lg gettingStartedActionButton gettingStartedActionButtonSecondary"
    appendSourcePageParam>
    部署失败，去排障
  </TrackedLink>
  <TrackedLink
    to="/docs/support"
    className="button button--secondary button--lg gettingStartedActionButton gettingStartedActionButtonSecondary"
    appendSourcePageParam>
    想找人问，去社区支持
  </TrackedLink>
</div>

还可以继续看这些实战教程：

- [快速部署源码和 MySQL](../tutorial/via-rainbond-deploy-sourceandmiddleware)
- [组件新版本构建与回滚](../tutorial/component-version-update-and-rollback)
- [自定义域名并配置 HTTPS](../tutorial/custom-gateway)
- [通过应用模板实现应用一键安装和升级](../tutorial/app-template-manage)
- [离线跨环境交付](../tutorial/app-template-offline)
- [接入已有服务器并创建多租户环境](../tutorial/docking-selfhost)
