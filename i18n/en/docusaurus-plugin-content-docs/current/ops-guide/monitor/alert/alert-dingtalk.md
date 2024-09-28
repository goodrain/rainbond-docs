---
title: Dingding alarm
draft: false
weight: 1672
description: Rainbond nailing alarm configuration description
---

### General description

This paper focuses on how Alertmanager sends messages to nails.

See [集群监控报警部署](/docs/ops-guide/monitor/monitor-alert-employ) for cluster monitoring alerts

### Prerequisite

- Users with pegged alarms need to have pegged robot Webhook addresses, receive alarm information via Webhook and see [官方文档](https://ding-doc.dingtalk.com/doc#/serverapi2/qf2nxq);

### Action step

1.Edit Alertmanager profile, click Edit in Environment Profiles –>Profile Configuration

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/alert/alertmanager-config.jpg" width="100%" />

The following is a template file and overwrite the component of the original configuration file update when the modification is complete.

> url does not need to be modified, others are required

```yaml
global:
  resolve_timeout: 5m
route:
  receiver: webhook
  group_wait: 30 s
  group_interval: 5m
  repeat_interval: 5m
  group_by: [alertname]
  routes:
  - receiver: webhook
    group_wait: 10s
receivers:
- name: webhook
  webhook_configs:
  - url: http://127. .0.1:8060/dingtalk/webhook1/send
    send_resolved: true
```

3. Set the following security settings for a nailing web hook address to the following：

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/dingding.jpg"  width="70%" />

4. Change the web hook address of the DingTalk component manually after getting a nailing Webhook address

Modify the `WEBHOOK_ADDRESS` variable value in the DingTalk component page --> environment configuration. Update will take effect when finished.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/setaddress.jpg"  width="100%" />

This brings the nails to completion of the police deployment.
