---
title: 企业微信报警
description: Rainbond企业微信报警配置说明
---


### 概述

本文主要介绍如何配置Alertmanager发送消息到企业微信。

集群监控报警部署请参见 [集群监控报警部署](../monitor-alert-deploy)

### 前提条件

* 使用企业微信报警的用户需要拥有企业微信机器人 WebHook 地址，通过 Webhook 接收报警信息，获取方式参阅 [官方文档](https://work.weixin.qq.com/api/doc/90000/90136/91770)；

### 操作步骤

1.编辑Alertmanager配置文件，在 环境配置–>配置文件配置 中点击编辑

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/alert/alertmanager-config.jpg" width="100%" />

2.以下是模板文件，修改完成之后覆盖原配置文件更新组件即可。
> url无需修改，其他内容根据所需修改
```yaml
global:
  resolve_timeout: 5m
route:
  receiver: webhook
  group_wait: 30s
  group_interval: 5m
  repeat_interval: 5m
  group_by: [alertname]
  routes:
  - receiver: webhook
    group_wait: 10s
receivers:
- name: webhook
  webhook_configs:
  - url: http://127.0.0.1:8000/send
    send_resolved: true
```

3.获取企业微信 Webhook 地址

4.获取到企业微信 Webhook 地址后手动修改 Wechat 组件的 Webhook 地址

在 Wechat 组件页面–>环境配置 中修改 `Wechat_WebHook_URL` 变量值，修改完成之后更新即可生效。

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/alert/alert-wechat-env.png" width="100%" />

到此完成企业微信报警的部署。