---
title: Enterprise WeChat alarm
draft: false
weight: 1671
description: Rainbond Enterprise WeChat Alarm Configuration Instructions
---


### Overview

This article mainly introduces how to configure Alertmanager to send messages to enterprise WeChat.

For details about cluster monitoring and alarm deployment, see [Monitoring and Alarm Deployment](../monitor-alert-deploy)

### Preconditions

* Users who use the enterprise WeChat alarm need to have the WebHook address of the enterprise WeChat robot, and receive alarm information through the Webhook. For the acquisition method, please refer to [official document](https://work.weixin.qq.com/api/doc/90000/90136/91770);

### Steps

1. Edit the Alertmanager configuration file, click Edit in Environment Configuration ->Configuration File Configuration

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/alert/alertmanager-config.jpg" width="100%" />

2. The following is the template file. After the modification is completed, the original configuration file can be overwritten to update the component.
> The url does not need to be modified, other content is modified as needed
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

3. Obtain the corporate WeChat Webhook address

4. After obtaining the enterprise WeChat Webhook address, manually modify the Webhook address of the Wechat component

Modify the value of the variable `Wechat_WebHook_URL` in the Wechat component page –>environment configuration, and the update will take effect after the modification is completed.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/alert/alert-wechat-env.png" width="100%" />

This completes the deployment of enterprise WeChat alarm.