---
title: Email alarm
draft: false
weight: 1673
description: Rainbod Email Alarm Configuration Description
---

### General description

This paper mainly shows how to configure Alertmanager to send messages to email alerts.

For cluster monitoring alerts see [集群监控报警部署](../monitor-alert-employ/)

### Prerequisite

- Users using email alerts need to have emails and email account information;

### Action step

1.Need to modify Alertmanager configuration file, click Edit in Config -->Profile configuration

<img src="https://grstatic.oss-cn-shanghai.aliyuncs.com/images/docs/5.2/user-operations/monitor/alert/alertmanager-config.jpg"  width="100%" />

The following is a template file and overwrite the component of the original configuration file update when the modification is complete.

```bash
global:
 resolve_timeout: 5m
 # 邮箱smtp服务器代理
 smtp_smarthost: 'smtp.163.com:25'
 # 发送邮箱名称
 smtp_from: 'XXXXXX@163.com' 
 # 邮箱名称
 smtp_auth_username: 'XXXXX@163.com'
 # 邮箱密码或授权码
 smtp_auth_password: 'XXXXXXXX'
 smtp_require_tls: false
route:
 group_by: ['alertname']
 group_wait: 20s
 group_interval: 5m
 repeat_interval: 5m
 receiver: 'webhook'
receivers:
- name: 'webhook'
  email_configs:
   # 接收警报的email配置
  - to: 'XXXXX@163.com'
   # 接收邮件的标题
    headers: { Subject: "[WARN] Rainbond报警邮件" }
```

This will complete the email alert deployment.
