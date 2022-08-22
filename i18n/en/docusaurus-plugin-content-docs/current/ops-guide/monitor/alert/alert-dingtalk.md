---
title: Dingding alarm
draft: false
weight: 1672
description: Rainbond Dingding Alarm Configuration Instructions
---


### Overview

This article mainly introduces how to configure Alertmanager to send messages to DingTalk.

For details on cluster monitoring and alarm deployment, see [Monitoring and Alarm Deployment](/docs/ops-guide/monitor/monitor-alert-deploy)

### Preconditions

* Users who use the DingTalk alarm need to have the DingTalk robot Webhook address, and receive alarm information through the Webhook, please refer to [official document](https://ding-doc.dingtalk.com/doc#/serverapi2/qf2nxq)for the acquisition method;

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
  - url: http://127.0.0.1:8060/dingtalk/webhook1/send
    send_resolved: true
```

3. The recommended security settings when obtaining the DingTalk Webhook address are as follows:：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/dingding.jpg"  width="70%" />

4. After obtaining the DingTalk Webhook address, manually modify the Webhook address of the DingTalk component

Modify the value of the `WEBHOOK_ADDRESS` variable in the DingTalk component page -->environment configuration, and the update will take effect after the modification is completed.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/setaddress.jpg"  width="100%" />


This completes the deployment of DingTalk alarm. 


