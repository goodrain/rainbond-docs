---
title: Enterprise wechat alarm
description: Rainbond enterprise wechat alarm configuration
---

### General description

This paper focuses on how to configure Alertmanager to send messages to business micromessages.

See [集群监控报警部署](../monitor-alert-employee) for cluster monitoring alerts

### Prerequisite

- Users using business micromessaging alerts need to own the business robot WebHook address, receive alerts via Webhook and see [官方文档](https://work.weixin.qq.com/api/doc/900/90136/91770);

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
  - url: http://127. .0.1:8000/send
    send_resolved: true
```

3. Get Business Micromessage Webhook Address

4. Change the Web hook address of Wechat components manually after getting the Enterprise Webhook address

Modify the value of the `Wechat_WebHook_URL` variable in the Wechat Component Page –>Environment Configuration. Update will take effect when finished.

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/alert/alert-wechat-env.png" width="100%" />

This will complete the deployment of the Enterprise Microcredit Alert.
